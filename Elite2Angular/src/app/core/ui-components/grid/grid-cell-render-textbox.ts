import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
    selector: 'grid-cell-render-textbox',
    template: `{{ value }}`
})
export class GridCellRenderTextboxComponent implements ICellRendererAngularComp {
    private params: any;
    public value: any;
    

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
        if(this.value && typeof this.value === 'string'){
            this.value = this.value.trim();
        }
        let renderLength = this.params.colDef.renderLength;
        if (renderLength && typeof renderLength == "number" && this.value && this.value.length > renderLength) {
            this.value = this.value.slice(0, renderLength) + '...'; 
        }
    }

    refresh(): boolean {
        return false;
    }

}
