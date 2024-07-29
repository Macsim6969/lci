import { Component } from '@angular/core';
import { SettingsApiService } from '../../../../../shared/services/backendAPI/settingApi.service';
import { combineLatest, take } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectUserInfo } from '../../../../../store/selectors/store.selectors';
import { selectSettingsData } from '../../../../../store/selectors/settings.selectors';
import { Settings } from '../../interfaces/settings.interface';

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrl: './styles.component.scss'
})
export class StylesComponent {

  constructor(
    private settingsApi: SettingsApiService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  public choiceMode(id: string) {
    document.body.className = '';
    document.body.classList.add(id);
    combineLatest([this.store.pipe(select(selectUserInfo)), this.store.pipe(select(selectSettingsData))])
      .pipe(take(1))
      .subscribe(([user, settings]) => {
        const newSettings: Settings = {
          ...settings,
          style: id
        }
        this.settingsApi.updateSettingData(user.userID, newSettings);
      });
  }
}
