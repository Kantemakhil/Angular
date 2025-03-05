import { BaseModel } from "@common/beans/BaseModel";

export class OffenderSentenceAggs extends BaseModel {
    private _createUserId: string;
    private _createDateTime: Date;
    private _modifyDateTime: Date;
    private _modifyUserId: string;
    private _description: string;
    private _code: string;
    private _calcPosRelDate: Date;
    private _nbtParoleReviewDate: string;
    private _mostSeriousSentenceSeq: number;
    private _nbtHearingDate: Date;
    private _pbPosRelDate: Date;
    private _nbtLatestPbRelease: Date;
    private _nbtEprhdDate: Date;
    private _offenderBookId: number;
    private _finalSentExpDate: Date;
    private _ovrPosRelDate: Date;
    private _calcPosProbDate: Date;
    private _ovrPosProbDate: Date;
    private _calcProbEffectDate: Date;
    private _ovrProbEffectDate: Date;
    private _totalLengthHours: number;
    private _totalLengthDays: number;
    private _totalLengthWeeks: number;
    private _totalLengthYears: number;
    private _totalLengthMonths: number;
    private _calcProbExpDate: Date;
    private _ovrProbExpDate: Date;
    private _ovrPrlExpDate: Date;
    private _sentCalcNeededFlag: string;
    private _totalAwolDays: number;
    private _eligibleGoodtimeDays: number;
    private _totalServedTime: number;
    private _totalWorkTime: number;
    private _goodtimeRevokedDays: number;
    private _revokedParoleDays: number;
    private _ovrSentExpDate: Date;
    private _totalSatisfiedTime: number;
    private _earliestSentStartDate: Date;
    private _paroleReviewDate: Date;
    private _paroleDate: Date;
    private _dspCalcPosRelDate: Date;
    private _dspOverrideFlag: string;
    private _nbtSentenceLengthText: string;

    get nbtSentenceLengthText(): string { return this._nbtSentenceLengthText; }
    set nbtSentenceLengthText(nbtSentenceLengthText: string) { this._nbtSentenceLengthText = nbtSentenceLengthText; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(createUserId: string) { this._createUserId = createUserId; }

    get dspOverrideFlag(): string { return this._dspOverrideFlag; }
    set dspOverrideFlag(dspOverrideFlag: string) { this._dspOverrideFlag = dspOverrideFlag; }

    get dspCalcPosRelDate(): Date { return this._dspCalcPosRelDate; }
    set dspCalcPosRelDate(dspCalcPosRelDate: Date) { this._dspCalcPosRelDate = dspCalcPosRelDate; }

    get createDateTime(): Date { return this._createDateTime; }
    set createDateTime(createDateTime: Date) { this._createDateTime = createDateTime; }

    get modifyDateTime(): Date { return this._modifyDateTime; }
    set modifyDateTime(modifyDateTime: Date) { this._modifyDateTime = modifyDateTime; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }

    get description(): string { return this._description; }
    set description(description: string) { this._description = description; }

    get code(): string { return this._code; }
    set code(code: string) { this._code = code; }

    get nbtParoleReviewDate(): string { return this._nbtParoleReviewDate; }
    set nbtParoleReviewDate(nbtParoleReviewDate: string) { this._nbtParoleReviewDate = nbtParoleReviewDate; }

    get mostSeriousSentenceSeq(): number { return this._mostSeriousSentenceSeq; }
    set mostSeriousSentenceSeq(mostSeriousSentenceSeq: number) { this._mostSeriousSentenceSeq = mostSeriousSentenceSeq; }

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }

    get calcPosRelDate(): Date { return this._calcPosRelDate; }
    set calcPosRelDate(calcPosRelDate: Date) { this._calcPosRelDate = calcPosRelDate; }

    get nbtHearingDate(): Date { return this._nbtHearingDate; }
    set nbtHearingDate(nbtHearingDate: Date) { this._nbtHearingDate = nbtHearingDate; }

    get pbPosRelDate(): Date { return this._pbPosRelDate; }
    set pbPosRelDate(pbPosRelDate: Date) { this._pbPosRelDate = pbPosRelDate; }

    get nbtLatestPbRelease(): Date { return this._nbtLatestPbRelease; }
    set nbtLatestPbRelease(nbtLatestPbRelease: Date) { this._nbtLatestPbRelease = nbtLatestPbRelease; }

    get nbtEprhdDate(): Date { return this._nbtEprhdDate; }
    set nbtEprhdDate(nbtEprhdDate: Date) { this._nbtEprhdDate = nbtEprhdDate; }

    get finalSentExpDate(): Date { return this._finalSentExpDate; }
    set finalSentExpDate(finalSentExpDate: Date) { this._finalSentExpDate = finalSentExpDate; }

    get ovrPosRelDate(): Date { return this._ovrPosRelDate; }
    set ovrPosRelDate(ovrPosRelDate: Date) { this._ovrPosRelDate = ovrPosRelDate; }

    get calcPosProbDate(): Date { return this._calcPosProbDate; }
    set calcPosProbDate(calcPosProbDate: Date) { this._calcPosProbDate = calcPosProbDate; }

    get ovrPosProbDate(): Date { return this._ovrPosProbDate; }
    set ovrPosProbDate(ovrPosProbDate: Date) { this._ovrPosProbDate = ovrPosProbDate; }

    get calcProbEffectDate(): Date { return this._calcProbEffectDate; }
    set calcProbEffectDate(calcProbEffectDate: Date) { this._calcProbEffectDate = calcProbEffectDate; }

    get ovrProbEffectDate(): Date { return this._ovrProbEffectDate; }
    set ovrProbEffectDate(ovrProbEffectDate: Date) { this._ovrProbEffectDate = ovrProbEffectDate; }

    get calcProbExpDate(): Date { return this._calcProbExpDate; }
    set calcProbExpDate(calcProbExpDate: Date) { this._calcProbExpDate = calcProbExpDate; }

    get ovrProbExpDate(): Date { return this._ovrProbExpDate; }
    set ovrProbExpDate(ovrProbExpDate: Date) { this._ovrProbExpDate = ovrProbExpDate; }

    get ovrPrlExpDate(): Date { return this._ovrPrlExpDate; }
    set ovrPrlExpDate(ovrPrlExpDate: Date) { this._ovrPrlExpDate = ovrPrlExpDate; }

    get totalLengthHours(): number { return this._totalLengthHours; }
    set totalLengthHours(totalLengthHours: number) { this._totalLengthHours = totalLengthHours; }

    get totalLengthDays(): number { return this._totalLengthDays; }
    set totalLengthDays(totalLengthDays: number) { this._totalLengthDays = totalLengthDays; }

    get totalLengthWeeks(): number { return this._totalLengthWeeks; }
    set totalLengthWeeks(totalLengthWeeks: number) { this._totalLengthWeeks = totalLengthWeeks; }

    get totalLengthYears(): number { return this._totalLengthYears; }
    set totalLengthYears(totalLengthYears: number) { this._totalLengthYears = totalLengthYears; }

    get totalLengthMonths(): number { return this._totalLengthMonths; }
    set totalLengthMonths(totalLengthMonths: number) { this._totalLengthMonths = totalLengthMonths; }

    get totalWorkTime(): number { return this._totalWorkTime; }
    set totalWorkTime(totalWorkTime: number) { this._totalWorkTime = totalWorkTime; }

    get totalServedTime(): number { return this._totalServedTime; }
    set totalServedTime(totalServedTime: number) { this._totalServedTime = totalServedTime; }

    get eligibleGoodtimeDays(): number { return this._eligibleGoodtimeDays; }
    set eligibleGoodtimeDays(eligibleGoodtimeDays: number) { this._eligibleGoodtimeDays = eligibleGoodtimeDays; }

    get totalAwolDays(): number { return this._totalAwolDays; }
    set totalAwolDays(totalAwolDays: number) { this._totalAwolDays = totalAwolDays; }

    get sentCalcNeededFlag(): string { return this._sentCalcNeededFlag; }
    set sentCalcNeededFlag(sentCalcNeededFlag: string) { this._sentCalcNeededFlag = sentCalcNeededFlag; }

    get goodtimeRevokedDays(): number { return this._goodtimeRevokedDays; }
    set goodtimeRevokedDays(goodtimeRevokedDays: number) { this._goodtimeRevokedDays = goodtimeRevokedDays; }

    get revokedParoleDays(): number { return this._revokedParoleDays; }
    set revokedParoleDays(revokedParoleDays: number) { this._revokedParoleDays = revokedParoleDays; }

    get totalSatisfiedTime(): number { return this._totalSatisfiedTime; }
    set totalSatisfiedTime(totalSatisfiedTime: number) { this._totalSatisfiedTime = totalSatisfiedTime; }

    get ovrSentExpDate(): Date { return this._ovrSentExpDate; }
    set ovrSentExpDate(ovrSentExpDate: Date) { this._ovrSentExpDate = ovrSentExpDate; }

    get earliestSentStartDate(): Date { return this._earliestSentStartDate; }
    set earliestSentStartDate(earliestSentStartDate: Date) { this._earliestSentStartDate = earliestSentStartDate; }

    get paroleReviewDate(): Date { return this._paroleReviewDate; }
    set paroleReviewDate(paroleReviewDate: Date) { this._paroleReviewDate = paroleReviewDate; }

    get paroleDate(): Date { return this._paroleDate; }
    set paroleDate(paroleDate: Date) { this._paroleDate = paroleDate; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'createDateTime': this._createDateTime,
            'modifyDateTime': this._modifyDateTime,
            'modifyUserId': this._modifyUserId,
            'description': this._description,
            'code': this._code,
            'calcPosRelDate': this._calcPosRelDate,
            'nbtParoleReviewDate': this._nbtParoleReviewDate,
            'mostSeriousSentenceSeq': this._mostSeriousSentenceSeq,
            'nbtHearingDate': this._nbtHearingDate,
            'pbPosRelDate': this._pbPosRelDate,
            'nbtLatestPbRelease': this._nbtLatestPbRelease,
            'nbtEprhdDate': this._nbtEprhdDate,
            'offenderBookId': this._offenderBookId,
            'finalSentExpDate': this._finalSentExpDate,
            'ovrPosRelDate': this._ovrPosRelDate,
            'calcPosProbDate': this._calcPosProbDate,
            'ovrPosProbDate': this._ovrPosProbDate,
            'calcProbEffectDate': this._calcProbEffectDate,
            'ovrProbEffectDate': this._ovrProbEffectDate,
            'totalLengthHours': this._totalLengthHours,
            'totalLengthDays': this._totalLengthDays,
            'totalLengthWeeks': this._totalLengthWeeks,
            'totalLengthYears': this._totalLengthYears,
            'totalLengthMonths': this._totalLengthMonths,
            'calcProbExpDate': this._calcProbExpDate,
            'ovrProbExpDate': this._ovrProbExpDate,
            'ovrPrlExpDate': this._ovrPrlExpDate,
            'sentCalcNeededFlag': this._sentCalcNeededFlag,
            'totalAwolDays': this._totalAwolDays,
            'eligibleGoodtimeDays': this._eligibleGoodtimeDays,
            'totalServedTime': this._totalServedTime,
            'totalWorkTime': this._totalWorkTime,
            'goodtimeRevokedDays': this._goodtimeRevokedDays,
            'revokedParoleDays': this._revokedParoleDays,
            'ovrSentExpDate': this._ovrSentExpDate,
            'totalSatisfiedTime': this._totalSatisfiedTime,
            'earliestSentStartDate': this._earliestSentStartDate,
            'paroleReviewDate': this._paroleReviewDate,
            'paroleDate': this._paroleDate,
            'dspCalcPosRelDate': this._dspCalcPosRelDate,
            'dspOverrideFlag': this._dspOverrideFlag,
            'nbtSentenceLengthText': this._nbtSentenceLengthText,
        };
    }
}
