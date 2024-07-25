import { Component, ElementRef, model, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectMaintenanceList } from '../../../../../store/selectors/maintenance.selectors';
import { Subject, takeUntil } from 'rxjs';
import { MaintanceList } from '../../interfaces/maintenance.interface';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrl: './scheduled.component.scss'
})
export class ScheduledComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public selected: Date | null;
  private maintenanceList: MaintanceList[];
  public maintenance: MaintanceList[];

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.getMaintenanceList();
  }

  ngAfterViewChecked(): void {
    this.highlightDates();
  }

  private getMaintenanceList() {
    this.store.pipe(select(selectMaintenanceList), takeUntil(this.destroy$))
      .subscribe((data) => {
        this.maintenanceList = Object.values(data);
      })
  }

  private highlightDates(): void {
    if (!this.maintenanceList || this.maintenanceList.length === 0) {
      return;
    }

    const calendarCells = this.el.nativeElement.querySelectorAll('.mat-calendar-body-cell');
    calendarCells.forEach(cell => {
      const ariaLabel = cell.getAttribute('aria-label');
      if (this.isMaintenanceDate(ariaLabel)) {
        this.renderer.addClass(cell, 'highlight-date');
      } else {
        this.renderer.removeClass(cell, 'highlight-date');
      }
    });
  }

  private isMaintenanceDate(ariaLabel: string): boolean {
    return this.maintenanceList.some(e => new Date(e.date).toDateString() === new Date(ariaLabel).toDateString());
  }

  public check(value: Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    this.maintenance = this.maintenanceList.filter(e => (e.date as any) === formattedDate);
  }

  public dateClass(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return this.maintenanceList?.some(e => (e.date as any) === formattedDate) ? 'highlight-date' : '';
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
