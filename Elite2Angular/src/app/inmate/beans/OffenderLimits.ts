  export class OffenderLimits {
     private _createUserId: string;
     private _modifyDate: Date;
     private _modifyDatetime: Date;
     private _modifyUserId: string;
     private _createDatetime: Date;
     private _serialVersionUID: number;
     private _periodType: string;
     private _caseloadId: string;
     private _limitAmount: number;
     private _listSeq: number;
     private _offenderId: number;
     private _limitType: string;
     private _sealFlag: string;

     get createUserId(): string{ return this._createUserId; }
     set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
     get modifyDate(): Date{ return this._modifyDate; }
     set modifyDate(pmodifyDate: Date){ this._modifyDate = pmodifyDate ;}
     get modifyDatetime(): Date{ return this._modifyDatetime; }
     set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
     get modifyUserId(): string{ return this._modifyUserId; }
     set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
     get createDatetime(): Date{ return this._createDatetime; }
     set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
     get serialVersionUID(): number{ return this._serialVersionUID; }
     set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
     get periodType(): string{ return this._periodType; }
     set periodType(pperiodType: string){ this._periodType = pperiodType ;}
     get caseloadId(): string{ return this._caseloadId; }
     set caseloadId(pcaseloadId: string){ this._caseloadId = pcaseloadId ;}
     get limitAmount(): number{ return this._limitAmount; }
     set limitAmount(plimitAmount: number){ this._limitAmount = plimitAmount ;}
     get listSeq(): number{ return this._listSeq; }
     set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
     get offenderId(): number{ return this._offenderId; }
     set offenderId(poffenderId: number){ this._offenderId = poffenderId ;}
     get limitType(): string{ return this._limitType; }
     set limitType(plimitType: string){ this._limitType = plimitType ;}
     get sealFlag(): string{ return this._sealFlag; }
     set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}

   toJSON(): any {
     return {
      'createUserId': this._createUserId,
      'modifyDate': this._modifyDate,
      'modifyDatetime': this._modifyDatetime,
      'modifyUserId': this._modifyUserId,
      'createDatetime': this._createDatetime,
      'serialVersionUID': this._serialVersionUID,
      'periodType': this._periodType,
      'caseloadId': this._caseloadId,
      'limitAmount': this._limitAmount,
      'listSeq': this._listSeq,
      'offenderId': this._offenderId,
      'limitType': this._limitType,
      'sealFlag': this._sealFlag,
       };
     }  
 }