import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public date: Date = new Date();
  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    this.translate.use('en');
  }

}
