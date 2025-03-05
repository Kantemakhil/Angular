import {
    Component,
    Input,
    Output,
    ViewChild,
    OnInit,
    forwardRef,
    EventEmitter,
    ElementRef, OnChanges, SimpleChanges, Renderer2
} from '@angular/core';
// import { Pipe } from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
// import { MAT_DATE_FORMATS } from '@angular/material';
// import { NativeDateAdapter } from '@angular/material';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
// import { DatePipe } from '@angular/common';
import { DateFormat } from './dateFormat';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";

export const CUSTOM_DATE_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
};

const noop = () => {
};

@Component({
    selector: 's4-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: [],
    providers: [CUSTOM_DATE_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DatepickerComponent implements ControlValueAccessor, OnInit, OnChanges {

    private textMaskInputElement: any;

    private inputElement: HTMLInputElement;

    textMaskConfig: any;

    private lastValue: any;

    private innerValue: any = '';

    valueEntered = false;

    dateFormat = DateFormat.dateFormat;

    // placeholder of the date
    @Input() placeholder = '';
    // represents readonly
    @Input() readonly = false;
    // represents disable of the date
    @Input() disabled = false;
    // required of the date
    @Input() required = false;
    // id of the date
    @Input() id: string;
    // represents the max range  of the date
    @Input() max: Date;
    // represents the min range  of the date
    @Input() min: Date;

    @Output() selectedChanged: EventEmitter<any> = new EventEmitter<any>();
    
    @Output() blur: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('picker', { read: MatDatepicker ,static : true }) picker: MatDatepicker<Date>;

    @ViewChild('dateInput', { read: MatInput , static : true}) dateInput: MatInput;

    private onTouchedCallback: () => {};
    private onChangeCallback: (_: any) => {};

    constructor( private renderer: Renderer2, private element: ElementRef, private matIconRegistry: MatIconRegistry,
            private domSanitizer: DomSanitizer) {
        this.textMaskConfig = {
            mask: DateFormat.dateMask,
            guide: true,
            placeholderChar: DateFormat.placeholderChar,
            pipe: createAutoCorrectedDatePipe(DateFormat.dateFormat.toLowerCase()),
            keepCharPositions: true,
        };
        
        this.matIconRegistry.addSvgIcon(
                "date-icon",
                this.domSanitizer.bypassSecurityTrustResourceUrl( "assets/icons/date-icon.svg" ) );
    }

    ngOnChanges(changes: SimpleChanges) {
        this.setupMask(true);
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(this.inputElement.value);
        }
    }

    ngOnInit() {
    }

    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
        this.blur.emit();
    }

    // get accessor for ngModel
    get value(): any {
        return this.innerValue;
    }

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
        this.setupMask();
        if (value instanceof Date) {
            value = DateFormat.format(value);
        }
        // set the initial value for cases where the mask is disabled
        const normalizedValue = value == null ? '' : value;
        this.renderer.setProperty(this.inputElement, 'value', normalizedValue);

        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(value);
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
        this.picker.open();
    }

    focus() {
        this.dateInput.focused = true;
    }

    onSelectChange(event) {
        this.selectedChanged.emit(event);
    }

    dateMask(): string {
        return DateFormat.dateFormat;
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
                // this.onChangeCallback(value)
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
    validMinDate() {
        if (this.min && this.min instanceof Date && this.value && this.value instanceof Date &&
             DateFormat.compareDate(this.value, this.min) < 0) {
            return true;
        }
        return false;
    }
    validMaxDate() {
        if (this.max && this.max instanceof Date && this.value && this.value instanceof Date &&
             DateFormat.compareDate(this.value, this.max) > 0) {
            return true;
        }
        return false;
    }
}
