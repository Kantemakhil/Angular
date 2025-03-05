	export class CheckListCategories {
		 private _createDatetime: Date;
		 private _expiryDate: Date;
		 private _checkListCategory: string;
		 private _serialVersionUID: number;
		 private _createUserId: string;
		 private _modifyDatetime: Date;
		 private _caseloadId: string;
		 private _modifyUserId: string;
		 private _listSeq: number;
		 private _sealFlag: string;
		 private _updateAllowedFlag: string;
		 private _activeFlag: string;

		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get expiryDate(): Date{ return this._expiryDate; }
		 set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
		 get checkListCategory(): string{ return this._checkListCategory; }
		 set checkListCategory(pcheckListCategory: string){ this._checkListCategory = pcheckListCategory ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get caseloadId(): string{ return this._caseloadId; }
		 set caseloadId(pcaseloadId: string){ this._caseloadId = pcaseloadId ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get listSeq(): number{ return this._listSeq; }
		 set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get updateAllowedFlag(): string{ return this._updateAllowedFlag; }
		 set updateAllowedFlag(pupdateAllowedFlag: string){ this._updateAllowedFlag = pupdateAllowedFlag ;}
		 get activeFlag(): string{ return this._activeFlag; }
		 set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}

 	toJSON(): any {
 		return { 
			'createDatetime': this._createDatetime,
			'expiryDate': this._expiryDate,
			'checkListCategory': this._checkListCategory,
			'serialVersionUID': this._serialVersionUID,
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDatetime,
			'caseloadId': this._caseloadId,
			'modifyUserId': this._modifyUserId,
			'listSeq': this._listSeq,
			'sealFlag': this._sealFlag,
			'updateAllowedFlag': this._updateAllowedFlag,
			'activeFlag': this._activeFlag,
 			};
 		}  
 }