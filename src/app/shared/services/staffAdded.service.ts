import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../interfaces/user.interface";
import { BackendService } from "./backend.service";
import { FirebaseStorageService } from "../../modules/st-sett-pr/@shared/services/firebaseStorage.service";
import { HttpClient } from "@angular/common/http";
import { AuthResponseData } from "../../modules/auth/@shared/services/auth.service";
import { environment } from "../../../environment/environment";
import { setStartDashboarfInfo } from "../base/startData";
import { tap } from "rxjs";
import { PopupService } from "./popup.service";


@Injectable()

export class StaffAddedService {

  constructor(
    private router: Router,
    private backendService: BackendService,
    private firebaseStorageService: FirebaseStorageService,
    private http: HttpClient,
    private popupService: PopupService
  ) { }


  public submitUserDataSave(selectedFile, form, user) {
    if (!selectedFile) {
      form.value.avatar = user?.avatar;
    } else {
      const oldPhotoUrl = user?.avatar;
      form.value.avatar = selectedFile.name;
      if (oldPhotoUrl) {
        const filePath = this.firebaseStorageService.getFilePathFromUrl(oldPhotoUrl);
        this.firebaseStorageService.deleteImage(filePath).catch(error => {
          console.error('Error deleting old avatar:', error);
        });
      }
      this.firebaseStorageService.updateProfilePhoto(selectedFile);
    }
    if (form.value.number === null || form.value.number === undefined) {
      form.value.number = user?.number;
    }
    this.setDataToStore(form, user);
  }

  private setDataToStore(form, user) {
    const newUserData: User = {
      ...user,
      serID: user?.userID,
      name: form.value.name,
      lastName: form.value.lastName,
      email: form.value.email,
      number: form.value.number,
      gender: form.value.gender,
      role: form.value.role,
      designation: form.value.designation,
      password: form.value.password,
      offMail: form.value.offMail,
      avatar: form.value.avatar
    }

    this.sigUp(newUserData);
  }

  private sigUp(userData) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, {
      email: userData.email, password: userData.password, returnSecureToken: true
    }).pipe(tap(resData => {
      const data = {
        ...userData,
        userID: resData.localId, email: userData.email, password: userData.password, name: userData.name, token: resData.idToken
      }
      this.backendService.sendUserProfile(data);
      this.backendService.setDashboardInfo(resData.localId, setStartDashboarfInfo());

    })).subscribe(() => {
      this.popupService._isOpenDone = true;
      this.router.navigate(['/staff']).then();
    });

  }
}