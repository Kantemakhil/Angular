import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { Images } from '@common/beans/Images';

@Injectable({providedIn: 'root'})
export class OidviresService {
    imagesDataTemp = new Images();
    constructor(private http: HttpService) {}
    /** This is description of the offVisitRestExecuteQuery function*/
    offVisitRestExecuteQuery(obj) {
        return this.http.post('oidvires/offVisitRestExecuteQuery', obj);
    }
    /** This is description of the offVisitRestCommit function*/
    offVisitRestCommit(obj) {
        return this.http.post('oidvires/offVisitRestCommit', obj);
    }
    /** This is description of the offAuthVisitorsExecuteQuery function*/
    offAuthVisitorsExecuteQuery(obj) {
        return this.http.post('oidvires/offAuthVisitorsExecuteQuery', obj);
    }
    /** This is description of the offVisitingExecuteQuery function*/
    offVisitingExecuteQuery(obj) {
        return this.http.post('oidvires/offVisitingExecuteQuery', obj);
    }
    /** This is description of the offAuthVisitorsCommit function*/
    offAuthVisitorsCommit(obj) {
        return this.http.post('oidvires/offAuthVisitorsCommit', obj);
    }
    /** This is description of the imageVisitExecuteQuery function*/
    imageVisitExecuteQuery(obj) {
        return this.http.post('oidvires/imageVisitExecuteQuery', obj);
    }
    /** This is description of the imageVisitCommit function*/
    imageVisitCommit(obj) {
        return this.http.post('oidvires/imageVisitCommit', obj);
    }
    /** This is description of the offAuthVisitOffExecuteQuery function*/
    offAuthVisitOffExecuteQuery(obj) {
        return this.http.post('oidvires/offAuthVisitOffExecuteQuery', obj);
    }
    /** This is description of the offAuthVisitOffCommit function*/
    offAuthVisitOffCommit(obj) {
        return this.http.post('oidvires/offAuthVisitOffCommit', obj);
    }
    /** This is description of the imagesOffExecuteQuery function*/
    imagesOffExecuteQuery(imageObjectId: number, type: string) {
        return this.http.get('oidvires/imagesOffExecuteQuery?imageObjectId=' + imageObjectId + '&type=' + type);
    }
    /** This is description of the imagesOffCommit function*/
    imagesOffCommit(obj) {
        return this.http.post('oidvires/imagesOffCommit', obj);
    }
    /** This is description of the rgAuthPriRelationshipTypeRecordGroup function*/
    rgAuthPriRelationshipTypeRecordGroup(obj) {
        return this.http.get( 'oidvires/rgAuthPriRelationshipTypeRecordGroup');
    }
    /** This is description of the rgAuthVisRelationshipTypeRecordGroup function*/
    rgAuthVisRelationshipTypeRecordGroup(obj) {
        return this.http.get( 'oidvires/rgAuthVisRelationshipTypeRecordGroup');
    }
    /** This is description of the rgAuthVisContactTypeRecordGroup function*/
    rgAuthVisContactTypeRecordGroup(obj) {
        return this.http.get( 'oidvires/rgAuthVisContactTypeRecordGroup');
    }
    /** This is description of the rgStaffIdRecordGroup function*/
    rgStaffIdRecordGroup(obj) {
        return this.http.get( 'oidvires/rgStaffIdRecordGroup');
    }
    /** This is description of the rgOffRestrictionTypeRecordGroup function*/
    rgOffRestrictionTypeRecordGroup(obj) {
        return this.http.get( 'oidvires/rgOffRestrictionTypeRecordGroup');
    }

    oidviresFindTagVisitsGetStaffId() {
        return this.http.get( 'oidvires/oidviresFindTagVisitsGetStaffId');
    }

    oidviresIsOffenderBanRestriction(obj) {
        return this.http.get( 'oidvires/oidviresIsOffenderBanRestriction?offenderBookId=' + obj);
    }

    oidviresIsPersonBanRestriction(obj) {
        return this.http.get( 'oidvires/oidviresIsPersonBanRestriction?personId=' + obj);
    }

    chkNaBetweenOffenders(glbOffBkgId,visOffBkgId) {
        return this.http.get( 'oidvires/chkNaBetweenOffenders?glbOffBkgId=' + glbOffBkgId +
        '&visOffBkgId=' + visOffBkgId);
    }
}
