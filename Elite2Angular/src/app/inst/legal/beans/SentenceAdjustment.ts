import { BaseModel } from '@commonbeans/BaseModel';
export class SentenceAdjustment extends BaseModel {
    private _caseNumber: string;
    private _sentenceSeq: number;
    private _offenseCode: string;
    private _sentenceCalcType: string;
    private _sentenceStatus: string;
    private _offenderBookId: number;
    private _sentenceAdjustCode: string;
    private _debitCreditCode: string;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _description: string;
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _usageCode: string;
    private _sealFlag: string;
    private _activeFlag: string;
    private _years: number;
    private _months: number;
    private _days: number;
    private _weeks: number;
    private _button: string;
    private _commentText: string;
    public get commentText(): string {
        return this._commentText;
    }
    public set commentText(value: string) {
        this._commentText = value;
    }
    public get button(): string {
        return this._button;
    }
    public set button(value: string) {
        this._button = value;
    }
    public get years(): number {
        return this._years;
    }
    public set years(value: number) {
        this._years = value;
    }
   
    public get months(): number {
        return this._months;
    }
    public set months(value: number) {
        this._months = value;
    }
  
    public get weeks(): number {
        return this._weeks;
    }
    public set weeks(value: number) {
        this._weeks = value;
    }
   
    public get days(): number {
        return this._days;
    }
    public set days(value: number) {
        this._days = value;
    }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get sentenceCalcType(): string { return this._sentenceCalcType; }

    set sentenceCalcType(psentenceCalcType: string) { this._sentenceCalcType = psentenceCalcType; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get sentenceAdjustCode(): string { return this._sentenceAdjustCode; }

    set sentenceAdjustCode(psentenceAdjustCode: string) { this._sentenceAdjustCode = psentenceAdjustCode; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get sentenceSeq(): number { return this._sentenceSeq; }

    set sentenceSeq(psentenceSeq: number) { this._sentenceSeq = psentenceSeq; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get debitCreditCode(): string { return this._debitCreditCode; }

    set debitCreditCode(pdebitCreditCode: string) { this._debitCreditCode = pdebitCreditCode; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get usageCode(): string { return this._usageCode; }

    set usageCode(pusageCode: string) { this._usageCode = pusageCode; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get caseNumber(): string { return this._caseNumber; }

    set caseNumber(caseNumber: string) { this._caseNumber = caseNumber; }

    get offenseCode(): string { return this._offenseCode; }

    set offenseCode(offenseCode: string) { this._offenseCode = offenseCode; }

    get sentenceStatus(): string { return this._sentenceStatus; }

    set sentenceStatus(sentenceStatus: string) { this._sentenceStatus = sentenceStatus; }

    toJSON(): any {
        return {
            'offenderBookId': this._offenderBookId,
            'caseNumber': this._caseNumber,
            'sentenceSeq': this._sentenceSeq,
            'offenseCode': this._offenseCode,
            'sentenceCalcType': this._sentenceCalcType,
            'sentenceStatus': this._sentenceStatus,
            'sentenceAdjustCode': this._sentenceAdjustCode,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'description': this._description,
            'expiryDate': this._expiryDate,
            'createDatetime': this._createDatetime,
            'debitCreditCode': this._debitCreditCode,
            'serialVersionUID': this._serialVersionUID,
            'usageCode': this._usageCode,
            'sealFlag': this._sealFlag,
            'activeFlag': this._activeFlag,
            'year':this._years,
            'months':this._months,
            'weeks':this._weeks,
            'days':this._days,
            'button':this._button,
            'commentText':this._commentText
        };
    }
}
