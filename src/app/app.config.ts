import { provideRouter, Routes } from "@angular/router";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from "@angular/common/http";


const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule) },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule) },

]

export const appConfig = {
  providers: [
    provideRouter(routes), provideAnimationsAsync(), provideHttpClient()
  ]
};
