import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpService } from '@core/service/http.service';

@Injectable({
  providedIn: 'root'
})

export class OcdchgsuService {
  
  constructor(private http: HttpService) { }

  offIndExecuteQuery(obj) {
		return this.http.post('oimoffen/offIndExecuteQuery', obj);
	}
  getOutcomes(){
    return this.http.get('ocmpconf/populateOutcome');
  }

  loadJsonData() {

    const xData = [
      {
        "select" : false,
        "matter": "6128/2020",
        "act": "I",
        "code": "266",
        "description": "Forgery",
        "descriptionLaunch": "...",
        "type": "I",
        "incidentDate": "09/07/2020",
        "Range": "09/07/2020",
        "plea": "G",
        "currentStatus": "Remand",
        "details": "..."
      }
    ];
    return of(xData);
  }

  loadDatatypes() {
    const datatypes = [
      { "field": 'select', "dataType": 'checkbox' },
      { "field": 'matter', "dataType": 'text' },
      { "field": 'act', "dataType": 'lov', "source": "domain", "url": "ACTIVE_TYPE" },
      { "field": 'code', "dataType": 'lov', "source": "link",  'url': 'ocuoffen/offencesAgainstOrders' },
      { "field": 'description', "dataType": 'text' },
      { "field": "descriptionLaunch", "dataType": 'launchbutton', "link": '/consToLine' },
      { "field": 'type', "dataType": 'lov', "source": "domain", "url": "OFFENCE_TYPE" },
      { "field": 'incidentDate', "dataType": 'date' },
      { "field": 'Range', "dataType": 'date' },
      { "field": 'plea', "dataType": 'lov', "source": "domain", "url": "PLEA_STATUS" },
      { "field": 'currentStatus', "dataType": 'text' },
      { "field": 'details', "dataType": 'launchbutton', "link": '/termToLine' },

    ];
    return of(datatypes);
  }

  saveData(submissionData: any) {
    return this.http.post('ocmpconf/submitFormData', submissionData);
  }
  loadData(retData: any) {
      return this.http.post('ocmpconf/getFormData', retData);
  }
  
  getInactiveCharges() {
      return this.http.get('ocmpconf/getInactiveCharges');
  }

  getAllOffences(){
    return this.http.get('ocmpconf/getOffencesOnStatute');
  }

  getAllStatutes(){
    return this.http.get('ocmpconf/populateStatutes');
  }

  getOffenderOrders(obj: any) {
    return this.http.post('ocmpconf/getOffenderOrders', obj);
  }
  
}
