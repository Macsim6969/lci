import { Component, model } from '@angular/core';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrl: './scheduled.component.scss'
})
export class ScheduledComponent {
  selected: Date | null;
}
