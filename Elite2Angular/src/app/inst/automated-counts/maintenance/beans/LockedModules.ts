import { BaseModel } from "@common/beans/BaseModel";

export class LockedModules extends BaseModel {
    private _createUserId: string;
    private _accountCode: number;
    private _modifyDatetime: Date;
    private _moduleName: string;
    private _modifyUserId: string;
    private _lockedDate: Date;
    private _sessionId: number;
    private _userId: string;
    private _createDatetime: Date;
    private _inserted: number;
    private _caseloadId: string;
    private _agyLocId: string;
    private _offenderId: number;
    private _sealFlag: string;
    private _rowId: string;

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get accountCode(): number { return this._accountCode; }
    set accountCode(paccountCode: number) { this._accountCode = paccountCode; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get moduleName(): string { return this._moduleName; }
    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get lockedDate(): Date { return this._lockedDate; }
    set lockedDate(plockedDate: Date) { this._lockedDate = plockedDate; }
    get sessionId(): number { return this._sessionId; }
    set sessionId(psessionId: number) { this._sessionId = psessionId; }
    get userId(): string { return this._userId; }
    set userId(puserId: string) { this._userId = puserId; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get inserted(): number { return this._inserted; }
    set inserted(pinserted: number) { this._inserted = pinserted; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get rowId(): string { return this._rowId; }
    set rowId(prowId: string) { this._rowId = prowId; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'accountCode': this._accountCode,
            'modifyDatetime': this._modifyDatetime,
            'moduleName': this._moduleName,
            'modifyUserId': this._modifyUserId,
            'lockedDate': this._lockedDate,
            'sessionId': this._sessionId,
            'userId': this._userId,
            'createDatetime': this._createDatetime,
            'inserted': this._inserted,
            'caseloadId': this._caseloadId,
            'agyLocId': this._agyLocId,
            'offenderId': this._offenderId,
            'sealFlag': this._sealFlag,
            'rowId': this._rowId,
        };
    }
}