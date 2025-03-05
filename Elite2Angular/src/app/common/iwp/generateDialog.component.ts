import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { RedirectUtil } from '@core/classes/redirectUtil';
import { LoaderService } from '@core/loader/loader.service';
import { TranslateService } from "../translate/translate.service";
import { EoffenderService } from "./service/eoffender.service";
import { DialogService } from "../../core/ui-components/dialog/dialog.service";
import { Fileupload } from "../beans/Fileupload";
import { EoffenderDetails } from "../beans/EoffenderDetails";
import { UserSessionManager } from "../../core/classes/userSessionManager";
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
//import { Router, ActivatedRoute } from '@angular/router';

@Component( {
    selector: 'generate-dialog',
    templateUrl: './generateDialog.component.html'
} )
export class GenerateDialogComponent implements OnInit, OnDestroy {
   

    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    document: Fileupload;
    label: string;
    yesBtn: boolean;
    noBtn: boolean;
    yesLabel: string;
    noLabel: string;
    allowLineGap: boolean;
    cancelBtn: boolean;
    cancelLabel: string;
    eoffenderRequest: any;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    documentAvailableMsg= "";
    msgs: any[] = [];
    title:string;
    eOffenderDetails: EoffenderDetails = new EoffenderDetails();
    disableButtons : boolean = true;
    id: string;
    interval : any;
    tempDocumentId : string;
    moduleName : string;
    
    constructor( public translateService: TranslateService,
        private eoffenderService: EoffenderService,private offenderSearchService: OffenderSearchService,private loaderService: LoaderService,
        public dialogService: DialogService, private redirectUtil: RedirectUtil, private sessionManager: UserSessionManager ,/*private _Activatedroute:ActivatedRoute,
        private _router:Router*/) {
    }

    ngOnInit() {  
        
        let data = this.dialog.data.split("-");
        
        this.tempDocumentId = data[0];
        this.moduleName = data[1];
        this.documentAvailableMsg = this.translateService.translate('eoffedner.filenotready');
        //"Submit button will get available once document will be closed."
        this.interval = setInterval(() => {
            //alert('calling to get notification '); 
           let resultObservable = this.eoffenderService.verifyGeneratedDoc(this.tempDocumentId);
           resultObservable.subscribe((result)=>{
               if(result) {
                   if(result === 'INPROCESS') {
                       if (this.interval) {
                           clearInterval(this.interval);
                           this.disableButtons = false;
                           this.documentAvailableMsg = this.translateService.translate('eoffedner.generateHeading');
                           //"Click on Submit button perform generate document."
                       }
                   }
               }
           });
       }, 5000);
    }
    
    ngOnDestroy () {
        //alert('component destroyed');
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    
    yes() {
        // UPLOAD document to TRIM
        setTimeout(() =>  {
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
        2000);
        
    }
    
    
    cancel() { 
        this.dialogService.openLinkDialog( '/canceldialog', 50,40 ).subscribe( result => {
            if ( result!=null && result==="Y" ) {
                this.dialog.close(true);
                }
        } ); 
    }
    
    getExtensionFromImage(imageUrl){
        
        if(imageUrl == 'assets/icons/eoff_icons/word_file_25x25.png'){
            return '.docx';
        }else if(imageUrl == 'assets/icons/eoff_icons/pdf_file_25x25.png'){
            return '.pdf';
        }else if(imageUrl == 'assets/icons/eoff_icons/doc_file_25x25.png'){
            return '.doc';
        }
    }

    addBeakLinke( labelStr: string ): string {
        const label = { msg: '' };
        // while (label.includes('\n')) {
        //   label.replace('\n', '<br/>');
        // }
        labelStr.split( '' ).forEach( element => {
            if ( element === '\n' ) {
                label.msg += '<br\>';
            } else {
                label.msg += element;
            }
        } );
        return label.msg;
    }
    
}
