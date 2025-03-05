export class PrintReceiptsTmp {
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _moduleName: string;
    private _offenderId: number;
    private _sessionId: number;
    private _sealFlag: string;
    private _receiptNumber: string;
    private _txnId: number;

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get moduleName(): string { return this._moduleName; }

    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }

    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get sessionId(): number { return this._sessionId; }

    set sessionId(psessionId: number) { this._sessionId = psessionId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get receiptNumber(): string { return this._receiptNumber; }

    set receiptNumber(preceiptNumber: string) { this._receiptNumber = preceiptNumber; }

    get txnId(): number { return this._txnId; }

    set txnId(ptxnId: number) { this._txnId = ptxnId; }


    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'moduleName': this._moduleName,
            'offenderId': this._offenderId,
            'sessionId': this._sessionId,
            'sealFlag': this._sealFlag,
            'receiptNumber': this._receiptNumber,
            'txnId': this._txnId,
        };
    }
}
