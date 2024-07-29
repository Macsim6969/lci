import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";


@Injectable()

export class PayrollIconService {
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('gross', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/payroll/gross.svg'));
    this.matIconRegistry.addSvgIcon('loan', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/payroll/loan.svg'));
    this.matIconRegistry.addSvgIcon('net', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/payroll/net.svg'));
    this.matIconRegistry.addSvgIcon('tax', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/payroll/tax.svg'));
  }
}
