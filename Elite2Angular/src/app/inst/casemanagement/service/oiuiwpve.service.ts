import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiuiwpveService {
    constructor(private http: HttpService) {}
    /** This is description of the iwpDocExecuteQuery function*/
    iwpDocExecuteQuery(obj) {
        return this.http.post('oiuiwpve/iwpDocExecuteQuery', obj);
    }
    /** This is description of the iwpDocCommit function*/
    iwpDocCommit(obj) {
        return this.http.post('oiuiwpve/iwpDocCommit', obj);
    }
    /** This is description of the rgStatusRecordGroup function*/
    rgStatusRecordGroup() {
        return this.http.get( 'oiuiwpve/rgStatusRecordGroup');
    }
    /** This is description of the rgTemplateRecordGroup function*/
    rgTemplateRecordGroup (offenderBookId, moduleName, pObjectType, pType, pSubType, pObjectId, blockName) {
        return this.http.get( '/oiuiwpve/rgTemplateRecordGroup?offenderBookId=' + offenderBookId + '&moduleName='
        + moduleName + '&pObjectType=' + pObjectType +  '&pType=' + pType +
          '&pSubType=' + pSubType + '&pObjectId=' + pObjectId +  '&blockName=' + blockName);
    }
}
