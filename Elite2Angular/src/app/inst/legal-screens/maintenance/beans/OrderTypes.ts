	export class OrderTypes {
		 private _orderType: string;
		 private _custodyDays: number;
		 private _createUserId: string;
		 private _modifyDatetime: Date;
		 private _chargesFlag: string;
		 private _youthOrderFlag: string;
		 private _modifyUserId: string;
		 private _description: string;
		 private _caseloadType: string;
		 private _noOfHoldDays: number;
		 private _createDatetime: Date;
		 private _expiryDate: Date;
		 private _severityRank: number;
		 private _serialVersionUID: number;
		 private _custodyFlag: string;
		 private _timeSensitiveFlag: string;
		 private _listSeq: number;
		 private _sealFlag: string;
		 private _updateAllowedFlag: string;
		 private _orderCategory: string;
		 private _scheduleFlag: string;
		 private _activeFlag: string;

		 get orderType(): string{ return this._orderType; }
		 set orderType(porderType: string){ this._orderType = porderType ;}
		 get custodyDays(): number{ return this._custodyDays; }
		 set custodyDays(pcustodyDays: number){ this._custodyDays = pcustodyDays ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get chargesFlag(): string{ return this._chargesFlag; }
		 set chargesFlag(pchargesFlag: string){ this._chargesFlag = pchargesFlag ;}
		 get youthOrderFlag(): string{ return this._youthOrderFlag; }
		 set youthOrderFlag(pyouthOrderFlag: string){ this._youthOrderFlag = pyouthOrderFlag ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get description(): string{ return this._description; }
		 set description(pdescription: string){ this._description = pdescription ;}
		 get caseloadType(): string{ return this._caseloadType; }
		 set caseloadType(pcaseloadType: string){ this._caseloadType = pcaseloadType ;}
		 get noOfHoldDays(): number{ return this._noOfHoldDays; }
		 set noOfHoldDays(pnoOfHoldDays: number){ this._noOfHoldDays = pnoOfHoldDays ;}
		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get expiryDate(): Date{ return this._expiryDate; }
		 set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
		 get severityRank(): number{ return this._severityRank; }
		 set severityRank(pseverityRank: number){ this._severityRank = pseverityRank ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get custodyFlag(): string{ return this._custodyFlag; }
		 set custodyFlag(pcustodyFlag: string){ this._custodyFlag = pcustodyFlag ;}
		 get timeSensitiveFlag(): string{ return this._timeSensitiveFlag; }
		 set timeSensitiveFlag(ptimeSensitiveFlag: string){ this._timeSensitiveFlag = ptimeSensitiveFlag ;}
		 get listSeq(): number{ return this._listSeq; }
		 set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get updateAllowedFlag(): string{ return this._updateAllowedFlag; }
		 set updateAllowedFlag(pupdateAllowedFlag: string){ this._updateAllowedFlag = pupdateAllowedFlag ;}
		 get orderCategory(): string{ return this._orderCategory; }
		 set orderCategory(porderCategory: string){ this._orderCategory = porderCategory ;}
		 get scheduleFlag(): string{ return this._scheduleFlag; }
		 set scheduleFlag(pscheduleFlag: string){ this._scheduleFlag = pscheduleFlag ;}
		 get activeFlag(): string{ return this._activeFlag; }
		 set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}

 	toJSON(): any {
 		return { 
			'orderType': this._orderType,
			'custodyDays': this._custodyDays,
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDatetime,
			'chargesFlag': this._chargesFlag,
			'youthOrderFlag': this._youthOrderFlag,
			'modifyUserId': this._modifyUserId,
			'description': this._description,
			'caseloadType': this._caseloadType,
			'noOfHoldDays': this._noOfHoldDays,
			'createDatetime': this._createDatetime,
			'expiryDate': this._expiryDate,
			'severityRank': this._severityRank,
			'serialVersionUID': this._serialVersionUID,
			'custodyFlag': this._custodyFlag,
			'timeSensitiveFlag': this._timeSensitiveFlag,
			'listSeq': this._listSeq,
			'sealFlag': this._sealFlag,
			'updateAllowedFlag': this._updateAllowedFlag,
			'orderCategory': this._orderCategory,
			'scheduleFlag': this._scheduleFlag,
			'activeFlag': this._activeFlag,
 			};
 		}  
 }