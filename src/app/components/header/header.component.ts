import { Component } from '@angular/core';
import { HeaderIconService } from '../../shared/services/headerIcon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private headerIcon: HeaderIconService
  ){}
}
