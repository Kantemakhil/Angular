// import { NativeDateAdapter, DateAdapter } from '@angular/material';
import { DateFormat } from './dateFormat';
import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';

export const CUSTOM_DATE_FORMATS = {
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};
@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        return DateFormat.format(date);
    }

    parse(value: any): Date | null {
        // We have no way using the native JS Date to set the parse format or locale, so we ignore these
        // parameters.
        if (typeof value === 'string') {
            const regex = new RegExp(DateFormat.placeholderChar, 'g');
            value = value.replace(regex, '');
            if (value.length >= DateFormat.dateFormat.length) {
                value = value.substring(0, DateFormat.dateFormat.length);
                return DateFormat.parse(value);
            }
        }
        return null;
    }

    today(): Date {
        return DateFormat.getDate();
    }

    // If required extend other NativeDateAdapter methods.
}
