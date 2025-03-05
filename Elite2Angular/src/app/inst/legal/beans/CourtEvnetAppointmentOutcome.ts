import { BaseModel } from '@commonbeans/BaseModel'


export class CourtEvnetAppointmentOutcome extends BaseModel{
    private _unexcusedAbsenceFlag: string;
    private _createUserId: string;
    private _offenderBookId: number;
    private _modifyDatetime: Date;
    private _recordSanctionRewardCount: number;
    private _eventTypeDesc: string;
    private _modifyUserId: string;
    private _commentText: string;
    private _outcomeReasonCode: string;
    private _courtEventId: number;
    private _serialVersionUID: number;
    private _startTime: Date;
    private _eventStatusDesc: string;
    private _sessionEventId: number;
    private _toAgyLocId: string;
    private _activeFlag: string;
    private _eventId: number;
    private _eventClass: string;
    private _eventSubType: string;
    private _eventType: string;
    private _sentenceSeq: number;
    private _eventOutcomeDesc: string;
    private _createDatetime: Date;
    private _courtEvntSanctDtlId: number;
    private _courtEventDate: Date;
    private _eventOutcome: string;
    private _eventStatus: string;
    private _eventSubTypeDesc: string;
    private _agyLocId: string;
    private _caseLoadId: string;
    private _endTime: Date;
    private _countType: string;
    private _adjournedFlag: string;
    private _eventDate: Date;
    private _linkFlag: string;
    private _commentTextTemp: string;
    private _recordType: string; 

    public get recordType(): string {
        return this._recordType;
    }
    public set recordType(value: string) {
        this._recordType = value;
    }

    public get commentTextTemp(): string {
        return this._commentTextTemp;
    }
    public set commentTextTemp(value: string) {
        this._commentTextTemp = value;
    }

    get unexcusedAbsenceFlag(): string{ return this._unexcusedAbsenceFlag; }
    set unexcusedAbsenceFlag(punexcusedAbsenceFlag: string){ this._unexcusedAbsenceFlag = punexcusedAbsenceFlag ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get recordSanctionRewardCount(): number{ return this._recordSanctionRewardCount; }
    set recordSanctionRewardCount(precordSanctionRewardCount: number){ this._recordSanctionRewardCount = precordSanctionRewardCount ;}
    get eventTypeDesc(): string{ return this._eventTypeDesc; }
    set eventTypeDesc(peventTypeDesc: string){ this._eventTypeDesc = peventTypeDesc ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get commentText(): string{ return this._commentText; }
    set commentText(pcommentText: string){ this._commentText = pcommentText ;}
    get outcomeReasonCode(): string{ return this._outcomeReasonCode; }
    set outcomeReasonCode(poutcomeReasonCode: string){ this._outcomeReasonCode = poutcomeReasonCode ;}
    get courtEventId(): number{ return this._courtEventId; }
    set courtEventId(pcourtEventId: number){ this._courtEventId = pcourtEventId ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get startTime(): Date{ return this._startTime; }
    set startTime(pstartTime: Date){ this._startTime = pstartTime ;}
    get eventStatusDesc(): string{ return this._eventStatusDesc; }
    set eventStatusDesc(peventStatusDesc: string){ this._eventStatusDesc = peventStatusDesc ;}
    get sessionEventId(): number{ return this._sessionEventId; }
    set sessionEventId(psessionEventId: number){ this._sessionEventId = psessionEventId ;}
    get toAgyLocId(): string{ return this._toAgyLocId; }
    set toAgyLocId(ptoAgyLocId: string){ this._toAgyLocId = ptoAgyLocId ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
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
    get eventOutcomeDesc(): string{ return this._eventOutcomeDesc; }
    set eventOutcomeDesc(peventOutcomeDesc: string){ this._eventOutcomeDesc = peventOutcomeDesc ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get courtEvntSanctDtlId(): number{ return this._courtEvntSanctDtlId; }
    set courtEvntSanctDtlId(pcourtEvntSanctDtlId: number){ this._courtEvntSanctDtlId = pcourtEvntSanctDtlId ;}
    get courtEventDate(): Date{ return this._courtEventDate; }
    set courtEventDate(pcourtEventDate: Date){ this._courtEventDate = pcourtEventDate ;}
    get eventOutcome(): string{ return this._eventOutcome; }
    set eventOutcome(peventOutcome: string){ this._eventOutcome = peventOutcome ;}
    get eventStatus(): string{ return this._eventStatus; }
    set eventStatus(peventStatus: string){ this._eventStatus = peventStatus ;}
    get eventSubTypeDesc(): string{ return this._eventSubTypeDesc; }
    set eventSubTypeDesc(peventSubTypeDesc: string){ this._eventSubTypeDesc = peventSubTypeDesc ;}
    get agyLocId(): string{ return this._agyLocId; }
    set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
    get caseLoadId(): string{ return this._caseLoadId; }
    set caseLoadId(pcaseLoadId: string){ this._caseLoadId = pcaseLoadId ;}
    get endTime(): Date{ return this._endTime; }
    set endTime(pendTime: Date){ this._endTime = pendTime ;}
    get countType(): string{ return this._countType; }
    set countType(pcountType: string){ this._countType = pcountType ;}
    get adjournedFlag(): string{ return this._adjournedFlag; }
    set adjournedFlag(padjournedFlag: string){ this._adjournedFlag = padjournedFlag ;}
    get eventDate(): Date{ return this._eventDate; }
    set eventDate(peventDate: Date){ this._eventDate = peventDate ;}

    get linkFlag(): string{ return this._linkFlag; }
    set linkFlag(plinkFlag: string){ this._linkFlag = plinkFlag ;}

toJSON(): any {
    return { 
       'unexcusedAbsenceFlag': this._unexcusedAbsenceFlag,
       'createUserId': this._createUserId,
       'offenderBookId': this._offenderBookId,
       'modifyDatetime': this._modifyDatetime,
       'recordSanctionRewardCount': this._recordSanctionRewardCount,
       'eventTypeDesc': this._eventTypeDesc,
       'modifyUserId': this._modifyUserId,
       'commentText': this._commentText,
       'outcomeReasonCode': this._outcomeReasonCode,
       'courtEventId': this._courtEventId,
       'serialVersionUID': this._serialVersionUID,
       'startTime': this._startTime,
       'eventStatusDesc': this._eventStatusDesc,
       'sessionEventId': this._sessionEventId,
       'toAgyLocId': this._toAgyLocId,
       'activeFlag': this._activeFlag,
       'eventId': this._eventId,
       'eventClass': this._eventClass,
       'eventSubType': this._eventSubType,
       'eventType': this._eventType,
       'sentenceSeq': this._sentenceSeq,
       'eventOutcomeDesc': this._eventOutcomeDesc,
       'createDatetime': this._createDatetime,
       'courtEvntSanctDtlId': this._courtEvntSanctDtlId,
       'courtEventDate': this._courtEventDate,
       'eventOutcome': this._eventOutcome,
       'eventStatus': this._eventStatus,
       'eventSubTypeDesc': this._eventSubTypeDesc,
       'agyLocId': this._agyLocId,
       'caseLoadId': this._caseLoadId,
       'endTime': this._endTime,
       'countType': this._countType,
       'adjournedFlag': this._adjournedFlag,
       'eventDate': this._eventDate,
       'linkFlag': this._linkFlag,
       'recordType': this._recordType
        };
    } 
}
