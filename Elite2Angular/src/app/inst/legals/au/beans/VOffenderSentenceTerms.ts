import { BaseModel } from "@common/beans/BaseModel";

export class VOffenderSentenceTerms extends BaseModel {
    private _sentenceExpiryDate: Date;
    private _createUserId: string;
    private _code: string;
    private _aggregateFlag: string;
    private _offenderBookId: number;
    private _endDate: Date;
    private _modifyUserId: string;
    private _description: string;
    private _convictionDate: Date;
    private _paroleSupervision: string;
    private _nbtParoleSupervision: number;
    private _termPeriod: string;
    private _calcFlag: string;
    private _serialVersionUID: number;
    private _dspTermPeriod: string;
    private _sentenceTermCode: string;
    private _chargeSeq: number;
    private _sentenceStartDate: Date;
    private _ovrStartDate: Date;
    private _sentenceCategory: string;
    private _sentenceCalcType: string;
    private _probableReleaseDate: Date;
    private _nbtParoleSup: string;
    private _nbtSentenceTermCode: string;
    private _version: number;
    private _vSentCalcNeededFlag: string;
    private _sentenceSeq: number;
    private _createDateTime: Date;
    private _ovrEndDate: Date;
    private _sentenceStatus: string;
    private _modifyDateTime: Date;
    private _termSeq: number;
    private _jurisdictionCode: string;
    private _endTime: Date;
    private _startTime: Date;
    private _nbtSentenceTermCode3: string;
    private _nbtSentenceTermCode2: string;
    private _startDate: Date;
    private _nbtParoleSuperv: boolean;

    get nbtParoleSuperv(): boolean { return this._nbtParoleSuperv; }
    set nbtParoleSuperv(nbtParoleSuperv: boolean) { this._nbtParoleSuperv = nbtParoleSuperv; }
    get sentenceExpiryDate(): Date { return this._sentenceExpiryDate; }
    set sentenceExpiryDate(psentenceExpiryDate: Date) { this._sentenceExpiryDate = psentenceExpiryDate; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get code(): string { return this._code; }
    set code(pcode: string) { this._code = pcode; }
    get aggregateFlag(): string { return this._aggregateFlag; }
    set aggregateFlag(paggregateFlag: string) { this._aggregateFlag = paggregateFlag; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get endDate(): Date { return this._endDate; }
    set endDate(pendDate: Date) { this._endDate = pendDate; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get convictionDate(): Date { return this._convictionDate; }
    set convictionDate(pconvictionDate: Date) { this._convictionDate = pconvictionDate; }
    get paroleSupervision(): string { return this._paroleSupervision; }
    set paroleSupervision(pparoleSupervision: string) { this._paroleSupervision = pparoleSupervision; }
    get nbtParoleSupervision(): number { return this._nbtParoleSupervision; }
    set nbtParoleSupervision(pnbtParoleSupervision: number) { this._nbtParoleSupervision = pnbtParoleSupervision; }
    get termPeriod(): string { return this._termPeriod; }
    set termPeriod(ptermPeriod: string) { this._termPeriod = ptermPeriod; }
    get calcFlag(): string { return this._calcFlag; }
    set calcFlag(pcalcFlag: string) { this._calcFlag = pcalcFlag; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get dspTermPeriod(): string { return this._dspTermPeriod; }
    set dspTermPeriod(pdspTermPeriod: string) { this._dspTermPeriod = pdspTermPeriod; }
    get sentenceTermCode(): string { return this._sentenceTermCode; }
    set sentenceTermCode(psentenceTermCode: string) { this._sentenceTermCode = psentenceTermCode; }
    get chargeSeq(): number { return this._chargeSeq; }
    set chargeSeq(pchargeSeq: number) { this._chargeSeq = pchargeSeq; }
    get sentenceStartDate(): Date { return this._sentenceStartDate; }
    set sentenceStartDate(psentenceStartDate: Date) { this._sentenceStartDate = psentenceStartDate; }
    get ovrStartDate(): Date { return this._ovrStartDate; }
    set ovrStartDate(povrStartDate: Date) { this._ovrStartDate = povrStartDate; }
    get sentenceCategory(): string { return this._sentenceCategory; }
    set sentenceCategory(psentenceCategory: string) { this._sentenceCategory = psentenceCategory; }
    get sentenceCalcType(): string { return this._sentenceCalcType; }
    set sentenceCalcType(psentenceCalcType: string) { this._sentenceCalcType = psentenceCalcType; }
    get probableReleaseDate(): Date { return this._probableReleaseDate; }
    set probableReleaseDate(pprobableReleaseDate: Date) { this._probableReleaseDate = pprobableReleaseDate; }
    get nbtParoleSup(): string { return this._nbtParoleSup; }
    set nbtParoleSup(pnbtParoleSup: string) { this._nbtParoleSup = pnbtParoleSup; }
    get nbtSentenceTermCode(): string { return this._nbtSentenceTermCode; }
    set nbtSentenceTermCode(pnbtSentenceTermCode: string) { this._nbtSentenceTermCode = pnbtSentenceTermCode; }
    get version(): number { return this._version; }
    set version(pversion: number) { this._version = pversion; }
    get vSentCalcNeededFlag(): string { return this._vSentCalcNeededFlag; }
    set vSentCalcNeededFlag(pvSentCalcNeededFlag: string) { this._vSentCalcNeededFlag = pvSentCalcNeededFlag; }
    get sentenceSeq(): number { return this._sentenceSeq; }
    set sentenceSeq(psentenceSeq: number) { this._sentenceSeq = psentenceSeq; }
    get createDateTime(): Date { return this._createDateTime; }
    set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }
    get ovrEndDate(): Date { return this._ovrEndDate; }
    set ovrEndDate(povrEndDate: Date) { this._ovrEndDate = povrEndDate; }
    get sentenceStatus(): string { return this._sentenceStatus; }
    set sentenceStatus(psentenceStatus: string) { this._sentenceStatus = psentenceStatus; }
    get modifyDateTime(): Date { return this._modifyDateTime; }
    set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }
    get termSeq(): number { return this._termSeq; }
    set termSeq(ptermSeq: number) { this._termSeq = ptermSeq; }
    get jurisdictionCode(): string { return this._jurisdictionCode; }
    set jurisdictionCode(pjurisdictionCode: string) { this._jurisdictionCode = pjurisdictionCode; }
    get endTime(): Date { return this._endTime; }
    set endTime(pendTime: Date) { this._endTime = pendTime; }
    get startTime(): Date { return this._startTime; }
    set startTime(pstartTime: Date) { this._startTime = pstartTime; }
    get nbtSentenceTermCode3(): string { return this._nbtSentenceTermCode3; }
    set nbtSentenceTermCode3(pnbtSentenceTermCode3: string) { this._nbtSentenceTermCode3 = pnbtSentenceTermCode3; }
    get nbtSentenceTermCode2(): string { return this._nbtSentenceTermCode2; }
    set nbtSentenceTermCode2(pnbtSentenceTermCode2: string) { this._nbtSentenceTermCode2 = pnbtSentenceTermCode2; }
    get startDate(): Date { return this._startDate; }
    set startDate(pstartDate: Date) { this._startDate = pstartDate; }

    toJSON(): any {
        return {
            'sentenceExpiryDate': this._sentenceExpiryDate,
            'createUserId': this._createUserId,
            'code': this._code,
            'aggregateFlag': this._aggregateFlag,
            'offenderBookId': this._offenderBookId,
            'endDate': this._endDate,
            'modifyUserId': this._modifyUserId,
            'description': this._description,
            'convictionDate': this._convictionDate,
            'paroleSupervision': this._paroleSupervision,
            'nbtParoleSupervision': this._nbtParoleSupervision,
            'termPeriod': this._termPeriod,
            'calcFlag': this._calcFlag,
            'serialVersionUID': this._serialVersionUID,
            'dspTermPeriod': this._dspTermPeriod,
            'sentenceTermCode': this._sentenceTermCode,
            'chargeSeq': this._chargeSeq,
            'sentenceStartDate': this._sentenceStartDate,
            'ovrStartDate': this._ovrStartDate,
            'sentenceCategory': this._sentenceCategory,
            'sentenceCalcType': this._sentenceCalcType,
            'probableReleaseDate': this._probableReleaseDate,
            'nbtParoleSup': this._nbtParoleSup,
            'nbtSentenceTermCode': this._nbtSentenceTermCode,
            'version': this._version,
            'vSentCalcNeededFlag': this._vSentCalcNeededFlag,
            'sentenceSeq': this._sentenceSeq,
            'createDateTime': this._createDateTime,
            'ovrEndDate': this._ovrEndDate,
            'sentenceStatus': this._sentenceStatus,
            'modifyDateTime': this._modifyDateTime,
            'termSeq': this._termSeq,
            'jurisdictionCode': this._jurisdictionCode,
            'endTime': this._endTime,
            'startTime': this._startTime,
            'nbtSentenceTermCode3': this._nbtSentenceTermCode3,
            'nbtSentenceTermCode2': this._nbtSentenceTermCode2,
            'startDate': this._startDate,
            'nbtParoleSuperv': this._nbtParoleSuperv,
        };
    }
}
