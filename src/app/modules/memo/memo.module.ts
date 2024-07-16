import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoComponent } from './memo.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/module/share.module';

const routes: Routes = [
  { path: '', component: MemoComponent }
]

@NgModule({
  declarations: [
    MemoComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MemoComponent
  ]
})
export class MemoModule { }
