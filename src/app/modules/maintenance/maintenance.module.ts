import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';
import { ShareModule } from '../../shared/module/share.module';
import { ScheduledComponent } from './@shared/components/scheduled/scheduled.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HeaderDashboardComponent } from './@shared/components/header-dashboard/header-dashboard.component';
import { MaintenanceIconService } from './@shared/services/maintenanceIcon.service';
import { DashboardModule } from '../dashboard/dashboard.module';

const routes: Routes = [
  {path: '', component: MaintenanceComponent}
]

@NgModule({
  declarations: [
    MaintenanceComponent,
    ScheduledComponent,
    HeaderDashboardComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MaintenanceIconService,
    provideNativeDateAdapter()
  ]
})
export class MaintenanceModule { }
