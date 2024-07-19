import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ShareModule } from '../../shared/module/share.module';
import { RouterModule, Routes } from '@angular/router';
import { DashboarInfodModule } from '../../shared/module/dashboard.module';
import { DashboardIconService } from './@shared/services/dashboardIcon.service';
import { MemoMiniListComponent } from './@shared/components/memo-mini-list/memo-mini-list.component';

const routes: Routes = [
  {path: '', component: DashboardComponent}
]

@NgModule({
  declarations: [
    DashboardComponent,
    MemoMiniListComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DashboarInfodModule,
    RouterModule.forChild(routes)
  ], 
  exports: [
    DashboardComponent
  ],
  providers: [
    DashboardIconService
  ]
})
export class DashboardModule { }
