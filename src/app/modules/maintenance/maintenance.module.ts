import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';
import { ShareModule } from '../../shared/module/share.module';
import { ScheduledComponent } from './@shared/components/scheduled/scheduled.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HeaderDashboardComponent } from './@shared/components/header-dashboard/header-dashboard.component';
import { MaintenanceIconService } from './@shared/services/maintenanceIcon.service';
import { HeaderCreateComponent } from './@shared/components/header-create/header-create.component';
import { CreateComponent } from './@shared/components/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './@shared/components/view/view.component';

const routes: Routes = [
  {
    path: '', component: MaintenanceComponent, children: [
      { path: 'create', component: CreateComponent },
      { path: ':id', component: ViewComponent}
    ]
  }
]

@NgModule({
  declarations: [
    MaintenanceComponent,
    ScheduledComponent,
    HeaderDashboardComponent,
    HeaderCreateComponent,
    CreateComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MaintenanceIconService,
    provideNativeDateAdapter()
  ]
})
export class MaintenanceModule { }
