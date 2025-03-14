import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive( {
    selector: '[minValue][formControlName],[minValue][formControl],[minValue][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinValueDirective, multi: true }]
} )
export class MinValueDirective implements Validator {
    @Input()
    minValue: number;

    validate( c: FormControl ): { [key: string]: any } {
        let v = c.value;
        return ( v < this.minValue ) ? { "minValue": true } : null;
    }
}

@Directive( {
    selector: '[maxValue][formControlName],[maxValue][formControl],[maxValue][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MaxValueDirective, multi: true }]
} )
export class MaxValueDirective implements Validator {
    @Input()
    maxValue: number;
    
    @Input()
    value: number;


    validate( c: FormControl ): { [key: string]: any } {
        let v = this.value;
        return ( v > this.maxValue ) ? { "maxValue": true } : null;
    }
}