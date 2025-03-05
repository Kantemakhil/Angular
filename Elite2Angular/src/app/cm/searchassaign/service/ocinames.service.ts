import { VPimsNameSearch } from './../beans/VPimsNameSearch';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcinamesService {
    constructor(private http: HttpService) { }
    public oiinamesflag = false;
    public offsearch: any;
    offenderRowData: any[] = [];
    routUrl: string;
    oiiflag: boolean;
   ocittaskSharedData: VPimsNameSearch = new VPimsNameSearch();
    /** This is description of the vNSearchExecuteQuery function*/
    vNSearchExecuteQuery(obj) {
        return this.http.post('ocinames/vNSearchExecuteQuery', obj);
    }
}
