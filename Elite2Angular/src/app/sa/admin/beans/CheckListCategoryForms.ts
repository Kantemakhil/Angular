	export class CheckListCategoryForms {
		 private _createDatetime: Date;
		 private _checkListCategory: string;
		 private _serialVersionUID: number;
		 private _createUserId: string;
		 private _modifyDatetime: Date;
		 private _caseloadId: string;
		 private _modifyUserId: string;
		 private _moduleName: string;
		 private _sealFlag: string;

		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
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
		 get moduleName(): string{ return this._moduleName; }
		 set moduleName(pmoduleName: string){ this._moduleName = pmoduleName ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}

 	toJSON(): any {
 		return { 
			'createDatetime': this._createDatetime,
			'checkListCategory': this._checkListCategory,
			'serialVersionUID': this._serialVersionUID,
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDatetime,
			'caseloadId': this._caseloadId,
			'modifyUserId': this._modifyUserId,
			'moduleName': this._moduleName,
			'sealFlag': this._sealFlag,
 			};
 		}  
 }