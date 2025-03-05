import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimvlimtService {
    constructor(private http: HttpService) { }
    /** This is description of the visCycExecuteQuery function*/
    visCycExecuteQuery(obj) {
        return this.http.post('oimvlimt/visCycExecuteQuery', obj);
    }
    /** This is description of the visCycCommit function*/
    visCycCommit(obj) {
        return this.http.post('oimvlimt/visCycCommit', obj);
    }
    /** This is description of the visTypExecuteQuery function*/
    visTypExecuteQuery(obj) {
        return this.http.post('oimvlimt/visTypExecuteQuery', obj);
    }
    /** This is description of the visTypCommit function*/
    visTypCommit(obj) {
        return this.http.post('oimvlimt/visTypCommit', obj);
    }
    /** This is description of the rgSecLvlRecordGroup function*/
    rgSecLvlRecordGroup(obj) {
        return this.http.get('oimvlimt/rgSecLvlRecordGroup');
    }
    /** This is description of the rgCycTypRecordGroup function*/
    rgCycTypRecordGroup(obj) {
        return this.http.get('oimvlimt/rgCycTypRecordGroup');
    }
    /** This is description of the rgVisTypRecordGroup function*/
    rgVisTypRecordGroup(obj) {
        return this.http.get('oimvlimt/rgVisTypRecordGroup');
    }
    /** This is description of the rgStrDayRecordGroup function*/
    rgStrDayRecordGroup(obj) {
        return this.http.get('oimvlimt/rgStrDayRecordGroup');
    }
    /** This is description of the rgAgyIntLocRecordGroup function*/
    rgAgyIntLocRecordGroup(obj) {
        return this.http.get('oimvlimt/rgAgyIntLocRecordGroup');
    }

    iepLevelExecuteQuery(obj) {
        return this.http.post('oimvlimt/iepLevelExecuteQuery', obj);
    }

    getiepDetails(offenderBookId){
        return this.http.get('oimvlimt/getiepDetails?offenderBookId='+offenderBookId);
    }
    saveIepSecData(facility,iepSecLevel,operaion){
        return this.http.get(`oimvlimt/saveIepSecData?facility=${facility}&iepSecLevel=${iepSecLevel}&operaion=${operaion}`);
    }

    getIepVisitLimis(agyLocId){
        return this.http.get('oimvlimit/getIepVisitLimis?agyLocId='+agyLocId); 
    }

    getIepSecLov(){
        return this.http.get('oimvlimit/getIepSecLov');  
    }


}
