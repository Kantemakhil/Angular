import { BaseModel } from './../../../common/beans/BaseModel';
export class SanctionNotices extends BaseModel{

    private  _activeFlag: string;
     private  _createDatetime: Date;
    private  _createUserId: string;
    private  _code: string;
    private  _description: string;
    private  _expiryDate: Date;
    private  _modifyDatetime: Date;
    private  _modifyUserId: string;
    private  _sealFlag: string;
    private  _seqNum: number;
    private  _sanctionNoticeCode: string;
    private  _updateAllowedFlag: string;
    private  _lateDays: number;
    private _rowId: string;
    private _issuePeriod: number;
    private  _updateAllowed: string;

    get issuePeriod(): number { return this._issuePeriod; }

set issuePeriod(pissuePeriod: number){ this._issuePeriod = pissuePeriod; }

get updateAllowed(): string { return this._updateAllowed; }

    set updateAllowed(pupdateAllowed: string){ this._updateAllowed = pupdateAllowed; }

    get updateAllowedFlag(): string { return this._updateAllowedFlag; }

    set updateAllowedFlag(pupdateAllowedFlag: string){ this._updateAllowedFlag = pupdateAllowedFlag; }

    get lateDays(): number { return this._lateDays; }

set lateDays(plateDays: number){ this._lateDays = plateDays; }
	
 get activeFlag(): string { return this._activeFlag; }

set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag; }

get createDatetime(): Date { return this._createDatetime; }

set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime; }

get createUserId(): string { return this._createUserId; }

set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }


get description(): string { return this._description; }

set description(pdescription: string){ this._description = pdescription; }

get expiryDate(): Date { return this._expiryDate; }

set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate; }

get modifyDatetime(): Date { return this._modifyDatetime; }

set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime; }

get modifyUserId(): string { return this._modifyUserId; }

set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

get code(): string { return this._code; }

set code(pcode: string){ this._code = pcode; }

get sealFlag(): string { return this._sealFlag; }

set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }

get seqNum(): number { return this._seqNum; }

set seqNum(pseqNum: number){ this._seqNum = pseqNum; }


get sanctionNoticeCode(): string { return this._sanctionNoticeCode; }

set sanctionNoticeCode(psanctionNoticeCode: string){ this._sanctionNoticeCode = psanctionNoticeCode; }
get rowId(): string { return this._rowId; }
set rowId(prowId: string) { this._rowId = prowId; }
toJSON(): any {
    return {
        'activeFlag': this._activeFlag,
        'createDatetime': this._createDatetime,
        'createUserId': this._createUserId,
        'code': this._code,
        'description': this._description,
        'expiryDate': this._expiryDate,
        'modifyDatetime': this._modifyDatetime,
        'modifyUserId': this._modifyUserId,
        'sealFlag': this._sealFlag,
        'seqNum': this._seqNum,
        'sanctionNoticeCode': this._sanctionNoticeCode,
        'updateAllowedFlag': this._updateAllowedFlag,
        'lateDays': this._lateDays,
        'rowId': this._rowId,
        'issuePeriod': this._issuePeriod,
        'updateAllowed': this._updateAllowed,

    };
}









}