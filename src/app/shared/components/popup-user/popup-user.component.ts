import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs';
import { FirebaseStorageService } from '../../../modules/st-sett-pr/@shared/services/firebaseStorage.service';
import { BackendService } from '../../services/backend.service';
import { StoreInterface } from '../../../store/model/store.model';
import { selectUserInfo } from '../../../store/selectors/store.selectors';
import { User } from '../../interfaces/user.interface';
import { UserSavePopupService } from '../../services/user-save-popup.service';
import { StaffAddedService } from '../../services/staffAdded.service';

@Component({
  selector: 'app-popup-user',
  templateUrl: './popup-user.component.html',
  styleUrl: './popup-user.component.scss'
})
export class PopupUserComponent implements OnInit {
  @Input() staffView: User;
  @Input() activePage: 'profile' | 'staff-create';
  public form: FormGroup;
  public user: User;
  public previewUrl: string | ArrayBuffer | null = null;
  public selectedFile: File | null = null;
  constructor(
    private firebaseStorageService: FirebaseStorageService,
    private store: Store<{ store: StoreInterface }>,
    private userSavePopup: UserSavePopupService,
    private staffAdded: StaffAddedService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  private getUserInfo() {
    if (this.staffView) {
      this.setForm(this.staffView);
    } else if (this.activePage === 'staff-create') {
      this.setForm();
    } else if (this.activePage !== 'profile') {
      const localUser = JSON.parse(localStorage.getItem('localUser'));
      this.user = localUser;
      localUser ? this.setForm(localUser) : null;
    } else {
      this.store.pipe(select(selectUserInfo), take(1)).subscribe(async (user: User) => {
        this.user = user;
        if (user) {
          this.setForm(user);
          user ? this.previewUrl = await this.firebaseStorageService.onGetImage(user) : null;
        }
      })
    }
  }

  private setForm(user?: User) {
    this.form = new FormGroup<any>({
      name: new FormControl(user ? user.name : '', [Validators.required]),
      lastName: new FormControl(user ? user.lastName : '', [Validators.required]),
      email: new FormControl(user ? user.email : '', [Validators.required, Validators.email]),
      password: new FormControl(user ? user.email : '', [Validators.required, Validators.minLength(6)]),
      number: new FormControl(user ? user.number : '', [Validators.required]),
      gender: new FormControl(user ? user.gender : '', [Validators.required]),
      role: new FormControl(user ? user.role : '', [Validators.required]),
      designation: new FormControl(user ? user.designation : '', [Validators.required]),
      id: new FormControl(user ? user.userID : '', [Validators.required]),
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
    if (this.activePage === 'profile' || !this.activePage) {
      this.userSavePopup.submitUserDataSave(this.selectedFile, this.form, this.user);
      this.form.reset();
    } else if (this.activePage === 'staff-create') {
      this.staffAdded.submitUserDataSave(this.selectedFile, this.form, this.user);
      this.form.reset();
    }
  }

}
