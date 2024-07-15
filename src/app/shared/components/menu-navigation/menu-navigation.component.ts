import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrl: './menu-navigation.component.scss'
})
export class MenuNavigationComponent implements OnInit {

  public menuNavigation: any;
  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.streamMenuNavigationData();
  }

  private streamMenuNavigationData() {
    this.translate.stream('menuNavigation').subscribe((data) => {
      this.menuNavigation = data;
    })
  }
}
