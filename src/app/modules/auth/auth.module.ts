import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ShareModule } from '../../shared/module/share.module';
import { LoginComponent } from './@shared/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './@shared/components/register/register.component';

const roues: Routes = [
  { path: '', component: AuthComponent, children: [
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent}
  ] }
]

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(roues)
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
