import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { StoreInterface } from '../../store/model/store.model';
import { newUserID, startGetData } from '../../store/actions/store.actions';
import { Subject, takeUntil } from 'rxjs';
import { selectUserInfo } from '../../store/selectors/store.selectors';
import { User } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public date: Date = new Date();
  public name: string;
  constructor(
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.translate.use('en');
    this.initializeIsUserData();
    this.getUserInfoFromStore();
  }

  private getUserInfoFromStore() {
    this.store.pipe(select(selectUserInfo), takeUntil(this.destroy$)).subscribe((data: User) => {
      this.name = data?.name;
    })
  }

  private initializeIsUserData() {
    if (localStorage.getItem('userData')) {
      const id = JSON.parse(localStorage.getItem('userData'));
      this.store.dispatch(newUserID({ id: id.localId }));
      this.store.dispatch(startGetData());
    }
  }

  ngOnDestroy(): void {

  }

}
