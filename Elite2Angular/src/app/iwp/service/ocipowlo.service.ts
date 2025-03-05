
import { HttpService } from '@core/service/http.service';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class OcipowloService {
	constructor(private http: HttpService) { }

	/** This is description of the cgfkStafflr1dspdescriptionRecordGroup function*/
	cgfkStafflr1dspdescriptionRecordGroup(obj) {
		return this.http.get('ocipowlo/cgfkstaffLr1DspDescriptionRecordGroup');
	}
	/** This is description of the vOffDetExecuteQuery function*/
	vOffDetExecuteQuery(obj) {
		return this.http.post('ocipowlo/vOffDetExecuteQuery', obj);
	}
	/** This is description of the vAssOffExecuteQuery function*/
	vAssOffExecuteQuery(obj) {
		return this.http.post('ocipowlo/vAssOffExecuteQuery', obj);
	}

	/** This is description of the positionLovRecordGroup function*/
	positionLovRecordGroup(obj) {
		return this.http.get('ocipowlo/positionLovRecordGroup');
	}

	/** This is description of the roleLovRecordGroup function*/
	roleLovRecordGroup(obj) {
		return this.http.get('ocipowlo/roleLovRecordGroup');
	}
	/** This is description of the scheduleTypeLovRecordGroup function*/
	scheduleTypeLovRecordGroup(obj) {
		return this.http.get('ocipowlo/scheduleTypeLovRecordGroup');
	}
}
