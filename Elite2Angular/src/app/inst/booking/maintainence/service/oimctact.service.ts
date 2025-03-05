import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimctactService {
  constructor(private http: HttpService) { }
  /** This is description of the contactPersonTypesExecuteQuery function*/
  contactPersonTypesExecuteQuery(obj) {
    return this.http.post('oimctact/contactPersonTypesExecuteQuery', obj);
  }
  /** This is description of the contactPersonTypesCommit function*/
  contactPersonTypesCommit(obj) {
    return this.http.post('oimctact/contactPersonTypesCommit', obj);
  }
  /** This is description of the rgRelationshipTypeRecordGroup function*/
  rgRelationshipTypeRecordGroup(obj) {
    return this.http.get('oimctact/rgRelationshipTypeRecordGroup');
  }
  /** This is description of the rgContactTypeRecordGroup function*/
  rgContactTypeRecordGroup(obj) {
    return this.http.get('oimctact/rgContactTypeRecordGroup');
  }
}
