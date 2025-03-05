import { BaseModel } from '@commonbeans/BaseModel'
import { OffensesOutcome } from "../beans/OffensesOutcome";
import { OffenderSentences } from './OffenderSentences';

export class CourtEvents extends BaseModel {
    private _eventId: number;
    private _caseId: number;
    private _offenderBookId: number;
    private _eventDate: Date;
    private _startTime: Date;
    private _endTime: Date;
    private _hearingType: string;
    private _judgeName: string;
    private _eventStatus: string;
    private _parentEventId: string;
    private _agyLocId: string;
    private _outcomeReasonCode: string;
    private _commentText: string;
    private _createDateTime: Date;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDateTime: Date;
    private _modifyUserId: string;
    private _eventOutcome: string;
    private _eventOutComeDescription: string;
    public get eventOutComeDescription(): string {
        return this._eventOutComeDescription;
    }
    public set eventOutComeDescription(value: string) {
        this._eventOutComeDescription = value;
    }
    private _eventOutcomeTemp: string;
    public get eventOutcomeTemp(): string {
        return this._eventOutcomeTemp;
    }
    public set eventOutcomeTemp(value: string) {
        this._eventOutcomeTemp = value;
    }
    private _eventOutComeDescriptionTemp: string;
    public get eventOutComeDescriptionTemp(): string {
        return this._eventOutComeDescriptionTemp;
    }
    public set eventOutComeDescriptionTemp(value: string) {
        this._eventOutComeDescriptionTemp = value;
    }
    private _nextEventRequestFlag: string;
    private _orderRequestedFlag: string;
    private _resultCode: string;
    private _nextEventDate: Date;
    private _nbtNextEventDate: Date;
    private _nextEventStartTime: Date;
    private _preExistedEventDate: Date;
    private _outcomeDate: Date;
    private _offenderProceedingId: number;
    private _descriptionCode: string;
    private _holdFlag: string;
    private _sealFlag: string;
    private _scheduleTripId: string;
    private _holdDetails: string;
    private _courtReport: string;
    private _selectFlag: boolean = false;
    private _caseIdl: number;
    private _offenseOutcomeInsertList: OffensesOutcome[] = [];
    private _offenseOutcomeUpdateList: OffensesOutcome[] = [];
    private _commitFlag = "";
    private _dummyCaseId = 0;
    private _dummyEventId = 0;
    private _offenseOutcomeList: OffensesOutcome[] = [];
    private _dummyOffenderChargeId: number;
    private _disposition: string;
    private _chargeStatus: string;
    private _resultcode1: string;
    private _bailStatus: string;
    private _nbtBailStatus: string;
    private _proposedMvmntSeq: number;
    private _courtEventSubType: string;
    private _remarksFlag: string;
    private _requestFlag: string;
    private _appealFlag: string;
    private _tempRemarksFlag: boolean;
    private _tempRequestFlag: boolean;
    private _tempAppealFlag: boolean;
    private _verificationIndicatorFlag: string;
    private _appealLodgedBy: string;
    private _appealDate: string;
    private _bailApplicationFlag: string;
    private _sentencesList: OffenderSentences[] = [];
    private _ordersList: OffenderSentences[] = [];
    private _offencesList: OffensesOutcome[] = [];
    private _bailButtonEnableFlag: boolean;
    private _appealId: number;
    private _courtEventTypeTemp: string;
    private _caseIdTemp: string;

    get caseIdTemp(): string { return this._caseIdTemp; }

    set caseIdTemp(caseIdTemp: string) { this._caseIdTemp = caseIdTemp; }

    get courtEventTypeTemp(): string { return this._courtEventTypeTemp; }

    set courtEventTypeTemp(courtEventTypeTemp: string) { this._courtEventTypeTemp = courtEventTypeTemp; }

    get caseId(): number { return this._caseId; }

    set caseId(caseId: number) { this._caseId = caseId; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }

    get eventDate(): Date { return this._eventDate; }

    set eventDate(eventDate: Date) { this._eventDate = eventDate; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(agyLocId: string) { this._agyLocId = agyLocId; }

    get seaFlag(): string { return this._sealFlag; }

    set sealFlag(sealFlag: string) { this._sealFlag = sealFlag; }

    get holdFlag(): string { return this._holdFlag; }

    set holdFlag(holdFlag: string) { this._holdFlag = holdFlag; }

    get eventId(): number { return this._eventId; }

    set eventId(eventId: number) { this._eventId = eventId; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime(createDateTime: Date) { this._createDateTime = createDateTime; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime(modifyDateTime: Date) { this._modifyDateTime = modifyDateTime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(createUserId: string) { this._createUserId = createUserId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }

    get startTime(): Date { return this._startTime; }

    set startTime(startTime: Date) { this._startTime = startTime; }

    get endTime(): Date { return this._endTime; }

    set endTime(endTime: Date) { this._endTime = endTime; }

    get nextEventDate(): Date { return this._nextEventDate; }

    set nextEventDate(nextEventDate: Date) { this._nextEventDate = nextEventDate; }

    get nbtNextEventDate(): Date { return this._nbtNextEventDate; }

    set nbtNextEventDate(nbtNextEventDate: Date) { this._nbtNextEventDate = nbtNextEventDate; }

    get preExistedNextEventDate(): Date { return this._preExistedEventDate; }

    set preExistedNextEventDate(preExistedEventDate: Date) { this._preExistedEventDate = preExistedEventDate; }


    get nextEventStartTime(): Date { return this._nextEventStartTime; }

    set nextEventStartTime(nextEventStartTime: Date) { this._nextEventStartTime = nextEventStartTime; }

    get outcomeDate(): Date { return this._outcomeDate; }

    set outcomeDate(outcomeDate: Date) { this._outcomeDate = outcomeDate; }

    get courtEventType(): string { return this._hearingType; }

    set courtEventType(courtEventType: string) { this._hearingType = courtEventType; }

    get judgeName(): string { return this._judgeName; }

    set judgeName(judgeName: string) { this._judgeName = judgeName; }

    get eventStatus(): string { return this._eventStatus; }

    set eventStatus(eventStatus: string) { this._eventStatus = eventStatus; }

    get parentEventId(): string { return this._parentEventId; }

    set parentEventId(parentEventId: string) { this._parentEventId = parentEventId; }

    get commentText(): string { return this._commentText; }

    set commentText(commentText: string) { this._commentText = commentText; }

    get eventOutcome(): string { return this._eventOutcome; }

    set eventOutcome(eventOutcome: string) { this._eventOutcome = eventOutcome; }

    get orderRequestedFlag(): string { return this._orderRequestedFlag; }

    set orderRequestedFlag(orderRequestedFlag: string) { this._orderRequestedFlag = orderRequestedFlag; }

    get nextEventRequestFlag(): string { return this._nextEventRequestFlag; }

    set nextEventRequestFlag(nextEventRequestFlag: string) { this._nextEventRequestFlag = nextEventRequestFlag; }

    get resultCode(): string { return this._resultCode; }

    set resultCode(resultCode: string) { this._resultCode = resultCode; }

    get descriptionCode(): string { return this._descriptionCode; }

    set descriptionCode(descriptionCode: string) { this._descriptionCode = descriptionCode; }

    get offenderProceedingId(): number { return this._offenderProceedingId; }

    set offenderProceedingId(offenderProceedingId: number) { this._offenderProceedingId = offenderProceedingId; }

    get scheduleTripId(): string { return this._scheduleTripId; }

    set scheduleTripId(scheduleTripId: string) { this._scheduleTripId = scheduleTripId; }

    get holdDetails(): string { return this._holdDetails; }

    set holdDetails(holdDetails: string) { this._holdDetails = holdDetails; }

    get courtReport(): string { return this._courtReport; }

    set courtReport(courtReport: string) { this._courtReport = courtReport; }

    get hearingType(): string { return this._hearingType; }

    set hearingType(hearingType: string) { this._hearingType = hearingType; }

    get selectFlag(): boolean { return this._selectFlag; }

    set selectFlag(selectFlag: boolean) { this._selectFlag = selectFlag; }

    get caseIdl(): number { return this._caseIdl; }

    set caseIdl(caseIdl: number) { this._caseIdl = caseIdl; }

    get offenseOutcomeInsertList(): OffensesOutcome[] { return this._offenseOutcomeInsertList; }

    set offenseOutcomeInsertList(offenseOutcomeInsertList: OffensesOutcome[]) { this._offenseOutcomeInsertList = offenseOutcomeInsertList; }

    get offenseOutcomeUpdateList(): OffensesOutcome[] { return this._offenseOutcomeUpdateList; }

    set offenseOutcomeUpdateList(offenseOutcomeUpdateList: OffensesOutcome[]) { this._offenseOutcomeUpdateList = offenseOutcomeUpdateList; }

    get commitFlag(): string { return this._commitFlag; }

    set commitFlag(commitFlag: string) { this._commitFlag = commitFlag; }

    get dummyEventId(): number { return this._dummyEventId; }

    set dummyEventId(dummyEventId: number) { this._dummyEventId = dummyEventId; }

    get offenseOutcomeList(): OffensesOutcome[] { return this._offenseOutcomeList; }

    set offenseOutcomeList(offenseOutcomeList: OffensesOutcome[]) { this._offenseOutcomeList = offenseOutcomeList; }

    get dummyOffenderChargeId(): number { return this._dummyOffenderChargeId; }

    set dummyOffenderChargeId(dummyOffenderChargeId: number) { this._dummyOffenderChargeId = dummyOffenderChargeId; }

    get chargeStatus(): string { return this._chargeStatus; }

    set chargeStatus(chargeStatus: string) { this._chargeStatus = chargeStatus; }

    get disposition(): string { return this._disposition; }

    set disposition(disposition: string) { this._disposition = disposition; }

    get resultcode1(): string { return this._resultcode1; }

    set resultcode1(resultcode1: string) { this._resultcode1 = resultcode1; }

    get bailStatus(): string { return this._bailStatus; }

    set bailStatus(bailStatus: string) { this._bailStatus = bailStatus; }

    get nbtBailStatus(): string { return this._nbtBailStatus; }

    set nbtBailStatus(nbtBailStatus: string) { this._nbtBailStatus = nbtBailStatus; }

    get proposedMvmntSeq(): number { return this.proposedMvmntSeq; }

    set proposedMvmntSeq(proposedMvmntSeq: number) { this._proposedMvmntSeq = proposedMvmntSeq; }

    get courtEventSubType(): string { return this._courtEventSubType; }

    set courtEventSubType(courtEventSubType: string) { this._courtEventSubType = courtEventSubType; }

    get remarksFlag(): string { return this._remarksFlag; }

    set remarksFlag(remarksFlag: string) { this._remarksFlag = remarksFlag; }

    get requestFlag(): string { return this._requestFlag; }

    set requestFlag(requestFlag: string) { this._requestFlag = requestFlag; }

    get appealFlag(): string { return this._appealFlag; }

    set appealFlag(appealFlag: string) { this._appealFlag = appealFlag; }

    get tempRemarksFlag(): boolean { return this._tempRemarksFlag; }

    set tempRemarksFlag(tempRemarksFlag: boolean) { this._tempRemarksFlag = tempRemarksFlag; }

    get tempRequestFlag(): boolean { return this._tempRequestFlag; }

    set tempRequestFlag(tempRequestFlag: boolean) { this._tempRequestFlag = tempRequestFlag; }

    get tempAppealFlag(): boolean { return this._tempAppealFlag; }

    set tempAppealFlag(tempAppealFlag: boolean) { this._tempAppealFlag = tempAppealFlag; }

    get verificationIndicatorFlag(): string { return this._verificationIndicatorFlag; }

    set verificationIndicatorFlag(verificationIndicatorFlag: string) { this._verificationIndicatorFlag = verificationIndicatorFlag; }

    get appealLodgedBy(): string { return this._appealLodgedBy; }

    set appealLodgedBy(appealLodgedBy: string) { this._appealLodgedBy = appealLodgedBy; }

    get bailApplicationFlag(): string { return this._bailApplicationFlag; }

    set bailApplicationFlag(bailApplicationFlag: string) { this._bailApplicationFlag = bailApplicationFlag; }

    get offencesList(): OffensesOutcome[] { return this._offencesList; }

    set offencesList(offencesList: OffensesOutcome[]) { this._offencesList = offencesList; }

    get sentencesList(): OffenderSentences[] { return this._sentencesList; }

    set sentencesList(sentencesList: OffenderSentences[]) { this._sentencesList = sentencesList; }

    get ordersList(): OffenderSentences[] { return this._ordersList; }

    set ordersList(ordersList: OffenderSentences[]) { this._ordersList = ordersList; }
    
    get outcomeReasonCode(): string { return this._outcomeReasonCode; }

    set outcomeReasonCode(outcomeReasonCode: string) { this._outcomeReasonCode = outcomeReasonCode; }

    get appealId(): number { return this._appealId; }

    set appealId(appealId: number) { this._appealId = appealId; }

    get dummyCaseId(): number { return this._dummyCaseId; }

    set dummyCaseId(dummyCaseId: number) { this._dummyCaseId = dummyCaseId; }

    get bailButtonEnableFlag(): boolean { return this._bailButtonEnableFlag; }

    set bailButtonEnableFlag(bailButtonEnableFlag: boolean) { this._bailButtonEnableFlag = bailButtonEnableFlag; }


    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(createDatetime: Date) { this._createDatetime = createDatetime; }

    toJSON(): any {
        return {

            'caseId': this._caseId,
            'offenderBookId': this._offenderBookId,
            'eventId': this._eventId,
            'startTime': this._startTime,
            'endTime': this._endTime,
            'courtEventType': this._hearingType,
            'judgeName': this._judgeName,
            'eventStatus': this._eventStatus,
            'parentEventId': this._parentEventId,
            'commentText': this._commentText,
            'eventOutcome': this._eventOutcome,
            'nextEventRequestFlag': this._nextEventRequestFlag,
            'orderRequestedFlag': this._orderRequestedFlag,
            'resultCode': this._resultCode,
            'nextEventDate': this._nextEventDate,
            'nbtNextEventDate': this._nbtNextEventDate,
            'preExistedEventDate': this._preExistedEventDate,
            'nextEventStartTime': this._nextEventStartTime,
            'outcomeDate': this._outcomeDate,
            'descriptionCode': this._descriptionCode,
            'courtEventTypeTemp': this._courtEventTypeTemp,
            'holdFlag': this._holdFlag,
            'sealFlag': this._sealFlag,
            'offenderProceedingId': this._offenderProceedingId,
            'scheduleTripId': this._scheduleTripId,
            'caseIdl': this._caseIdl,
            'offenseOutcomeInsertList': this._offenseOutcomeInsertList,
            'offenseOutcomeUpdateList': this._offenseOutcomeUpdateList,
            'commitFlag': this._commitFlag,
            'dummyEventId': this._dummyEventId,
            'offenseOutcomeList': this._offenseOutcomeList,
            'dummyOffenderChargeId': this._dummyOffenderChargeId,
            'chargeStatus': this._chargeStatus,
            'disposition': this._disposition,
            'resultcode1': this._resultcode1,
            'bailStatus': this._bailStatus,
            'nbtBailStatus': this._nbtBailStatus,
            'proposedMvmntSeq': this._proposedMvmntSeq,
            'courtEventSubType': this._courtEventSubType,
            'remarksFlag': this._remarksFlag,
            'requestFlag': this._requestFlag,
            'appealFlag': this._appealFlag,
            'verificationIndicatorFlag': this._verificationIndicatorFlag,
            'appealLodgedBy': this._appealLodgedBy,
            'appealDate': this._appealDate,
            'bailApplicationFlag': this._bailApplicationFlag,
            'sentencesList': this._sentencesList,
            'outcomeReasonCode':this._outcomeReasonCode,
            'ordersList': this._ordersList,
            'appealId': this._appealId,
            'caseIdTemp' : this._caseIdTemp,
            'bailButtonEnableFlag': this._bailButtonEnableFlag,
            'offencesList': this._offencesList,
            'dummyCaseId': this._dummyCaseId,
            'eventDate': this._eventDate,
            'createDatetime': this._createDatetime
        };
    }

}
