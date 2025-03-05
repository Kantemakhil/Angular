import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Fileupload } from '@commonbeans/Fileupload';
import { EoffenderDetails } from "@commonbeans/EoffenderDetails";


import { HttpService } from '@core/service/http.service';
import { DocumentService } from '@core/ui-components/document-editor/document.service';

@Injectable({providedIn: 'root'})
export class OumdtempService {
    constructor(private http: HttpService,private httpClient: HttpClient,public sessionManager: UserSessionManager,
        private documentService: DocumentService) { }
    /** This is description of the aIwpTemplatesExecuteQuery function*/
    aIwpTemplatesExecuteQuery(obj) {
        return this.http.post('oumdtemp/aIwpTemplatesExecuteQuery', obj);
    }
    /** This is description of the aIwpTemplatesCommit function*/
    aIwpTemplatesCommit(obj) {
        return this.http.post('oumdtemp/aIwpTemplatesCommit', obj);
    }
    /** This is description of the aIwpTagRelationsExecuteQuery function*/
    aIwpTagRelationsExecuteQuery(obj) {
        return this.http.post('oumdtemp/aIwpTagRelationsExecuteQuery', obj);
    }
    /** This is description of the aIwpTagRelationsCommit function*/
    aIwpTagRelationsCommit(obj) {
        return this.http.post('oumdtemp/aIwpTagRelationsCommit', obj);
    }
    /** This is description of the iwpParameterMappingsExecuteQuery function*/
    iwpParameterMappingsExecuteQuery(obj) {
        return this.http.post('oumdtemp/iwpParameterMappingsExecuteQuery', obj);
    }
    /** This is description of the iwpParameterMappingsCommit function*/
    iwpParameterMappingsCommit(obj) {
        return this.http.post('oumdtemp/iwpParameterMappingsCommit', obj);
    }
    /** This is description of the templRolesExecuteQuery function*/
    templRolesExecuteQuery(obj) {
        return this.http.post('oumdtemp/templRolesExecuteQuery', obj);
    }
    /** This is description of the templRolesCommit function*/
    templRolesCommit(obj) {
        return this.http.post('oumdtemp/templRolesCommit', obj);
    }
    /** This is description of the rgParamDataTypeRecordGroup function*/
    rgParamDataTypeRecordGroup(obj) {
        return this.http.get('oumdtemp/rgParamDataTypeRecordGroup');
    }
    /** This is description of the rgRolesRecordGroup function*/
    rgRolesRecordGroup() {
        return this.http.get('oumdtemp/rgRolesRecordGroup');
    }
    /** This is description of the rgBmListRecordGroup function*/
    rgBmListRecordGroup() {
        return this.http.get('oumdtemp/rgBmListRecordGroup');
    }
    /** This is description of the rgOmsModuleRecordGroup function*/
    rgOmsModuleRecordGroup() {
        return this.http.get('oumdtemp/rgOmsModuleRecordGroup');
    }
    /** This is description of the rgReportNameRecordGroup function*/
    rgReportNameRecordGroup() {
        return this.http.get('oumdtemp/rgReportNameRecordGroup');
    }
    /** This is description of the rgStaffRecordGroup function*/
    rgStaffRecordGroup() {
        return this.http.get('oumdtemp/rgStaffRecordGroup');
    }
    /** This is description of the rgObjectTypeRecordGroup function*/
    rgObjectTypeRecordGroup() {
        return this.http.get('oumdtemp/rgObjectTypeRecordGroup');
    }
    /** This is description of the templRolesCommit function*/
    whenActChangedEvent(obj) {
        return this.http.post('oumdtemp/whenActChangedEvent', obj);
    }

    viewTemplate(documentUri){                  // HyperLink
        //return this.http.post('eoffender/document/action',obj);

        let myHeaders = new HttpHeaders();
        //myHeaders.append('Content-Type', 'application/pdf');
        myHeaders.append( 'Accept', '*/*' );
        let requestOptionArgs = { 'headers': myHeaders, 'responseType': 'blob' };

        return this.http.getBlob('iwp/document/viewTemplatefile/?uri='+documentUri, myHeaders);
    }

     pushTemplateFileToStorage(files: File[], fileupRowData: Fileupload[], eoffenderDetails: EoffenderDetails, vHeaderBlockModel : any, objectType,docConvertion : string): Observable<Object> {
        const httpOptions = {
                headers: new HttpHeaders({
                  'Authorization': this.sessionManager.getTokenType()
                  + ' ' + this.sessionManager.getAccessToken() ,
                  'Accept' : '*/*'
                })
        };
        httpOptions.headers.append('Content-Type' , '');
        this.documentService.isSyncDocument = true;
       if(vHeaderBlockModel && vHeaderBlockModel.offenderBookId) {
          var offenderBookId = vHeaderBlockModel.offenderBookId;
       }
       var offenderId = "";
       if(files.length){
           var fileCount = files.length.toString();
       }
       var offenderName="";
       var dateOfBirth = "";//this.transformDate(this.sessionManager.userSessionDetails().selectedOffender.birthDate);
       
       var objectId = "";
       var objectType = objectType;
           
       const formData: FormData = new FormData();
        formData.append("offenderBookId", '1234');
       if(files.length !== fileupRowData.length){
           return;
       }
       for (let i = 0; i < files.length; i++) {
        let withPrefixFileName="";
          // let fileName=this.addDocumentExtension(fileupRowData[i].fileName, fileupRowData[i].documentName)
           
           formData.append('file', files[i]);
           formData.append('templateId', fileupRowData[i].templateId);
           formData.append('templateName',fileupRowData[i].templateName);
           formData.append('fileName', fileupRowData[i].fileName);
           
//           
       }  
          if(docConvertion === 'N'){
            formData.append('docEditor', 'Y');
          }else{
            formData.append('docEditor', 'N');
          }
          
           formData.append('objectId', "12345");
           formData.append('objectType', "1234");    
       
       
       //formData.append('file[]', files);
     /*  var getUrl = window.location;
       var baseUrl = getUrl.origin;*/
       formData.append('docConvertion', docConvertion);   
       return this.httpClient.post(this.getBaseUrl()+'/Elite2Web/api/iwp/templateUpload', formData,httpOptions);
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

    getBaseUrl(){
        var baseUrl = window.location.origin;
        if (!window.location.origin) {
            baseUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }
        return baseUrl;
    }
    getIwpDocCount(templateId) {
		return this.http.get('oumdtemp/getIwpDocCount?templateId=' + templateId);
	}
}
