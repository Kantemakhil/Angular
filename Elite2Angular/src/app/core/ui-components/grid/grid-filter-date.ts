// import { AgFilterComponent } from 'ag-grid-angular';
import { Component, ViewChild, AfterViewInit, Inject, ElementRef } from '@angular/core';
// import { MatCheckbox } from '@angular/material/checkbox';
// import { IDoesFilterPassParams, IFilterParams, RowNode } from 'ag-grid-community';
import { DateFormat } from '../datepicker/dateFormat';
import { AgFilterComponent } from '@ag-grid-community/angular';
import { IFilterParams, IDoesFilterPassParams, ValueGetterFunc } from '@ag-grid-enterprise/all-modules';
// import { DatepickerComponent } from '../datepicker/datepicker.component';

@Component({
    selector: 'grid-filter-date',
    template: `
    <div class="date-filter-container">
    <select #select [(ngModel)]="type">
        <option value="0">Equals</option>
        <option value="1">Not equal</option>
        <option value="2">Less than</option>
        <option value="3">Less than or equals</option>
        <option value="4">Greater than</option>
        <option value="5">Greater than or equals</option>
        <option value="6">In range</option>
    </select>
    <div fxLayout="column wrap" fxLayoutAlign="start none">
        <div fxFlex="1 0 auto">
            <label>{{ FromDateLabel() }}</label>
            <span [hidden]="dateText.checkValidity()">Invalid Date</span>
            <input type="date" [(ngModel)]="charValue" (ngModelChange)="onValueChange(dateText)" #dateText autofocus />
        </div>

        <div fxFlex="1 0 auto" [fxShow]="type === '6'">
            <label>To Date</label>
            <span [hidden]="toDateText.checkValidity()">Invalid Date</span>
            <input type="date" [(ngModel)]="charToValue" (ngModelChange)="onToValueChange(toDateText)" #toDateText />
        </div>
        <span *ngIf="ValidateDate()">To Date must be greater then or equal to From Date</span>
    </div>
</div>
    `,
    styleUrls: ['./grid-filter-date.scss']
})
export class GridFilterDateComponent implements AgFilterComponent, AfterViewInit {
    private params: IFilterParams;
    // private valueGetter: (rowNode: RowNode) => any;
    private valueGetter: ValueGetterFunc;
    public innerValue: Date;
    public innerToValue: Date;
    public charValue: any;
    public charToValue: any;
    innerType = '0';

    // @ViewChild('select', { read: ViewContainerRef }) public selectView;

    @ViewChild('dateText',{static : true}) public dateView: any;

    constructor(@Inject(ElementRef) private element: ElementRef) {
    }

    agInit(params: IFilterParams): void {
        this.params = params;
        this.valueGetter = params.valueGetter;
    }

    isFilterActive(): boolean {
        if (this.type === '6') {
            return !(!this.innerValue && !this.innerToValue);
        } else {
        return this.innerValue !== null && this.innerValue !== undefined;
    }
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {
        const { api, colDef, column, columnApi, context, valueGetter,} = this.params;
        const { node } = params;
        const value = valueGetter({ api, colDef, column, columnApi, context, data: node.data, getValue: (field) => node.data[field], node, });
        let cellValue = value;
        if(cellValue === null){
            return false;
        }
        if (!(cellValue instanceof Date)) {
            cellValue = DateFormat.getDate(cellValue);
        }
        switch (this.innerType) {
            case '0':    {
                    return DateFormat.compareDate(this.innerValue, cellValue) === 0;
                }
            case '1':    {
                    return DateFormat.compareDate(this.innerValue, cellValue) !== 0;
                }
            case '2':    {
                    return DateFormat.compareDate(this.innerValue, cellValue) > 0;
                }
            case '3':    {
                    return DateFormat.compareDate(this.innerValue, cellValue) >= 0;
                }
            case '4':    {
                    return DateFormat.compareDate(this.innerValue, cellValue) < 0;
                }
            case '5':    {
                    return DateFormat.compareDate(this.innerValue, cellValue) <= 0;
                }
            case '6':    {
                if (this.innerValue && this.innerToValue) {
                return DateFormat.compareDate(this.innerValue, cellValue) <= 0 &&
                        DateFormat.compareDate(this.innerToValue, cellValue) >= 0;
                } else {
                    return true;
                }

        }
        }
        return true;
    }

    getModel(): any {
        return { type: this.innerType, value: this.innerValue };
    }

    setModel(model: any): void {
        this.charValue = model ? model.value : '';
        this.innerType = model ? model.type : '0';
        this.charToValue = '';

        if (!this.charValue) {
            this.value = null;
            this.toValue = null;
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            try {
            this.dateView.element.nativeElement.focus();
            } catch (e) {
                
            }
        });
    }

    // noinspection JSMethodCanBeStatic
    componentMethod(message: string): void {
    }

    get value() {
        return this.innerValue;
    }

    set value(newValue) {
        if (this.innerValue !== newValue) {
            this.innerValue = newValue;
            this.params.filterChangedCallback();
        }
    }

    get toValue() {
        return this.innerToValue;
    }

    set toValue(newValue) {
        if (this.innerToValue !== newValue) {
            this.innerToValue = newValue;
            this.params.filterChangedCallback();
        }
    }

    get type() {
        return this.innerType;
    }

    set type(newType: string) {
        if (this.innerType !== newType) {
            this.innerType = newType;

            // const input = this.element.nativeElement.getElementsByTagName('INPUT')[0];
            this.params.filterChangedCallback();
            // this.dateView.element.nativeElement.focus();
            // this.element.nativeElement.focus();
            // input.focus();
        }
    }
    onKeyDown(event): void {
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
            // this.params.api.stopEditing();
            // this.params.api.setFocusedCell(this.selectedCell.rowIndex, this.selectedCell.column, this.selectedCell.floating);
        }
        if (isNavigationKey) {    // page end
            event.stopPropagation();
        }
    }

    ValidateDate() {
       return this.type === '6' && this.innerValue && this.innerToValue && DateFormat.compareDate(this.innerValue, this.innerToValue) === 1;
    }
    FromDateLabel(): string {
        return this.type === '6' ? 'From Date' : '';
    }

    onValueChange(element) {
        if (element.valueAsDate == null) {
            const model = this.params.api.getFilterModel();
            delete model[this.params.colDef.field];
            this.params.api.setFilterModel(model);
        }
        if (element && element.valueAsDate) {
            this.value = element.valueAsDate;
        } else {
            if (!element.checkValidity()) {
                this.value = null;
            }
        }
    }

    onToValueChange(element) {
        if (element && element.valueAsDate) {
            this.toValue = element.valueAsDate;
        } else {
            if (!element.checkValidity()) {
                this.toValue = null;
            }
        }
    }

}
