import { Component, ViewChild } from '@angular/core';
// import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatCheckbox } from '@angular/material/checkbox';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
@Component({
    selector: 'grid-cell-render-checkbox',
    template: `<mat-checkbox [hidden]="isRowPinned" *ngIf="runtimeVisible"
                 [(ngModel)]="value" [disabled]="!editable" (change)="onChange($event.checked)" (keydown)="onKeyDown($event)"
                 #checkbox tabIndex="1">&nbsp;
               </mat-checkbox>
               <span [hidden]="!isRowPinned"> {{value}} </span>
               `
})
export class GridCellRenderCheckboxComponent implements ICellRendererAngularComp {

    public value: boolean;
    public params: any;
    public editable:boolean=false;
    private selectedCell: any;
    public isRowPinned = false;
    public runtimeVisible:boolean = true;
    @ViewChild('checkbox',{static : true} ) private checkboxControl: MatCheckbox;
    
    agInit(params: any): void {
        this.params = params;
        let data = this.params.data;
        let rowIndex = this.params.rowIndex;
        let field = this.params.colDef.field;
        this.value = params.value;
        if (this.params.colDef.isCheckboxEditableCallback && typeof this.params.colDef.isCheckboxEditableCallback === 'function') {
            this.editable = true;
        } else {
            this.editable = this.params.colDef.isCheckboxEditable;
        }
        if (this.params.colDef.isCheckboxVisibleRuntime && typeof this.params.colDef.isCheckboxVisibleRuntime === 'function') {
            this.runtimeVisible = this.params.colDef.isCheckboxVisibleRuntime(data, rowIndex, field);
        }
        if (this.params && this.params.api) {
            this.selectedCell = this.params.api.getFocusedCell();
        }
        this.isRowPinned = params.node.isRowPinned();
        if (this.isRowPinned) {
            params.api.stopEditing();
        }
        if (params.keyPress == 13) {
            setTimeout(() => {
                this.checkboxControl.focus(); 
                this.value = !this.value; 
                this.params.api.stopEditing();
                this.params.api.setFocusedCell(this.selectedCell.rowIndex, this.selectedCell.column, this.selectedCell.floating);
            })
        }
    }
    
    onChange(lastValue) {
        let data = this.params.data;
        let rowIndex = this.params.rowIndex;
        let field = this.params.colDef.field;
        if (this.params.colDef.isCheckboxEditableCallback &&
            typeof this.params.colDef.isCheckboxEditableCallback === 'function' &&
            this.params.colDef.isCheckboxEditableCallback(data, rowIndex, field) === false) {
            this.checkboxControl.toggle();
            if (this.params.node) {
                this.params.node.setDataValue(field, !lastValue);
            }
        }
        else if (this.params.colDef.isCheckboxEditableCallback &&
            typeof this.params.colDef.isCheckboxEditableCallback === 'function' &&
            this.params.colDef.isCheckboxEditableCallback(data, rowIndex, field) === true) {
            if (this.params.node) {
                this.params.node.setDataValue(field, lastValue);
            }
        }
        else if(this.params.colDef.isCheckboxEditable === true){
            if (this.params.node) {
                this.params.node.setDataValue(field, lastValue);
            }
        }
    }
    
    getValue(): any {
        return this.value;
    }
    
    
    refresh(params: any): boolean {
        return false;
    }
    
    onKeyDown( event ): void {
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

        if ( key == 13 ) {
            this.params.api.stopEditing();
            this.params.api.setFocusedCell( this.params.rowIndex, this.params.column, this.params.floating );
        }

        if ( isNavigationKey ) {    // page end
            event.stopPropagation();
        }
    }
}
