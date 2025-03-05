import { Pipe, PipeTransform } from '@angular/core';
import { DateFormat } from './dateFormat';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            return DateFormat.format(value);
        } else {
            return '';
        }
    }
}
