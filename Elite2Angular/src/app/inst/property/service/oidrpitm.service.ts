import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { Images } from '@commonbeans/Images';

@Injectable({providedIn: 'root'})
export class OidrpitmService {
    imagesDataTemp: Images = new Images();
    constructor(private http: HttpService) { }
    /** This is description of the offPiExecuteQuery function*/
    offPiExecuteQuery(obj) {
        return this.http.post('oidrpitm/offPiExecuteQuery', obj);
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
}
