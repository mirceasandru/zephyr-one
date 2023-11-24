import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentageFormat',
  standalone: true
})
export class PercentageFormatPipe implements PipeTransform {
  transform(value: number): string {
    // Round the value to two decimal places
    const formattedValue = value.toFixed(2);

    // Separate the integer and decimal parts
    const [integerPart, decimalPart] = formattedValue.split('.');

    // Determine the number of digits in the integer part
    const integerDigits = integerPart.length;

    // Handle different cases based on the number of digits
    switch (integerDigits) {
      case 1:
        return `${integerPart}.${decimalPart}%`;
      case 2:
        return `${integerPart}.${decimalPart}%`;
      case 3:
        return `${integerPart}.${decimalPart}%`;
      default:
        return `${formattedValue}%`;
    }
  }
}