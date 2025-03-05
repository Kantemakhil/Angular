import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { TranslateService } from "@common/translate/translate.service";
import { DialogService } from "@core/ui-components/dialog/dialog.service";
import { UserSessionManager } from "@core/classes/userSessionManager";
import {PortalAppService} from './service/portalapp.service';
//import { Router, ActivatedRoute } from '@angular/router';

@Component( {
    selector: 'generate-dialog',
    templateUrl: './rejectdialog.component.html'
} )
export class RejectDialogComponent implements OnInit, OnDestroy {
   
    
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    rejectionReason:string;
    title:string="";
    requestId:Number;
    message:any;
    
    constructor( public translateService: TranslateService,
        public dialogService: DialogService, private sessionManager: UserSessionManager , private  portalAppService: PortalAppService) {
    }

    ngOnInit() {  
        this.rejectionReason = "";
        
        let data = this.dialog.data;
        this.title = data.lastName+", "+data.firstName;
        this.requestId = data.requestId;
    }
    
    ngOnDestroy () {
        
    }
    
    yes() {
        let rejection = {'requestId':this.requestId, 'rejectionReason':this.rejectionReason}
        this.portalAppService.rejectPersonAdmit(rejection).subscribe(result=> {
            
            if(result == 1 ) {
                this.message  =  this.translateService.translate('Person has been rejected');
            } else {
                this.message  =  this.translateService.translate('Person can not be rejected');
            }
            
            this.portalAppService.showMessage = this.message;
            this.portalAppService.showUpdatedRow = true;
            this.dialog.close(true);
        });
        /*setTimeout(() =>  {
            this.loaderService.showLoader();
            let eOffenderDetails = new EoffenderDetails();
            //alert('On click of Submit is '+this.dialog.data)
            const fileUploadObservable = this.eoffenderService.uploadTRIMFileFromGenerateDialog(this.tempDocumentId, eOffenderDetails, this.offenderSearchService.selectedOffender, this.moduleName);
            
            fileUploadObservable.subscribe( result => {
                this.loaderService.hideLoader();
                if ( result != null || result != undefined ) {
                    this.message  =  this.translateService.translate('File Generated and Uploaded Successfully');
                    this.eoffenderService.showMessage = this.message;
                    this.eoffenderService.showUpdatedRow = true;
                    this.dialog.close(true);
                }
            });
        },
        2000);*/
        
    }
    
    
    cancel() { 
        this.dialog.close(true); 
    }
    
    
    
}
