export class OffenderSentenceAggs {
    private _daysRemaining: number;
    private _createUserId: string;
    private _updateFlag: string;
    private _offenderBookId: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _totalAwolDays: number;
    private _errorCode: number;
    private _ovrYouAggDays: number;
    private _ovrSentExpDate: Date;
    private _paroleDate: Date;
    private _sentenceLengthText: string;
    private _totalLengthMonths: number;
    private _calcPosRelDate: Date;
    private _paroleReviewDate: Date;
    private _earliestSentStartDate: Date;
    private _sealFlag: string;
    private _mostSeriousSentenceSeq: number;
    private _ovrPosProbDate: Date;
    private _totalLengthWeeks: number;
    private _maxTerm: string;
    private _modifyDate: Date;
    private _bookMaxDate: Date;
    private _ysDischargeDate: Date;
    private _paroleEndDate: Date;
    private _minTerm: string;
    private _minExpirationDate: Date;
    private _revokedParoleDays: number;
    private _totalSatisfiedTime: number;
    private _calcPosProbDate: Date;
    private _ovrProbEffectDate: Date;
    private _actualMaxDate: Date;
    private _totalLengthYears: number;
    private _calcProbEffectDate: Date;
    private _ovrProbExpDate: Date;
    private _ovrPrlExpDate: Date;
    private _notificationDate: Date;
    private _totalLengthHours: number;
    private _controlOrderId: number;
    private _ovrPosRelDate: Date;
    private _totalWorkTime: number;
    private _ovrParoleEligiblityDate: Date;
    private _ovrAdultAggDays: number;
    private _paroleEligiblityDate: Date;
    private _commentText: string;
    private _ovrEarliestSentStartDate: Date;
    private _verifiedFlag: string;
    private _caseManagementDate: Date;
    private _serialVersionUID: number;
    private _releaseReason: string;
    private _dischargeDate: Date;
    private _totalAttendenceTime: number;
    private _eligibleGoodtimeDays: number;
    private _yoDischargeDate: Date;
    private _intDischargeDate: Date;
    private _ovrIntDischargeDate: Date;
    private _pendingSentSetDate: Date;
    private _flatMaxDate: Date;
    private _ovrDischargeDate: Date;
    private _createDatetime: Date;
    private _totalServedTime: number;
    private _sentCalcNeededFlag: string;
    private _finalSentExpDate: Date;
    private _ovrYoDischargeDate: Date;
    private _goodtimeRevokedDays: number;
    private _ovrYsDischargeDate: Date;
    private _totalLengthDays: number;
    private _printedFlag: string;
    private _pendingSentFlag: string;

    get daysRemaining(): number { return this._daysRemaining; }
    set daysRemaining(pdaysRemaining: number) { this._daysRemaining = pdaysRemaining ; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId ; }
    get updateFlag(): string { return this._updateFlag; }
    set updateFlag(pupdateFlag: string) { this._updateFlag = pupdateFlag ; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId ; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime ; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId ; }
    get totalAwolDays(): number { return this._totalAwolDays; }
    set totalAwolDays(ptotalAwolDays: number) { this._totalAwolDays = ptotalAwolDays ; }
    get errorCode(): number { return this._errorCode; }
    set errorCode(perrorCode: number) { this._errorCode = perrorCode ; }
    get ovrYouAggDays(): number { return this._ovrYouAggDays; }
    set ovrYouAggDays(povrYouAggDays: number) { this._ovrYouAggDays = povrYouAggDays ; }
    get ovrSentExpDate(): Date { return this._ovrSentExpDate; }
    set ovrSentExpDate(povrSentExpDate: Date) { this._ovrSentExpDate = povrSentExpDate ; }
    get paroleDate(): Date { return this._paroleDate; }
    set paroleDate(pparoleDate: Date) { this._paroleDate = pparoleDate ; }
    get sentenceLengthText(): string { return this._sentenceLengthText; }
    set sentenceLengthText(psentenceLengthText: string) { this._sentenceLengthText = psentenceLengthText ; }
    get totalLengthMonths(): number { return this._totalLengthMonths; }
    set totalLengthMonths(ptotalLengthMonths: number) { this._totalLengthMonths = ptotalLengthMonths ; }
    get calcPosRelDate(): Date { return this._calcPosRelDate; }
    set calcPosRelDate(pcalcPosRelDate: Date) { this._calcPosRelDate = pcalcPosRelDate ; }
    get paroleReviewDate(): Date { return this._paroleReviewDate; }
    set paroleReviewDate(pparoleReviewDate: Date) { this._paroleReviewDate = pparoleReviewDate ; }
    get earliestSentStartDate(): Date { return this._earliestSentStartDate; }
    set earliestSentStartDate(pearliestSentStartDate: Date) { this._earliestSentStartDate = pearliestSentStartDate ; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag ; }
    get mostSeriousSentenceSeq(): number { return this._mostSeriousSentenceSeq; }
    set mostSeriousSentenceSeq(pmostSeriousSentenceSeq: number) { this._mostSeriousSentenceSeq = pmostSeriousSentenceSeq ; }
    get ovrPosProbDate(): Date { return this._ovrPosProbDate; }
    set ovrPosProbDate(povrPosProbDate: Date) { this._ovrPosProbDate = povrPosProbDate ; }
    get totalLengthWeeks(): number { return this._totalLengthWeeks; }
    set totalLengthWeeks(ptotalLengthWeeks: number) { this._totalLengthWeeks = ptotalLengthWeeks ; }
    get maxTerm(): string { return this._maxTerm; }
    set maxTerm(pmaxTerm: string) { this._maxTerm = pmaxTerm ; }
    get modifyDate(): Date { return this._modifyDate; }
    set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate ; }
    get bookMaxDate(): Date { return this._bookMaxDate; }
    set bookMaxDate(pbookMaxDate: Date) { this._bookMaxDate = pbookMaxDate ; }
    get ysDischargeDate(): Date { return this._ysDischargeDate; }
    set ysDischargeDate(pysDischargeDate: Date) { this._ysDischargeDate = pysDischargeDate ; }
    get paroleEndDate(): Date { return this._paroleEndDate; }
    set paroleEndDate(pparoleEndDate: Date) { this._paroleEndDate = pparoleEndDate ; }
    get minTerm(): string { return this._minTerm; }
    set minTerm(pminTerm: string) { this._minTerm = pminTerm ; }
    get minExpirationDate(): Date { return this._minExpirationDate; }
    set minExpirationDate(pminExpirationDate: Date) { this._minExpirationDate = pminExpirationDate ; }
    get revokedParoleDays(): number { return this._revokedParoleDays; }
    set revokedParoleDays(prevokedParoleDays: number) { this._revokedParoleDays = prevokedParoleDays ; }
    get totalSatisfiedTime(): number { return this._totalSatisfiedTime; }
    set totalSatisfiedTime(ptotalSatisfiedTime: number) { this._totalSatisfiedTime = ptotalSatisfiedTime ; }
    get calcPosProbDate(): Date { return this._calcPosProbDate; }
    set calcPosProbDate(pcalcPosProbDate: Date) { this._calcPosProbDate = pcalcPosProbDate ; }
    get ovrProbEffectDate(): Date { return this._ovrProbEffectDate; }
    set ovrProbEffectDate(povrProbEffectDate: Date) { this._ovrProbEffectDate = povrProbEffectDate ; }
    get actualMaxDate(): Date { return this._actualMaxDate; }
    set actualMaxDate(pactualMaxDate: Date) { this._actualMaxDate = pactualMaxDate ; }
    get totalLengthYears(): number { return this._totalLengthYears; }
    set totalLengthYears(ptotalLengthYears: number) { this._totalLengthYears = ptotalLengthYears ; }
    get calcProbEffectDate(): Date { return this._calcProbEffectDate; }
    set calcProbEffectDate(pcalcProbEffectDate: Date) { this._calcProbEffectDate = pcalcProbEffectDate ; }
    get ovrProbExpDate(): Date { return this._ovrProbExpDate; }
    set ovrProbExpDate(povrProbExpDate: Date) { this._ovrProbExpDate = povrProbExpDate ; }
    get ovrPrlExpDate(): Date { return this._ovrPrlExpDate; }
    set ovrPrlExpDate(povrPrlExpDate: Date) { this._ovrPrlExpDate = povrPrlExpDate ; }
    get notificationDate(): Date { return this._notificationDate; }
    set notificationDate(pnotificationDate: Date) { this._notificationDate = pnotificationDate ; }
    get totalLengthHours(): number { return this._totalLengthHours; }
    set totalLengthHours(ptotalLengthHours: number) { this._totalLengthHours = ptotalLengthHours ; }
    get controlOrderId(): number { return this._controlOrderId; }
    set controlOrderId(pcontrolOrderId: number) { this._controlOrderId = pcontrolOrderId ; }
    get ovrPosRelDate(): Date { return this._ovrPosRelDate; }
    set ovrPosRelDate(povrPosRelDate: Date) { this._ovrPosRelDate = povrPosRelDate ; }
    get totalWorkTime(): number { return this._totalWorkTime; }
    set totalWorkTime(ptotalWorkTime: number) { this._totalWorkTime = ptotalWorkTime ; }
    get ovrParoleEligiblityDate(): Date { return this._ovrParoleEligiblityDate; }
    set ovrParoleEligiblityDate(povrParoleEligiblityDate: Date) { this._ovrParoleEligiblityDate = povrParoleEligiblityDate ; }
    get ovrAdultAggDays(): number { return this._ovrAdultAggDays; }
    set ovrAdultAggDays(povrAdultAggDays: number) { this._ovrAdultAggDays = povrAdultAggDays ; }
    get paroleEligiblityDate(): Date { return this._paroleEligiblityDate; }
    set paroleEligiblityDate(pparoleEligiblityDate: Date) { this._paroleEligiblityDate = pparoleEligiblityDate ; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText ; }
    get ovrEarliestSentStartDate(): Date { return this._ovrEarliestSentStartDate; }
    set ovrEarliestSentStartDate(povrEarliestSentStartDate: Date) { this._ovrEarliestSentStartDate = povrEarliestSentStartDate ; }
    get verifiedFlag(): string { return this._verifiedFlag; }
    set verifiedFlag(pverifiedFlag: string) { this._verifiedFlag = pverifiedFlag ; }
    get caseManagementDate(): Date { return this._caseManagementDate; }
    set caseManagementDate(pcaseManagementDate: Date) { this._caseManagementDate = pcaseManagementDate ; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID ; }
    get releaseReason(): string { return this._releaseReason; }
    set releaseReason(preleaseReason: string) { this._releaseReason = preleaseReason ; }
    get dischargeDate(): Date { return this._dischargeDate; }
    set dischargeDate(pdischargeDate: Date) { this._dischargeDate = pdischargeDate ; }
    get totalAttendenceTime(): number { return this._totalAttendenceTime; }
    set totalAttendenceTime(ptotalAttendenceTime: number) { this._totalAttendenceTime = ptotalAttendenceTime ; }
    get eligibleGoodtimeDays(): number { return this._eligibleGoodtimeDays; }
    set eligibleGoodtimeDays(peligibleGoodtimeDays: number) { this._eligibleGoodtimeDays = peligibleGoodtimeDays ; }
    get yoDischargeDate(): Date { return this._yoDischargeDate; }
    set yoDischargeDate(pyoDischargeDate: Date) { this._yoDischargeDate = pyoDischargeDate ; }
    get intDischargeDate(): Date { return this._intDischargeDate; }
    set intDischargeDate(pintDischargeDate: Date) { this._intDischargeDate = pintDischargeDate ; }
    get ovrIntDischargeDate(): Date { return this._ovrIntDischargeDate; }
    set ovrIntDischargeDate(povrIntDischargeDate: Date) { this._ovrIntDischargeDate = povrIntDischargeDate ; }
    get pendingSentSetDate(): Date { return this._pendingSentSetDate; }
    set pendingSentSetDate(ppendingSentSetDate: Date) { this._pendingSentSetDate = ppendingSentSetDate ; }
    get flatMaxDate(): Date { return this._flatMaxDate; }
    set flatMaxDate(pflatMaxDate: Date) { this._flatMaxDate = pflatMaxDate ; }
    get ovrDischargeDate(): Date { return this._ovrDischargeDate; }
    set ovrDischargeDate(povrDischargeDate: Date) { this._ovrDischargeDate = povrDischargeDate ; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime ; }
    get totalServedTime(): number { return this._totalServedTime; }
    set totalServedTime(ptotalServedTime: number) { this._totalServedTime = ptotalServedTime ; }
    get sentCalcNeededFlag(): string { return this._sentCalcNeededFlag; }
    set sentCalcNeededFlag(psentCalcNeededFlag: string) { this._sentCalcNeededFlag = psentCalcNeededFlag ; }
    get finalSentExpDate(): Date { return this._finalSentExpDate; }
    set finalSentExpDate(pfinalSentExpDate: Date) { this._finalSentExpDate = pfinalSentExpDate ; }
    get ovrYoDischargeDate(): Date { return this._ovrYoDischargeDate; }
    set ovrYoDischargeDate(povrYoDischargeDate: Date) { this._ovrYoDischargeDate = povrYoDischargeDate ; }
    get goodtimeRevokedDays(): number { return this._goodtimeRevokedDays; }
    set goodtimeRevokedDays(pgoodtimeRevokedDays: number) { this._goodtimeRevokedDays = pgoodtimeRevokedDays ; }
    get ovrYsDischargeDate(): Date { return this._ovrYsDischargeDate; }
    set ovrYsDischargeDate(povrYsDischargeDate: Date) { this._ovrYsDischargeDate = povrYsDischargeDate ; }
    get totalLengthDays(): number { return this._totalLengthDays; }
    set totalLengthDays(ptotalLengthDays: number) { this._totalLengthDays = ptotalLengthDays ; }
    get printedFlag(): string { return this._printedFlag; }
    set printedFlag(pprintedFlag: string) { this._printedFlag = pprintedFlag ; }
    get pendingSentFlag(): string { return this._pendingSentFlag; }
    set pendingSentFlag(ppendingSentFlag: string) { this._pendingSentFlag = ppendingSentFlag ; }

toJSON(): any {
    return {
       'daysRemaining': this._daysRemaining,
       'createUserId': this._createUserId,
       'updateFlag': this._updateFlag,
       'offenderBookId': this._offenderBookId,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'totalAwolDays': this._totalAwolDays,
       'errorCode': this._errorCode,
       'ovrYouAggDays': this._ovrYouAggDays,
       'ovrSentExpDate': this._ovrSentExpDate,
       'paroleDate': this._paroleDate,
       'sentenceLengthText': this._sentenceLengthText,
       'totalLengthMonths': this._totalLengthMonths,
       'calcPosRelDate': this._calcPosRelDate,
       'paroleReviewDate': this._paroleReviewDate,
       'earliestSentStartDate': this._earliestSentStartDate,
       'sealFlag': this._sealFlag,
       'mostSeriousSentenceSeq': this._mostSeriousSentenceSeq,
       'ovrPosProbDate': this._ovrPosProbDate,
       'totalLengthWeeks': this._totalLengthWeeks,
       'maxTerm': this._maxTerm,
       'modifyDate': this._modifyDate,
       'bookMaxDate': this._bookMaxDate,
       'ysDischargeDate': this._ysDischargeDate,
       'paroleEndDate': this._paroleEndDate,
       'minTerm': this._minTerm,
       'minExpirationDate': this._minExpirationDate,
       'revokedParoleDays': this._revokedParoleDays,
       'totalSatisfiedTime': this._totalSatisfiedTime,
       'calcPosProbDate': this._calcPosProbDate,
       'ovrProbEffectDate': this._ovrProbEffectDate,
       'actualMaxDate': this._actualMaxDate,
       'totalLengthYears': this._totalLengthYears,
       'calcProbEffectDate': this._calcProbEffectDate,
       'ovrProbExpDate': this._ovrProbExpDate,
       'ovrPrlExpDate': this._ovrPrlExpDate,
       'notificationDate': this._notificationDate,
       'totalLengthHours': this._totalLengthHours,
       'controlOrderId': this._controlOrderId,
       'ovrPosRelDate': this._ovrPosRelDate,
       'totalWorkTime': this._totalWorkTime,
       'ovrParoleEligiblityDate': this._ovrParoleEligiblityDate,
       'ovrAdultAggDays': this._ovrAdultAggDays,
       'paroleEligiblityDate': this._paroleEligiblityDate,
       'commentText': this._commentText,
       'ovrEarliestSentStartDate': this._ovrEarliestSentStartDate,
       'verifiedFlag': this._verifiedFlag,
       'caseManagementDate': this._caseManagementDate,
       'serialVersionUID': this._serialVersionUID,
       'releaseReason': this._releaseReason,
       'dischargeDate': this._dischargeDate,
       'totalAttendenceTime': this._totalAttendenceTime,
       'eligibleGoodtimeDays': this._eligibleGoodtimeDays,
       'yoDischargeDate': this._yoDischargeDate,
       'intDischargeDate': this._intDischargeDate,
       'ovrIntDischargeDate': this._ovrIntDischargeDate,
       'pendingSentSetDate': this._pendingSentSetDate,
       'flatMaxDate': this._flatMaxDate,
       'ovrDischargeDate': this._ovrDischargeDate,
       'createDatetime': this._createDatetime,
       'totalServedTime': this._totalServedTime,
       'sentCalcNeededFlag': this._sentCalcNeededFlag,
       'finalSentExpDate': this._finalSentExpDate,
       'ovrYoDischargeDate': this._ovrYoDischargeDate,
       'goodtimeRevokedDays': this._goodtimeRevokedDays,
       'ovrYsDischargeDate': this._ovrYsDischargeDate,
       'totalLengthDays': this._totalLengthDays,
       'printedFlag': this._printedFlag,
       'pendingSentFlag': this._pendingSentFlag,
        };
    }

}
