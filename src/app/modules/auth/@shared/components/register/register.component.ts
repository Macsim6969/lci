import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

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
  constructor() { }


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

  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}