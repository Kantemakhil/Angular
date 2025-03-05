
export class OffenderTrustTransfers {
    private _txnId: number;
    private _fromCaseload: string;
    private _createUserId: string;
    private _modifyUserId: string;
    private _modifyDate: Date;
    private _modifyDateTime: Date;
    private _createDateTime: Date;
    private _sealFlag: string;
    private _amount: number;
    private _transferDate: Date;
    private _toCaseload: string;
    private _postedFlag: string;
    private _dspDescription: string;
    private _checkNo: number;
    private  _caseloadId: string;
    private _caseloadType: string;
    private _sta: string;

    get sta(): string { return this._sta; }

    set sta( psta: string ) { this._sta = psta; }

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId( pcaseloadId: string ) { this._caseloadId = pcaseloadId; }

    get caseloadType(): string { return this._caseloadType; }

    set caseloadType( pcaseloadType: string ) { this._caseloadType = pcaseloadType; }

    get dspDescription(): string { return this._dspDescription; }

    set dspDescription( pdspDescription: string ) { this._dspDescription = pdspDescription; }

    get checkNo(): number { return this._checkNo; }

    set checkNo( pcheckNo: number ) { this._checkNo = pcheckNo; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get txnId(): number { return this._txnId ; }

    set txnId( ptxnId: number ) { this._txnId = ptxnId; }

    get fromCaseload(): string { return this._fromCaseload; }

    set fromCaseload( pfromCaseload: string ) { this._fromCaseload = pfromCaseload; }

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

    get amount(): number { return this._amount; }

    set amount(pamount: number) { this._amount = pamount; }

    get transferDate(): Date { return this._transferDate; }

    set transferDate( ptransferDate: Date ) { this._transferDate = ptransferDate; }

    get toCaseload(): string { return this._toCaseload; }

    set toCaseload(ptoCaseload: string) { this._toCaseload = ptoCaseload; }

    get postedFlag(): string { return this._postedFlag; }

    set postedFlag( ppostedFlag: string ) { this._postedFlag = ppostedFlag; }

    toJSON(): any {
        return {
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'modifyDate': this._modifyDate,
            'createUserId': this._createUserId,
            'modifyDateTime': this._modifyDateTime,
            'fromCaseload': this._fromCaseload,
            'txnId': this._txnId,
            'createDateTime': this._createDateTime,
            'transferDate': this._transferDate,
            'toCaseload': this._toCaseload,
            'amount': this._amount,
            'postedFlag': this._postedFlag,
            'dspDescription': this._dspDescription,
            'checkNo': this._checkNo,
            'caseloadId': this._caseloadId,
            'caseloadType': this._caseloadType,
            'sta': this._sta
        };
    }
}

