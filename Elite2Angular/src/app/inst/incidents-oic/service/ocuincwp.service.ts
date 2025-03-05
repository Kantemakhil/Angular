import { Injectable } from '@angular/core';

import { HttpService } from '../../../core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuincwpService {

  constructor(private http: HttpService) { }

  offednerWeaponsInsertQuery(obj) {
      return this.http.post('ocuincwp/offednerweaponsInsertCommit', obj);
  }

  offenderWeaponsData(obj){
    return this.http.post('ocuincwp/offednerweaponsAllData', obj);
  }
}
