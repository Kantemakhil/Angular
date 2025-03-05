import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OumrcodeService {
constructor(private http: HttpService) {}
/** This is description of the refDmnExecuteQuery function*/
refDmnExecuteQuery(obj) {
return this.http.post('oumrcode/refDmnExecuteQuery', obj);
}
/** This is description of the refDmnCommit function*/
refDmnCommit(obj) {
return this.http.post('oumrcode/refDmnCommit', obj);
}
/** This is description of the refCodeExecuteQuery function*/
refCodeExecuteQuery(obj) {
return this.http.post('oumrcode/refCodeExecuteQuery', obj);
}
/** This is description of the refCodeCommit function*/
refCodeCommit(obj) {
return this.http.post('oumrcode/refCodeCommit', obj);
}
}
