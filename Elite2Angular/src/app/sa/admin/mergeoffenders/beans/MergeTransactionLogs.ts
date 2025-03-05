export class MergeTransactionLogs {
    private _createDatetime: Date;
    private _logTimestamp: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _mergeTransactionLogId: number;
    private _logLevel: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _logMsgPart: number;
    private _logText: string;

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get logTimestamp(): Date { return this._logTimestamp; }
    set logTimestamp(plogTimestamp: Date) { this._logTimestamp = plogTimestamp; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get mergeTransactionLogId(): number { return this._mergeTransactionLogId; }
    set mergeTransactionLogId(pmergeTransactionLogId: number) { this._mergeTransactionLogId = pmergeTransactionLogId; }
    get logLevel(): string { return this._logLevel; }
    set logLevel(plogLevel: string) { this._logLevel = plogLevel; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get logMsgPart(): number { return this._logMsgPart; }
    set logMsgPart(plogMsgPart: number) { this._logMsgPart = plogMsgPart; }
    get logText(): string { return this._logText; }
    set logText(plogText: string) { this._logText = plogText; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'logTimestamp': this._logTimestamp,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'mergeTransactionLogId': this._mergeTransactionLogId,
            'logLevel': this._logLevel,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'logMsgPart': this._logMsgPart,
            'logText': this._logText,
        };
    }
}
