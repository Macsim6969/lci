import { Component, OnInit } from '@angular/core';
import { GlobalIconService } from '../../services/icons/globalIcon.service';
import { timer } from 'rxjs';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-popup-confirmed',
  templateUrl: './popup-confirmed.component.html',
  styleUrl: './popup-confirmed.component.scss'
})
export class PopupConfirmedComponent implements OnInit {
  constructor(
    private globalIcon: GlobalIconService,
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    this.setClose();
  }

  private setClose() {
    timer(3200).subscribe(() => {
      this.popupService._isOpenDone = false;
    })
  }


}
