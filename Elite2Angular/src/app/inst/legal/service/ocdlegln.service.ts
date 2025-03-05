import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpService } from '@core/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class OcdleglnService {

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

}
