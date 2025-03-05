	export class LegalUpdateUsages {
		 private _createDatetime: Date;
		 private _expiryDate: Date;
		 private _legalClass: string;
		 private _serialVersionUID: number;
		 private _createUserId: string;
		 private _modifyDatetime: Date;
		 private _modifyUserId: string;
		 private _listSeq: number;
		 private _sealFlag: string;
		 private _updateReasonCode: string;
		 private _activeFlag: string;
		 private _reasonCatergory: string;
		 private _description: string;
		 private _activeType: string;

		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get expiryDate(): Date{ return this._expiryDate; }
		 set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
		 get legalClass(): string{ return this._legalClass; }
		 set legalClass(plegalClass: string){ this._legalClass = plegalClass ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get listSeq(): number{ return this._listSeq; }
		 set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get updateReasonCode(): string{ return this._updateReasonCode; }
		 set updateReasonCode(pupdateReasonCode: string){ this._updateReasonCode = pupdateReasonCode ;}
		 get activeFlag(): string{ return this._activeFlag; }
		 set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
		 get reasonCatergory(): string{ return this._reasonCatergory; }
		 set reasonCatergory(preasonCatergory: string){ this._reasonCatergory = preasonCatergory ;}
		 get description(): string{ return this._description; }
		 set description(pdescription: string){ this._description = pdescription ;}
		 get activeType(): string{ return this._activeType; }
		 set activeType(pactiveType: string){ this._activeType = pactiveType ;}

 	toJSON(): any {
 		return { 
			'createDatetime': this._createDatetime,
			'expiryDate': this._expiryDate,
			'legalClass': this._legalClass,
			'serialVersionUID': this._serialVersionUID,
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'listSeq': this._listSeq,
			'sealFlag': this._sealFlag,
			'updateReasonCode': this._updateReasonCode,
			'activeFlag': this._activeFlag,
			'reasonCatergory': this._reasonCatergory,
			'description': this._description,
			'activeType': this._activeType,
 			};
 		}  
 }