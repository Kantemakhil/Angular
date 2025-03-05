import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OumrareaService {
constructor(private http: HttpService) {}
/** This is description of the maintRegExecuteQuery function*/
maintRegExecuteQuery(obj) {
return this.http.post('oumrarea/maintRegExecuteQuery', obj);
}
/** This is description of the maintRegCommit function*/
maintRegCommit(obj) {
return this.http.post('oumrarea/maintRegCommit', obj);
}
/** This is description of the maintAreaExecuteQuery function*/
maintAreaExecuteQuery(obj) {
return this.http.post('oumrarea/maintAreaExecuteQuery', obj);
}
/** This is description of the maintAreaCommit function*/
maintAreaCommit(obj) {
return this.http.post('oumrarea/maintAreaCommit', obj);
}
/** This is description of the maintSubAreaExecuteQuery function*/
maintSubAreaExecuteQuery(obj) {
return this.http.post('oumrarea/maintSubAreaExecuteQuery', obj);
}
/** This is description of the maintSubAreaCommit function*/
maintSubAreaCommit(obj) {
return this.http.post('oumrarea/maintSubAreaCommit', obj);
}
/** This is description of the rgAreaTypeRecordGroup function*/
rgAreaTypeRecordGroup(obj) {
return this.http.get( 'oumrarea/rgAreaTypeRecordGroup');
}
}
