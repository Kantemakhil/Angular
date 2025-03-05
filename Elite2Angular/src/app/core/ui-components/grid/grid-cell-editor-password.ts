import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';

@Component({
    selector: 'grid-cell-editor-password',
    template: `<input type="password" class="grid-cell-editor-password-input" matInput (focusout)="looseFocus()"
                [(ngModel)]="value"
                [required]="required"
                [maxlength]="maxlength"
                >
    `,
    styleUrls: ['./grid-cell-editor-password.scss']
})

export class GridCellEditorPasswordComponent implements ICellEditorAngularComp {
    private params: any;
    public value: any;
    public required: boolean;
    public maxlength: number;
    private selectedCell: any;
    
    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
        if (params.column.colDef.required) {
            this.required = params.column.colDef.required;
        }
        if (params.column.colDef.maxlength) {
            this.maxlength = params.column.colDef.maxlength;
        }
        this.selectedCell = this.params.api.getFocusedCell();
    }

    getValue(): any {
        return this.value;
    }

    isPopup(): boolean {
        return false;
    }

    onKeyDown(event): void {
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
        }
    }

    looseFocus() {
        this.params.api.stopEditing();
    }
    
}
