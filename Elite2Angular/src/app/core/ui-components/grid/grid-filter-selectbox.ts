// import { AgFilterComponent } from 'ag-grid-angular';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
// import { MatCheckbox, MatSelectionList } from '@angular/material';
import {MatSelectionList } from '@angular/material/list';
import { MatCheckbox } from '@angular/material/checkbox';
import { AgFilterComponent } from '@ag-grid-community/angular';
import { IFilterParams, IDoesFilterPassParams, ValueGetterFunc } from '@ag-grid-enterprise/all-modules';
// import { IAfterGuiAttachedParams, IDoesFilterPassParams, IFilterParams, RowNode } from 'ag-grid-community';

@Component({
    selector: 'grid-filter-selectbox',
    template: `<mat-checkbox class="grid-filter-select-check"
                    [(ngModel)]="selectall"
                    (change)="onChange($event)"
                    #checkbox="ngModel" #chkbox>
                    Select all
                </mat-checkbox>
                <mat-selection-list class="grid-filter-select-options" (selectionChange)="onSelectionChange($event)" #sellist>
                    <mat-list-option *ngFor="let option of options" checkboxPosition="before" value="{{option.id}}">
                    {{option.text}}
                    </mat-list-option>
                </mat-selection-list>`,
 styleUrls: ['./grid-filter-selectbox.scss']
})
export class GridFilterSelectboxComponent implements AgFilterComponent, AfterViewInit {
    private params: IFilterParams;
    //private valueGetter: (rowNode: RowNode) => any;
    private valueGetter: ValueGetterFunc;
    public innerValue: string;
    options: any[];
    selectall = true;
    @ViewChild('sellist', { read: MatSelectionList,static : false }) public sellist: MatSelectionList;

    @ViewChild('chkbox', { read: MatCheckbox,static : false}) public checkbox: MatCheckbox;

    constructor() { }

    agInit(params: IFilterParams): void {
        this.params = params;
        this.valueGetter = params.valueGetter;
        if (params.colDef['options']) {
            this.options = params.colDef['options'];
        }
    }

    isFilterActive(): boolean {
        return this.sellist.selectedOptions.selected.length !== this.options.length;
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {
        const { api, colDef, column, columnApi, context, valueGetter,} = this.params;
        const { node } = params;
        const value = valueGetter({ api, colDef, column, columnApi, context, data: node.data, getValue: (field) => node.data[field], node, }); 
        const cellValue = value;
        const index = this.sellist.selectedOptions.selected.findIndex(opt => opt.value === cellValue);
        return index >= 0;        
    }

    getModel(): any {
        return { value: this.innerValue };
    }

    setModel(model: any): void {
        if (model === 'selectAllFilter') {
            this.selectall = true;
            const event = {checked: this.selectall};
            this.onChange(event);
        } else {
            this.innerValue = model ? model.value : '';
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.checkbox.focus();
        });
        this.sellist.selectAll();
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

    onChange(event) {
        if (event.checked) {
            this.sellist.selectAll();
        } else {
            this.sellist.deselectAll();
        }
        this.params.filterChangedCallback();
    }

    onSelectionChange(event) {
        this.params.filterChangedCallback();
    }

}
