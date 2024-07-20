import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salary'
})
export class SalaryPipe implements PipeTransform {

  transform(value: string | number): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    return `${value}$`;
  }
}
