import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";


@Injectable()

export class GlobalIconService {
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon('search', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/global/search.svg'));
    this.matIconRegistry.addSvgIcon('arrow', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/global/arrow.svg'));
    this.matIconRegistry.addSvgIcon('arrow_type', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/global/arrow_type.svg'));
    this.matIconRegistry.addSvgIcon('close', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/global/close.svg'));
  }
}
