import { Component, OnInit, Output, forwardRef, Input, ViewChild, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { LovComponent } from '../lov/lov.component';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ChipComponent),
  multi: true
};

const noop = () => {
};


@Component({
  selector: 's4-chip',
  templateUrl: './chip.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class ChipComponent implements OnInit, ControlValueAccessor {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  value: string;
  chips: any[] = [];
  @Input() placeholder: string;
  innerChipsCode: string[] = [];
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() link: string;
  @Input() id: string;
  @Input() domain: string;
  @Input() parent: string;
  innertitles: any;
  @Input() codeTitle: any;
  @Input() descTitle: any;
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();
  innerRequried = false;
  @ViewChild('lov' ,{static : true}) lov: LovComponent
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  constructor() { }

  ngOnInit() {
    // this.lov.enableTitles = false;
  }

  get titles(): any {
    return this.innertitles;
  }

@Input()
set titles(ptitles: any) {
  this.innertitles = ptitles;
  this.lov.titles = this.innertitles;
}

  remove(chip) {
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);
      this.onRemove.emit(chip);

    }
  }

  addChips(event) {
    this.remove(event);
    if (event) {
      this.chips.push(event);
      this.onAdd.emit(event);
    }

    setTimeout(() => {
      this.value = this.value === undefined ? '' : undefined;
    }, 10);
  }

  onBlur() {
    this.onTouchedCallback();
  }

  // get accessor for ngModel
  get chipsCode(): string[] {
    return this.innerChipsCode;
  }
  // set accessor including call the onchange callback
  @Input()
  set chipsCode(pChipCode: string[]) {
    this.innerChipsCode = pChipCode;
    this.assignValues(this.innerChipsCode);
    this.onChangeCallback(pChipCode);
  }
  // From ControlValueAccessor interface
  writeValue(obj: any): void {
    this.innerChipsCode = obj;
    this.assignValues(this.innerChipsCode);
    this.onChangeCallback(obj);
  }
  // From ControlValueAccessor interface
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  // From ControlValueAccessor interface
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  assignValues(chipsCode: any[]) {
    this.chips = [];
    if (chipsCode && chipsCode.length > 0 && (this.domain || this.link) && this.lov) {
      const options = this.lov.options;

      chipsCode.forEach(element => {
       const option = options.filter(ele => {
         const code = typeof element === 'object' ? element.code : element;
        return ele.code ===  code;
       });
      // this.findIndex(options, 'code', element);
       if (option.length > 0 ) {
          const chipVal = option[0];
          if (chipVal) {
            if (this.chips.includes(chipVal)) {
              this.remove(chipVal);
            }
          this.chips.push(chipVal);
          }
       }
      });
    }
  }

  get required(): boolean {
    return this.innerRequried;
  }
  @Input()
  set required(prequired: boolean) {
    if (prequired !== this.innerRequried) {
    this.innerRequried = prequired;
    if (this.innerRequried) {
      this.placeholder = this.placeholder ? this.placeholder + '*' : '*';
    } else {
      if (this.placeholder && this.placeholder.trim().endsWith('*')) {
        this.placeholder = this.placeholder.slice(0, -1);
      }
    }
  }
}

  // findIndex(arr, key, val) {
  //   let indexVal = -1;
  //   for (let i = 0; i < arr.length; i++ ) {
  //     if (arr[i][key] === val) {
  //       indexVal = i;
  //       break;
  //     }
  //   }
  //   return indexVal;
  // }

}
