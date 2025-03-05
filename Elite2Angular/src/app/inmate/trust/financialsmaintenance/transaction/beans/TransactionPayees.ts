export class TransactionPayees {
    private _createDatetime: Date;
    private _defaultPayeeFlag: string;
    private _payeePersonId: number;
    private _payeeCorporateId: number;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _txnType: string;
    private _sealFlag: string;
    private _payeeSeq: number;

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get defaultPayeeFlag(): string { return this._defaultPayeeFlag; }
    set defaultPayeeFlag(pdefaultPayeeFlag: string) { this._defaultPayeeFlag = pdefaultPayeeFlag; }
    get payeePersonId(): number { return this._payeePersonId; }
    set payeePersonId(ppayeePersonId: number) { this._payeePersonId = ppayeePersonId; }
    get payeeCorporateId(): number { return this._payeeCorporateId; }
    set payeeCorporateId(ppayeeCorporateId: number) { this._payeeCorporateId = ppayeeCorporateId; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDate(): Date { return this._modifyDate; }
    set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get txnType(): string { return this._txnType; }
    set txnType(ptxnType: string) { this._txnType = ptxnType; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get payeeSeq(): number { return this._payeeSeq; }
    set payeeSeq(ppayeeSeq: number) { this._payeeSeq = ppayeeSeq; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'defaultPayeeFlag': this._defaultPayeeFlag,
            'payeePersonId': this._payeePersonId,
            'payeeCorporateId': this._payeeCorporateId,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'modifyDate': this._modifyDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'txnType': this._txnType,
            'sealFlag': this._sealFlag,
            'payeeSeq': this._payeeSeq,
        };
    }
}
