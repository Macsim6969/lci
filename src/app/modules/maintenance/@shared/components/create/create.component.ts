import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaintanceList } from '../../interfaces/maintenance.interface';
import { MaintenanceApiService } from '../../../../../shared/services/backendAPI/maintenanceApi.service';
import { PopupService } from '../../../../../shared/services/popup.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService,
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      maintenanceType: new FormControl('', [Validators.required]),
      option: new FormControl('', [Validators.required])
    })
  }

  public submit(): void {
    const newData: MaintanceList = {
      ...this.form.value,
      status: 'Open'
    }

    this.maintenanceApi.updateMaintenanceDashboard(newData).add(() => {
      this.popupService._isOpenDone = true;
      this.backTo();
    });
  }

  public backTo() {
    const memoElement = document.querySelector('.create_maintenance_popup');
    const navigateToMemo = () => this.router.navigate(['/maintenance']);
    if (memoElement) {
      console.log(memoElement)
      memoElement.classList.add('close_animation');
      memoElement.addEventListener('animationend', navigateToMemo, { once: true });
    } else {
      navigateToMemo();
    }
  }

}
