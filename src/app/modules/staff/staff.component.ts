import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalIconService } from '../../shared/services/icons/globalIcon.service';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { selectUsersProfile } from '../../store/selectors/store.selectors';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public usersList: User[];
  public staffsFilter: string[];
  constructor(
    private globalIcon: GlobalIconService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.streamStafProfile();
  }

  private streamStafProfile() {
    this.store.pipe(select(selectUsersProfile), takeUntil(this.destroy$)).subscribe((users: User[]) => {
      this.usersList = users;
      this.staffsFilter = users?.reduce((acc, value) => {
        acc.push(value.role)
        return acc;
      }, [])
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
