import { Component } from '@angular/core';
import { HeaderIconService } from '../../shared/services/headerIcon.service';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/@shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public isOpenPopup!: boolean;
  constructor(
    private headerIcon: HeaderIconService,
    private router: Router,
    private authService: AuthService
  ) { }

  public openPopup() {
    this.isOpenPopup = !this.isOpenPopup;
  }

  public useRoute(url: 'profile' | 'settings' | 'logout') {
    if (url === 'profile') {
      this.setRouteToProfile();
    } else if (url === 'settings') {
      return
    } else if (url === 'logout') {
      this.authService.logout();
      this.router.navigate(['/auth/login']).then();
    }

    this.isOpenPopup = false;
  }

  private setRouteToProfile() {
    this.router.navigate(['/']).then();
  }
}
