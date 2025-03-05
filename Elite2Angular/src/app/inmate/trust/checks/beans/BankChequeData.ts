export class BankChequeData {
    private _payeePersonId: number;
    private _startTxnId: number;
    private _createUserId: string;
    private _payeeNameText: string;
    private _modifyDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _bankAccountCode: number;
    private _endTxnId: number;
    private _singleEntryFlag: string;
    private _txnEntryAmount: number;
    private _chequeDate: Date;
    private _chequeFlag: string;
    private _txnEntryDate: Date;
    private _createDatetime: Date;
    private _payeeCorporateId: number;
    private _serialVersionUID: number;
    private _caseloadId: string;
    private _offenderId: number;
    private _sealFlag: string;
    private _txnId: number;

    get payeePersonId(): number { return this._payeePersonId; }
    set payeePersonId(ppayeePersonId: number) { this._payeePersonId = ppayeePersonId; }
    get startTxnId(): number { return this._startTxnId; }
    set startTxnId(pstartTxnId: number) { this._startTxnId = pstartTxnId; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get payeeNameText(): string { return this._payeeNameText; }
    set payeeNameText(ppayeeNameText: string) { this._payeeNameText = ppayeeNameText; }
    get modifyDate(): Date { return this._modifyDate; }
    set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get bankAccountCode(): number { return this._bankAccountCode; }
    set bankAccountCode(pbankAccountCode: number) { this._bankAccountCode = pbankAccountCode; }
    get endTxnId(): number { return this._endTxnId; }
    set endTxnId(pendTxnId: number) { this._endTxnId = pendTxnId; }
    get singleEntryFlag(): string { return this._singleEntryFlag; }
    set singleEntryFlag(psingleEntryFlag: string) { this._singleEntryFlag = psingleEntryFlag; }
    get txnEntryAmount(): number { return this._txnEntryAmount; }
    set txnEntryAmount(ptxnEntryAmount: number) { this._txnEntryAmount = ptxnEntryAmount; }
    get chequeDate(): Date { return this._chequeDate; }
    set chequeDate(pchequeDate: Date) { this._chequeDate = pchequeDate; }
    get chequeFlag(): string { return this._chequeFlag; }
    set chequeFlag(pchequeFlag: string) { this._chequeFlag = pchequeFlag; }
    get txnEntryDate(): Date { return this._txnEntryDate; }
    set txnEntryDate(ptxnEntryDate: Date) { this._txnEntryDate = ptxnEntryDate; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get payeeCorporateId(): number { return this._payeeCorporateId; }
    set payeeCorporateId(ppayeeCorporateId: number) { this._payeeCorporateId = ppayeeCorporateId; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get txnId(): number { return this._txnId; }
    set txnId(ptxnId: number) { this._txnId = ptxnId; }

    toJSON(): any {
        return {
            'payeePersonId': this._payeePersonId,
            'startTxnId': this._startTxnId,
            'createUserId': this._createUserId,
            'payeeNameText': this._payeeNameText,
            'modifyDate': this._modifyDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'bankAccountCode': this._bankAccountCode,
            'endTxnId': this._endTxnId,
            'singleEntryFlag': this._singleEntryFlag,
            'txnEntryAmount': this._txnEntryAmount,
            'chequeDate': this._chequeDate,
            'chequeFlag': this._chequeFlag,
            'txnEntryDate': this._txnEntryDate,
            'createDatetime': this._createDatetime,
            'payeeCorporateId': this._payeeCorporateId,
            'serialVersionUID': this._serialVersionUID,
            'caseloadId': this._caseloadId,
            'offenderId': this._offenderId,
            'sealFlag': this._sealFlag,
            'txnId': this._txnId,
        };
    }
}
