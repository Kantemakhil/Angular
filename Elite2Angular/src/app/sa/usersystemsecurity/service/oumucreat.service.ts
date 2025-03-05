import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumucreatService {
    
    constructor(private http: HttpService) { }

    createUser(obj) {
        return this.http.post('oumucreat/createUser', obj);
    }

    verifyEmailId(obj) {
        return this.http.get('oumucreat/verifyEmailId?emailId='+obj);
    }

    getUserDetails(userName) {
        return this.http.get('oumucreat/getUserDetails?userName=' + userName);
      }
      migrateAdUser(){
        return this.http.get('oumucreat/resetADUser');
      }
}
