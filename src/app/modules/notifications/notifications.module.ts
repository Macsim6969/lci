import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { ShareModule } from '../../shared/module/share.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: NotificationsComponent}
]

@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ]
})
export class NotificationsModule { }
