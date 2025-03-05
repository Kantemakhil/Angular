import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OculcaseService {
    
    private _caseId:number;
    private _caseIdl:number;
    private _eventId:number;
    private _offenderBookId:number;
    private _selectFlag:boolean;

get caseId(): number { return this._caseId; }

set caseId( caseId: number ) { this._caseId = caseId; }

get caseIdl(): number { return this._caseIdl; }

set caseIdl( caseIdl: number ) { this._caseIdl = caseIdl; }

get eventId(): number { return this._eventId; }

set eventId( eventId: number ) { this._eventId = eventId; }

get offenderBookId(): number { return this._offenderBookId; }

set offenderBookId( offenderBookId: number ) { this._offenderBookId = offenderBookId; }

get selectFlag(): boolean { return this._selectFlag; }

set selectFlag( selectFlag: boolean ) { this._selectFlag = selectFlag; }

    constructor(private http: HttpService) {}
    populateLinkCase(obj){
        return this.http.post("oculcase/populateLinkCase",obj);
    }
    
    populateSelectHearing(obj){
        return this.http.post("oculcase/populateSelectHearing",obj);
    }
    
    populateLinkLovType(obj){
           return this.http.post("oculcase/populateLinkLovType",obj);
    }
    
   linkCase(obj){
        return this.http.post("oculcase/linkCase",obj);
    }
    
    unLinkCase(obj){
        return this.http.post("oculcase/unLinkCase",obj);
    }
    
    chkSentences(caseId,offenderBookId){
        return this.http.get('oculcase/chkSentences?caseId='+caseId+'&offenderBookId='+offenderBookId);
    }
    
   
}
    