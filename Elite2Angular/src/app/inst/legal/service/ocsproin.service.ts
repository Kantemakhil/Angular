import { Injectable } from "@angular/core";
import { HttpService } from "@core/service/http.service";

@Injectable({ providedIn: 'root' })

export class OcsproinService {

  constructor(private http: HttpService) { }

  courseActExecuteQuery(obj) {
    return this.http.post('ocsproin/courseActExecuteQuery', obj);
  }

  offenderExecQuery(crsActyId) {
    return this.http.get('ocsproin/offenderExecQuery?crsActyId=' + crsActyId);
  }

  referredExeQuery(obj) {
    return this.http.post('ocsproin/referredExeQuery', obj);
  }

}
