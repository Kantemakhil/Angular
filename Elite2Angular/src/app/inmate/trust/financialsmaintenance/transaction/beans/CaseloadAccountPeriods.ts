import { BaseModel } from '@commonbeans/BaseModel';

export class CaseloadAccountPeriods extends BaseModel {
    private _accountPeriodStatus: string;
    private _closingDate: Date;
    private _closingUserId: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _reopenTxnId: number;
    private _sealFlag: string;
    private _caseloadId: string;
    private _rowNum: number;
    private _toRowNum: number;
    private _fromRowNum: number;
    private _accountPeriodId: number;

    get accountPeriodStatus(): string {
        return this._accountPeriodStatus;
    }

    set accountPeriodStatus(paccountPeriodStatus: string) {
        this._accountPeriodStatus = paccountPeriodStatus;
    }
    get closingDate(): Date {
        return this._closingDate;
    }

    set closingDate(pclosingDate: Date) {
        this._closingDate = pclosingDate;
    }
    get closingUserId(): string {
        return this._closingUserId;
    }

    set closingUserId(pclosingUserId: string) {
        this._closingUserId = pclosingUserId;
    }
    get createDatetime(): Date {
        return this._createDatetime;
    }

    set createDatetime(pcreateDatetime: Date) {
        this._createDatetime = pcreateDatetime;
    }
    get createUserId(): string {
        return this._createUserId;
    }

    set createUserId(pcreateUserId: string) {
        this._createUserId = pcreateUserId;
    }

    get modifyDatetime(): Date {
        return this._modifyDatetime;
    }

    set modifyDatetime(pmodifyDatetime: Date) {
        this._modifyDatetime = pmodifyDatetime;
    }
    get modifyUserId(): string {
        return this._modifyUserId;
    }

    set modifyUserId(pmodifyUserId: string) {
        this._modifyUserId = pmodifyUserId;
    }
    get reopenTxnId(): number {
        return this._reopenTxnId;
    }

    set reopenTxnId(preopenTxnId: number) {
        this._reopenTxnId = preopenTxnId;
    }
    get sealFlag(): string {
        return this._sealFlag;
    }

    set sealFlag(psealFlag: string) {
        this._sealFlag = psealFlag;
    }
    get caseloadId(): string {
        return this._caseloadId;
    }

    set caseloadId(pcaseloadId: string) {
        this._caseloadId = pcaseloadId;
    }
    get rowNum(): number {
        return this._rowNum;
    }

    set rowNum(prowNum: number) {
        this._rowNum = prowNum;
    }
    get toRowNum(): number {
        return this._toRowNum;
    }

    set toRowNum(ptoRowNum: number) {
        this._toRowNum = ptoRowNum;
    }
    get fromRowNum(): number {
        return this._fromRowNum;
    }

    set fromRowNum(pfromRowNum: number) {
        this._fromRowNum = pfromRowNum;
    }
    get accountPeriodId(): number {
        return this._accountPeriodId;
    }

    set accountPeriodId(paccountPeriodId: number) {
        this._accountPeriodId = paccountPeriodId;
    }
    toJSON(): any {
        return {
            'accountPeriodStatus': this._accountPeriodStatus,
            'closingDate': this._closingDate,
            'closingUserId': this._closingUserId,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'reopenTxnId': this._reopenTxnId,
            'sealFlag': this._sealFlag,
            'caseloadId': this._caseloadId,
            'rowNum': this._rowNum,
            'toRowNum': this._toRowNum,
            'fromRowNum': this._fromRowNum,
            'accountPeriodId': this._accountPeriodId,
        };
    }

}
