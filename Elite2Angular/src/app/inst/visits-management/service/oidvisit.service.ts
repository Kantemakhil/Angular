import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { Images } from '@common/beans/Images';

@Injectable({providedIn: 'root'})
export class OidvisitService {
    imagesDataTemp = new Images();
    constructor(private http: HttpService) { }
    /** This is description of the offVstExecuteQuery function*/
    offVstExecuteQuery(obj) {
        return this.http.post('oidvisit/offVstExecuteQuery', obj);
    }
    /** This is description of the offVstCommit function*/
    offVstCommit(obj) {
        return this.http.post('oidvisit/offVstCommit', obj);
    }
    /** This is description of the offVstPersExecuteQuery function*/
    offVstPersExecuteQuery(obj) {
        return this.http.post('oidvisit/offVstPersExecuteQuery', obj);
    }
    /** This is description of the offVstPersCommit function*/
    offVstPersCommit(obj) {
        return this.http.post('oidvisit/offVstPersCommit', obj);
    }
    /** This is description of the imagesVisitorsExecuteQuery function*/
    imagesVisitorsExecuteQuery(obj) {
        return this.http.post('oidvisit/imagesVisitorsExecuteQuery', obj);
    }
    /** This is description of the images1Commit function*/
    images1Commit(obj) {
        return this.http.post('oidvisit/images1Commit', obj);
    }
    /** This is description of the offVstOffExecuteQuery function*/
    offVstOffExecuteQuery(obj) {
        return this.http.post('oidvisit/offVstOffExecuteQuery', obj);
    }
    /** This is description of the offVstOffCommit function*/
    offVstOffCommit(obj) {
        return this.http.post('oidvisit/offVstOffCommit', obj);
    }
    /** This is description of the images2ExecuteQuery function*/
    imagesVisitingOffExecuteQuery(obj) {
        return this.http.post('oidvisit/imagesVisitingOffExecuteQuery', obj);
    }
    /** This is description of the images2Commit function*/
    images2Commit(obj) {
        return this.http.post('oidvisit/images2Commit', obj);
    }
    /** This is description of the rgVisitTypeRecordGroup function*/
    rgVisitTypeRecordGroup(visitSearchQueryParam) {
        return this.http.get('oidvisit/rgVisitTypeRecordGroup?offenderDetails=' + visitSearchQueryParam);
    }
    /** This is description of the rgMoveCancRsRecordGroup function*/
    rgMoveCancRsRecordGroup(obj) {
        return this.http.get('oidvisit/rgMoveCancRsRecordGroup');
    }
    /** This is description of the rgVisitTimeSlotsRecordGroup function*/
    rgVisitTimeSlotsRecordGroup(parentField) {
        return this.http.get('oidvisit/rgVisitTimeSlotsRecordGroup?parentField=' + parentField);
    }
    /** This is description of the rgVisCompleteRecordGroup function*/
    rgVisCompleteRecordGroup(obj) {
        return this.http.get('oidvisit/rgVisCompleteRecordGroup');
    }
    /** This is description of the visitTypeValidateQuery function*/
    visitTypeValidateQuery(obj) {
        return this.http.post('oidvisit/visitTypeValidateQuery', obj);
    }

    /** This is description of the endTimeValidateQuery function*/
    endTimeValidateQuery(obj) {
        return this.http.post('oidvisit/endTimeValidateQuery', obj);
    }
    /** This is description of the duplicateVisit function*/
    duplicateVisit(obj) {
        return this.http.post('oidvisit/duplicateVisit', obj);
    }

    /** This is description of the validateVisitor function*/
    validateVisitor(obj) {
        return this.http.post('oidvisit/validateVisitor', obj);
    }

    /** This is description of the visitPerPreInsert function*/
    visitPerPreInsert(obj) {
        return this.http.post('oidvisit/visitPerPreInsert', obj);
    }

    /** This is description of the checkVisitorLimit function*/
    checkVisitorLimit(obj) {
        return this.http.post('oidvisit/checkVisitorLimit', obj);
    }

    /** This is description of the recheckTimeSlots function*/
    recheckTimeSlots(obj) {
        return this.http.post('oidvisit/recheckTimeSlots', obj);
    }

    /** This is description of the visitOffPreInsert function*/
    visitOffPreInsert(obj) {
        return this.http.post('oidvisit/visitOffPreInsert', obj);
    }

    /** This is description of the getOffenderRestrictions function*/
    getOffenderRestrictions(obj) {
        return this.http.post('oidvisit/getOffenderRestrictions', obj);
    }

     /** This is description of the getOffenderDetails function*/
     getOffenderDetails(offenderIdDisplay) {
        return this.http.get('oidvisit/getOffenderDetails?offenderIdDisplay=' + offenderIdDisplay);
    }

     /** This is description of the isAuthorisedOffender function*/
     isAuthorisedOffender(hoffenderBookId, voffenderBookId) {
        return this.http.get('oidvisit/isAuthorisedOffender?hoffenderBookId=' + hoffenderBookId + '&voffenderBookId=' + voffenderBookId);
    }

    /** This is description of the isAuthorisedPerson function*/
    isAuthorisedPerson(personId, offenderBookId) {
        return this.http.get('oidvisit/isAuthorisedPerson?personId=' + personId + '&offenderBookId=' + offenderBookId);
    }

    /** This is description of the getVisitorRestrictions function*/
    getVisitorRestrictions(obj) {
        return this.http.post('oidvisit/getVisitorRestrictions', obj);
    }

    /** This is description of the overlapVisitForVisitors function*/
    overlapVisitForVisitors(obj) {
        return this.http.post('oidvisit/overlapVisitForVisitors', obj);
    }

     /** This is description of the checkContactActive function*/
     checkContactActive(offenderBookId, personId) {
        return this.http.get('oidvisit/checkContactActive?offenderBookId=' + offenderBookId + '&personId=' + personId);
    }

    /** This is description of the oidvisitCheckListEntry function*/
    oidvisitCheckListEntry() {
        return this.http.get('oidvisit/oidvisitCheckListEntry');
    }
    
    /** This is description of the chkVisitConflicts function*/
    chkVisitConflicts(obj) {
        return this.http.post('oidvisit/chkVisitConflicts', obj );
    }

    nonAssocationOffendersData(obj) {
        return this.http.post('oidvisit/checkNonAssociations', obj);
      }

      getMaxVisitors(obj) {
        return this.http.post('oidvisit/getMaxVisitors', obj);
    }

     /** This is description of the avlLocExecuteQuery function*/
     avlLocExecuteQuery(obj) {
        return this.http.post('oidvisit/avlLocExecuteQuery', obj);
    }
    /** This is description of the fboLocExecuteQuery function*/
    fboLocExecuteQuery(obj) {
        return this.http.post('oidvisit/fboLocExecuteQuery', obj);
    }
      /** This is description of the getOcuavlocAvailable function*/
      getOcuavlocAvailable(obj) {
        return this.http.post('oidvisit/getOcuavlocAvailable', obj);
    }
     /** This is description of the getOcuavlocUnAvailable function*/
     getOcuavlocUnAvailable(obj) {
        return this.http.post('oidvisit/getOcuavlocUnAvailable', obj);
    }
    /** This is description of the reCheckTimeSlot function*/
    reCheckTimeSlot(obj) {
        return this.http.post('oidvisit/reCheckTimeSlot', obj);
    }

     /** This is description of the getProfileValues function*/
	  getProfileValues(profileType, profileCode) {
		return this.http.get('oidvisit/getProfileValues?profileType=' + profileType + '&profileCode=' + profileCode);
   }

   vOffAuthVisExecuteQuery(obj) {
    return this.http.post('oidvisit/vOffAuthVisExecuteQuery', obj);
}
  getIepVisitLimis(agyLocId) {
    return this.http.get('oidvisit/getIepVisitLimis?agyLocId=' + agyLocId);
  }
}
