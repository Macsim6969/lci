import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';
import { take } from 'rxjs';
import { User } from '../../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-staff-view',
  templateUrl: './staff-view.component.html',
  styleUrl: './staff-view.component.scss'
})
export class StaffViewComponent implements OnInit {

  public staffList: User
  constructor(
    private router: Router,
    private staffService: StaffService
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  private getUserData() {
    this.staffService._isStaffList$.pipe(take(1)).subscribe((data: User) => {
      this.staffList = data;
    })
  }


  public backTo() {
    const memoElement = document.querySelector('.create_staff');
    const navigateToMemo = () => this.router.navigate(['/staff']);

    if (memoElement) {
      memoElement.classList.add('close_animation');
      memoElement.addEventListener('animationend', navigateToMemo, { once: true });
    } else {
      navigateToMemo();
    }
  }
}
