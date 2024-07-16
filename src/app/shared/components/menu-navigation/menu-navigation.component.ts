import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { MenuNavigationInterface } from '../../interfaces/menuNavigation.interface';
import { MenuIconService } from '../../services/menuIcon.service';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrl: './menu-navigation.component.scss'
})
export class MenuNavigationComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public menuNavigation: MenuNavigationInterface[];
  constructor(
    private translate: TranslateService,
    private menuIcon: MenuIconService
  ) { }

  ngOnInit(): void {
    this.streamMenuNavigationData();
  }

  private streamMenuNavigationData() {
    this.translate.stream('menuNavigation').pipe(takeUntil(this.destroy$))
      .subscribe((data: MenuNavigationInterface[]) => {
        this.menuNavigation = data;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
