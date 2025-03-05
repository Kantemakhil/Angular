
export class OffenderTrustAccounts {
    private _offenderId: number;
    private _caseloadId: string;
    private _createUserId: string;
    private _modifyUserId: string;
    private _modifyDate: Date;
    private _modifyDateTime: Date;
    private _createDateTime: Date;
    private _sealFlag: string;
    private _listSeq: number;
    private _notifyDate: Date;
    private _holdBalance: number;
    private _currentBalance: number;
    private _accountClosedFlag: string;
    private _caseloadType: string;
    private _offenderBookId: number;
    private _nbtTxnId: number;

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get offenderId(): number { return this._offenderId ; }

    set offenderId( poffenderId: number ) { this._offenderId = poffenderId; }

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId( pcaseloadId: string ) { this._caseloadId = pcaseloadId; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId ; }

    get modifyDate(): Date { return this._modifyDate; }

    set modifyDate( pmodifyDate: Date ) { this._modifyDate = pmodifyDate; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime( pmodifyDateTime: Date ) { this._modifyDateTime = pmodifyDateTime; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime( pcreateDateTime: Date ) { this._createDateTime = pcreateDateTime; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get notifyDate(): Date { return this._notifyDate; }

    set notifyDate( pnotifyDate: Date ) { this._notifyDate = pnotifyDate; }

    get holdBalance(): number { return this._holdBalance; }

    set holdBalance(pholdBalance: number) { this._holdBalance = pholdBalance; }

    get currentBalance(): number { return this._currentBalance; }

    set currentBalance(pcurrentBalance: number) { this._currentBalance = pcurrentBalance; }

    get accountClosedFlag(): string { return this._accountClosedFlag; }

    set accountClosedFlag( paccountClosedFlag: string ) { this._accountClosedFlag = paccountClosedFlag; }
    
    get caseloadType(): string { return this._caseloadType; }

    set caseloadType( pcaseloadType: string ) { this._caseloadType = pcaseloadType; }
    
    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }
    
    get nbtTxnId(): number { return this._nbtTxnId; }

    set nbtTxnId( pnbtTxnId: number ) { this._nbtTxnId = pnbtTxnId; }


    toJSON(): any {
        return {
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'modifyDate': this._modifyDate,
            'createUserId': this._createUserId,
            'modifyDateTime': this._modifyDateTime,
            'caseloadId': this._caseloadId,
            'offenderId': this._offenderId,
            'createDateTime': this._createDateTime,
            'notifyDate': this._notifyDate,
            'holdBalance': this._holdBalance,
            'listSeq': this._listSeq,
            'currentBalance': this._currentBalance,
            'accountClosedFlag': this._accountClosedFlag,
            'caseloadType':this._caseloadType,
            'offenderBookId':this._offenderBookId,
            'nbtTxnId':this._nbtTxnId,
        };
    }
}

