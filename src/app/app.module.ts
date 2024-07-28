import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { storeReducers } from './store/reducers/store.reducers';
import { AuthEffects } from './store/effects/store.effects';
import { AuthGuard } from './shared/services/isAuth.guard';
import { AuthService } from './modules/auth/@shared/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupService } from './shared/services/popup.service';
import { UserSavePopupService } from './shared/services/user-save-popup.service';
import { StaffAddedService } from './shared/services/staffAdded.service';
import { StaffViewService } from './shared/services/staffView.service';
import { MaintenanceApiService } from './shared/services/backendAPI/maintenanceApi.service';
import { NotificationApiService } from './shared/services/backendAPI/notificationApi.service';
import { SettingsApiService } from './shared/services/backendAPI/settingApi.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot({ store: storeReducers}),
    EffectsModule.forRoot([AuthEffects]),
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    PopupService,
    UserSavePopupService,
    StaffAddedService,
    StaffViewService,
    MaintenanceApiService,
    NotificationApiService,
    SettingsApiService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }