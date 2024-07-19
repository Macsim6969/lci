import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../../../shared/interfaces/user.interface';
import { Subject, take, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { GlobalIconService } from '../../../../../shared/services/icons/globalIcon.service';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.scss'
})
export class StaffListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  @Input() public staffList: User[];
  @Input() public backstaffList: User[];
  public memoDataType: { title: string }[];
  constructor(
    private translate: TranslateService,
    private router: Router,
    private staffService: StaffService,
    private globalIcon: GlobalIconService
  ) { }

  ngOnInit(): void {
    this.streamMemosListData();
    this.streamCheckSearchDataForList();
    this.streamCheckFilterList();
  }

  private streamMemosListData() {
    this.translate.stream('stafList').pipe(take(1)).subscribe((data: { title: string }[]) => {
      this.memoDataType = data;
    })
  }

  private streamCheckSearchDataForList() {
    this.staffService._searchText$.pipe(takeUntil(this.destroy$)).subscribe((data: string) => {
      if (data) {
        this.staffList = this.backstaffList.filter(
          (e: User) => e.name.trim().toLocaleLowerCase().includes(data.toLocaleLowerCase()) ||
            e.lastName.trim().toLocaleLowerCase().includes(data.toLocaleLowerCase())
        );
      } else {
        this.staffList = this.backstaffList
      }
    })
  }

  private streamCheckFilterList() {
    this.staffService._filterText$.pipe(takeUntil(this.destroy$)).subscribe((data: string) => {
      if (data === 'All') {
        this.staffList = this.backstaffList;
      } else if (data) {
        this.staffList = this.backstaffList.filter(
          (e: User) => e.role === data);
      }
    });
  }


  public checkMemoView(id: string) {
    const newValue = this.staffList.find((e: User) => e.userID === id);
    this.staffService._isStaffList = newValue;
    this.router.navigate(['/staff/view']).then();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
