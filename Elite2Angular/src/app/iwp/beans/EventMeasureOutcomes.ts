import { BaseModel } from "@common/beans/BaseModel";

export class EventMeasureOutcomes extends BaseModel {
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _promptUserFlag: string;
    private _setCounterFlag: string;
    private _updateOnContactLog: string;
    private _modifyUserId: string;
    private _outcomeCode: string;
    private _eventMeasureId: number;
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _listSeq: number;
    private _updateAllowedFlag: string;
    private _sealFlag: string;
    private _activeFlag: string;
    private _createDate: Date;
    private _rowId: string;
    private _cancelFlag: string;

    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get promptUserFlag(): string{ return this._promptUserFlag; }
    set promptUserFlag(ppromptUserFlag: string){ this._promptUserFlag = ppromptUserFlag ;}
    get setCounterFlag(): string{ return this._setCounterFlag; }
    set setCounterFlag(psetCounterFlag: string){ this._setCounterFlag = psetCounterFlag ;}
    get updateOnContactLog(): string{ return this._updateOnContactLog; }
    set updateOnContactLog(pupdateOnContactLog: string){ this._updateOnContactLog = pupdateOnContactLog ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get outcomeCode(): string{ return this._outcomeCode; }
    set outcomeCode(poutcomeCode: string){ this._outcomeCode = poutcomeCode ;}
    get eventMeasureId(): number{ return this._eventMeasureId; }
    set eventMeasureId(peventMeasureId: number){ this._eventMeasureId = peventMeasureId ;}
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get listSeq(): number{ return this._listSeq; }
    set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
    get updateAllowedFlag(): string{ return this._updateAllowedFlag; }
    set updateAllowedFlag(pupdateAllowedFlag: string){ this._updateAllowedFlag = pupdateAllowedFlag ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
    get createDate(): Date{ return this._createDate; }
    set createDate(pcreateDate: Date){ this._createDate = pcreateDate ;}
    get rowId(): string{ return this._rowId; }
    set rowId(prowId: string){ this._rowId = prowId ;}
    get cancelFlag(): string{ return this._cancelFlag; }
    set cancelFlag(pcancelFlag: string){ this._cancelFlag = pcancelFlag ;}

toJSON(): any {
    return { 
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'promptUserFlag': this._promptUserFlag,
       'setCounterFlag': this._setCounterFlag,
       'updateOnContactLog': this._updateOnContactLog,
       'modifyUserId': this._modifyUserId,
       'outcomeCode': this._outcomeCode,
       'eventMeasureId': this._eventMeasureId,
       'expiryDate': this._expiryDate,
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'listSeq': this._listSeq,
       'updateAllowedFlag': this._updateAllowedFlag,
       'sealFlag': this._sealFlag,
       'activeFlag': this._activeFlag,
       'createDate': this._createDate,
       'rowId': this._rowId,
       'cancelFlag':this._cancelFlag
        };
    } 
}