import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { saveData } from '../../interfaces/form.interface';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectUserId, selectUsers } from '../../../../../store/selectors/store.selectors';
import { User } from '../../../../../shared/interfaces/user.interface';
import { BackendService } from '../../../../../shared/services/backend.service';
import { newUserID } from '../../../../../store/actions/store.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public form!: FormGroup;
  public hideRequiredControl = new FormControl(false);

  public formData!: Form;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<{ store: StoreInterface }>,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    this.backendService.getUsers();
    const isSaveData = JSON.parse(localStorage.getItem('save'));
    isSaveData ? this.initializeForm(isSaveData) : this.initializeForm();
    isSaveData ? this.hideRequiredControl.setValue(true) : null;
  }

  private initializeForm(isSave?: saveData) {
    this.form = new FormGroup<any>({
      email: new FormControl(isSave?.email ? isSave?.email : '', [Validators.required, Validators.email]),
      password: new FormControl(isSave?.password ? isSave?.password : '', [
        Validators.required,
        Validators.minLength(8),
      ])
    });
  }

  public submit() {
    const formData = { ...this.form.value };
    this.authService
      .login(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.checkToUserInfo();
          if (this.hideRequiredControl && this.form.value) {
            const newSaveData = { ...formData, isSaveSettings: true }
            localStorage.setItem('save', JSON.stringify(newSaveData));
            this.form.reset();
          }
        }
      });
  }

  private checkToUserInfo() {
    this.store.pipe(select(selectUsers), take(1)).subscribe((data: User[]) => {
      const user = Object.values(data)?.find((e: any) => e.profile.email === this.form.value.email);

      if (user['profile'].number) {
        localStorage.setItem('id', JSON.stringify(user['profile'].userID));
        this.router.navigate([`/`]).then();
      } else {
        this.backendService.getUserInfo(user['profile'].userID);
        localStorage.setItem('localUser', JSON.stringify(user['profile']))
        this.router.navigate([`/st-sett-pr`]).then();
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
