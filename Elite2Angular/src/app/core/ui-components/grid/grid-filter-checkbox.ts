// import { AgFilterComponent } from 'ag-grid-angular';
import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
// import { MatCheckbox } from '@angular/material';
// import { IDoesFilterPassParams, IFilterParams, RowNode } from 'ag-grid-community';
import { AgFilterComponent } from '@ag-grid-community/angular';
import { IFilterParams, IDoesFilterPassParams, ValueGetterFunc } from '@ag-grid-enterprise/all-modules';

@Component({
    selector: 'grid-filter-checkbox',
    template: `<mat-form-field class="grid-filter-checkbox" (keydown)="onKeyDown($event)">
                <mat-select class="grid-filter-checkbox-select" #select
                    [(ngModel)]="value"
                    #selectModel="ngModel">
                    <mat-option value="0">All</mat-option>
                    <mat-option value="1">Checked</mat-option>
                    <mat-option value="2">Not Checked</mat-option>
                </mat-select>
            </mat-form-field>`
})
export class GridFilterCheckboxComponent implements AgFilterComponent, AfterViewInit {
    private params: IFilterParams;
    private valueGetter: ValueGetterFunc;
    public innerValue: string;

    @ViewChild('select', { read: ViewContainerRef ,static : true}) public selectView;

    constructor() {
        this.innerValue = '0';
    }

    agInit(params: IFilterParams): void {
        this.params = params;
        this.valueGetter = params.valueGetter;
    }

    isFilterActive(): boolean {
        return this.innerValue !== null && this.innerValue !== undefined && this.innerValue !== '0';
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {
        const { api, colDef, column, columnApi, context, valueGetter,} = this.params;
        const { node } = params;
        const value = valueGetter({ api, colDef, column, columnApi, context, data: node.data, getValue: (field) => node.data[field], node, });
        if (this.innerValue === '0') {
            return true;
        } else if (this.innerValue === '1') {
            return value;
        } else if (this.innerValue === '2') {
            return !value;
        } else {
            return true;
        }
    }

    getModel(): any {
        return { value: this.innerValue };
    }

    setModel(model: any): void {
        this.innerValue = model ? model.value : '';
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.selectView.element.nativeElement.focus();
        })
    }

    // noinspection JSMethodCanBeStatic
    componentMethod(message: string): void {
        alert(`Alert from PartialMatchFilterComponent ${message}`);
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
