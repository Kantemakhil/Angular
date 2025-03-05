import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { HttpService } from '@core/service/http.service';



@Injectable({providedIn: 'root'})
export class DocumentService {
    generatedDocName: string;
    isSyncDocument: boolean;
    templateType: string;
    constructor(private http: HttpService,private httpClient: HttpClient,public sessionManager: UserSessionManager) { }

    templateId: any;
    templateDoc: any;
    templateName: any;
    generatedDocBlob: any;
    docId: any;
    docName: any;
    docType: any;
    docStatus: any;
    docObjectType: any;
    templateList: any;
    currentScreen:any;
    mode:any;
    languageId:any;
}