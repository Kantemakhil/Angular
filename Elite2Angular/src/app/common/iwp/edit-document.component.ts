import {
    Component,
    OnInit
} from '@angular/core';

import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { LoaderService } from '@core/loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { Fileupload } from "../beans/Fileupload";
import { EoffenderService } from "./service/eoffender.service";
import { MetaData } from "../beans/MetaData";
import { Router } from '@angular/router';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { EoffenderDetails } from "../beans/EoffenderDetails";
import { RedirectUtil } from '@core/classes/redirectUtil';
import { Subject } from 'rxjs';
import { FileLimits } from "../beans/FileLimits";
@Component( {
    selector: 'editDoc', 
    templateUrl: './edit-document.component.html'
} )


export class EditDocumentComponent implements OnInit {
    selectedFiles: FileList;
    selectedFilesNew : File[] = [];
    currentFileUpload: File;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    url = '';
    externalSave :boolean;
    showHeader:boolean;
    uploadDocsCloumn: any;
    uploadDocsList: any = [];
    fileUpload: Fileupload = new Fileupload();
    baseTemplateUrl: string = 'eoffender/getTemplates/';
    fileupRowData: Fileupload[] = [];
    tempUpdateFile: Fileupload[] = [];
    reverseDocList: Fileupload[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    eOffenderDetails: EoffenderDetails = new EoffenderDetails();
    filLimitValues:FileLimits[] = [];
    private innerSearchParams: any = {};
    metaDataInfo: MetaData[] = [];
    eOffenderDocs: any;
    isShowMetaData:boolean;
    isFileSelected:boolean;
    getTemplates: string = 'eoffender/getAllTemplates/';
    fileWithProperties:any;
    metaDataTitle:string;
    moduleDescription:string;
    screenId:string;
    position = "right";
    metaDataScreen:string='Document MetaData';
    fileUploadCount:number;
    fileUploadSize:number;
    templateList:any;
    totalFileSize:number=0;
    overLimitMsg:string;
    overFileSizeMsg:string;
    documentId:string;
    templateName:string;
    documentUri:string;
    objectType:string;
    objectId:string;
    private fileSubject = new Subject<any>();
    constructor( public translateService: TranslateService,
        private sessionManager: UserSessionManager, private eoffenderService: EoffenderService,private loaderService: LoaderService,
        private router: Router, private offenderSearchService: OffenderSearchService, private activatedRoute: ActivatedRoute,
        private redirectUtil: RedirectUtil) {
    }
    ngOnInit() {
        /* this.documentId = null;
        var moduleName = "";
        this.showHeader=this.eoffenderService.showHeader;
        this.activatedRoute.queryParams.subscribe(params => {
            let queryDocumentId = params['documentIdQuery']; 
                 if(queryDocumentId) {
                     let queryParams  = queryDocumentId.split(",");
                     this.documentId = queryParams[0].replace("~","/");
                     this.templateName = queryParams[1];
                     this.documentUri = queryParams[2];
                 }
            let screen = params['SCREEN']; 
                 if(screen) {
                     moduleName = screen;
                 } else {
                     moduleName = this.eoffenderService.moduleName;
                 }
                 this.objectType = screen;
                 this.getTemplates = this.baseTemplateUrl + moduleName + '/' + this.sessionManager.userSessionDetails().id.toUpperCase();
        })
        
        this.isFileSelected=true;
        //this.eOffenderDetails = this.sessionManager.userSessionDetails().eoffenderDetails;
        //this.moduleDescription = this.eOffenderDetails.description;
        //var moduleName = "OCDCCASE";//this.eOffenderDetails.moduleName;
        if(moduleName.search('_')){
            var str = moduleName.split('_');
            moduleName = str[0];
            this.screenId = moduleName.toUpperCase();
        }
        if(this.moduleDescription == null){
            this.metaDataTitle = this.metaDataScreen+" - "+this.screenId;
        }else{
            this.metaDataTitle = this.metaDataScreen+" - "+this.moduleDescription;
        }
       let userId = this.sessionManager.userSessionDetails().id.toUpperCase();
        //this.getTemplates = this.getTemplates + this.eOffenderDetails.moduleName + '/' + this.eOffenderDetails.userId + '/' +this.eOffenderDetails.trimUser;
        
        const templateList = this.eoffenderService.getTemplateList(moduleName, userId, null);
        templateList.subscribe( value => {
            this.templateList= value;
        });

        const fileLimit = this.eoffenderService.getFileLimitFromSystemProfile();
        fileLimit.subscribe( value => {
            this.filLimitValues = value;
            for(let i=0; i<this.filLimitValues.length ;i++){
                if(this.filLimitValues[i].profileCode == 'EOF_NO_LIM'){
                this.sessionManager.userSessionDetails().eoffenderDetails.fileUploadLimit = this.filLimitValues[i].profileValue;
                }else if(this.filLimitValues[i].profileCode == 'EOF_SIZE_LIM'){
                this.sessionManager.userSessionDetails().eoffenderDetails.fileUploadSizeLimit = this.filLimitValues[i].profileValue;
                }
            }
            this.fileUploadCount  = +(this.eOffenderDetails.fileUploadLimit);
            this.fileUploadSize =+(this.eOffenderDetails.fileUploadSizeLimit); 
        });
        if(this.eoffenderService.showHeader){
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        }
        this.eOffenderDetails = this.sessionManager.userSessionDetails().eoffenderDetails;
        this.getMetadataofScreens(); */
    
    }

    canEditDocName = (data: any, index: number, field: string): boolean => {
        if (data.documentId === "" || data.documentId == null) {
            return true;
        } else {
            return false;
        }
    }

    canEditDocType = (data: any, index: number, field: string): boolean => {
        if (data.documentId === "" || data.documentId == null) {
            return true;
        } else {
            return false;
        }
    }
    
    getMetadataofScreens() {
      if(this.eOffenderDetails.objectId!==null){
          const metadata = this.eoffenderService.getScreenMetaData(this.eOffenderDetails);
          metadata.subscribe( value => {
              if(value.length>0){
                  this.metaDataInfo = value;
                  this.isShowMetaData=true;
              }else{
                  this.isShowMetaData=false;
              }
          });
      }
    }

    clearData = () => {
        
    }

    getPropertiesFromFile(file, fileType){
        //var fileWithProperties:any;
       const documentList = this.eoffenderService.getDocumentUri(file, fileType);
       return documentList;
    }
    
    getPropertiesFromFiles(file: File[], fileType: string[]){
           const documentList = this.eoffenderService.getDocumentProperties(file, fileType);
           return documentList;      

    }

    onSelectFile( event ) {
        this.message='';
        if(event.target.files.length > 1 && this.documentId){
            this.type = 'warn';
            var fileLimitmsg1 = this.translateService.translate( 'uploaddoc.overFileLimitmsgone');
            var fileLimitmsg2 = this.translateService.translate( 'uploaddoc.overFileLimitmsgtwo');
            this.overLimitMsg= this.overLimitMsg= fileLimitmsg1+" 1 "+fileLimitmsg2;
            this.message = this.overLimitMsg;
            this.show();
            return;
        }
       
        if(event.target.files.length > this.fileUploadCount){
            this.type = 'warn';
            var fileLimitmsg1 = this.translateService.translate( 'uploaddoc.overFileLimitmsgone');
            var fileLimitmsg2 = this.translateService.translate( 'uploaddoc.overFileLimitmsgtwo');
            this.overLimitMsg= fileLimitmsg1+" "+this.fileUploadCount+" "+fileLimitmsg2;
            this.message = this.overLimitMsg;
            this.show();
            return;
        }
        
        if((this.fileupRowData.length) + event.target.files.length > 1 && this.documentId){
            this.type = 'warn';
            var fileLimitmsg1 = this.translateService.translate( 'uploaddoc.overFileLimitmsgone');
            var fileLimitmsg2 = this.translateService.translate( 'uploaddoc.overFileLimitmsgtwo');
            this.overLimitMsg= fileLimitmsg1+" 1 "+fileLimitmsg2;
            this.message = this.overLimitMsg;
            this.show();
            return;
        }
            
        if((this.fileupRowData.length) + (event.target.files.length) > this.fileUploadCount){
            this.type = 'warn';
            this.message = this.overLimitMsg;
            this.show(); 
            return;
        }
        
        var fileList: File[] = [];
        var fileTypeList: string[] = [];
    
        for(let i = 0; i < event.target.files.length; i++){
            if( event.target.files[i].size == 0 && event.target.files[i].name.toLowerCase().indexOf('.pdf') != -1){
                this.type = 'warn';
                this.message = this.translateService.translate('uploaddoc.unsupportedPdF');
                this.show(); 
                continue;
            }
            
            fileList.push(event.target.files[i]);
            this.totalFileSize = this.totalFileSize + event.target.files[i].size;    
            if(event.target.files[i].name.toLowerCase().indexOf('.docx') != -1){
               fileTypeList.push('.docx');
            }else if (event.target.files[i].name.toLowerCase().indexOf('.pdf') != -1) {
               fileTypeList.push('.pdf');
            } else if (event.target.files[i].name.toLowerCase().indexOf('.doc') != -1) {
               fileTypeList.push('.doc');
            } else if (event.target.files[i].name.toLowerCase().indexOf('.jpg') != -1) {
                fileTypeList.push('.jpg');
            } else if (event.target.files[i].name.toLowerCase().indexOf('.png') != -1) {
               fileTypeList.push('.png');
            } else if (event.target.files[i].name.toLowerCase().indexOf('.bmp') != -1) {
               fileTypeList.push('.bmp');
            } else if (event.target.files[i].name.toLowerCase().indexOf('.gif') != -1) {
               fileTypeList.push('.gif');
            } else if (event.target.files[i].name.toLowerCase().indexOf('.mp4') != -1) {
               fileTypeList.push('.mp4');
            } else if (event.target.files[i].name.toLowerCase().indexOf('.jpeg') != -1) {
               fileTypeList.push('.jpeg');
            } else if (event.target.files[i].name.toLowerCase().indexOf('.tiff') != -1) {
               fileTypeList.push('.tiff');
            } else if (event.target.files[i].name.toLowerCase().indexOf('.tif') != -1) {
               fileTypeList.push('.tif');
            }   
            else {
                this.type = 'warn';
                this.message = this.translateService.translate('uploaddoc.unsupportedFile');
                this.show(); 
                return; 
            }
        }
        let fileSizeinMb;
        fileSizeinMb = this.totalFileSize*0.00000095367432;
        if(fileSizeinMb > this.fileUploadSize){
            this.type = 'warn';
            var fileSizemsg1 = this.translateService.translate( 'uploaddoc.overFileSizemsgone');
            var fileSizemsg2 = this.translateService.translate( 'uploaddoc.overFileSizemsgtwo');
            this.overFileSizeMsg= fileSizemsg1+" "+this.fileUploadSize+"MB"+" "+fileSizemsg2;
            this.message = this.overFileSizeMsg;
            this.show(); 
            return; 
        }
        
        this.fileWithProperties=[];
        if ( event.target.files ) {
            
            var fileRowDataUpdated = [];
            this.reverseDocList = [];
             
                // const propList = this.getPropertiesFromFiles(fileList, fileTypeList);
                
                // propList.subscribe( result => {
                    // array of files results
                    // Iterate it 
                   
                    // if(result== null || result == undefined){
                    //     this.type = 'error';
                    //     //this.message = this.translateService.translate( 'Internal Server Error' );
                    //     //this.show();
                    // }
                    
                    let filesWithProperties:any = event.target.files; 

                    for(let i = 0; i < filesWithProperties.length; i++ ) {
                        if(this.selectedFilesNew.length == 0)
                            this.selectedFilesNew[0] = fileList[i];
                        else
                            this.selectedFilesNew.push(fileList[i]);

                       
                        var tempUpdate = new Fileupload();
                        tempUpdate.file = fileList[i]; // event.target.files[i];
                        tempUpdate.fileName = fileList[i].name;
                        tempUpdate.documentName = this.removeExtension( tempUpdate.fileName );
                        tempUpdate.image = this.extensionImage( tempUpdate.fileName );
                        tempUpdate.uri = filesWithProperties[i].uri;
                        tempUpdate.fileTypeLabel = this.documentFileType( tempUpdate.fileName );
                        if(tempUpdate.uri == '' || tempUpdate.uri == null || tempUpdate.uri == undefined || tempUpdate.uri == 'NEW_FILE'){
                            tempUpdate.status = 'NEW';
                        }else{
                            tempUpdate.status = 'Checked In';
                        }
                        tempUpdate.templateName = filesWithProperties[i].name;
                        tempUpdate.documentType = this.eoffenderService.selectedTemplateType
                        /*if(filesWithProperties[i].type != null){
                            tempUpdate.documentType = filesWithProperties[i].type;
                        }else{
                                                        tempUpdate.documentType = this.eoffenderService.selectedTemplateType
                        }*/
                        // tempUpdate.documentId = filesWithProperties[i].documentId;
                        // if(tempUpdate.documentId=='' || tempUpdate.documentId==null ||tempUpdate.documentId == undefined){
                        //     if(this.eOffenderDetails.moduleName == 'OCIDOCUM'){
                        //         this.type = 'warn';
                        //         this.message = this.translateService.translate('uploaddoc.newfileNotAllowed');
                        //         this.show();
                        //         continue;
                        //       } else if(this.documentId) {
                        //           tempUpdate.documentId = this.documentId;
                        //           tempUpdate.status = 'Checked In';
                        //           tempUpdate.documentType = this.templateName;
                        //           tempUpdate.uri = this.documentUri;
                        //       }
                        // } else if(this.documentId ) {
                        //     if(tempUpdate.documentId !== this.documentId) {
                        //         this.message = this.translateService.translate('uploaddoc.docidmismatch');
                        //         this.type = 'warn';
                        //         this.show();
                        //     } else if (tempUpdate.documentType !== this.templateName) {
                        //         this.message = this.translateService.translate('uploaddoc.templatemismatch');
                        //         this.type = 'warn';
                        //         this.show();
                        //     }
                        //     tempUpdate.documentId = this.documentId;
                        //     tempUpdate.status = 'Checked In';
                        //     tempUpdate.documentType = this.templateName;
                        //     tempUpdate.uri = this.documentUri;
                        // }
                        //tempUpdate.documentType = filesWithProperties[i].type;
                        tempUpdate.uri = this.documentUri;
                        tempUpdate.templateUri = filesWithProperties[i].templateUri;
                        if(this.documentId) {
                            tempUpdate.documentId = this.documentId;
                            tempUpdate.status = 'Checked In';
                            tempUpdate.documentType = this.templateName;
                            //tempUpdate.uri = this.documentUri;
                        } 
                        // tempUpdate.documentAuthor = this.eOffenderDetails.osUser;
                        this.tempUpdateFile.unshift( tempUpdate );
                    }
                    
                    this.fileupRowData = [];
                    setTimeout(() => {
                        this.fileupRowData = this.tempUpdateFile;
                        if(this.fileupRowData.length>0){
                            this.isFileSelected = false;
                        }else{
                            this.isFileSelected = true;
                        }

                    }, 1000 );
                    
                    
                // });   
 
        }
    }

    fileOver( event ) {

    }

    fileLeave( event ) {

    }


    selectFile(event) {
        var reader = new FileReader();
        this.selectedFiles =  event.target.files;
     }

    removeExtension( filename ) {
        var lastDotPosition = filename.lastIndexOf( "." );
        if ( lastDotPosition === -1 ) return filename;
        else return filename.substr( 0, lastDotPosition );
    }
    
    extensionImage( filename ) {
        var ext = filename.substr( filename.lastIndexOf( '.' ) + 1 );
        if ( ext == 'docx' || ext == 'doc' ) {
            return 'assets/icons/eoff_icons/word_file_25x25.png';
        } else if ( ext == 'pdf' ) {
            return 'assets/icons/eoff_icons/pdf_file_25x25.png';
        } else if (ext=='png'||ext=='jpg'||ext=='jpeg'||ext=='bmp'||ext=='gif'||ext=='tiff'||ext=='tif') {
            return 'assets/icons/eoff_icons/jpg_file_25x25.png';
        } else if (ext=='mp4') {
            return 'assets/icons/eoff_icons/mp4_file_25x25.png';
        } 
    }
    
    documentFileType(documentType){
        var ext = documentType.substr(documentType.lastIndexOf('.') + 1);
        if(ext == 'docx'){
            return 'Docx File';
        }else if(ext == 'pdf'){
            return 'Pdf File';
        }else if(ext == 'doc'){
            return 'Doc File';
        } else if(ext=='png'){
            return 'Png File'; 
        } else if(ext=='jpg'){
            return 'Jpg File';
        }else if(ext=='jpeg'){
            return 'Jpeg File';
        }else if(ext=='bmp'){
            return 'Bmp File';
        }else if(ext=='gif'){
            return 'Gif File';
        }else if(ext=='mp4'){
            return 'Mp4 File';
        }else if(ext=='tiff'){
            return 'Tiff File';
        }else if(ext=='tif'){
            return 'Tif File';
        }
    }

    gotoIwpScreen() {
       this.redirectUtil.redirectToIWp(this.objectType);
    }

    

    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }

    uploadDocuments(){
        const fileUploadResponse = this.eoffenderService.uploadDocument(this.fileupRowData);
        fileUploadResponse.subscribe( response =>{

        });
    }

    upload() {
        this.message='';
        var Id=this.eoffenderService.objectId;
        this.objectId=Id;
        var reader = new FileReader();
        for ( var index = 0; index < this.fileupRowData.length; index++ ) {

            if ( this.fileupRowData[index].documentType === undefined || this.fileupRowData[index].documentType === null || this.fileupRowData[index].documentType === '' ) {
                this.type  =  'warn';
                this.message  =  this.translateService.translate(this.fileupRowData[index].documentName + ' document Type is not filled');
                this.show();
                return;
            }
            if(this.fileupRowData[index].documentType && !this.fileupRowData[index].templateUri){
                   var documentType = this.fileupRowData[index].documentType;
                   for(let i=0;i<this.templateList.length ; i++ ){
                        if(this.templateList[i].code == documentType){
                            this.fileupRowData[index].templateUri =  this.templateList[i].templateId;
                         }  
                    }
            }
        }
        if ( this.selectedFilesNew.length == 0 ) {
            this.type  =  'warn';
            this.message  =  this.translateService.translate(  'Upload Files to save'  );
            this.show();
        } else if ( this.selectedFilesNew.length !== this.fileupRowData.length ) {
            this.type  =  'error';
            this.message  =  this.translateService.translate(  'Inconsistent Document Data List'  );
            this.show();
        } else {
                   this.loaderService.showLoader();
                   this.eoffenderService.pushFileToStorage( this.selectedFilesNew, this.fileupRowData, this.eOffenderDetails, this.vHeaderBlockModel, this.objectType,this.objectId).subscribe( resultCount => {
                       this.loaderService.hideLoader();
                    if ( resultCount === this.fileupRowData.length ) {
                        this.fileupRowData = [];
                        this.type = 'warn';
                        this.message = this.translateService.translate('uploadsoc.success');
                        this.eoffenderService.showMessage = this.message;
                        this.show();
                        this.isFileSelected=true;
                        this.tempUpdateFile=[];
                        this.fileupRowData=this.tempUpdateFile;
                        this.gotoIwpScreen();
                    } else {
                        this.loaderService.hideLoader();
                        this.type = 'error';
                        this.message = this.translateService.translate( "All files has not been uploaded" );
                        this.show();
                    }
            } );
        }
        this.selectedFiles = undefined;
        this.selectedFilesNew = [];
      }


    onDelete(event){
        var tempSelected = event[0].documentName;
        if(event[0].file){
        var deletefileSize = event[0].file.size;
        this.totalFileSize = this.totalFileSize - deletefileSize;
        }
        var propertiesSelectedForMovingTemp =  this.selectedFilesNew.filter( function( file ) {
            var lastDotPosition = file.name.lastIndexOf( "." );
            return  file.name.substr( 0, lastDotPosition )  != tempSelected;
        });
        this.selectedFilesNew = propertiesSelectedForMovingTemp;
    }
    
    onClear() {
        
    }
    
    
}
