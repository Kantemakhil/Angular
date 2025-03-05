import { AfterViewInit, Component, ViewChild, ViewContainerRef, Inject, ElementRef } from '@angular/core';
// import { ICellEditorAngularComp } from 'ag-grid-angular';
import { DecimalPipe } from '@angular/common';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';

@Component({
    selector: 'grid-cell-editor-number',
    template: `
        <mat-form-field style="width:100%" (keydown)="onKeyDown($event)">
           <input matInput #number style="text-align:right !important"
            [(ngModel)]="value" (focusout)="looseFocus()"
            [required]="required"
            [minValue]="minValue" [maxValue]="maxValue" [min]="minInput" [max]="maxValue"
            type="number" #numberControl="ngModel" (ngModelChange)="ngVAlueChange($event)" (keypress)="keyPress($event)">
            <mat-error *ngIf="numberControl.hasError('required')">
                A value is required.
            </mat-error>
            <mat-error *ngIf="numberControl.hasError('minValue')">
                A value must be at least {{min}}.
            </mat-error>
            <mat-error *ngIf="numberControl.hasError('maxValue')">
                A value cannot exceed {{max}}.
            </mat-error>
        </mat-form-field>`
})
export class GridCellEditorNumberComponent implements ICellEditorAngularComp, AfterViewInit {
    strictFP = false;
    private params: any;
    public value: any;
    private selectedCell: any;
    public required = false;
    public minValue: number;
    public maxValue: number;
    public minInput: number;
    oldValue: any;
    private whole = false;
    private format: any;
    public restrictCharacters = [];

    @ViewChild('number', { read: ViewContainerRef ,static : true}) public numberView;

    constructor(@Inject(ElementRef) private element: ElementRef) {}

    ngAfterViewInit() {
        this.element.nativeElement.addEventListener('paste', this.stopPasting);
        setTimeout(() => {
            this.numberView.element.nativeElement.focus();
            this.numberView.element.nativeElement.select();
        });
    }

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
        this.oldValue = this.value;
        if (this.params.column.colDef.required) {
            this.required = this.params.column.colDef.required;
        }
        if (this.params.column.colDef.restrictCharacters) {
            this.restrictCharacters = this.params.column.colDef.restrictCharacters;
        }
        this.format = this.params.column.colDef.format ? this.params.column.colDef.format : '1.0-0';
        if (this.params.column.colDef.whole) {
            this.whole = this.params.column.colDef.whole;
            this.minInput = 0;
        }
        if (this.params.column.colDef.strictFP) {
            this.strictFP = this.params.column.colDef.strictFP;
        }
        if (this.params.column.colDef.minValue) {
            this.minValue = this.params.column.colDef.minValue;
            if (this.whole && this.minValue < 0) {
                this.minInput = 0;
                this.minValue = 0;
            } else {
                this.minInput = this.minValue;
            }
        }
        if (this.params.column.colDef.maxValue) {
            this.maxValue = this.params.column.colDef.maxValue;
        }
        this.selectedCell = this.params.api.getFocusedCell();
    }

    getValue(): any {
        if (!this.value) {
        return this.value;
        } else {
            const numpipe = new DecimalPipe('en-US');
            const num = numpipe.transform(this.value, this.format);
            const finalNum = num ? num.toString().replace(/,/g, '') : num;
            return Number(finalNum);
        }
    }

    isPopup(): boolean {
        return false;
    }

    onKeyDown(event): boolean {
        const input = this.element.nativeElement.getElementsByTagName('INPUT')[0];
        var key = event.which || event.keyCode;

        // Note: we do not want to capture the tab key.
        var isNavigationKey =
            key == 37 ||  // left
            key == 38 ||    // up
            key == 39 ||    // right
            key == 40 ||    // down
            key == 33 ||    // page up
            key == 34 ||    // page down
            key == 36 ||    // page home
            key == 35;

        if (key == 13) {
            this.params.api.stopEditing();
            this.params.api.setFocusedCell(this.selectedCell.rowIndex, this.selectedCell.column, this.selectedCell.floating);
        }

        if (isNavigationKey) {    // page end
            event.stopPropagation();
            return false;
        }
        if (event.key === 'e' || event.key === 'E' || event.key === '+' || (this.whole && event.key === '-') ||
            (!input.value && event.key === '.') || (input.value && input.value.includes('.') && event.key === '.')) {
            event.stopPropagation();
            return false;
        }
        return true;
    }
    ngVAlueChange(event) {
            const input = this.element.nativeElement.getElementsByTagName('INPUT')[0];

        if (event && this.maxValue && event > this.maxValue) {
            if (input) {
            this.value = this.oldValue;
            input.value = this.value;
            }
        } else if (this.strictFP) {
            if (this.maxValue && input && input.value && String(this.maxValue).includes('.') && String(input.value).includes('.')) {

                const maxFloatingPont = String(this.maxValue).split('.')[1];
                const inputFloatingPoint = String(input.value).split('.')[1];
                if (maxFloatingPont && inputFloatingPoint &&
                    (Number(inputFloatingPoint) > Number(maxFloatingPont) ||
                        String(inputFloatingPoint).length > String(maxFloatingPont).length)) {
                    if (String(inputFloatingPoint).length > String(maxFloatingPont).length) {
                        this.value = this.oldValue;
                        input.value = String(input.value).slice(0, -1);
                    } else {
                    this.value = this.oldValue;
                    input.value = this.value;
                    }
                }
            this.oldValue = this.value;
        } else {
            this.oldValue = this.value;
        }

    } else {
        this.oldValue = this.value;
    }
}

    stopPasting = (event) => {
        const data = event.clipboardData.getData('text');
        if (data && data.includes('e') || data.includes('E') || data.includes('+') ||  data.includes('.')
        || (this.whole && data.includes('-')) ) {
            event.preventDefault();
            return false;
        }
        return true;
    }
    

    looseFocus() {
        this.params.api.stopEditing();
    }

    keyPress(event: KeyboardEvent) {
        if(event && this.restrictCharacters.includes(event.key)){
            event.preventDefault();
            return false;
        }
    }
}
