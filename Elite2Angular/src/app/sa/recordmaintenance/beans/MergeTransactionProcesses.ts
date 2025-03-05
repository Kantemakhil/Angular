import { BaseModel } from '@commonbeans/BaseModel';

export class MergeTransactionProcesses extends BaseModel {
    private _createDatetime: Date;
    private _beginDate: Date;
    private _timeframeFlag: string;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _mergeTransactionId: number;
    private _endDate: Date;
    private _modifyDatetime: Date;
    private _processId: number;
    private _modifyUserId: string;
    private _sealFlag: string;

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get beginDate(): Date { return this._beginDate; }

    set beginDate(pbeginDate: Date) { this._beginDate = pbeginDate; }

    get timeframeFlag(): string { return this._timeframeFlag; }

    set timeframeFlag(ptimeframeFlag: string) { this._timeframeFlag = ptimeframeFlag; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get mergeTransactionId(): number { return this._mergeTransactionId; }

    set mergeTransactionId(pmergeTransactionId: number) { this._mergeTransactionId = pmergeTransactionId; }

    get endDate(): Date { return this._endDate; }

    set endDate(pendDate: Date) { this._endDate = pendDate; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get processId(): number { return this._processId; }

    set processId(pprocessId: number) { this._processId = pprocessId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }


    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'beginDate': this._beginDate,
            'timeframeFlag': this._timeframeFlag,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'mergeTransactionId': this._mergeTransactionId,
            'endDate': this._endDate,
            'modifyDatetime': this._modifyDatetime,
            'processId': this._processId,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
        };
    }
}
