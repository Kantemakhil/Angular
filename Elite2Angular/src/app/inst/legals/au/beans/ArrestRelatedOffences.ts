	export class ArrestRelatedOffences {
		 private _createUserId: string;
		 private _modifyDatetime: Date;
		 private _arrestId: number;
		 private _offenceType: string;
		 private _modifyUserId: string;
		 private _statuteCode: string;
		 private _arrestOffenceId: number;
		 private _serialVersionUID: number;
		 private _offenceCode: string;
		 private _caseInfoNumber: string;
		 private _offenceCounts: number;
		 private _offenceDate: Date;
		 private _createDate: Date;

		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get arrestId(): number{ return this._arrestId; }
		 set arrestId(parrestId: number){ this._arrestId = parrestId ;}
		 get offenceType(): string{ return this._offenceType; }
		 set offenceType(poffenceType: string){ this._offenceType = poffenceType ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get statuteCode(): string{ return this._statuteCode; }
		 set statuteCode(pstatuteCode: string){ this._statuteCode = pstatuteCode ;}
		 get arrestOffenceId(): number{ return this._arrestOffenceId; }
		 set arrestOffenceId(parrestOffenceId: number){ this._arrestOffenceId = parrestOffenceId ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get offenceCode(): string{ return this._offenceCode; }
		 set offenceCode(poffenceCode: string){ this._offenceCode = poffenceCode ;}
		 get caseInfoNumber(): string{ return this._caseInfoNumber; }
		 set caseInfoNumber(pcaseInfoNumber: string){ this._caseInfoNumber = pcaseInfoNumber ;}
		 get offenceCounts(): number{ return this._offenceCounts; }
		 set offenceCounts(poffenceCounts: number){ this._offenceCounts = poffenceCounts ;}
		 get offenceDate(): Date{ return this._offenceDate; }
		 set offenceDate(poffenceDate: Date){ this._offenceDate = poffenceDate ;}
		 get createDate(): Date{ return this._createDate; }
		 set createDate(pcreateDate: Date){ this._createDate = pcreateDate ;}

 	toJSON(): any {
 		return { 
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDatetime,
			'arrestId': this._arrestId,
			'offenceType': this._offenceType,
			'modifyUserId': this._modifyUserId,
			'statuteCode': this._statuteCode,
			'arrestOffenceId': this._arrestOffenceId,
			'serialVersionUID': this._serialVersionUID,
			'offenceCode': this._offenceCode,
			'caseInfoNumber': this._caseInfoNumber,
			'offenceCounts': this._offenceCounts,
			'offenceDate': this._offenceDate,
			'createDate': this._createDate,
 			};
 		} 
 }