import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OsucnoteService {
     constructor(private http: HttpService) {}
     /** This is description of the rgWorksRecordGroup function*/
     rgWorksRecordGroup(obj) {
          return this.http.get( 'osucnote/rgWorksRecordGroup');
     }

     submitAdhocWorkflow(obj) {
          return this.http.post('osucnote/submitAdhocWorkflow', obj);
     }

     getDisplayAuto(offenderBookId) {
        return this.http.get( 'osucnote/getDisplayAuto?offenderBookId=' + offenderBookId);

    }
}
