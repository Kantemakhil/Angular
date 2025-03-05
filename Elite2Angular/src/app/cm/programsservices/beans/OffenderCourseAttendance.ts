import { BaseModel } from '@common/beans/BaseModel';

export class OffenderCourseAttendance extends BaseModel {
    private _crsApptId: number;
    private _unexcusedAbsenceFlag: string;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _behaviourCode: string;
    private _txnEntrySeq: number;
    private _crsActyId: number;
    private _actionCode: string;
    private _details: string;
    private _sealFlag: string;
    private _supervisorStaffId: number;
    private _toAddressOwnerClass: string;
    private _eventId: number;
    private _toInternalLocationId: number;
    private _hiddenCommentText: string;
    private _engagementCode: string;
    private _agreedTravelHour: number;
    private _eventType: string;
    private _offenderCourseApptRuleId: number;
    private _outTime: Date;
    private _payFlag: string;
    private _eventDate: Date;
    private _txnId: number;
    private _supervisorName: string;
    private _offCrsSchRefId: number;
    private _performanceCode: string;
    private _commentText: string;
    private _sessionNo: number;
    private _outcomeReasonCode: string;
    private _referenceId: number;
    private _serialVersionUID: number;
    private _authorisedAbsenceFlag: string;
    private _offPrgrefId: number;
    private _pieceWork: number;
    private _crsSchId: number;
    private _startTime: Date;
    private _sickNoteReceivedDate: Date;
    private _understandingCode: string;
    private _toAgyLocId: string;
    private _eventClass: string;
    private _eventSubType: string;
    private _sickNoteExpiryDate: Date;
    private _creditedHours: number;
    private _bonusPay: number;
    private _directionCode: string;
    private _createDatetime: Date;
    private _inTime: Date;
    private _eventOutcome: string;
    private _eventStatus: string;
    private _agyLocId: string;
    private _offenderPrgObligationId: number;
    private _endTime: Date;
    private _programId: number;
    private _toAddressId: number;



    private _service:string;;
    private _programe:string;
    private _moduleFlag:string;
    private _viewCode:string;
    private _catchUpFlag:string;
    private _cFlag:boolean;

	 private _caseloadType: string;
    private _payLockFlag: string; 
    private _payLockTemp: boolean; 
    private _select: boolean; 

    private _eventOutcomeDbVal: string;
    private _phaseId: string;
    private _moduleId: number;
    private _staffName: string;
    private _parentField: string;
    private _catchUpCrsSchId:number;
    private _scheduleDate:Date; 
    private _offenderBookId: number;
    private _offenderIdDisplay: number;
    private _nbtHours: Date;
    private _smsFlag: string;
    private _phoneNumberCount: number;
    private _emailAddressCount: number;
    private _emailFlagConfig: string;
    private _offAllowanceId: number;

    public get emailFlagConfig(): string {
        return this._emailFlagConfig;
    }
    public set emailFlagConfig(value: string) {
        this._emailFlagConfig = value;
    }
    private _smsFlagConfig: string;
    public get smsFlagConfig(): string {
        return this._smsFlagConfig;
    }
    public set smsFlagConfig(value: string) {
        this._smsFlagConfig = value;
    }
    public get emailAddressCount(): number {
        return this._emailAddressCount;
    }
    public set emailAddressCount(value: number) {
        this._emailAddressCount = value;
    }
    public get phoneNumberCount(): number {
        return this._phoneNumberCount;
    }
    public set phoneNumberCount(value: number) {
        this._phoneNumberCount = value;
    }
    public get smsFlag(): string {
        return this._smsFlag;
    }
    public set smsFlag(value: string) {
        this._smsFlag = value;
    }
    private _emailFlag: string;
    public get emailFlag(): string {
        return this._emailFlag;
    }
    public set emailFlag(value: string) {
        this._emailFlag = value;
    }
    private _emailScheduleHoursBefore: number;
    public get emailScheduleHoursBefore(): number {
        return this._emailScheduleHoursBefore;
    }
    public set emailScheduleHoursBefore(value: number) {
        this._emailScheduleHoursBefore = value;
    }
    private _smsScheduleHoursBefore: number;
    public get smsScheduleHoursBefore(): number {
        return this._smsScheduleHoursBefore;
    }
    public set smsScheduleHoursBefore(value: number) {
        this._smsScheduleHoursBefore = value;
    }

    get nbtHours(): Date { return this._nbtHours; }

    set nbtHours(pnbtHours: Date) { this._nbtHours = pnbtHours; }

    get offenderIdDisplay(): number { return this._offenderIdDisplay }
    
    set offenderIdDisplay(poffenderIdDisplay: number) { this._offenderIdDisplay = poffenderIdDisplay }

    get offenderBookId(): number { return this._offenderBookId }
    
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId }

    get catchUpCrsSchId(): number { return this._catchUpCrsSchId; }
    set catchUpCrsSchId(pcatchUpCrsSchId: number) { this._catchUpCrsSchId = pcatchUpCrsSchId; }

    get parentField(): string { return this._parentField; }
    set parentField(pparentField: string) { this._parentField = pparentField; }

    get phaseId(): string { return this._phaseId; }
    set phaseId(pphaseId: string) { this._phaseId = pphaseId; }

    get moduleId(): number { return this._moduleId; }
    set moduleId(pmoduleId: number) { this._moduleId = pmoduleId; }

    get staffName(): string { return this._staffName; }
    set staffName(pstaffName: string) { this._staffName = pstaffName; }

    get scheduleDate(): Date { return this._scheduleDate; }
    
    set scheduleDate(pscheduleDate: Date) { this._scheduleDate = pscheduleDate; }

    get crsApptId(): number { return this._crsApptId; }

    set crsApptId(pcrsApptId: number) { this._crsApptId = pcrsApptId; }

    get unexcusedAbsenceFlag(): string { return this._unexcusedAbsenceFlag; }

    set unexcusedAbsenceFlag(punexcusedAbsenceFlag: string) { this._unexcusedAbsenceFlag = punexcusedAbsenceFlag; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get behaviourCode(): string { return this._behaviourCode; }

    set behaviourCode(pbehaviourCode: string) { this._behaviourCode = pbehaviourCode; }

    get txnEntrySeq(): number { return this._txnEntrySeq; }

    set txnEntrySeq(ptxnEntrySeq: number) { this._txnEntrySeq = ptxnEntrySeq; }

    get crsActyId(): number { return this._crsActyId; }

    set crsActyId(pcrsActyId: number) { this._crsActyId = pcrsActyId; }

    get actionCode(): string { return this._actionCode; }

    set actionCode(pactionCode: string) { this._actionCode = pactionCode; }

    get details(): string { return this._details; }

    set details(pdetails: string) { this._details = pdetails; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get supervisorStaffId(): number { return this._supervisorStaffId; }

    set supervisorStaffId(psupervisorStaffId: number) { this._supervisorStaffId = psupervisorStaffId; }

    get toAddressOwnerClass(): string { return this._toAddressOwnerClass; }

    set toAddressOwnerClass(ptoAddressOwnerClass: string) { this._toAddressOwnerClass = ptoAddressOwnerClass; }

    get eventId(): number { return this._eventId; }

    set eventId(peventId: number) { this._eventId = peventId; }

    get toInternalLocationId(): number { return this._toInternalLocationId; }

    set toInternalLocationId(ptoInternalLocationId: number) { this._toInternalLocationId = ptoInternalLocationId; }

    get hiddenCommentText(): string { return this._hiddenCommentText; }

    set hiddenCommentText(phiddenCommentText: string) { this._hiddenCommentText = phiddenCommentText; }

    get engagementCode(): string { return this._engagementCode; }

    set engagementCode(pengagementCode: string) { this._engagementCode = pengagementCode; }

    get agreedTravelHour(): number { return this._agreedTravelHour; }

    set agreedTravelHour(pagreedTravelHour: number) { this._agreedTravelHour = pagreedTravelHour; }

    get eventType(): string { return this._eventType; }

    set eventType(peventType: string) { this._eventType = peventType; }

    get offenderCourseApptRuleId(): number { return this._offenderCourseApptRuleId; }

    set offenderCourseApptRuleId(poffenderCourseApptRuleId: number) { this._offenderCourseApptRuleId = poffenderCourseApptRuleId; }

    get outTime(): Date { return this._outTime; }

    set outTime(poutTime: Date) { this._outTime = poutTime; }

    get payFlag(): string { return this._payFlag; }

    set payFlag(ppayFlag: string) { this._payFlag = ppayFlag; }

    get eventDate(): Date { return this._eventDate; }

    set eventDate(peventDate: Date) { this._eventDate = peventDate; }

    get txnId(): number { return this._txnId; }

    set txnId(ptxnId: number) { this._txnId = ptxnId; }

    get supervisorName(): string { return this._supervisorName; }

    set supervisorName(psupervisorName: string) { this._supervisorName = psupervisorName; }

    get offCrsSchRefId(): number { return this._offCrsSchRefId; }

    set offCrsSchRefId(poffCrsSchRefId: number) { this._offCrsSchRefId = poffCrsSchRefId; }

    get performanceCode(): string { return this._performanceCode; }

    set performanceCode(pperformanceCode: string) { this._performanceCode = pperformanceCode; }

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

    get authorisedAbsenceFlag(): string { return this._authorisedAbsenceFlag; }

    set authorisedAbsenceFlag(pauthorisedAbsenceFlag: string) { this._authorisedAbsenceFlag = pauthorisedAbsenceFlag; }

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

    get eventClass(): string { return this._eventClass; }

    set eventClass(peventClass: string) { this._eventClass = peventClass; }

    get eventSubType(): string { return this._eventSubType; }

    set eventSubType(peventSubType: string) { this._eventSubType = peventSubType; }

    get sickNoteExpiryDate(): Date { return this._sickNoteExpiryDate; }

    set sickNoteExpiryDate(psickNoteExpiryDate: Date) { this._sickNoteExpiryDate = psickNoteExpiryDate; }

    get creditedHours(): number { return this._creditedHours; }

    set creditedHours(pcreditedHours: number) { this._creditedHours = pcreditedHours; }

    get bonusPay(): number { return this._bonusPay; }

    set bonusPay(pbonusPay: number) { this._bonusPay = pbonusPay; }

    get directionCode(): string { return this._directionCode; }

    set directionCode(pdirectionCode: string) { this._directionCode = pdirectionCode; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get inTime(): Date { return this._inTime; }

    set inTime(pinTime: Date) { this._inTime = pinTime; }

    get eventOutcome(): string { return this._eventOutcome; }

    set eventOutcome(peventOutcome: string) { this._eventOutcome = peventOutcome; }

    get eventStatus(): string { return this._eventStatus; }

    set eventStatus(peventStatus: string) { this._eventStatus = peventStatus; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get offenderPrgObligationId(): number { return this._offenderPrgObligationId; }

    set offenderPrgObligationId(poffenderPrgObligationId: number) { this._offenderPrgObligationId = poffenderPrgObligationId; }

    get endTime(): Date { return this._endTime; }

    set endTime(pendTime: Date) { this._endTime = pendTime; }

    get programId(): number { return this._programId; }

    set programId(pprogramId: number) { this._programId = pprogramId; }

    get toAddressId(): number { return this._toAddressId; }

    set toAddressId(ptoAddressId: number) { this._toAddressId = ptoAddressId; }

    get service(): string{ return this._service; }
    set service(pservice: string){ this._service = pservice ;}

    get programe(): string{ return this._programe; }
    set programe(pprograme: string){ this._programe = pprograme ;}

    get moduleFlag(): string{ return this._moduleFlag; }
    set moduleFlag(pmoduleFlag: string){ this._moduleFlag= pmoduleFlag ;}

    get viewCode(): string{ return this._viewCode; }
    set viewCode(pviewCode: string){ this._viewCode = pviewCode ;}

    get catchUpFlag(): string{ return this._catchUpFlag; }
    set catchUpFlag(pcatchUpFlag: string){ this._catchUpFlag = pcatchUpFlag ;}

    get cFlag(): boolean{ return this._cFlag; }
    set cFlag(p_cFlag: boolean){ this._cFlag = p_cFlag ;}
    
    get caseloadType(): string { return this._caseloadType; }
    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }
    
    get payLockFlag(): string { return this._payLockFlag; }

    set payLockFlag(ppayLockFlag: string) { this._payLockFlag = ppayLockFlag; }

    get payLockTemp(): boolean { return this._payLockTemp; }
    set payLockTemp(ppayLockTemp: boolean) { this._payLockTemp = ppayLockTemp; }

    get eventOutcomeDbVal(): string { return this._eventOutcomeDbVal; }

    set eventOutcomeDbVal(peventOutcomeDbVal: string) { this._eventOutcomeDbVal = peventOutcomeDbVal; }

    get select(): boolean { return this._select; }
    set select(pselect: boolean) { this._select = pselect; }

    public get offAllowanceId(): number { return this._offAllowanceId; }
    public set offAllowanceId(value: number) { this._offAllowanceId = value; }
    toJSON(): any {
        return {
            'crsApptId': this._crsApptId,
            'unexcusedAbsenceFlag': this._unexcusedAbsenceFlag,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'behaviourCode': this._behaviourCode,
            'txnEntrySeq': this._txnEntrySeq,
            'crsActyId': this._crsActyId,
            'actionCode': this._actionCode,
            'details': this._details,
            'sealFlag': this._sealFlag,
            'supervisorStaffId': this._supervisorStaffId,
            'toAddressOwnerClass': this._toAddressOwnerClass,
            'eventId': this._eventId,
            'toInternalLocationId': this._toInternalLocationId,
            'hiddenCommentText': this._hiddenCommentText,
            'engagementCode': this._engagementCode,
            'agreedTravelHour': this._agreedTravelHour,
            'eventType': this._eventType,
            'offenderCourseApptRuleId': this._offenderCourseApptRuleId,
            'outTime': this._outTime,
            'payFlag': this._payFlag,
            'eventDate': this._eventDate,
            'txnId': this._txnId,
            'supervisorName': this._supervisorName,
            'offCrsSchRefId': this._offCrsSchRefId,
            'performanceCode': this._performanceCode,
            'commentText': this._commentText,
            'sessionNo': this._sessionNo,
            'outcomeReasonCode': this._outcomeReasonCode,
            'referenceId': this._referenceId,
            'serialVersionUID': this._serialVersionUID,
            'authorisedAbsenceFlag': this._authorisedAbsenceFlag,
            'offPrgrefId': this._offPrgrefId,
            'pieceWork': this._pieceWork,
            'crsSchId': this._crsSchId,
            'startTime': this._startTime,
            'sickNoteReceivedDate': this._sickNoteReceivedDate,
            'understandingCode': this._understandingCode,
            'toAgyLocId': this._toAgyLocId,
            'eventClass': this._eventClass,
            'eventSubType': this._eventSubType,
            'sickNoteExpiryDate': this._sickNoteExpiryDate,
            'creditedHours': this._creditedHours,
            'bonusPay': this._bonusPay,
            'directionCode': this._directionCode,
            'createDatetime': this._createDatetime,
            'inTime': this._inTime,
            'eventOutcome': this._eventOutcome,
            'eventStatus': this._eventStatus,
            'agyLocId': this._agyLocId,
            'offenderPrgObligationId': this._offenderPrgObligationId,
            'endTime': this._endTime,
            'programId': this._programId,
            'toAddressId': this._toAddressId,


            'service':this._service,
			'programe':this._programe,
			'moduleFlag':this._moduleFlag,
			'viewCode':this._viewCode,
			'catchUpFlag':this._catchUpFlag,
			'cFlag':this._cFlag,
			  'caseloadType': this._caseloadType,
            'payLockFlag': this._payLockFlag,
            'payLockTemp': this._payLockTemp,
            'eventOutcomeDbVal': this._eventOutcomeDbVal,
            'select': this._select,
            'offenderBookId': this._offenderBookId,
            'phaseId': this._phaseId,
            'moduleId': this._moduleId,
            'staffName': this._staffName,
            'parentField': this._parentField,
            'catchUpCrsSchId':this._catchUpCrsSchId,
            'scheduleDate' : this._scheduleDate,
            'offenderIdDisplay': this._offenderIdDisplay,
            'nbtHours': this._nbtHours,
            'emailFlag':this._emailFlag,
            'smsFlag':this._smsFlag,
            'emailScheduleHoursBefore':this._emailScheduleHoursBefore,
            'smsScheduleHoursBefore':this._smsScheduleHoursBefore,
            'emailFlagConfig':this._emailFlagConfig,
            'smsFlagConfig': this._smsFlagConfig,
            'offAllowanceId': this._offAllowanceId,
        };
    }
}
