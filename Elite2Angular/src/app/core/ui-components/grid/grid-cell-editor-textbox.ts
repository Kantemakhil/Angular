import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';

@Component({
    selector: 'grid-cell-editor-textbox',
    template: `
        <mat-form-field style="width:100%" (keydown)="onKeyDown($event)">
            <input matInput #textbox (focusout)="looseFocus()"
                [textMask]="inputMask"
                [(ngModel)]="value"
                [required]="required"
                [maxlength]="maxlength"
                [uppercase] = "uppercase"
                #text #textModel="ngModel" (keypress)="keyPress($event)" (paste)="onPaste($event)">
            <mat-error *ngIf="textModel.hasError('required')">
                A value is required.
            </mat-error>
        </mat-form-field>`
})
export class GridCellEditorTextboxComponent implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public value: any;
    public required: boolean;
    public maxlength: number;
    numMask = '';
    inputMask: any;
    private selectedCell: any;
    noMask = { mask: false };
    uppercase: string;
    restrictCharacters = [];

    @ViewChild('text', { read: ViewContainerRef ,static : true}) public textView;

    ngAfterViewInit() {
        setTimeout(() => {
            this.textView.element.nativeElement.focus();
            this.textView.element.nativeElement.select();
        })
    }

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
        if(this.value && typeof this.value === 'string'){
            this.value = this.value.trim();
        }
        if (params.column.colDef.required) {
            this.required = params.column.colDef.required;
        }
        if (params.column.colDef.restrictCharacters) {
            this.restrictCharacters = params.column.colDef.restrictCharacters;
        }
        if (params.column.colDef.maxlength) {
            this.maxlength = params.column.colDef.maxlength;
        }
        if (params.column.colDef.uppercase) {
            this.uppercase = params.column.colDef.uppercase;
        }
        if (params.column.colDef.mask) {
            const inMask = params.column.colDef.mask;
            if (typeof inMask === 'function') {
                const resMask = inMask(params.rowIndex, params.column.colDef.field, params.node.data);
                if (resMask && Array.isArray(resMask)) {
                    this.inputMask = { mask: resMask };
                } else if (resMask && resMask.hasOwnProperty('mask')) {
                    this.inputMask = resMask;
                } else {
                    this.inputMask = this.noMask;
                }
            } else if (Array.isArray(inMask)) {
                this.inputMask = { mask: inMask };
            } else if (inMask.hasOwnProperty('mask')) {
                this.inputMask = inMask;
            } else {
                this.inputMask = this.noMask;
            }
        } else {
            this.inputMask = this.noMask;
        }
        this.selectedCell = this.params.api.getFocusedCell();
    }

    getValue(): any {
        return this.value;
    }

    isPopup(): boolean {
        return false;
    }

    onKeyDown(event): void {

        var key = event.which || event.keyCode;

        // Note: we do not want to capture the tab key.
        var isNavigationKey =
            key == 37 ||  // left
            key == 38 ||    // up
            key == 39 ||    // right
            key == 40 ||    // down
            key == 33 ||    // page up
            key == 34 ||    // page down
            key == 36 ||    // page home
            key == 35;

        if (key == 13) {
            this.params.api.stopEditing();
            this.params.api.setFocusedCell(this.selectedCell.rowIndex, this.selectedCell.column, this.selectedCell.floating);
        }

        if (isNavigationKey) {    // page end
            event.stopPropagation();
        }
    }

    looseFocus() {
        this.params.api.stopEditing();
    }
    
    keyPress(event: KeyboardEvent) {
        if(this.restrictCharacters.includes(event.key)){
            event.preventDefault();
        }
    }

    onPaste(event: ClipboardEvent) {
        if(event.clipboardData && event.clipboardData.getData('text')){
            let pastedText = event.clipboardData.getData('text');
            const pasteArr = pastedText.split("");
            for(let i=0;i<this.restrictCharacters.length;i++){
                for(let j=0;j<pasteArr.length;j++){
                    if(this.restrictCharacters[i] == pasteArr[j]){
                        event.preventDefault();
                    }
                }
            }
        }
    }
    
}
