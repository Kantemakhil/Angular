import { BaseModel } from '@commonbeans/BaseModel';
export class VOffenderCourseEvents extends BaseModel {
    private _crsApptId: number;
    private _unexcusedAbsenceFlag: string;
    private _offenderBookId: number;
    private _extMoveInTime: Date;
    private _weekday: string;
    private _behaviourCode: string;
    private _crsActyId: number;
    private _scheduleMovementTime: Date;
    private _actionCode: string;
    private _supervisorStaffId: number;
    private _performanceDesc: string;
    private _eventId: number;
    private _toInternalLocationId: number;
    private _engagementCode: string;
    private _agreedTravelHour: number;
    private _eventType: string;
    private _eventOutcomeDesc: string;
    private _checkSum: number;
    private _outTime: Date;
    private _eventDate: Date;
    private _performanceCode: string;
    private _courseCode: string;
    private _courseCodeTemp :string;
    private _description: string;
    private _commentText: string;
    private _sessionNo: number;
    private _outcomeReasonCode: string;
    private _referenceId: number;
    private _serialVersionUID: number;
    private _offPrgrefId: number;
    private _pieceWork: number;
    private _crsSchId: number;
    private _startTime: Date;
    private _sickNoteReceivedDate: Date;
    private _understandingCode: string;
    private _toAgyLocId: string;
    private _recordSource: string;
    private _extMoveOutTime: Date;
    private _eventClass: string;
    private _eventSubType: string;
    private _sickNoteExpiryDate: Date;
    private _creditedHours: number;
    private _directionCode: string;
    private _inTime: Date;
    private _eventOutcome: string;
    private _eventStatus: string;
    private _agyLocId: string;
    private _endTime: Date;
    private _programId: number;
    private _toAddressId: number;
    private _dbStartTime: Date;
    private _dbEndTime: Date;
    private _eventFlag: boolean;
    private _teamId: number;
    private _pOffenderIdDisplay: string;
    private _pName: string;
    private _pAttendance: string;
    private _pBehaviour: string;
    private _pWorkQuality: string;
    private _pSupervisorName: string;
    private _pCode: string;
    private _pActivityDesc: string;
    private _penalty: Date;
    private _nbtPenalty: Date;
    private _nbtHours: Date;
    private _nbtTravel: Date;
    private _nbtCreditedHours: Date;
    private _nbtRecordOffPrgrefId: number;
    private _nbtRecordCrsActyId: number;
    private _eventOutcomeDbVal: string;
    private _pOldUa: boolean;
    private _pNewUa: boolean;
    private _pMultipleFailure: boolean;
    private _view: string;
    private _nbtCrsActyId: number;
    private _offenderCourseApptGrpId: number;
    private _programCategory: string;
    private _recordStatus: boolean;
    private _courseScheduleRuleId: number;

    private _nbtProjectRefStrId: number;
    private _nbtRefCrsActyId: number;
    private _line: string;

    get courseScheduleRuleId(): number { return this._courseScheduleRuleId; }
    set courseScheduleRuleId(pcourseScheduleRuleId: number) { this._courseScheduleRuleId = pcourseScheduleRuleId ; }

    get recordStatus(): boolean { return this._recordStatus; }
    set recordStatus(precordStatus: boolean) { this._recordStatus = precordStatus; }

    public get programCategory(): string {
        return this._programCategory;
    }
    public set programCategory(value: string) {
        this._programCategory = value;
    }
    public get offenderCourseApptGrpId(): number {
        return this._offenderCourseApptGrpId;
    }
    public set offenderCourseApptGrpId(value: number) {
        this._offenderCourseApptGrpId = value;
    }
    private _startDate: Date;
    public get startDate(): Date {
        return this._startDate;
    }
    public set startDate(value: Date) {
        this._startDate = value;
    }

    get view(): string { return this._view; }
    set view(value: string) { this._view = value; }








    get pOldUa(): boolean { return this._pOldUa; }

    set pOldUa(ppOldUa: boolean) { this._pOldUa = ppOldUa; }
    get pNewUa(): boolean { return this._pNewUa; }

    set pNewUa(ppNewUa: boolean) { this._pNewUa = ppNewUa; }
    get pMultipleFailure(): boolean { return this._pMultipleFailure; }

    set pMultipleFailure(ppMultipleFailure: boolean) { this._pMultipleFailure = ppMultipleFailure; }

    get eventOutcomeDbVal(): string { return this._eventOutcomeDbVal; }

    set eventOutcomeDbVal(peventOutcomeDbVal: string) { this._eventOutcomeDbVal = peventOutcomeDbVal; }
    get nbtRecordCrsActyId(): number { return this._nbtRecordCrsActyId; }

    set nbtRecordCrsActyId(pnbtRecordCrsActyId: number) { this._nbtRecordCrsActyId = pnbtRecordCrsActyId; }
    get nbtRecordOffPrgrefId(): number { return this._nbtRecordOffPrgrefId; }

    set nbtRecordOffPrgrefId(pnbtRecordOffPrgrefId: number) { this._nbtRecordOffPrgrefId = pnbtRecordOffPrgrefId; }

    get nbtTravel(): Date { return this._nbtTravel; }

    set nbtTravel(pnbtTravel: Date) { this._nbtTravel = pnbtTravel; }

    get nbtCreditedHours(): Date { return this._nbtCreditedHours; }

    set nbtCreditedHours(pnbtCreditedHours: Date) { this._nbtCreditedHours = pnbtCreditedHours; }

    get nbtPenalty(): Date { return this._nbtPenalty; }

    set nbtPenalty(pnbtPenalty: Date) { this._nbtPenalty = pnbtPenalty; }
    get nbtHours(): Date { return this._nbtHours; }

    set nbtHours(pnbtHours: Date) { this._nbtHours = pnbtHours; }

    get penalty(): Date { return this._penalty; }

    set penalty(ppenalty: Date) { this._penalty = ppenalty; }

    get pOffenderIdDisplay(): string { return this._pOffenderIdDisplay; }

    set pOffenderIdDisplay(ppOffenderIdDisplay: string) { this._pOffenderIdDisplay = ppOffenderIdDisplay; }

    get pName(): string { return this._pName; }

    set pName(ppName: string) { this._pName = ppName; }

    get pAttendance(): string { return this._pAttendance; }

    set pAttendance(ppAttendance: string) { this._pAttendance = ppAttendance; }

    get pBehaviour(): string { return this._pBehaviour; }

    set pBehaviour(ppBehaviour: string) { this._pBehaviour = ppBehaviour; }

    get pWorkQuality(): string { return this._pWorkQuality; }

    set pWorkQuality(ppWorkQuality: string) { this._pWorkQuality = ppWorkQuality; }

    get pSupervisorName(): string { return this._pSupervisorName; }

    set pSupervisorName(ppSupervisorName: string) { this._pSupervisorName = ppSupervisorName; }

    get pCode(): string { return this._pCode; }

    set pCode(ppCode: string) { this._pCode = ppCode; }

    get pActivityDesc(): string { return this._pActivityDesc; }

    set pActivityDesc(ppActivityDesc: string) { this._pActivityDesc = ppActivityDesc; }

    get teamId(): number { return this._teamId; }

    set teamId(pteamId: number) { this._teamId = pteamId; }

    get eventFlag(): boolean { return this._eventFlag; }

    set eventFlag(peventFlag: boolean) { this._eventFlag = peventFlag; }

    get dbStartTime(): Date { return this._dbStartTime; }

    set dbStartTime(pdbStartTime: Date) { this._dbStartTime = pdbStartTime; }

    get dbEndTime(): Date { return this._dbEndTime; }

    set dbEndTime(pdbEndTime: Date) { this._dbEndTime = pdbEndTime; }

    get crsApptId(): number { return this._crsApptId; }

    set crsApptId(pcrsApptId: number) { this._crsApptId = pcrsApptId; }

    get unexcusedAbsenceFlag(): string { return this._unexcusedAbsenceFlag; }

    set unexcusedAbsenceFlag(punexcusedAbsenceFlag: string) { this._unexcusedAbsenceFlag = punexcusedAbsenceFlag; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get extMoveInTime(): Date { return this._extMoveInTime; }

    set extMoveInTime(pextMoveInTime: Date) { this._extMoveInTime = pextMoveInTime; }

    get weekday(): string { return this._weekday; }

    set weekday(pweekday: string) { this._weekday = pweekday; }

    get behaviourCode(): string { return this._behaviourCode; }

    set behaviourCode(pbehaviourCode: string) { this._behaviourCode = pbehaviourCode; }

    get crsActyId(): number { return this._crsActyId; }

    set crsActyId(pcrsActyId: number) { this._crsActyId = pcrsActyId; }
    get nbtCrsActyId(): number { return this._nbtCrsActyId; }

    set nbtCrsActyId(pnbtCrsActyId: number) { this._nbtCrsActyId = pnbtCrsActyId; }

    get scheduleMovementTime(): Date { return this._scheduleMovementTime; }

    set scheduleMovementTime(pscheduleMovementTime: Date) { this._scheduleMovementTime = pscheduleMovementTime; }

    get actionCode(): string { return this._actionCode; }

    set actionCode(pactionCode: string) { this._actionCode = pactionCode; }

    get supervisorStaffId(): number { return this._supervisorStaffId; }

    set supervisorStaffId(psupervisorStaffId: number) { this._supervisorStaffId = psupervisorStaffId; }

    get performanceDesc(): string { return this._performanceDesc; }

    set performanceDesc(pperformanceDesc: string) { this._performanceDesc = pperformanceDesc; }

    get eventId(): number { return this._eventId; }

    set eventId(peventId: number) { this._eventId = peventId; }

    get toInternalLocationId(): number { return this._toInternalLocationId; }

    set toInternalLocationId(ptoInternalLocationId: number) { this._toInternalLocationId = ptoInternalLocationId; }

    get engagementCode(): string { return this._engagementCode; }

    set engagementCode(pengagementCode: string) { this._engagementCode = pengagementCode; }

    get agreedTravelHour(): number { return this._agreedTravelHour; }

    set agreedTravelHour(pagreedTravelHour: number) { this._agreedTravelHour = pagreedTravelHour; }

    get eventType(): string { return this._eventType; }

    set eventType(peventType: string) { this._eventType = peventType; }

    get eventOutcomeDesc(): string { return this._eventOutcomeDesc; }

    set eventOutcomeDesc(peventOutcomeDesc: string) { this._eventOutcomeDesc = peventOutcomeDesc; }

    get checkSum(): number { return this._checkSum; }

    set checkSum(pcheckSum: number) { this._checkSum = pcheckSum; }

    get outTime(): Date { return this._outTime; }

    set outTime(poutTime: Date) { this._outTime = poutTime; }

    get eventDate(): Date { return this._eventDate; }

    set eventDate(peventDate: Date) { this._eventDate = peventDate; }

    get performanceCode(): string { return this._performanceCode; }

    set performanceCode(pperformanceCode: string) { this._performanceCode = pperformanceCode; }

    get courseCode(): string { return this._courseCode; }

    set courseCode(pcourseCode: string) { this._courseCode = pcourseCode; }

    get courseCodeTemp(): string { return this._courseCodeTemp; }

    set courseCodeTemp(pcourseCodeTemp: string) { this._courseCodeTemp = pcourseCodeTemp; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get sessionNo(): number { return this._sessionNo; }

    set sessionNo(psessionNo: number) { this._sessionNo = psessionNo; }

    get outcomeReasonCode(): string { return this._outcomeReasonCode; }

    set outcomeReasonCode(poutcomeReasonCode: string) { this._outcomeReasonCode = poutcomeReasonCode; }

    get referenceId(): number { return this._referenceId; }

    set referenceId(preferenceId: number) { this._referenceId = preferenceId; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get offPrgrefId(): number { return this._offPrgrefId; }

    set offPrgrefId(poffPrgrefId: number) { this._offPrgrefId = poffPrgrefId; }

    get pieceWork(): number { return this._pieceWork; }

    set pieceWork(ppieceWork: number) { this._pieceWork = ppieceWork; }

    get crsSchId(): number { return this._crsSchId; }

    set crsSchId(pcrsSchId: number) { this._crsSchId = pcrsSchId; }

    get startTime(): Date { return this._startTime; }

    set startTime(pstartTime: Date) { this._startTime = pstartTime; }

    get sickNoteReceivedDate(): Date { return this._sickNoteReceivedDate; }

    set sickNoteReceivedDate(psickNoteReceivedDate: Date) { this._sickNoteReceivedDate = psickNoteReceivedDate; }

    get understandingCode(): string { return this._understandingCode; }

    set understandingCode(punderstandingCode: string) { this._understandingCode = punderstandingCode; }

    get toAgyLocId(): string { return this._toAgyLocId; }

    set toAgyLocId(ptoAgyLocId: string) { this._toAgyLocId = ptoAgyLocId; }

    get recordSource(): string { return this._recordSource; }

    set recordSource(precordSource: string) { this._recordSource = precordSource; }

    get extMoveOutTime(): Date { return this._extMoveOutTime; }

    set extMoveOutTime(pextMoveOutTime: Date) { this._extMoveOutTime = pextMoveOutTime; }

    get eventClass(): string { return this._eventClass; }

    set eventClass(peventClass: string) { this._eventClass = peventClass; }

    get eventSubType(): string { return this._eventSubType; }

    set eventSubType(peventSubType: string) { this._eventSubType = peventSubType; }

    get sickNoteExpiryDate(): Date { return this._sickNoteExpiryDate; }

    set sickNoteExpiryDate(psickNoteExpiryDate: Date) { this._sickNoteExpiryDate = psickNoteExpiryDate; }

    get creditedHours(): number { return this._creditedHours; }

    set creditedHours(pcreditedHours: number) { this._creditedHours = pcreditedHours; }

    get directionCode(): string { return this._directionCode; }

    set directionCode(pdirectionCode: string) { this._directionCode = pdirectionCode; }

    get inTime(): Date { return this._inTime; }

    set inTime(pinTime: Date) { this._inTime = pinTime; }

    get eventOutcome(): string { return this._eventOutcome; }

    set eventOutcome(peventOutcome: string) { this._eventOutcome = peventOutcome; }

    get eventStatus(): string { return this._eventStatus; }

    set eventStatus(peventStatus: string) { this._eventStatus = peventStatus; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get endTime(): Date { return this._endTime; }

    set endTime(pendTime: Date) { this._endTime = pendTime; }

    get programId(): number { return this._programId; }

    set programId(pprogramId: number) { this._programId = pprogramId; }

    get toAddressId(): number { return this._toAddressId; }

    set toAddressId(ptoAddressId: number) { this._toAddressId = ptoAddressId; }


    get nbtProjectRefStrId(): number { return this._nbtProjectRefStrId; }
    set nbtProjectRefStrId(pnbtProjectRefStrId: number) { this._nbtProjectRefStrId = pnbtProjectRefStrId; }

    set nbtRefCrsActyId(pnbtRefCrsActyId: number) { this._nbtRefCrsActyId = pnbtRefCrsActyId; }
    get nbtRefCrsActyId(): number { return this._nbtRefCrsActyId; }

    get line(): string { return this._line; }
    set line(pline: string) { this._line = pline; }
    

    toJSON(): any {
        return {
            'crsApptId': this._crsApptId,
            'unexcusedAbsenceFlag': this._unexcusedAbsenceFlag,
            'offenderBookId': this._offenderBookId,
            'extMoveInTime': this._extMoveInTime,
            'weekday': this._weekday,
            'behaviourCode': this._behaviourCode,
            'crsActyId': this._crsActyId,
            'scheduleMovementTime': this._scheduleMovementTime,
            'actionCode': this._actionCode,
            'supervisorStaffId': this._supervisorStaffId,
            'performanceDesc': this._performanceDesc,
            'eventId': this._eventId,
            'toInternalLocationId': this._toInternalLocationId,
            'engagementCode': this._engagementCode,
            'agreedTravelHour': this._agreedTravelHour,
            'eventType': this._eventType,
            'eventOutcomeDesc': this._eventOutcomeDesc,
            'checkSum': this._checkSum,
            'outTime': this._outTime,
            'eventDate': this._eventDate,
            'performanceCode': this._performanceCode,
            'courseCode': this._courseCode,
            'courseCodeTemp': this._courseCodeTemp,
            'description': this._description,
            'commentText': this._commentText,
            'sessionNo': this._sessionNo,
            'outcomeReasonCode': this._outcomeReasonCode,
            'referenceId': this._referenceId,
            'serialVersionUID': this._serialVersionUID,
            'offPrgrefId': this._offPrgrefId,
            'pieceWork': this._pieceWork,
            'crsSchId': this._crsSchId,
            'startTime': this._startTime,
            'sickNoteReceivedDate': this._sickNoteReceivedDate,
            'understandingCode': this._understandingCode,
            'toAgyLocId': this._toAgyLocId,
            'recordSource': this._recordSource,
            'extMoveOutTime': this._extMoveOutTime,
            'eventClass': this._eventClass,
            'eventSubType': this._eventSubType,
            'sickNoteExpiryDate': this._sickNoteExpiryDate,
            'creditedHours': this._creditedHours,
            'directionCode': this._directionCode,
            'inTime': this._inTime,
            'eventOutcome': this._eventOutcome,
            'eventStatus': this._eventStatus,
            'agyLocId': this._agyLocId,
            'endTime': this._endTime,
            'programId': this._programId,
            'toAddressId': this._toAddressId,
            'dbEndTime': this._dbEndTime,
            'dbStartTime': this._dbStartTime,
            'eventFlag': this._eventFlag,
            'teamId': this._teamId,
            'pOffenderIdDisplay': this._pOffenderIdDisplay,
            'pName': this._pName,
            'pAttendance': this._pAttendance,
            'pBehaviour': this._pBehaviour,
            'pWorkQuality': this._pWorkQuality,
            'pSupervisorName': this._pSupervisorName,
            'pCode': this._pCode,
            'pActivityDesc': this._pActivityDesc,
            'penalty': this._penalty,
            'nbtHours': this._nbtHours,
            'nbtPenalty': this._nbtPenalty,
            'nbtTravel': this._nbtTravel,
            'nbtCreditedHours': this._nbtCreditedHours,
            'nbtRecordOffPrgrefId': this._nbtRecordOffPrgrefId,
            'nbtRecordCrsActyId': this._nbtRecordCrsActyId,
            'eventOutcomeDbVal': this._eventOutcomeDbVal,
            'pOldUa': this._pOldUa,
            'pNewUa': this._pNewUa,
            'pMultipleFailure': this._pMultipleFailure,
            'nbtCrsActyId': this._nbtCrsActyId,
            'offenderCourseApptGrpId': this._offenderCourseApptGrpId,
            'startDate': this._startDate,
            'programCategory': this._programCategory,
            'courseScheduleRuleId': this._courseScheduleRuleId,
            'nbtProjectRefStrId' : this._nbtProjectRefStrId,
            'nbtRefCrsActyId' : this._nbtRefCrsActyId,
            'line' : this._line
        };
    }
}
