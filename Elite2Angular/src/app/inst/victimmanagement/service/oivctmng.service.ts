import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable({ providedIn: 'root' })
export class OivctmngService {
  exitFlag: boolean;
  osipsearScreenObj: any;
    tempFlag: boolean;
    indexPos: number;
    linkedOffIndexPos: number;
    tempFlag2: boolean;
    

  constructor(private http: HttpService) { }

  victmRcrdCommit(obj) {
    return this.http.post('oivctmng/saveVictimRecords', obj);
  }
  victimRcrdExecuteQuery() {
		return this.http.get('oivctmng/getAllVictimRecords');
	}


  LinkedOffCommit(obj) {
    return this.http.post('oivctmng/saveVictimLinkedOffenders', obj);
  }
  linkedOffExecuteQuery(victimId) {
		return this.http.get('oivctmng/getAllVictimLinkedOffenders?victimId=' + victimId);
	}


  victContLogCommit(obj) {
    return this.http.post('oivctmng/saveVictimContactLogs', obj);
  }
  victContLogExecuteQuery(victimId) {
		return this.http.get('oivctmng/getAllVictimContactLogs?victimId=' + victimId);
	}


  victContPrefCommit(obj) {
    return this.http.post('oivctmng/saveVictimContactPreferences', obj);
  }
  victContPrefExecuteQuery(victimId) {
		return this.http.get('oivctmng/getAllvictimContactPreferences?victimId=' + victimId);
	}

  getVictimId() {
		return this.http.get('oivctmng/getVictimId');
	}

  offbkgGlobalQuery(obj) {
    return this.http.post('oivctmng/offbkgGlobalQuery', obj);
}

 rgOffenderSentencesRecordGroupBothCustAndNonCust(offenderBookId) {
   return this.http.get('oivctmng/rgOffenderSentencesRecordGroupBothCustAndNonCust?offenderBookId=' + offenderBookId);
}
}