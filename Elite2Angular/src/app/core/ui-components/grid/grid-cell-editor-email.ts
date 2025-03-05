import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
// import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';

@Component( {
    selector: 'grid-cell-editor-email',
    template: `
        <mat-form-field style="width:100%" (keydown)="onKeyDown($event)">
            <input matInput #emailControl (focusout)="looseFocus()"
                [(ngModel)]="value"
                [required]="required"
                [email]="value!==''" type="email" maxlength="254"
                #emailModel="ngModel">
            <mat-error *ngIf="emailModel.hasError('required')">
                A value is required.
            </mat-error>
            <mat-error *ngIf="emailModel.hasError('email') && !emailModel.hasError('required')">
                Please enter a valid email address.
            </mat-error>
        </mat-form-field>`
} )
export class GridCellEditorEmailComponent implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public value: any;
    private selectedCell: any;
    public required = false;

    @ViewChild( 'emailControl', { read: ViewContainerRef ,static : true} ) public emailView;

    ngAfterViewInit() {
        setTimeout(() => {
            this.emailView.element.nativeElement.focus();
            this.emailView.element.nativeElement.select();
        } )
    }

    agInit( params: any ): void {
        this.params = params;
        this.value = params.value;
        if(this.value && typeof this.value === 'string'){
            this.value = this.value.trim();
        }
        
        if ( this.params.column.colDef.required ) {
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

    looseFocus() {
        this.params.api.stopEditing();
    }
}
