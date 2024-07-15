import { NgModule } from "@angular/core";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from "@angular/material/card";
import { MatLabel } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from "@angular/common";
import { PopupUserComponent } from "../components/popup-user/popup-user.component";
import { LoadingComponent } from "../components/loading/loading.component";

@NgModule({
  declarations: [
    PopupUserComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatLabel,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatLabel,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    PopupUserComponent,
    LoadingComponent

  ]
})

export class ShareModule { }