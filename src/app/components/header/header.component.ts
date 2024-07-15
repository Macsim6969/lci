import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HeaderIconService } from '../../shared/services/headerIcon.service';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/@shared/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';
import { FirebaseStorageService } from '../../modules/st-sett-pr/@shared/services/firebaseStorage.service';
import { StoreInterface } from '../../store/model/store.model';
import { select, Store } from '@ngrx/store';
import { selectUserInfo } from '../../store/selectors/store.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  @Input() user: User;
  public avatar: string;
  public isOpenPopup!: boolean;
  constructor(
    private headerIcon: HeaderIconService,
    private router: Router,
    private authService: AuthService,
    private store: Store<{ store: StoreInterface }>,
    private firebaseStorageService: FirebaseStorageService
  ) { }

  ngOnInit(): void {
    this.streamCheckAvatar();
  }

  private async streamCheckAvatar() {
    this.store.pipe(select(selectUserInfo), takeUntil(this.destroy$)).subscribe(async (data: User) => {
      data ? this.avatar = await this.firebaseStorageService.onGetImage(data) : null;
      console.log(this.avatar);
    });
  }

  public openPopup() {
    this.isOpenPopup = !this.isOpenPopup;
  }

  public useRoute(url: 'profile' | 'settings' | 'logout') {
    if (url === 'profile') {
      this.setRouteToProfile();
    } else if (url === 'settings') {
      return
    } else if (url === 'logout') {
      this.authService.logout();
      this.router.navigate(['/auth/login']).then();
    }

    this.isOpenPopup = false;
  }

  private setRouteToProfile() {
    this.router.navigate(['/']).then();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
