import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
    selector: 'grid-cell-render-checkboxlink',
    template: `<mat-checkbox class="mat-checkbox-layout" [ngModel]="checked" (ngModelChange)="onChange($event)" disabled="true"></mat-checkbox><s4-hyperlink [link]='link' [width]='width' [height]='height' [displayas]='displayas'
        [modal]='modal' [modalData]='data' [type]='type' (afterDialogClosed)='onAfterDialogClosed($event)' [queryparam]='queryparam' *ngIf="checked"
        #launchbutton><span [class]="styleClass"></span></s4-hyperlink>`
})
export class GridCellRenderCheckboxLinkComponent implements  ICellRendererAngularComp {
    
    public checked:boolean;
    public value: boolean;
    public selectedCell: any;
    public params: any;
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
    public styleClass = ""

    public icon: string = "";

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
        this.checked = this.value;
        if (this.value){
            this.icon = this.value ? "checkbox" : "";
            //alert(this.value);
        } else {
            
        }
        if (this.params.colDef.link) {
            this.link = this.params.colDef.link;
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
        if(this.params.colDef.queryparam) {
            this.queryparam = this.params.colDef.queryparam;
            
        }
        if (this.params.colDef.styleClass) {
            this.styleClass = this.params.colDef.styleClass;
        }
        if (this.params.colDef.typeValue) {
            this.typeValue= this.params.colDef.typeValue;
        }
        if (this.typeValue) {
            this.type= this.params.data[this.typeValue];

            }
        this.selectedCell = this.params.api.getFocusedCell();
    }
    
    refresh(params: any): boolean {
        return false;
    }
    
    onChange($event) {
        this.checked=$event;
    }
    
    onAfterDialogClosed = (result) => {
        if (this.updateField) {
            for (const property in result) {
                if ((result.hasOwnProperty(property) && this.params.data.hasOwnProperty(property))
                    && (this.updateField === 'row' || this.updateField === property)) {
                    this.params.node.setDataValue(property, result[property]);
                    if (this.params.node.data[property] !== result[property]) {
                        this.params.node.data[property] = result[property];
                    }
                }
            }
        }
    }

}
