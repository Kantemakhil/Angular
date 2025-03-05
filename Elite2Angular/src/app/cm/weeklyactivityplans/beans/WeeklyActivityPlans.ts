export class WeeklyActivityPlans {
    private _activityDate: Date;
    private _departStartTime: Date;
    private _activity: string;
    private _offenderBookId: number;
    private _activityStart: Date;
    private _toDate: Date;
    private _activityAddress: string;
    private _updateIndicator: string;
    private _returnTime: Date;
    private _notForOffender: string;
    private _fromDate: Date;
    private _serialVersionUID: number;
    private _serialNumber: number;
    private _modeOfTransport: string;
    private _activityFinish: Date;
    private _day: string;
    private _systemGenerated: string;
    private _eventId: number;
    private _liReturn: number;
    private _weeklyActivityPlanId: number;
    private _activityId: string;
    private _recordSource: string;
    private _activityNew: string;
    private _wapStartDate: Date;
    private _wapEndDate: Date;
    private _comment: string;
    private _notForOffenderFlag: string;
    private _finalized: string;
    private _htyVersionNo:number;
    private _versionNo:number;

    get wapStartDate(): Date { return this._wapStartDate; }
    set wapStartDate(value: Date) { this._wapStartDate = value; }
    get wapEndDate(): Date { return this._wapEndDate; }
    set wapEndDate(value: Date) { this._wapEndDate = value; }
   
    get activityDate(): Date { return this._activityDate; }
    set activityDate(value: Date) { this._activityDate = value; }
    get departStartTime(): Date{ return this._departStartTime; }
    set departStartTime(pdepartStartTime: Date){ this._departStartTime = pdepartStartTime ;}
    get activity(): string{ return this._activity; }
    set activity(pactivity: string){ this._activity = pactivity ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get activityStart(): Date{ return this._activityStart; }
    set activityStart(pactivityStart: Date){ this._activityStart = pactivityStart ;}
    get toDate(): Date{ return this._toDate; }
    set toDate(ptoDate: Date){ this._toDate = ptoDate ;}
    get activityAddress(): string{ return this._activityAddress; }
    set activityAddress(pactivityAddress: string){ this._activityAddress = pactivityAddress ;}
    get updateIndicator(): string{ return this._updateIndicator; }
    set updateIndicator(pupdateIndicator: string){ this._updateIndicator = pupdateIndicator ;}
    get returnTime(): Date{ return this._returnTime; }
    set returnTime(preturnTime: Date){ this._returnTime = preturnTime ;}
    get notForOffender(): string{ return this._notForOffender; }
    set notForOffender(pnotForOffender: string){ this._notForOffender = pnotForOffender ;}
    get fromDate(): Date{ return this._fromDate; }
    set fromDate(pfromDate: Date){ this._fromDate = pfromDate ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get serialNumber(): number{ return this._serialNumber; }
    set serialNumber(pserialNumber: number){ this._serialNumber = pserialNumber ;}
    get modeOfTransport(): string{ return this._modeOfTransport; }
    set modeOfTransport(pmodeOfTransport: string){ this._modeOfTransport = pmodeOfTransport ;}
    get activityFinish(): Date{ return this._activityFinish; }
    set activityFinish(pactivityFinish: Date){ this._activityFinish = pactivityFinish ;}
    get day(): string{ return this._day; }
    set day(pday: string){ this._day = pday ;}
    get systemGenerated(): string{ return this._systemGenerated; }
    set systemGenerated(psystemGenerated: string){ this._systemGenerated = psystemGenerated ;}

    get eventId(): number{ return this._eventId; }
    set eventId(peventId: number){ this._eventId = peventId ;}
    get liReturn(): number { return this._liReturn; }
    set liReturn(pliReturn: number) { this._liReturn = pliReturn; }

    get weeklyActivityPlanId(): number{ return this._weeklyActivityPlanId; }
    set weeklyActivityPlanId(pweeklyActivityPlanId: number){ this._weeklyActivityPlanId = pweeklyActivityPlanId;}

    get activityId(): string{ return this._activityId; }
    set activityId(pactivityId: string){ this._activityId = pactivityId ;}

    get recordSource(): string { return this._recordSource; }
    set recordSource(value: string) { this._recordSource = value; }

    get activityNew(): string { return this._activityNew; }
    set activityNew(value: string) { this._activityNew = value; }
    get comment(): string {return this._comment;}
    set comment(value: string) {this._comment = value;}


    get notForOffenderFlag(): string{ return this._notForOffenderFlag; }
    set notForOffenderFlag(pnotForOffenderFlag: string){ this._notForOffenderFlag = pnotForOffenderFlag;}

    get finalized(): string{ return this._finalized; }
    set finalized(pfinalized: string){ this._finalized = pfinalized ;}

    get htyVersionNo(): number{ return this._htyVersionNo; }
    set htyVersionNo(phtyVersionNo: number){ this._htyVersionNo = phtyVersionNo ;}

    get versionNo(): number{ return this._versionNo; }
    set versionNo(pversionNo: number){ this._versionNo = pversionNo ;}

toJSON(): any {
    return { 
       'activityDate': this._activityDate,
       'departStartTime': this._departStartTime,
       'activity': this._activity,
       'offenderBookId': this._offenderBookId,
       'activityStart': this._activityStart,
       'toDate': this._toDate,
       'activityAddress': this._activityAddress,
       'updateIndicator': this._updateIndicator,
       'returnTime': this._returnTime,
       'notForOffender': this._notForOffender,
       'fromDate': this._fromDate,
       'serialVersionUID': this._serialVersionUID,
       'serialNumber': this._serialNumber,
       'modeOfTransport': this._modeOfTransport,
       'activityFinish': this._activityFinish,
       'day': this._day,
       'systemGenerated': this._systemGenerated,
       'eventId': this._eventId,
       'liReturn': this._liReturn,
       'weeklyActivityPlanId': this._weeklyActivityPlanId,
       'activityId': this._activityId,
       'recordSource' : this._recordSource,
       'activityNew' : this._activityNew,
       'wapStartDate' : this._wapStartDate,
       'wapEndDate' : this._wapEndDate,
       'comment': this._comment,
       'notForOffenderFlag': this._notForOffenderFlag,
       'finalized': this._finalized,
       'htyVersionNo': this._htyVersionNo,
       'versionNo': this._versionNo
        };
    } 
}