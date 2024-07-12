import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuNavigationComponent } from '../../components/menu-navigation/menu-navigation.component';
import { ShareModule } from '../../shared/module/share.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderIconService } from '../../shared/services/headerIcon.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

const routes: Routes = [
  {path: '', component: HomeComponent}
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
    HeaderIconService
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
