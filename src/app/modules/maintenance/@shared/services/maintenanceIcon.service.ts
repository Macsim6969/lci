import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable()

export class MaintenanceIconService {
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon('scheduled', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/maintenance/scheduled.svg'));
    this.matIconRegistry.addSvgIcon('completed', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/maintenance/completed.svg'));
    this.matIconRegistry.addSvgIcon('pending', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/maintenance/pending.svg'));
    this.matIconRegistry.addSvgIcon('overdue', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/maintenance/overdue.svg'));
  }
}