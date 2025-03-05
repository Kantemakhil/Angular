export class BankChequeBooks {
    private _createUserId: string;
    private _accountCode: number;
    private _modifyDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _lastCheckNumber: number;
    private _accountNumber: string;
    private _txnEntryDate: Date;
    private _createDatetime: Date;
    private _nextCheckNumber: number;
    private _serialVersionUID: number;
    private _caseloadId: string;
    private _firstCheckNumber: number;
    private _listSeq: number;
    private _chequeBookSeq: number;
    private _sealFlag: string;
    private _rowId: string;

    get rowId(): string { return this._rowId; }
    set rowId(prowId: string) { this._rowId = prowId; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get accountCode(): number { return this._accountCode; }
    set accountCode(paccountCode: number) { this._accountCode = paccountCode; }
    get modifyDate(): Date { return this._modifyDate; }
    set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get lastCheckNumber(): number { return this._lastCheckNumber; }
    set lastCheckNumber(plastCheckNumber: number) { this._lastCheckNumber = plastCheckNumber; }
    get accountNumber(): string { return this._accountNumber; }
    set accountNumber(paccountNumber: string) { this._accountNumber = paccountNumber; }
    get txnEntryDate(): Date { return this._txnEntryDate; }
    set txnEntryDate(ptxnEntryDate: Date) { this._txnEntryDate = ptxnEntryDate; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get nextCheckNumber(): number { return this._nextCheckNumber; }
    set nextCheckNumber(pnextCheckNumber: number) { this._nextCheckNumber = pnextCheckNumber; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get firstCheckNumber(): number { return this._firstCheckNumber; }
    set firstCheckNumber(pfirstCheckNumber: number) { this._firstCheckNumber = pfirstCheckNumber; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get chequeBookSeq(): number { return this._chequeBookSeq; }
    set chequeBookSeq(pchequeBookSeq: number) { this._chequeBookSeq = pchequeBookSeq; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'accountCode': this._accountCode,
            'modifyDate': this._modifyDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'lastCheckNumber': this._lastCheckNumber,
            'accountNumber': this._accountNumber,
            'txnEntryDate': this._txnEntryDate,
            'createDatetime': this._createDatetime,
            'nextCheckNumber': this._nextCheckNumber,
            'serialVersionUID': this._serialVersionUID,
            'caseloadId': this._caseloadId,
            'firstCheckNumber': this._firstCheckNumber,
            'listSeq': this._listSeq,
            'chequeBookSeq': this._chequeBookSeq,
            'sealFlag': this._sealFlag,
            'rowId': this._rowId
        };
    }
}
