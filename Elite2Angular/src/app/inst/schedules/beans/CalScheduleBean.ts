export class CalScheduleBean {

	private _categoryColor: string;
	private _offenderBookId: number;
	private _subject: string;
	private _startTimezone: string;
	private _description: string;
	private _endTimezone: string;
	private _recurrenceRule: string;
	private _recurrenceException: string;
	private _recurrenceID: string;
	private _serialVersionUID: number;
	private _isAllDay: string;
	private _startTime: Date;
	private _location: string;
	private _caseLoadId: string;
	private _endTime: Date;
	private _eventDate: Date;
	private  _profileMap: any;
	private _sealFlag: any;
	private _offenderTierLevelId: number;
	private _eventStatus: string;
	private _cancelReason: string;
	private _comment: string;
	private _matter: string;
	private _agyLocId: string;
	private _linkData: number;
	private _versionNo: number;
    private _currentSelectedViewClass: string;
	private _departStartTime: Date;
	private _returnTime: Date;
	private _bookingDate: Date;
	
	

	public get agyLocId(): string {
		return this._agyLocId;
	}
	public set agyLocId(value: string) {
		this._agyLocId = value;
	}

	public get comment(): string {
		return this._comment;
	}
	public set comment(value: string) {
		this._comment = value;
	}
	public get matter(): string {
		return this._matter;
	}
	public set matter(value: string) {
		this._matter = value;
	}
	public get cancelReason(): string {
		return this._cancelReason;
	}
	public set cancelReason(value: string) {
		this._cancelReason = value;
	}

	public get eventStatus(): string {
		return this._eventStatus;
	}
	public set eventStatus(value: string) {
		this._eventStatus = value;
	}


	get profileMap(): any{ return this._profileMap; }
	set profileMap(pprofileMap: any){ this._profileMap = pprofileMap ;}
	get categoryColor(): string{ return this._categoryColor; }
	set categoryColor(pcategoryColor: string){ this._categoryColor = pcategoryColor ;}
	get offenderBookId(): number{ return this._offenderBookId; }
	set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
	get subject(): string{ return this._subject; }
	set subject(psubject: string){ this._subject = psubject ;}
	get startTimezone(): string{ return this._startTimezone; }
	set startTimezone(pstartTimezone: string){ this._startTimezone = pstartTimezone ;}
	get description(): string{ return this._description; }
	set description(pdescription: string){ this._description = pdescription ;}
	get endTimezone(): string{ return this._endTimezone; }
	set endTimezone(pendTimezone: string){ this._endTimezone = pendTimezone ;}
	get recurrenceRule(): string{ return this._recurrenceRule; }
	set recurrenceRule(precurrenceRule: string){ this._recurrenceRule = precurrenceRule ;}
	get recurrenceException(): string{ return this._recurrenceException; }
	set recurrenceException(precurrenceException: string){ this._recurrenceException = precurrenceException ;}
	get recurrenceID(): string{ return this._recurrenceID; }
	set recurrenceID(precurrenceID: string){ this._recurrenceID = precurrenceID ;}
	get serialVersionUID(): number{ return this._serialVersionUID; }
	set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
	get isAllDay(): string{ return this._isAllDay; }
	set isAllDay(pisAllDay: string){ this._isAllDay = pisAllDay ;}
	get startTime(): Date{ return this._startTime; }
	set startTime(pstartTime: Date){ this._startTime = pstartTime ;}
	get location(): string{ return this._location; }
	set location(plocation: string){ this._location = plocation ;}
	get caseLoadId(): string{ return this._caseLoadId; }
	set caseLoadId(pcaseLoadId: string){ this._caseLoadId = pcaseLoadId ;}
	get endTime(): Date{ return this._endTime; }
	set endTime(pendTime: Date){ this._endTime = pendTime ;}
	get eventDate(): Date{ return this._eventDate; }
	set eventDate(peventDate: Date){ this._eventDate = peventDate ;}
	get sealFlag(): any {return this._sealFlag;}
	set sealFlag(value: any) {this._sealFlag = value;}
	get offenderTierLevelId(): number {return this._offenderTierLevelId;}
    set offenderTierLevelId(value: number) {this._offenderTierLevelId = value;}
	get linkData(): number { return this._linkData; }
    set linkData(plinkData: number) { this._linkData = plinkData; }
	get versionNo(): number {return this._versionNo;}
	set versionNo(value: number) {this._versionNo = value;}

	get currentSelectedViewClass(): string{ return this._currentSelectedViewClass; }
	set currentSelectedViewClass(pcurrentSelectedViewClass: string){ this._currentSelectedViewClass = pcurrentSelectedViewClass ;}

	get departStartTime(): Date{ return this._departStartTime; }
	set departStartTime(pdepartStartTime: Date){ this._departStartTime = pdepartStartTime ;}

	get returnTime(): Date{ return this._returnTime; }
	set returnTime(preturnTime: Date){ this._returnTime = preturnTime ;}
	public get bookingDate(): Date {return this._bookingDate;}
	public set bookingDate(value: Date) {this._bookingDate = value;}
toJSON(): any {
	return { 
	   'categoryColor': this._categoryColor,
	   'offenderBookId': this._offenderBookId,
	   'subject': this._subject,
	   'startTimezone': this._startTimezone,
	   'description': this._description,
	   'endTimezone': this._endTimezone,
	   'recurrenceRule': this._recurrenceRule,
	   'recurrenceException': this._recurrenceException,
	   'recurrenceID': this._recurrenceID,
	   'serialVersionUID': this._serialVersionUID,
	   'isAllDay': this._isAllDay,
	   'startTime': this._startTime,
	   'location': this._location,
	   'caseLoadId': this._caseLoadId,
	   'endTime': this._endTime,
	   'eventDate': this._eventDate,
	   'profileMap': this._profileMap,
	   'sealFlag' : this._sealFlag,
	   'offenderTierLevelId':this._offenderTierLevelId,
	   'eventStatus':this._eventStatus,
	   'cancelReason':this._cancelReason,
	   'comment':this._comment,
	   'matter':this._matter,
	   'linkData': this._linkData,
	   'versionNo':this._versionNo,
	   'currentSelectedViewClass': this._currentSelectedViewClass,
	   'departStartTime': this._departStartTime,
	   'returnTime': this._returnTime
		};
	} 
}
