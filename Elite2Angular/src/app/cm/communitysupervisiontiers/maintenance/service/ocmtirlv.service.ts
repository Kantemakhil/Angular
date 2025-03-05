import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
@Injectable({ providedIn: 'root' })
export class OcmtirlvService {
  constructor(private http: HttpService) { }
  tierLevelExecuteQuery(obj) {
    return this.http.post('ocmtirlv/tierLevelExecuteQuery', obj);
  }
  tierLevelCommit(obj) {
    return this.http.post('ocmtirlv/tierLevelCommit', obj);
  }


}