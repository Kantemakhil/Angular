import { Component } from '@angular/core';
// import { ICellRendererAngularComp } from 'ag-grid-angular';
// import { ICellRendererParams } from 'ag-grid';
import { DateFormat } from '../datepicker/dateFormat';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-enterprise/all-modules';
// import { ICellRendererParams } from 'ag-grid-community';

@Component( {
    selector: 'cell-render-month-year',
    template: `{{value}}`
} )
export class GridCellRenderMonthYearComponent implements ICellRendererAngularComp {
    value: any;
    refresh(params: any): boolean {
        return false;
    }
    agInit(params: ICellRendererParams): void {
        this.value = DateFormat.formatMY(params.value);
    }


}
