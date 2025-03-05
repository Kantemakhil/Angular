export class OrderProposals {
    private _createDatetime: Date;
    private _sentenceCategory: string;
    private _sentenceCategoryTemp: string;
    private _createUserId: string;
    private _sentenceCalcType: string;
    private _sentenceCalcTypeTemp: string;
    private _orderId: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _orderProposalCode: string;
    private _sealFlag: string;
    private _rowId: string;
    private _oldOrderProposalCode;
    private _notSuitableFlag: string;
    private _notSuitableReason: string;
    private _commentText: string;

    public get sentenceCalcTypeTemp(): string {
        return this._sentenceCalcTypeTemp;
    }
    public set sentenceCalcTypeTemp(value: string) {
        this._sentenceCalcTypeTemp = value;
    }

    public get rowId(): string {
        return this.rowId;
    }
    public set rowId(value: string) {
        this._rowId = value;
    }

    public get sentenceCategoryTemp(): string {
        return this._sentenceCategoryTemp;
    }
    public set sentenceCategoryTemp(value: string) {
        this._sentenceCategoryTemp = value;
    }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get sentenceCategory(): string { return this._sentenceCategory; }
    set sentenceCategory(psentenceCategory: string) { this._sentenceCategory = psentenceCategory; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get sentenceCalcType(): string { return this._sentenceCalcType; }
    set sentenceCalcType(psentenceCalcType: string) { this._sentenceCalcType = psentenceCalcType; }
    get orderId(): number { return this._orderId; }
    set orderId(porderId: number) { this._orderId = porderId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get orderProposalCode(): string { return this._orderProposalCode; }
    set orderProposalCode(porderProposalCode: string) { this._orderProposalCode = porderProposalCode; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get oldOrderProposalCode() { return this._oldOrderProposalCode; }
    set oldOrderProposalCode(value) { this._oldOrderProposalCode = value; }
    get notSuitableFlag(): string { return this._notSuitableFlag; }
    set notSuitableFlag(value: string) { this._notSuitableFlag = value; }
    get notSuitableReason(): string { return this._notSuitableReason; }
    set notSuitableReason(value: string) { this._notSuitableReason = value; }
    get commentText(): string {  return this._commentText; }
    set commentText(value: string) { this._commentText = value; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'sentenceCategory': this._sentenceCategory,
            'createUserId': this._createUserId,
            'sentenceCalcType': this._sentenceCalcType,
            'orderId': this._orderId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'orderProposalCode': this._orderProposalCode,
            'sealFlag': this._sealFlag,
            'rowId': this._rowId,
            'oldOrderProposalCode': this._oldOrderProposalCode,
            'notSuitableFlag': this._notSuitableFlag,
            'notSuitableReason': this._notSuitableReason,
            'commentText': this._commentText
        };
    }
}