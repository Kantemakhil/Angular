import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OidcrtevService {

  constructor(private http: HttpService) { }

  loadData() {
    //return this.http.post('ocmpconf/getFormData',data);
    const xData = [
      {
        "event_date": "27/01/2022",
        "time": "1300",
        "court": "HMAG",
        "hearingReason": "DIR",
        "appearanceType": "CRT",
        "appearanceLocation": "EDU",
        "matter": "19800/2021",
        "comment": "Rescheduled via phone call"
      },
    ];
    return of(xData);
  }

  loadDataTypes() {
    const datatypes = [
      { "field": "event_date", "dataType": "date", "fieldName": "Event Date", required: true, editable: true },
      { "field": "time", "dataType": "time", "fieldName": "Time", required: true, editable: true },
      {
        dataType: "lov",
        field: "court",
        fieldName: "Court",
        editable: true,
        required: true,
        source: "link",
        sourceType: "OUMAGLOC",
        url: "ocdccase/populateCourtData"
      },
      {
        dataType: "lov",
        field: "hearingReason",
        fieldName: "Hearing Reason",
        editable: true,
        required: true,
        source: "domain",
        sourceType: "OUMEMOVE",
        url: "MOVE_RSN"
      },
      {
        dataType: "lov",
        field: "appearanceType",
        fieldName: "Apperance Type",
        editable: true,
        required: true,
        source: "domain",
        url: "CRT_APP_TYPE"
      },
      {
        dataType: "lov",
        field: "appearanceLocation",
        fieldName: "Apperance Location",
        editable: true,
        required: false,
        source: "domain",
        url: "ILOC_TYPE"
      },
      { "field": "matter", "dataType": "text", "fieldName": "Matter(s)", required: false, editable: true },
      { "field": "comment", "dataType": "text", "fieldName": "Comment", required: false, editable: true },
    ];
    return of(datatypes);
  }

  courtEveExecuteQuery(obj) {
    return this.http.post('oidcrtev/courtEveExecuteQuery', obj);
  }
  crtEveCommit(obj) {
    return this.http.post('oidcrtev/courtEventCommit', obj);
  }
  hearingreasonRecordGroup() {
    return this.http.get('oidcrtev/hearingreasonRecordGroup');
  }
  apperancelocationRecordGroup(caseLoadId) {
    return this.http.get('oidcrtev/apperancelocationRecordGroup?caseLoadId=' + caseLoadId);
  }
  getAppearanceTypeData(userId, moduleName) {
    return this.http.get('getReferenceDomainCodes?domain=CRT_APP_TYPE&moduleName='+moduleName)
  }
  nonAssocationOffendersData(obj) {
    return this.http.post('oidcrtev/checkNonAssociations', obj);
  }

  getDefaultCancellationReason() {
    return this.http.get('oidcrtev/getDefaultCancellationReason');
  }
  checkScheduleConflict(obj) {
    return this.http.post('oidcrtev/checkScheduleConflict', obj);
}
}
