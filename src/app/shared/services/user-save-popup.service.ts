import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../interfaces/user.interface";
import { BackendService } from "./backend.service";
import { FirebaseStorageService } from "../../modules/st-sett-pr/@shared/services/firebaseStorage.service";


@Injectable()

export class UserSavePopupService {

  constructor(
    private router: Router,
    private backendService: BackendService,
    private firebaseStorageService: FirebaseStorageService
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

    this.backendService.sendUserProfile(newUserData);
    form.reset();
    this.router.navigate(['/']).then();
  }
}