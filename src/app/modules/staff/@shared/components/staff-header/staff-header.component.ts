import { Component, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StaffMiniList, User } from '../../../../../shared/interfaces/user.interface';
import { Router } from '@angular/router';
import { StoreInterface } from '../../../../../store/model/store.model';
import { select, Store } from '@ngrx/store';
import { selectStaffMiniList } from '../../../../../store/selectors/store.selectors';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staff-header',
  templateUrl: './staff-header.component.html',
  styleUrl: './staff-header.component.scss'
})
export class StaffHeaderComponent {
  @Input() public staffList: User[];
  @Input() public staffsFilter: string[];
  
  constructor(
    private router: Router,
    private staffService: StaffService
  ) { }

  public openCreateMemo() {
    this.router.navigate(['/staff/add']).then();
  }

  public changeData(event: any) {
    this.staffService._searchText = event.target.value;
  }

  public setFilter(name: any) {
     this.staffService._filterText = event.target['value'];
  }

}
