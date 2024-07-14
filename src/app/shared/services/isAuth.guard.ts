import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { StoreInterface } from '../../store/model/store.model';
import { selectIsLogin } from '../../store/selectors/store.selectors';

@Injectable()
export class AuthGuard implements CanActivate {
  public isLogin!: boolean;
  constructor(
    private store: Store<{ store: StoreInterface }>,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.store.pipe(take(1), select(selectIsLogin)).subscribe((dataLogin: boolean) => {
      this.isLogin = dataLogin
      console.log(this.isLogin);
    })

    const user = JSON.parse(localStorage.getItem('userData'))

    if (this.isLogin || user) {
      return true;
    } else {
      return this.router.createUrlTree(['/auth/register']);
    }
  }
}
