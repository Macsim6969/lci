import { Component } from '@angular/core';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrl: './size.component.scss'
})
export class SizeComponent {


  public formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'px';
    }
    return `${value}`;
  }

  public updateFontSize(event: any): void {
    console.log(event)
    const value = event.target.ariaValueText;
    setTimeout(() => {
      document.documentElement.style.fontSize = `${value}px`;
    }, 300);
  }
}
