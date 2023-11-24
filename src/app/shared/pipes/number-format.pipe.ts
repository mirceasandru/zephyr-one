import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'numberFormat',
  standalone: true
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) return '';

    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
