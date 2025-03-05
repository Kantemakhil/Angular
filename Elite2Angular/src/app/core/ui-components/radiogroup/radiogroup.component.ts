import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadiogroupComponent ),
    multi: true
};

const noop = () => {
};

@Component( {
    selector: 's4-radiogroup',
    templateUrl: './radiogroup.component.html',
    styleUrls: [],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
} )
export class RadiogroupComponent implements ControlValueAccessor {

    // The internal data model
    private innerValue: any = '';

    // option for radio button label contains label to be displayed and value is code of the option
    @Input() options = [];
    // radio input id
    @Input() id: string;
    // disabled in radio button
    @Input() disabled = false;
    // required in radio button
    @Input() required = false;
    
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

    // selected in radio button
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: ( _: any ) => void = noop;

    constructor() { }

    // get accessor
    get value(): any {
        return this.innerValue;
    };

    // set accessor including call the onchange callback
    @Input()
    set value( v: any ) {
        if ( v !== this.innerValue ) {
            this.innerValue = v;
            this.onChangeCallback( v );
        }
    }
    
    change($event) { 
        this.onChange.emit($event);
    }

    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    // From ControlValueAccessor interface
    writeValue( value: any ) {
        if ( value !== this.innerValue ) {
            this.innerValue = value;
        }
    }

    // From ControlValueAccessor interface
    registerOnChange( fn: any ) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched( fn: any ) {
        this.onTouchedCallback = fn;
    }
}
