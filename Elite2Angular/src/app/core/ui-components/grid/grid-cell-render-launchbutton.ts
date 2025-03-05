import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
// import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'grid-cell-render-launchbutton',
    template: `<div *ngIf = isEnable >
        <s4-launchbutton [link]='link' [width]='width' [disabled]="disable" [height]='height'
        [modal]='modal' [modalData]='data' [onLaunchClick]="gridLaunchButtonClick" (afterDialogClosed)='onAfterDialogClosed($event)'
        #launchbutton>{{value}}</s4-launchbutton></div>`,
})
export class GridCellRenderLaunchbuttonComponent implements ICellRendererAngularComp {
    private params: any;
    public value: any;
    private selectedCell: any;
    public link: string;
    public modal: boolean;
    public width: string;
    public height: string;
    public data: any;
    public updateField: any;
    public disable: boolean;
    public isEnable: boolean = true;
    public gridData = [];
    parentField: any;
    lovUrl: any;
    displayFields: any;
    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
        if (params.value === undefined || params.value === null || params.value == "") {
            this.isEnable = false
        }
        if (this.params.colDef.link) {
            this.link = this.params.colDef.link;
        }
        if (this.params.colDef.height) {
            this.height = this.params.colDef.height + '%';
        }
        if (this.params.colDef.dialogWidth) {
            this.width = this.params.colDef.dialogWidth + '%';
        }
        if (this.params.colDef.modal) {
            this.modal = this.params.colDef.modal;
        }
        if (this.params.colDef.data) {
            const pdata = this.params.colDef.data;
            if (pdata === 'row') {
                this.data = params.data;
            } else if (params.data[pdata] !== undefined && params.data[pdata] !== null) {
                this.data = params.data[pdata];
            } else {
                this.data = pdata;
            }
        }
        if (this.params.colDef.updateField) {
            this.updateField = this.params.colDef.updateField;
        }

        if (this.params.colDef.isDisable) {
            this.disable = this.params.colDef.isDisable(this.params.data, this.params.rowIndex);
        }
        if (this.params.colDef.parentField) {
            this.parentField = this.params.colDef.parentField;
        } 
        if (this.params.colDef.lovUrl) {
            this.lovUrl = this.params.colDef.lovUrl;
        }
        if (this.params.colDef.displayFields) {
            this.displayFields = this.params.colDef.displayFields;
        }
        this.selectedCell = this.params.api.getFocusedCell();
    }

    refresh(params: any): boolean {
        return false;
    }

    onAfterDialogClosed = (result) => {
        if (this.updateField) {
            for (const property in result) {
                var column = this.params.columnApi.getPrimaryColumns();
                if(column==null && this.params.data.hasOwnProperty(property)){
                    if (this.params.node.data[property] !== result[property]) {
                        this.params.node.data[property] = result[property];
                    }
                }
                if ((result.hasOwnProperty(property) && column != null)
                    && (this.updateField === 'row' || this.updateField === property)) {
                    this.params.node.setDataValue(property, result[property]);
                    if (this.params.node.data[property] !== result[property]) {
                        this.params.node.data[property] = result[property];
                    }
                }

            }
        }
    }
    gridLaunchButtonClick = () => {
        if (!this.modal) {
            // this.params.node.setDataValue('gridIndex', this.params.rowIndex);
            if (this.params.node.data['gridIndex'] !== this.params.rowIndex) {
                this.params.node.data['gridIndex'] = this.params.rowIndex;
            }
        }
        let proceed = true;
        if (this.params.colDef.onLaunchClick) {
            this.data.___field = this.params.colDef.field;
            this.data.___link = this.params.colDef.link;
            this.data.___parentField = this.params.colDef.parentField;
            this.data.___lovUrl = this.params.colDef.lovUrl;
            this.data.___displayFields = this.params.colDef.displayFields;
            this.gridData = [];
            // this.params.api.rowModel.rowsToDisplay && this.params.api.rowModel.rowsToDisplay.forEach(obj=>{ this.gridData.push(obj.data)});
            // let rowData = [];
            this.params.api.forEachNode(node => this.gridData.push(node.data));
            this.data.___gridData = JSON.parse(JSON.stringify(this.gridData));
            proceed = this.params.colDef.onLaunchClick(this.data);
        }
        return proceed;
    }
}
