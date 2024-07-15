import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/isAuth.guard';


const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)},
  { path: 'st-sett-pr', loadChildren: () => import('./module/st-sett-pr/st-sett-pr.module').then((m) => m.StSettPrModule)}

]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
