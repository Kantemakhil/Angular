import { BaseModel } from '@commonbeans/BaseModel';
export class InternalScheduleReasons extends BaseModel {

    private _activeFlag: string;
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _createUserId: string;
    private _description: string;
    private _listSeq: Number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _internalScheduleType: string;
    private _internalScheduleRsnCode: string;
    private _code: string;

    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get listSeq(): Number { return this._listSeq; }
    set listSeq(plistSeq: Number) { this._listSeq = plistSeq; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get internalScheduleType(): string { return this._internalScheduleType; }
    set internalScheduleType(pinternalScheduleType: string) { this._internalScheduleType = pinternalScheduleType; }
    get internalScheduleRsnCode(): string { return this._internalScheduleRsnCode; }
    set internalScheduleRsnCode(pinternalScheduleRsnCode: string) { this._internalScheduleRsnCode = pinternalScheduleRsnCode; }
    get code(): string { return this._code; }
    set code(pcode: string) { this._code = pcode; }
    toJSON(): any {
        return {
            'activeFlag': this._activeFlag,
            'createDatetime': this._createDatetime,
            'expiryDate': this._expiryDate,
            'createUserId': this._createUserId,
            'description': this._description,
            'listSeq': this._listSeq,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'internalScheduleType': this._internalScheduleType,
            'internalScheduleRsnCode': this._internalScheduleRsnCode,
            'code': this._code
        };
    }
}
