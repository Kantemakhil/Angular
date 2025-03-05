import { BaseModel } from '@commonbeans/BaseModel'
import { SentenceCalculation } from "../beans/SentenceCalculation";
import { OffensesOutcome } from './OffensesOutcome';
import { OffenderSentences } from './OffenderSentences';
import { Time } from '@angular/common';

export class SentenceTerms extends BaseModel {

    private _offenderBookId: number;
    private _startDate: Date;
    private _startTime: Date;
    private _endTime: Date;
    private _createUserId: string;
    private _createDateTime: Date;
    private _modifyDateTime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _sentenceSeq: number;
    private _termSeq: number;
    private _sentenceTermCode: string;
    private _years: number;
    private _months: number;
    private _days: number;
    private _weeks: number;
    private _lifeSentenceFlag: string;
    private _hours: number;
    private _dummyTermId: number;
    private _dummySentenceId = 0;
    private _commitFlag: string;
    private _endDate: Date;
    private _ovrStartDate: Date;
    private _ovrStartTime: Time;
    private _workHours: number;
    private _attendenceHours: number;
    private _gapSeq: number;
    private _sentenceParentField: string;
    private _orderParentField: string;
    private _paroleSupervision: string;
    private _sentenceCalculation: SentenceCalculation = new SentenceCalculation();
    private _convictedOffencesListOnTerm: OffensesOutcome[] = [];
    private _parentSentenceData: OffenderSentences = new OffenderSentences();

    get convictedOffencesListOnTerm(): OffensesOutcome[] { return this._convictedOffencesListOnTerm; }

    set convictedOffencesListOnTerm(convictedOffencesListOnTerm: OffensesOutcome[]) { this._convictedOffencesListOnTerm = convictedOffencesListOnTerm; }

    get endDate(): Date { return this._endDate; }

    set endDate(endDate: Date) { this._endDate = endDate; }

    get ovrStartDate(): Date { return this._ovrStartDate; }

    set ovrStartDate(ovrStartDate: Date) { this._ovrStartDate = ovrStartDate; }

    get ovrStartTime(): Time { return this._ovrStartTime; }

    set ovrStartTime(ovrStartTime: Time) { this._ovrStartTime = ovrStartTime; }

    get orderParentField(): string { return this._orderParentField; }

    set orderParentField(orderParentField: string) { this._orderParentField = orderParentField; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }

    get workHours(): number { return this._workHours; }

    set workHours(workHours: number) { this._workHours = workHours; }

    get sentenceParentField(): string { return this._sentenceParentField; }

    set sentenceParentField(sentenceParentField: string) { this._sentenceParentField = sentenceParentField; }

    get gapSeq(): number { return this._gapSeq; }

    set gapSeq(gapSeq: number) { this._gapSeq = gapSeq; }

    get paroleSupervision(): string { return this._paroleSupervision; }

    set paroleSupervision(paroleSupervision: string) { this._paroleSupervision = paroleSupervision; }

    get attendenceHours(): number { return this._attendenceHours; }

    set attendenceHours(attendenceHours: number) { this._attendenceHours = attendenceHours; }

    get parentSentenceData(): OffenderSentences { return this._parentSentenceData; }

    set parentSentenceData(parentSentenceData: OffenderSentences) { this._parentSentenceData = parentSentenceData; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime(modifyDateTime: Date) { this._modifyDateTime = modifyDateTime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime(createDateTime: Date) { this._createDateTime = createDateTime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(createUserId: string) { this._createUserId = createUserId; }

    get startDate(): Date { return this._startDate; }

    set startDate(startDate: Date) { this._startDate = startDate; }

    get startTime(): Date { return this._startTime; }

    set startTime(startTime: Date) { this._startTime = startTime; }

    get endTime(): Date { return this._endTime; }

    set endTime(endTime: Date) { this._endTime = endTime; }

    get seaFlag(): string { return this._sealFlag; }

    set sealFlag(sealFlag: string) { this._sealFlag = sealFlag; }

    get sentenceSeq(): number { return this._sentenceSeq; }

    set sentenceSeq(sentenceSeq: number) { this._sentenceSeq = sentenceSeq; }

    get termSeq(): number { return this._termSeq; }

    set termSeq(termSeq: number) { this._termSeq = termSeq; }

    get sentenceTermCode(): string { return this._sentenceTermCode; }

    set sentenceTermCode(sentenceTermCode: string) { this._sentenceTermCode = sentenceTermCode; }

    get years(): number { return this._years; }

    set years(years: number) { this._years = years; }

    get months(): number { return this._months; }

    set months(months: number) { this._months = months; }

    get days(): number { return this._days; }

    set days(days: number) { this._days = days; }

    get weeks(): number { return this._weeks; }

    set weeks(weeks: number) { this._weeks = weeks; }

    get lifeSentenceFlag(): string { return this._lifeSentenceFlag; }

    set lifeSentenceFlag(lifeSentenceFlag: string) { this._lifeSentenceFlag = lifeSentenceFlag; }

    get hours(): number { return this._hours; }

    set hours(hours: number) { this._hours = hours; }

    get dummyTermId(): number { return this._dummyTermId; }

    set dummyTermId(dummyTermId: number) { this._dummyTermId = dummyTermId; }

    get commitFlag(): string { return this._commitFlag; }

    set commitFlag(commitFlag: string) { this._commitFlag = commitFlag; }

    get sentenceCalculation(): SentenceCalculation { return this._sentenceCalculation; }

    set sentenceCalculation(sentenceCalculation: SentenceCalculation) { this._sentenceCalculation = sentenceCalculation; }

    get dummySentenceId(): number { return this._dummySentenceId; }

    set dummySentenceId(dummySentenceId: number) { this._dummySentenceId = dummySentenceId; }

    toJSON(): any {
        return {
            'offenderBookId': this._offenderBookId,
            'startTime': this._startTime,
            ' endTime': this._endTime,
            'createUserId': this._createUserId,
            ' createDateTime': this._createDateTime,
            'modifyDateTime': this._modifyDateTime,
            ' modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'sentenceSeq': this._sentenceSeq,
            'termSeq': this._termSeq,
            'sentenceTermCode': this._sentenceTermCode,
            'years': this._years,
            'months': this._months,
            'days': this._days,
            'weeks': this._weeks,
            'lifeSentenceFlag': this._lifeSentenceFlag,
            'hours': this._hours,
            'dummyTermId': this._dummyTermId,
            'commitFlag': this._commitFlag,
            'sentenceCalculation': this._sentenceCalculation,
            'dummySentenceId': this._dummySentenceId,
            'parentSentenceData': this._parentSentenceData,
        };
    }
}