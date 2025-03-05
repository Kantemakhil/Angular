import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OumemoveService {
  constructor(private http: HttpService) { }
  /** This is description of the moveRsnCommit function*/
  moversnCommit(obj) {
    return this.http.post('oumemove/moveRsnCommit', obj);
  }
  /** This is  moversnexecuteQuery function*/
  moversnexecuteQuery(obj) {
    return this.http.post('/oumemove/moveRsnExecuteQuery', obj);
  }
  /** This is to get the  reason dropdown values function*/
  cgfkMoveRsnMovementReasonRecordGroup(obj) {
    return this.http.get('/oumemove/cgfkMoveRsnMovementReasonRecordGroup');
  }
  /** This is to get the  type dropdown values function*/
  cgfkMoveRsnMovementTypeRecordGroup(obj) {
    return this.http.get('/oumemove/cgfkMoveRsnMovementTypeRecordGroup');
  }
  cgrichkMovementReasonsDeleteCheck(obj) {
    return this.http.post('/oumemove/cgrichkMovementReasonsDeleteCheck', obj);
  }
}
