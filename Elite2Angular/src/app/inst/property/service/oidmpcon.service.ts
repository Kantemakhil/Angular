import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidmpconService {
constructor(private http: HttpService) {}
/** This is description of the offConExecuteQuery function*/
offConExecuteQuery(obj) {
return this.http.post('oidmpcon/offConExecuteQuery', obj);
}
/** This is description of the offConCommit function*/
offConCommit(obj) {
return this.http.post('oidmpcon/offConCommit', obj);
}
offConUpdateSeal(obj) {
    return this.http.post('/oidmpcon/offConUpdateSeal', obj);
    }
/** This is description of the rgContainerCodeRecordGroup function*/
rgContainerCodeRecordGroup(obj) {
return this.http.get( 'oidmpcon/rgContainerCodeRecordGroup', obj);
}
/** This is description of the rgLocationAllRecordGroup function*/
rgLocationAllRecordGroup(caseloadId) {
return this.http.get( 'oidmpcon/rgLocationAllRecordGroup?caseloadId=' + caseloadId);

}

getLocationValuesOfLov(parentField) {
    return this.http.get( 'oidmpcon/rgLocationAllRecordGroup?parentField=' + parentField);
}
/** This is description of the rgStoreLocationRecordGroup function*/
rgStoreLocationRecordGroup(obj) {
return this.http.get( 'oidmpcon/rgStoreLocationRecordGroup', obj);
}
/** This is description of the rgDescription2RecordGroup function*/
rgDescription2RecordGroup(obj) {
return this.http.get( 'oidmpcon/rgDescription2RecordGroup', obj);
}
/** This is description of the findRgContainerCode function*/
findRgContainerCode() {
return this.http.get( 'oidmpcon/findRgContainerCode');
}
    checkStorageCapacityLocation(internalLocId) {
        return this.http.get('oidmpcon/checkStorageLocation?internalLocId=' + internalLocId);
    }
    checkPptyItems(propertyConId) {
        return this.http.get('oidmpcon/checkPptyItems?propertyConId=' + propertyConId);
    }
    checkPrimaryKeyOfInternalLocId(obj) {
        return this.http.post('oidmpcon/cgfkchkOffConOffConPpty', obj);
    }
    checkContainerEmptyValue(propertyConId) {
        return this.http.get('oidmpcon/checkContainerEmptyValue?propertyConId=' + propertyConId);
    }
    getSealMarkValueOfpropertyConId(propertyConId) {
        return this.http.get('oidmpcon/getSealMarkValueOfpropertyConId?propertyConId=' + propertyConId);
    }
    getLocationValue(agyLocId) {
        return this.http.get('oidmpcon/getLocationValue?agyLocId=' + agyLocId);
    }
    insertContainerImg(obj) {
        return this.http.post('oidmpitm/insertContainerImg',obj);
    }

    updateConatinerIntLocation(obj) {
        return this.http.post('oidmpitm/updateConatinerIntLocation', obj);
    }

    getAllLocations(caseloadId){
        return this.http.get(`oidmpcon/getAllLocations?caseloadId=${caseloadId}`);
    }
}
