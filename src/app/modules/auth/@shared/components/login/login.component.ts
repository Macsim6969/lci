import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { saveData } from '../../interfaces/form.interface';

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
    private router: Router
  ) { }

  ngOnInit() {
    const isSaveData = JSON.parse(localStorage.getItem('save'));
    isSaveData ? this.initializeForm(isSaveData) : this.initializeForm();
    isSaveData ? this.hideRequiredControl.setValue(true) : null;
  }

  private initializeForm(isSave?: saveData) {
    this.form = new FormGroup<any>({
      email: new FormControl(isSave.email, [Validators.required, Validators.email]),
      password: new FormControl(isSave.password, [
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
          this.router.navigate([`/`]).then();
          if (this.hideRequiredControl && this.form.value) {
            const newSaveData = { ...formData, isSaveSettings: true }
            localStorage.setItem('save', JSON.stringify(newSaveData));
            this.form.reset();
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
