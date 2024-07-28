import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-settings-tabs',
  templateUrl: './settings-tabs.component.html',
  styleUrl: './settings-tabs.component.scss'
})
export class SettingsTabsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public settingsTab: [{ title: string }];
  public activeTab: number;

  constructor(
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSettingsDataFromJSON();
    this.openTab(0);
  }

  private getSettingsDataFromJSON() {
    this.translate.stream('settingsTab').pipe(takeUntil(this.destroy$)).subscribe((data: [{ title: string }]) => {
      this.settingsTab = data;
    })
  }

  public openTab(index: number) {
    this.activeTab = index;
    this.router.navigate(['/settings/size']).then();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
