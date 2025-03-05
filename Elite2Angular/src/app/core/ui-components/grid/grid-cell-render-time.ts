import { Component, OnDestroy } from '@angular/core';
// import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DateFormat } from '../datepicker/dateFormat';
import { TimeFormat } from '../time/timeFormat';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
    selector: 'cell-render-time',
    template: `{{value}}`
})
export class GridCellRenderTimeComponent implements ICellRendererAngularComp, OnDestroy {
    private params: any;
    public cellDate: Date;
    public value: string;

    agInit(params: any): void {
        this.params = params;
        this.cellDate = params.value;
        if (this.cellDate && !(this.cellDate instanceof Date)) {
            this.cellDate = DateFormat.getDate(this.cellDate);
        }
        if (this.cellDate && this.cellDate instanceof Date) {
            this.value = TimeFormat.format(params.value);
        }
    }

    ngOnDestroy() {
    }

    refresh(): boolean {
        return false;
    }
}
