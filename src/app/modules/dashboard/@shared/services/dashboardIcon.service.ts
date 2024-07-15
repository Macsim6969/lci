import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";


@Injectable()

export class DashboardIconService {
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon('application', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/dashboard/application.svg'));
    this.matIconRegistry.addSvgIcon('departments', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/dashboard/departments.svg'));
    this.matIconRegistry.addSvgIcon('projects', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/dashboard/projects.svg'));
    this.matIconRegistry.addSvgIcon('staff', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/dashboard/staff.svg'));
  }
}
