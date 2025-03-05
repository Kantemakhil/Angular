import {
    Component,
    OnInit,
    Input,
    Output,
    forwardRef,
    EventEmitter,
    ViewChild
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
};
const noop = () => {
};

@Component({
    selector: 's4-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: [],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
    private innerValue: any = '';

    // represents disable of check box
    @Input() disabled = false;
    // represents disable of check box
    @Input() required = false;
    // represents check box id
    @Input() id: string;
    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('checkbox', { read: MatCheckbox , static : true}) checkbox: MatCheckbox;

    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    ngOnInit() {
    }

    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    // get accessor for ngModel
    get value(): any {
        return this.innerValue;
    };

    // set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.checked = this.innerValue;
            this.onChangeCallback(v);
        }
    }

    // get accessor
    get checked(): boolean {
        return this.innerValue;
    }

    // set accessor including call the onchange callback
    set checked(v: boolean) {
        this.value = v;
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

    onChange(event) {
        this.change.emit(event);
    }

    focus() {
        this.checkbox.focus(); 
    }
}
