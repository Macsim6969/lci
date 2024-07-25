import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { selectMaintenanceList } from '../../../../../store/selectors/maintenance.selectors';
import { MaintanceList } from '../../interfaces/maintenance.interface';
import { MaintenanceApiService } from '../../../../../shared/services/backendAPI/maintenanceApi.service';
import { PopupService } from '../../../../../shared/services/popup.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public maintenanceView: MaintanceList;
  private key: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{ store: StoreInterface }>,
    private maintenanceApi: MaintenanceApiService,
    private popupService: PopupService
  ) { }


  ngOnInit(): void {
    this.streamRouteParams();
  }

  private streamRouteParams() {
    combineLatest([
      this.route.params,
      this.store.pipe(select(selectMaintenanceList))
    ]).pipe(takeUntil(this.destroy$))
      .subscribe(([route, list]) => {
        this.maintenanceView = Object.values(list).filter(e => e.id === +route['id'])[0];
        this.key = Object.keys(list).filter(e => list[e].id === +route['id'])[0];
      });
  }

  public onStatusChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newData: MaintanceList = {
      ...this.maintenanceView,
      status: selectElement.value
    }

    this.maintenanceApi.updateMaintenanceList(this.key, newData).add(() => {
      this.popupService._isOpenDone = true;
      this.router.navigate(['/maintenance']).then();
    });
  }

  public backTo() {
    const memoElement = document.querySelector('.view_maintenance_popup');
    const navigateToMemo = () => this.router.navigate(['/maintenance']);
    if (memoElement) {
      memoElement.classList.add('close_animation');
      memoElement.addEventListener('animationend', navigateToMemo, { once: true });
    } else {
      navigateToMemo();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
