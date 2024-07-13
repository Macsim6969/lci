import { Component } from '@angular/core';
import { HeaderIconService } from '../../shared/services/headerIcon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public isOpenPopup!: boolean;
  constructor(
    private headerIcon: HeaderIconService,
    private router: Router
  ) { }

  public openPopup() {
    this.isOpenPopup = !this.isOpenPopup;
  }

  public useRoute(url: 'profile' | 'settings' | 'logout') {
    if (url === 'profile') {
      this.setRouteToProfile();
    }

    this.isOpenPopup = false;
  }

  private setRouteToProfile() {
    this.router.navigate(['/']).then();
  }
}
