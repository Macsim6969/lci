import { Component } from '@angular/core';
import { MaintenanceIconService } from './@shared/services/maintenanceIcon.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss'
})
export class MaintenanceComponent {

  constructor(
    private maintenanceIcon: MaintenanceIconService
  ){}

}
