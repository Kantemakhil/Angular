import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { LoaderService } from '@core/loader/loader.service';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { IwpBookmarks } from '@sa/admin/integratedwordprocessing/beans/IwpBookmarks';
import { OumdtempService } from '@sa/admin/integratedwordprocessing/service/oumdtemp.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import{Fileupload} from '@commonbeans/Fileupload';
import { EoffenderService } from "@common/iwp/service/eoffender.service";
import { EoffenderDetails } from "@commonbeans/EoffenderDetails";
import { VHeaderBlock } from "@commonbeans/VHeaderBlock";


@Component({
    selector: 'app-oumdtempkdialog',
    templateUrl: './oumdtempdialog.component.html'
})

export class OumdtempdialogComponent implements OnInit {
    @ViewChild('dialog') dialog: DialogComponent;
    msgs: any[] = [];
    uploadDocsCloumn: any;
     selectedFiles: FileList;
    type = 'error';
    fileupRowData: Fileupload[] = [];
    selectedFilesNew : File[] = [];
    message = ' Invalid.';
    msglist = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    templateList:any;
    tempUpdateFile: Fileupload[] = [];
    overLimitMsg:string;
    documentUri:string;
    reverseDocList: Fileupload[] = [];
    eOffenderDetails: EoffenderDetails = new EoffenderDetails();
    isFileSelected:boolean;
    fileWithProperties:any;
    templateName:string;
    fileUploadSize:number;
    overFileSizeMsg:string;
    documentId:string;
    nameOfLovPage: string;
    totalFileSize:number;
    fileUploadCount:number;
    bookmarksModel: IwpBookmarks = new IwpBookmarks();
    bookmarksIndex: Number = 0;
    bookmarksColumnDef: any[];
    objectType:string;
    constructor( public translateService: TranslateService, private eoffenderService: EoffenderService,private oumdtempFactory: OumdtempService,
        private sessionManager: UserSessionManager,private loaderService: LoaderService) {
        this.bookmarksColumnDef = [];

    }
    ngOnInit() {
         let data =this.dialog.data;
        this.uploadDocsCloumn = [
            {
                fieldName: this.translateService.translate( 'uploaddoc.templatename' ), field: 'templateName', datatype: 'text',
                editable: false, width: 150
            },
            // {
            //     fieldName: this.translateService.translate( 'uploaddoc.type' ), field: 'documentType', datatype: 'lov',
            //     editable: true, width: 100 
            // },
            {
                fieldName: '', field: 'image', datatype: 'image', editable: false, width: 50,label:'fileTypeLabel',
            },
        
            {
                fieldName: this.translateService.translate( 'template Id' ), field: 'templateId', datatype: 'text', editable: false, width: 80,
            },
            {
                fieldName: this.translateService.translate( 'Document Name' ), field: 'documentName', datatype: 'text',
                editable: true, width: 150
            },
           
        ]
       
    }
    /**
	 * This function displays the messages
	 */
     show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }

     onSelectFile( event ) {
         if(this.fileupRowData.length + event.target.files.length >1){
             this.type = 'warn';
                  this.message =  this.translateService.translate( 'Cannot upload more than one file');
                  this.show(); 
                  return;
          }
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
            }else if (event.target.files[i].name.toLowerCase().indexOf('.dot') != -1) {
               fileTypeList.push('.dot');
            } else if (event.target.files[i].name.toLowerCase().indexOf('.dotx') != -1) {
               fileTypeList.push('.dotx');
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
                         tempUpdate.templateId=this.dialog.data.templateId;
                            tempUpdate.templateName=this.dialog.data.templateName;
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
	 
	 dropped( files: NgxFileDropEntry[] ) {
        if(this.fileupRowData.length + files.length >1){
           this.type = 'warn';
                this.message =  this.translateService.translate( 'Cannot upload more than one file');
                this.show(); 
                return;
        }

        this.message='';
        var count:number = 0;
        var fileList: File[] = [];
        var fileTypeList: string[] = [];
            if(files.length > this.fileUploadCount){
                this.type = 'warn';
                var fileLimitmsg1 = this.translateService.translate( 'uploaddoc.overFileLimitmsgone');
                var fileLimitmsg2 = this.translateService.translate( 'uploaddoc.overFileLimitmsgtwo');
                this.overLimitMsg= fileLimitmsg1+" "+this.fileUploadCount+" "+fileLimitmsg2;
                this.message = this.overLimitMsg;
                this.show();
                return;
            }
            
            if(files.length > 1 && this.documentId){
                this.type = 'warn';
                var fileLimitmsg1 = this.translateService.translate( 'uploaddoc.overFileLimitmsgone');
                var fileLimitmsg2 = this.translateService.translate( 'uploaddoc.overFileLimitmsgtwo');
                this.overLimitMsg= fileLimitmsg1+" 1 "+fileLimitmsg2;
                this.message = this.overLimitMsg;
                this.show();
                return;
            }
            if((this.fileupRowData.length) + files.length > 1 && this.documentId){
                this.type = 'warn';
                var fileLimitmsg1 = this.translateService.translate( 'uploaddoc.overFileLimitmsgone');
                var fileLimitmsg2 = this.translateService.translate( 'uploaddoc.overFileLimitmsgtwo');
                this.overLimitMsg= fileLimitmsg1+" 1 "+fileLimitmsg2;
                this.message = this.overLimitMsg;
                this.show();
                return;
            }
                
            if((this.fileupRowData.length) + (files.length) > this.fileUploadCount){
                this.type = 'warn';
                this.message = this.overLimitMsg;
                this.show(); 
                return;
            }
            
//            this.fileWithProperties=[];
//            this.files = files;
            var fileWithProperties:Fileupload;
            for ( const droppedFile of files ) {
                  //var tempUpdate = new Fileupload();
                  // Is it a file?
                  if ( droppedFile.fileEntry.isFile ) {
                      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                       fileEntry.file(( file: File ) => {
                          count = count + 1;
                        
                       if(file.size == 0 && file.name.toLowerCase().indexOf('.pdf') != -1){
                           this.type = 'warn';
                           this.message = this.translateService.translate( 'uploaddoc.unsupportedPdF' );
                           this.show(); 
                           return;
                       }
                          this.totalFileSize = this.totalFileSize+file.size;
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
                          fileList.push(file);
                           if(file.name.toLowerCase().indexOf('.docx') != -1){
                               fileTypeList.push('.docx');
                           }else if (file.name.toLowerCase().indexOf('.dot') != -1) {
                              fileTypeList.push('.dot');
                           } 
                           else {
                               this.type = 'warn';
                               this.message = this.translateService.translate( 'uploaddoc.unsupportedFile' );
                               this.show(); 
                               return; 
                           }
                          
                         // fileTypeList.push(file.name);
//                          this.getPropertiesFromFile(file, file.name);
                          
                          if(this.selectedFilesNew.length == 0){
                              this.selectedFilesNew[0] = file;
                          }else{
                              this.selectedFilesNew.push(file);
                          }
                          if( files.length == count){
                            //   var propList = this.getPropertiesFromFiles(fileList, fileTypeList);
                            //   propList.subscribe( result => {
                                  // array of files results
                                  // Iterate it 
                                //   if(result== null || result == undefined){
                                //       this.type = 'error';
                                //       //this.message = this.translateService.translate( 'Internal Server Error' );
                                //       //this.show();
                                //   }
                                  
                                  let filesWithProperties:any = files; 
                                  
                                  for(let i = 0; i < filesWithProperties.length; i++ ) {
                                      this.fileWithProperties = files[i];
                                      var tempUpdate = new Fileupload();
                                      tempUpdate.fileName = fileList[i].name;
                                      tempUpdate.documentName = this.removeExtension( tempUpdate.fileName );
                                      tempUpdate.image = this.extensionImage( tempUpdate.fileName );
                                      tempUpdate.fileTypeLabel = this.documentFileType( tempUpdate.fileName );
                                      tempUpdate.uri = filesWithProperties[i].uri;
                                      if(tempUpdate.uri == '' || tempUpdate.uri == null || tempUpdate.uri == undefined || tempUpdate.uri == 'NEW_FILE'){
                                          tempUpdate.status = 'NEW';
                                      } else {
                                          tempUpdate.status = 'Checked In';
                                      }
                                      tempUpdate.documentType = this.eoffenderService.selectedTemplateType;   
                                      /*if(filesWithProperties[i].type != null){
                                          tempUpdate.documentType = filesWithProperties[i].type;
                                      }else{
                                          //tempUpdate.documentType = this.eOffenderDetails.templateType;
                                          tempUpdate.documentType = this.eoffenderService.selectedTemplateType
                                      }
                                      tempUpdate.templateName = filesWithProperties[i].name;*/
                                    //   tempUpdate.documentId = filesWithProperties[i].documentId;
                                    //   if(tempUpdate.documentId=='' || tempUpdate.documentId==null ||tempUpdate.documentId == undefined){
                                    //       if(this.eOffenderDetails.moduleName == 'OCIDOCUM'){
                                    //           this.type = 'warn';
                                    //           this.message = this.translateService.translate('uploaddoc.newfileNotAllowed');
                                    //           this.show();
                                    //           continue;
                                    //         } else if(this.documentId) {
                                    //             tempUpdate.documentId = this.documentId;
                                    //             tempUpdate.status = 'Checked In';
                                    //             tempUpdate.documentType = this.templateName;
                                    //             tempUpdate.uri = this.documentUri;
                                    //         }
                                    //   } else if(this.documentId ) {
                                    //       if(tempUpdate.documentId !== this.documentId) {
                                    //           this.message = this.translateService.translate('uploaddoc.docidmismatch');
                                    //           this.type = 'warn';
                                    //           this.show();
                                    //       } else if (tempUpdate.documentType !== this.templateName) {
                                    //           this.message = this.translateService.translate('uploaddoc.templatemismatch');
                                    //           this.type = 'warn';
                                    //           this.show();
                                    //       }
                                    //       tempUpdate.documentId = this.documentId;
                                    //       tempUpdate.status = 'Checked In';
                                    //       tempUpdate.documentType = this.templateName;
                                    //       tempUpdate.uri = this.documentUri;
                                          
                                    //   }
                                      //tempUpdate.documentType = filesWithProperties[i].type;
                                      tempUpdate.templateUri = filesWithProperties[i].templateUri;
                                      if(this.documentId) {
                                          tempUpdate.documentId = this.documentId;
                                          tempUpdate.status = 'Checked In';
                                          tempUpdate.documentType = this.templateName;
                                          //tempUpdate.uri = this.documentUri;
                                      }
                                      tempUpdate.templateId=this.dialog.data.templateId;
                                      tempUpdate.templateName=this.dialog.data.templateName;
                                      
                                      
                                      
                                    //   tempUpdate.documentAuthor = this.eOffenderDetails.osUser;
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
                            //   });
                          }        
                       });

                  }
              }
    }
	 
	  
   
   
   
  extensionImage( filename ) {
        var ext = filename.substr( filename.lastIndexOf( '.' ) + 1 );
        if ( ext == 'docx' || ext == 'doc' ||ext=='dotx'||ext=='dot') {
            return 'assets/icons/eoff_icons/word_file_25x25.png';
        } else if ( ext == 'pdf' ) {
            return 'assets/icons/eoff_icons/pdf_file_25x25.png';
        } else if (ext=='png'||ext=='jpg'||ext=='jpeg'||ext=='bmp'||ext=='gif'||ext=='tiff'||ext=='tif') {
            return 'assets/icons/eoff_icons/jpg_file_25x25.png';
        } else if (ext=='mp4') {
            return 'assets/icons/eoff_icons/mp4_file_25x25.png';
        } 
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
    
    fileOver( event ) {

    }

    removeExtension( filename ) {
        var lastDotPosition = filename.lastIndexOf( "." );
        if ( lastDotPosition === -1 ) return filename;
        else return filename.substr( 0, lastDotPosition );
    }
    fileLeave( event ) {

    }
    upload() {
        this.message='';
        var reader = new FileReader();
        for ( var index = 0; index < this.fileupRowData.length; index++ ) {

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
            this.type = 'warn';
            this.message = this.translateService.translate('Upload Files to save');
            this.show();
        } else if ( this.selectedFilesNew.length !== this.fileupRowData.length ) {
            this.type ='error';
            this.message = this.translateService.translate( 'Inconsistent Document Data List');
            this.show();
        } else {
                   this.loaderService.showLoader();
                   this.oumdtempFactory.pushTemplateFileToStorage( this.selectedFilesNew, this.fileupRowData, this.eOffenderDetails, this.vHeaderBlockModel, this.objectType,'Y').subscribe( resultCount => {
                       this.loaderService.hideLoader();
                    if ( resultCount === this.fileupRowData.length ) {
                        this.fileupRowData = [];
                        this.type = 'warn';
                        this.message = this.translateService.translate('Template Upload Successfully');
                        this.dialog.close({
                            viewButton: 'assets/icons/eoff_icons/download_24x24.png'
                        });
                        this.eoffenderService.showMessage = this.message;
                        this.show();
                        this.isFileSelected=true;
                        this.tempUpdateFile=[];
                        this.fileupRowData=this.tempUpdateFile;
                    } else {
                        this.loaderService.hideLoader();
                        this.type = 'error';
                        this.message = this.translateService.translate( "All files has not been uploaded" );
                        this.dialog.close(null);
                        this.show();
                    }
            } );
        }
        this.selectedFiles = undefined;
        this.selectedFilesNew = [];
      }
    documentFileType(documentType){
        var ext = documentType.substr(documentType.lastIndexOf('.') + 1);
        if(ext == 'docx'){
            return 'Docx File';
        }else if(ext == 'dot'){
            return 'Dot File';
        }else if(ext == 'dotx'){
            return 'Dotx File';
        }
        }
    clearData() {
        this.dialog.close(null);
       
    }
}

