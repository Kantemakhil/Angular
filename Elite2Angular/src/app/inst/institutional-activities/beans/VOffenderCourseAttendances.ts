import { BaseModel } from "@common/beans/BaseModel";

export class VOffenderCourseAttendances extends BaseModel {
    private _actionCode: string;

    private _agreedTravelHour: number;

    private _agyLocId: string;

    private _behaviourCode: string;

    private _commentText: string;

    private _creditedHours: number;

    private _crsActyId: number;

    private _crsApptId: number;

    private _crsSchId: number;

    private _details: string;

    private _endTime: Date;

    private _engagementCode: string;

    private _eventClass: string;

    private _eventDate; Date;

    private _eventId: number;

    private _eventOutcome: string;

    private _eventOutcomeDesc: string;

    private _eventStatus; string;

    private _eventSubType: string;

    private _eventType: string;

    private _firstName: string;

    private _hiddenCommentText: string;

    private _inTime: Date;

    private _lastName: string;

    private _offCrsSchRefId: number;

    private _offPrgrefId: number;

    private _offenderBookId: number;

    private _offenderCourseApptRuleId: number;

    private _offenderId: number;

    private _offenderIdDisplay: string;

    private _offenderName: string;

    private _offenderSentConditionId: number;

    private _outTime: Date;

    private _outcomeReasonCode: string;

    private _performanceCode: string;

    private _performanceDesc: string;

    private _pieceWork: number;

    private _programCategory: string;

    private _programCategoryDesc: string;

    private _programId: number;

    private _referenceId: number;

    private _sentenceSeq: number;

    private _sickNoteExpiryDate: Date;

    private _sickNoteReceivedDate: Date;

    private _startTime: Date;

    private _supervisorName: string;

    private _supervisorStaffId: number;

    private _toAddressId: number;

    private _toAddressOwnerClass: string;

    private _toInternalLocationDesc: string;

    private _toInternalLocationId: number;

    private _understandingCode: string;

    private _unexcusedAbsenceFlag: string;

    private _hours: Date;

    private _totalAmount: number;

    private _detailId: number;
    
    private _type: string;
    
    get totalAmount(): number { return this._totalAmount; }

    set totalAmount(ptotalAmount: number) { this._totalAmount = ptotalAmount; }

    get hours(): Date { return this._hours; }

    set hours(phours: Date) { this.hours = phours; }

    get understandingCode(): string { return this._understandingCode; }

    set understandingCode(punderstandingCode: string) { this._understandingCode = punderstandingCode; }

    get toInternalLocationId(): number { return this._toInternalLocationId; }

    set toInternalLocationId(ptoInternalLocationId: number) { this._toInternalLocationId = ptoInternalLocationId; }

    get toInternalLocationDesc(): string { return this._toInternalLocationDesc; }

    set toInternalLocationDesc(ptoInternalLocationDesc: string) { this._toInternalLocationDesc = ptoInternalLocationDesc; }

    get toAddressId(): number { return this._toAddressId; }

    set toAddressId(ptoAddressId: number) { this._toAddressId = ptoAddressId; }

    get toAddressOwnerClass(): string { return this._toAddressOwnerClass; }

    set toAddressOwnerClass(ptoAddressOwnerClass: string) { this._toAddressOwnerClass = ptoAddressOwnerClass; }

    get supervisorName(): string { return this._supervisorName; }

    set supervisorName(psupervisorName: string) { this._supervisorName = psupervisorName; }

    get supervisorStaffId(): number { return this._supervisorStaffId; }

    set supervisorStaffId(psupervisorStaffId: number) { this._supervisorStaffId = psupervisorStaffId; }

    get programCategoryDesc(): string { return this._programCategoryDesc; }

    set programCategoryDesc(pprogramCategoryDesc: string) { this._programCategoryDesc = pprogramCategoryDesc; }

    get programCategory(): string { return this._programCategory; }

    set programCategory(pprogramCategory: string) { this._programCategory = pprogramCategory; }

    get performanceDesc(): string { return this._performanceDesc; }

    set performanceDesc(pperformanceDesc: string) { this._performanceDesc = pperformanceDesc; }


    get performanceCode(): string { return this._performanceCode; }

    set performanceCode(pperformanceCode: string) { this._performanceCode = pperformanceCode; }


    get outcomeReasonCode(): string { return this._outcomeReasonCode; }

    set outcomeReasonCode(poutcomeReasonCode: string) { this._outcomeReasonCode = poutcomeReasonCode; }

    get offenderName(): string { return this._offenderName; }

    set offenderName(poffenderName: string) { this._offenderName = poffenderName; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

    get lastName(): string { return this._lastName; }

    set lastName(plastName: string) { this._lastName = plastName; }

    get hiddenCommentText(): string { return this._hiddenCommentText; }

    set hiddenCommentText(phiddenCommentText: string) { this._hiddenCommentText = phiddenCommentText; }

    get firstName(): string { return this._firstName; }

    set firstName(pfirstName: string) { this._firstName = pfirstName; }

    get eventType(): string { return this._eventType; }

    set eventType(peventType: string) { this._eventType = peventType; }

    get eventSubType(): string { return this._eventSubType; }

    set eventSubType(peventSubType: string) { this._eventSubType = peventSubType; }

    get eventStatus(): string { return this._eventStatus; }

    set eventStatus(peventStatus: string) { this._eventStatus = peventStatus; }

    get eventOutcomeDesc(): string { return this._eventOutcomeDesc; }

    set eventOutcomeDesc(peventOutcomeDesc: string) { this._eventOutcomeDesc = peventOutcomeDesc; }

    get eventOutcome(): string { return this._eventOutcome; }

    set eventOutcome(peventOutcome: string) { this._eventOutcome = peventOutcome; }

    get eventClass(): string { return this._eventClass; }

    set eventClass(peventClass: string) { this._eventClass = peventClass; }

    get engagementCode(): string { return this._engagementCode; }

    set engagementCode(pengagementCode: string) { this._engagementCode = pengagementCode; }

    get details(): string { return this._details; }

    set details(pdetails: string) { this._details = pdetails; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get behaviourCode(): string { return this._behaviourCode; }

    set behaviourCode(pbehaviourCode: string) { this._behaviourCode = pbehaviourCode; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get actionCode(): string { return this._actionCode; }

    set actionCode(pactionCode: string) { this._actionCode = pactionCode; }

    get sentenceSeq(): number { return this._sentenceSeq; }

    set sentenceSeq(psentenceSeq: number) { this._sentenceSeq = psentenceSeq; }

    get referenceId(): number { return this._referenceId; }

    set referenceId(preferenceId: number) { this._referenceId = preferenceId; }

    get programId(): number { return this._programId; }

    set programId(pprogramId: number) { this._programId = pprogramId; }

    get pieceWork(): number { return this._pieceWork; }

    set pieceWork(ppieceWork: number) { this._pieceWork = ppieceWork; }

    get offenderSentConditionId(): number { return this._offenderSentConditionId; }

    set offenderSentConditionId(poffenderSentConditionId: number) { this._offenderSentConditionId = poffenderSentConditionId; }

    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get offenderCourseApptRuleId(): number { return this._offenderCourseApptRuleId; }

    set offenderCourseApptRuleId(poffenderCourseApptRuleId: number) { this._offenderCourseApptRuleId = poffenderCourseApptRuleId; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get eventId(): number { return this._eventId; }

    set eventId(peventId: number) { this._eventId = peventId; }

    get crsSchId(): number { return this._crsSchId; }

    set crsSchId(pcrsSchId: number) { this._crsSchId = pcrsSchId; }

    get crsApptId(): number { return this._crsApptId; }

    set crsApptId(pcrsApptId: number) { this._crsApptId = pcrsApptId; }

    get crsActyId(): number { return this._crsActyId; }

    set crsActyId(pcrsActyId: number) { this._crsActyId = pcrsActyId; }

    get creditedHours(): number { return this._creditedHours; }

    set creditedHours(pcreditedHours: number) { this._creditedHours = pcreditedHours; }

    get agreedTravelHour(): number { return this._agreedTravelHour; }

    set agreedTravelHour(pagreedTravelHour: number) { this._agreedTravelHour = pagreedTravelHour; }


    get startTime(): Date { return this._startTime; }

    set startTime(pstartTime: Date) { this.startTime = pstartTime; }

    get sickNoteReceivedDate(): Date { return this._sickNoteReceivedDate; }

    set sickNoteReceivedDate(psickNoteReceivedDate: Date) { this._sickNoteReceivedDate = psickNoteReceivedDate; }

    get sickNoteExpiryDate(): Date { return this._sickNoteExpiryDate; }

    set sickNoteExpiryDate(psickNoteExpiryDate: Date) { this._sickNoteExpiryDate = psickNoteExpiryDate; }

    get outTime(): Date { return this._outTime; }

    set outTime(poutTime: Date) { this._outTime = poutTime; }

    get inTime(): Date { return this._inTime; }

    set inTime(pinTime: Date) { this._inTime = pinTime; }

    get eventDate(): Date { return this._eventDate; }

    set eventDate(peventDate: Date) { this._eventDate = peventDate; }

    get endTime(): Date { return this._endTime; }

    set endTime(pendTime: Date) { this._endTime = pendTime; }

    get offPrgrefId(): number { return this._offPrgrefId; }

    set offPrgrefId(poffPrgrefId: number) { this._offPrgrefId = poffPrgrefId; }

    get offCrsSchRefId(): number { return this._offCrsSchRefId; }

    set offCrsSchRefId(poffCrsSchRefId: number) { this._offCrsSchRefId = poffCrsSchRefId; }

    get unexcusedAbsenceFlag(): string{ return  this._unexcusedAbsenceFlag }

    set unexcusedAbsenceFlag(punexcusedAbsenceFlag: string){ this._unexcusedAbsenceFlag = punexcusedAbsenceFlag }

    public get detailId(): number {  return this._detailId; }
    public set detailId(value: number) { this._detailId = value;}
    public get type(): string { return this._type; }
    public set type(value: string) {this._type = value;}

    toJSON(): any {
        return {


            'actionCode': this._actionCode,

            'agreedTravelHour': this._agreedTravelHour,

            'agyLocId': this._agyLocId,

            'behaviourCode': this._behaviourCode,

            'commentText': this._commentText,

            'creditedHours': this._creditedHours,

            'crsActyId': this._crsActyId,

            'crsApptId': this._crsApptId,

            'crsSchId': this._crsSchId,

            'details': this._details,

            'endTime': this._endTime,

            'engagementCode': this._engagementCode,

            'eventClass': this._eventClass,


            'eventId': this._eventId,

            'eventOutcome': this._eventOutcome,


            'eventStatus': this._eventStatus,

            'eventSubType': this._eventSubType,

            'eventType': this._eventType,

            'eventDate': this._eventDate,

            'firstName': this._firstName,

            'hiddenCommentText': this._hiddenCommentText,

            'inTime': this._inTime,

            'lastName': this._lastName,

            'offCrsSchRefId': this._offCrsSchRefId,

            'offPrgrefId': this._offPrgrefId,

            'offenderBookId': this._offenderBookId,

            'offenderCourseApptRuleId': this._offenderCourseApptRuleId,

            'offenderId': this._offenderId,

            'offenderIdDisplay': this._offenderIdDisplay,

            'offenderName': this._offenderName,

            'offenderSentConditionId': this._offenderSentConditionId,

            'outTime': this._outTime,

            'outcomeReasonCode': this._outcomeReasonCode,

            'performanceCode': this._performanceCode,

            'performanceDesc': this._performanceDesc,

            'pieceWork': this._pieceWork,

            'programCategory': this._programCategory,

            'programCategoryDesc': this._programCategoryDesc,

            'programId': this._programId,

            'referenceId': this._referenceId,

            'sentenceSeq': this._sentenceSeq,

            'sickNoteExpiryDate': this._sickNoteExpiryDate,

            'sickNoteReceivedDate': this._sickNoteReceivedDate,

            'startTime': this._startTime,

            'supervisorName': this._supervisorName,

            'supervisorStaffId': this._supervisorStaffId,

            'toAddressId': this._toAddressId,

            'toAddressOwnerClass': this._toAddressOwnerClass,

            'toInternalLocationDesc': this._toInternalLocationDesc,

            'toInternalLocationId': this._toInternalLocationId,

            'understandingCode': this._understandingCode,

            'eventOutcomeDesc': this._eventOutcomeDesc,

            'unexcusedAbsenceFlag': this._unexcusedAbsenceFlag,

            'hours': this._hours,
            'totalAmount' : this.totalAmount,
            'detailId': this._detailId,
            'type' : this._type

        };
    }
}
