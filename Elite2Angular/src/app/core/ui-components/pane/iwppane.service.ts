import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Router } from '@angular/router';

@Injectable()
export class IWPPaneService {
    
    private _objectId : string;
    
    constructor( private http: HttpService, private router: Router ) {
    }

    
    get objectId(): string {
        return this._objectId;
    }

    set objectId(v: string) {
        this._objectId = v;
    }
    
}
