	export class GroupedObligations {
		 private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _createUserId: string;
		 private _sanctionNoticeCode: string;
		 private _modifyDatetime: Date;
		 private _deductionType: string;
		 private _groupId: number;
		 private _modifyUserId: string;
		 private _sealFlag: string;

		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get sanctionNoticeCode(): string{ return this._sanctionNoticeCode; }
		 set sanctionNoticeCode(psanctionNoticeCode: string){ this._sanctionNoticeCode = psanctionNoticeCode ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get deductionType(): string{ return this._deductionType; }
		 set deductionType(pdeductionType: string){ this._deductionType = pdeductionType ;}
		 get groupId(): number{ return this._groupId; }
		 set groupId(pgroupId: number){ this._groupId = pgroupId ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}

 	toJSON(): any {
 		return { 
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'createUserId': this._createUserId,
			'sanctionNoticeCode': this._sanctionNoticeCode,
			'modifyDatetime': this._modifyDatetime,
			'deductionType': this._deductionType,
			'groupId': this._groupId,
			'modifyUserId': this._modifyUserId,
			'sealFlag': this._sealFlag,
 			};
 		}  
 }