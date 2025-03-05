import { DocumentService } from '@core/ui-components/document-editor/document.service';
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
import { RedirectUtil } from '@core/classes/redirectUtil';

@Component({
    selector: 'viewFile',
    templateUrl: './viewFile.component.html'
})



export class ViewFileComponent implements OnInit {
    constructor( private eoffenderService: EoffenderService,public dialogService: DialogService,
            public translateService: TranslateService,private sessionManager: UserSessionManager,
            private redirectUtil: RedirectUtil, private documentService: DocumentService) {}

    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    title:string;
    result:string;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    eOffenderDetails: EoffenderDetails = new EoffenderDetails();

    ngOnInit() {
        let doc = this.dialog.data;
        this.eOffenderDetails = this.sessionManager.userSessionDetails().eoffenderDetails;
        //this.dialog.data.trimUser= this.eOffenderDetails.trimUser;
        if(this.dialog.data.documentName.includes('doc') ||this.dialog.data.documentName.includes('docx')||this.dialog.data.documentName.includes('pdf')){
            this.title= this.removeExtension(this.dialog.data.documentName);
        }else{
            this.title= this.dialog.data.documentName;
        }
        this.documentService.docName = this.title;
        const documentStatus = this.eoffenderService.viewDocument(this.dialog.data.documentId);
        documentStatus.subscribe( result => {
            if(result.status == 500){
                /*var meassgae = result.headers._headers.get('pragma');
                var msgArr = meassgae[0];
                var responseMsg= msgArr.split(",");*/
                this.message  =  this.translateService.translate("Unable to download file");
                this.eoffenderService.showMessage = this.message;
                this.dialog.close(true);
                return;
            }
            if((!this.dialog.data.image.includes('word_file') && ! this.dialog.data.image.includes('doc_file')) || this.dialog.data.status =='SIGNED' || this.dialog.data.status =='COMPLETED'  ){
                this.saveToFileSystem( result );
                this.dialog.close(true);
                return;
            }
            if(result.size > 0){
                this.message  =  this.translateService.translate(  'File Downloaded successfully'  );
                this.eoffenderService.showMessage = this.message;
                this.dialog.close(true);
                this.documentService.mode = 'RESTRICT';
                this.documentService.currentScreen = 'OUMDTEMP';
                this.redirectUtil.redirectToEditor();
           }else{
               this.message  =  this.translateService.translate('Unable to Download File');
               this.eoffenderService.showMessage = this.message;
               this.dialog.close(true);
           }
        });

    }

    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }

    saveToFileSystem( response ) {
       if(response.status == 204){
            this.type  =  'warn';
            this.message  =  this.translateService.translate('Unsupported File Type');
            this.eoffenderService.showMessage = this.message;
            return;
        }

//        if(response.status == 202){
//            this.type  =  'warn';
//            this.message  =  this.translateService.translate(  'Document is already checked out'  );
//            this.show();
//            return;
//        }

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
          docName =  this.title + this.getExtensionFromImage(this.dialog.data.image,response.type);
      } else {
          docName =  this.title + this.getExtensionFromImage(this.dialog.data.image,response.type);
      }


      saveAs( response, docName);
    }
    
    removeExtension(filename){
        var lastDotPosition = filename.lastIndexOf(".");
        if (lastDotPosition === -1) return filename;
        else return filename.substr(0, lastDotPosition);
    }

  
    getExtensionFromImage(imageUrl,Type){
        if(this.dialog.data.status =='SIGNED' || this.dialog.data.status =='COMPLETED'){
            return '.pdf';
        }
        if(imageUrl == 'assets/icons/eoff_icons/word_file_25x25.png'){
            return '.docx';
        }else if(imageUrl == 'assets/icons/eoff_icons/pdf_file_25x25.png'){
            return '.pdf';
        }else if(imageUrl == 'assets/icons/eoff_icons/doc_file_25x25.png'){
            return '.doc';
        } else if(imageUrl == 'assets/icons/eoff_icons/jpg_file_25x25.png'){
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
    


    cancel(){
        this.dialog.close(true);
    }
}