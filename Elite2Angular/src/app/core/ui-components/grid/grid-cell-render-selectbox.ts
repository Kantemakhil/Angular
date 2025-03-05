import { AfterViewInit, Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
// import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'grid-cell-render-selectbox',
    template: `{{value}}`
})
export class GridCellRenderSelectboxComponent implements ICellRendererAngularComp, AfterViewInit {

    public value: any;
    private selectedCell: any;
    private options;

    ngAfterViewInit() {

    }

    agInit(params: any): void {
        this.selectedCell = params.api.getFocusedCell();
        this.value = '';
        if (params.value && params.colDef.options) {
            this.options = params.colDef.options;
            if (this.options) {
                let val;
                if (this.options[0] && typeof this.options[0].id === 'number') {
                    val = parseInt(params.value, 0);
                } else {
                    val = params.value;
                }
                const selectedOption = this.options.find(obj => obj.id === val);

                this.value = selectedOption ? selectedOption.text : '';
            }
        }
    }

    refresh(params: any): boolean {
        return false;
    }
}
