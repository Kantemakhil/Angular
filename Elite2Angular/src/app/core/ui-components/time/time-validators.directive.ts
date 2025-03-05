import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { TimeFormat } from './timeFormat';

@Directive({
    selector: '[minTime][formControlName],[minTime][formControl],[minTime][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinTimeDirective, multi: true }]
})
export class MinTimeDirective implements Validator {
    @Input()
    minTime: string;

    validate(c: FormControl): { [key: string]: any } {
        if (c.value && this.minTime) {
            const v = TimeFormat.parse(c.value);
            const p = TimeFormat.parse(this.minTime)
            return (v < p) ? { 'minTime': true } : null;
        }
    }
}

@Directive({
    selector: '[maxTime][formControlName],[maxTime][formControl],[maxTime][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MaxTimeDirective, multi: true }]
})
export class MaxTimeDirective implements Validator {
    @Input()
    maxTime: string;

    validate(c: FormControl): { [key: string]: any } {
        if (c.value && this.maxTime) {
            const v = TimeFormat.parse(c.value);
            const p = TimeFormat.parse(this.maxTime)
            return (v > p) ? { 'maxTime': true } : null;
        }
    }
}
