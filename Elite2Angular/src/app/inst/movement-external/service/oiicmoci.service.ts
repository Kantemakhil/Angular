import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { VCourtEvents } from '@inst/legal-screens/beans/VCourtEvents';
import { VNameSearch } from '@common/beans/VNameSearch';

@Injectable({providedIn: 'root'})
export class OiicmociService {
	crteventsModel: VCourtEvents = new VCourtEvents();
	offschData: VCourtEvents[] = [];
	nameLovData: VNameSearch = new VNameSearch();
	constructor(private http: HttpService) {}
	/** This is description of the offSchExecuteQuery function*/
	offSchExecuteQuery(obj) {
		return this.http.post('oiicmoci/offSchExecuteQuery', obj);
	}
	/** This is description of the rgAgyLocIdRecordGroup function*/
	rgAgyLocIdRecordGroup(obj) {
		return this.http.get( 'oiicmoci/rgAgyLocIdRecordGroup');
	}
	/** This is description of the rgLu1RecordGroup function*/
	rgLu1RecordGroup(obj) {
		return this.http.get( 'oiicmoci/rgLu1RecordGroup');
	}
	/** This is description of the rgLu2RecordGroup function*/
	rgLu2RecordGroup(obj) {
		return this.http.get( 'oiicmoci/rgLu2RecordGroup');
	}
	/** This is description of the rgLu3RecordGroup function*/
	rgLu3RecordGroup(obj) {
		return this.http.get( 'oiicmoci/rgLu3RecordGroup');
	}
}
