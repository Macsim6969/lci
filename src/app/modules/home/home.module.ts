import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/module/share.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HeaderIconService } from '../../shared/services/icons/headerIcon.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MenuNavigationComponent } from '../../shared/components/menu-navigation/menu-navigation.component';
import { MenuIconService } from '../../shared/services/icons/menuIcon.service';
import { GlobalIconService } from '../../shared/services/icons/globalIcon.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: '', loadChildren: () => import('../profile/profile.module').then((m) => m.ProfileModule) },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule) },
      { path: 'staff', loadChildren: () => import('../staff/staff.module').then((m) => m.StaffModule) },
      { path: 'payment-vouchers', loadChildren: () => import('../payment-vouchers/payment-vouchers.module').then((m) => m.PaymentVouchersModule) },
      { path: 'payroll', loadChildren: () => import('../payroll/payroll.module').then((m) => m.PayrollModule) },
      { path: 'memo', loadChildren: () => import('../memo/memo.module').then((m) => m.MemoModule) },
    ]
  }
]

@NgModule({
  declarations: [
    HomeComponent,
    MenuNavigationComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    })
  ],
  providers: [
    HeaderIconService,
    MenuIconService,
    GlobalIconService
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
