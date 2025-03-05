import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Images } from '@common/beans/Images';

@Injectable()
export class OsihrsumService {
   imagesDataTemp = new Images();
   constructor(private http: HttpService) { }
   /** This is description of the offBkgsExecuteQuery function*/
   offBkgsExecuteQuery(obj) {
      return this.http.post('osihrsum/offBkgsExecuteQuery', obj);
   }
   /** This is description of the vHisBooExecuteQuery function*/
   vHisBooExecuteQuery(rootOffenderId) {
      return this.http.get('osihrsum/vHisBooExecuteQuery?rootOffenderId='+ rootOffenderId);
   }
   /** This is description of the fafExecuteQuery function*/
   fafExecuteQuery(obj) {
      return this.http.post('osihrsum/fafExecuteQuery', obj);
   }
   /** This is description of the fafCommit function*/
   fafCommit(obj) {
      return this.http.post('osihrsum/fafCommit', obj);
   }
   /** This is description of the sysPflExecuteQuery function*/
   sysPflExecuteQuery(obj) {
      return this.http.post('osihrsum/sysPflExecuteQuery', obj);
   }
   /** This is description of the cgfkFafdestinationformRecordGroup function*/
   cgfkFafdestinationformRecordGroup(obj) {
      return this.http.get('osihrsum/cgfk$fafDestinationFormRecordGroup');
   }

   getImageData(obj) {
      return this.http.post('osihrsum/getImageData', obj);
   }

   getOutCountDescription(code) {
      return this.http.get('osihrsum/getOutCountDescription?code='+ code);
   }
}
