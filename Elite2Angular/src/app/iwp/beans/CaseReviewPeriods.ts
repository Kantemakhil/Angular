import { BaseModel } from "@common/beans/BaseModel";

export class CaseReviewPeriods extends BaseModel {
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _supervisionLevel: string;
    private _reviewPeriod: number;
    private _returnValue: number;
    private _rowId: string;

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get supervisionLevel(): string { return this._supervisionLevel; }
    set supervisionLevel(psupervisionLevel: string) { this._supervisionLevel = psupervisionLevel; }
    get reviewPeriod(): number { return this._reviewPeriod; }
    set reviewPeriod(previewPeriod: number) { this._reviewPeriod = previewPeriod; }
    get returnValue(): number { return this._returnValue; }
    set returnValue(preturnValue: number) { this._returnValue = preturnValue; }
    get rowId(): string { return this._rowId; }
    set rowId(prowId: string) { this._rowId = prowId; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'supervisionLevel': this._supervisionLevel,
            'reviewPeriod': this._reviewPeriod,
            'returnValue': this._returnValue,
            'rowId': this._rowId,
        };
    }
}
