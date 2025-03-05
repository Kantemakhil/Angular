export class SentenceTerms{

    private _activeFlag: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _expiryDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _sentenceCategory: string;
    private _sentenceCalcType: string;
    private _termCode: string;

    private _minValueType: string;
    private _maxValueType: string;
    private _headSentFlag: string;
    private _maxValue: number;
    private _minValue: number;

	
    get minValueType(): string { return this._minValueType; }
    set minValueType(pminValueType: string) { this._minValueType = pminValueType; }
    get maxValueType(): string { return this._maxValueType; }
    set maxValueType(pmaxValueType: string) { this._maxValueType = pmaxValueType; }
    get headSentFlag(): string { return this._headSentFlag; }
    set headSentFlag(pheadSentFlag: string) { this._headSentFlag = pheadSentFlag; }

    get minValue(): number { return this._minValue; }
    set minValue(pminValue: number) { this._minValue = pminValue; }

    get maxValue(): number { return this._maxValue; }
    set maxValue(pmaxValue: number) { this._maxValue = pmaxValue; }

    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) {
    this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) {
    this._expiryDate = pexpiryDate; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) {
    this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }


    get sentenceCategory(): string { return this._sentenceCategory; }
    set sentenceCategory(psentenceCategory: string) { this._sentenceCategory = psentenceCategory; }

    get sentenceCalcType(): string { return this._sentenceCalcType; }
    set sentenceCalcType(psentenceCalcType: string) { this._sentenceCalcType = psentenceCalcType; }


    get termCode(): string { return this._termCode; }
    set termCode(ptermCode: string) { this._termCode = ptermCode; }

    toJSON(): any {
        return {
            'activeFlag': this._activeFlag,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'expiryDate': this._expiryDate,
            'termCode': this._termCode,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'sentenceCategory': this._sentenceCategory,
            'sentenceCalcType': this._sentenceCalcType,
            'minValue': this._minValue,
            'minValueType': this._minValueType,
            'maxValue': this._maxValue,
            'maxValueType': this._maxValueType,
            'headSentFlag': this._headSentFlag,

        };
    }
}
