import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive( {
    selector: '[validOptions][formControlName],[validOptions][formControl],[validOptions][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: OptionValidatorDirective, multi: true }]
} )
export class OptionValidatorDirective implements Validator {
    @Input()
    validOptions: any[];

    @Input() nameFilter: (name: string, opts: any[]) => any[];

    validate( c: FormControl ): { [key: string]: any } {
        const v = c.value;
        let matchedOptions: any[];

        if ( v && v.id ) {
            matchedOptions = this.filterOptionsById( v.id );
        } else if ( v && v.code) {
            matchedOptions = this.filterOptionsByName( v.code );
            matchedOptions = matchedOptions.length > 1 ? matchedOptions.filter(element => {
                return element.code === v.code; }) : matchedOptions;
        } else if ( v && v.description) {
            matchedOptions = this.filterOptionsByName( v.description );
            matchedOptions = matchedOptions.length > 1 ? matchedOptions.filter(element => {
                return element.description === v.description; }) : matchedOptions;
        } else if ( v ) {
            matchedOptions = this.filterOptionsByName( v );
        }

        return ( matchedOptions && matchedOptions.length !== 1 ) ? { 'validOption': true } : null;
    }

    private filterOptionsByName( name: any ) {
        return this.nameFilter(name, this.validOptions);
    }

    private filterOptionsById( id: any ) {
        if (id && typeof id === 'string') {
            id = id.toLowerCase();
        }
        return this.validOptions.filter(option => {
            if (option.id && typeof option.id === 'string') {
                return option.id.toLowerCase().indexOf(id) === 0;
            } else {
                return option.id === id;
            }
        });
    }
}
