import { BaseModel } from '@commonbeans/BaseModel'
import { OffensesOutcome } from "../beans/OffensesOutcome";
import { SentenceTerms } from "../beans/SentenceTerms";

export class OffenderSentences extends BaseModel {

    private _offenderBookId: number;
    private _caseId: number;
    private _startTime: Date;
    private _endTime: Date;
    private _createUserId: string;
    private _createDatetime: Date;
    private _modifyDateTime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _sentenceSeq: number;
    private _orderId: string;
    private _startDate: Date;
    private _endDate: Date;
    private _effectiveDate: Date;
    private _sentenceCalcType: string;
    private _sentenceType: string;
    private _consecToSentenceSeq: number;
    private _commentText: string;
    private _terminationReason: string;
    private _noOfUnexcusedAbsence: number;
    private _etdCalculatedDate: Date;
    private _mtdCalculatedDate: Date;
    private _ltdCalculatedDate: Date;
    private _ardCalculatedDate: Date;
    private _crdCalculatedDate: Date;
    private _pedCalculatedDate: Date;
    private _apdCalculatedDate: Date;
    private _npdCalculatedDate: Date;
    private _ledCalculatedDate: Date;
    private _sedCalculatedDate: Date;
    private _prrdCalculatedDate: Date;
    private _tariffCalculatedDate: Date;
    private _revokedDate: Date;
    private _dischareDate: Date;
    private _statusUpdateDate: Date;
    private _hdcedCalculatedDate: Date;
    private _terminationDate: Date;
    private _aggSentenceSeq: number;
    private _parentSentenceSeq: string;
    private _category: string;
    private _fineAmount: number;
    private _sentenceText: string;
    private _revokedStaffId: number;
    private _breachLevel: number;
    private _aggregateTerm: number;
    private _aggregateAdjustDays: number;
    private _sentenceLevel: string;
    private _extendedDay: number;
    private _counts: number;
    private _statusUpdateComment: string;
    private _statusUpdateStaffId: number;
    private _chargeSeq: number;
    private _supervisionExpiryDate: Date;
    private _line: number;
    private _nomsentdetailref: number;
    private _nomconstosentdetailref: number;
    private _nomconsfromsentdetailref: number;
    private _nomconswithsentdetailref: number;
    private _workflowId: number;
    private _status: string;
    private _consecutiveToLine: number;
    private _description: string;
    private _code: string;
    private _statusUpdateReason: string;
    private _createDateTime: Date;
    private _button: string;
    private _expiryDate: Date;
    private _dummySentenceId: number;
    private _offensesOnSentenceList: OffensesOutcome[] = [];
    private _commitFlag: string;
    private _sentenceTermList: SentenceTerms[] = [];
    private _periodsList: SentenceTerms[] = [];
    private _offensesOnOrdersList: OffensesOutcome[] = [];
    private _version: number;
    private _breachAmend: string;
    private _jurisCode: string;
    private _sentenceCalcTypeDesc: string;

    private _totalCompensation: number;
    private _totalFine: number;
    private _sentenceCategory: string;
    private _extendedFlag: string;
    private _extendingAuthority: string;
    private _sentenceExpiryDate: Date;
    private _sentenceStatus: string;
    private _lineSeq: number;
    private _registrationDate: Date;
    private _extendedDate: Date;
    private _installmentDetails: string;
    private _sentCalcType: string;
    private _sentencesChangedFlag: boolean = false;
    private _pAccess: string;
    private _calledFrom: string;
    private _openCalcReasonPopUp:boolean = false;
    private _lineTemp: number;
    private _sentenceCalculation:any;
    private _calcReasonCode: string;
    private _termsChangedFlag: boolean = false;
    private _convictedOffencesChangedFlag: boolean = false;
    private _orderType: string;
    private _workHours: number;
    private _sentenceCalcDesc: string;
    private _modifyDatetime: Date;

    get lineTemp(): number { return this._lineTemp; }
    set lineTemp(lineTemp: number) { this._lineTemp = lineTemp; }
    get calledFrom(): string { return this._calledFrom; }
    set calledFrom(pcalledFrom: string) { this._calledFrom = pcalledFrom; }
    get pAccess(): string { return this._pAccess; }
    set pAccess(ppAccess: string) { this._pAccess = ppAccess; }

    get sentCalcType(): string { return this._sentCalcType; }
    set sentCalcType(psentCalcType: string) { this._sentCalcType = psentCalcType; }
    get installmentDetails(): string { return this._installmentDetails; }
    set installmentDetails(pinstallmentDetails: string) { this._installmentDetails = pinstallmentDetails; }
    get extendedDate(): Date { return this._extendedDate; }
    set extendedDate(pextendedDate: Date) { this._extendedDate = pextendedDate; }
    get registrationDate(): Date { return this._registrationDate; }
    set registrationDate(pregistrationDate: Date) { this._registrationDate = pregistrationDate; }
    get lineSeq(): number { return this._lineSeq; }
    set lineSeq(plineSeq: number) { this._lineSeq = plineSeq; }
    get sentenceStatus(): string { return this._sentenceStatus; }
    set sentenceStatus(psentenceStatus: string) { this._sentenceStatus = psentenceStatus; }
    get sentenceExpiryDate(): Date { return this._sentenceExpiryDate; }
    set sentenceExpiryDate(psentenceExpiryDate: Date) { this._sentenceExpiryDate = psentenceExpiryDate; }
    get extendingAuthority(): string { return this._extendingAuthority; }
    set extendingAuthority(pextendingAuthority: string) { this._extendingAuthority = pextendingAuthority; }
    get extendedFlag(): string { return this._extendedFlag; }
    set extendedFlag(pextendedFlag: string) { this._extendedFlag = pextendedFlag; }
    get sentenceCategory(): string { return this._sentenceCategory; }
    set sentenceCategory(psentenceCategory: string) { this._sentenceCategory = psentenceCategory; }
    get totalFine(): number { return this._totalFine; }
    set totalFine(ptotalFine: number) { this._totalFine = ptotalFine; }
    get parentSentenceSeq(): string { return this._parentSentenceSeq; }
    set parentSentenceSeq(parentSentenceSeq: string) { this._parentSentenceSeq = parentSentenceSeq; }
    get totalCompensation(): number { return this._totalCompensation; }
    set totalCompensation(ptotalCompensation: number) { this._totalCompensation = ptotalCompensation; }

    get sentenceCalcTypeDesc(): string { return this._sentenceCalcTypeDesc; }

    set sentenceCalcTypeDesc(sentenceCalcTypeDesc: string) { this._sentenceCalcTypeDesc = sentenceCalcTypeDesc; }


    get jurisCode(): string { return this._jurisCode; }

    set jurisCode(jurisCode: string) { this._jurisCode = jurisCode; }

    get sentenceCalcDesc(): string { return this._sentenceCalcDesc; }
    set sentenceCalcDesc(psentenceCalcDesc: string) { this._sentenceCalcDesc = psentenceCalcDesc; }

    get version(): number { return this._version; }

    set version(version: number) { this._version = version; }

    get breachAmend(): string { return this._breachAmend; }

    set breachAmend(breachAmend: string) { this._breachAmend = breachAmend; }

    get caseId(): number { return this._caseId; }

    set caseId(caseId: number) { this._caseId = caseId; }

    get orderId(): string { return this._orderId; }

    set orderId(orderId: string) { this._orderId = orderId; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }

    get startDate(): Date { return this._startDate; }

    set startDate(startDate: Date) { this._startDate = startDate; }

    get endDate(): Date { return this._endDate; }

    set endDate(endDate: Date) { this._endDate = endDate; }

    get effectiveDate(): Date { return this._effectiveDate; }

    set effectiveDate(effectiveDate: Date) { this._effectiveDate = effectiveDate; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime(modifyDateTime: Date) { this._modifyDateTime = modifyDateTime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(createDatetime: Date) { this._createDatetime = createDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(createUserId: string) { this._createUserId = createUserId; }

    get startTime(): Date { return this._startTime; }

    set startTime(startTime: Date) { this._startTime = startTime; }

    get endTime(): Date { return this._endTime; }

    set endTime(endTime: Date) { this._endTime = endTime; }

    get seaFlag(): string { return this._sealFlag; }

    set sealFlag(sealFlag: string) { this._sealFlag = sealFlag; }

    get etdCalculatedDate(): Date { return this._etdCalculatedDate; }

    set etdCalculatedDate(etdCalculatedDate: Date) { this._etdCalculatedDate = etdCalculatedDate; }

    get mtdCalculatedDate(): Date { return this._mtdCalculatedDate; }

    set mtdCalculatedDate(mtdCalculatedDate: Date) { this._mtdCalculatedDate = mtdCalculatedDate; }

    get ltdCalculatedDate(): Date { return this._ltdCalculatedDate; }

    set ltdCalculatedDate(ltdCalculatedDate: Date) { this._ltdCalculatedDate = ltdCalculatedDate; }

    get ardCalculatedDate(): Date { return this._ardCalculatedDate; }

    set ardCalculatedDate(ardCalculatedDate: Date) { this._ardCalculatedDate = ardCalculatedDate; }

    get crdCalculatedDate(): Date { return this._crdCalculatedDate; }

    set crdCalculatedDate(crdCalculatedDate: Date) { this._crdCalculatedDate = crdCalculatedDate; }

    get pedCalculatedDate(): Date { return this._pedCalculatedDate; }

    set pedCalculatedDate(pedCalculatedDate: Date) { this._pedCalculatedDate = pedCalculatedDate; }

    get apdCalculatedDate(): Date { return this._apdCalculatedDate; }

    set apdCalculatedDate(apdCalculatedDate: Date) { this._apdCalculatedDate = apdCalculatedDate; }

    get calcReasonCode(): string { return this._calcReasonCode; }

    set calcReasonCode(calcReasonCode: string) { this._calcReasonCode = calcReasonCode; }

    get npdCalculatedDate(): Date { return this._npdCalculatedDate; }

    set npdCalculatedDate(npdCalculatedDate: Date) { this._npdCalculatedDate = npdCalculatedDate; }

    get sedCalculatedDate(): Date { return this._sedCalculatedDate; }

    set sedCalculatedDate(sedCalculatedDate: Date) { this._sedCalculatedDate = sedCalculatedDate; }

    get ledCalculatedDate(): Date { return this._ledCalculatedDate; }

    set ledCalculatedDate(ledCalculatedDate: Date) { this._ledCalculatedDate = ledCalculatedDate; }

    get prrdCalculatedDate(): Date { return this._prrdCalculatedDate; }

    set prrdCalculatedDate(prrdCalculatedDate: Date) { this._prrdCalculatedDate = prrdCalculatedDate; }

    get tariffCalculatedDate(): Date { return this._tariffCalculatedDate; }

    set tariffCalculatedDate(tariffCalculatedDate: Date) { this._tariffCalculatedDate = tariffCalculatedDate; }

    get revokedDate(): Date { return this._revokedDate; }

    set revokedDate(revokedDate: Date) { this._revokedDate = revokedDate; }

    get dischareDate(): Date { return this._dischareDate; }

    set dischareDate(dischareDate: Date) { this._dischareDate = dischareDate; }

    get statusUpdateDate(): Date { return this._statusUpdateDate; }

    set statusUpdateDate(statusUpdateDate: Date) { this.statusUpdateDate = statusUpdateDate; }

    get hdcedCalculatedDate(): Date { return this._hdcedCalculatedDate; }

    set hdcedCalculatedDate(hdcedCalculatedDate: Date) { this._hdcedCalculatedDate = hdcedCalculatedDate; }

    get aggSentenceSeq(): number { return this._aggSentenceSeq; }

    set aggSentenceSeq(aggSentenceSeq: number) { this._aggSentenceSeq = aggSentenceSeq; }

    get fineAmount(): number { return this._fineAmount; }

    set fineAmount(fineAmount: number) { this._fineAmount = fineAmount; }

    get revokedStaffId(): number { return this._revokedStaffId; }

    set revokedStaffId(revokedStaffId: number) { this._revokedStaffId = revokedStaffId; }

    get breachLevel(): number { return this._breachLevel; }

    set breachLevel(breachLevel: number) { this._breachLevel = breachLevel; }

    get aggregateTerm(): number { return this._aggregateTerm; }

    set aggregateTerm(aggregateTerm: number) { this._aggregateTerm = aggregateTerm; }

    get aggregateAdjustDays(): number { return this._aggregateAdjustDays; }

    set aggregateAdjustDays(aggregateAdjustDays: number) { this._aggregateAdjustDays = aggregateAdjustDays; }

    get category(): string { return this._category; }

    set category(category: string) { this._category = category; }

    get sentenceText(): string { return this._sentenceText; }

    set sentenceText(sentenceText: string) { this._sentenceText = sentenceText; }

    get sentenceLevel(): string { return this._sentenceLevel; }

    set sentenceLevel(sentenceLevel: string) { this._sentenceLevel = sentenceLevel; }

    get commentText(): string { return this._commentText; }

    set commentText(commentText: string) { this._commentText = commentText; }

    get extendedDay(): number { return this._extendedDay; }

    set extendedDay(extendedDay: number) { this._extendedDay = extendedDay; }

    get terminationDate(): Date { return this._terminationDate; }

    set terminationDate(terminationDate: Date) { this._terminationDate = terminationDate; }

    get counts(): number { return this._counts; }

    set counts(counts: number) { this._counts = counts; }

    get statusUpdateComment(): string { return this._statusUpdateComment; }

    set statusUpdateComment(statusUpdateComment: string) { this._statusUpdateComment = statusUpdateComment; }

    get orderType(): string { return this._orderType; }
    set orderType(porderType: string) { this._orderType = porderType; }

    get statusUpdateStaffId(): number { return this._statusUpdateStaffId; }

    set statusUpdateStaffId(statusUpdateStaffId: number) { this._statusUpdateStaffId = statusUpdateStaffId; }

    get chargeSeq(): number { return this._chargeSeq; }

    set chargeSeq(chargeSeq: number) { this._chargeSeq = chargeSeq; }

    get supervisionExpiryDate(): Date { return this._supervisionExpiryDate; }

    set supervisionExpiryDate(supervisionExpiryDate: Date) { this._supervisionExpiryDate = supervisionExpiryDate; }

    get line(): number { return this._line; }

    set line(line: number) { this._line = line; }

    get nomsentdetailref(): number { return this._nomsentdetailref; }

    set nomsentdetailref(nomsentdetailref: number) { this._nomsentdetailref = nomsentdetailref; }

    get nomconstosentdetailref(): number { return this._nomconstosentdetailref; }

    set nomconstosentdetailref(nomconstosentdetailref: number) { this._nomconstosentdetailref = nomconstosentdetailref; }

    get nomconsfromsentdetailref(): number { return this._nomconsfromsentdetailref; }

    set nomconsfromsentdetailref(nomconsfromsentdetailref: number) { this._nomconsfromsentdetailref = nomconsfromsentdetailref; }

    get nomconswithsentdetailref(): number { return this._nomconswithsentdetailref; }

    set nomconswithsentdetailref(nomconswithsentdetailref: number) { this._nomconswithsentdetailref = nomconswithsentdetailref; }

    get workflowId(): number { return this._workflowId; }

    set workflowId(workflowId: number) { this._workflowId = workflowId; }

    get sentenceCalcType(): string { return this._sentenceCalcType; }

    set sentenceCalcType(sentenceCalcType: string) { this._sentenceCalcType = sentenceCalcType; }

    get sentenceType(): string { return this._sentenceType; }

    set sentenceType(sentenceType: string) { this._sentenceType = sentenceType; }

    get status(): string { return this._status; }

    set status(status: string) { this._status = status; }

    get consecutiveToLine(): number { return this._consecutiveToLine; }

    set consecutiveToLine(consecutiveToLine: number) { this._consecutiveToLine = consecutiveToLine; }

    get description(): string { return this._description; }

    set description(description: string) { this._description = description; }

    get code(): string { return this._code; }

    set code(code: string) { this._code = code; }

    get statusUpdateReason(): string { return this._statusUpdateReason; }

    set statusUpdateReason(statusUpdateReason: string) { this._statusUpdateReason = statusUpdateReason; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime(createDateTime: Date) { this._createDatetime = createDateTime; }

    get button(): string { return this._button; }

    set button(pbutton: string) { this._button = pbutton; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(expiryDate: Date) { this._expiryDate = expiryDate; }

    get sentenceSeq(): number { return this._sentenceSeq; }

    set sentenceSeq(sentenceSeq: number) { this._sentenceSeq = sentenceSeq; }

    get workHours(): number { return this._workHours; }
    set workHours(pworkHours: number) { this._workHours = pworkHours; }

    get offensesOnSentenceList(): OffensesOutcome[] { return this._offensesOnSentenceList; }

    set offensesOnSentenceList(offensesOnSentenceList: OffensesOutcome[]) { this._offensesOnSentenceList = offensesOnSentenceList; }

    get dummySentenceId(): number { return this._dummySentenceId; }

    set dummySentenceId(dummySentenceId: number) { this._dummySentenceId = dummySentenceId; }

    get commitFlag(): string { return this._commitFlag; }

    set commitFlag(commitFlag: string) { this._commitFlag = commitFlag; }

    get sentencesChangedFlag(): boolean { return this._sentencesChangedFlag; }

    set sentencesChangedFlag(sentencesChangedFlag: boolean) { this._sentencesChangedFlag = sentencesChangedFlag; }

    get sentenceTermList(): SentenceTerms[] { return this._sentenceTermList; }

    set sentenceTermList(sentenceTermList: SentenceTerms[]) { this._sentenceTermList = sentenceTermList; }

    get periodsList(): SentenceTerms[] { return this._periodsList; }

    set periodsList(periodsList: SentenceTerms[]) { this._periodsList = periodsList; }

    get offensesOnOrdersList(): OffensesOutcome[] { return this._offensesOnOrdersList; }

    set offensesOnOrdersList(offensesOnOrdersList: OffensesOutcome[]) { this._offensesOnOrdersList = offensesOnOrdersList; }
    
    get openCalcReasonPopUp() : boolean {return this._openCalcReasonPopUp}
    
    set openCalcReasonPopUp( isOpen : boolean) {this._openCalcReasonPopUp = isOpen;}
    
    get sentenceCalculation(): any { return this._sentenceCalculation; }

    set sentenceCalculation(sentenceCalculation: any) { this._sentenceCalculation = sentenceCalculation; }

    get termsChangedFlag(): boolean { return this._termsChangedFlag; }

    set termsChangedFlag(termsChangedFlag: boolean) { this._termsChangedFlag = termsChangedFlag; }
    
    get convictedOffencesChangedFlag(): boolean { return this._convictedOffencesChangedFlag; }

    set convictedOffencesChangedFlag(convictedOffencesChangedFlag: boolean) { this._convictedOffencesChangedFlag = convictedOffencesChangedFlag; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(modifyDatetime: Date) { this._modifyDatetime = modifyDatetime; }


    toJSON(): any {
        return {
            'offenderBookId': this._offenderBookId,
            'caseId': this._caseId,
            'startTime': this._startTime,
            ' endTime': this._endTime,
            'createUserId': this._createUserId,
            'createDatetime': this._createDatetime,
            'modifyDateTime': this._modifyDateTime,
            ' modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'sentenceSeq': this._sentenceSeq,
            'orderId': this._orderId,
            'startDate': this._startDate,
            'endDate': this._endDate,
            'effectiveDate': this._effectiveDate,
            'sentenceCalcType': this._sentenceCalcType,
            'sentenceType': this._sentenceType,
            'consecToSentenceSeq': this._consecToSentenceSeq,
            'commentText': this._commentText,
            'terminationReason': this._terminationReason,
            'noOfUnexcusedAbsence': this._noOfUnexcusedAbsence,
            'etdCalculatedDate': this._etdCalculatedDate,
            'mtdCalculatedDate': this._mtdCalculatedDate,
            'ltdCalculatedDate': this._ltdCalculatedDate,
            'ardCalculatedDate': this._ardCalculatedDate,
            'crdCalculatedDate': this._crdCalculatedDate,
            'pedCalculatedDate': this._pedCalculatedDate,
            'apdCalculatedDate': this._apdCalculatedDate,
            'npdCalculatedDate': this._npdCalculatedDate,
            'ledCalculatedDate': this._ledCalculatedDate,
            'sedCalculatedDate': this._sedCalculatedDate,
            'prrdCalculatedDate': this._prrdCalculatedDate,
            'tariffCalculatedDate': this._tariffCalculatedDate,
            'revokedDate': this._revokedDate,
            'dischareDate': this._dischareDate,
            'statusUpdateDate': this._statusUpdateDate,
            'hdcedCalculatedDate': this._hdcedCalculatedDate,
            'terminationDate': this._terminationDate,
            'workHours': this._workHours,
            'aggSentenceSeq': this._aggSentenceSeq,
            'calcReasonCode': this._calcReasonCode,
            'category': this._category,
            'fineAmount': this._fineAmount,
            'sentenceText': this._sentenceText,
            'revokedStaffId': this._revokedStaffId,
            'breachLevel': this._breachLevel,
            'aggregateTerm': this._aggregateTerm,
            'aggregateAdjustDays': this._aggregateAdjustDays,
            'sentenceLevel': this._sentenceLevel,
            'extendedDay': this._extendedDay,
            'counts': this._counts,
            'statusUpdateComment': this._statusUpdateComment,
            'statusUpdateStaffId': this._statusUpdateStaffId,
            'chargeSeq': this._chargeSeq,
            'orderType': this._orderType,
            'sentenceCalcDesc': this._sentenceCalcDesc,
            'supervisionExpiryDate': this._supervisionExpiryDate,
            'line': this._line,
            'nomsentdetailref': this._nomsentdetailref,
            'nomconstosentdetailref': this._nomconstosentdetailref,
            'nomconsfromsentdetailref': this._nomconsfromsentdetailref,
            'nomconswithsentdetailref': this._nomconswithsentdetailref,
            'workflowId': this._workflowId,
            'status': this._status,
            'consecutiveToLine': this._consecutiveToLine,
            'description': this._description,
            'code': this._code,
            'statusUpdateReason': this._statusUpdateReason,
            'createDateTime': this._createDateTime,
            'button': this._button,
            'expiryDate': this.expiryDate,
            'offensesOnSentenceList': this._offensesOnSentenceList,
            'dummySentenceId': this._dummySentenceId,
            'commitFlag': this._commitFlag,
            'sentenceTermList': this._sentenceTermList,
            'sentencesChangedFlag': this._sentencesChangedFlag,
            'version': this._version,
            'breachAmend': this._breachAmend,
            'jurisCode': this._jurisCode,
            'sentenceCalcTypeDesc': this._sentenceCalcTypeDesc,
            'totalCompensation': this._totalCompensation,
            'totalFine': this._totalFine,
            'sentenceCategory': this._sentenceCategory,
            'extendedFlag': this._extendedFlag,
            'extendingAuthority': this._extendingAuthority,
            'sentenceExpiryDate': this._sentenceExpiryDate,
            'sentenceStatus': this._sentenceStatus,
            'lineSeq': this._lineSeq,
            'registrationDate': this._registrationDate,
            'extendedDate': this._extendedDate,
            'installmentDetails': this._installmentDetails,
            'pAccess': this._pAccess,
            'calledFrom': this._calledFrom,
            'periodsList': this._periodsList,
            'termsChangedFlag': this._termsChangedFlag,
            'offensesOnOrdersList': this._offensesOnOrdersList,
            'sentenceCalculation': this._sentenceCalculation,
            'convictedOffencesChangedFlag': this._convictedOffencesChangedFlag,
            'modifyDatetime': this._modifyDatetime
        };

    }
}
