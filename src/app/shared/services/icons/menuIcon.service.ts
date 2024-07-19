import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable()

export class MenuIconService {
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon('dashboard', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/menu/Dashboard.svg'));
    this.matIconRegistry.addSvgIcon('staff', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/menu/staff.svg'));
    this.matIconRegistry.addSvgIcon('memo', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/menu/memo.svg'));
  }
}