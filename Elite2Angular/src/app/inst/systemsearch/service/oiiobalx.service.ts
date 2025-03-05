import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Images } from '@common/beans/Images';

@Injectable()
export class OiiobalxService {
   
   constructor(private http: HttpService) { }

   offenderExternalAccount(obj){
      return this.http.post('Oiiobalx/getOffExternalAccountBalances', obj);
   }
   getBalanceLastUpdatedDate(){
      return this.http.get('Oiiobalx/getLastUpdatedDate');
   }

}
