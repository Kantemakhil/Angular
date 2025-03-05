	export class CorporateTypes {
  private _createDatetime: Date;
  private _serialVersionUID: number;
  private _createUserId: string;
  private _modifyDatetime: Date;
  private _modifyUserId: string;
  private _sealFlag: string;
  private _corporateType: string;
  private _corporateId: number;

  get createDatetime(): Date{ return this._createDatetime; }
  set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
  get serialVersionUID(): number{ return this._serialVersionUID; }
  set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
  get createUserId(): string{ return this._createUserId; }
  set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
  get modifyDatetime(): Date{ return this._modifyDatetime; }
  set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
  get modifyUserId(): string{ return this._modifyUserId; }
  set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
  get sealFlag(): string{ return this._sealFlag; }
  set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
  get corporateType(): string{ return this._corporateType; }
  set corporateType(pcorporateType: string){ this._corporateType = pcorporateType ;}
  get corporateId(): number{ return this._corporateId; }
  set corporateId(pcorporateId: number){ this._corporateId = pcorporateId ;}

 	toJSON(): any {
  return { 
  'createDatetime': this._createDatetime,
  'serialVersionUID': this._serialVersionUID,
  'createUserId': this._createUserId,
  'modifyDatetime': this._modifyDatetime,
  'modifyUserId': this._modifyUserId,
  'sealFlag': this._sealFlag,
  'corporateType': this._corporateType,
  'corporateId': this._corporateId,
  	};
  }  
 }