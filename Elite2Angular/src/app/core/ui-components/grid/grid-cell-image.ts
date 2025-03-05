import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';
// import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component( {
    selector: 'grid-cell-image',
    template: `<s4-image [source]="source" [label]="label" #image></s4-image>`,
} )
export class GridCellImageComponent implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public source: string;
    public label: string;
    private selectedCell: any;

    @ViewChild( 'image', { read: ViewContainerRef ,static : true } ) public imageView;

    ngAfterViewInit() {
        setTimeout(() => {
            this.imageView.element.nativeElement.focus();
        } )
    }

    agInit( params: any ): void {
        this.params = params;
        this.source = params.value;
        if ( this.params.column.colDef.label ) {
            this.label = this.params.column.colDef.label;
        }
        this.selectedCell = this.params.api.getFocusedCell();
    }

    getValue(): any {
        return this.source;
    }

    isPopup(): boolean {
        return false;
    }

    refresh(): boolean {
        return false;
    }
}
