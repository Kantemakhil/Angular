import {
    Component,
    Input,
    forwardRef,
    ViewChild,
    ElementRef,
    Output,
    EventEmitter
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextboxComponent),
    multi: true
};

const noop = () => {
};

@Component({
    selector: 's4-textbox',
    animations: [],
    styles: [],
    templateUrl: './textbox.component.html',
    styleUrls: [],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TextboxComponent implements ControlValueAccessor {
    // The internal data model
    private innerValue: any = '';

    @Input('autocomplete') autoSuggest: string = 'on';
    // Placeholders displays default text provided below when the field is empty
    @Input() placeholder: string = "";
    // represents readonly 
    @Input() readonly: boolean = false;
    // represents disable of the date
    @Input() disabled: boolean = false;
    // id of the control
    @Input() id: string;
    // required in textbox
    @Input() required: boolean = false;
    // max length of the field
    @Input() maxlength: number;
    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    @Output() onFocus: EventEmitter<any> = new EventEmitter<any>();
    @Output() blur: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('text', { read: ElementRef , static : true }) text: ElementRef;

    // by the ControlValueAccessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    @Input() rightAlign: boolean = false;
    // this is for restrict character in textbox
    @Input() restrictCharacters = [];
    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
        this.blur.emit();
    }

    // get accessor for ngModel
    get value(): any {
        return this.innerValue;
    };

    // set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v.trim());
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

    onTextBoxFocus() {
         this.onFocus.emit(this.innerValue);
     }

    onChange() {
        this.change.emit(this.innerValue);
    }
    
    focus() {
        this.text.nativeElement.focus();
    }

    keyPress(event: KeyboardEvent) {
        if(this.restrictCharacters.includes(event.key)){
            event.preventDefault();
        }
    }

    onPaste(event: ClipboardEvent) {
        if(event.clipboardData && event.clipboardData.getData('text')){
            let pastedText = event.clipboardData.getData('text');
            const pasteArr = pastedText.split("");
            for(let i=0;i<this.restrictCharacters.length;i++){
                for(let j=0;j<pasteArr.length;j++){
                    if(this.restrictCharacters[i] == pasteArr[j]){
                        event.preventDefault();
                    }
                }
            }
        }
    }

}
