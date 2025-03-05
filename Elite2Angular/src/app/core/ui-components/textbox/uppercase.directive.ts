// From https://stackoverflow.com/questions/36106350/attribute-directive-with-ngmodel-to-change-field-value
import { Directive, Output, EventEmitter, Input } from '@angular/core';

@Directive({
    selector: '[ngModel][uppercase]',
    host: {
        '(input)': 'onInputChange($event)'
    }
})
export class UppercaseDirective {

    @Input()
    uppercase: string;

    @Output() ngModelChange: EventEmitter<any> = new EventEmitter()
    value: any

    onInputChange($event) {
        if (this.uppercase !== 'false') {
            this.value = $event.target.value.toUpperCase()
            this.ngModelChange.emit(this.value.trim())
        }
    }
}
