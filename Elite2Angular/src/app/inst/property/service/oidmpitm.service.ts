import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { Images } from '@commonbeans/Images';

@Injectable({providedIn: 'root'})
export class OidmpitmService {
    imagesDataTemp: Images = new Images();
    check:boolean=true;
    constructor(private http: HttpService) { }
    /** This is description of the offPiExecuteQuery function*/
    offPiExecuteQuery(obj) {
        return this.http.post('oidmpitm/offPiExecuteQuery', obj);
    }
    /**Screen specific save to follow access rules */
    
    offPiOIDMPITMCommit(obj) {
        return this.http.post('oidmpitm/offPiCommit', obj);
    }
    offPiOIDMPITMContainerCommit(obj) {
        return this.http.post('oidmpitm/offContainerConCommit', obj);
    }
    
    /** This is description of the offPiCommit function*/
    offPiCommit(obj) {
        return this.http.post('oidrpitm/offPiCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oidrpitm/sysPflExecuteQuery', obj);
    }
    /** This is description of the rgColorRecordGroup function*/
    rgColorRecordGroup() {
        return this.http.get('oidrpitm/rgColorRecordGroup');
    }
    /** This is description of the rgCondnRecordGroup function*/
    rgCondnRecordGroup() {
        return this.http.get('oidrpitm/rgCondnRecordGroup');
    }
    /** This is description of the cgfkOffpireceivedfromRecordGroup function*/
    cgfkOffpireceivedfromRecordGroup() {
        return this.http.get('oidrpitm/cgfk$offPiReceivedFromRecordGroup');
    }
    /** This is description of the cgfkOffpipropertytypeRecordGroup function*/
    cgfkOffpipropertytypeRecordGroup() {
        return this.http.get('oidrpitm/cgfkOffPiPropertyTypeRecordGroup');
    }
    /** This is description of the offRecForm function*/
    offRecForm() {
        return this.http.get('oidrpitm/offRecForm');
    }
    /** To get the data of groups of property Items */
    fetchGroupData(caseloadId) {
        return this.http.get('oidmpitm/fetchGroupData?caseloadId='+caseloadId);
    }
    
    getDefaultValuesForSelecteGroup(groupId) {
        return this.http.get('oidmpitm/getDefaultValuesForSelecteGroup?groupId='+groupId);
    }
    
    setpropDescForPropertyAttr(obj) {
        return this.http.post('oidmpitm/setpropDescForPropertyAttr', obj);
    }
    
    offPiSearchOffenderPptyItemsForcontainer(list) {
        return this.http.post('oidmpitm/offPiSearchOffenderPptyItemsForcontainer', list);
    }
    
    getExistingContainer(offenderBookId){
        return this.http.get('oidmpitm/isRegisterProOrContainerExist?offenderBookId='+offenderBookId);
    }
    deactivateContainer(prop: any) {
        return this.http.post('oidmpitm/deactivateContainer', prop);
    }
}
