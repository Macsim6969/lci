import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsApiService } from '../../../../../shared/services/backendAPI/settingApi.service';
import { combineLatest, Subject, take, takeUntil, timer } from 'rxjs';
import { Settings } from '../../interfaces/settings.interface';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectSettingsData } from '../../../../../store/selectors/settings.selectors';
import { selectUserInfo } from '../../../../../store/selectors/store.selectors';
import { User } from '../../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrl: './size.component.scss'
})
export class SizeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private user: User;
  public settingsData: Settings;

  constructor(
    private settingsApi: SettingsApiService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.getSettingData();
  }

  private getSettingData() {
    combineLatest([this.store.pipe(select(selectUserInfo)), this.store.pipe(select(selectSettingsData))])
      .pipe(take(1))
      .subscribe(([user, settings]) => {
        this.user = user;
        this.settingsData = settings;
        const defaultSize = settings?.size;
        this.formatLabel(defaultSize);
        this.updateFontSize(null, defaultSize);
      });
  }

  public formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'px';
    }
    return `${value}`;
  }

  public updateFontSize(event?: any, ts?: number): void {
    let value: number;
    if (event) {
      value = event.target.ariaValueText;
    } else {
      value = ts;
    }

    timer(300).pipe(take(1)).subscribe(() => {
      document.documentElement.style.fontSize = `${value}px`;
      const settingsData: Settings = {
        ...this.settingsData,
        size: value
      }
      this.settingsApi.updateSettingData(this.user.userID, settingsData);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
