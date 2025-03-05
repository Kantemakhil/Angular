import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumwmenuService {
       constructor(private http: HttpService) { }
       /** This is description of the wfFoldersExecuteQuery function*/
       wfFoldersExecuteQuery(obj) {
              return this.http.post('oumwmenu/wfFoldersExecuteQuery', obj);
       }

        /** This is description of the wfFolderspostquery function*/
        wfFoldersPostQuery(obj) {
       return this.http.post('oumwmenu/wfFoldersPostQuery', obj);
}
       /** This is description of the wfFoldersCommit function*/
       wfFoldersCommit(obj) {
              return this.http.post('oumwmenu/wfFoldersCommit', obj);
       }
       /** This is description of the wfScreensExecuteQuery function*/
       wfScreensExecuteQuery(obj) {
              return this.http.post('oumwmenu/wfScreensExecuteQuery', obj);
       }
       /** This is description of the wfScreensCommit function*/
       wfScreensCommit(obj) {
              return this.http.post('oumwmenu/wfScreensCommit', obj);
       }
       /** This is description of the rgMenusNameRecordGroup function*/
       rgMenusNameRecordGroup() {
              return this.http.get('oumwmenu/rgMenusNameRecordGroup');
       }
       /** This is description of the rgCaseloadTypeRecordGroup function*/
       rgCaseloadTypeRecordGroup(obj) {
              return this.http.get('oumwmenu/rgCaseloadTypeRecordGroup');
       }
       /** This is description of the rgScreensModuleNameRecordGroup function*/
       rgScreensModuleNameRecordGroup() {
              return this.http.get('oumwmenu/rgScreensModuleNameRecordGroup');
       }
}
