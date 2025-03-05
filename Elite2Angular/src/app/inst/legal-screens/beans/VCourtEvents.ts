
export class VCourtEvents {
		 private _lastName: string;
		 private _movementReasonDesc: string;
		 private _level1Code: string;
		 private _offenderAgyLocId: string;
		 private _offenderBookId: number;
		 private _offenderIdDisplay: string;
		 private _resultCode: string;
		 private _offenderAgyLocDesc: string;
		 private _commentText: string;
		 private _livingUnitId: number;
		 private _serialVersionUID: number;
		 private _caseId: number;
		 private _bookingActiveFlag: string;
		 private _startTime: Date;
		 private _parentEventId: number;
		 private _courtEventType: string;
		 private _level4Code: string;
		 private _caseInfoPrefix: string;
		 private _eventId: number;
		 private _eventClass: string;
		 private _movementReasonCode: string;
		 private _judgeName: string;
		 private _courtEventTypeDesc: string;
		 private _level3Code: string;
		 private _eventType: string;
		 private _agyLocIdName: string;
		 private _birthDate: Date;
		 private _firstName: string;
		 private _caseInfoNumber: string;
		 private _eventOutcome: string;
		 private _eventStatus: string;
		 private _agyLocId: string;
		 private _checkSum: number;
		 private _middleName: string;
		 private _endTime: Date;
		 private _level2Code: string;
		 private _eventDate: Date;
		 private _appearanceLocation: string;
		 private _appearanceType: string;

		 private _outcomeReasonCode: string;
		 private _cancelFlag: boolean;

	

		 get lastName(): string{ return  this._lastName }

		 set lastName(plastName: string){ this._lastName = plastName }

		 get movementReasonDesc(): string{ return  this._movementReasonDesc }

		 set movementReasonDesc(pmovementReasonDesc: string){ this._movementReasonDesc = pmovementReasonDesc }

		 get level1Code(): string{ return  this._level1Code }

		 set level1Code(plevel1Code: string){ this._level1Code = plevel1Code }

		 get offenderAgyLocId(): string{ return  this._offenderAgyLocId }

		 set offenderAgyLocId(poffenderAgyLocId: string){ this._offenderAgyLocId = poffenderAgyLocId }

		 get offenderBookId(): number{ return  this._offenderBookId }

		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId }

		 get offenderIdDisplay(): string{ return  this._offenderIdDisplay }

		 set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay }

		 get resultCode(): string{ return  this._resultCode }

		 set resultCode(presultCode: string){ this._resultCode = presultCode }

		 get offenderAgyLocDesc(): string{ return  this._offenderAgyLocDesc }

		 set offenderAgyLocDesc(poffenderAgyLocDesc: string){ this._offenderAgyLocDesc = poffenderAgyLocDesc }

		 get commentText(): string{ return  this._commentText }

		 set commentText(pcommentText: string){ this._commentText = pcommentText }

		 get livingUnitId(): number{ return  this._livingUnitId }

		 set livingUnitId(plivingUnitId: number){ this._livingUnitId = plivingUnitId }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get caseId(): number{ return  this._caseId }

		 set caseId(pcaseId: number){ this._caseId = pcaseId }

		 get bookingActiveFlag(): string{ return  this._bookingActiveFlag }

		 set bookingActiveFlag(pbookingActiveFlag: string){ this._bookingActiveFlag = pbookingActiveFlag }

		 get startTime(): Date{ return  this._startTime }

		 set startTime(pstartTime: Date){ this._startTime = pstartTime }

		 get parentEventId(): number{ return  this._parentEventId }

		 set parentEventId(pparentEventId: number){ this._parentEventId = pparentEventId }

		 get courtEventType(): string{ return  this._courtEventType }

		 set courtEventType(pcourtEventType: string){ this._courtEventType = pcourtEventType }

		 get level4Code(): string{ return  this._level4Code }

		 set level4Code(plevel4Code: string){ this._level4Code = plevel4Code }

		 get caseInfoPrefix(): string{ return  this._caseInfoPrefix }

		 set caseInfoPrefix(pcaseInfoPrefix: string){ this._caseInfoPrefix = pcaseInfoPrefix }

		 get eventId(): number{ return  this._eventId }

		 set eventId(peventId: number){ this._eventId = peventId }

		 get eventClass(): string{ return  this._eventClass }

		 set eventClass(peventClass: string){ this._eventClass = peventClass }

		 get movementReasonCode(): string{ return  this._movementReasonCode }

		 set movementReasonCode(pmovementReasonCode: string){ this._movementReasonCode = pmovementReasonCode }

		 get judgeName(): string{ return  this._judgeName }

		 set judgeName(pjudgeName: string){ this._judgeName = pjudgeName }

		 get courtEventTypeDesc(): string{ return  this._courtEventTypeDesc }

		 set courtEventTypeDesc(pcourtEventTypeDesc: string){ this._courtEventTypeDesc = pcourtEventTypeDesc }

		 get level3Code(): string{ return  this._level3Code }

		 set level3Code(plevel3Code: string){ this._level3Code = plevel3Code }

		 get eventType(): string{ return  this._eventType }

		 set eventType(peventType: string){ this._eventType = peventType }

		 get agyLocIdName(): string{ return  this._agyLocIdName }

		 set agyLocIdName(pagyLocIdName: string){ this._agyLocIdName = pagyLocIdName }

		 get birthDate(): Date{ return  this._birthDate }

		 set birthDate(pbirthDate: Date){ this._birthDate = pbirthDate }

		 get firstName(): string{ return  this._firstName }

		 set firstName(pfirstName: string){ this._firstName = pfirstName }

		 get caseInfoNumber(): string{ return  this._caseInfoNumber }

		 set caseInfoNumber(pcaseInfoNumber: string){ this._caseInfoNumber = pcaseInfoNumber }

		 get eventOutcome(): string{ return  this._eventOutcome }

		 set eventOutcome(peventOutcome: string){ this._eventOutcome = peventOutcome }

		 get eventStatus(): string{ return  this._eventStatus }

		 set eventStatus(peventStatus: string){ this._eventStatus = peventStatus }

		 get agyLocId(): string{ return  this._agyLocId }

		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId }

		 get checkSum(): number{ return  this._checkSum }

		 set checkSum(pcheckSum: number){ this._checkSum = pcheckSum }

		 get middleName(): string{ return  this._middleName }

		 set middleName(pmiddleName: string){ this._middleName = pmiddleName }

		 get endTime(): Date{ return  this._endTime }

		 set endTime(pendTime: Date){ this._endTime = pendTime }

		 get level2Code(): string{ return  this._level2Code }

		 set level2Code(plevel2Code: string){ this._level2Code = plevel2Code }

		 get eventDate(): Date{ return  this._eventDate }

		 set eventDate(peventDate: Date){ this._eventDate = peventDate }

		 public get appearanceLocation(): string { return this._appearanceLocation;}
    	 
		 public set appearanceLocation(value: string) {this._appearanceLocation = value;}
    	
		 public get appearanceType(): string {return this._appearanceType;}
    	 
		 public set appearanceType(value: string) {this._appearanceType = value;}
		 public get outcomeReasonCode(): string {
			return this._outcomeReasonCode;
		}
		public set outcomeReasonCode(value: string) {
			this._outcomeReasonCode = value;
		}
	
	
		public get cancelFlag(): boolean {
			return this._cancelFlag;
		}
		public set cancelFlag(value: boolean) {
			this._cancelFlag = value;
		}

 	toJSON(): any {
 		return { 
			'lastName': this._lastName,
			'movementReasonDesc': this._movementReasonDesc,
			'level1Code': this._level1Code,
			'offenderAgyLocId': this._offenderAgyLocId,
			'offenderBookId': this._offenderBookId,
			'offenderIdDisplay': this._offenderIdDisplay,
			'resultCode': this._resultCode,
			'offenderAgyLocDesc': this._offenderAgyLocDesc,
			'commentText': this._commentText,
			'livingUnitId': this._livingUnitId,
			'serialVersionUID': this._serialVersionUID,
			'caseId': this._caseId,
			'bookingActiveFlag': this._bookingActiveFlag,
			'startTime': this._startTime,
			'parentEventId': this._parentEventId,
			'courtEventType': this._courtEventType,
			'level4Code': this._level4Code,
			'caseInfoPrefix': this._caseInfoPrefix,
			'eventId': this._eventId,
			'eventClass': this._eventClass,
			'movementReasonCode': this._movementReasonCode,
			'judgeName': this._judgeName,
			'courtEventTypeDesc': this._courtEventTypeDesc,
			'level3Code': this._level3Code,
			'eventType': this._eventType,
			'agyLocIdName': this._agyLocIdName,
			'birthDate': this._birthDate,
			'firstName': this._firstName,
			'caseInfoNumber': this._caseInfoNumber,
			'eventOutcome': this._eventOutcome,
			'eventStatus': this._eventStatus,
			'agyLocId': this._agyLocId,
			'checkSum': this._checkSum,
			'middleName': this._middleName,
			'endTime': this._endTime,
			'level2Code': this._level2Code,
			'eventDate': this._eventDate,
			'appearanceLocation': this._appearanceLocation,
            'appearanceType': this._appearanceType,
			'outcomeReasonCode':this._outcomeReasonCode,
			'cancelFlag':this._cancelFlag
 			};
 		}  
 }