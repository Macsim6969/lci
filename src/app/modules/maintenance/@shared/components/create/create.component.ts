import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  constructor(
    private router: Router
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

  public submit(){}

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

  ngOnDestroy(): void {

  }
}
