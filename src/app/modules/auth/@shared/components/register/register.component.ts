import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, take, takeUntil, timer } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public form!: FormGroup;
  public hideRequiredControl = new FormControl(false);

  public formData!: Form;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = new FormGroup<any>({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ])
    });
  }

  public submit() {
    const formData = { ...this.form.value };

    this.authService
      .sigUp(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        timer(300)
          .pipe(take(1))
          .subscribe(() => {
            data ? this.router.navigate(['/auth/login']).then() : null;
            if (this.hideRequiredControl && this.form.value) {
              localStorage.setItem('save', JSON.stringify(formData));
            }
          });
      });
    this.form.reset();
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
