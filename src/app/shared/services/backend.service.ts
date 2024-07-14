import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { StoreInterface } from "../../store/model/store.model";
import { User } from '../interfaces/user.interface';
import { setUserData } from "../../store/actions/store.actions";

@Injectable({ providedIn: 'root' })

export class BackendService {
  private baseUrl = 'https://lcii-cd674-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient,
    private store: Store<{ store: StoreInterface }>,) {
  }

  public sendUserProfile(userData: User) {
    return this.http.put<User>(`${this.baseUrl}/users/${userData.userID}/profile.json`, userData).subscribe(() => {
      this.store.dispatch(setUserData({ data: true }));
    });
  }

  public removeUser(userId: string) {
    return this.http.delete<User>(`${this.baseUrl}/users/${userId}.json`).subscribe();
  }

}
