import {
    Component,
    Input,
    forwardRef
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from '@angular/forms';

const noop = () => {
};
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EmailComponent ),
    multi: true
};

@Component( {
    selector: 's4-email',
    templateUrl: './email.component.html',
    styleUrls: [],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
} )
export class EmailComponent implements ControlValueAccessor {

    // The internal data model
    private innerValue: any = '';

    // Placeholders displays default text provided below when the field is empty
    @Input() placeholder: string = "Email";
    // represents readonly 
    @Input() readonly: boolean = false;
    // represents disable of the date
    @Input() disabled: boolean = false;
    // id of the control
    @Input() id: string;
    // required in textbox
    @Input() required: boolean = false;

    // by the ControlValueAccessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: ( _: any ) => void = noop;

    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    // get accessor for ngModel
    get value(): any {
        return this.innerValue;
    };

    // set accessor including call the onchange callback
    set value( v: any ) {
        if ( v !== this.innerValue ) {
            this.innerValue = v;
            this.onChangeCallback( v );
        }
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
