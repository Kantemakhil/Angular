export class OffenderLocChngDtls {
    private _locationSeq: number;
    private _createUserId: string;
    private _txnRsn: string;
    private _offenderBookId: number;
    private _modifyDatetime: Date;
    private _recordedDate: Date;
    private _appRsn: string;
    private _modifyUserId: string;
    private _detailSeq: number;
    private _createDatetime: Date;
    private _recordedBy: string;
    private _txnStatus: string;
    private _statusComment: string;
    private _sealFlag: string;
    private _statusCode: string;
    private _choice: string;
    private _checkFlag: string;
    private _nonAssoFlag: string;
    private _appRole: string;
    private _cancRole: string;
    private _recoredTime: Date;

    public get recoredTime(): Date {
        return this._recoredTime;
    }
    public set recoredTime(value: Date) {
        this._recoredTime = value;
    }

    get appRole(): string { return this._appRole; }
    set appRole(value: string) { this._appRole = value; }
    get cancRole(): string { return this._cancRole; }
    set cancRole(value: string) { this._cancRole = value; }
    get nonAssoFlag(): string { return this._nonAssoFlag; }
    set nonAssoFlag(value: string) { this._nonAssoFlag = value; }
    get checkFlag(): string { return this._checkFlag; }
    set checkFlag(value: string) { this._checkFlag = value; }
    get choice(): string{ return this._choice; }
    set choice(pchoice: string){ this._choice = pchoice ;}
    get locationSeq(): number{ return this._locationSeq; }
    set locationSeq(plocationSeq: number){ this._locationSeq = plocationSeq ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get txnRsn(): string{ return this._txnRsn; }
    set txnRsn(ptxnRsn: string){ this._txnRsn = ptxnRsn ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get recordedDate(): Date{ return this._recordedDate; }
    set recordedDate(precordedDate: Date){ this._recordedDate = precordedDate ;}
    get appRsn(): string{ return this._appRsn; }
    set appRsn(pappRsn: string){ this._appRsn = pappRsn ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get detailSeq(): number{ return this._detailSeq; }
    set detailSeq(pdetailSeq: number){ this._detailSeq = pdetailSeq ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get recordedBy(): string{ return this._recordedBy; }
    set recordedBy(precordedBy: string){ this._recordedBy = precordedBy ;}
    get txnStatus(): string{ return this._txnStatus; }
    set txnStatus(ptxnStatus: string){ this._txnStatus = ptxnStatus ;}
    get statusComment(): string{ return this._statusComment; }
    set statusComment(pstatusComment: string){ this._statusComment = pstatusComment ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get statusCode(): string{ return this._statusCode; }
    set statusCode(pstatusCode: string){ this._statusCode = pstatusCode ;}

toJSON(): any {
    return { 
       'locationSeq': this._locationSeq,
       'createUserId': this._createUserId,
       'txnRsn': this._txnRsn,
       'offenderBookId': this._offenderBookId,
       'modifyDatetime': this._modifyDatetime,
       'recordedDate': this._recordedDate,
       'appRsn': this._appRsn,
       'modifyUserId': this._modifyUserId,
       'detailSeq': this._detailSeq,
       'createDatetime': this._createDatetime,
       'recordedBy': this._recordedBy,
       'txnStatus': this._txnStatus,
       'statusComment': this._statusComment,
       'sealFlag': this._sealFlag,
       'statusCode': this._statusCode,
       'choice': this._choice,
       'checkFlag': this._checkFlag,
       'nonAssoFlag': this._nonAssoFlag,
       'appRole': this._appRole,
       'cancRole': this._cancRole,
       'recoredTime':this._recoredTime,
        };
    } 
}