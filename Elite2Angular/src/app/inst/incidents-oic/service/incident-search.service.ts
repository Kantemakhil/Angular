import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

import { Subject, Observable } from 'rxjs';
import { AgencyIncidents } from '@instincidentsbeans/AgencyIncidents';
@Injectable({providedIn: 'root'})
export class IncidentSearchService {
    
    private offednerBookId:any;
    private agencyIncidentId:any;
    private staffId:any;
    checkFlag:boolean;
private innerrSearchParams: any;

private innerRecordsRetrieved: any[];

private searchParamSubject = new Subject<any>();

private incidentSubject = new Subject<any>();

private recordsSubject = new Subject<any>();

private innerSelectedIncident :any;

incidentBasedRowId: any;

getoffenderBookId(){
    return this.offednerBookId;
}

setoffenderBookId(data){
    this.offednerBookId=data;
}

getAgencyIncidentId(){
    return this.agencyIncidentId;
}

setAgencyIncidentId(data){
    this.agencyIncidentId=data;
}

getstaffId(){
    return this.staffId;
}
setStaffId(data :any){
this.staffId=data;
}


constructor(private http: HttpService) { }

get searchParams(): any {
    return this.innerrSearchParams;
}

get searchParamsObservable(): Observable<any> {
    return this.searchParamSubject.asObservable();
}

private setSearchParams(searchParams: any) {
    this.innerrSearchParams = searchParams;
    this.searchParamSubject.next(this.innerrSearchParams);
}


get recordsRetrieved(): any[] {
    return this.innerRecordsRetrieved;
}

set recordsRetrieved(data: any[]) {
    this.innerRecordsRetrieved = data;
    this.recordsSubject.next(this.innerRecordsRetrieved);
}

get recordsRetrievedObservable(): Observable<any[]> {
    return this.recordsSubject.asObservable();
}


agencyIncidentsExecuteQuery(obj:any){
    this.setSearchParams(obj);
    this.selectedIncident =[];
    this.http.post('oidincde/agencyIncidentsExecuteQuery', obj).subscribe(result => {
        this.checkFlag=false;
        this.recordsRetrieved = result;
   
    });
  
}

 agencyTempIncident(obj){
     return this.http.post('oidincde/agencyIncidentsExecuteQuery', obj);
 }



clear() {
    
    this.setSearchParams(undefined);
    this.incidentBasedRowId = null;
    this.recordsRetrieved = [];
    this.agencyIncidentId=null;
    this.selectedIncident=new AgencyIncidents();
        }  

get selectedIncidentObservable(): Observable<any> {
    return this.incidentSubject.asObservable();
}

get selectedIncident(): any {
   
    return this.innerSelectedIncident;
    }
set selectedIncident(incident: any) {
        this.innerSelectedIncident = incident;
        this.incidentSubject.next(this.innerSelectedIncident);
        if (incident && incident.agencyIncidentId ) {
            this.incidentBasedRowId = {'agencyIncidentId': incident.agencyIncidentId};
    
        }
   
}

}



































