import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable()
export class OtmlockrService {
   constructor(private http: HttpService) { }
   /** This is description of the lockModExecuteQuery function*/
   lockModExecuteQuery(obj) {
      return this.http.post('otmlockr/lockModExecuteQuery', obj);
   }
   /** This is description of the lockModCommit function*/
   lockModCommit(obj) {
      return this.http.post('otmlockr/lockModCommit', obj);
   }
}
