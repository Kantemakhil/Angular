import { Component, OnDestroy } from '@angular/core';
// import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DecimalPipe } from '@angular/common';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component( {
    selector: 'cell-render-number',
    // template: `<span>{{num | number: format | noComma}}</span>`
    template: `<span>{{num }}</span>`
} )
export class GridCellRenderNumberComponent implements ICellRendererAngularComp, OnDestroy {

    public num: any;

    private params: any;

    format: any;

    agInit( params: any ): void {
        const numpipe = new DecimalPipe('en-US');
        this.params = params;
        this.num = this.params.value;
        this.format = this.params.colDef.format ? this.params.colDef.format : '1.0-0';
        if (this.params.colDef.format && Number(this.params.value ).toFixed() !== String(NaN) && (this.params.value || this.params.value === 0 )) {
        const number = numpipe.transform(this.params.value, this.format);
        this.num  =  number.includes('-') ? '(' + number.replace('-', '') + ')' : number;
        }
    }

    ngOnDestroy() {
    }

    refresh(): boolean {
        return false;
    }
}