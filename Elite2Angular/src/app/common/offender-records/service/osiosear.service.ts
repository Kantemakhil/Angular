import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';
import { TagSearchGetOffenderRecords } from '@commonbeans/TagSearchGetOffenderRecords';
import { VHeaderBlock2 } from '@commonbeans/VHeaderBlock2';
import { Images } from '@commonbeans/Images';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class OsiosearService {
    courtcaseEnabled: boolean;
    addressEnabled : boolean;
    courtcaseExit: boolean;
    addressExit : boolean;
    navigationFlag : boolean = true;
    offenderCourtCasesModel: TagSearchGetOffenderRecords = new TagSearchGetOffenderRecords();
    selectOffender: VHeaderBlock2 = new VHeaderBlock2();
    data: TagSearchGetOffenderRecords = new TagSearchGetOffenderRecords();
    imagesDataTemp: Images = new Images();
    externalsystemId:any;
    constructor(private http: HttpService, private router : Router) {}
    /** This is description of the searchResultsExecuteQuery function*/
    searchResultsExecuteQuery(obj) {
        return this.http.post('osiosear/searchResultsExecuteQuery', obj);
    }
    /** This is description of the offIdExecuteQuery function*/
    offIdExecuteQuery(obj) {
        return this.http.post('osiosear/offIdExecuteQuery', obj);
    }
    /** This is description of the offProfDtlsExecuteQuery function*/
    offProfDtlsExecuteQuery(obj) {
        return this.http.post('osiosear/offProfDtlsExecuteQuery', obj);
    }
    /** This is description of the imageExecuteQuery function*/
    imageExecuteQuery(obj) {
        return this.http.post('osiosear/imageExecuteQuery', obj);
    }
    /** This is description of the psOffNameExecuteQuery function*/
    psOffNameExecuteQuery(obj) {
        return this.http.post('osiosear/psOffNameExecuteQuery', obj);
    }
    /** This is description of the rgSearchTypeRecordGroup function*/
    rgSearchTypeRecordGroup() {
       return this.http.get('osiosear/rgSearchTypeRecordGroup');
    }
    /** This is description of the rgIdentifierTypeRecordGroup function*/
    rgIdentifierTypeRecordGroup() {
       return this.http.get('osiosear/rgIdentifierTypeRecordGroup');

    }
    /** This is description of the rgGenderRecordGroup function*/
    rgGenderRecordGroup(obj) {
       return this.http.post('osiosear/rgGenderRecordGroup', obj);
    }
    /** This is description of the searchResultsWhenNewRecordInstancec_off_finger_prints function*/
    searchResultsWhenNewRecordInstancec_off_finger_prints(obj) {
       return this.http.post('osiosear/searchResultsWhenNewRecordInstancecOffFingerPrints', obj);
    }
     /** This is description of the populateOffDetailsBlocknameTypeCur function*/
     populateOffDetailsBlocknameTypeCur(obj) {
          return this.http.post('osiosear/populateOffDetailsBlocknameTypeCur', obj);
     }
     /** This is description of the populateOffDetailsBlockattrCur ( pValue in varchar2 ) function*/
     populateOffDetailsBlockattrCur(obj) {
          return this.http.post('osiosear/populateOffDetailsBlockattrCur?offenderBookId', obj);
     }
     /** This is description of the profTypeDescpc function*/
     profTypeDescpc(obj) {
          return this.http.post('osiosear/profTypeDescpc', obj);
     }
     /** This is description of the profCodeDescp function*/
     profCodeDescp(obj) {
          return this.http.post('osiosear/profCodeDescp', obj);
     }
     /** This is description of the getOffenderBookIdgetBookId function*/
     getOffenderBookIdgetBookId(obj) {
          return this.http.post('osiosear/getOffenderBookIdGetbookId', obj);
     }
     /** This is description of the callToShowFingerprintOld function*/
     callToShowFingerprintOld(obj) {
          return this.http.post('osiosear/callToShowFingerprintOld', obj);
     }
     
     offbkgGlobalQueryIntakeQueue(obj) {
         return this.http.post('osiosear/offbkgGlobalQueryIntakeQueue', obj);
    }

     offbkgGlobalQuery(obj) {
          obj.parentForm =  this.router.url;
          return this.http.post('osiosear/offbkgGlobalQuery', obj);
     }
     offbkgExecuteQuery(obj) {
        return this.http.post('osiosear/offbkgExecuteQuery', obj);
    }
     populateOffDetails(rootOffenderId, offenderId ) {
        return this.http.get('/osiosear/populateOffDetails?pRootOffenderId=' + rootOffenderId + '&offenderId=' + offenderId);
    }

     getAssignedOffendersList(currentCaseLoadType: string): any {
         return  this.http.get('omss40/getAssignedOffenderList?currentCaseLoadType=' + currentCaseLoadType);
    }

     getRecOffendersList(caseLoadId: string ): any {
         return this.http.get( 'omss40/getRecentOffenderList?caseLoadId=' + caseLoadId );
     }

     updateRecOffendersList(VHeaderBlock: any ) {
         return this.http.post( 'omss40/updateRecentOffenderList', VHeaderBlock );
     }
     captureImageProcedure() {
        return this.http.get( 'osiosear/getCaptureImage');
     }
	identifierTypeRecordGroup() {
		return this.http.get('/osipsear/rgIdentifierTypeRecordGroup');
	}
	
	getGenderLov(gender,userId,moduleName){
		return this.http.get('getReferenceDomainCodes?domain=' + gender + '&moduleName=' + moduleName);
	}
	
	offbkgGlobalQueryWithCaseloadSearch(obj) {
          return this.http.post('osiosear/offbkgGlobalQuery', obj);
     }

    alExecuteQuery(obj) {
        return this.http.post('omss40/alExecuteQuery', obj);
    }

    getCorrelationId() {
        return this.http.get( 'osiosear/getCorrelationId');
    }
    
    offenderImages(obj) {
        return this.http.post('osiosear/offenderImages', obj);
    }
    searchTypeCodeRtv(){
        return this.http.get('osiosear/getSearchTypeCode');
    }
}
