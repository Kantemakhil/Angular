import { AfterViewInit, Component } from '@angular/core';
// import { ICellRendererAngularComp } from 'ag-grid-angular';
import { PhoneNumberUtils } from "../phone/phone-number-utils";
import { conformToMask } from 'angular2-text-mask';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component( {
    selector: 'grid-cell-render-phone',
    template: `{{value}}`
} )
export class GridCellRenderPhoneComponent implements ICellRendererAngularComp, AfterViewInit {
    private params: any;
    private phoneNumber: string;
    private selFormat: string;
    private selectedCell: any;
    public value: any;

    //private locale = PhoneNumType.Default; // TODO:  this should be pulled from a system property

    ngAfterViewInit() {
    }

    agInit( params: any ): void {
        this.params = params;
        this.phoneNumber = params.value;
        this.selectedCell = this.params.api.getFocusedCell();
        if(this.params.data.format){
            this.selFormat = this.params.data.format;
            this.formattedNumber();
        }
    }

    refresh( params: any ): boolean {
        return false;
    }

    formattedNumber() {
        var result = conformToMask( String( this.phoneNumber ),
            PhoneNumberUtils.composeContactNumberMask(this.selFormat),
            { guide: PhoneNumberUtils.phoneNumberGuide(null) } );
        this.value = result.conformedValue;
        // return PhoneNumberUtils.phoneNumberPrefix()+" "+result.conformedValue;
    }

}
