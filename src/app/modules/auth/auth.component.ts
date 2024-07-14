import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  loginRegister!: 'login' | 'register';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.streamRoutePage();
  }

  private streamRoutePage(): void {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: any) => {
        if (event?.routerEvent?.url === '/auth/login') {
          this.loginRegister = 'login';
        } else if (event.url === '/auth/register') {
          this.loginRegister = 'register';
        }
      });
  }

  public changeAuth(loginRegister: 'login' | 'register') {
    const route = loginRegister === 'login' ? 'register' : 'login';
    this.router.navigate([`/auth/${route}`]).then();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
