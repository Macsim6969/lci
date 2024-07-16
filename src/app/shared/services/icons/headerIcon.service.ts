import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";


@Injectable()

export class HeaderIconService {
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon('notification', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/header/notification.svg'));
    this.matIconRegistry.addSvgIcon('arrow', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/header/arrow.svg'));

    this.matIconRegistry.addSvgIcon('logout', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/header-popup/logout.svg'));
    this.matIconRegistry.addSvgIcon('profile', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/header-popup/profile.svg'));
    this.matIconRegistry.addSvgIcon('settings', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/header-popup/settings.svg'));
  }
}
