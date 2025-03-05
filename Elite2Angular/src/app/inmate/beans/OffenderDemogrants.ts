export class OffenderDemogrants {
    private _createDatetime: Date;
    private _startTxnId: number;
    private _amount: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _caseloadId: string;
    private _demograntDate: Date;
    private _modifyUserId: string;
    private _endTxnId: number;
    private _sealFlag: string;
    private _demograntId: number;

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get startTxnId(): number { return this._startTxnId; }
    set startTxnId(pstartTxnId: number) { this._startTxnId = pstartTxnId; }
    get amount(): number { return this._amount; }
    set amount(pamount: number) { this._amount = pamount; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get demograntDate(): Date { return this._demograntDate; }
    set demograntDate(pdemograntDate: Date) { this._demograntDate = pdemograntDate; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get endTxnId(): number { return this._endTxnId; }
    set endTxnId(pendTxnId: number) { this._endTxnId = pendTxnId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get demograntId(): number { return this._demograntId; }
    set demograntId(pdemograntId: number) { this._demograntId = pdemograntId; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'startTxnId': this._startTxnId,
            'amount': this._amount,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'caseloadId': this._caseloadId,
            'demograntDate': this._demograntDate,
            'modifyUserId': this._modifyUserId,
            'endTxnId': this._endTxnId,
            'sealFlag': this._sealFlag,
            'demograntId': this._demograntId,
        };
    }
}