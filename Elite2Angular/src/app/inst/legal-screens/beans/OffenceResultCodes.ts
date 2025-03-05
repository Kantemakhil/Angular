	export class OffenceResultCodes {
		 private _createUserId: string;
		 private _modifyDatetime: Date;
		 private _resultCode: string;
		 private _modifyUserId: string;
		 private _description: string;
		 private _chargeStatus: string;
		 private _dispositionCode: string;
		 private _createDatetime: Date;
		 private _expiryDate: Date;
		 private _serialVersionUID: number;
		 private _convictionFlag: string;
		 private _listSeq: number;
		 private _sealFlag: string;
		 private _activeFlag: string;

		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get resultCode(): string{ return this._resultCode; }
		 set resultCode(presultCode: string){ this._resultCode = presultCode ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get description(): string{ return this._description; }
		 set description(pdescription: string){ this._description = pdescription ;}
		 get chargeStatus(): string{ return this._chargeStatus; }
		 set chargeStatus(pchargeStatus: string){ this._chargeStatus = pchargeStatus ;}
		 get dispositionCode(): string{ return this._dispositionCode; }
		 set dispositionCode(pdispositionCode: string){ this._dispositionCode = pdispositionCode ;}
		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get expiryDate(): Date{ return this._expiryDate; }
		 set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get convictionFlag(): string{ return this._convictionFlag; }
		 set convictionFlag(pconvictionFlag: string){ this._convictionFlag = pconvictionFlag ;}
		 get listSeq(): number{ return this._listSeq; }
		 set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get activeFlag(): string{ return this._activeFlag; }
		 set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}

 	toJSON(): any {
 		return { 
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDatetime,
			'resultCode': this._resultCode,
			'modifyUserId': this._modifyUserId,
			'description': this._description,
			'chargeStatus': this._chargeStatus,
			'dispositionCode': this._dispositionCode,
			'createDatetime': this._createDatetime,
			'expiryDate': this._expiryDate,
			'serialVersionUID': this._serialVersionUID,
			'convictionFlag': this._convictionFlag,
			'listSeq': this._listSeq,
			'sealFlag': this._sealFlag,
			'activeFlag': this._activeFlag,
 			};
 		}  
 }