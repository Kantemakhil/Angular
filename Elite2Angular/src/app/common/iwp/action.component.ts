import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';


import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { EoffenderService } from "./service/eoffender.service";
import { saveAs } from 'file-saver';
import { EoffenderDetails } from "../beans/EoffenderDetails";
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Fileupload } from "../beans/Fileupload";
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';

@Component({
    selector: 'action',
    templateUrl: './action.component.html',
})



export class ActionComponent implements OnInit {
    
    eOffenderDetails: EoffenderDetails = new EoffenderDetails();

    constructor( private eoffenderService: EoffenderService,public dialogService: DialogService,private offenderSearchService: OffenderSearchService,
              public translateService: TranslateService,private sessionManager: UserSessionManager,) {}

    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    title:string;
    result:string;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    
    document: Fileupload;
   

    ngOnInit() {
        //this.dialog.data;
        //this.eOffenderDetails = this.sessionManager.userSessionDetails().eoffenderDetails;
        //this.dialog.data.trimUser= this.eOffenderDetails.trimUser;
        this.document = new Fileupload();
        this.document.createdDate = this.dialog.data.crtDate;
        this.document.documentId = this.dialog.data.documentId;
        this.document.status = this.dialog.data.status;
        this.document.documentName = this.dialog.data.documentName;
        this.document.documentType = this.dialog.data.documentType;
        this.document.documentAuthor = this.dialog.data.documentAuthor;
        //this.eOffenderDocsListInGrid.push(document);
        if(this.dialog.data.status=='Finalized'){
            this.dialog.close(true);
        }else{
            if(this.dialog.data.status == "PUBLIC"){
                if(this.dialog.data.documentName.includes('doc') ||this.dialog.data.documentName.includes('docx')||this.dialog.data.documentName.includes('pdf')){
                    this.title= this.removeExtension(this.dialog.data.documentName);
                } else {
                    this.title= this.dialog.data.documentName;
                }
                let eOffenderDetails = new EoffenderDetails();
                let document = this.dialog.data;
                /*if(eOffenderDetails.offenderBookId){
                    var offenderBookId = this.sessionManager.userSessionDetails().eoffenderDetails.offenderBookId.toString();
                 }
                 if(eOffenderDetails.offenderId){
                     var offenderId = eOffenderDetails.offenderId.toString();
                 }*/
                 
                //var dateOfBirth = this.eoffenderService.transformDate(this.sessionManager.userSessionDetails().selectedOffender.birthDate);
                document.offenderBookId = this.offenderSearchService.selectedOffender.offenderBookId ;
                //document.dob = dateOfBirth;
                //document.offenderDisplayId = eOffenderDetails.offenderIdDisplay;
                //document.offenderBookingNo = eOffenderDetails.offenderBookingNo;
                //document.documentAuthor=eOffenderDetails.osUser
                const documentStatus = this.eoffenderService.getChangedStatusResult(document);
                documentStatus.subscribe( result => {
                    if(result.status == 500){
                        this.message  =  this.translateService.translate("eoffender.servererror");
                        this.eoffenderService.showMessage = this.message;
                        this.dialog.close(true);
                        return;
                    }
                    this.eoffenderService.edited = true;
                    this.eoffenderService.editedDocId = document.documentId;
                    this.saveToFileSystem( result );
                   if(result.size > 0){
                       this.message  =  this.translateService.translate('File is ready for editing.');
                       this.eoffenderService.showMessage = this.message;
                       this.eoffenderService.showUpdatedRow = true;
                       this.dialog.close({
                           status:'Checked Out',
                           statusdesc:'Checked Out',
                           button:'assets/icons/eoff_icons/cancel_24x24.png',
                           secButton:'',
                           statusImage:'assets/icons/eoff_icons/checkedout_20x20.png',
                           statusIconLabel:'Checked Out',
                           btnTitle:'Cancel Edit',
                           
                       });
                   }
                });
            } else{
                if(this.dialog.data.documentName.includes('doc') ||this.dialog.data.documentName.includes('docx')||this.dialog.data.documentName.includes('pdf')){
                    this.title= this.removeExtension(this.dialog.data.documentName);
                }else{
                    this.title= this.dialog.data.documentName;
                }
                const documentStatus = this.eoffenderService.getCancelStatusResult(this.dialog.data.uri,this.dialog.data.trimUser);
                documentStatus.subscribe( result => {
                   if('CANCEL CHECKOUT SUCESSS' == result){
                       this.message  =  this.translateService.translate('Cancel Checked out successfully');
                       this.eoffenderService.showMessage = this.message;
                       this.eoffenderService.showUpdatedRow = true;
                       this.dialog.close({
                           status:'Checked In',
                           statusdesc:'Checked In',
                           button: 'assets/icons/eoff_icons/edit_24x24.png',
                           secButton:'assets/icons/eoff_icons/final_24x24.png',
                           statusImage:'assets/icons/eoff_icons/checkedin_20x20.png',
                           statusIconLabel:'Checked In',
                           btnTitle:'Edit File',
                           finalBtnTitle:'Finalise File',
                           
                       });

                   }else{
                       this.message  =  this.translateService.translate(result);
                       this.eoffenderService.showMessage = this.message;
                       this.dialog.close(true);
                   }
                });

            }
        }
    }

    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }

    saveToFileSystem( response ) {
//      const contentDispositionHeader: string = response.headers.get( 'Content-Disposition' );
//      const parts: string[] = contentDispositionHeader.split( ';' );
//      const filename = parts[1].split( '=' )[1];
//      const blob = new Blob( [response._body], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' } );
        if(response.status == 204){
            this.type  =  'warn';
            this.message  =  this.translateService.translate('Unsupported File Type');
            this.eoffenderService.showMessage = this.message;
            return;
        }


      if(response.size == 0){
          this.type  =  'warn';
          this.message  =  this.translateService.translate('No response');
          this.eoffenderService.showMessage = this.message;
          return;
      }

      var docName = this.dialog.data.documentName;
      
      let file = response;
      var fileURL = URL.createObjectURL(file);
      //window.open(fileURL);
      if ( navigator.userAgent.indexOf( '.NET4' ) != -1 ||  navigator.userAgent.indexOf( 'rv:11' ) != -1) {
          
          docName = this.title + this.getExtensionFromImage(this.dialog.data.image,response.type);
      }

      docName = 'EDITED' + '_' + new Date().getMilliseconds() + '_' + docName;
      saveAs( response, docName);
    }
    
    removeExtension(filename){
        var lastDotPosition = filename.lastIndexOf(".");
        if (lastDotPosition === -1) return filename;
        else return filename.substr(0, lastDotPosition);
    }

    getExtensionFromImage(imageUrl,Type){
      
        if(imageUrl == 'assets/icons/eoff_icons/word_file_25x25.png'){
            return '.docx';
        }else if(imageUrl == 'assets/icons/eoff_icons/pdf_file_25x25.png'){
            return '.pdf';
        }else if(imageUrl == 'assets/icons/eoff_icons/doc_file_25x25.png'){
            return '.doc';
        }else if(imageUrl == 'assets/icons/eoff_icons/jpg_file_25x25.png'){
            if(Type.includes("gif")){
                return '.gif';   
            }else if(Type.includes("bmp")){
                return '.bmp';   
            }else if(Type.includes("jpg")){
                return '.jpg';   
            }else if(Type.includes("png")){
                return '.png';   
            }else if(Type.includes("tiff")){
                return '.tiff';   
            }else if(Type.includes("tif")){
                return '.tif';   
            }else if(Type.includes("jpeg")){
                return '.jpeg';   
            }
            }  
    }

    submit() {
        
        // UPLOAD document to TRIM
        //this.downloadDocument();
        setTimeout(() =>  {
            let eOffenderDetails = this.sessionManager.userSessionDetails().eoffenderDetails;
            const fileUploadObservable = this.eoffenderService.uploadTRIMFileFromGenerateDialog( this.dialog.data.documentId, eOffenderDetails, null, null);
            
            fileUploadObservable.subscribe( result => {
                if ( result != null || result != undefined ) {
                    this.message  =  this.translateService.translate('File Edited and Uploaded Successfully');
                    this.eoffenderService.showMessage = this.message;
                    this.eoffenderService.showUpdatedRow = true;
                    this.dialog.close({
                        status:'Checked In',
                        statusdesc:'Checked In',
                        button: 'assets/icons/eoff_icons/edit_24x24.png',
                        secButton:'assets/icons/eoff_icons/final_24x24.png',
                        statusImage:'assets/icons/eoff_icons/checkedin_20x20.png',
                        statusIconLabel:'Checked In',
                        btnTitle:'Edit File',
                        finalBtnTitle:'Finalise File',
                        
                    });
                    
                }        
		    
		    });      
		    
		      },       
		       5000);            
		           //this.redirectUtil.redirectToHome();  
			         //this.dialog.close( null );  
				   }
    cancel(){
        this.message  =  this.translateService.translate('File Saved Successfully');
        this.eoffenderService.showMessage = this.message;
        this.eoffenderService.showUpdatedRow = true;
        this.dialog.close({
          status:'Checked Out',
          button:'assets/icons/eoff_icons/cancel_24x24.png',
          secButton:'',
          statusImage:'assets/icons/eoff_icons/checkedout_20x20.png',
          statusIconLabel:'Checked Out',
          btnTitle:'Cancel Edit',
      });
    }
}