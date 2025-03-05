import {
    Component,
    Input,
    Output,
    ViewChild,
    OnInit,
    forwardRef,
    EventEmitter,
    ElementRef, OnChanges, Renderer2, SimpleChanges
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    NgControl
} from '@angular/forms';
// import { DateAdapter, MatDatepicker, MatInput, MatFormField } from '@angular/material';
// import { MAT_DATE_FORMATS } from '@angular/material';
// import { NativeDateAdapter } from '@angular/material';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
// import { DatePipe } from '@angular/common';
import { DateFormat } from '../datepicker/dateFormat';

export const CUSTOM_DATE_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MonthYearComponent),
    multi: true
};

const noop = () => {
};
@Component({
    selector: 's4-month-year',
    templateUrl: './month-year.component.html',
    styleUrls: [],
    providers: [CUSTOM_DATE_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MonthYearComponent implements ControlValueAccessor, OnInit, OnChanges {

    private textMaskInputElement: any;

    private inputElement: HTMLInputElement;

    textMaskConfig: any;

    private lastValue: any;

    private innerValue: any = '';

    private dateValue: Date;

    valueEntered = false;

    monthYearFormat = DateFormat.monthYearFormat;

    // placeholder of the date
    @Input() placeholder = '';
    // represents readonly
    @Input() readonly = false;
    // represents disable of the date
    @Input() disabled = false;
    // required of the date
    private innerRequired = false;
    // id of the date
    @Input() id: string;
    // represents the max range  of the date
    @Input() max: Date;
    // represents the min range  of the date
    @Input() min: Date;

    @Output() selectedChanged: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('dateInput', { read: NgControl ,static : true }) container: NgControl;

    private onTouchedCallback: () => {};
    private onChangeCallback: (_: any) => {};

    constructor( private renderer: Renderer2, private element: ElementRef) {
        this.textMaskConfig = {
            mask: DateFormat.monthYearMask,
            guide: true,
            placeholderChar: DateFormat.placeholderChar,
            pipe: createAutoCorrectedDatePipe(DateFormat.monthYearFormat.toLowerCase()),
            keepCharPositions: true,
        };
    }

    ngOnChanges(changes: SimpleChanges) {
        this.setupMask(true);
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(this.inputElement.value);
        }
    }

    ngOnInit() {
        if (this.required && !this.dateValue) {
            this.container.control.setErrors({ required: true });
        }
    }

    get required(): boolean {
        return this.innerRequired;
    }

    @Input()
    set required(required: boolean) {
        if (this.innerRequired !== required) {
            this.innerRequired = required;
            this.updateError();
        }
    }

    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
        this.updateError();
    }

    updateError() {
        if (this.required && (this.inputElement && !this.inputElement.value) && !this.dateValue) {
            this.container.control.setErrors({ required: true });
        } else if (this.required && (this.inputElement && this.inputElement.value) && !this.dateValue) {
            this.container.control.setErrors({ InvalidFormat: true });
        } else if (!this.required && (this.inputElement && this.inputElement.value) && this.inputElement.value && !this.dateValue) {
            this.container.control.setErrors({ InvalidFormat: true });
        } else {
            this.container.control.setErrors(null);
        }
    }

    // get accessor for ngModel
    get value(): any {
        return this.innerValue;
    }

    // set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }

    // From ControlValueAccessor interface
    writeValue(value: any) {
        if (this.dateValue !== value) {
            this.dateValue = value;
            this.setupMask();
            if (value instanceof Date) {
                value = DateFormat.formatMY(value);
            }
            if (value !== this.innerValue) {
                this.innerValue = value;
            }
            // set the initial value for cases where the mask is disabled
            const normalizedValue = value == null ? '' : value;
            // this.renderer.setElementProperty(this.inputElement, 'value', normalizedValue);
            this.renderer.setProperty(this.inputElement, 'value', normalizedValue);
            

            if (this.textMaskInputElement !== undefined) {
                this.textMaskInputElement.update(value);
            }
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

    onSelectChange(event) {
        this.selectedChanged.emit(event);
    }

    monthYearMask(): string {
        return DateFormat.monthYearMask;
    }

    onInput(value) {
        this.setupMask();
        if (value) {
            this.valueEntered = true;
        } else {
            this.valueEntered = false;
        }
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(value);
            // get the updated value
            value = this.inputElement.value;

            // check against the last value to prevent firing ngModelChange despite no changes
            if (this.lastValue !== value) {
                this.lastValue = value;
                let innerDateValue: Date;
                const regex = new RegExp(DateFormat.placeholderChar, 'g');
                value = value.replace(regex, '');
                if (value.length >= DateFormat.monthYearFormat.length) {
                    value = value.substring(0, DateFormat.monthYearFormat.length);
                    innerDateValue = DateFormat.parseMY(value);
                }
                if (this.dateValue !== innerDateValue) {
                    this.dateValue = innerDateValue;
                    this.onChangeCallback(this.dateValue);
                }
            }
        }
    }

    private setupMask(create = false) {
        if (!this.inputElement) {
            if (this.element.nativeElement.tagName === 'INPUT') {
                // `textMask` directive is used directly on an input element
                this.inputElement = this.element.nativeElement;
            } else {
                // `textMask` directive is used on an abstracted input element, `md-input-container`, etc
                this.inputElement = this.element.nativeElement.getElementsByTagName('INPUT')[0];
            }
        }

        if (this.inputElement && create) {
            this.textMaskInputElement = createTextMaskInputElement(
                Object.assign({ inputElement: this.inputElement }, this.textMaskConfig)
            );
        }

    }
}
