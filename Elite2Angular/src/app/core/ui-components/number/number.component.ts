import {
    Component,
    Input,
    OnInit,
    forwardRef,
    Output,
    EventEmitter,
    Inject,
    ElementRef} from "@angular/core";
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from "@angular/forms";
import { DecimalPipe } from '@angular/common';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberComponent),
    multi: true
};

@Component({
    selector: "s4-number",
    templateUrl: "./number.component.html",
    styleUrls: ['./number.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class NumberComponent implements ControlValueAccessor, OnInit {

    // The internal data model
    private innerValue: number;

    // input value form disabled
    @Input() disabled: boolean = false;
    // Placeholders for the callbacks which are later providesd
    @Input() placeholder: string = "Enter Number";
    // input value is required
    @Input() required: boolean = false;
    // bind the id value
    @Input() id: string;
    // input value is readonly
    @Input() readonly: boolean = false;
    @Input() format:any;
    @Input() textLeftAlign: boolean = false;
    oldValue: number;

    @Output() blur: EventEmitter<any> = new EventEmitter<any>();

    hasSymbol = false;

    innerWhole = false;

    innerMin: number;

    inputMin: number;

    // maximum value for a number
    innerMax: number;

    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor(@Inject(ElementRef) private element: ElementRef) {}

    ngOnInit(): void {
        this.element.nativeElement.addEventListener('paste', this.stopPasting);
    }

    // Set touched on blur
    onBlur() {
        const input = this.element.nativeElement.getElementsByTagName('INPUT')[0];
        input.value = this.value;
        this.onTouchedCallback();
        this.blur.emit();
    }

    get whole(): boolean {
        return this.innerWhole;
    }

    @Input()
    set whole(whole: boolean) {
        this.innerWhole = whole;
        if (whole) {
            this.min = this.min;
            this.max =  this.max;
        }
    }

    get min(): number {
        return this.innerMin;
    }

    get max(): number {
        return this.innerMax;
    }

    @Input()
    set min(min: number) {
        if (this.whole) {
            if (min > 0) {
                this.inputMin = min;
                this.innerMin = min;
            } else {
                this.inputMin = 0;
                this.innerMin = 0;
            }
        } else {
            this.innerMin = min;
            this.inputMin = min;
        }
    }

    @Input()
    set max(max: number) {
        if (this.whole) {
            if (max > 0) {
                this.innerMax = max;
            } else {
                this.innerMax = 0;
            }
        } else {
            this.innerMax = max;
        }
    }
    // get accessor for ngModel
    get value(): number {
        return this.innerValue;
    }

    // set accessor including call the onchange callback
    @Input()
    set value(v: number) {
        if (v !== this.innerValue) {
            if (!v && this.innerValue) {
                this.hasSymbol = false;
            }
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    // From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.value) {
            if(this.format){
            const numpipe = new DecimalPipe('en-US');
            const num = numpipe.transform(value, this.format);
            const number= num ? Number(num.toString().replace(/,/g, '')): Number(num);
            this.value = number;
        }else{
            this.value = value;
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

    onChange() {
        this.change.emit(this.innerValue);
    }

    onKeyDown(event): boolean {
        if (event.key === 'e' || event.key === 'E' || (this.whole && event.key === '-') || (event.key === '+')) {
            event.stopPropagation();
            return false;
        }
        if (event.key === '-') {
            if (this.innerValue) {
                event.stopPropagation();
                return false;
            } else {
                if (this.hasSymbol) {
                    event.stopPropagation();
                    return false;
                } else {
                    this.hasSymbol = true;
                }
            }
        }
        return true;
    }

    ngVAlueChange(event) {
        if (event && this.max && event > this.max) {
            const input = this.element.nativeElement.getElementsByTagName('INPUT')[0];
            if (input) {
            this.value = this.oldValue;
            input.value = this.value;
            }
        } else {
            this.oldValue = this.value;
        }

    }

    stopPasting = event => {
        const data = event.clipboardData.getData('text');
        if (data && data.includes('e') || data.includes('E') || (this.whole && data.includes('-')) || data.includes('+')) {
            event.preventDefault();
            return false;
        }
        if (data.includes('-')) {
            if (this.innerValue) {
                event.preventDefault();
                return false;
            } else {
                if (this.hasSymbol) {
                    event.preventDefault();
                    return false;
                } else {
                    this.hasSymbol = true;
                }
            }
        }
        return true;
}
}

