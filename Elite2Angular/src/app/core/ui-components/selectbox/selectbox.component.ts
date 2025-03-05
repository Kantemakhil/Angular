import { Component, OnInit, Input, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
// import { MatSelect } from '@angular/material/select';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectboxComponent),
    multi: true
};

const noop = () => {
};

@Component({
    selector: 's4-selectbox',
    templateUrl: './selectbox.component.html',
    styleUrls: [],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SelectboxComponent implements ControlValueAccessor, OnInit {

    // The internal data model
    private innerValue = '';
    // The is for  placeholder
    @Input() placeholder: string;
    // The is for get json array from server
    @Input() options = [];
    // the stores the id value
    @Input() id = '';
    // the stores the disabled value
    @Input() disabled = false;
    // represents required
    @Input() required = false;
    // represents readonly
    @Input() readonly = false;

    @ViewChild('selectControl', { read: MatSelect ,static : true}) selectControl: MatSelect;

    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    ngOnInit() {
    }

    // get accessor
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

    get textValue() {
        for (const option of this.options) {
            if (this.innerValue === option.id) {
                return option.text;
            }
        }
        return '';
    }

    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
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

    open() {
        if (this.selectControl) {
            this.selectControl.open();
        }
    }
}
