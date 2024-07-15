import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-popup-user',
  templateUrl: './popup-user.component.html',
  styleUrl: './popup-user.component.scss'
})
export class PopupUserComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public user: User;
  constructor(
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  private getUserInfo() {
    const localUser = JSON.parse(localStorage.getItem('localUser'));
    localUser ? this.setForm(localUser) : null;
  }

  private setForm(user: User) {
    console.log(user)
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
    })
  }

  public submit() { }

  ngOnDestroy(): void {

  }
}
