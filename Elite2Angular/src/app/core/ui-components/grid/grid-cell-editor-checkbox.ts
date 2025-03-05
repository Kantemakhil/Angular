import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { AgEditorComponent } from '@ag-grid-community/angular';


@Component({
    selector: 'grid-cell-editor-checkbox',
    template: `
            <mat-checkbox (keydown)="onKeyDown($event)"
                [(ngModel)]="value"
                #checkbox tabIndex="1">&nbsp;
            </mat-checkbox>`,
})
export class GridCellEditorCheckboxComponent implements AgEditorComponent, AfterViewInit {
    private params: any;
    public value: any;
    private selectedCell: any;
    public required = false;

    @ViewChild('checkbox',{static : true}) private checkboxControl: MatCheckbox;
    
    ngAfterViewInit() {
        setTimeout(() => {
            this.checkboxControl.focus();
        } )
    }

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
        if (this.params.column.colDef.required) {
            this.required = this.params.column.colDef.required;
        }
        this.selectedCell = this.params.api.getFocusedCell();
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
