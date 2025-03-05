import { Component, Input, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from '../dialog/dialog.service';

@Component( {
    selector: 's4-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: []
} )
export class DialogComponent implements OnInit {

    @Input() title;
    @Input() screenId;
    position = "right";
    onCloseClick: () => any;

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Optional() @Inject( MAT_DIALOG_DATA ) public data: any,private dialogService: DialogService ) {
    }

    get displayScreenId(): string {
        if (this.screenId) {
            return '(' + this.screenId + ')';
        } else {
            return '';
        }
    }

    close( response: any ) {
        this.dialogService.screenId = this.dialogService.screenId.slice(0,this.dialogService.screenId.length-1);
        this.dialogRef.close( response );
    }

    onXbtnClick() {
        if (this.onCloseClick) {
            const response = this.onCloseClick();
            if (response.hasOwnProperty('isCloseable') && response.isCloseable === false) {
                return false;
            } else {
                this.close( response );
            }
        } else {
            this.dialogService.screenId = this.dialogService.screenId.slice(0,this.dialogService.screenId.length-1);
            this.dialogRef.close( null );
        }
    }

    ngOnInit() {
        const length = this.dialogService.screenId ? this.dialogService.screenId.length : 0;
        this.dialogService.screenId[length] = this.screenId;
        if ( this.data && this.data.hasOwnProperty('onCloseClick') && typeof this.data.onCloseClick === 'function') {
            this.onCloseClick = this.data.onCloseClick;
        }
    }


}
