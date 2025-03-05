import { Component,
    Output,
    EventEmitter,
    ElementRef,
    AfterViewInit, ViewChild, ViewContainerRef, Renderer2 } from '@angular/core';
import { DateFormat } from '../datepicker/dateFormat';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";


import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

//import { AgEditorComponent } from 'ag-grid-angular';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AgEditorComponent } from '@ag-grid-community/angular';

@Component({
    selector: 'grid-cell-editor-date',
    template: `
        <mat-form-field style="width:100%" (keydown)="onKeyDown($event)">
            <input matInput
                [matDatepicker]="picker" (focusout)="looseFocus()"
                [required]="required"
                [(ngModel)]="value"
                [min]="minDate"
                [max]="maxDate"
                (input)= "onInput($event.target.value)"
                (dateChange)="dateExistInInput($event)"
                #dateInput="ngModel">
                
            <mat-datepicker-toggle matSuffix [for]="picker">
                <mat-icon svgIcon="date-icon" matDatepickerToggleIcon ></mat-icon>
            </mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error *ngIf="!valueEntered && dateInput.hasError('required')">
                A value is required.
            </mat-error>
            <mat-error *ngIf="valueEntered && dateInput.invalid">
                The date is invalid ({{dateFormat}}).
            </mat-error>
        </mat-form-field>`,
})
export class GridCellEditorDateComponent implements AgEditorComponent, AfterViewInit {
    private params: any;
    public value: Date;
    private selectedCell: any;
    private datedata: any;
    public minDate: Date;
    public maxDate: Date;
    public required = false;
    public focusInput = false;
    public focusToggle = false;
    public field: string;
    private textMaskInputElement: any;
    private inputElement: HTMLInputElement;
    textMaskConfig: any;
    private lastValue: any;
    valueEntered = false;
    dateFormat = DateFormat.dateFormat;


    @ViewChild('dateInput', { read: ViewContainerRef, static : true }) public textField;
    @Output() 
     dateChange:EventEmitter< MatDatepickerInputEvent< any>>;

    constructor( private renderer: Renderer2, private element: ElementRef,private matIconRegistry: MatIconRegistry,
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

    ngAfterViewInit() {
        setTimeout(() => {
            this.textField.element.nativeElement.focus();
            this.textField.element.nativeElement.select();
        });
    }

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
        this.field =  this.params.column.colDef.field;
        if (this.value && !(this.value instanceof Date)) {
            this.value = DateFormat.getDate(this.value);
        }
        if (this.params.column.colDef.required) {
            this.required = this.params.column.colDef.required;
        }
        if (this.params.column.colDef.minDate) {
            this.minDate = this.params.column.colDef.minDate;
        }
        if (this.params.column.colDef.maxDate) {
            this.maxDate = this.params.column.colDef.maxDate;
        }
        this.selectedCell = this.params.api.getFocusedCell();
        this.setupMask(true)
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(this.inputElement.value)
        }
    }

    getValue(): any {
        return this.value;
    }

    isPopup(): boolean {
        return false;
    }

    onKeyDown(event): void {
        const key = event.which || event.keyCode;

        // Note: we do not want to capture the tab key so that the user can move to the next/previous cell while editing
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
        
        if (key === 9 ) {
            this.params.node.setDataValue(this.field, this.getValue());
            if (this.params.node.data[this.field] !== this.getValue()) {
                this.params.node.data[this.field] = this.getValue();
            }
            if(!event.shiftKey){
            this.params.api.tabToNextCell();
            }
            else
                this.params.api.tabToPreviousCell();
                
        } 

        if (isNavigationKey) {    // page end
            event.stopPropagation();
        }
    }

    onInput(value) {
        this.setupMask()
        if (value) {
            this.valueEntered = true;
        } else {
            this.valueEntered = false;
        }
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(value)

            // get the updated value
            value = this.inputElement.value

            // check against the last value to prevent firing ngModelChange despite no changes
            if (this.lastValue !== value) {
                this.lastValue = value
                // this.onChangeCallback(value)
            }
        }
    }

    private setupMask(create = false) {
        if (!this.inputElement) {
            if (this.element.nativeElement.tagName === 'INPUT') {
                // `textMask` directive is used directly on an input element
                this.inputElement = this.element.nativeElement
            } else {
                // `textMask` directive is used on an abstracted input element, `md-input-container`, etc
                this.inputElement = this.element.nativeElement.getElementsByTagName('INPUT')[0]
            }
        }

        if (this.inputElement && create) {
            this.textMaskInputElement = createTextMaskInputElement(
                Object.assign({ inputElement: this.inputElement }, this.textMaskConfig)
            )
        }

    }
    dateExistInInput(date: any) {  
        if(date.target.value != null){
        this.textField.element.nativeElement.focus();
        }
    }
    looseFocus() {
        this.params.node.setDataValue(this.field, this.getValue());
        if (this.params.node.data[this.field] !== this.getValue()) {
            this.params.node.data[this.field] = this.getValue();
        }
    }
}
