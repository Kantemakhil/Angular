import { AfterViewInit, Component, ViewChild,EventEmitter, ElementRef,Output } from '@angular/core';
import { TimeFormat } from '../time/timeFormat';
import { NgControl} from '@angular/forms';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';
@Component({
    selector: 'grid-cell-editor-time',
    template: `
            <mat-form-field style="width=100%" (keydown)="onKeyDown($event)" >
              <input matInput type="text" (focusout)="looseFocus()"
         [(ngModel)]="value"  matTooltip="{{timeFormat}}" 
        id="id" #textControl="ngModel" #text 
         [textMask]="{mask:timeMask()}"
         [required]="required"
        >
                <mat-error  *ngIf="textControl.hasError('required')">
                    {{fieldName}}* value is required.
                </mat-error>
                <mat-error *ngIf = "textControl.hasError('minTime')">
                    {{fieldName}} value must be at least {{minTime}}.
                </mat-error>
                <mat-error *ngIf = "textControl.hasError('maxTime')">
                    {{fieldName}} value cannot exceed {{maxTime}}.
                </mat-error>
                <mat-error *ngIf = "textControl.hasError('maxTime')">
                    {{fieldName}} value cannot exceed {{maxTime}}.
                </mat-error>
            </mat-form-field>`
})
export class GridCellEditorTimeComponent implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    fieldName: string;
    value: any;
    maxTime: any;
    minTime: any;
    time:any;
    required=false; 
    public field: string;
    private selectedCell: any;
    timeFormat="HHMM"
    valueEntered = true;
   /* private onTouchedCallback: () => void = noop;*/
    @ViewChild('textControl', { read: NgControl,static : true}) container: NgControl;
    @ViewChild('text', { read: ElementRef ,static : true }) text: ElementRef;
    @Output() blur: EventEmitter<any> = new EventEmitter<any>();
    ngAfterViewInit() {
        setTimeout(() => {
            this.text.nativeElement.focus();
        });
    }

    agInit(params: any): void {
        this.params = params;
        if (params.value) {
            this.value = TimeFormat.format(params.value);
        }
        this.fieldName = params.column.colDef.headerName;
        this.field =  this.params.column.colDef.field;
        if (params.column.colDef.required) {
            this.required = params.column.colDef.required;
        }
        
        if (params.column.colDef.max) {
            const max = params.column.colDef.max;
            if (max && typeof max !== 'string') {
                this.maxTime = TimeFormat.format(max);
            } else {
                this.maxTime = max;
            }
        }
        if (params.column.colDef.min) {
            const min = params.column.colDef.min;
            if (min && typeof min !== 'string') {
                this.minTime = TimeFormat.format(min);
            } else {
                this.minTime = min;
            }
        }
        this.selectedCell = this.params.api.getFocusedCell();
    }

    getValue(): any {
        
        if(!this.value) {
            return undefined;
        }
        
        if(this.value.substring(0,2)>23){
            this.value=this.value.replace(this.value.substring(0,2),'23');
            this.value=this.value.replace('__','59');
            return TimeFormat.parse(this.value, this.params.value);
        }
        else if(this.value[3]==='_'&& this.value[4]==='_' ){
            this.value=this.value.replace('__','00');
            return TimeFormat.parse(this.value, this.params.value);
        }else if(this.value[4]==='_'){
            this.value=this.value.replace('_','0');
            return TimeFormat.parse(this.value, this.params.value);;
        }else if(this.value===''){
            this.valueEntered = false;
        }
         else 
             return TimeFormat.parse(this.value,this.params.value);
        
    }

    isPopup(): boolean {
        return false;
    }

    onKeyDown(event): void {

        const key = event.which || event.keyCode;

        // Note: we do not want to capture the tab key.
        const isNavigationKey =
            key === 37 ||  // left
            key === 38 ||    // up
            key === 39 ||    // right
            key === 40 ||    // down
            key === 33 ||    // page up
            key === 34 ||    // page down
            key === 36 ||    // page home
            key === 35;

        if (key === 13) {
            this.params.api.stopEditing();
            this.params.api.setFocusedCell(this.selectedCell.rowIndex, this.selectedCell.column, this.selectedCell.floating);
        }
        
        if (key === 9 ) {
            this.params.node.setDataValue(this.field, this.getValue());
            if (this.params.node.data[this.field] !== this.getValue()) {
                this.params.node.data[this.field] = this.getValue();
            }
            if(!event.shiftKey){
            this.params.api.tabToNextCell();
            }
            else
                this.params.api.tabToPreviousCell();
        } 

        if (isNavigationKey) {    // page end
            event.stopPropagation();
        }
    }
    timeMask() {
        return [/[0-2]/,/[0-9]/,':',/[0-5]/,/[0-9]/]
        
    }
    
    looseFocus() {
        this.params.api.stopEditing();
    }
}
