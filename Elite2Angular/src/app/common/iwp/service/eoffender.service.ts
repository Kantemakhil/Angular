import { DocumentService } from '@core/ui-components/document-editor/document.service';
import { Injectable } from '@angular/core';

import {Observable,Subject} from 'rxjs';
import { HttpService } from '@core/service/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Fileupload } from "../../beans/Fileupload";
import { EoffenderDetails } from "../../beans/EoffenderDetails";
import { DatePipe } from '@angular/common';

@Injectable({providedIn: 'root'})
export class EoffenderService {
    
    public moduleName:string = "";
    public showHeader:boolean=false;   
    public objectId:string;
    constructor(private http: HttpService,private httpClient: HttpClient, public sessionManager: UserSessionManager,private datePipe: DatePipe,
        private documentService: DocumentService) {}
    private messageSubject = new Subject<any>();
    public msgType;
    private rowSubject = new Subject<any>();
    private editedDocNotificationSubject = new Subject<any>();
    private editClicked:boolean=false;
    private editDocId:string;
    selectedTemplateType:any;
    selectedRowData :any;
    languageId =1033;
    
    getBaseUrl(){
        var baseUrl = window.location.origin;
        if (!window.location.origin) {
            baseUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }
        return baseUrl;
    }
    
    getWatcherInfo() {
        return this.http.get('/iwp/watcherInfo');
    }
    
    getEOffenderDetails(keyLogin) {
        return this.http.get('eoffender/getEoffenderDetails?keyLogin='+keyLogin);
    }
    
    verifyGeneratedDoc(docId):Observable<any> {
        if (docId) {
            
            let resultObservable  = this.http.get('iwp/generatedDocVerification?docId='+docId, null, false);
            return resultObservable;
        }
    }
    
    verifyEditedDocCheckedIn() {
        
        if (this.editDocId != undefined || this.editDocId !=null) {
          
          let resultObservable  = this.http.get('eoffender/editedDocCheckInVerification?docId='+this.editDocId, null, false);
          resultObservable.subscribe((result)=>{
              if(result) {
                  if(result === 'CHECKEDIN' && this.editDocId) {
                      
                      this.edited = false;
                      this.editedDocId = undefined;
                      this.sendNotificationToHome = "SUCCESS";
                  } else if (result == 'ERROR' && this.editDocId) {
                      
                      this.edited = false;
                      this.editedDocId = undefined;
                      this.sendNotificationToHome = "ERROR";
                  }
              }
          });
        }
    }

    get getEditedDocNotification(): Observable<any> {
        return this.editedDocNotificationSubject.asObservable();
    }
    
    
    
    set sendNotificationToHome(editedDocResponse: any) {
        this.editedDocNotificationSubject.next(editedDocResponse);
    }
    
    set edited(clicked:boolean) {
        this.editClicked = clicked;
    }
    
    set editedDocId(docId:string) {
        this.editDocId = docId;
    }
    
    createEoffenderDocument(eoffenderDocumentRequest, generateDialogLink){
          const headers = new HttpHeaders({
        //myHeaders.append('Content-Type', 'application/pdf');
              'Authorization': this.sessionManager.getTokenType()
              + ' ' + this.sessionManager.getAccessToken() ,
              'Accept' : '*/*'
            });
        let requestOptionArgs =  { 'headers': headers, 'responseType': 'blob' };
        //return this.http.get('eoffender/document/download',eoffenderDocumentRequest);
        return this.httpClient.post( this.getBaseUrl()+'/Elite2Web/api/eoffender/document/generate?dialogLink=' +generateDialogLink, eoffenderDocumentRequest, { 'headers': headers, 'responseType': 'blob' } );
    }

    generateDocumentName(eoffenderDetails: EoffenderDetails, templateName){
        return this.http.post( 'eoffender/getDocumentName?templateName='+templateName,eoffenderDetails);
    }

    uploadDocument(obj){
//        let myHeaders = new HttpHeaders();
//        //myHeaders.append('Content-Type', 'application/pdf');
//        //myHeaders.append( 'Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' );
//        myHeaders.append( 'Content-Type', 'text/plain' );
//        let requestOptionArgs = new RequestOptions( { 'headers': myHeaders} );

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data;boundary='+Math.random());
        let options = { headers: headers }; // Create header

        let formData = new FormData();
        formData.append('file[]', obj); // Append file to formdata

        return this.http.post('eoffender/upload', formData, options)
    }

    get messageObservable(): Observable<any> {
        return this.messageSubject.asObservable();
    }

    set showMessage(message: any) {
        this.messageSubject.next(message);
    }

    addDocumentExtension (fileName, documentName) {
        var lastDotPosition = fileName.lastIndexOf( "." );
        var extension = "";
        if ( lastDotPosition === -1 ) {
            return documentName;
        } else  {
            extension = fileName.substr( lastDotPosition, fileName.length);
            return documentName+extension;
        }
    }
    getDocumentName(fileName)
    {
        var lastDotPosition = fileName.lastIndexOf( "-" );
        var extension = "";
        if ( lastDotPosition === -1 ) {
            return fileName;
        } else  {
            fileName = fileName.substr( lastDotPosition+1, fileName.length);
            return fileName;
        }
    }
          
     toProperCase( documentName) {
	    return documentName.substring(0, 1).toUpperCase()+documentName.substring(1).toLowerCase();
	}
    getCompletedStatusResult(documentId){
		return this.http.get('iwp/document/completeDocument?documentId=' +documentId);
	}
     
  uploadSignatureDoc(file : File[],documentId : any,fileName:any){
    const httpOptions = {
        headers: new HttpHeaders({
          //'Content-Type':  'multipart/form-data;boundary='+Math.random(),                    // Don't add this
          'Authorization': this.sessionManager.getTokenType()
          + ' ' + this.sessionManager.getAccessToken() ,
          'Accept' : '*/*'
        })
};

const formData: FormData = new FormData();
formData.append("documentId", documentId);
formData.append('file', file[0]);
formData.append('fileName', fileName);
return this.httpClient.post(this.getBaseUrl()+'/Elite2Web/api/iwp/uploadSignedDoc', formData, httpOptions);

  }
    
    pushFileToStorage(files: File[], fileupRowData: Fileupload[], eoffenderDetails: EoffenderDetails, vHeaderBlockModel : any, objectType,objectId): Observable<Object> {
        const httpOptions = {
                headers: new HttpHeaders({
                  //'Content-Type':  'multipart/form-data;boundary='+Math.random(),                    // Don't add this
                  'Authorization': this.sessionManager.getTokenType()
                  + ' ' + this.sessionManager.getAccessToken() ,
                  'Accept' : '*/*'
                })
        };
        this.documentService.isSyncDocument = true;
          var offenderBookId ;
      if(vHeaderBlockModel.offenderBookId && objectId ){
          offenderBookId = vHeaderBlockModel.offenderBookId;
      }else if(vHeaderBlockModel.offenderBookId){
          offenderBookId = vHeaderBlockModel.offenderBookId;
          objectId = "";
     }else if(objectId){
           offenderBookId =""; 
       } 
       var offenderId = "";
       if(files.length){
           var fileCount = files.length.toString();
       }
       var offenderName="";
       var dateOfBirth = "";//this.transformDate(this.sessionManager.userSessionDetails().selectedOffender.birthDate);
       var objectType = objectType;
       const formData: FormData = new FormData();
       formData.append("offenderBookId", offenderBookId);
       if(files.length !== fileupRowData.length){
           return;
       }
       for (let i = 0; i < files.length; i++) {
        let withPrefixFileName="";
           let fileName=this.addDocumentExtension(fileupRowData[i].fileName, fileupRowData[i].documentName)
          /* if(fileupRowData[i].documentId==null){
               fileName = this.getDocumentName(fileName);
               withPrefixFileName=eoffenderDetails.offenderIdDisplay+" "+"-"+" "+offenderName+" "+"-"+" "+dateOfBirth+" "+"-"+" "+fileName;
           } else {
               withPrefixFileName=fileName;
           }*/
           formData.append('file', files[i]);
           formData.append('templateId', fileupRowData[i].documentType);
           formData.append('fileName', fileName.replaceAll(",","||"));
           formData.append('documentUriList', !fileupRowData[i].documentId ? 'NEW_FILE' : fileupRowData[i].documentId);
           formData.append('templateUriList', fileupRowData[i].templateUri); 
       }
       
          formData.append('objectId', objectId);
          formData.append('objectType', objectType);    
       
       
       //formData.append('file[]', files);
     /*  var getUrl = window.location;
       var baseUrl = getUrl.origin;*/
        
       return this.httpClient.post(this.getBaseUrl()+'/Elite2Web/api/iwp/upload', formData, httpOptions);
    }

    saveDocFie(files: File[], fileupRowData: Fileupload[], eoffenderDetails: EoffenderDetails, vHeaderBlockModel: any, objectType, objectId): Observable<Object> {
        const httpOptions = {
            headers: new HttpHeaders({
                //'Content-Type':  'multipart/form-data;boundary='+Math.random(),                    // Don't add this
                'Authorization': this.sessionManager.getTokenType()
                    + ' ' + this.sessionManager.getAccessToken(),
                'Accept': '*/*'
            })
        };
        this.documentService.isSyncDocument = true;
        var offenderBookId;
        if (vHeaderBlockModel && vHeaderBlockModel.offenderBookId && objectId) {
            offenderBookId = vHeaderBlockModel.offenderBookId;
        } else if (vHeaderBlockModel && vHeaderBlockModel.offenderBookId) {
            offenderBookId = vHeaderBlockModel.offenderBookId;
            objectId = "";
        } else if (objectId) {
            offenderBookId = "";
        }
        var offenderId = "";
        if (files.length) {
            var fileCount = files.length.toString();
        }
        var offenderName = "";
        var dateOfBirth = "";//this.transformDate(this.sessionManager.userSessionDetails().selectedOffender.birthDate);
        var objectType = objectType;
        const formData: FormData = new FormData();
        formData.append("offenderBookId", offenderBookId);
        if (files.length !== fileupRowData.length) {
            return;
        }
        for (let i = 0; i < files.length; i++) {
            let withPrefixFileName = "";
            let fileName = this.addDocumentExtension(fileupRowData[i].fileName, fileupRowData[i].documentName)
            /* if(fileupRowData[i].documentId==null){
                 fileName = this.getDocumentName(fileName);
                 withPrefixFileName=eoffenderDetails.offenderIdDisplay+" "+"-"+" "+offenderName+" "+"-"+" "+dateOfBirth+" "+"-"+" "+fileName;
             } else {
                 withPrefixFileName=fileName;
             }*/
            formData.append('file', files[i]);
            formData.append('templateId', fileupRowData[i].documentType);
            formData.append('fileName', fileName.replaceAll(",", "||"));
            formData.append('documentUriList', !fileupRowData[i].documentId ? 'NEW_FILE' : fileupRowData[i].documentId);
            formData.append('templateUriList', fileupRowData[i].templateUri);
        }

        formData.append('objectId', objectId);
        formData.append('objectType', objectType);


        //formData.append('file[]', files);
        /*  var getUrl = window.location;
          var baseUrl = getUrl.origin;*/

        return this.httpClient.post(this.getBaseUrl() + '/Elite2Web/api/iwp/uploadDoc', formData, httpOptions);
    }

      getScreenMetaData(obj) {
        return this.http.post('eoffender/getUploadMetaData',obj)
    }

      getDocumentList(obj){
          return this.http.post('iwp/document/list',obj)

      }

      getLoginMsgs(lang: string) {
          return this.http.get('getLoginMsgResources?lang=' + lang);
        }

      getAppMsgs(lang: string) {
          return this.http.get('getAppMsgResources?lang=' + lang);
        }
      getChangedStatusResult(documentMetaData){                         // EDIT button
          //return this.http.post('eoffender/document/action',obj);
          let myHeaders = new HttpHeaders();
          //myHeaders.append('Content-Type', 'application/pdf');
          myHeaders.append( 'Accept', '*/*' );
          let requestOptionArgs =  { 'headers': myHeaders, 'responseType': 'blob' } ;

          return this.http.post('iwp/document/downloadfromTRIM', documentMetaData, requestOptionArgs);
      }



      viewDocument(documentUri){                  // HyperLink
          //return this.http.post('eoffender/document/action',obj);

          let myHeaders = new HttpHeaders();
          //myHeaders.append('Content-Type', 'application/pdf');
          myHeaders.append( 'Accept', '*/*' );
          let requestOptionArgs = { 'headers': myHeaders, 'responseType': 'blob' } ;

          return this.http.getBlob('iwp/document/viewfile/?uri='+documentUri, myHeaders);
      }


      getFinalStatusResult(documentId,trimUser,status,fileName){
          let url = 'iwp/document/final?recordNumber=' +documentId+'&trimUser='+trimUser+'&status='+status+'&fileName='+fileName;
          return this.http.get(url);
      }


      getCancelStatusResult(documentUri,trimUser){
          let url = '/eoffender/document/cancel?documentUri=' +documentUri+'&trimUser='+trimUser;
          return this.http.get(url);
      }

      getDocumentUri(file, fileType): Observable<Object>{
          const httpOptions = {
                  headers: new HttpHeaders({
                    //'Content-Type':  'multipart/form-data;boundary='+Math.random(),                    // Don't add this
                    'Authorization': this.sessionManager.getTokenType()
                    + ' ' + this.sessionManager.getAccessToken() ,
                    'Accept' : '*/*'
                  })
          };

         const formData: FormData = new FormData();
         formData.append("file", file)
         formData.append("fileType", fileType)

       /* var getUrl = window.location;
       var baseUrl = getUrl.origin;*/
          return this.httpClient.post(this.getBaseUrl()+'/Elite2Web/api/eoffender/document/getPropertiesFromFile', formData, httpOptions);
      }
      
      getDocumentProperties(files: File[], fileType: string[]): Observable<Object>{
          const httpOptions = {
                  headers: new HttpHeaders({
                    //'Content-Type':  'multipart/form-data;boundary='+Math.random(),                    // Don't add this
                    'Authorization': this.sessionManager.getTokenType()
                    + ' ' + this.sessionManager.getAccessToken() ,
                    'Accept' : '*/*'
                  })
          };
          const formData: FormData = new FormData();
          
          for (let i = 0; i < files.length; i++) {
              formData.append('file', files[i]);
              formData.append('fileType', fileType[i]);        
          } 
          return this.httpClient.post(this.getBaseUrl()+'/Elite2Web/api/iwp/document/getPropertiesFromFiles', formData, httpOptions);
      }
      
      getTemplateList(moduleName,userId,trimUser){
          return this.http.get('eoffender/getTemplates'+'/'+moduleName);
      }
      getUserModuleAccess(moduleName,userId){
        return this.http.get('eoffender/getUserModuleAccess?moduleName=' + moduleName);
    }
      getFileLimitFromSystemProfile(){
          return this.http.get('eoffender/getEoffenderProfileValues');
      }
      
      uploadTRIMFileFromDialog(documentId) {
          return this.http.post('eoffender/document/uploadFromDialog?documentId', documentId);
      }
      
      uploadTRIMFileFromGenerateDialog(documentId, eoffenderDetails, vHeaderBlockModel : any, moduleName) {
          //alert(documentId);
          const httpOptions = {
                  headers: new HttpHeaders({
                    //'Content-Type':  'multipart/form-data;boundary='+Math.random(),                    // Don't add this
                    'Authorization': this.sessionManager.getTokenType()
                    + ' ' + this.sessionManager.getAccessToken() ,
                    'Accept' : '*/*'
                  })
          };
          if(vHeaderBlockModel.offenderBookId){
              var offenderBookId = vHeaderBlockModel.offenderBookId;
           }
          var offenderId = "";
           
           var dateOfBirth = "";
           var offenderName = "";
           const formData: FormData = new FormData();
           formData.append("offenderBookId", offenderBookId.toString());
           formData.append('objectType', moduleName);
           /*formData.append("offenderId", offenderId);
           if(eoffenderDetails.objectId == 0 || eoffenderDetails.objectId == null || eoffenderDetails.objectId == undefined){
               formData.append('objectId', null);
               formData.append('objectType', null);   
           } else {
               formData.append('objectId', eoffenderDetails.objectId.toString());
               formData.append('objectType', eoffenderDetails.objectType);    
           }*/
           formData.append('key', documentId.toString());
           return this.httpClient.post(this.getBaseUrl()+'/Elite2Web/api/iwp/document/uploadFromGenerateDialog', formData, httpOptions);
      }
      documentDataUpdate(obj) {
        return this.http.post('eoffender/documentDataUpdate', obj);
    }
      imageExecuteQuery(obj) {
          return this.http.post('eoffender/imageExecuteQuery', obj);
      }
      
      get rowUpdateObservable(): Observable<any> {
          return this.rowSubject.asObservable();
      }

      set showUpdatedRow(gridUpdate: any) {
          this.rowSubject.next(gridUpdate);
      }
      
      
      transformDate( value: string ) {
          var datePipe = new DatePipe("en-US" );
          return datePipe.transform( value, 'dd/MM/yyyy' );
      }

      getSpellCheckLangId(){
        return this.http.get('eoffender/getLanguageId')
     }
     getStaffEliteDocDeleteRoles() {
        return this.http.get('eoffender/getStaffEliteDocDeleteRoles');
      }
      deleteEliteDocumnet(obj){
        return this.http.post('eoffender/deleteEliteDoc',obj)

    }
}

//openReport(report, inputParams) {
//    let myHeaders = new HttpHeaders();
//    myHeaders.append('Content-Type', 'application/pdf');
//    myHeaders.append('Accept', 'application/pdf');
//    let requestOptionArgs = new RequestOptions({ 'headers': myHeaders, 'responseType'  : ResponseContentType.Blob});
//    return this.http.get('report/runReport/'+report.label+'?reportpath='+report.uri+"&inputParam="+inputParams, requestOptionArgs);
//}