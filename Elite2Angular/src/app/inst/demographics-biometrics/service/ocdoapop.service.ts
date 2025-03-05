import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdoapopService {
    constructor(private http: HttpService) { }
    /** This is description of the addressExecuteQuery function*/
    addressExecuteQuery(obj) {
        return this.http.post('ocdoapop/addressExecuteQuery', obj);
    }
    /** This is description of the addressCommit function*/
    addressCommit(obj) {
        return this.http.post('ocdoapop/addressCommit', obj);
    }
    /** This is description of the rgCityRecordGroup function*/
    rgCityRecordGroup(obj) {
        return this.http.get('ocdoapop/rgCityRecordGroup');
    }
    /** This is description of the rgCountyRecordGroup function*/
    rgCountyRecordGroup(obj) {
        return this.http.get('ocdoapop/rgCountyRecordGroup');
    }
    /** This is description of the rgCountryRecordGroup function*/
    rgCountryRecordGroup(obj) {
        return this.http.get('ocdoapop/rgCountryRecordGroup');
    }
    /** This is description of the rgTypeRecordGroup function*/
    rgTypeRecordGroup(obj) {
        return this.http.get('ocdoapop/rgTypeRecordGroup');
    }
    /** This is description of the rgSpecialNeedsRecordGroup function*/
    rgSpecialNeedsRecordGroup(obj) {
        return this.http.get('ocdoapop/rgSpecialNeedsRecordGroup');
    }
    /** This is description of the rgProvStateCodeRecordGroup function*/
    rgProvStateCodeRecordGroup(obj) {
        return this.http.get('ocdoapop/rgProvStateCodeRecordGroup');
    }
    /** This is description of the rgStreetDirRecordGroup function*/
    rgStreetDirRecordGroup(obj) {
        return this.http.get('ocdoapop/rgStreetDirRecordGroup');
    }
    /** This is description of the addressKeyDelrec function*/
    addressKeyDelrec(obj) {
        return this.http.post('ocdoapop/addressKeyDelrec', obj);
    }

    rgTownRecordGroup() {
        return this.http.get( 'ocdoapop/rgTownRecordGroup' );
    }

    rgStateRecordGroup() {
        return this.http.get( 'ocdoapop/rgStateRecordGroup' );
    }

    rgCountryRecordGroup1() {
        return this.http.get( 'ocdoapop/rgCountryRecordGroup1' );
    }
}
