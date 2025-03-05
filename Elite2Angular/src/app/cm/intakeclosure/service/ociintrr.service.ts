import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OciintrrService {
    constructor(private http: HttpService) { ; }
    /** This is description of the offagyExecuteQuery function*/

    offIntakeReiewQuExecuteQuery(obj) {
        return this.http.post('ociintrr/offIntakeReiewQuExecuteQuery', obj);
    }
    offIntakeRevAccept(obj) {
        return this.http.post('ociintrr/offIntakeRevAccept', obj);
    }

}
