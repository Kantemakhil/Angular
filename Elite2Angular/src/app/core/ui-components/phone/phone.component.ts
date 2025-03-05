import {
    Component,
    OnInit,
    Input,
    forwardRef
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from '@angular/forms';
import { PhoneNumType, PhoneNumberUtils } from "./phone-number-utils";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PhoneComponent ),
    multi: true
};

const noop = () => {
};

@Component( {
    selector: 's4-phone',
    templateUrl: './phone.component.html',
    styleUrls: [],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
} )
export class PhoneComponent implements ControlValueAccessor, OnInit {

    // The internal data model
    private innerValue: any = '';
    private innerValueFormatted: any = '';

    // Placeholders for the callbacks which are later provided
    @Input() placeholder: string = 'Enter phone number';
    // represents readonly 
    @Input() readonly: boolean = false;
    // represents disable of the date
    @Input() disabled: boolean = false;
    // id of the control
    @Input() id: string;
    // required in textbox
    @Input() required: boolean = false;
    // the phone number format to display
    // TODO: This should be retrieved from a system setting
    private innerNumFormat: PhoneNumType = PhoneNumType.Default;
    
    innerShowGuide: boolean = false;

    ngOnInit() { }

    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: ( _: any ) => void = noop;

    // get accessor
    get value(): any {
        return this.innerValue;
    };

    // set accessor including call the onchange callback
    @Input()
    set value( v: any ) {
        if ( v !== this.innerValue ) {
            this.innerValue = v;
            this.innerValueFormatted = v;
            this.onChangeCallback( this.innerValue );
        }
    }

    get valueFormatted(): string {
        return this.innerValueFormatted;
    }

    set valueFormatted( v: string ) {
        if ( v !== this.innerValueFormatted ) {
            this.innerValueFormatted = v;
            if ( v ) {
                this.value = this.innerValueFormatted.replace( /\D/g, '' );
            } else {
                this.value = v;
            }
        }
    }
    
    @Input()
    set format( v: PhoneNumType ) {
        if( v != this.innerNumFormat ) {
            this.innerNumFormat = v;
            this.innerShowGuide = PhoneNumberUtils.phoneNumberGuide(this.innerNumFormat);
        }
    }
    get format(): PhoneNumType {
        return this.innerNumFormat;
    }

    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    // From ControlValueAccessor interface
    writeValue( value: any ) {
        if ( value !== this.innerValue ) {
            this.value = value;
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

    get phonePrefix(): string {
        return PhoneNumberUtils.phoneNumberPrefix();
    }

    phoneNumberMask(): any {
        return PhoneNumberUtils.composePhoneNumberMask();
    }
}