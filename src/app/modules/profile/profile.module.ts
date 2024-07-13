import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/module/share.module';

const routes: Routes = [
  { path: '', component: ProfileComponent }
]

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
