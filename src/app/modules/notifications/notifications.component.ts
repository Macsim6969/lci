import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NotificationApiService } from '../../shared/services/backendAPI/notificationApi.service';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { selectNotifications } from '../../store/selectors/store.selectors';
import { Notification } from './@shared/interfaces/notification.interface';
import { timeAgo } from '../../shared/base/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public notificationList: Notification[];


  constructor(
    private notificationApi: NotificationApiService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.initializeNotificationData();
  }

  private initializeNotificationData() {
    this.store.pipe(select(selectNotifications), takeUntil(this.destroy$)).subscribe((data: Notification[]) => {
      this.notificationList = Object.values(data);
    })
  }

  formatTimeAgo(dateStr: Date): string {
    const date = new Date(dateStr);
    return timeAgo(date);
  }

  public mark() { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
