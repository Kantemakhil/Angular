
	export class VOffenderSentenceEvents {
		 private _offenderBookId: number;
		 private _eventTypeDesc: string;
		 private _commentText: string;
		 private _serialVersionUID: number;
		 private _crsActyId: number;
		 private _startTime: Date;
		 private _recordSource: string;
		 private _eventId: number;
		 private _eventClass: string;
		 private _eventSubType: string;
		 private _eventType: string;
		 private _sentenceSeq: number;
		 private _inTime: Date;
		 private _eventOutcomeDesc: string;
		 private _condition: string;
		 private _eventOutcome: string;
		 private _eventStatus: string;
		 private _eventSubTypeDesc: string;
		 private _agyLocId: string;
		 private _offenderSentConditionId: number;
		 private _location: string;
		 private _endTime: Date;
		 private _programId: number;
		 private _outTime: Date;
		 private _eventDate: Date;
		 private _agyLocDesc: string;

		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get eventTypeDesc(): string{ return this._eventTypeDesc; }
		 set eventTypeDesc(peventTypeDesc: string){ this._eventTypeDesc = peventTypeDesc ;}
		 get commentText(): string{ return this._commentText; }
		 set commentText(pcommentText: string){ this._commentText = pcommentText ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get crsActyId(): number{ return this._crsActyId; }
		 set crsActyId(pcrsActyId: number){ this._crsActyId = pcrsActyId ;}
		 get startTime(): Date{ return this._startTime; }
		 set startTime(pstartTime: Date){ this._startTime = pstartTime ;}
		 get recordSource(): string{ return this._recordSource; }
		 set recordSource(precordSource: string){ this._recordSource = precordSource ;}
		 get eventId(): number{ return this._eventId; }
		 set eventId(peventId: number){ this._eventId = peventId ;}
		 get eventClass(): string{ return this._eventClass; }
		 set eventClass(peventClass: string){ this._eventClass = peventClass ;}
		 get eventSubType(): string{ return this._eventSubType; }
		 set eventSubType(peventSubType: string){ this._eventSubType = peventSubType ;}
		 get eventType(): string{ return this._eventType; }
		 set eventType(peventType: string){ this._eventType = peventType ;}
		 get sentenceSeq(): number{ return this._sentenceSeq; }
		 set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq ;}
		 get inTime(): Date{ return this._inTime; }
		 set inTime(pinTime: Date){ this._inTime = pinTime ;}
		 get eventOutcomeDesc(): string{ return this._eventOutcomeDesc; }
		 set eventOutcomeDesc(peventOutcomeDesc: string){ this._eventOutcomeDesc = peventOutcomeDesc ;}
		 get condition(): string{ return this._condition; }
		 set condition(pcondition: string){ this._condition = pcondition ;}
		 get eventOutcome(): string{ return this._eventOutcome; }
		 set eventOutcome(peventOutcome: string){ this._eventOutcome = peventOutcome ;}
		 get eventStatus(): string{ return this._eventStatus; }
		 set eventStatus(peventStatus: string){ this._eventStatus = peventStatus ;}
		 get eventSubTypeDesc(): string{ return this._eventSubTypeDesc; }
		 set eventSubTypeDesc(peventSubTypeDesc: string){ this._eventSubTypeDesc = peventSubTypeDesc ;}
		 get agyLocId(): string{ return this._agyLocId; }
		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
		 get offenderSentConditionId(): number{ return this._offenderSentConditionId; }
		 set offenderSentConditionId(poffenderSentConditionId: number){ this._offenderSentConditionId = poffenderSentConditionId ;}
		 get location(): string{ return this._location; }
		 set location(plocation: string){ this._location = plocation ;}
		 get endTime(): Date{ return this._endTime; }
		 set endTime(pendTime: Date){ this._endTime = pendTime ;}
		 get programId(): number{ return this._programId; }
		 set programId(pprogramId: number){ this._programId = pprogramId ;}
		 get outTime(): Date{ return this._outTime; }
		 set outTime(poutTime: Date){ this._outTime = poutTime ;}
		 get eventDate(): Date{ return this._eventDate; }
		 set eventDate(peventDate: Date){ this._eventDate = peventDate ;}
		 get agyLocDesc(): string{ return this._agyLocDesc; }
		 set agyLocDesc(pagyLocDesc: string){ this._agyLocDesc = pagyLocDesc ;}

 	toJSON(): any {
 		return { 
			'offenderBookId': this._offenderBookId,
			'eventTypeDesc': this._eventTypeDesc,
			'commentText': this._commentText,
			'serialVersionUID': this._serialVersionUID,
			'crsActyId': this._crsActyId,
			'startTime': this._startTime,
			'recordSource': this._recordSource,
			'eventId': this._eventId,
			'eventClass': this._eventClass,
			'eventSubType': this._eventSubType,
			'eventType': this._eventType,
			'sentenceSeq': this._sentenceSeq,
			'inTime': this._inTime,
			'eventOutcomeDesc': this._eventOutcomeDesc,
			'condition': this._condition,
			'eventOutcome': this._eventOutcome,
			'eventStatus': this._eventStatus,
			'eventSubTypeDesc': this._eventSubTypeDesc,
			'agyLocId': this._agyLocId,
			'offenderSentConditionId': this._offenderSentConditionId,
			'location': this._location,
			'endTime': this._endTime,
			'programId': this._programId,
			'outTime': this._outTime,
			'eventDate': this._eventDate,
			'agyLocDesc': this._agyLocDesc,
 			};
 		}  
 }