// import { AgFilterComponent } from 'ag-grid-angular';
import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
// import { MatCheckbox } from '@angular/material';
// import { IAfterGuiAttachedParams, IDoesFilterPassParams, IFilterParams, RowNode } from 'ag-grid';
import { TimeFormat } from '../time/timeFormat';
import { DateFormat } from '../datepicker/dateFormat';
import { AgFilterComponent } from '@ag-grid-community/angular';
import { IFilterParams, IDoesFilterPassParams, ValueGetterFunc } from '@ag-grid-enterprise/all-modules';
// import { RowNode, IFilterParams, IDoesFilterPassParams } from 'ag-grid-community';

@Component({
    selector: 'grid-filter-time',
    template: `
    <div class="time-filter-container">
<mat-form-field (keydown)="onKeyDown($event)">
                <mat-select #select
                    [(ngModel)]="type"
                    #selectModel="ngModel">
                    <mat-option value="0">Equals</mat-option>
                    <mat-option value="1">Not equal</mat-option>
                    <mat-option value="2">Less than</mat-option>
                    <mat-option value="3">Less than or equals</mat-option>
                    <mat-option value="4">Greater than</mat-option>
                    <mat-option value="5">Greater than or equals</mat-option>
                </mat-select>
               </mat-form-field>
            <mat-form-field (keydown)="onKeyDown($event)">
                <input matInput type="time"
                [(ngModel)]="value"
                #textControl="ngModel" #text>
        </mat-form-field>
</div>`,
    styleUrls: ['./grid-filter-time.css']
})
export class GridFilterTimeComponent implements AgFilterComponent, AfterViewInit {
    private params: IFilterParams;
    // private valueGetter: (rowNode: RowNode) => any;
    private valueGetter: ValueGetterFunc;
    public innerValue: string;
    public timeValue: number;
    innerType = '0';

    @ViewChild('text', { read: ViewContainerRef ,static : true}) public dateView;

    constructor() {
    }

    agInit(params: IFilterParams): void {
        this.params = params;
        this.valueGetter = params.valueGetter;
    }

    isFilterActive(): boolean {
        return this.timeValue !== null && this.timeValue !== undefined;
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {
        const { api, colDef, column, columnApi, context, valueGetter,} = this.params;
        const { node } = params;
        const value = valueGetter({ api, colDef, column, columnApi, context, data: node.data, getValue: (field) => node.data[field], node, });
        let cellValue = value;
        if (!(cellValue instanceof Date)) {
            cellValue = DateFormat.getDate(cellValue);
        }
        const cellTime = TimeFormat.getTimeInMinutes(cellValue);
        const filTime = this.timeValue;
        switch (this.innerType) {
            case '0':
                {
                    return cellTime === filTime;
                }
            case '1':
                {
                    return filTime !== cellTime;
                }
            case '2':
                {
                    return filTime > cellTime;
                }
            case '3':
                {
                    return filTime >= cellTime;
                }
            case '4':
                {
                    return filTime < cellTime;
                }
            case '5':
                {
                    return filTime <= cellTime;
                }

        }
        return true;
    }

    getModel(): any {
        return { type: this.innerType, value: this.innerValue };
    }

    setModel(model: any): void {
        this.innerValue = model ? model.value : '';
        this.innerType = model ? model.type : '';
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.dateView.element.nativeElement.focus();
        })
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
            if (newValue) {
                this.timeValue = TimeFormat.getTimeInMinutes(TimeFormat.parse(newValue));
            } else {
                this.timeValue = null;
            }
            this.params.filterChangedCallback();
        }
    }

    get type() {
        return this.innerType;
    }

    set type(newType: string) {
        if (this.innerType !== newType) {
            this.innerType = newType;
            this.params.filterChangedCallback();
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

}
