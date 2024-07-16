import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/module/share.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HeaderIconService } from '../../shared/services/headerIcon.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MenuNavigationComponent } from '../../shared/components/menu-navigation/menu-navigation.component';
import { MenuIconService } from '../../shared/services/menuIcon.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', loadChildren: () => import('../profile/profile.module').then((m) => m.ProfileModule) },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule) },
      { path: 'memo', loadChildren: () => import('../memo/memo.module').then((m) => m.MemoModule) }
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
    MenuIconService
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
