import { BaseModel } from "@common/beans/BaseModel";

export class FeeAccounts extends BaseModel {
    private _createDatetime: Date;
    private _accountCode: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _feeCode: string;
    private _modifyUserId: string;
    private _listSeq: number;
    private _recordDatetime: Date;
    private _expiryDatetime: Date;
    private _sealFlag: string;
    private _amount: number;

    get createDatetime(): Date{ return  this._createDatetime; }

    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime; }

    get accountCode(): number{ return  this._accountCode; }

    set accountCode(paccountCode: number){ this._accountCode = paccountCode; }

    get createUserId(): string{ return  this._createUserId; }

    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date{ return  this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime; }

    get feeCode(): string{ return  this._feeCode; }

    set feeCode(pfeeCode: string){ this._feeCode = pfeeCode; }

    get modifyUserId(): string{ return  this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

    get listSeq(): number{ return  this._listSeq; }

    set listSeq(plistSeq: number){ this._listSeq = plistSeq; }

    get recordDatetime(): Date{ return  this._recordDatetime; }

    set recordDatetime(precordDatetime: Date){ this._recordDatetime = precordDatetime; }

    get expiryDatetime(): Date{ return  this._expiryDatetime; }

    set expiryDatetime(pexpiryDatetime: Date){ this._expiryDatetime = pexpiryDatetime; }

    get sealFlag(): string{ return  this._sealFlag; }

    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }

    get amount(): number{ return  this._amount; }

    set amount(pamount: number){ this._amount = pamount; }


toJSON(): any {
    return { 
       'createDatetime': this._createDatetime,
       'accountCode': this._accountCode,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'feeCode': this._feeCode,
       'modifyUserId': this._modifyUserId,
       'listSeq': this._listSeq,
       'recordDatetime': this._recordDatetime,
       'expiryDatetime': this._expiryDatetime,
       'sealFlag': this._sealFlag,
       'amount': this._amount,
        };
    }  
}