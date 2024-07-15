import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces/user.interface';
import { BackendService } from '../../shared/services/backend.service';
import { FirebaseStorageService } from '../../module/st-sett-pr/@shared/services/firebaseStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-user',
  templateUrl: './popup-user.component.html',
  styleUrl: './popup-user.component.scss'
})
export class PopupUserComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public user: User;
  public previewUrl: string | ArrayBuffer | null = null;
  public selectedFile: File | null = null;
  constructor(
    private backendService: BackendService,
    private firebaseStorageService: FirebaseStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  private getUserInfo() {
    const localUser = JSON.parse(localStorage.getItem('localUser'));
    this.user = localUser;
    localUser ? this.setForm(localUser) : null;
  }

  private setForm(user: User) {
    this.form = new FormGroup<any>({
      name: new FormControl(user.name ? user.name : '', [Validators.required]),
      lastName: new FormControl(user ? user.lastName : '', [Validators.required]),
      email: new FormControl(user ? user.email : '', [Validators.required, Validators.email]),
      number: new FormControl(user ? user.number : '', [Validators.required]),
      gender: new FormControl(user ? user.gender : '', [Validators.required]),
      role: new FormControl(user ? user.role : '', [Validators.required]),
      designation: new FormControl(user ? user.designation : '', [Validators.required]),
      id: new FormControl(user.userID ? user.userID : '', [Validators.required]),
      offMail: new FormControl(user ? user.offMail : '', [Validators.required, Validators.email]),
      avatar: new FormControl('', [Validators.required])
    })
  }

  public onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  public submit() {

    if (!this.selectedFile) {
      this.form.value.avatar = this.user?.avatar;
    } else {
      const oldPhotoUrl = this.user?.avatar;
      this.form.value.avatar = this.selectedFile.name;
      if (oldPhotoUrl) {
        const filePath = this.firebaseStorageService.getFilePathFromUrl(oldPhotoUrl);
        this.firebaseStorageService.deleteImage(filePath).catch(error => {
          console.error('Error deleting old avatar:', error);
        });
      }
      this.firebaseStorageService.updateProfilePhoto(this.selectedFile);
    }
    if (this.form.value.number === null || this.form.value.number === undefined) {
      this.form.value.number = this.user?.number;
    }
    this.setDataToStore();
  }

  private setDataToStore() {
    console.log(this.user);
    const newUserData: User = {
      ...this.user,
      userID: this.user?.userID,
      email: this.form.value.email,
      name: this.form.value.name,
      password: this.form.value.password,
      lastName: this.form.value.lastName,
      number: this.form.value.number,
      avatar: this.form.value.avatar
    }

    this.backendService.sendUserProfile(newUserData);
    this.form.reset()
    this.router.navigate(['/']).then();
  }

  ngOnDestroy(): void {

  }
}
