import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
@Injectable({ providedIn: 'root' })
export class OidgenstService {
  constructor(private http: HttpService) { }
  rgRouteRecordGroup(obj){
	return this.http.get('oidgenst/rgRouteRecordGroup',obj);
  }
 
  schplannerExecuteQuery(obj) {
		return this.http.post('oidgenst/schPlannerExecuteQuery',obj);
	}
	/** This is description of the schPlannerCommit function*/
	schplannerCommit(obj) {
		return this.http.post('oidgenst/schPlannerCommit',obj);
	}
	/** This is description of the scheduledTripsExecuteQuery function*/
	scheduledtripsExecuteQuery(obj) {
		return this.http.post('oidgenst/scheduledTripsExecuteQuery',obj);
	}
	/** This is description of the scheduledTripsCommit function*/
	scheduledtripsCommit(obj) {
		return this.http.post('oidgenst/scheduledTripsCommit',obj);
	}
	/** This is description of the rgRouteRecordGroup function*/
	scheduledTripsvalidate(obj) {
		return this.http.post( 'oidgenst/scheduledTripsvalidate',obj);
	}

	scheduledGenerateCommit(obj) {
		return this.http.post('oidgenst/scheduledGenerateCommit',obj);
	}
	scheduledTripUpdate(obj) {
		return this.http.get( 'oidgenst/tripsUpdate',obj);
	}
	

}