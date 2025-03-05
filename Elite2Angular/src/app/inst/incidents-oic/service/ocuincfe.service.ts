import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/service/http.service';


@Injectable({providedIn: 'root'})
export class OcuincfeService {

  constructor(private http: HttpService) { }

  staffforceCommitData( obj ) {
    return this.http.post( 'ocuincfe/commitStaffforceData', obj );
}

staffforceExecuteQuery(obj){
    return this.http.post('ocuincfe/getStaffforceIncident',obj);
}

staffEquipementCommitData( obj ) {
  return this.http.post( 'ocuincfe/commitStaffEquipementData', obj );
}

staffEquipementExecuteQuery(obj){
  return this.http.post('ocuincfe/getStaffEquipementIncident',obj);
}

}
