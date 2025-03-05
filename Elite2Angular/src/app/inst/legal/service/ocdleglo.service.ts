import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpService } from '@core/service/http.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Injectable({
  providedIn: 'root'
})
export class OcdlegloService {
    backBtnEnable: boolean;
	backBtnFlag: boolean;
	ocdclistBackBtnFlag: boolean;
  constructor(private http: HttpService) { }

    loadJsonData() {
        const xData = [
            {
                "no": "1",
                "orderedDate": "06/08/2020",
                "matter": "test1",
                "court": "LMAG",
                "type": "Imprisionment",
                "commenceType": "Date to commence",
                "relatedTo": "",
                "relatedToLaunch": "...",
                "commenceDate": "09/07/2020",
                "termTypeAndLength": "ImprisionMent NON-Parole 5y 8.5m",
                "lengthBtn": "...", 
                "pel": true,
                "status": "A",
                "terms": [{
                    "termType": "IMP",
                    "years": "5",
                    "months": "8.5",
                    "weeks": "",
                    "days": "",
                    "indefinite": false,
                },
                {
                    "termType": "PRO",
                    "years": "3",
                    "months": "",
                    "weeks": "",
                    "days": "",
                    "indefinite": true,
                }],
                "relatedOrder": null
            },
            {
                "no": "2",
                "orderedDate": "02/01/2022",
                "matter": "test2",
                "court": "HSUP",
                "type": "Imprisionment",
                "commenceType": "Commulative",
                "relatedTo": "1",
                "relatedToLaunch": "...",
                "commenceDate": "",
                "termTypeAndLength": "ImprisionMent 18m",
                "lengthBtn": "...",
                "pel": false,
                "status": "I",
                "terms" : [{
                    "termType": "PRO",
                    "years": "3",
                    "months": "",
                    "weeks": "",
                    "days": "",
                    "indefinite": true, 
                }],
                "relatedOrder": null
            },
            {
                "no": "3",
                "orderedDate": "07/07/2021",
                "matter": "test3",
                "court": "LMAG",
                "type": "Imprisionment",
                "commenceType": "Date to commence",
                "relatedTo": "2",
                "relatedToLaunch": "...",
                "commenceDate": "03/09/2020",
                "termTypeAndLength": "ImprisionMent NON-Parole 5y 8.5m",
                "lengthBtn": "...", 
                "pel": true,
                "status": "A",
                "terms": [{
                    "termType": "IMP",
                    "years": "5",
                    "months": "8.5",
                    "weeks": "",
                    "days": "",
                    "indefinite": false,
                },
                {
                    "termType": "PRO",
                    "years": "3",
                    "months": "",
                    "weeks": "",
                    "days": "",
                    "indefinite": true,
                }],
                "relatedOrder": null
            },
        ];
        return of(xData);
    }

loadDatatypes() {
    return this.http.get('ocmpconf/getDatatypes');
}

saveData(data){
    return this.http.post('ocmpconf/submitFormData',data);
}

loadData(data){
    return this.http.post('ocmpconf/getFormData',data);
}

loadSentTerm(userId, moduleName){
    return this.http.get('/getReferenceDomainCodes?domain=SENT_TERM&moduleName='+moduleName);
}
getOutcomes(){
    return this.http.get('ocmpconf/populateOutcome');
}


loadDatatypesForTermToLine() {
    const datatypes = [
        { "field": "termType", "dataType": "lov", "source": "domain", "url": "SENT_TERM" },
        { "field": "years", "dataType": "text" },
        { "field": "months", "dataType": "text" },
        { "field": "weeks", "dataType": "text" },
        { "field": "days", "dataType": "text" },
        { "field": 'indefinite', "dataType": 'checkbox' },
    ];
    return of(datatypes);
}

    deepEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (const key of keys1) {
            const val1 = object1[key];
            const val2 = object2[key];
            const areObjects = this.isObject(val1) && this.isObject(val2);
            if (
                areObjects && !this.deepEqual(val1, val2) ||
                !areObjects && val1 !== val2
            ) {
                return false;
            }
        }
        return true;
    }

    isObject(object) {
        return object != null && typeof object === 'object';
    }

    isGridDataModified(initialData,CurrentData) {
        if (CurrentData.length !== initialData.length) {
          return true;
        }
        for (let i = 0; i < initialData.length; i++) {
          if (!this.deepEqual(initialData[i], CurrentData[i])) {
            return true;
          }
        }
        return false;
    }

    getDisplayedKey(oldKey) {
        let newKey = "";
        for (let i = 0; i < oldKey.length; i++) {
            let character = oldKey[i];
            if (character == character.toUpperCase()) {
                newKey = newKey + ' ' + character.toLowerCase();
            }
            else if(i == 0){
                newKey = newKey + character.toUpperCase();
            }
            else {
                newKey = newKey + character;
            }
        }
        return newKey;
    }
    getFieldName(key, arr){
        var result = null;
        for (var i = 0; i < arr.length; i++) { 
            if (arr[i].field === key) { 
                result = arr[i].fieldName;
                break;
            } 
        }
        return result;
    }

    readOrderAction(event, operation,ordersMapping) {
        if (operation == 'I') {
            ordersMapping.push({
                'displayNo': event.displayNo,
                'operation': 'I'
            });
        }
        if (operation == 'U') {
            let updList = ordersMapping.filter(i => i.displayNo == event.data.displayNo);
            if (!(updList.filter(i => i.operation == 'I' || i.operation == 'U').length > 0)) {
                ordersMapping.push({
                    'displayNo': event.data.displayNo,
                    'operation': 'U'
                });
            }
        }
        if (operation == 'D') {
            let newOrders = ordersMapping.filter(i => i.displayNo == event.displayNo && i.operation == 'I');
            let existingOrders = ordersMapping.filter(i => i.displayNo == event.displayNo && i.operation != 'I');
            if (newOrders.length > 0) {
                newOrders.forEach(e => {
                    let remInd = ordersMapping.indexOf(e);
                    ordersMapping.splice(remInd,1);
                });
            } else if (existingOrders.length > 0) {
                ordersMapping.forEach(e => {
                    if (e.displayNo == event.displayNo) {
                        e.operation = 'D'
                    }
                })
            } else {
                ordersMapping.push({
                    'displayNo': event.data.displayNo,
                    'operation': 'D'
                });
            }
        }
        return ordersMapping;
    }

    loadSentTermNcust(){
        return this.http.get('ocmpconf/populateSentType?sentCategory=NCUS');
    }
    populateSentType(obj){
        return this.http.get('ocmpconf/populateSentType?sentCategory='+obj);
    }

    populateCatSentType(obj){
        return this.http.get('ocmpconf/populateCatSentType?sentCategory='+obj);
    }
    setLatestOutcome(form_identifiers: any) {
        return this.http.post('ocmpconf/setLatestOutcome', form_identifiers);
    }
    // Apply during Save
    transformObjToArr(histObj) {
        const histArr = [];
        if(histObj){
            Object.keys(histObj).forEach(key=>{
                const chgObj = {};
                chgObj["chargeId"] = +key;
                chgObj["chargeHistory"] = histObj[key];
                histArr.push(chgObj);
            });
        }
        return histArr;
    }
    // Apply during Get
    transformArrToObj(histArr) {
        const histObj = {};
        if(histArr && histArr.length){
            histArr.forEach(chgObj => {
                histObj[chgObj["chargeId"]] = chgObj["chargeHistory"];
            });
        }
            return histObj;
    }

    populateTermType(obj) {
        return this.http.post('ocmpconf/senTermsExecuteQuery', obj);
    }

    rgOrderStatus() {
        return this.http.get('ocmpconf/rgOrderStatus');
    }
    revokeParOrder(obj) {
        return this.http.post('ocmpconf/revokeParOrder', obj);
    }
    getAutomaticUpdFlag(code) {
        return this.http.get('ocmpconf/getAutomaticUpdFlag?autoUpdateCode=' + code);
    }
    offSentConCommit(obj) {
        return this.http.post('ocucondi/offSentConCommit', obj);
    }
    getDeleteFlag(code) {
        return this.http.get('ocmpconf/deleteOrderFlag?code='+code);
    }
    getCourtEvents(obj){
        return this.http.post('ocmpconf/offenderCourtEvents',obj);
    }
    deleteParoleEvents(obj){
        return this.http.post('ocmpconf/deleteParoleEvents',obj);
    }
    getAllOffences(){
        return this.http.get('ocmpconf/getOffencesOnStatute');
    }
    checkOrderDependency(obj) {
        return this.http.post('ocmpconf/checkOrderDependency', obj);
    }

    getERDHideShowValue(obj) {
		return this.http.get( 'ocmpconf/getERDHideShowValue?code=' + obj);
	}


    dateComparator = (c1, c2) => {
        let date1 = c1.orderedDate;
        let date2 = c2.orderedDate;

        if (!date1 && !date2) {
            return 0;
        }
        if (!date1) {
            return -1;
        }
        if (!date2) {
            return 1;
        }
        if (DateFormat.getDate(date1) + '' == 'Invalid Date') {
            return 1;
        }
        if (DateFormat.getDate(date2) + '' == 'Invalid Date') {
            return -1;
        }
        if (!(date1 instanceof Date)) {
            date1 = DateFormat.getDate(date1);
        }
        if (!(date2 instanceof Date)) {
            date2 = DateFormat.getDate(date2);
        }

        const dComp = DateFormat.compareDate(date2, date1);
        if (dComp !== 0) {
            return dComp;
        } else {
            return this.compareOnOrderNo(c1.orderNo, c2.orderNo);
        }
    }

    compareOnOrderNo(n1, n2) {
        if (n1 > n2) {
            return -1;
        }
        else if (n2 > n1) {
            return 1;
        }
        return 0;
    }
    
}
