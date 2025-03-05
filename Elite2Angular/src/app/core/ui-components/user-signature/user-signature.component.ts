import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { HttpService } from '@core/service/http.service';
import {
    PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
    ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, LoadEventArgs, FormFieldsService, FormDesignerService
} from '@syncfusion/ej2-angular-pdfviewer';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { LoaderService } from '@core/loader/loader.service';
import { OumsysetService } from '@sa/admin/service/oumsyset.service';
import { SigndocService } from '@common/iwp/service/signdoc.service';



@Component({
    selector: 's4-signature',
    templateUrl: './user-signature.component.html',
    styleUrls: ['./user-signature.component.css'],
   // encapsulation: ViewEncapsulation.None,
    providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService]
})

export class UserSignatureComponent implements OnInit {

    @Input('uri') docUriAndExt:any;
    @ViewChild('pdfviewer')
    public pdfviewerControl: PdfViewerComponent; 
    public service: string = '';
    public document:any;
    dialogRef: MatDialogRef<ConfirmationDialogComponent> | null;
    documentId: any;
    fileBlob: any;
    msgs: any[];
    isDocumentLoadedInViewerInViewer:boolean = false;
    fileName: any;
    constructor(private http: HttpService, public translateService: TranslateService,
        private loaderService: LoaderService, private eoffenderService: EoffenderService,
        public dialog: MatDialog, public oumsysetService: OumsysetService,private signDocService: SigndocService) { }

    ngOnInit(): void {
        this.getPdfService();
        this.fileName=this.signDocService.fileName;
    }


    proceedToGetDoc(){
        let arr = this.docUriAndExt.split('~');
        let type = arr[1];
        let uri = arr[0];
        this.documentId=uri;
        if(type == 'pdf'){
            this.getDefaultDocument(uri);
        }
        else if(type == 'doc'){
            this.getWordToPdf(uri);
        }
    }

    getPdfService(){
        let addPayload = {
            settingProviderCode: "ELITE_DOC",
            settingType: "EliteDoc"
        };
        this.oumsysetService.loadJsonData(addPayload).subscribe((result) => {
            const rowData = JSON.parse(result.settingValue);
            if (rowData && rowData.length > 0) {
                for (let i = 0; i < rowData.length; i++) {
                    if (rowData[i].KEY_CODE == "PDF_SERVICE") {
                        this.service = rowData[i].VALUE;
                        this.proceedToGetDoc();
                    }
                }
            }
        });
    }


    onRightClick(e){
        let clipObj = this.pdfviewerControl.clipboardData.clipObject;
        let size = Object.keys(clipObj).length;
        let selectedItemHeight = this.pdfviewerControl.selectedItems.height;
        if(size > 0 || (selectedItemHeight && selectedItemHeight > 0)){
            return;
        }
        let cN = (e.target as Element).className;
        if(cN && cN == 'e-pv-text-layer'){
            this.pdfviewerControl.annotationModule.setAnnotationMode('HandWrittenSignature');
        }
    }

    openModal(imageData) {
        const dialogConfig = {
          data: { 
                  title: 'Download',
                  message: 'Do you want to download this signature'
                },
          disableClose: true,
          hasBackdrop: true,
          height: '170px',
          width: '100%',
        };
        this.dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
        this.dialogRef.afterClosed().subscribe((result) => {
            this.dialogRef = null;
            if (result && result == true) {
                const linkSource = imageData;
                const downloadLink = document.createElement("a");
                downloadLink.href = linkSource;
                downloadLink.download = 'Signature';
                downloadLink.click();
            }
        });
      }

      show(type, message) {
        const msglist = [];
        msglist.push({ message: message, type: type });
        this.msgs = [...msglist];
      }

    savePdf(){
        var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0]; 
        var that = this;
        that.loaderService.showLoader();
        viewer.saveAsBlob().then(function(value) {
            var data = value;
            const files = [];
            var b: any = data;
            b.lastModifiedDate = new Date();
            b.__proto__ = File.prototype
            files.push(b);
            const documentStatus = that.eoffenderService.uploadSignatureDoc(files,that.documentId,that.fileName);
            documentStatus.subscribe( result => {
                that.loaderService.hideLoader();
                if(result == 1){
                    that.show( 'success',that.translateService.translate('eoffender.documentsaved'));
                    that.cancelSignature();
                }else{
                    that.show('error',that.translateService.translate('common.addupdateremoverecordfailed'));
                }
               
            });
        })
        
        
        /* var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0]; 
        viewer.download(); */
    }

    openSignature(){
        this.pdfviewerControl.annotationModule.setAnnotationMode('HandWrittenSignature');
    }

    getDefaultDocument(documentUri){                  
        let myHeaders = new HttpHeaders();
        myHeaders.append( 'Accept', '*/*' );
        this.http.getBlob('iwp/document/viewfile/?uri='+documentUri, myHeaders).subscribe(data => {
               this.blobToBase64(data);
        })
    }


    getWordToPdf(documentUri){                  
        let myHeaders = new HttpHeaders();
        myHeaders.append( 'Accept', '*/*' );
        this.http.getBlob('iwp/convertToPdf/?uri='+documentUri, myHeaders).subscribe(pdfBlob => {
               this.blobToBase64(pdfBlob);
        })
    }

    blobToBase64(blob) {
        var reader = new FileReader();
        var that = this;
        reader.readAsDataURL(blob);
        this.fileBlob=blob;
        reader.onloadend = function () {
            var base64data = reader.result;
            that.document = base64data;
        }
    }

    cancelSignature(){
        window.history.back();
    }


    public documentLoad(e: LoadEventArgs): void {
        this.isDocumentLoadedInViewerInViewer = true;
        // var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
        // viewer.formDesignerModule.addFormField("SignatureField", { name: "Sign", bounds: { X: 60, Y: 900, Width: 200, Height: 70 } });
        // viewer.formDesignerModule.addFormField("Textbox", { name: "DOS Month", bounds: { X: 60, Y: 1000, Width: 40, Height: 30 } });
        // viewer.formDesignerModule.addFormField("Textbox", { name: "DOS Date", bounds: { X: 110, Y: 1000, Width: 40, Height: 30 } });
        // viewer.formDesignerModule.addFormField("Textbox",
        //     {
        //         name: "DOS Year",
        //         bounds: { X: 160, Y: 1000, Width: 40, Height: 30 },
        //         placeholder: 'year'
        //     }
        // );
    }

    // onDownloadStart(evento, pdfViewer) {
    //     console.log(evento);
    //     console.log(pdfViewer)
    //     var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0]; 
    //     console.log(viewer)
    //   }

    // signatureDelete(args){
    //     console.log(args)
    // }

    // signatureAdded(args){
    // if(args.data && args.data.startsWith("data:image")){
    //     this.openModal(args.data)
    //  }
    // }


}

    