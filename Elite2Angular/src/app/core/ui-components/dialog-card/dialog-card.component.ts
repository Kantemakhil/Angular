import { Component, Input, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogService } from '../dialog/dialog.service';
import { ScreenWorkFlowService } from '../pane/screen-workflow.service';
import { Router } from '@angular/router';
import { IWPPaneService } from '../pane/iwppane.service';
import {ActivatedRoute} from '@angular/router';
import { DynamicMenuService } from '@core/service/dynamic-menu.service';
import { EoffenderService } from '@common/iwp/service/eoffender.service';

@Component( {
    selector: 's4-dialog-card',
    templateUrl: './dialog-card.component.html',
    styleUrls: []
} )
export class DialogCardComponent implements OnInit {

    @Input() title;
    @Input() screenId;
    activatedScreenId;
    position = "right";
    showIwpIcon:boolean = false;
    onCloseClick: () => any;

    constructor(
        public dialogRef: MatDialogRef<DialogCardComponent>,
        public screenflow: ScreenWorkFlowService,
        public router: Router,
        public iwpPaneService :IWPPaneService,
        public allDialogRef: MatDialog,
        public dms: DynamicMenuService,
        private eoffenderService: EoffenderService,
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
        if (this.screenId) {
            this.showIwpIconImage();
        }
        this.activatedScreenId = this.dms.currentActivatedRoute.url.split('/')[1];
    }


    showIwpIconImage() {
        if (this.screenId) {
            this.screenflow.iwpSupported(this.screenId).subscribe(count => {
                if (((count && count > 0) &&  true)) {
                    this.showIwpIcon = true;
                } else {
                    this.showIwpIcon = false;
                }
            });
        }
    }

    onIwpEoffender(e) {
        this.allDialogRef.closeAll();
        let screenParam;
         if(this.screenId == 'OIITGDET'){
            screenParam = this.screenId+"~"+ false+"~"+this.eoffenderService.objectId;
         }else{
            screenParam = this.screenId+"~"+ true;
         }
        
        let screenObj = {
            'childScreen': screenParam,
            'lastActivatedScreen': this.activatedScreenId
        }
        this.router.navigate( ['/EOFFENDER'], { queryParams:  screenObj} );
    }


}
