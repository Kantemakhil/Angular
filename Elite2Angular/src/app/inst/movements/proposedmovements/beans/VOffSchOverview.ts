export class VOffSchOverview {
    private _moveSeq: number;
    private _intExt: string;
    private _txnStatus: string;
    private _typeDescp: string;
    private _offenderBookId: number;
    private _movementType: string;
    private _tstatus: string;
    private _rsnDescp: string;
    private _eventTime: string;
    private _movementReason: string;
    private _statusCode: string;
    private _eventDate: Date;

    get moveSeq(): number{ return this._moveSeq; }
    set moveSeq(pmoveSeq: number){ this._moveSeq = pmoveSeq ;}
    get intExt(): string{ return this._intExt; }
    set intExt(pintExt: string){ this._intExt = pintExt ;}
    get txnStatus(): string{ return this._txnStatus; }
    set txnStatus(ptxnStatus: string){ this._txnStatus = ptxnStatus ;}
    get typeDescp(): string{ return this._typeDescp; }
    set typeDescp(ptypeDescp: string){ this._typeDescp = ptypeDescp ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get movementType(): string{ return this._movementType; }
    set movementType(pmovementType: string){ this._movementType = pmovementType ;}
    get tstatus(): string{ return this._tstatus; }
    set tstatus(ptstatus: string){ this._tstatus = ptstatus ;}
    get rsnDescp(): string{ return this._rsnDescp; }
    set rsnDescp(prsnDescp: string){ this._rsnDescp = prsnDescp ;}
    get eventTime(): string{ return this._eventTime; }
    set eventTime(peventTime: string){ this._eventTime = peventTime ;}
    get movementReason(): string{ return this._movementReason; }
    set movementReason(pmovementReason: string){ this._movementReason = pmovementReason ;}
    get statusCode(): string{ return this._statusCode; }
    set statusCode(pstatusCode: string){ this._statusCode = pstatusCode ;}
    get eventDate(): Date{ return this._eventDate; }
    set eventDate(peventDate: Date){ this._eventDate = peventDate ;}

toJSON(): any {
    return { 
       'moveSeq': this._moveSeq,
       'intExt': this._intExt,
       'txnStatus': this._txnStatus,
       'typeDescp': this._typeDescp,
       'offenderBookId': this._offenderBookId,
       'movementType': this._movementType,
       'tstatus': this._tstatus,
       'rsnDescp': this._rsnDescp,
       'eventTime': this._eventTime,
       'movementReason': this._movementReason,
       'statusCode': this._statusCode,
       'eventDate': this._eventDate,
        };
    } 
}
