import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalformat',
  standalone: true
})
export class DecimalFormatPipe implements PipeTransform {
  transform(value: number): string {

    const formattedValue = Math.floor(value * 100) / 100;
    return formattedValue.toString();
  }
}