import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/module/share.module';
import { StaffComponent } from './staff.component';
import { StaffHeaderComponent } from './@shared/components/staff-header/staff-header.component';
import { StaffAddedComponent } from './@shared/components/staff-added/staff-added.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffListComponent } from './@shared/components/staff-list/staff-list.component';
import { StaffService } from './@shared/services/staff.service';

const routes: Routes = [
  { path: '', component: StaffComponent, children: [
    {path: 'add', component: StaffAddedComponent}
  ] }
]

@NgModule({
  declarations: [
    StaffComponent,
    StaffHeaderComponent,
    StaffAddedComponent,
    StaffListComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    StaffService
  ]
})
export class StaffModule { }
