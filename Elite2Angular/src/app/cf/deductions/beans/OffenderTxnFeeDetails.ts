export class OffenderTxnFeeDetails {

    private _createDatetime: Date;
    private _createUserId: string;
    private _listSeq: number;
    private _serialVersionUID: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _offenderDeductionId: number;
    private _receiptDeductionType: string;

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get offenderDeductionId(): number { return this._offenderDeductionId; }
    set offenderDeductionId(poffenderDeductionId: number) { this._offenderDeductionId = poffenderDeductionId; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get receiptDeductionType(): string { return this._receiptDeductionType; }
    set receiptDeductionType(preceiptDeductionType: string) { this._receiptDeductionType = preceiptDeductionType; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'offenderDeductionId': this._offenderDeductionId,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'receiptDeductionType': this._receiptDeductionType,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'listSeq': this._listSeq,
            'sealFlag': this._sealFlag,
        };
    }

}