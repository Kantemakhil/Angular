import {
    Component,
    Input,
    forwardRef,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    EventEmitter,
    Output
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from '@angular/forms';
// import { MatInput } from '@angular/material'

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PasswordComponent),
    multi: true
};

const noop = () => {
};

@Component({
    selector: 's4-password',
    animations: [],
    styles: [],
    templateUrl: './password.component.html',
    styleUrls: [],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class PasswordComponent implements ControlValueAccessor {
    // The internal data model
    private innerValue: any = '';
    static _passwordRegx ;
    static _validationMsg ;
    static _grantUser;
    errorMsg : string;


    public static set grantUser(value: String) {
        PasswordComponent._grantUser = value;
    }

    public get grantUser(): String {
        return PasswordComponent._grantUser;
    }
    public static set passwordRegx(value: String) {
        PasswordComponent._passwordRegx = value;
    }

    public get passwordRegx(): String {
        return PasswordComponent._passwordRegx;
    }
    public static set validationMsg(value: String) {
        PasswordComponent._validationMsg = value;
    }

    public get validationMsg(): String {
        return PasswordComponent._validationMsg;
    }
    // Placeholders displays default password provided below when the field is empty
    @Input() placeholder: string = "";
    // represents readonly 
    @Input() readonly: boolean = false;
    // represents disable of the date
    @Input() disabled: boolean = false;
    // id of the control
    @Input() id: string;
    // required in password
    @Input() required: boolean = false;
    // max length of the field
    @Input() maxlength: number;
    @Input() isErrorShow: boolean = false;
    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('password', { read: ElementRef ,static : true}) password: ElementRef;

    // by the ControlValueAccessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    // Set touched on blur
    onBlur(value: any) {
         //this.isValidatePassword(value);
        this.onTouchedCallback();
    }


    isValidatePassword() {
      const regex = new RegExp(PasswordComponent._passwordRegx);
      const valid = regex.test(this.innerValue);
      this.errorMsg=PasswordComponent._validationMsg;
      return !valid;

       
    }
    // get accessor for ngModel
    get value(): any {
        return this.innerValue;
    };

    // set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    // From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    focus() {
        this.password.nativeElement.focus();
    }
    valueChange() {
        this.change.emit(this.innerValue);
    }
}
