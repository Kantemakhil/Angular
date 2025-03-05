import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { LoaderService } from '@core/loader/loader.service';
import { TranslateService } from "../translate/translate.service";
import { EoffenderService } from "./service/eoffender.service";
import { DialogService } from "../../core/ui-components/dialog/dialog.service";
import { Fileupload } from "../beans/Fileupload";
import { EoffenderDetails } from "../beans/EoffenderDetails";
import { UserSessionManager } from "../../core/classes/userSessionManager";
import { RedirectUtil } from '../../core/classes/redirectUtil';
//import { Router, ActivatedRoute } from '@angular/router';

@Component( {
    selector: 'delete-document-dialog',
    templateUrl: './delete-document-dialog.component.html'
} )
export class deleteDocumentDialog implements OnInit {
   

    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    document: Fileupload;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    title:string;
    deleteReason:any;
    eOffenderDetails: EoffenderDetails = new EoffenderDetails();
    documentData:any;
    
    
    constructor( public translateService: TranslateService,
        private eoffenderService: EoffenderService,private loaderService: LoaderService,
        public dialogService: DialogService, private redirectUtil: RedirectUtil, private sessionManager: UserSessionManager ) {
    }

    ngOnInit() {  
        if(this.dialog.data){
            this.documentData = this.dialog.data;
        }
       
    }
    
    
    
    onProceed() {
        if(!this.deleteReason){
            this.show('eoffender.deletereasonmustbeentered');
            return;
        }
        this.documentData['deleteReason']=this.deleteReason;
        const document = this.eoffenderService.deleteEliteDocumnet(this.documentData);
		document.subscribe(response => {
			if (response != null && response == 1) {
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show(this.message,'success');
                this.dialog.close(true);
            }else{
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show(this.message, 'error' );
            }
        })
        
    }
    
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
  }
    onCancel() { 
        this.dialog.close(true);
    }
    
    
    
}
