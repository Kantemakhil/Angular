import { Component, Input, forwardRef,EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaComponent),
    multi: true
};

const noop = () => {
};

@Component({
    selector: 's4-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TextareaComponent implements ControlValueAccessor {

    // The internal data model
    private innerValue: any = '';

    // this is for number of rows
    @Input() minRows = 0;
    // this is for placeholder
    @Input() placeholder = 'Enter text';
    // this is for id
    @Input() id: string;
    // this is for name
    @Input() name: string;
    // this is for input text box disabled
    @Input() disabled = false;
    // represents readonly in textarea
    @Input() readonly = false;
    // this is for required
    @Input() required = false;
    // this is for maximum length
    @Input() maxlength: number;
    // this is for maximum length
    @Input() autoSize = false;
    // this is for restrict character in textarea
    @Input() restrictCharacters = [];

    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    
    private focusTextArea:EventEmitter<any> = new EventEmitter<any>();

    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
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
    
    // From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    
    onTextAreaFocus(){
        
        this.focusTextArea.emit(this.innerValue);
    }
    
    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }
    
    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
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
