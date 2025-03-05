	export class CourtMovementTmp {
		 private _createUserId: string;
		 private _modifyDatetime: Date;
		 private _offenderBookId: number;
		 private _toLivingUnitId1: number;
		 private _movementTime: Date;
		 private _toLivingUnitId2: number;
		 private _modifyUserId: string;
		 private _movementDate: Date;
		 private _movementReason: string;
		 private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _livingUnitId2: number;
		 private _toLivingUnitId3: number;
		 private _agyLocId: string;
		 private _livingUnitId3: number;
		 private _toLivingUnitId4: number;
		 private _livingUnitId1: number;
		 private _sealFlag: string;
		 private _toAgyLocId: string;
		 private _livingUnitId4: number;
		 private _livingUnitCode1: string;
		 private _livingUnitCode2: string;
		 private _livingUnitCode3: string;
		 private _livingUnitCode4: string;
		 private _livingUnitCode5: string;
		 private _description: string;
		 private _code: string;

		 get createUserId(): string{ return  this._createUserId }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId }

		 get modifyDatetime(): Date{ return  this._modifyDatetime }

		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime }

		 get offenderBookId(): number{ return  this._offenderBookId }

		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId }

		 get toLivingUnitId1(): number{ return  this._toLivingUnitId1 }

		 set toLivingUnitId1(ptoLivingUnitId1: number){ this._toLivingUnitId1 = ptoLivingUnitId1 }

		 get movementTime(): Date{ return  this._movementTime }

		 set movementTime(pmovementTime: Date){ this._movementTime = pmovementTime }

		 get toLivingUnitId2(): number{ return  this._toLivingUnitId2 }

		 set toLivingUnitId2(ptoLivingUnitId2: number){ this._toLivingUnitId2 = ptoLivingUnitId2 }

		 get modifyUserId(): string{ return  this._modifyUserId }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId }

		 get movementDate(): Date{ return  this._movementDate }

		 set movementDate(pmovementDate: Date){ this._movementDate = pmovementDate }

		 get movementReason(): string{ return  this._movementReason }

		 set movementReason(pmovementReason: string){ this._movementReason = pmovementReason }

		 get createDatetime(): Date{ return  this._createDatetime }

		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get livingUnitId2(): number{ return  this._livingUnitId2 }

		 set livingUnitId2(plivingUnitId2: number){ this._livingUnitId2 = plivingUnitId2 }

		 get toLivingUnitId3(): number{ return  this._toLivingUnitId3 }

		 set toLivingUnitId3(ptoLivingUnitId3: number){ this._toLivingUnitId3 = ptoLivingUnitId3 }

		 get agyLocId(): string{ return  this._agyLocId }

		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId }

		 get livingUnitId3(): number{ return  this._livingUnitId3 }

		 set livingUnitId3(plivingUnitId3: number){ this._livingUnitId3 = plivingUnitId3 }

		 get toLivingUnitId4(): number{ return  this._toLivingUnitId4 }

		 set toLivingUnitId4(ptoLivingUnitId4: number){ this._toLivingUnitId4 = ptoLivingUnitId4 }

		 get livingUnitId1(): number{ return  this._livingUnitId1 }

		 set livingUnitId1(plivingUnitId1: number){ this._livingUnitId1 = plivingUnitId1 }

		 get livingUnitCode1(): string { return  this._livingUnitCode1; }
		 
		 set livingUnitCode1(plivingUnitCode1: string) { this._livingUnitCode1 = plivingUnitCode1; }

		 get sealFlag(): string{ return  this._sealFlag }

		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag }

		 get toAgyLocId(): string{ return  this._toAgyLocId }

		 set toAgyLocId(ptoAgyLocId: string){ this._toAgyLocId = ptoAgyLocId }

		 get livingUnitId4(): number{ return  this._livingUnitId4 }

		 set livingUnitId4(plivingUnitId4: number){ this._livingUnitId4 = plivingUnitId4 }

		 get livingUnitCode2(): string { return  this._livingUnitCode2; }
		 
		 set livingUnitCode2(plivingUnitCode2: string) { this._livingUnitCode2 = plivingUnitCode2; }

		 get livingUnitCode3(): string { return  this._livingUnitCode3; }
		 
		 set livingUnitCode3(plivingUnitCode3: string) { this._livingUnitCode3 = plivingUnitCode3; }

		 get livingUnitCode4(): string { return  this._livingUnitCode4; }
		 
		 set livingUnitCode4(plivingUnitCode4: string) { this._livingUnitCode4 = plivingUnitCode4; }

		 get livingUnitCode5(): string { return  this._livingUnitCode5; }
		 
		 set livingUnitCode5(plivingUnitCode5: string) { this._livingUnitCode5 = plivingUnitCode5; }

		 get description(): string { return  this._description; }
		 
		 set description(pdescription: string) { this._description = pdescription; }

		 get code(): string { return  this._description; }
		 
		 set code(pCode: string) { this._code = pCode; }



 	toJSON(): any {
 		return { 
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDatetime,
			'offenderBookId': this._offenderBookId,
			'toLivingUnitId1': this._toLivingUnitId1,
			'movementTime': this._movementTime,
			'toLivingUnitId2': this._toLivingUnitId2,
			'modifyUserId': this._modifyUserId,
			'movementDate': this._movementDate,
			'movementReason': this._movementReason,
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'livingUnitId2': this._livingUnitId2,
			'toLivingUnitId3': this._toLivingUnitId3,
			'agyLocId': this._agyLocId,
			'livingUnitId3': this._livingUnitId3,
			'toLivingUnitId4': this._toLivingUnitId4,
			'livingUnitId1': this._livingUnitId1,
			'livingUnitCode1': this._livingUnitCode1,
			'sealFlag': this._sealFlag,
			'toAgyLocId': this._toAgyLocId,
			'livingUnitId4': this._livingUnitId4,
			'livingUnitCode2': this._livingUnitCode2,
			'livingUnitCode3': this._livingUnitCode3,
			'livingUnitCode4': this._livingUnitCode4,
			'livingUnitCode5': this._livingUnitCode5,
			'description': this._description,
			'code': this._code,
 			};
 		}
 }
