import { MemosCreateComponent } from './@shared/components/memos-create/memos-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoComponent } from './memo.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/module/share.module';
import { MemoHeaderComponent } from './@shared/components/memo-header/memo-header.component';
import { MemoListComponent } from './@shared/components/memo-list/memo-list.component';

const routes: Routes = [
  { path: '', component: MemoComponent , children: [
    {path: 'create', component: MemosCreateComponent}
  ]}
]

@NgModule({
  declarations: [
    MemoComponent,
    MemoHeaderComponent,
    MemoListComponent,
    MemosCreateComponent
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
