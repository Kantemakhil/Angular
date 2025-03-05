import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmcnserService {
      constructor(private http: HttpService) { }
      /** This is description of the csldCaExecuteQuery function*/
      csldCaExecuteQuery(obj) {
            return this.http.post('otmcnser/csldCaExecuteQuery', obj);
      }
      /** This is description of the bankCbExecuteQuery function*/
      bankCbExecuteQuery(obj) {
            return this.http.post('otmcnser/bankCbExecuteQuery', obj);
      }
      /** This is description of the bankCbCommit function*/
      bankCbCommit(obj) {
            return this.http.post('otmcnser/bankCbCommit', obj);
      }
      checkChecqueBooks(firstCheckNum, accountCode, caseloadId) {

            return this.http.get('otmcnser/checkChecqueBooks?firstCheckNum=' + firstCheckNum
                  + '&accountCode=' + accountCode + '&caseloadId=' + caseloadId);
      }
      checkChecqueBooksLastCheck ( lastCheckNum, firstCheckNum, accountCode, caseloadId) {
            return this.http.get('otmcnser/checkChecqueBooksLastCheck?lastCheckNum=' + lastCheckNum + '&firstCheckNum=' + firstCheckNum
            + '&accountCode=' + accountCode + '&caseloadId=' + caseloadId);
      }
}
