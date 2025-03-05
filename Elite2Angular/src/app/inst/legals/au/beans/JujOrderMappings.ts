import { BaseModel } from "@common/beans/BaseModel";

export class JujOrderMappings extends BaseModel {
    private _sentenceCategory: string;
    private _orderType: string;
    private _courtEventSubType: string;
    private _createUserId: string;
    private _sentenceCalcType: string;
    private _escortType: string;
    private _modifyDatetime: Date;
    private _ignoreFlag: string;
    private _resultCode: string;
    private _modifyUserId: string;
    private _breachStatus: string;
    private _bailStatus: string;
    private _requestOnlyFlag: string;
    private _createDatetime: Date;
    private _sentenceStatus: string;
    private _csnswInstCommInd: string;
    private _knownOffenderOnly: string;
    private _breachDisposition: string;
    private _ourtEventType: string;
    private _orderCategory: string;
    private _supervisionFlagOnly: string;

    get sentenceCategory(): string { return this._sentenceCategory; }
    set sentenceCategory(psentenceCategory: string) { this._sentenceCategory = psentenceCategory; }
    get orderType(): string { return this._orderType; }
    set orderType(porderType: string) { this._orderType = porderType; }
    get courtEventSubType(): string { return this._courtEventSubType; }
    set courtEventSubType(pcourtEventSubType: string) { this._courtEventSubType = pcourtEventSubType; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get sentenceCalcType(): string { return this._sentenceCalcType; }
    set sentenceCalcType(psentenceCalcType: string) { this._sentenceCalcType = psentenceCalcType; }
    get escortType(): string { return this._escortType; }
    set escortType(pescortType: string) { this._escortType = pescortType; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get ignoreFlag(): string { return this._ignoreFlag; }
    set ignoreFlag(pignoreFlag: string) { this._ignoreFlag = pignoreFlag; }
    get resultCode(): string { return this._resultCode; }
    set resultCode(presultCode: string) { this._resultCode = presultCode; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get breachStatus(): string { return this._breachStatus; }
    set breachStatus(pbreachStatus: string) { this._breachStatus = pbreachStatus; }
    get bailStatus(): string { return this._bailStatus; }
    set bailStatus(pbailStatus: string) { this._bailStatus = pbailStatus; }
    get requestOnlyFlag(): string { return this._requestOnlyFlag; }
    set requestOnlyFlag(prequestOnlyFlag: string) { this._requestOnlyFlag = prequestOnlyFlag; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get sentenceStatus(): string { return this._sentenceStatus; }
    set sentenceStatus(psentenceStatus: string) { this._sentenceStatus = psentenceStatus; }
    get csnswInstCommInd(): string { return this._csnswInstCommInd; }
    set csnswInstCommInd(pcsnswInstCommInd: string) { this._csnswInstCommInd = pcsnswInstCommInd; }
    get knownOffenderOnly(): string { return this._knownOffenderOnly; }
    set knownOffenderOnly(pknownOffenderOnly: string) { this._knownOffenderOnly = pknownOffenderOnly; }
    get breachDisposition(): string { return this._breachDisposition; }
    set breachDisposition(pbreachDisposition: string) { this._breachDisposition = pbreachDisposition; }
    get ourtEventType(): string { return this._ourtEventType; }
    set ourtEventType(pourtEventType: string) { this._ourtEventType = pourtEventType; }
    get orderCategory(): string { return this._orderCategory; }
    set orderCategory(porderCategory: string) { this._orderCategory = porderCategory; }
    get supervisionFlagOnly(): string { return this._supervisionFlagOnly; }
    set supervisionFlagOnly(psupervisionFlagOnly: string) { this._supervisionFlagOnly = psupervisionFlagOnly; }

    toJSON(): any {
        return {
            'sentenceCategory': this._sentenceCategory,
            'orderType': this._orderType,
            'courtEventSubType': this._courtEventSubType,
            'createUserId': this._createUserId,
            'sentenceCalcType': this._sentenceCalcType,
            'escortType': this._escortType,
            'modifyDatetime': this._modifyDatetime,
            'ignoreFlag': this._ignoreFlag,
            'resultCode': this._resultCode,
            'modifyUserId': this._modifyUserId,
            'breachStatus': this._breachStatus,
            'bailStatus': this._bailStatus,
            'requestOnlyFlag': this._requestOnlyFlag,
            'createDatetime': this._createDatetime,
            'sentenceStatus': this._sentenceStatus,
            'csnswInstCommInd': this._csnswInstCommInd,
            'knownOffenderOnly': this._knownOffenderOnly,
            'breachDisposition': this._breachDisposition,
            'ourtEventType': this._ourtEventType,
            'orderCategory': this._orderCategory,
            'supervisionFlagOnly': this._supervisionFlagOnly,
        };
    }
}