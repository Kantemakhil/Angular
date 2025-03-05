import {
    Component,
    Input,
    Output,
    ViewChild,
    forwardRef,
    EventEmitter,
    ElementRef
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor, NgControl
} from '@angular/forms';
import { TimeFormat } from './timeFormat';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimeComponent ),
    multi: true
};

const noop = () => {
};

@Component( {
    selector: 's4-time',
    templateUrl: './time.component.html',
    styleUrls: [],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
} )

export class TimeComponent implements ControlValueAccessor {
    private innerValue: any;
    private innerTime: any;
    maxTime: string;
    minTime: string;
    timeFormat = "HH:MM";
    // Placeholders displays default text provided below when the field is empty
    @Input() placeholder = '';
    // represents readonly
    @Input() readonly = false;
    // represents disable of the date
    @Input() disabled = false;
    // id of the control
    @Input() id: string;
    // required in textbox
    @Input() required = false;

    @ViewChild( 'text', { read: ElementRef ,static : true} ) text: ElementRef;
    @ViewChild( 'textControl', { read: NgControl , static : true } ) container: NgControl;
    @Output() blur: EventEmitter<any> = new EventEmitter<any>();

    // by the ControlValueAccessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: ( _: any ) => void = noop;
    // Set touched on blur
    onBlur() {

        if ( this.value ) {
            if ( this.value.substring( 0, 2 ) > 23 || this.value.substring( 3, 5 ) === '__' ) {
                this.container.control.setErrors( { InvalidFormat: true } );
            }
            else if ( this.value[3] === '_' || this.value[4] === '_' ) {
                this.value = this.value.replace( '_', '0' );
            }
        }

        this.onTouchedCallback();
        this.blur.emit();

        return this.value;
    }

    // get accessor for ngModel
    get value(): any {
        return this.innerValue;
    }

    get time(): any {
        return this.innerTime;


    }

    @Input()
    set max( max: any ) {
        if ( max && typeof max !== 'string' ) {
            this.maxTime = TimeFormat.format( max );
        } else {
            this.maxTime = max;
        }
    }

    @Input()
    set min( min: any ) {
        if ( min && typeof min !== 'string' ) {
            this.minTime = TimeFormat.format( min );
        } else {
            this.minTime = min;
        }
    }

    // set accessor including call the onchange callback
    set value( v: any ) {
        if ( !v.includes( '_' ) ) {
            if ( v !== this.innerValue ) {
                if ( v && typeof v === 'string' ) {
                    this.innerTime = TimeFormat.parse( v, this.innerTime );
                    this.onChangeCallback( this.innerTime );
                } else {
                    // if (this.innerTime) {
                    this.innerTime = undefined;
                    this.onChangeCallback( this.innerTime );
                    //  }
                }
            }
        }
        this.innerValue = v;
    }

    set time( t: any ) {
        if ( this.innerTime !== t ) {
            this.innerTime = t;
            this.innerValue = TimeFormat.format( this.innerTime );
        }
    }

    // From ControlValueAccessor interface
    writeValue( value: any ) {
        if ( value !== this.innerValue ) {
            if ( value && typeof value !== 'string' ) {
                this.innerValue = TimeFormat.format( value );
            } else {
                this.innerValue = undefined;
            }
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

    focus() {
        this.text.nativeElement.focus();
    }

    timeMask() {
        return [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/]

    }
}

