import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
// import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
    selector: 'grid-cell-render-hyperlink',
    template: `<s4-hyperlink [link]='link' [width]='width' [height]='height' [displayas]='displayas' [source]='value' [label]='imageTitle'
        [modal]='modal' [modalData]='data' [class]="styleClass" [type]='type' [onLaunchClick]="gridLaunchButtonClick" (afterDialogClosed)='onAfterDialogClosed($event)' [queryparam]='queryparam'
        #launchbutton *ngIf="checked"><span [class]="styleClass">{{value}}</span></s4-hyperlink>
        `,
})



export class GridCellRenderHyperlinkComponent implements ICellRendererAngularComp {
    imageTitle: any;
    private params: any;
    public value: any;
    private selectedCell: any;
    public link: string;
    public modal: boolean;
    public width: string;
    public height: string;
    public data: any;
    public updateField: any;
    public displayas: string;
    public queryparam: any; 
    public typeValue:any;
    public type='primary';
    public styleClass="";
    public checked=true;
    public field:string;
    public modalField:string;
    public linkField:string;
    parentField: any;
    public gridData = [];
    lovUrl: any;
    displayFields: any;
    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
        if (this.params.colDef.field) {
            this.field= this.params.colDef.field;
        }
        if (this.params.colDef.link) {
            this.link = this.params.colDef.link;
        }
        if (this.params.colDef.linkField) {
            this.linkField = this.params.colDef.linkField;
        }
        if ( this.linkField ) {
            let linkRow = this.params.data[this.linkField];
            if ( linkRow ) {
                this.link = linkRow;
            } 
        }
        if (this.params.colDef.height) {
            this.height = this.params.colDef.height;
        }
        if (this.params.colDef.dialogWidth) {
            this.width = this.params.colDef.dialogWidth;
        }
        if (this.params.colDef.modal) {
            this.modal = this.params.colDef.modal;
        }
        if (this.params.colDef.modalField) {
            this.modalField = this.params.colDef.modalField;
        }
        if ( this.modalField ) {
            let modalRow = this.params.data[this.modalField];
            if ( modalRow ) {
                this.modal = modalRow;
            } 
        }
        if (this.params.colDef.data) {
            const pdata = this.params.colDef.data;
            if (pdata === 'row') {
                this.data = params.data;
            } else {
                this.data = pdata;
            }
        }
        if (this.params.colDef.updateField) {
            this.updateField = this.params.colDef.updateField;
        }
        if (this.params.colDef.displayas) {
            this.displayas = this.params.colDef.displayas;
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
        if ( this.params.colDef.displayas === 'image'){
            this.params.colDef.cellStyle = { "text-align": "center"};
        }
        if(this.params.colDef.queryparam) {
            this.queryparam = this.params.colDef.queryparam;
            
        }
        if (this.params.colDef.typeValue) {
            this.typeValue= this.params.colDef.typeValue;
        }
        
        if (this.params.colDef.styleClass) {
            this.styleClass = this.params.colDef.styleClass;
        }
        if (this.typeValue) {
            this.type= this.params.data[this.typeValue];
            this.type = 'primary';

        }
        if (this.params.colDef.imageTitleField) {
            this.imageTitle = this.params.colDef.imageTitleField;
        }
        if (this.value == null) {
            this.checked = false;
        }
        if ( this.imageTitle ) {
            let imageTitle = this.params.data[this.imageTitle];
            if ( imageTitle ) {
                this.imageTitle = this.params.data[this.imageTitle];
            } else {
                this.imageTitle = '';
            }
        } else {
            this.imageTitle = '';
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
            this.params.api.rowModel.rowsToDisplay && this.params.api.rowModel.rowsToDisplay.forEach(obj => { this.gridData.push(obj.data) });
            this.data.___gridData = JSON.parse(JSON.stringify(this.gridData));
            proceed = this.params.colDef.onLaunchClick(this.data);
        }
        return proceed;
    }
}
