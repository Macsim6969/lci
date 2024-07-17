import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, tap } from "rxjs";

import { BackendService } from "../../../../shared/services/backend.service";
import { select, Store } from "@ngrx/store";
import { StoreInterface } from "../../../../store/model/store.model";
import { newUserID, setIsLoginRegisterData, setRegiset, startGetData } from "../../../../store/actions/store.actions";
import { environment } from '../../../../../environment/environment';
import { Router } from "@angular/router";
import { User } from "../model/auth.model";
import { setStartDashboarfInfo } from "../../../../shared/base/startData";
import { selectUsers } from "../../../../store/selectors/store.selectors";

export interface AuthResponseData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string,
  registered?: boolean
}

@Injectable()

export class AuthService {
  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public token!: string;
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>,
    private backendService: BackendService,
    private router: Router
  ) {
  }

  sigUp(form: { email: string, password: string, name: string }) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, {
      email: form.email, password: form.password, returnSecureToken: true
    }).pipe(tap(resData => {
      localStorage.setItem('isRegister', JSON.stringify(true));
      localStorage.setItem('id', JSON.stringify(resData.localId));
      this.backendService.sendUserProfile({ userID: resData.localId, email: form.email, password: form.password, name: form.name, token: resData.idToken });
      this.store.dispatch(setIsLoginRegisterData({ data: true }));
      this.backendService.setDashboardInfo(resData.localId, setStartDashboarfInfo());
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn, resData.localId);
      setTimeout(() => {
        this.store.dispatch(setRegiset())
      }, 1000);
    }));

  }

  resetPassword(email: string, newPassword: string) {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.apiKey}`, {
      email: email,
      newPassword: newPassword,
      requestType: 'PASSWORD_RESET',
    });
  }

  login(form: { email: string, password: string }) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, {
      email: form.email, password: form.password, returnSecureToken: true
    }).pipe(tap((resData: AuthResponseData) => {
      const id = JSON.parse(localStorage.getItem('id'));
      this.handleAuthentication(resData.email, id, resData.idToken, +resData.expiresIn, id);
      if (localStorage.getItem('userData')) {
        const id = JSON.parse(localStorage.getItem('userData'))
        this.store.dispatch(newUserID({ id: id.localId }))
      }
      this.store.dispatch(startGetData())
      this.store.dispatch(setIsLoginRegisterData({ data: true }));
    }));
  }

  private getUserFromDataBase(){
  }

  deleteUser() {
    const id = JSON.parse(localStorage.getItem('id'));
    this.backendService.removeUser(id)
    const idToken = JSON.parse(localStorage.getItem('userData'))._token;
    const apiKey = environment.apiKey;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const body = {
      idToken: idToken
    };

    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${apiKey}`, body, httpOptions).subscribe(() => {
      this.logout();
      this.router.navigate(['/auth/register']).then();
      localStorage.clear();
    })
  }

  logout() {
    this.user.next(null)
    localStorage.removeItem('userData')
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
      localId: string
    } = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return
    }

    const loaderUser: User = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate), userData.localId);
    if (loaderUser.token) {
      this.user.next(loaderUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
    }
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number, localId: string) {
    this.autoLogout(expiresIn * 1000);
    const expirationData = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationData, localId);
    this.user.next(user)

    localStorage.setItem('userData', JSON.stringify(user))
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }
}
