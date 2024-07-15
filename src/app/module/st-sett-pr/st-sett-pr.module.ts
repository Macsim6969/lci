import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StSettPrComponent } from './st-sett-pr.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/module/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: StSettPrComponent }
]

@NgModule({
  declarations: [
    StSettPrComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
  ],
  exports: [StSettPrComponent]
})
export class StSettPrModule { }
