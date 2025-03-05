import { BaseModel } from '@commonbeans/BaseModel';

export class InstitutionMiniBalances extends BaseModel {
    private _createUserId: string;
    private _accountCode: number;
    private _modifyDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _minimumAccountBalance: number;
    private _nbtAccountCode: string;
    private _createDatetime: Date;
    private _indDays: number;
    private _caseloadId: string;
    private _listSeq: number;
    private _agyLocId: string;
    private _sealFlag: string;

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
    get minimumAccountBalance(): number { return this._minimumAccountBalance; }
    set minimumAccountBalance(pminimumAccountBalance: number) { this._minimumAccountBalance = pminimumAccountBalance; }
    get nbtAccountCode(): string { return this._nbtAccountCode; }
    set nbtAccountCode(pnbtAccountCode: string) { this._nbtAccountCode = pnbtAccountCode; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get indDays(): number { return this._indDays; }
    set indDays(pindDays: number) { this._indDays = pindDays; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'accountCode': this._accountCode,
            'modifyDate': this._modifyDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'minimumAccountBalance': this._minimumAccountBalance,
            'nbtAccountCode': this._nbtAccountCode,
            'createDatetime': this._createDatetime,
            'indDays': this._indDays,
            'caseloadId': this._caseloadId,
            'listSeq': this._listSeq,
            'agyLocId': this._agyLocId,
            'sealFlag': this._sealFlag,
        };
    }
}
