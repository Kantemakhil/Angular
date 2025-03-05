	export class VOffExtMovements {
		 private _lastName: string;
		 private _escortCode: string;
		 private _offenderBookId: number;
		 private _movementTime: Date;
		 private _offenderIdDisplay: string;
		 private _commentText: string;
		 private _movementSeq: number;
		 private _serialVersionUID: number;
		 private _fromCityDesc: string;
		 private _movementType: string;
		 private _arrestAgencyLocId: string;
		 private _reportingTime: Date;
		 private _toAddressDesc: string;
		 private _escortText: string;
		 private _internalScheduleType: string;
		 private _toAgyLocId: string;
		 private _activeFlag: string;
		 private _movementReasonCode: string;
		 private _toAgyLocDesc: string;
		 private _internalScheduleReasonCode: string;
		 private _toCity: string;
		 private _movementDate: Date;
		 private _directionCode: string;
		 private _toProvStatCode: string;
		 private _firstName: string;
		 private _fromAddressId: number;
		 private _fromAgyLocId: string;
		 private _fromAddressDesc: string;
		 private _fromAgyLocDesc: string;
		 private _reportingDate: Date;
		 private _toCityDesc: string;
		 private _fromCity: string;
		 private _toAddressId: number;
		 private _fromMovementDate: Date;
		 private _toMovementDate: Date;
		
		 get lastName(): string{ return  this._lastName }

		 set lastName(plastName: string){ this._lastName = plastName }

		 get escortCode(): string{ return  this._escortCode }

		 set escortCode(pescortCode: string){ this._escortCode = pescortCode }

		 get offenderBookId(): number{ return  this._offenderBookId }

		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId }

		 get movementTime(): Date{ return  this._movementTime }

		 set movementTime(pmovementTime: Date){ this._movementTime = pmovementTime }

		 get offenderIdDisplay(): string{ return  this._offenderIdDisplay }

		 set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay }

		 get commentText(): string{ return  this._commentText }

		 set commentText(pcommentText: string){ this._commentText = pcommentText }

		 get movementSeq(): number{ return  this._movementSeq }

		 set movementSeq(pmovementSeq: number){ this._movementSeq = pmovementSeq }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get fromCityDesc(): string{ return  this._fromCityDesc }

		 set fromCityDesc(pfromCityDesc: string){ this._fromCityDesc = pfromCityDesc }

		 get movementType(): string{ return  this._movementType }

		 set movementType(pmovementType: string){ this._movementType = pmovementType }

		 get arrestAgencyLocId(): string{ return  this._arrestAgencyLocId }

		 set arrestAgencyLocId(parrestAgencyLocId: string){ this._arrestAgencyLocId = parrestAgencyLocId }

		 get reportingTime(): Date{ return  this._reportingTime }

		 set reportingTime(preportingTime: Date){ this._reportingTime = preportingTime }

		 get toAddressDesc(): string{ return  this._toAddressDesc }

		 set toAddressDesc(ptoAddressDesc: string){ this._toAddressDesc = ptoAddressDesc }

		 get escortText(): string{ return  this._escortText }

		 set escortText(pescortText: string){ this._escortText = pescortText }

		 get internalScheduleType(): string{ return  this._internalScheduleType }

		 set internalScheduleType(pinternalScheduleType: string){ this._internalScheduleType = pinternalScheduleType }

		 get toAgyLocId(): string{ return  this._toAgyLocId }

		 set toAgyLocId(ptoAgyLocId: string){ this._toAgyLocId = ptoAgyLocId }

		 get activeFlag(): string{ return  this._activeFlag }

		 set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag }

		 get movementReasonCode(): string{ return  this._movementReasonCode }

		 set movementReasonCode(pmovementReasonCode: string){ this._movementReasonCode = pmovementReasonCode }

		 get toAgyLocDesc(): string{ return  this._toAgyLocDesc }

		 set toAgyLocDesc(ptoAgyLocDesc: string){ this._toAgyLocDesc = ptoAgyLocDesc }

		 get internalScheduleReasonCode(): string{ return  this._internalScheduleReasonCode }

		 set internalScheduleReasonCode(pinternalScheduleReasonCode: string){ this._internalScheduleReasonCode = pinternalScheduleReasonCode }

		 get toCity(): string{ return  this._toCity }

		 set toCity(ptoCity: string){ this._toCity = ptoCity }

		 get movementDate(): Date{ return  this._movementDate }

		 set movementDate(pmovementDate: Date){ this._movementDate = pmovementDate }

		 get directionCode(): string{ return  this._directionCode }

		 set directionCode(pdirectionCode: string){ this._directionCode = pdirectionCode }

		 get toProvStatCode(): string{ return  this._toProvStatCode }

		 set toProvStatCode(ptoProvStatCode: string){ this._toProvStatCode = ptoProvStatCode }

		 get firstName(): string{ return  this._firstName }

		 set firstName(pfirstName: string){ this._firstName = pfirstName }

		 get fromAddressId(): number{ return  this._fromAddressId }

		 set fromAddressId(pfromAddressId: number){ this._fromAddressId = pfromAddressId }

		 get fromAgyLocId(): string{ return  this._fromAgyLocId }

		 set fromAgyLocId(pfromAgyLocId: string){ this._fromAgyLocId = pfromAgyLocId }

		 get fromAddressDesc(): string{ return  this._fromAddressDesc }

		 set fromAddressDesc(pfromAddressDesc: string){ this._fromAddressDesc = pfromAddressDesc }

		 get fromAgyLocDesc(): string{ return  this._fromAgyLocDesc }

		 set fromAgyLocDesc(pfromAgyLocDesc: string){ this._fromAgyLocDesc = pfromAgyLocDesc }

		 get reportingDate(): Date{ return  this._reportingDate }

		 set reportingDate(preportingDate: Date){ this._reportingDate = preportingDate }

		 get toCityDesc(): string{ return  this._toCityDesc }

		 set toCityDesc(ptoCityDesc: string){ this._toCityDesc = ptoCityDesc }

		 get fromCity(): string{ return  this._fromCity }

		 set fromCity(pfromCity: string){ this._fromCity = pfromCity }

		 get toAddressId(): number{ return  this._toAddressId }

		 set toAddressId(ptoAddressId: number){ this._toAddressId = ptoAddressId }

		 public get fromMovementDate(): Date { return this._fromMovementDate;}

		 public set fromMovementDate(value: Date) {this._fromMovementDate = value;}

		 public get toMovementDate(): Date { return this._toMovementDate;}

		 public set toMovementDate(value: Date) {this._toMovementDate = value;}



 	toJSON(): any {
 		return { 
			'lastName': this._lastName,
			'escortCode': this._escortCode,
			'offenderBookId': this._offenderBookId,
			'movementTime': this._movementTime,
			'offenderIdDisplay': this._offenderIdDisplay,
			'commentText': this._commentText,
			'movementSeq': this._movementSeq,
			'serialVersionUID': this._serialVersionUID,
			'fromCityDesc': this._fromCityDesc,
			'movementType': this._movementType,
			'arrestAgencyLocId': this._arrestAgencyLocId,
			'reportingTime': this._reportingTime,
			'toAddressDesc': this._toAddressDesc,
			'escortText': this._escortText,
			'internalScheduleType': this._internalScheduleType,
			'toAgyLocId': this._toAgyLocId,
			'activeFlag': this._activeFlag,
			'movementReasonCode': this._movementReasonCode,
			'toAgyLocDesc': this._toAgyLocDesc,
			'internalScheduleReasonCode': this._internalScheduleReasonCode,
			'toCity': this._toCity,
			'movementDate': this._movementDate,
			'directionCode': this._directionCode,
			'toProvStatCode': this._toProvStatCode,
			'firstName': this._firstName,
			'fromAddressId': this._fromAddressId,
			'fromAgyLocId': this._fromAgyLocId,
			'fromAddressDesc': this._fromAddressDesc,
			'fromAgyLocDesc': this._fromAgyLocDesc,
			'reportingDate': this._reportingDate,
			'toCityDesc': this._toCityDesc,
			'fromCity': this._fromCity,
			'toAddressId': this._toAddressId,
			'fromMovementDate': this._fromMovementDate,
			'toMovementDate': this._toMovementDate,
 			};
 		}  
 }