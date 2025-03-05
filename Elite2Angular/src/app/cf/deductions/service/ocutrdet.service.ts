import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcutrdetService {
    constructor(private http: HttpService) { }
    feeActExecuteQuery(obj) {
        return this.http.post('ocutrdet/feeActExecuteQuery', obj);
    }
    feeOverdDetExecuteQuery(obj) {
        return this.http.post('ocutrdet/feeOverdDetExecuteQuery', obj);
    }

    feeOverCheckoverLapping(obj) {
        return this.http.post('ocutrdet/feeOverCheckoverLapping', obj);
    }
    feeOverdDetCommit(obj) {
        return this.http.post('ocutrdet/feeOverdDetCommit', obj);
    }

    sysPflExecuteQuery() {
        return this.http.get('ocutrdet/sysPflExecuteQuery');
    }

    getAddedByName() {
        return this.http.get('ocutrdet/getAddedByName');
    }
    billDetailsExecuteQuery(obj) {
        return this.http.post('ocutrdet/billDetailsExecuteQuery', obj);
    }
    
    billTransDetailsExecuteQuery(obj) {
        return this.http.post('ocutrdet/billTransDetailsExecuteQuery', obj);
    }
    billTransTotalExecuteQuery(obj) {
        return this.http.post('ocutrdet/billTransTotalExecuteQuery', obj);
    }
    

    offFeeBillsCommit(obj) {
        return this.http.post('ocutrdet/updateBillTransactionDeails', obj);
    }

    sysPflBillAdjusExecuteQuery() {
        return this.http.get('ocutrdet/sysPflBillAdjusExecuteQuery');
    }
    sysPflBillStatusExecuteQuery() {
        return this.http.get('ocutrdet/sysPflBillStatusExecuteQuery');
    }
    
}
