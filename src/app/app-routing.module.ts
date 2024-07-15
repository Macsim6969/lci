import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/isAuth.guard';

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';  
import { environment } from '../environment/environment';

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
export class AppRoutingModule { 
  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    const storage = getStorage(app);
    const database = getDatabase(app);
  }
}
