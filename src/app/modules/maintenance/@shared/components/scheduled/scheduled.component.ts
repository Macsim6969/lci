import { AfterViewChecked, AfterViewInit, Component, ElementRef, model, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectMaintenanceList } from '../../../../../store/selectors/maintenance.selectors';
import { Subject, takeUntil } from 'rxjs';
import { MaintanceList } from '../../interfaces/maintenance.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrl: './scheduled.component.scss'
})
export class ScheduledComponent implements OnInit, AfterViewChecked, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public selected: Date | null = new Date();
  private maintenanceList: MaintanceList[] = [];
  public maintenance: MaintanceList[];

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
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
        this.check(this.selected);
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
    if (value) {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, '0');
      const day = String(value.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      this.maintenance = this.maintenanceList.filter(e => (e.date as any) === formattedDate)
        .sort((a, b) => (a.number as number) - (b.number as number));;
    }
  }

  public dateClass(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return this.maintenanceList?.some(e => (e.date as any) === formattedDate) ? 'highlight-date' : '';
  };

  public checkList(id: number) {
    this.router.navigate([`/maintenance/${id}`]).then();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
