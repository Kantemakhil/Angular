import { Offenders } from '@common/beans/Offenders';
import { BaseModel } from '@commonbeans/BaseModel';

export class CourtEvents extends BaseModel {

    private _eventId: number;
    private _caseId: number;
    private _offenderBookId: number;
    private _eventDate: Date;
    private _startTime: Date;
    private _endTime: Date;
    private _courtEventType: string;
    private _judgeName: string;
    private _eventStatus: string;
    private _parentEventId: number;
    private _agyLocId: string;
    private _outcomeReasonCode: string;
    private _commentText: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _eventOutcome: string;
    private _nextEventRequestFlag: string;
    private _orderRequestedFlag: string;
    private _resultCode: string;
    private _nextEventDate: Date;
    private _nextEventStartTime: Date;
    private _outcomeDate: Date;
    private _offenderProceedingId: number;
    private _directionCode: string;
    private _holdFlag: string;
    private _sealFlag: string;
    private _scheduledTripId: number;
    private _inserted: boolean;
    private _nbtLastName: string;
    private _nbtFirstName: string;
    private _agyLocDesc: string;
    private _outcomeReasonDesc: string
    private _courtEventDesc: string;
    private _nbtOffenderIdDisplay: number;
    private _eventTime: Date;
    private _movementReasonCode: string;
    private _courtAgyLocId: string
    private _judge: string;
    private _nbtInst: string;
    private _conflictFlag: boolean;
    private _officerName: string;
    private _escortCode: string;
    private _stateCode: string;
    private _policeStnAgyLocId: string;
    private _court: string;
    private _matter: string;
    private _appearanceLocation: string;
    private _appearanceType: string;
    private _hearingReason: string;
    private _chkNaConflictFlag: boolean;
    private _originalEventDate: Date;
    private _sentenseSeq: number;
    private _orderType: string;
    private _recommendedSanctionCount: number;
    private _recommendedRewardCount: number;
    private _commentTextTemp: string;
    private _additionalCountsComment: string;
    private _additionalCountsCommentTemp: string;
    private _caseLoad: string;
    private _linkData: number;
    private _emailFlag: String;
    private _smsFlag: String;
    private _emailScheduleHoursBefore: number;
    private _smsScheduleHoursBefore: number;

    private _emailCheckFlag: Boolean;
    public get emailCheckFlag(): Boolean {
        return this._emailCheckFlag;
    }
    public set emailCheckFlag(value: Boolean) {
        this._emailCheckFlag = value;
    }
    private _phoneNumberCheckFlag: Boolean;
    public get phoneNumberCheckFlag(): Boolean {
        return this._phoneNumberCheckFlag;
    }
    public set phoneNumberCheckFlag(value: Boolean) {
        this._phoneNumberCheckFlag = value;
    }


    public get emailFlag(): String {
        return this._emailFlag;
    }
    public set emailFlag(value: String) {
        this._emailFlag = value;
    }
    public get smsFlag(): String {
        return this._smsFlag;
    }
    public set smsFlag(value: String) {
        this._smsFlag = value;
    }
    public get smsScheduleHoursBefore(): number {
        return this._smsScheduleHoursBefore;
    }
    public set smsScheduleHoursBefore(value: number) {
        this._smsScheduleHoursBefore = value;
    }
    public get emailScheduleHoursBefore(): number {
        return this._emailScheduleHoursBefore;
    }
    public set emailScheduleHoursBefore(value: number) {
        this._emailScheduleHoursBefore = value;
    }


    private _externalNonAssDetailsInd: string;

    private _cancelFlag: boolean;

    public get cancelFlag(): boolean {
        return this._cancelFlag;
    }
    public set cancelFlag(value: boolean) {
        this._cancelFlag = value;
    }



    public get caseLoad(): string {
        return this._caseLoad;
    }
    public set caseLoad(value: string) {
        this._caseLoad = value;
    }

    public get externalNonAssDetailsInd(): string {
        return this._externalNonAssDetailsInd;
    }
    public set externalNonAssDetailsInd(value: string) {
        this._externalNonAssDetailsInd = value;
    }

    private _offenderNonAssociationsByInd: Array<number>;
    
    public get offenderNonAssociationsByInd(): Array<number> {
        return this._offenderNonAssociationsByInd;
    }
    public set offenderNonAssociationsByInd(value: Array<number>) {
        this._offenderNonAssociationsByInd = value;
    }

    private _offenderNonAssociationsByGang: Array<number>;
    
    public get offenderNonAssociationsByGang(): Array<number> {
        return this._offenderNonAssociationsByGang;
    }
    public set offenderNonAssociationsByGang(value: Array<number>) {
        this._offenderNonAssociationsByGang = value;
    }

    

    public get additionalCountsCommentTemp(): string {
        return this._additionalCountsCommentTemp;
    }
    public set additionalCountsCommentTemp(value: string) {
        this._additionalCountsCommentTemp = value;
    }

    public get additionalCountsComment(): string {
        return this._additionalCountsComment;
    }
    public set additionalCountsComment(value: string) {
        this._additionalCountsComment = value;
    }
    public get commentTextTemp(): string {
        return this._commentTextTemp;
    }
    public set commentTextTemp(value: string) {
        this._commentTextTemp = value;
    }


    public get chkNaConflictFlag(): boolean {
        return this._chkNaConflictFlag;
    }
    public set chkNaConflictFlag(value: boolean) {
        this._chkNaConflictFlag = value;
    }
    public get matter(): string {
        return this._matter;
    }
    public set matter(value: string) {
        this._matter = value;
    }
    public get appearanceLocation(): string {
        return this._appearanceLocation;
    }
    public set appearanceLocation(value: string) {
        this._appearanceLocation = value;
    }
    public get appearanceType(): string {
        return this._appearanceType;
    }
    public set appearanceType(value: string) {
        this._appearanceType = value;
    }
    public get hearingReason(): string {
        return this._hearingReason;
    }
    public set hearingReason(value: string) {
        this._hearingReason = value;
    }
    public get court(): string {
        return this._court;
    }
    public set court(value: string) {
        this._court = value;
    }

    get stateCode(): string { return this._stateCode; }
    set stateCode(pstateCode: string) { this._stateCode = pstateCode; }

    get policeStnAgyLocId(): string { return this._policeStnAgyLocId; }
    set policeStnAgyLocId(ppoliceStnAgyLocId: string) { this._policeStnAgyLocId = ppoliceStnAgyLocId; }

    get conflictFlag(): boolean { return this._conflictFlag; }
    set conflictFlag(pconflictFlag: boolean) { this._conflictFlag = pconflictFlag; }

    get officerName(): string { return this._officerName; }
    set officerName(pofficerName: string) { this._officerName = pofficerName; }


    get escortCode(): string { return this._escortCode; }
    set escortCode(pescortCode: string) { this._escortCode = pescortCode; }

    get nbtInst(): string { return this._nbtInst; }
    set nbtInst(pnbtInst: string) { this._nbtInst = pnbtInst; }


    get movementReasonCode(): string { return this._movementReasonCode; }
    set movementReasonCode(pmovementReasonCode: string) { this._movementReasonCode = pmovementReasonCode; }

    get courtAgyLocId(): string { return this._courtAgyLocId; }
    set courtAgyLocId(pcourtAgyLocId: string) { this._courtAgyLocId = pcourtAgyLocId; }

    get judge(): string { return this._judge; }
    set judge(pjudge: string) { this._judge = pjudge; }

    get eventTime(): Date { return this._eventTime; }
    set eventTime(peventTime: Date) { this._eventTime = peventTime; }

    get nbtOffenderIdDisplay(): number { return this._nbtOffenderIdDisplay; }
    set nbtOffenderIdDisplay(pnbtOffenderIdDisplay: number) { this._nbtOffenderIdDisplay = pnbtOffenderIdDisplay; }

    get courtEventDesc(): string { return this._courtEventDesc; }
    set courtEventDesc(pcourtEventDesc: string) { this._courtEventDesc = pcourtEventDesc; }

    get agyLocDesc(): string { return this._agyLocDesc; }
    set agyLocDesc(pagyLocDesc: string) { this._agyLocDesc = pagyLocDesc; }

    get outcomeReasonDesc(): string { return this._outcomeReasonDesc; }
    set outcomeReasonDesc(poutcomeReasonDesc: string) { this._outcomeReasonDesc = poutcomeReasonDesc; }

    get nbtLastName(): string { return this._nbtLastName; }
    set nbtLastName(pnbtLastName: string) { this._nbtLastName = pnbtLastName; }

    get nbtFirstName(): string { return this._nbtFirstName; }
    set nbtFirstName(pnbtFirstName: string) { this._nbtFirstName = pnbtFirstName; }

    get eventId(): number { return this._eventId; }
    set eventId(peventId: number) { this._eventId = peventId; }
    get caseId(): number { return this._caseId; }
    set caseId(pcaseId: number) { this._caseId = pcaseId; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get eventDate(): Date { return this._eventDate; }
    set eventDate(peventDate: Date) { this._eventDate = peventDate; }
    get startTime(): Date { return this._startTime; }
    set startTime(pstartTime: Date) { this._startTime = pstartTime; }
    get endTime(): Date { return this._endTime; }
    set endTime(pendTime: Date) { this._endTime = pendTime; }
    get courtEventType(): string { return this._courtEventType; }
    set courtEventType(pcourtEventType: string) { this._courtEventType = pcourtEventType; }
    get judgeName(): string { return this._judgeName; }
    set judgeName(pjudgeName: string) { this._judgeName = pjudgeName; }
    get eventStatus(): string { return this._eventStatus; }
    set eventStatus(peventStatus: string) { this._eventStatus = peventStatus; }
    get parentEventId(): number { return this._parentEventId; }
    set parentEventId(pparentEventId: number) { this._parentEventId = pparentEventId; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    get outcomeReasonCode(): string { return this._outcomeReasonCode; }
    set outcomeReasonCode(poutcomeReasonCode: string) { this._outcomeReasonCode = poutcomeReasonCode; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get eventOutcome(): string { return this._eventOutcome; }
    set eventOutcome(peventOutcome: string) { this._eventOutcome = peventOutcome; }
    get nextEventRequestFlag(): string { return this._nextEventRequestFlag; }
    set nextEventRequestFlag(pnextEventRequestFlag: string) { this._nextEventRequestFlag = pnextEventRequestFlag; }
    get orderRequestedFlag(): string { return this._orderRequestedFlag; }
    set orderRequestedFlag(porderRequestedFlag: string) { this._orderRequestedFlag = porderRequestedFlag; }
    get resultCode(): string { return this._resultCode; }
    set resultCode(presultCode: string) { this._resultCode = presultCode; }
    get nextEventDate(): Date { return this._nextEventDate; }
    set nextEventDate(pnextEventDate: Date) { this._nextEventDate = pnextEventDate; }
    get nextEventStartTime(): Date { return this._nextEventStartTime; }
    set nextEventStartTime(pnextEventStartTime: Date) { this._nextEventStartTime = pnextEventStartTime; }
    get outcomeDate(): Date { return this._outcomeDate; }
    set outcomeDate(poutcomeDate: Date) { this._outcomeDate = poutcomeDate; }
    get offenderProceedingId(): number { return this._offenderProceedingId; }
    set offenderProceedingId(poffenderProceedingId: number) { this._offenderProceedingId = poffenderProceedingId; }
    get directionCode(): string { return this._directionCode; }
    set directionCode(pdirectionCode: string) { this._directionCode = pdirectionCode; }
    get holdFlag(): string { return this._holdFlag; }
    set holdFlag(pholdFlag: string) { this._holdFlag = pholdFlag; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get scheduledTripId(): number { return this._scheduledTripId; }
    set scheduledTripId(pscheduledTripId: number) { this._scheduledTripId = pscheduledTripId; }
    get inserted(): boolean { return this._inserted; }
    set inserted(pinserted: boolean) { this._inserted = pinserted; }

    get originalEventDate(): Date { return this._originalEventDate; }
    set originalEventDate(poriginalEventDate: Date) { this._originalEventDate = poriginalEventDate; }

    get sentenseSeq(): number { return this._sentenseSeq; }
    set sentenseSeq(psentenseSeq: number) { this._sentenseSeq = psentenseSeq; }

    get orderType(): string { return this._orderType; }
    set orderType(porderType: string) { this._orderType = porderType; }

    get recommendedSanctionCount(): number { return this._recommendedSanctionCount; }
    set recommendedSanctionCount(precommendedSanctionCount: number) { this._recommendedSanctionCount = precommendedSanctionCount; }

    get recommendedRewardCount(): number { return this._recommendedRewardCount; }
    set recommendedRewardCount(precommendedRewardCount: number) { this._recommendedRewardCount = precommendedRewardCount; }

    get linkData(): number { return this._linkData; }
    set linkData(plinkData: number) { this._linkData = plinkData; }


    toJSON(): any {
        return {
            'eventId': this._eventId,
            'caseId': this._caseId,
            'offenderBookId': this._offenderBookId,
            'eventDate': this._eventDate,
            'startTime': this._startTime,
            'endTime': this._endTime,
            'courtEventType': this._courtEventType,
            'judgeName': this._judgeName,
            'eventStatus': this._eventStatus,
            'parentEventId': this._parentEventId,
            'agyLocId': this._agyLocId,
            'outcomeReasonCode': this._outcomeReasonCode,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'eventOutcome': this._eventOutcome,
            'nextEventRequestFlag': this._nextEventRequestFlag,
            'orderRequestedFlag': this._orderRequestedFlag,
            'resultCode': this._resultCode,
            'nextEventDate': this._nextEventDate,
            'nextEventStartTime': this._nextEventStartTime,
            'outcomeDate': this._outcomeDate,
            'offenderProceedingId': this._offenderProceedingId,
            'directionCode': this._directionCode,
            'holdFlag': this._holdFlag,
            'sealFlag': this._sealFlag,
            'scheduledTripId': this._scheduledTripId,
            'inserted': this._inserted,
            'nbtLastName': this._nbtFirstName,
            'nbtFirstName': this._nbtFirstName,
            'agyLocDesc': this._agyLocDesc,
            'outcomeReasonDesc': this._outcomeReasonDesc,
            'courtEventDesc': this._courtEventDesc,
            'nbtOffenderIdDisplay': this._nbtOffenderIdDisplay,
            'eventTime': this._eventTime,
            'judge': this._judge,
            'movementReasonCode': this._movementReasonCode,
            'courtAgyLocId': this._courtAgyLocId,
            'nbtInst': this._nbtInst,
            'conflictFlag': this._conflictFlag,
            'escortCode': this._escortCode,
            'officerName': this._officerName,
            'stateCode': this._stateCode,
            'policeStnAgyLocId': this._policeStnAgyLocId,
            'court': this._court,
            'matter': this._matter,
            'appearanceLocation': this._appearanceLocation,
            'appearanceType': this._appearanceType,
            'hearingReason': this._hearingReason,
            'originalEventDate': this._originalEventDate,
            'sentenseSeq': this._sentenseSeq,
            'orderType': this._orderType,
            'recommendedSanctionCount': this._recommendedSanctionCount,
            'recommendedRewardCount': this._recommendedRewardCount,
            'additionalCountsComment': this._additionalCountsComment,
            'offenderNonAssociationsByInd': this._offenderNonAssociationsByInd,
            'offenderNonAssociationsByGang': this._offenderNonAssociationsByGang,
            'externalNonAssDetailsInd':this._externalNonAssDetailsInd,
            'caseLoad':this._caseLoad,
            'cancelFlag':this._cancelFlag,
            'linkData': this._linkData,
            'emailFlag':this._emailFlag,
            'smsFlag':this._smsFlag,
            'emailScheduleHoursBefore':this._emailScheduleHoursBefore,
            'smsScheduleHoursBefore':this._smsScheduleHoursBefore,
            'emailCheckFlag':this._emailCheckFlag,
            'phoneNumberCheckFlag':this._phoneNumberCheckFlag

        };
    }
}
