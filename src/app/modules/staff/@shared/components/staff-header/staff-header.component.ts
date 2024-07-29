import { Component, Input } from '@angular/core';
import { User } from '../../../../../shared/interfaces/user.interface';
import { Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staff-header',
  templateUrl: './staff-header.component.html',
  styleUrls: ['./staff-header.component.scss', '../../../../../shared/styles/headerPage.scss']
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
