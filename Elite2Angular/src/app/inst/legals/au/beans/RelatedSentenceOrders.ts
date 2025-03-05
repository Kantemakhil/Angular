

export class RelatedSentenceOrders {
    private _activeFlag: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _description: string;
    private _expiryDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sentenceCategory: string;
    private _sentenceCalcType: string;
    private _rSentenceCategory: string;
    private _rSentenceCalcType: string;
    private _returnValue:number;
    private _rowId: string;

    get rowId(): string { return this._rowId; }
	set rowId(prowId: string) { this._rowId = prowId; }
    get returnValue(): number{ return this._returnValue; }
    set returnValue(preturnValue: number){ this._returnValue = preturnValue;}

    get rSentenceCategory(): string { return this._rSentenceCategory; }
    set rSentenceCategory(prSentenceCategory: string) { this._rSentenceCategory = prSentenceCategory; }
    get rSentenceCalcType(): string { return this._rSentenceCalcType; }
    set rSentenceCalcType(prSentenceCalcType: string) { this._rSentenceCalcType = prSentenceCalcType; }
    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) {
        this._createDatetime = pcreateDatetime;
    }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) {
        this._expiryDate = pexpiryDate;
    }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) {
        this._modifyDatetime = pmodifyDatetime;
    }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get sentenceCategory(): string { return this._sentenceCategory; }
    set sentenceCategory(psentenceCategory: string) { this._sentenceCategory = psentenceCategory; }
    get sentenceCalcType(): string { return this._sentenceCalcType; }
    set sentenceCalcType(psentenceCalcType: string) { this._sentenceCalcType = psentenceCalcType; }

    toJSON(): any {
        return {
            'activeFlag': this._activeFlag,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'description': this._description,
            'expiryDate': this._expiryDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sentenceCategory': this._sentenceCategory,
            'sentenceCalcType': this._sentenceCalcType,
            'rSentenceCalcType': this._rSentenceCalcType,
            'rSentenceCategory': this._rSentenceCategory,
            'returnValue': this._returnValue,
            'rowId': this._rowId,
        };
    }
}
