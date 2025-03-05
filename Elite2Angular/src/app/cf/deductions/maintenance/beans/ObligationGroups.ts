	export class ObligationGroups {
		 private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _createUserId: string;
		 private _groupDescription: string;
		 private _modifyDatetime: Date;
		 private _groupId: number;
		 private _modifyUserId: string;
		 private _sealFlag: string;
		 private _groupCode: string;

		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get groupDescription(): string{ return this._groupDescription; }
		 set groupDescription(pgroupDescription: string){ this._groupDescription = pgroupDescription ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get groupId(): number{ return this._groupId; }
		 set groupId(pgroupId: number){ this._groupId = pgroupId ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get groupCode(): string{ return this._groupCode; }
		 set groupCode(pgroupCode: string){ this._groupCode = pgroupCode ;}

 	toJSON(): any {
 		return { 
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'createUserId': this._createUserId,
			'groupDescription': this._groupDescription,
			'modifyDatetime': this._modifyDatetime,
			'groupId': this._groupId,
			'modifyUserId': this._modifyUserId,
			'sealFlag': this._sealFlag,
			'groupCode': this._groupCode,
 			};
 		}  
 }