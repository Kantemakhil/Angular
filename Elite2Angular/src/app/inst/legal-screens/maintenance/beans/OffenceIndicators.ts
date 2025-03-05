export class OffenceIndicators{

    private _offenceIndicatorId: number;
		private _createDatetime: Date;
		private _createUserId: string;
		 private _indicatorCode: string;
		 private _modifyDatetime: Date;
         private _modifyUserId: string;
         private _sealFlag: string;
         private _offence: string;
         private _offenceCode: string;
        private _statuteCode: string;
        private  _offenceId: number;



    get offenceCode(): string{ return this._offenceCode; }
    set offenceCode(poffenceCode: string){ this._offenceCode = poffenceCode ;}
    
    get statuteCode(): string{ return this._statuteCode; }
    set statuteCode(pstatuteCode: string){ this._statuteCode = pstatuteCode ;}

         get createDatetime(): Date{ return this._createDatetime; }
         set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}

         get createUserId(): string{ return this._createUserId; }
         set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
         
         get indicatorCode(): string{ return this._indicatorCode; }
         set indicatorCode(pindicatorCode: string){ this._indicatorCode = pindicatorCode ;}
         
         get modifyDatetime(): Date{ return this._modifyDatetime; }
         set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
         
         get modifyUserId(): string{ return this._modifyUserId; }
         set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
         
         get sealFlag(): string{ return this._sealFlag; }
         set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
         
         get offence(): string{ return this._offence; }
         set offence(poffence: string){ this._offence = poffence ;}
         
         get offenceIndicatorId(): number{ return this._offenceIndicatorId; }
         set offenceIndicatorId(poffenceIndicatorId: number){ this._offenceIndicatorId = poffenceIndicatorId ;}

         get offenceId(): number{ return this._offenceId; }
         set offenceId(offenceId: number){ this._offenceId = offenceId ;}

         toJSON(): any {
            return { 
               'createUserId': this._createUserId,
               'createDatetime':this._createDatetime,
               'modifyDatetime': this._modifyDatetime,
               'modifyUserId': this._modifyUserId,
               'indicatorCode': this._indicatorCode,
               'sealFlag': this._sealFlag,
               'offence': this._offence,
               'offenceIndicatorId': this._offenceIndicatorId,
               'offenceCode': this._offenceCode,
               'statuteCode': this._statuteCode,
               'offenceId': this._offenceId
}
         }
        }
        