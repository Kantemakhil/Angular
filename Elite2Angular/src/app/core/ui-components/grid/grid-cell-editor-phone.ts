import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
// import { ICellEditorAngularComp } from 'ag-grid-angular';
import { PhoneNumType, PhoneNumberUtils } from "../phone/phone-number-utils";
import { ICellEditorAngularComp } from '@ag-grid-community/angular';

@Component({
    selector: 'grid-cell-editor-phone',
    template: `
        <mat-form-field style="width:100%" (keydown)="onKeyDown($event)"> 
            <!-- <span style="padding:0 4px 0 14px"  matPrefix>{{phonePrefix}}</span> -->
            <input style="padding:7px 0px !important; vertical-align: inherit !important;"
                matInput [textMask]="{mask:contactNumberMask(), guide:innerShowGuide}"
                [(ngModel)]="value" (focusout)="looseFocus()"
                [required]="required"
                #phone #phoneControl="ngModel"> 
            <mat-error *ngIf="phoneControl.hasError('required')"> 
                A value is required. 
            </mat-error>
        </mat-form-field>`
})
export class GridCellEditorPhoneComponent implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public value: any;
    private selectedCell: any;
    private selFormat: string;
    public required = false;

    private innerLocale: PhoneNumType = PhoneNumType.Default;

    innerShowGuide: boolean = false;

    @ViewChild( 'phone', { read: ViewContainerRef ,static : true } ) public phoneView;

    ngAfterViewInit() {
        setTimeout(() => {
            this.phoneView.element.nativeElement.focus();
            this.phoneView.element.nativeElement.select();
        } )
        }

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
        this.selFormat = this.params.data.format;
        if (this.params.column.colDef.required) {
            this.required = this.params.column.colDef.required;
        }
        this.selectedCell = this.params.api.getFocusedCell();
    }
    
    set locale( v: PhoneNumType ) {
        if( v != this.innerLocale ) {
            this.innerLocale = v;
            this.innerShowGuide = PhoneNumberUtils.phoneNumberGuide(this.innerLocale);
        }
    }
    get locale(): PhoneNumType {
        return this.innerLocale;
    }

    get phonePrefix(): string {
        return PhoneNumberUtils.phoneNumberPrefix();
    }

    phoneNumberMask(): any {
        return PhoneNumberUtils.composePhoneNumberMask();
    }
    contactNumberMask(): any {
        return PhoneNumberUtils.composeContactNumberMask(this.selFormat);
    }
    
    getValue(): any {
        var unformattedValue = String( this.value );
        return unformattedValue.replace( /\D/g, '' );;
    }

    isPopup(): boolean {
        return false;
    }

    looseFocus() {
        this.params.api.stopEditing();
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
        } else if (key == 9) {
            event.shiftKey ? this.params.api.tabToPreviousCell() : this.params.api.tabToNextCell();
        }
        if ( isNavigationKey ) {    // page end
            event.stopPropagation();
        }
    }}
