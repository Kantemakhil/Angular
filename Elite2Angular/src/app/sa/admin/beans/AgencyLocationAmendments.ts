	export class AgencyLocationAmendments {
		 private _agyLocAmendId: number;
		 private _newValue: string;
		 private _createUserId: string;
		 private _modifyDatetime: Date;
		 private _modifyUserId: string;
		 private _originalValue: string;
		 private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _field: string;
		 private _amendUser: string;
		 private _agyLocId: string;
		 private _amendDatetime: Date;
		 private _sealFlag: string;

		 get agyLocAmendId(): number{ return this._agyLocAmendId; }
		 set agyLocAmendId(pagyLocAmendId: number){ this._agyLocAmendId = pagyLocAmendId ;}
		 get newValue(): string{ return this._newValue; }
		 set newValue(pnewValue: string){ this._newValue = pnewValue ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get originalValue(): string{ return this._originalValue; }
		 set originalValue(poriginalValue: string){ this._originalValue = poriginalValue ;}
		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get field(): string{ return this._field; }
		 set field(pfield: string){ this._field = pfield ;}
		 get amendUser(): string{ return this._amendUser; }
		 set amendUser(pamendUser: string){ this._amendUser = pamendUser ;}
		 get agyLocId(): string{ return this._agyLocId; }
		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
		 get amendDatetime(): Date{ return this._amendDatetime; }
		 set amendDatetime(pamendDatetime: Date){ this._amendDatetime = pamendDatetime ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}

 	toJSON(): any {
 		return { 
			'agyLocAmendId': this._agyLocAmendId,
			'newValue': this._newValue,
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'originalValue': this._originalValue,
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'field': this._field,
			'amendUser': this._amendUser,
			'agyLocId': this._agyLocId,
			'amendDatetime': this._amendDatetime,
			'sealFlag': this._sealFlag,
 			};
 		}  
 }