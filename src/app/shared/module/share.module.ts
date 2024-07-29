import { NgModule } from "@angular/core";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from "@angular/material/card";
import { MatLabel } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from "@angular/common";
import { PopupUserComponent } from "../components/popup-user/popup-user.component";
import { LoadingComponent } from "../components/loading/loading.component";

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PopupConfirmedComponent } from "../components/popup-confirmed/popup-confirmed.component";
import { SalaryPipe } from "../pipe/salary.pipe";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSliderModule} from '@angular/material/slider';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [
    PopupUserComponent,
    LoadingComponent,
    PopupConfirmedComponent,
    SalaryPipe
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
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSliderModule,
    MatStepperModule
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
    LoadingComponent,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    PopupConfirmedComponent,
    SalaryPipe,
    MatSliderModule,
    MatStepperModule
  ]
})

export class ShareModule { }