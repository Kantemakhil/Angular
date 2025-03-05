import { AfterViewInit, Component, ViewChild, ViewContainerRef,
     ElementRef, Renderer2 } from '@angular/core';
// import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';
// import { ICellEditorParams } from 'ag-grid';
import { DateFormat } from '../datepicker/dateFormat';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';
import { ICellEditorParams } from '@ag-grid-enterprise/all-modules';
// import { ICellEditorParams } from 'ag-grid-community';

@Component({
    selector: 'grid-cell-editor-month-year',
    template: `
    <mat-form-field style="width:100%" (keydown)="onKeyDown($event)">
    <span>
    <mat-error *ngIf="valueEntered && monthyearInput.invalid &&
     (monthyearInput.dirty || monthyearInput.touched)">
   The value is invalid ({{inputMask}}). </mat-error>
</span>
<span>
<mat-error *ngIf=" minValidation() || maxValidation() || valueEntered && monthyearInput.invalid &&
 (monthyearInput.dirty || monthyearInput.touched)">
The value is invalid ({{inputMask}}). </mat-error>
</span>
    <input matInput
    [(ngModel)]="monthYearValue" (focusout)="looseFocus()"
    (input)= "onInput($event.target.value)"
     #monthyearInput="ngModel">
     </mat-form-field>
    `
})
export class GridCellEditorMonthYearComponent implements ICellEditorAngularComp, AfterViewInit {
    @ViewChild('monthyearInput', { read: ViewContainerRef,static : true }) public monthyearView;
    textMaskConfig: any;
    valueEntered = false;
    private dateValue: Date;
    private lastValue: any;
    private inputElement: HTMLInputElement;
    private textMaskInputElement: any;
    public field: string;
    monthYearValue: any;
    rmonthYearValue: any;
    params: any;
    selectedCell: any;
    inputMask: any;
    min: Date;
    max: Date;

    constructor( private renderer: Renderer2, private element: ElementRef) {
        this.textMaskConfig = {
            mask: DateFormat.monthYearMask,
            guide: true,
            placeholderChar: DateFormat.placeholderChar,
            pipe: createAutoCorrectedDatePipe(DateFormat.monthYearFormat.toLowerCase()),
            keepCharPositions: true,
        };
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.monthyearView.element.nativeElement.focus();
            this.monthyearView.element.nativeElement.select();
        });
    }
    getValue() {
        if ((this.dateValue && DateFormat.getDate(this.dateValue) instanceof Date)) {
            return this.rmonthYearValue;
        } else {
            return null;
        }
    }
    isPopup?(): boolean {
       return false;
    }


    agInit(params: ICellEditorParams): void {
        this.params = params;
        this.inputMask = DateFormat.monthYearMask;
        if (this.params.value) {
         this.monthYearValue = DateFormat.formatMY(this.params.value);
         this.rmonthYearValue = this.params.value;
        }
        this.field =  this.params.column.colDef.field;
        if (this.params.min) {

        }
        if (this.params.min) {
            this.min = this.params.min;
        }
        if (this.params.max) {
            this.max = this.params.max;
        }
        this.dateValue = this.params.value;
        this.setupMask(true);
        this.selectedCell = this.params.api.getFocusedCell();
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
        }
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
                    this.rmonthYearValue =  this.dateValue;
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

    looseFocus() {
        this.params.api.stopEditing();
    }
    
    onKeyDown(event): boolean {
                const key = event.which || event.keyCode;
                // Note: we do not want to capture the tab key.
                const isNavigationKey =
                    key === 37 ||  // left
                    key === 38 ||    // up
                    key === 39 ||    // right
                    key === 40 ||    // down
                    key === 33 ||    // page up
                    key === 34 ||    // page down
                    key === 36 ||    // page home
                    key === 35;
                if (key === 13) {
                    this.params.api.stopEditing();
                    this.params.api.setFocusedCell(this.selectedCell.rowIndex, this.selectedCell.column, this.selectedCell.floating);
                }
                if (key === 9) {
                    this.params.node.setDataValue(this.field, this.getValue());
                    if (this.params.node.data[this.field] !== this.getValue()) {
                        this.params.node.data[this.field] = this.getValue();
                    }
                    this.params.api.tabToNextCell();
                }
                if (isNavigationKey) {    // page end
                    event.stopPropagation();
                    return false;
                }
                return true;
            }
            minValidation() {
                return (this.rmonthYearValue && this.min) && (DateFormat.compareDate(this.rmonthYearValue, this.min) < 0);
            }
            maxValidation() {
                return (this.rmonthYearValue && this.max) && (DateFormat.compareDate(this.rmonthYearValue, this.max) > 0);
            }
}
