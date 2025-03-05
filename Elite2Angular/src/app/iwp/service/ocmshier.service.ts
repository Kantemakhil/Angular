import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmshierService {
	constructor(private http: HttpService) {}
   
	/** This is description of the cgfkCalagylocidRecordGroup function*/
	cgfkCalagylocidRecordGroup(obj) {
		return this.http.get('ocmshier/calAgyLocIdRecordGroup',obj);
	}
	/** This is description of the stafflrdsplastnameRecordGroup function*/
	stafflrdsplastnameRecordGroup(obj) {
		return this.http.get( 'ocmshier/staffLrDspLastNameRecordGroup',obj);
	}

	/** This is description of the cgfkStafflrpositionRecordGroup function*/
	cgfkStafflrpositionRecordGroup(obj) {
		return this.http.get( 'ocmshier/staffLrPositionRecordGroup',obj);
	}
	/** This is description of the cgfkStafflrroleRecordGroup function*/
	cgfkStafflrroleRecordGroup(obj) {
		return this.http.get( 'ocmshier/staffLrRoleRecordGroup',obj);
	}
	/** This is description of the cgfkStafflrscheduletypeRecordGroup function*/
	cgfkStafflrscheduletypeRecordGroup(obj) {
		return this.http.get( 'ocmshier/staffLrScheduleTypeRecordGroup',obj);
	}
	/** This is description of the cgfkStafflr1dsplastnameRecordGroup function*/
	cgfkStafflr1dsplastnameRecordGroup(obj) {
		return this.http.get( 'ocmshier/staffLr1DspLastNameRecordGroup',obj);
	}

	/** This is description of the staffLrExecuteQuery function*/
	staffLrExecuteQuery(obj) {
		return this.http.post('ocmshier/staffLrExecuteQuery', obj);
	}

	/** This is description of the staffLr1ExecuteQuery function*/
	staffLr1ExecuteQuery(obj) {
		return this.http.post('ocmshier/staffLr1ExecuteQuery',obj);
	}
  /** This is description of the calCommit function*/
	removeData(obj){
		return this.http.post('ocmshier/removeStaffMember',obj);
	}
	
	/** This is description of the calExecuteQuery function*/
	calExecuteQuery(obj) {
		return this.http.post('/ocmshier/calExecuteQuery',obj);
	}
	

	/** This is description of the cgfkStafflr1positionRecordGroup function*/
	cgfkStafflr1positionRecordGroup(obj) {
		return this.http.get( 'ocmshier/cgfk$staffLr1PositionRecordGroup');
	}
	/** This is description of the cgfkStafflr1scheduletypeRecordGroup function*/
	cgfkStafflr1scheduletypeRecordGroup(obj) {
		return this.http.get( 'ocmshier/cgfk$staffLr1ScheduleTypeRecordGroup');
	}
	/** This is description of the cgfkStafflr1roleRecordGroup function*/
	cgfkStafflr1roleRecordGroup(obj) {
		return this.http.get( 'ocmshier/cgfk$staffLr1RoleRecordGroup');
	}
	
	
	
	
	
}
