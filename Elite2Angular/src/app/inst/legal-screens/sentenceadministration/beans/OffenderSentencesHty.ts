

export class OffenderSentencesHty {

    private _offenderSentenceHtyId;
    private _fineCommentText: string;
    private _orderType: string;
    private _createUserId: string;
    private _offenderBookId: number;
    private _modifyDatetime: Date;
    private _counts: number;
    private _revocationDate: Date;
    private _modifyUserId: string;
    private _consecToSentenceSeq: number;
    private _totalFine: number;
    private _gapFlag: string;
    private _paidDate: Date;
    private _sentClosedDate: Date;
    private _registrationDate: Date;
    private _chargeSeq: number;
    private _sealFlag: string;
    private _dtbfFlag: string;
    private _asGoodtimeType: string;
    private _sentenceCalcType: string;
    private _probableReleaseDate: Date;
    private _creationDate: Date;
    private _dischargeReason: string;
    private _sentenceSeq: number;
    private _paymentDueDate: Date;
    private _sentClosCommentText: string;
    private _dischargeComment: string;
    private _fineAmount: number;
    private _extendedDate: Date;
    private _reportDueDate: Date;
    private _startDate: Date;
    private _sentenceExpiryDate: Date;
    private _creationUser: string;
    private _consecutiveCountFlag: string;
    private _description: string;
    private _sentenceDate: Date;
    private _probableReleaseTime: Date;
    private _commentText: string;
    private _serialVersionUID: number;
    private _sentenceEventId: number;
    private _termChangedFlag: string;
    private _defaultDays: number;
    private _dischargeDate: Date;
    private _eksSentence: string;
    private _startTime: Date;
    private _supervisingAgyLocId: string;
    private _goodConductDays: number;
    private _totalCompensation: number;
    private _dischargeAuthority: number;
    private _applicableAdjustCode: string;
    private _installmentDetails: string;
    private _sentClosReasonCode: string;
    private _nonProbationStartDate: Date;
    private _sentenceExpiryTime: Date;
    private _supervisionExpiryDate: Date;
    private _createDatetime: Date;
    private _sentCalcNeededFlag: string;
    private _sentenceStatus: string;
    private _aggregateSentenceSeq: number;
    private _extendedFlag: string;
    private _jurisdictionCode: string;
    private _orderCode: string;
    private _extendingAuthority: string;
    private _effectiveDate: Date;
    private _adjustDate: Date;
    private _adjustTime: Date;
    private _adjustReason: String;
    private _noOfUnexcusedAbsence: number;
    private _staffName: String;
    
    
    
    get staffName(): String {return this._staffName; }
    set staffName(value: String) { this._staffName = value; }
    get fineCommentText(): string{ return this._fineCommentText; }
    set fineCommentText(pfineCommentText: string){ this._fineCommentText = pfineCommentText ;}
    get orderType(): string{ return this._orderType; }
    set orderType(porderType: string){ this._orderType = porderType ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get counts(): number{ return this._counts; }
    set counts(pcounts: number){ this._counts = pcounts ;}
    get revocationDate(): Date{ return this._revocationDate; }
    set revocationDate(prevocationDate: Date){ this._revocationDate = prevocationDate ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get consecToSentenceSeq(): number{ return this._consecToSentenceSeq; }
    set consecToSentenceSeq(pconsecToSentenceSeq: number){ this._consecToSentenceSeq = pconsecToSentenceSeq ;}
    get totalFine(): number{ return this._totalFine; }
    set totalFine(ptotalFine: number){ this._totalFine = ptotalFine ;}
    get gapFlag(): string{ return this._gapFlag; }
    set gapFlag(pgapFlag: string){ this._gapFlag = pgapFlag ;}
    get paidDate(): Date{ return this._paidDate; }
    set paidDate(ppaidDate: Date){ this._paidDate = ppaidDate ;}
    get sentClosedDate(): Date{ return this._sentClosedDate; }
    set sentClosedDate(psentClosedDate: Date){ this._sentClosedDate = psentClosedDate ;}
    get registrationDate(): Date{ return this._registrationDate; }
    set registrationDate(pregistrationDate: Date){ this._registrationDate = pregistrationDate ;}
    get chargeSeq(): number{ return this._chargeSeq; }
    set chargeSeq(pchargeSeq: number){ this._chargeSeq = pchargeSeq ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get dtbfFlag(): string{ return this._dtbfFlag; }
    set dtbfFlag(pdtbfFlag: string){ this._dtbfFlag = pdtbfFlag ;}
    get asGoodtimeType(): string{ return this._asGoodtimeType; }
    set asGoodtimeType(pasGoodtimeType: string){ this._asGoodtimeType = pasGoodtimeType ;}
    get sentenceCalcType(): string{ return this._sentenceCalcType; }
    set sentenceCalcType(psentenceCalcType: string){ this._sentenceCalcType = psentenceCalcType ;}
    get probableReleaseDate(): Date{ return this._probableReleaseDate; }
    set probableReleaseDate(pprobableReleaseDate: Date){ this._probableReleaseDate = pprobableReleaseDate ;}
    get creationDate(): Date{ return this._creationDate; }
    set creationDate(pcreationDate: Date){ this._creationDate = pcreationDate ;}
    get dischargeReason(): string{ return this._dischargeReason; }
    set dischargeReason(pdischargeReason: string){ this._dischargeReason = pdischargeReason ;}
    get sentenceSeq(): number{ return this._sentenceSeq; }
    set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq ;}
    get paymentDueDate(): Date{ return this._paymentDueDate; }
    set paymentDueDate(ppaymentDueDate: Date){ this._paymentDueDate = ppaymentDueDate ;}
    get sentClosCommentText(): string{ return this._sentClosCommentText; }
    set sentClosCommentText(psentClosCommentText: string){ this._sentClosCommentText = psentClosCommentText ;}
    get dischargeComment(): string{ return this._dischargeComment; }
    set dischargeComment(pdischargeComment: string){ this._dischargeComment = pdischargeComment ;}
    get fineAmount(): number{ return this._fineAmount; }
    set fineAmount(pfineAmount: number){ this._fineAmount = pfineAmount ;}
    get extendedDate(): Date{ return this._extendedDate; }
    set extendedDate(pextendedDate: Date){ this._extendedDate = pextendedDate ;}
    get reportDueDate(): Date{ return this._reportDueDate; }
    set reportDueDate(preportDueDate: Date){ this._reportDueDate = preportDueDate ;}
    get startDate(): Date{ return this._startDate; }
    set startDate(pstartDate: Date){ this._startDate = pstartDate ;}
    get sentenceExpiryDate(): Date{ return this._sentenceExpiryDate; }
    set sentenceExpiryDate(psentenceExpiryDate: Date){ this._sentenceExpiryDate = psentenceExpiryDate ;}
    get creationUser(): string{ return this._creationUser; }
    set creationUser(pcreationUser: string){ this._creationUser = pcreationUser ;}
    get consecutiveCountFlag(): string{ return this._consecutiveCountFlag; }
    set consecutiveCountFlag(pconsecutiveCountFlag: string){ this._consecutiveCountFlag = pconsecutiveCountFlag ;}
    get description(): string{ return this._description; }
    set description(pdescription: string){ this._description = pdescription ;}
    get sentenceDate(): Date{ return this._sentenceDate; }
    set sentenceDate(psentenceDate: Date){ this._sentenceDate = psentenceDate ;}
    get probableReleaseTime(): Date{ return this._probableReleaseTime; }
    set probableReleaseTime(pprobableReleaseTime: Date){ this._probableReleaseTime = pprobableReleaseTime ;}
    get commentText(): string{ return this._commentText; }
    set commentText(pcommentText: string){ this._commentText = pcommentText ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get sentenceEventId(): number{ return this._sentenceEventId; }
    set sentenceEventId(psentenceEventId: number){ this._sentenceEventId = psentenceEventId ;}
    get termChangedFlag(): string{ return this._termChangedFlag; }
    set termChangedFlag(ptermChangedFlag: string){ this._termChangedFlag = ptermChangedFlag ;}
    get defaultDays(): number{ return this._defaultDays; }
    set defaultDays(pdefaultDays: number){ this._defaultDays = pdefaultDays ;}
    get dischargeDate(): Date{ return this._dischargeDate; }
    set dischargeDate(pdischargeDate: Date){ this._dischargeDate = pdischargeDate ;}
    get eksSentence(): string{ return this._eksSentence; }
    set eksSentence(peksSentence: string){ this._eksSentence = peksSentence ;}
    get startTime(): Date{ return this._startTime; }
    set startTime(pstartTime: Date){ this._startTime = pstartTime ;}
    get supervisingAgyLocId(): string{ return this._supervisingAgyLocId; }
    set supervisingAgyLocId(psupervisingAgyLocId: string){ this._supervisingAgyLocId = psupervisingAgyLocId ;}
    get goodConductDays(): number{ return this._goodConductDays; }
    set goodConductDays(pgoodConductDays: number){ this._goodConductDays = pgoodConductDays ;}
    get totalCompensation(): number{ return this._totalCompensation; }
    set totalCompensation(ptotalCompensation: number){ this._totalCompensation = ptotalCompensation ;}
    get dischargeAuthority(): number{ return this._dischargeAuthority; }
    set dischargeAuthority(pdischargeAuthority: number){ this._dischargeAuthority = pdischargeAuthority ;}
    get applicableAdjustCode(): string{ return this._applicableAdjustCode; }
    set applicableAdjustCode(papplicableAdjustCode: string){ this._applicableAdjustCode = papplicableAdjustCode ;}
    get installmentDetails(): string{ return this._installmentDetails; }
    set installmentDetails(pinstallmentDetails: string){ this._installmentDetails = pinstallmentDetails ;}
    get sentClosReasonCode(): string{ return this._sentClosReasonCode; }
    set sentClosReasonCode(psentClosReasonCode: string){ this._sentClosReasonCode = psentClosReasonCode ;}
    get nonProbationStartDate(): Date{ return this._nonProbationStartDate; }
    set nonProbationStartDate(pnonProbationStartDate: Date){ this._nonProbationStartDate = pnonProbationStartDate ;}
    get sentenceExpiryTime(): Date{ return this._sentenceExpiryTime; }
    set sentenceExpiryTime(psentenceExpiryTime: Date){ this._sentenceExpiryTime = psentenceExpiryTime ;}
    get supervisionExpiryDate(): Date{ return this._supervisionExpiryDate; }
    set supervisionExpiryDate(psupervisionExpiryDate: Date){ this._supervisionExpiryDate = psupervisionExpiryDate ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get sentCalcNeededFlag(): string{ return this._sentCalcNeededFlag; }
    set sentCalcNeededFlag(psentCalcNeededFlag: string){ this._sentCalcNeededFlag = psentCalcNeededFlag ;}
    get sentenceStatus(): string{ return this._sentenceStatus; }
    set sentenceStatus(psentenceStatus: string){ this._sentenceStatus = psentenceStatus ;}
    get aggregateSentenceSeq(): number{ return this._aggregateSentenceSeq; }
    set aggregateSentenceSeq(paggregateSentenceSeq: number){ this._aggregateSentenceSeq = paggregateSentenceSeq ;}
    get extendedFlag(): string{ return this._extendedFlag; }
    set extendedFlag(pextendedFlag: string){ this._extendedFlag = pextendedFlag ;}
    get jurisdictionCode(): string{ return this._jurisdictionCode; }
    set jurisdictionCode(pjurisdictionCode: string){ this._jurisdictionCode = pjurisdictionCode ;}
    get orderCode(): string{ return this._orderCode; }
    set orderCode(porderCode: string){ this._orderCode = porderCode ;}
    get extendingAuthority(): string{ return this._extendingAuthority; }
    set extendingAuthority(pextendingAuthority: string){ this._extendingAuthority = pextendingAuthority ;}
    get effectiveDate(): Date{ return this._effectiveDate; }
    set effectiveDate(peffectiveDate: Date){ this._effectiveDate = peffectiveDate ;}
    get adjustDate(): Date { return this._adjustDate; }
    set adjustDate(value: Date) { this._adjustDate = value; }
    get adjustTime(): Date { return this._adjustTime;  }
    set adjustTime(value: Date) { this._adjustTime = value;}
    get adjustReason(): String {      return this._adjustReason;}
    set adjustReason(value: String) {       this._adjustReason = value;}
    get noOfUnexcusedAbsence(): number{ return this._noOfUnexcusedAbsence; }
    set noOfUnexcusedAbsence(noOfUnexcusedAbsence: number){ this._noOfUnexcusedAbsence = noOfUnexcusedAbsence ;}

toJSON(): any {
    return { 
       'fineCommentText': this._fineCommentText,
       'orderType': this._orderType,
       'createUserId': this._createUserId,
       'offenderBookId': this._offenderBookId,
       'modifyDatetime': this._modifyDatetime,
       'counts': this._counts,
       'revocationDate': this._revocationDate,
       'modifyUserId': this._modifyUserId,
       'consecToSentenceSeq': this._consecToSentenceSeq,
       'totalFine': this._totalFine,
       'gapFlag': this._gapFlag,
       'paidDate': this._paidDate,
       'sentClosedDate': this._sentClosedDate,
       'registrationDate': this._registrationDate,
       'chargeSeq': this._chargeSeq,
       'sealFlag': this._sealFlag,
       'dtbfFlag': this._dtbfFlag,
       'asGoodtimeType': this._asGoodtimeType,
       'sentenceCalcType': this._sentenceCalcType,
       'probableReleaseDate': this._probableReleaseDate,
       'creationDate': this._creationDate,
       'dischargeReason': this._dischargeReason,
       'sentenceSeq': this._sentenceSeq,
       'paymentDueDate': this._paymentDueDate,
       'sentClosCommentText': this._sentClosCommentText,
       'dischargeComment': this._dischargeComment,
       'fineAmount': this._fineAmount,
       'extendedDate': this._extendedDate,
       'reportDueDate': this._reportDueDate,
       'startDate': this._startDate,
       'sentenceExpiryDate': this._sentenceExpiryDate,
       'creationUser': this._creationUser,
       'consecutiveCountFlag': this._consecutiveCountFlag,
       'description': this._description,
       'sentenceDate': this._sentenceDate,
       'probableReleaseTime': this._probableReleaseTime,
       'commentText': this._commentText,
       'serialVersionUID': this._serialVersionUID,
       'sentenceEventId': this._sentenceEventId,
       'termChangedFlag': this._termChangedFlag,
       'defaultDays': this._defaultDays,
       'dischargeDate': this._dischargeDate,
       'eksSentence': this._eksSentence,
       'startTime': this._startTime,
       'supervisingAgyLocId': this._supervisingAgyLocId,
       'goodConductDays': this._goodConductDays,
       'totalCompensation': this._totalCompensation,
       'dischargeAuthority': this._dischargeAuthority,
       'applicableAdjustCode': this._applicableAdjustCode,
       'installmentDetails': this._installmentDetails,
       'sentClosReasonCode': this._sentClosReasonCode,
       'nonProbationStartDate': this._nonProbationStartDate,
       'sentenceExpiryTime': this._sentenceExpiryTime,
       'supervisionExpiryDate': this._supervisionExpiryDate,
       'createDatetime': this._createDatetime,
       'sentCalcNeededFlag': this._sentCalcNeededFlag,
       'sentenceStatus': this._sentenceStatus,
       'aggregateSentenceSeq': this._aggregateSentenceSeq,
       'extendedFlag': this._extendedFlag,
       'jurisdictionCode': this._jurisdictionCode,
       'orderCode': this._orderCode,
       'extendingAuthority': this._extendingAuthority,
       'effectiveDate': this._effectiveDate,
       'offenderSentenceHtyId': this._offenderSentenceHtyId,
       'adjustReason': this._adjustReason,
       'noOfUnexcusedAbsence' : this._noOfUnexcusedAbsence,
       'staffName' : this._staffName,
       'adjustDate' : this._adjustDate,
       'adjustTime' : this._adjustTime,

        };
    } 
}