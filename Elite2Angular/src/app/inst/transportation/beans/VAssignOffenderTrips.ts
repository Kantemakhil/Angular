export class VAssignOffenderTrips {
    private _eventId: number;
    private _luLevel1Code: string;
    private _eventClass: string;
    private _eventSubType: string;
    private _offenderBookId: number;
    private _fromSeq: string;
    private _offenderIdDisplay: string;
    private _rootOffenderId: number;
    private _eventType: string;
    private _scheduledTripId: number;
    private _offenderFirstName: string;
    private _offenderLastName: string;
    private _sexCode: string;
    private _eventStatus: string;
    private _agyLocId: string;
    private _startTime: Date;
    private _offenderId: number;
    private _fromLocation: string;
    private _toAgyLocId: string;
    private _recordSource: string;
    private _eventDate: Date;
    private  _selected:String;
    private _endTime:Date;
    private _offenderFullName:string;



    get selected(): String{ return this._selected; }
    set selected(pselected: String){ this._selected = pselected}
    get eventId(): number{ return this._eventId; }
    set eventId(peventId: number){ this._eventId = peventId ;}
    get luLevel1Code(): string{ return this._luLevel1Code; }
    set luLevel1Code(pluLevel1Code: string){ this._luLevel1Code = pluLevel1Code ;}
    get eventClass(): string{ return this._eventClass; }
    set eventClass(peventClass: string){ this._eventClass = peventClass ;}
    get eventSubType(): string{ return this._eventSubType; }
    set eventSubType(peventSubType: string){ this._eventSubType = peventSubType ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get fromSeq(): string{ return this._fromSeq; }
    set fromSeq(pfromSeq: string){ this._fromSeq = pfromSeq ;}
    get offenderIdDisplay(): string{ return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay ;}
    get rootOffenderId(): number{ return this._rootOffenderId; }
    set rootOffenderId(prootOffenderId: number){ this._rootOffenderId = prootOffenderId ;}
    get eventType(): string{ return this._eventType; }
    set eventType(peventType: string){ this._eventType = peventType ;}
    get scheduledTripId(): number{ return this._scheduledTripId; }
    set scheduledTripId(pscheduledTripId: number){ this._scheduledTripId = pscheduledTripId ;}
    get offenderFirstName(): string{ return this._offenderFirstName; }
    set offenderFirstName(poffenderFirstName: string){ this._offenderFirstName = poffenderFirstName ;}
    get offenderLastName(): string{ return this._offenderLastName; }
    set offenderLastName(poffenderLastName: string){ this._offenderLastName = poffenderLastName ;}
    get sexCode(): string{ return this._sexCode; }
    set sexCode(psexCode: string){ this._sexCode = psexCode ;}
    get eventStatus(): string{ return this._eventStatus; }
    set eventStatus(peventStatus: string){ this._eventStatus = peventStatus ;}
    get agyLocId(): string{ return this._agyLocId; }
    set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
    get startTime(): Date{ return this._startTime; }
    set startTime(pstartTime: Date){ this._startTime = pstartTime ;}
    get offenderId(): number{ return this._offenderId; }
    set offenderId(poffenderId: number){ this._offenderId = poffenderId ;}
    get fromLocation(): string{ return this._fromLocation; }
    set fromLocation(pfromLocation: string){ this._fromLocation = pfromLocation ;}
    get toAgyLocId(): string{ return this._toAgyLocId; }
    set toAgyLocId(ptoAgyLocId: string){ this._toAgyLocId = ptoAgyLocId ;}
    get recordSource(): string{ return this._recordSource; }
    set recordSource(precordSource: string){ this._recordSource = precordSource ;}
    get eventDate(): Date{ return this._eventDate; }
    set eventDate(peventDate: Date){ this._eventDate = peventDate ;}
    get endTime(): Date{ return this._endTime; }
    set endTime(pendTime: Date){ this._endTime = pendTime ;}
    get offenderFullName(): string{ return this._offenderFullName; }
    set offenderFullName(poffenderFullName: string){ this._offenderFullName = poffenderFullName;}
toJSON(): any {
    return { 
       'eventId': this._eventId,
       'luLevel1Code': this._luLevel1Code,
       'eventClass': this._eventClass,
       'eventSubType': this._eventSubType,
       'offenderBookId': this._offenderBookId,
       'fromSeq': this._fromSeq,
       'offenderIdDisplay': this._offenderIdDisplay,
       'rootOffenderId': this._rootOffenderId,
       'eventType': this._eventType,
       'scheduledTripId': this._scheduledTripId,
       'offenderFirstName': this._offenderFirstName,
       'offenderLastName': this._offenderLastName,
       'sexCode': this._sexCode,
       'eventStatus': this._eventStatus,
       'agyLocId': this._agyLocId,
       'startTime': this._startTime,
       'endTime':this._endTime,
       'offenderId': this._offenderId,
       'fromLocation': this._fromLocation,
       'toAgyLocId': this._toAgyLocId,
       'recordSource': this._recordSource,
       'eventDate': this._eventDate,
       'selected':this._selected,
       'offenderFullName':this._offenderFullName,
        };
    } 
}