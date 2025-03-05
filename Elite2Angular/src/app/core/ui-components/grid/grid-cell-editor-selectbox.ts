import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';

@Component({
    selector: 'grid-cell-editor-selectbox',
    template: `
        <mat-form-field style="width:100%" (keydown)="onKeyDown($event)"> 
            <mat-select #select
                [(ngModel)]="value" [required]="required" 
                #selectModel="ngModel">
                <mat-option>None</mat-option>
                <mat-option *ngFor="let selectData of options" value="{{ selectData.id }}">
                    {{ selectData.text }} 
                </mat-option>
            </mat-select>
            <mat-error *ngIf="selectModel.hasError('required')">Please make a selection.</mat-error>
        </mat-form-field>`
})
export class GridCellEditorSelectboxComponent implements ICellEditorAngularComp, AfterViewInit {

    public value: any;
    private params: any;
    private selectedCell: any;
    public options;
    public required = false;

    @ViewChild( 'select', { read: ViewContainerRef ,static : true } ) public selectView;

    ngAfterViewInit() {
        setTimeout(() => {
            this.selectView.element.nativeElement.focus();
        } )
    }

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
        if (params.column.colDef && params.column.colDef.options) {
            this.options = params.column.colDef.options
        }
        if (params.column.colDef.required) {
            this.required = params.column.colDef.required;
        }
        this.selectedCell = params.api.getFocusedCell();
    }

    getValue(): any {
        return this.value;
    }

    isPopup(): boolean {
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
            this.params.api.setFocusedCell( this.selectedCell.rowIndex, this.selectedCell.column, this.selectedCell.floating );
        }

        if ( isNavigationKey ) {    // page end
            event.stopPropagation();
        }
    }
}
