import { MemosCreateComponent } from './@shared/components/memos-create/memos-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoComponent } from './memo.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/module/share.module';
import { MemoHeaderComponent } from './@shared/components/memo-header/memo-header.component';
import { MemoListComponent } from './@shared/components/memo-list/memo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemoViewComponent } from './@shared/components/memo-view/memo-view.component';
import { MemoService } from './@shared/services/memo.service';
import { PopupReviewedComponent } from './@shared/components/popup-reviewed/popup-reviewed.component';
import { PopupReviewedSerivce } from './@shared/services/popup-reviewed.service';

const routes: Routes = [
  {
    path: '', component: MemoComponent, children: [
      { path: 'create', component: MemosCreateComponent },
      { path: 'view', component: MemoViewComponent }
    ]
  }
]

@NgModule({
  declarations: [
    MemoComponent,
    MemoHeaderComponent,
    MemoListComponent,
    MemosCreateComponent,
    MemoViewComponent,
    PopupReviewedComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MemoComponent
  ],
  providers: [
    MemoService,
    PopupReviewedSerivce
  ]
})
export class MemoModule { }
