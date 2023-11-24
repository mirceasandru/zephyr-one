import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment'

@Pipe({
    name: 'localDate',
    standalone: true
})
export class LocalDatePipe implements PipeTransform {

    constructor() { }

    public transform(value: any, type: 'short' | 'full'): any {
        const format = type === 'full' ? 'MM-DD-YYYY hh:mm:ss' : 'MM-DD-YYYY'
        return moment(value).local().format(format);
    }
}