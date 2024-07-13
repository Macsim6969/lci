import { NgModule } from "@angular/core";
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from "@angular/material/card";
import { MatLabel } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  imports: [
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatLabel,
    MatCheckboxModule
  ],
  exports: [
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatLabel,
    MatCheckboxModule
  ]
})

export class ShareModule{}