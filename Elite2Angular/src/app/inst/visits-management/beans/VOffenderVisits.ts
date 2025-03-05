export class VOffenderVisits {
    private _code: string;
    private _offenderBookId: number;
    private _visitOffenderBookId: number;
    private _offenderIdDisplay: string;
    private _raisedIncidentNumber: number;
    private _description: string;
    private _commentText: string;
    private _offenderFirstName: string;
    private _outcomeReasonCode: string;
    private _remainingVisitsType: number;
    private _serialVersionUID: number;
    private _raisedIncidentType: string;
    private _cycleEnds: Date;
    private _startTime: Date;
    private _visitDate: Date;
    private _remainingTimeType: number;
    private _offenderVisitId: number;
    private _totalRemainingVisits: number;
    private _offenderVisitVisitorId: number;
    private _eventId: number;
    private _totalRemainingTime: number;
    private _visitOwnerFlag: string;
    private _agencyVisitSlotId: number;
    private _offenderLastName: string;
    private _visitInternalLocationId: number;
    private _visitType: string;
    private _visitStatus: string;
    private _eventOutcome: string;
    private _eventStatus: string;
    private _agyLocId: string;
    private _checkSum: number;
    private _endTime: Date;
    private _offenderId: number;
    private _visitorCommentText: string;
    private _timeSlot: string;
    private _originalTimeSlot: string;
    private _personId: number;
    private _checkFlag: boolean;
    private _person: number;
    private _adult: number;
    private _group: number;
    private _warningMsg: string;
    private _insertCount: number;
    private _warnFlag: Boolean;
    private _conflictFlag: Boolean;
    private _visitlimitFlag: Boolean;
    private _remainingTimeTypeTemp: string;
    private _totalRemainingTimeTemp: string;
    private _stimetemp: string;
    
    public get totalRemainingTimeTemp(): string {
        return this._totalRemainingTimeTemp;
    }
    public set totalRemainingTimeTemp(value: string) {
        this._totalRemainingTimeTemp = value;
    }
    public get remainingTimeTypeTemp(): string {
        return this._remainingTimeTypeTemp;
    }
    public set remainingTimeTypeTemp(value: string) {
        this._remainingTimeTypeTemp = value;
    }

    get warnFlag(): Boolean { return this._warnFlag; }

    set warnFlag(pwarnFlag: Boolean) { this._warnFlag = pwarnFlag; }

    get conflictFlag(): Boolean { return this._conflictFlag; }

    set conflictFlag(pconflictFlag: Boolean) { this._conflictFlag = pconflictFlag; }

    get visitlimitFlag(): Boolean { return this._visitlimitFlag; }

    set visitlimitFlag(pvisitlimitFlag: Boolean) { this._visitlimitFlag = pvisitlimitFlag; }

    get insertCount(): number { return this._insertCount; }

    set insertCount(pinsertCount: number) { this._insertCount = pinsertCount; }

    get warningMsg(): string { return this._warningMsg; }

    set warningMsg(pwarningMsg: string) { this._warningMsg = pwarningMsg; }

    get code(): string { return this._code; }

    set code(pcode: string) { this._code = pcode; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get visitOffenderBookId(): number { return this._visitOffenderBookId; }

    set visitOffenderBookId(pvisitOffenderBookId: number) { this._visitOffenderBookId = pvisitOffenderBookId; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

    get raisedIncidentNumber(): number { return this._raisedIncidentNumber; }

    set raisedIncidentNumber(praisedIncidentNumber: number) { this._raisedIncidentNumber = praisedIncidentNumber; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get offenderFirstName(): string { return this._offenderFirstName; }

    set offenderFirstName(poffenderFirstName: string) { this._offenderFirstName = poffenderFirstName; }

    get outcomeReasonCode(): string { return this._outcomeReasonCode; }

    set outcomeReasonCode(poutcomeReasonCode: string) { this._outcomeReasonCode = poutcomeReasonCode; }

    get remainingVisitsType(): number { return this._remainingVisitsType; }

    set remainingVisitsType(premainingVisitsType: number) { this._remainingVisitsType = premainingVisitsType; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get raisedIncidentType(): string { return this._raisedIncidentType; }

    set raisedIncidentType(praisedIncidentType: string) { this._raisedIncidentType = praisedIncidentType; }

    get cycleEnds(): Date { return this._cycleEnds; }

    set cycleEnds(pcycleEnds: Date) { this._cycleEnds = pcycleEnds; }

    get startTime(): Date { return this._startTime; }

    set startTime(pstartTime: Date) { this._startTime = pstartTime; }

    get visitDate(): Date { return this._visitDate; }

    set visitDate(pvisitDate: Date) { this._visitDate = pvisitDate; }

    get remainingTimeType(): number { return this._remainingTimeType; }

    set remainingTimeType(premainingTimeType: number) { this._remainingTimeType = premainingTimeType; }

    get offenderVisitId(): number { return this._offenderVisitId; }

    set offenderVisitId(poffenderVisitId: number) { this._offenderVisitId = poffenderVisitId; }

    get totalRemainingVisits(): number { return this._totalRemainingVisits; }

    set totalRemainingVisits(ptotalRemainingVisits: number) { this._totalRemainingVisits = ptotalRemainingVisits; }

    get offenderVisitVisitorId(): number { return this._offenderVisitVisitorId; }

    set offenderVisitVisitorId(poffenderVisitVisitorId: number) { this._offenderVisitVisitorId = poffenderVisitVisitorId; }

    get eventId(): number { return this._eventId; }

    set eventId(peventId: number) { this._eventId = peventId; }

    get totalRemainingTime(): number { return this._totalRemainingTime; }

    set totalRemainingTime(ptotalRemainingTime: number) { this._totalRemainingTime = ptotalRemainingTime; }

    get visitOwnerFlag(): string { return this._visitOwnerFlag; }

    set visitOwnerFlag(pvisitOwnerFlag: string) { this._visitOwnerFlag = pvisitOwnerFlag; }

    get agencyVisitSlotId(): number { return this._agencyVisitSlotId; }

    set agencyVisitSlotId(pagencyVisitSlotId: number) { this._agencyVisitSlotId = pagencyVisitSlotId; }

    get offenderLastName(): string { return this._offenderLastName; }

    set offenderLastName(poffenderLastName: string) { this._offenderLastName = poffenderLastName; }

    get visitInternalLocationId(): number { return this._visitInternalLocationId; }

    set visitInternalLocationId(pvisitInternalLocationId: number) { this._visitInternalLocationId = pvisitInternalLocationId; }

    get visitType(): string { return this._visitType; }

    set visitType(pvisitType: string) { this._visitType = pvisitType; }

    get visitStatus(): string { return this._visitStatus; }

    set visitStatus(pvisitStatus: string) { this._visitStatus = pvisitStatus; }

    get eventOutcome(): string { return this._eventOutcome; }

    set eventOutcome(peventOutcome: string) { this._eventOutcome = peventOutcome; }

    get eventStatus(): string { return this._eventStatus; }

    set eventStatus(peventStatus: string) { this._eventStatus = peventStatus; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get checkSum(): number { return this._checkSum; }

    set checkSum(pcheckSum: number) { this._checkSum = pcheckSum; }

    get endTime(): Date { return this._endTime; }

    set endTime(pendTime: Date) { this._endTime = pendTime; }

    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get visitorCommentText(): string { return this._visitorCommentText; }

    set visitorCommentText(pvisitorCommentText: string) { this._visitorCommentText = pvisitorCommentText; }
    get timeSlot(): string { return this._timeSlot; }

    set timeSlot(ptimeSlot: string) { this._timeSlot = ptimeSlot; }
    get originalTimeSlot(): string { return this._originalTimeSlot; }

    set originalTimeSlot(poriginalTimeSlot: string) { this._originalTimeSlot = poriginalTimeSlot; }

    get checkFlag(): boolean { return this._checkFlag; }

    set checkFlag(pcheckFlag: boolean) { this._checkFlag = pcheckFlag; }

    get person(): number { return this._person; }

    set person(pperson: number) { this._person = pperson; }


    get personId(): number { return this._personId; }

    set personId(ppersonId: number) { this._personId = ppersonId; }

    get adult(): number { return this._adult; }

    set adult(padult: number) { this._adult = padult; }

    get group(): number { return this._group; }

    set group(pgroup: number) { this._group = pgroup; }

    public get stimetemp(): string { return this._stimetemp;   }

    public set stimetemp(value: string) { this._stimetemp = value;  }



    toJSON(): any {
        return {
            'code': this._code,
            'offenderBookId': this._offenderBookId,
            'visitOffenderBookId': this._visitOffenderBookId,
            'offenderIdDisplay': this._offenderIdDisplay,
            'raisedIncidentNumber': this._raisedIncidentNumber,
            'description': this._description,
            'commentText': this._commentText,
            'offenderFirstName': this._offenderFirstName,
            'outcomeReasonCode': this._outcomeReasonCode,
            'remainingVisitsType': this._remainingVisitsType,
            'serialVersionUID': this._serialVersionUID,
            'raisedIncidentType': this._raisedIncidentType,
            'cycleEnds': this._cycleEnds,
            'startTime': this._startTime,
            'visitDate': this._visitDate,
            'remainingTimeType': this._remainingTimeType,
            'offenderVisitId': this._offenderVisitId,
            'totalRemainingVisits': this._totalRemainingVisits,
            'offenderVisitVisitorId': this._offenderVisitVisitorId,
            'eventId': this._eventId,
            'totalRemainingTime': this._totalRemainingTime,
            'visitOwnerFlag': this._visitOwnerFlag,
            'agencyVisitSlotId': this._agencyVisitSlotId,
            'offenderLastName': this._offenderLastName,
            'visitInternalLocationId': this._visitInternalLocationId,
            'visitType': this._visitType,
            'visitStatus': this._visitStatus,
            'eventOutcome': this._eventOutcome,
            'eventStatus': this._eventStatus,
            'agyLocId': this._agyLocId,
            'checkSum': this._checkSum,
            'endTime': this._endTime,
            'offenderId': this._offenderId,
            'visitorCommentText': this._visitorCommentText,
            'timeSlot': this._timeSlot,
            'originalTimeSlot': this._originalTimeSlot,
            'checkFlag': this._checkFlag,
            'person': this._person,
            'personId': this._personId,
            'adult': this._adult,
            'group': this._group,
            'warningMsg': this._warningMsg,
            'insertCount': this._insertCount,
            'warnFlag': this._warnFlag,
            'conflictFlag': this._conflictFlag,
            'visitlimitFlag': this._visitlimitFlag,
            'stimetemp':this._stimetemp
        };
    }
}
