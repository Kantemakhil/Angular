import { BaseModel } from "../../../common/beans/BaseModel";

export class OffenderSentencesHty extends BaseModel{ 
    private _fineCommentText: string;
    private _orderType: string;
    private _createUserId: string;
    private _breachAmend: string;
    private _modifyDatetime: number;
    private _offenderBookId: number;
    private _orderId: number;
    private _counts: number;
    private _modifyUserId: string;
    private _revocationDate: number;
    private _consecToSentenceSeq: number;
    private _totalFine: number;
    private _gapFlag: string;
    private _paidDate: number;
    private _registrationDate: number;
    private _sentClosedDate: number;
    private _jurisCode: string;
    private _sentenceCalcTypeDesc: string;
    private _chargeSeq: number;
    private _sealFlag: string;
    private _dtbfFlag: string;
    private _asGoodtimeType: string;
    private _sentenceCalcType: string;
    private _probableReleaseDate: number;
    private _creationDate: number;
    private _dischargeReason: string;
    private _version: number;
    private _sentenceSeq: number;
    private _paymentDueDate: number;
    private _sentClosCommentText: string;
    private _dischargeComment: string;
    private _fineAmount: number;
    private _extendedDate: number;
    private _reportDueDate: number;
    private _startDate: Date;
    private _sentenceType: string;
    private _sentenceExpiryDate: Date;
    private _creationUser: string;
    private _consecutiveCountFlag: string;
    private _description: string;
    private _commentText: string;
    private _probableReleaseTime: number;
    private _sentenceDate: Date;
    private _sentCalcType: string;
    private _serialVersionUID: number;
    private _sentenceEventId: number;
    private _termChangedFlag: string;
    private _defaultDays: number;
    private _dischargeDate: number;
    private _eksSentence: string;
    private _startTime: Date;
    private _supervisingAgyLocId: string;
    private _goodConductDays: number;
    private _totalCompensation: number;
    private _sentenceCategory: string;
    private _dischargeAuthority: number;
    private _applicableAdjustCode: string;
    private _installmentDetails: string;
    private _sentClosReasonCode: string;
    private _nonProbationStartDate: Date;
    private _sentenceExpiryTime: Date;
    private _createDatetime: number;
    private _supervisionExpiryDate: Date;
    private _sentCalcNeededFlag: string;
    private _sentenceStatus: string;
    private _aggregateSentenceSeq: number;
    private _extendedFlag: string;
    private _jurisdictionCode: string;
    private _orderCode: string;
    private _extendingAuthority: string;
    private _effectiveDate: number;

    get fineCommentText(): string{ return this._fineCommentText; }
    set fineCommentText(pfineCommentText: string){ this._fineCommentText = pfineCommentText ;}
    get orderType(): string{ return this._orderType; }
    set orderType(porderType: string){ this._orderType = porderType ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get breachAmend(): string{ return this._breachAmend; }
    set breachAmend(pbreachAmend: string){ this._breachAmend = pbreachAmend ;}
    get modifyDatetime(): number{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: number){ this._modifyDatetime = pmodifyDatetime ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get orderId(): number{ return this._orderId; }
    set orderId(porderId: number){ this._orderId = porderId ;}
    get counts(): number{ return this._counts; }
    set counts(pcounts: number){ this._counts = pcounts ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get revocationDate(): number{ return this._revocationDate; }
    set revocationDate(prevocationDate: number){ this._revocationDate = prevocationDate ;}
    get consecToSentenceSeq(): number{ return this._consecToSentenceSeq; }
    set consecToSentenceSeq(pconsecToSentenceSeq: number){ this._consecToSentenceSeq = pconsecToSentenceSeq ;}
    get totalFine(): number{ return this._totalFine; }
    set totalFine(ptotalFine: number){ this._totalFine = ptotalFine ;}
    get gapFlag(): string{ return this._gapFlag; }
    set gapFlag(pgapFlag: string){ this._gapFlag = pgapFlag ;}
    get paidDate(): number{ return this._paidDate; }
    set paidDate(ppaidDate: number){ this._paidDate = ppaidDate ;}
    get registrationDate(): number{ return this._registrationDate; }
    set registrationDate(pregistrationDate: number){ this._registrationDate = pregistrationDate ;}
    get sentClosedDate(): number{ return this._sentClosedDate; }
    set sentClosedDate(psentClosedDate: number){ this._sentClosedDate = psentClosedDate ;}
    get jurisCode(): string{ return this._jurisCode; }
    set jurisCode(pjurisCode: string){ this._jurisCode = pjurisCode ;}
    get sentenceCalcTypeDesc(): string{ return this._sentenceCalcTypeDesc; }
    set sentenceCalcTypeDesc(psentenceCalcTypeDesc: string){ this._sentenceCalcTypeDesc = psentenceCalcTypeDesc ;}
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
    get probableReleaseDate(): number{ return this._probableReleaseDate; }
    set probableReleaseDate(pprobableReleaseDate: number){ this._probableReleaseDate = pprobableReleaseDate ;}
    get creationDate(): number{ return this._creationDate; }
    set creationDate(pcreationDate: number){ this._creationDate = pcreationDate ;}
    get dischargeReason(): string{ return this._dischargeReason; }
    set dischargeReason(pdischargeReason: string){ this._dischargeReason = pdischargeReason ;}
    get version(): number{ return this._version; }
    set version(pversion: number){ this._version = pversion ;}
    get sentenceSeq(): number{ return this._sentenceSeq; }
    set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq ;}
    get paymentDueDate(): number{ return this._paymentDueDate; }
    set paymentDueDate(ppaymentDueDate: number){ this._paymentDueDate = ppaymentDueDate ;}
    get sentClosCommentText(): string{ return this._sentClosCommentText; }
    set sentClosCommentText(psentClosCommentText: string){ this._sentClosCommentText = psentClosCommentText ;}
    get dischargeComment(): string{ return this._dischargeComment; }
    set dischargeComment(pdischargeComment: string){ this._dischargeComment = pdischargeComment ;}
    get fineAmount(): number{ return this._fineAmount; }
    set fineAmount(pfineAmount: number){ this._fineAmount = pfineAmount ;}
    get extendedDate(): number{ return this._extendedDate; }
    set extendedDate(pextendedDate: number){ this._extendedDate = pextendedDate ;}
    get reportDueDate(): number{ return this._reportDueDate; }
    set reportDueDate(preportDueDate: number){ this._reportDueDate = preportDueDate ;}
    get startDate(): Date{ return this._startDate; }
    set startDate(pstartDate: Date){ this._startDate = pstartDate ;}
    get sentenceType(): string{ return this._sentenceType; }
    set sentenceType(psentenceType: string){ this._sentenceType = psentenceType ;}
    get sentenceExpiryDate(): Date{ return this._sentenceExpiryDate; }
    set sentenceExpiryDate(psentenceExpiryDate: Date){ this._sentenceExpiryDate = psentenceExpiryDate ;}
    get creationUser(): string{ return this._creationUser; }
    set creationUser(pcreationUser: string){ this._creationUser = pcreationUser ;}
    get consecutiveCountFlag(): string{ return this._consecutiveCountFlag; }
    set consecutiveCountFlag(pconsecutiveCountFlag: string){ this._consecutiveCountFlag = pconsecutiveCountFlag ;}
    get description(): string{ return this._description; }
    set description(pdescription: string){ this._description = pdescription ;}
    get commentText(): string{ return this._commentText; }
    set commentText(pcommentText: string){ this._commentText = pcommentText ;}
    get probableReleaseTime(): number{ return this._probableReleaseTime; }
    set probableReleaseTime(pprobableReleaseTime: number){ this._probableReleaseTime = pprobableReleaseTime ;}
    get sentenceDate(): Date{ return this._sentenceDate; }
    set sentenceDate(psentenceDate: Date){ this._sentenceDate = psentenceDate ;}
    get sentCalcType(): string{ return this._sentCalcType; }
    set sentCalcType(psentCalcType: string){ this._sentCalcType = psentCalcType ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get sentenceEventId(): number{ return this._sentenceEventId; }
    set sentenceEventId(psentenceEventId: number){ this._sentenceEventId = psentenceEventId ;}
    get termChangedFlag(): string{ return this._termChangedFlag; }
    set termChangedFlag(ptermChangedFlag: string){ this._termChangedFlag = ptermChangedFlag ;}
    get defaultDays(): number{ return this._defaultDays; }
    set defaultDays(pdefaultDays: number){ this._defaultDays = pdefaultDays ;}
    get dischargeDate(): number{ return this._dischargeDate; }
    set dischargeDate(pdischargeDate: number){ this._dischargeDate = pdischargeDate ;}
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
    get sentenceCategory(): string{ return this._sentenceCategory; }
    set sentenceCategory(psentenceCategory: string){ this._sentenceCategory = psentenceCategory ;}
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
    get createDatetime(): number{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: number){ this._createDatetime = pcreateDatetime ;}
    get supervisionExpiryDate(): Date{ return this._supervisionExpiryDate; }
    set supervisionExpiryDate(psupervisionExpiryDate: Date){ this._supervisionExpiryDate = psupervisionExpiryDate ;}
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
    get effectiveDate(): number{ return this._effectiveDate; }
    set effectiveDate(peffectiveDate: number){ this._effectiveDate = peffectiveDate ;}

toJSON(): any {
    return { 
       'fineCommentText': this._fineCommentText,
       'orderType': this._orderType,
       'createUserId': this._createUserId,
       'breachAmend': this._breachAmend,
       'modifyDatetime': this._modifyDatetime,
       'offenderBookId': this._offenderBookId,
       'orderId': this._orderId,
       'counts': this._counts,
       'modifyUserId': this._modifyUserId,
       'revocationDate': this._revocationDate,
       'consecToSentenceSeq': this._consecToSentenceSeq,
       'totalFine': this._totalFine,
       'gapFlag': this._gapFlag,
       'paidDate': this._paidDate,
       'registrationDate': this._registrationDate,
       'sentClosedDate': this._sentClosedDate,
       'jurisCode': this._jurisCode,
       'sentenceCalcTypeDesc': this._sentenceCalcTypeDesc,
       'chargeSeq': this._chargeSeq,
       'sealFlag': this._sealFlag,
       'dtbfFlag': this._dtbfFlag,
       'asGoodtimeType': this._asGoodtimeType,
       'sentenceCalcType': this._sentenceCalcType,
       'probableReleaseDate': this._probableReleaseDate,
       'creationDate': this._creationDate,
       'dischargeReason': this._dischargeReason,
       'version': this._version,
       'sentenceSeq': this._sentenceSeq,
       'paymentDueDate': this._paymentDueDate,
       'sentClosCommentText': this._sentClosCommentText,
       'dischargeComment': this._dischargeComment,
       'fineAmount': this._fineAmount,
       'extendedDate': this._extendedDate,
       'reportDueDate': this._reportDueDate,
       'startDate': this._startDate,
       'sentenceType': this._sentenceType,
       'sentenceExpiryDate': this._sentenceExpiryDate,
       'creationUser': this._creationUser,
       'consecutiveCountFlag': this._consecutiveCountFlag,
       'description': this._description,
       'commentText': this._commentText,
       'probableReleaseTime': this._probableReleaseTime,
       'sentenceDate': this._sentenceDate,
       'sentCalcType': this._sentCalcType,
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
       'sentenceCategory': this._sentenceCategory,
       'dischargeAuthority': this._dischargeAuthority,
       'applicableAdjustCode': this._applicableAdjustCode,
       'installmentDetails': this._installmentDetails,
       'sentClosReasonCode': this._sentClosReasonCode,
       'nonProbationStartDate': this._nonProbationStartDate,
       'sentenceExpiryTime': this._sentenceExpiryTime,
       'createDatetime': this._createDatetime,
       'supervisionExpiryDate': this._supervisionExpiryDate,
       'sentCalcNeededFlag': this._sentCalcNeededFlag,
       'sentenceStatus': this._sentenceStatus,
       'aggregateSentenceSeq': this._aggregateSentenceSeq,
       'extendedFlag': this._extendedFlag,
       'jurisdictionCode': this._jurisdictionCode,
       'orderCode': this._orderCode,
       'extendingAuthority': this._extendingAuthority,
       'effectiveDate': this._effectiveDate,
        };
    } 
    
}