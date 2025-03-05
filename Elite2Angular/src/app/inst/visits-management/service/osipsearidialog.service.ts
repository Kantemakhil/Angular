import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OsipsearidialogService {
	constructor(private http: HttpService) {}

	/** This is description of the rgIdentifierTypeRecordGroup function*/
	personAddNamesExecutequery(obj) {
		return this.http.get( 'osipsear/getAdditionalNames?personId='+obj);
	}

	personAddNamesCommit(obj){
		return this.http.post( 'osipsear/personAddNamesCommit',obj);
	}
}
