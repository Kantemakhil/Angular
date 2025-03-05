export class OffenderCreditPriorPayments {

    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _commentText: string;
    private _paymentAmount: number;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _txnEntrySeq: number;
    private _caseloadId: string;
    private _location: string;
    private _offenderId: number;
    private _paymentDate: Date;
    private _sealFlag: string;
    private _txnId: number;
    private _moduleName: string;
    private _receiptAmount: number;

    get receiptAmount(): number { return this._receiptAmount; }
    set receiptAmount(preceiptAmount: number) { this._receiptAmount = preceiptAmount; }
    get moduleName(): string { return this._moduleName; }
    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get paymentAmount(): number { return this._paymentAmount; }
    set paymentAmount(ppaymentAmount: number) { this._paymentAmount = ppaymentAmount; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get txnEntrySeq(): number { return this._txnEntrySeq; }
    set txnEntrySeq(ptxnEntrySeq: number) { this._txnEntrySeq = ptxnEntrySeq; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get location(): string { return this._location; }
    set location(plocation: string) { this._location = plocation; }
    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get paymentDate(): Date { return this._paymentDate; }
    set paymentDate(ppaymentDate: Date) { this._paymentDate = ppaymentDate; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get txnId(): number { return this._txnId; }
    set txnId(ptxnId: number) { this._txnId = ptxnId; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'commentText': this._commentText,
            'paymentAmount': this._paymentAmount,
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'txnEntrySeq': this._txnEntrySeq,
            'caseloadId': this._caseloadId,
            'location': this._location,
            'offenderId': this._offenderId,
            'paymentDate': this._paymentDate,
            'sealFlag': this._sealFlag,
            'txnId': this._txnId,
            'moduleName': this._moduleName,
            'receiptAmount': this._receiptAmount
        };
    }
}