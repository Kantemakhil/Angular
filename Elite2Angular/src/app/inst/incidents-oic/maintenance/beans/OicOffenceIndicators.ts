export class OicOffenceIndicators {
    private _serialVersionUID: number;
    private _createUserId: string;
    private _oicOffenceIndicatorId: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _indicatorCode: string;
    private _sealFlag: string;
    private _oicOffenceId: number;
    private _createDatetime: Date;

    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get oicOffenceIndicatorId(): number{ return this._oicOffenceIndicatorId; }
    set oicOffenceIndicatorId(poicOffenceIndicatorId: number){ this._oicOffenceIndicatorId = poicOffenceIndicatorId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get indicatorCode(): string{ return this._indicatorCode; }
    set indicatorCode(pindicatorCode: string){ this._indicatorCode = pindicatorCode ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get oicOffenceId(): number{ return this._oicOffenceId; }
    set oicOffenceId(poicOffenceId: number){ this._oicOffenceId = poicOffenceId ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}

toJSON(): any {
    return { 
       'createUserId': this._createUserId,
       'oicOffenceIndicatorId': this._oicOffenceIndicatorId,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'indicatorCode': this._indicatorCode,
       'sealFlag': this._sealFlag,
       'oicOffenceId': this._oicOffenceId,
       'createDatetime': this._createDatetime,
        };
    }  
}
