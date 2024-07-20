import { Component, OnInit } from '@angular/core';
import { StaffListData } from '../../../../../shared/base/staffList';
import { TranslateService } from '@ngx-translate/core';
import { StoreInterface } from '../../../../../store/model/store.model';
import { Store } from '@ngrx/store';
import { GlobalIconService } from '../../../../../shared/services/icons/globalIcon.service';

@Component({
  selector: 'app-staff-mini-list',
  templateUrl: './staff-mini-list.component.html',
  styleUrl: './staff-mini-list.component.scss'
})
export class StaffMiniListComponent extends StaffListData implements OnInit {
  
  constructor(
    override translate: TranslateService,
    override store: Store<{ store: StoreInterface }>,
    private globalIcon: GlobalIconService
  ) {
    super(translate, store)
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

}
