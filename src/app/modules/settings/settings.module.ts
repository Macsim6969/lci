import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/module/share.module';
import { SettingsTabsComponent } from './@shared/components/settings-tabs/settings-tabs.component';
import { SizeComponent } from './@shared/components/size/size.component';
import { SettingsApiService } from '../../shared/services/backendAPI/settingApi.service';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: 'size', component: SizeComponent }
    ]
  }
]

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsTabsComponent,
    SizeComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsModule { }
