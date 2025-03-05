export class AllowableOffenceTypes{
    private _offenceCode: string;
    private _statuteCode: string;
    private _offenceType: string;
     private _recommendedBailAmount: number;
     private _bailAllowedFlag: string;
     private _createDatetime: Date;
     private _createUserId: string;
     private _modifyDatetime: Date;
     private _modifyUserId: string;
     private _sealFlag: string;
     private  _offenceId: number;
     
     get createDatetime(): Date{ return this._createDatetime; }
     set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}

     get createUserId(): string{ return this._createUserId; }
     set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
     
     get bailAllowedFlag(): string{ return this._bailAllowedFlag; }
     set bailAllowedFlag(pbailAllowedFlag: string){ this._bailAllowedFlag = pbailAllowedFlag ;}
     
     get modifyDatetime(): Date{ return this._modifyDatetime; }
     set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
     
     get modifyUserId(): string{ return this._modifyUserId; }
     set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
     
     get recommendedBailAmount(): number{ return this._recommendedBailAmount; }
     set recommendedBailAmount(precommendedBailAmount: number){ this._recommendedBailAmount = precommendedBailAmount ;}
     
     get offenceType(): string{ return this._offenceType; }
     set offenceType(poffenceType: string){ this._offenceType = poffenceType ;}
     
     get statuteCode(): string{ return this._statuteCode; }
     set statuteCode(pstatuteCode: string){ this._statuteCode = pstatuteCode ;}

     get sealFlag(): string{ return this._sealFlag; }
     set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
     
     get offenceCode(): string{ return this._offenceCode; }
     set offenceCode(poffenceCode: string){ this._offenceCode = poffenceCode ;}

     get offenceId(): number{ return this._offenceId; }
     set offenceId(offenceId: number){ this._offenceId = offenceId ;}

     toJSON(): any {
        return { 
           'createUserId': this._createUserId,
           'createDatetime':this._createDatetime,
           'modifyDatetime': this._modifyDatetime,
           'modifyUserId': this._modifyUserId,
           'bailAllowedFlag': this._bailAllowedFlag,
           'recommendedBailAmount': this._recommendedBailAmount,
           'offenceType': this._offenceType,
           'statuteCode': this._statuteCode,
           'sealFlag': this._sealFlag,
           'offenceCode': this._offenceCode,
           'offenceId': this._offenceId
}
     }
}