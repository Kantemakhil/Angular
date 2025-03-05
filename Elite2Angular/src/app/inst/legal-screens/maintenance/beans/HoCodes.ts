export class HoCodes {
    private _hoCode: string;
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _description: string;
    private _sealFlag: string;
    private _activeFlag: string;
    private _createDate: Date;
    private _returnValue:number;

    get hoCode(): string{ return this._hoCode; }
    set hoCode(phoCode: string){ this._hoCode = phoCode ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get description(): string{ return this._description; }
    set description(pdescription: string){ this._description = pdescription ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
    get createDate(): Date{ return this._createDate; }
    set createDate(pcreateDate: Date){ this._createDate = pcreateDate ;}
    get returnValue(): number{ return  this._returnValue; }
    set returnValue(preturnValue: number){ this._returnValue = preturnValue; }

toJSON(): any {
    return { 
       'hoCode': this._hoCode,
       'createDatetime': this._createDatetime,
       'expiryDate': this._expiryDate,
       'serialVersionUID': this._serialVersionUID,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'description': this._description,
       'sealFlag': this._sealFlag,
       'activeFlag': this._activeFlag,
       'createDate': this._createDate,
       'returnValue': this._returnValue,
        };
    }  
}