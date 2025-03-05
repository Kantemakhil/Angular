import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OimstripService {
	constructor(private http: HttpService) { }
	/** This is description of the tripsExecuteQuery function*/
	tripsExecuteQuery(obj) {
		return this.http.post('oimstrip/tripsExecuteQuery', obj);
	}
	/** This is description of the tripsCommit function*/
	tripsCommit(obj) {
		return this.http.post('oimstrip/tripsCommit', obj);
	}
	/** This is description of the scheduledTripsExecuteQuery function*/
	scheduledtripsExecuteQuery(obj) {
		return this.http.post('oimstrip/scheduledTripsExecuteQuery', obj);
	}
	/** This is description of the scheduledTripsCommit function*/
	scheduledtripsCommit(obj) {
		return this.http.post('oimstrip/scheduledTripsCommit', obj);
	}
	/** This is description of the scheduledTripAssignmentsExecuteQuery function*/
	scheduledTripAssignmentsExecuteQuery(obj) {
		return this.http.post('oimstrip/scheduledTripAssignmentsExecuteQuery', obj);
	}
	/** This is description of the scheduledTripAssignmentsCommit function*/
	scheduledTripAssignmentsCommit(obj) {
		return this.http.post('oimstrip/scheduledTripAssignmentsCommit', obj);
	}
	/** This is description of the staffAssignmentExecuteQuery function*/
	staffassignmentExecuteQuery(obj) {
		return this.http.post('oimstrip/staffAssignmentExecuteQuery', obj);
	}
	/** This is description of the staffAssignmentCommit function*/
	staffassignmentCommit(obj) {
		return this.http.post('oimstrip/staffAssignmentCommit', obj);
	}
	/** This is description of the rgTripTypeRecordGroup function*/
	rgTripTypeRecordGroup(obj) {
		return this.http.get('oimstrip/rgtriptypeRecordGroup', obj);
	}
	/** This is description of the rgStaffIdRecordGroup function*/
	rgStaffIdRecordGroup(obj) {
		return this.http.get('oimstrip/rgstaffidRecordGroup', obj);
	}
	//	fetching trip grid row data
	getTripData() {
		return this.http.get('oimstrip/getTripData');
	}

	tagtransportCTrip(obj) {
		return this.http.post('oimstrip/tagtransportCTrip', obj);
	}

	scheduleGenerateOidgenst(obj) {
		return this.http.post('oimstrip/scheduleGenerateOidgenst', obj);
	}

	tripsOidgenstInsert(obj) {
		return this.http.post('oimstrip/tripsOidgenstInsert', obj);
	}

}
