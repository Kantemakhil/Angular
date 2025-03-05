import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuvwarnService {
     constructor(private http: HttpService) {}
     /** This is description of the offenderRestrictionExecuteQuery function*/
     offenderRestrictionExecuteQuery(obj) {
          return this.http.post('ocuvwarn/offenderRestrictionExecuteQuery', obj);
     }
     /** This is description of the offenderRestrictionCommit function*/
     offenderRestrictionCommit(obj) {
          return this.http.post('ocuvwarn/offenderRestrictionCommit',obj);
     }
     /** This is description of the visitorRestrictionsExecuteQuery function*/
     visitorRestrictionsExecuteQuery(obj) {
          return this.http.post('ocuvwarn/visitorRestrictionsExecuteQuery',obj);
     }
     /** This is description of the visitorRestrictionsCommit function*/
     visitorRestrictionsCommit(obj) {
          return this.http.post('ocuvwarn/visitorRestrictionsCommit',obj);
	 }
	 populateVisitorDetails(obj) {
		return this.http.post('ocuvwarn/populateVisitorDetails', obj);
	 }
	 /** This is description of the getPersonNames function*/
     getPersonNames(obj) {
		return this.http.post('ocuvwarn/getPersonNames', obj);
   }
	  /** This is description of the getProfileValues function*/
	  getProfileValues(profileType, profileCode) {
		return this.http.get('ocuvwarn/getProfileValues?profileType=' + profileType + '&profileCode=' + profileCode);
   }

    /** This is description of the getOffenderNames function*/
   getOffenderNames(offenderId) {
		return this.http.get('ocuvwarn/getOffenderNames?offenderId=' + offenderId);
   }
}
