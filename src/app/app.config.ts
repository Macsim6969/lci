import { provideRouter, Routes } from "@angular/router";


const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule)}
]

export const appConfig = {
  providers: [
    provideRouter(routes)
  ]
};
