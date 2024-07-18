import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { StoreInterface } from '../../store/model/store.model';
import { newUserID, startGetData } from '../../store/actions/store.actions';
import { Subject, take, takeUntil, timer } from 'rxjs';
import { selectUserInfo } from '../../store/selectors/store.selectors';
import { User } from '../../shared/interfaces/user.interface';
import { HeaderInfoPageInterface } from '../../shared/interfaces/headerInfoPage.interface';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderIconService } from '../../shared/services/icons/headerIcon.service';
import { BackendService } from '../../shared/services/backend.service';
import { PopupService } from '../../shared/services/popup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public date: Date = new Date();
  public user: User;
  public headerInfoPage: HeaderInfoPageInterface[];
  public pageInfo: HeaderInfoPageInterface = null;
  public isOpenDonePopup: boolean;
  constructor(
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>,
    private router: Router,
    private headerIcon: HeaderIconService,
    private backendService: BackendService,
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    this.translate.use('en');
    this.initializeIsUserData();
    this.getUserInfoFromStore();
    this.streamHeaderInfoPageFromJSON();
    this.streamIsOpenPopup();
  }

  ngAfterViewInit(): void {
    this.streamCurrentPage();
  }

  private getUserInfoFromStore() {
    this.store.pipe(select(selectUserInfo), takeUntil(this.destroy$)).subscribe((data: User) => {
      this.user = data;
    })
  }

  private initializeIsUserData() {
    if (JSON.parse(localStorage.getItem('id'))) {
      const id = JSON.parse(localStorage.getItem('id'));
      this.store.dispatch(newUserID({ id: id }));
      this.store.dispatch(startGetData());
    }
  }

  private streamHeaderInfoPageFromJSON() {
    this.translate.stream('headerInfoPage').pipe(takeUntil(this.destroy$))
      .subscribe((data: HeaderInfoPageInterface[]) => {
        this.headerInfoPage = data;
      })
  }

  private streamIsOpenPopup() {
    this.popupService._isOpenDone$.pipe(takeUntil(this.destroy$)).subscribe((data: boolean) => {
      this.isOpenDonePopup = data;
    })
  }
  private streamCurrentPage() {
    timer(2000).pipe(take(1)).subscribe(() => {
      this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.updateHeaderInfoPage();
        }
      });
      this.updateHeaderInfoPage();
    })
  }

  updateHeaderInfoPage() {
    const currentUrl = this.router.url;
    if (this.user && currentUrl === '/dashboard' || currentUrl === '/') {
      this.pageInfo = this.headerInfoPage?.find((e: HeaderInfoPageInterface) => e.url === currentUrl);
      this.pageInfo.title = `Welcome, Mr. ${this.user?.name} ${this.user?.lastName}`;
      this.pageInfo.descr = `Today is ${this.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
    } else {
      this.pageInfo = this.headerInfoPage?.find((e: HeaderInfoPageInterface) => e.url === currentUrl);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
