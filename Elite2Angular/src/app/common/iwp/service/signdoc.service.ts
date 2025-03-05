import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserSessionManager } from '@core/classes/userSessionManager';


@Injectable({ providedIn: 'root' })
export class SigndocService {

    signDocRequiredInfo: any;
    fileName:any;
    constructor(private http: HttpService, private httpClient: HttpClient,
        public sessionManager: UserSessionManager,
    ) { }



}
