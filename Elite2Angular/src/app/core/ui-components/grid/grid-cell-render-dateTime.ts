import { Component, OnDestroy } from '@angular/core';
import { TimeFormat } from "../time/timeFormat";
import { DateFormat } from "../datepicker/dateFormat";
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
    selector: 'cell-render-datetime',
    template: `{{date}} {{time}} `
})
export class GridCellRenderDateTimeComponent implements ICellRendererAngularComp, OnDestroy {
    private params: any;
    public cellDate: Date;
    public time: string;
    public date: string;
    agInit(params: any): void {
        this.params = params;
        this.cellDate = params.value;
        if (this.cellDate && !(this.cellDate instanceof Date)) {
            this.cellDate = DateFormat.getDate(this.cellDate);
        }
         this.date= DateFormat.format(this.cellDate);
        if (this.cellDate && this.cellDate instanceof Date) {
        this.time=TimeFormat.format(this.cellDate);
        }
        
      
    }

    ngOnDestroy() {
    }

    refresh(): boolean {
        return false;
    }
}
