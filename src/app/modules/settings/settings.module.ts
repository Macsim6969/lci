import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/module/share.module';
import { SettingsTabsComponent } from './@shared/components/settings-tabs/settings-tabs.component';
import { SizeComponent } from './@shared/components/size/size.component';
import { FormsModule } from '@angular/forms';
import { StylesComponent } from './@shared/components/styles/styles.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: 'size', component: SizeComponent },
      { path: 'style', component: StylesComponent }
    ]
  }
]

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsTabsComponent,
    SizeComponent,
    StylesComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsModule { }
