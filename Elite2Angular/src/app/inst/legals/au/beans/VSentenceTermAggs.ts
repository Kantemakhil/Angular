import { BaseModel } from "@common/beans/BaseModel";

export class VSentenceTermAggs extends BaseModel {

    private _sentenceSeq: number;
    private _ver: number;
    private _sentenceCategory: string;
    private _sentenceCalcType: string;
    private _sentenceTermCode: string;
    private _dspTermPeriod: string;
    private _dspOverrideFlag: string;
    private _startDate: Date;
    private _dspStartDate: Date;
    private _startTime: Date;
    private _dspOverrideFlag1: string;
    private _endDate: Date;
    private _dspEndDate: Date;
    private _endTime: Date;
    private _offenderBookId: number;
    private _ovrStartDate: Date;
    private _ovrStartTime: Date;
    private _ovrEndDate: Date;
    private _ovrEndTime: Date;
    private _termPeriod: string;
    private _aggsDisplayOrder: number;
    private _paroleSupervision: string;
    private _nbtParoleSupervision: string;
    private _createUserId: string;
    private _createDateTime: Date;
    private _modifyDateTime: Date;
    private _modifyUserId: string;
    private _description: string;
    private _code: string;
    private _nbtParoleSuper: boolean;
    private _termSeq: number;
    private _startDateDisplay: string;
    private _endDateDisplay: string;

    get startDateDisplay(): string { return this._startDateDisplay; }
    set startDateDisplay(startDateDisplay: string) { this._startDateDisplay = startDateDisplay; }

    get endDateDisplay(): string { return this._endDateDisplay; }
    set endDateDisplay(endDateDisplay: string) { this._endDateDisplay = endDateDisplay; }

    get termSeq(): number { return this._termSeq; }
    set termSeq(termSeq: number) { this._termSeq = termSeq; }

    get nbtParoleSuper(): boolean { return this._nbtParoleSuper; }
    set nbtParoleSuper(nbtParoleSuper: boolean) { this._nbtParoleSuper = nbtParoleSuper; }


    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }

    get ovrStartDate(): Date { return this._ovrStartDate; }
    set ovrStartDate(ovrStartDate: Date) { this._ovrStartDate = ovrStartDate; }

    get ovrEndDate(): Date { return this._ovrEndDate; }
    set ovrEndDate(ovrEndDate: Date) { this._ovrEndDate = ovrEndDate; }

    get ovrStartTime(): Date { return this._ovrStartTime; }
    set ovrStartTime(ovrStartTime: Date) { this._ovrStartTime = ovrStartTime; }

    get ovrEndTime(): Date { return this._ovrEndTime; }
    set ovrEndTime(ovrEndTime: Date) { this._ovrEndTime = ovrEndTime; }

    get termPeriod(): string { return this._termPeriod; }
    set termPeriod(termPeriod: string) { this._termPeriod = termPeriod; }

    get aggsDisplayOrder(): number { return this._aggsDisplayOrder; }
    set aggsDisplayOrder(aggsDisplayOrder: number) { this._aggsDisplayOrder = aggsDisplayOrder; }

    get paroleSupervision(): string { return this._paroleSupervision; }
    set paroleSupervision(paroleSupervision: string) { this._paroleSupervision = paroleSupervision; }

    get nbtParoleSupervision(): string { return this._nbtParoleSupervision; }
    set nbtParoleSupervision(nbtParoleSupervision: string) { this._nbtParoleSupervision = nbtParoleSupervision; }

    get endTime(): Date { return this._endTime; }
    set endTime(endTime: Date) { this._endTime = endTime; }

    get startDate(): Date { return this._startDate; }
    set startDate(startDate: Date) { this._startDate = startDate; }

    get dspStartDate(): Date { return this._dspStartDate; }
    set dspStartDate(dspStartDate: Date) { this._dspStartDate = dspStartDate; }

    get startTime(): Date { return this._startTime; }
    set startTime(startTime: Date) { this._startTime = startTime; }

    get dspOverrideFlag1(): string { return this._dspOverrideFlag1; }
    set dspOverrideFlag1(dspOverrideFlag1: string) { this._dspOverrideFlag1 = dspOverrideFlag1; }

    get endDate(): Date { return this._endDate; }
    set endDate(endDate: Date) { this._endDate = endDate; }

    get dspEndDate(): Date { return this._dspEndDate; }
    set dspEndDate(dspEndDate: Date) { this._dspEndDate = dspEndDate; }

    get sentenceSeq(): number { return this._sentenceSeq; }
    set sentenceSeq(sentenceSeq: number) { this._sentenceSeq = sentenceSeq; }

    get ver(): number { return this._ver; }
    set ver(ver: number) { this._ver = ver; }

    get dspOverrideFlag(): string { return this._dspOverrideFlag; }
    set dspOverrideFlag(dspOverrideFlag: string) { this._dspOverrideFlag = dspOverrideFlag; }

    get sentenceCategory(): string { return this._sentenceCategory; }
    set sentenceCategory(sentenceCategory: string) { this._sentenceCategory = sentenceCategory; }

    get sentenceCalcType(): string { return this._sentenceCalcType; }
    set sentenceCalcType(sentenceCalcType: string) { this._sentenceCalcType = sentenceCalcType; }

    get sentenceTermCode(): string { return this._sentenceTermCode; }
    set sentenceTermCode(sentenceTermCode: string) { this._sentenceTermCode = sentenceTermCode; }

    get dspTermPeriod(): string { return this._dspTermPeriod; }
    set dspTermPeriod(dspTermPeriod: string) { this._dspTermPeriod = dspTermPeriod; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(createUserId: string) { this._createUserId = createUserId; }

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

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'createDateTime': this._createDateTime,
            'modifyDateTime': this._modifyDateTime,
            'modifyUserId': this._modifyUserId,
            'description': this._description,
            'code': this._code,
            'sentenceSeq': this._sentenceSeq,
            'ver': this._ver,
            'sentenceCategory': this._sentenceCategory,
            'sentenceCalcType': this._sentenceCalcType,
            'sentenceTermCode': this._sentenceTermCode,
            'dspTermPeriod': this._dspTermPeriod,
            'dspOverrideFlag': this._dspOverrideFlag,
            'startDate': this._startDate,
            'dspStartDate': this._dspStartDate,
            'startTime': this._startTime,
            'dspOverrideFlag1': this._dspOverrideFlag1,
            'endDate': this._endDate,
            'endTime': this._endTime,
            'dspEndDate': this._dspEndDate,
            'offenderBookId': this._offenderBookId,
            'ovrStartDate': this._ovrStartDate,
            'ovrStartTime': this._ovrStartTime,
            'ovrEndDate': this._ovrEndDate,
            'ovrEndTime': this._ovrEndTime,
            'termPeriod': this._termPeriod,
            'aggsDisplayOrder': this._aggsDisplayOrder,
            'paroleSupervision': this._paroleSupervision,
            'nbtParoleSupervision': this._nbtParoleSupervision,
            'nbtParoleSuper': this._nbtParoleSuper,
            'termSeq': this._termSeq,
            'startDateDisplay': this._startDateDisplay,
            'endDateDisplay': this._endDateDisplay,
        };
    }
}
