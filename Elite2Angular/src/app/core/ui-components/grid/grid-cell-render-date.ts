import { Component, OnDestroy } from '@angular/core';
// import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DateFormat } from '../datepicker/dateFormat';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
    selector: 'cell-render-date',
    template: `{{cellDate | dateFormat}}`
})
export class GridCellRenderDateComponent implements ICellRendererAngularComp, OnDestroy {
    private params: any;
    public cellDate: Date;
    readonly = true;

    agInit(params: any): void {
        this.params = params;
        this.cellDate = params.value;
        if (this.cellDate && !(this.cellDate instanceof Date)) {
            this.cellDate = DateFormat.getDate(this.cellDate);
        }
    }

    ngOnDestroy() {
    }

    refresh(): boolean {
        return false;
    }
}
