
export class VLocalTripOffenders  {
	[x: string]: any;
		 private _eventId: number;
		 private _eventSubType: string;
		 private _offenderBookId: number;
		 private _fromSeq: string;
		 private _offenderIdDisplay: string;
		 private _eventType: string;
		 private _commentText: string;
		 private _scheduledTripId: number;
		 private _offenderFirstName: string;
		 private _offenderLastName: string;
		 private _routeName: string;
		 private _offenderFromLoc: string;
		 private _toSeq: string;
		 private _offenderToLoc: string;
		 private _sexCode: string;
		 private _inmateId: number;
		 private _housingLocation: string;
		 private _recordSource: string;
		 private _raceCode: string;
         private  _selected:String;
		 private _ifExistMov:number ;


		 get ifExistMov(): number{ return this._ifExistMov; }
		 set ifExistMov(pifExistMov: number){ this._ifExistMov = pifExistMov ;}
		 get selected(): String{ return this._selected; }
		 set selected(pselected: String){ this._selected = pselected ;}
		 get eventId(): number{ return this._eventId; }
		 set eventId(peventId: number){ this._eventId = peventId ;}
		 get eventSubType(): string{ return this._eventSubType; }
		 set eventSubType(peventSubType: string){ this._eventSubType = peventSubType ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get fromSeq(): string{ return this._fromSeq; }
		 set fromSeq(pfromSeq: string){ this._fromSeq = pfromSeq ;}
		 get offenderIdDisplay(): string{ return this._offenderIdDisplay; }
		 set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay ;}
		 get eventType(): string{ return this._eventType; }
		 set eventType(peventType: string){ this._eventType = peventType ;}
		 get commentText(): string{ return this._commentText; }
		 set commentText(pcommentText: string){ this._commentText = pcommentText ;}
		 get scheduledTripId(): number{ return this._scheduledTripId; }
		 set scheduledTripId(pscheduledTripId: number){ this._scheduledTripId = pscheduledTripId ;}
		 get offenderFirstName(): string{ return this._offenderFirstName; }
		 set offenderFirstName(poffenderFirstName: string){ this._offenderFirstName = poffenderFirstName ;}
		 get offenderLastName(): string{ return this._offenderLastName; }
		 set offenderLastName(poffenderLastName: string){ this._offenderLastName = poffenderLastName ;}
		 get routeName(): string{ return this._routeName; }
		 set routeName(prouteName: string){ this._routeName = prouteName ;}
		 get offenderFromLoc(): string{ return this._offenderFromLoc; }
		 set offenderFromLoc(poffenderFromLoc: string){ this._offenderFromLoc = poffenderFromLoc ;}
		 get toSeq(): string{ return this._toSeq; }
		 set toSeq(ptoSeq: string){ this._toSeq = ptoSeq ;}
		 get offenderToLoc(): string{ return this._offenderToLoc; }
		 set offenderToLoc(poffenderToLoc: string){ this._offenderToLoc = poffenderToLoc ;}
		 get sexCode(): string{ return this._sexCode; }
		 set sexCode(psexCode: string){ this._sexCode = psexCode ;}
		 get inmateId(): number{ return this._inmateId; }
		 set inmateId(pinmateId: number){ this._inmateId = pinmateId ;}
		 get housingLocation(): string{ return this._housingLocation; }
		 set housingLocation(phousingLocation: string){ this._housingLocation = phousingLocation ;}
		 get recordSource(): string{ return this._recordSource; }
		 set recordSource(precordSource: string){ this._recordSource = precordSource ;}
		 get raceCode(): string{ return this._raceCode; }
		 set raceCode(praceCode: string){ this._raceCode = praceCode ;}

 	toJSON(): any {
 		return { 
			'eventId': this._eventId,
			'eventSubType': this._eventSubType,
			'offenderBookId': this._offenderBookId,
			'fromSeq': this._fromSeq,
			'offenderIdDisplay': this._offenderIdDisplay,
			'eventType': this._eventType,
			'commentText': this._commentText,
			'scheduledTripId': this._scheduledTripId,
			'offenderFirstName': this._offenderFirstName,
			'offenderLastName': this._offenderLastName,
			'routeName': this._routeName,
			'offenderFromLoc': this._offenderFromLoc,
			'toSeq': this._toSeq,
			'offenderToLoc': this._offenderToLoc,
			'sexCode': this._sexCode,
			'inmateId': this._inmateId,
			'housingLocation': this._housingLocation,
			'recordSource': this._recordSource,
			'raceCode': this._raceCode,
			'selected':this._selected,
			'pifExistMov':this._pifExistMov,
 			};
 		} 
 }
