import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {


  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'px';
    }
    return `${value}`;
  }

  updateFontSize(event: any): void {
    console.log(event)
    const value = event.target.ariaValueText;
    setTimeout(() => {
      document.documentElement.style.fontSize = `${value}px`;
    }, 300);
  }
}
