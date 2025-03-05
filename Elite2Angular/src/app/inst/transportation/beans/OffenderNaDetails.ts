
export class OffenderNaDetails{
    private _offenderBookId: number;
    private _name: string;
    private _nbtCurLoc: number;
    private _nsReasonCode: number;
    private _ndoc: string;
    private _nbtType: number;
    private _nsLevelCode: number;
    private _offenderId: number;
    private _nsOffenderId: number;
    private _nbtReason: number;
    private _nsType: number;
    private _nsOffenderBookId: number;
    private _scheduledTripId: number;
    private _moduleName: any;
 

    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get name(): string{ return this._name; }
    set name(pname: string){ this._name = pname ;}
    get nbtCurLoc(): number{ return this._nbtCurLoc; }
    set nbtCurLoc(pnbtCurLoc: number){ this._nbtCurLoc = pnbtCurLoc ;}
    get nsReasonCode(): number{ return this._nsReasonCode; }
    set nsReasonCode(pnsReasonCode: number){ this._nsReasonCode = pnsReasonCode ;}
    get ndoc(): string{ return this._ndoc; }
    set ndoc(pndoc: string){ this._ndoc = pndoc ;}
    get nbtType(): number{ return this._nbtType; }
    set nbtType(pnbtType: number){ this._nbtType = pnbtType ;}
    get nsLevelCode(): number{ return this._nsLevelCode; }
    set nsLevelCode(pnsLevelCode: number){ this._nsLevelCode = pnsLevelCode ;}
    get offenderId(): number{ return this._offenderId; }
    set offenderId(poffenderId: number){ this._offenderId = poffenderId ;}
    get nsOffenderId(): number{ return this._nsOffenderId; }
    set nsOffenderId(pnsOffenderId: number){ this._nsOffenderId = pnsOffenderId ;}
    get nbtReason(): number{ return this._nbtReason; }
    set nbtReason(pnbtReason: number){ this._nbtReason = pnbtReason ;}
    get nsType(): number{ return this._nsType; }
    set nsType(pnsType: number){ this._nsType = pnsType ;}
    get nsOffenderBookId(): number{ return this._nsOffenderBookId; }
    set nsOffenderBookId(pnsOffenderBookId: number){ this._nsOffenderBookId = pnsOffenderBookId ;}
    get scheduledTripId(): number{ return this._scheduledTripId; }
    set scheduledTripId(pscheduledTripId: number){ this._scheduledTripId = pscheduledTripId ;}
    get moduleName(): any{ return this._moduleName; }
    set moduleName(pmoduleName: any){ this._moduleName = pmoduleName;}
   

toJSON(): any {
    return { 
       'offenderBookId': this._offenderBookId,
       'name': this._name,
       'nbtCurLoc': this._nbtCurLoc,
       'nsReasonCode': this._nsReasonCode,
       'ndoc': this._ndoc,
       'nbtType': this._nbtType,
       'nsLevelCode': this._nsLevelCode,
       'offenderId': this._offenderId,
       'nsOffenderId': this._nsOffenderId,
       'nbtReason': this._nbtReason,
       'nsType': this._nsType,
       'nsOffenderBookId': this._nsOffenderBookId,
       'scheduledTripId':this._scheduledTripId,
       'moduleName':this._moduleName,
    

       



        };
    } 


    
}


