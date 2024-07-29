import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-create',
  templateUrl: './header-create.component.html',
  styleUrl: './header-create.component.scss'
})
export class HeaderCreateComponent {

  constructor(
    private router: Router
  ) { }

  public openCreate() {
    this.router.navigate(['/maintenance/create']).then();
  }

}
