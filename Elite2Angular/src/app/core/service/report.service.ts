import { UserSessionManager } from '@core/classes/userSessionManager';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from '@core/service/http.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ReportService {
    
    private inputControllsSubject = new Subject<any>();
    private currentReportSubject = new Subject<any>();
    private inputControlls = [];
    private currentReport : any;
    
    constructor(private http: HttpService, private httpcli: HttpClient, private sessionManager: UserSessionManager) {
        this.inputControllsSubject.subscribe(result => {
            this.inputControlls = result;
        });
        this.currentReportSubject.subscribe(result => {
            this.currentReport = result;
        });
    }
     
    getCurrentReport() : any  {
        return this.currentReport;
    }
    
    setCurrentReport(report:any) {
        this.currentReportSubject.next(report);
    }
    
    getSelctedReportInputControlls() : any  {
        return this.inputControlls;
    }
    
    getReportList(displayLoader = true) {
       return this.http.get('report/allReports',null, displayLoader);
    }
     
     setInputControlls(inputControlls:any) {
         this.inputControllsSubject.next(inputControlls);
     }
     
     getInputControllsForReport(reportPath): any {
         return this.http.get('report/inputControlls?reportpath='+reportPath);
     }
     
    openReport(report, inputParams) {
        let myHeaders =  new HttpHeaders({
            'Authorization': this.sessionManager.getTokenType()
            + ' ' + this.sessionManager.getAccessToken() ,
            'Accept' : '*/*'
          })
        myHeaders.append('Content-Type', 'application/pdf');
        var responseType: any = "blob";
        let requestOptionArgs = { "headers": myHeaders, "responseType": responseType };
        return this.httpcli.get('Elite2Web/api/report/runReport/' + report.label + '?reportpath=' + report.uri + "&inputParam=" + inputParams, requestOptionArgs);
    }

    openReportHTML(report, inputParams) {
        let myHeaders =  new HttpHeaders({
            'Authorization': this.sessionManager.getTokenType()
            + ' ' + this.sessionManager.getAccessToken() ,
            'Accept' : '*/*'
          })
        myHeaders.append('Content-Type', 'text/html');
        myHeaders.set('Accept', 'text/html');
        var responseType: any = 'text';
        let requestOptionArgs = { 'headers': myHeaders, 'responseType': responseType };
        return this.httpcli.get('Elite2Web/api/report/runReportHTML/' + report.label + '?reportpath=' + report.uri + "&inputParam=" + inputParams, requestOptionArgs);
    }
}
