import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./shared/app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { storeReducers } from './store/reducers/store.reducers';
import { AuthEffects } from './store/effects/store.effects';



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
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }