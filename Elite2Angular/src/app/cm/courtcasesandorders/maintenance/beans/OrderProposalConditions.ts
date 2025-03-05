export class OrderProposalConditions {
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _orderId: number;
    private _lengthUnitCode: string;
    private _modifyUserId: string;
    private _length: number;
    private _commentText: string;
    private _commConditionCode: string;
    private _createDatetime: Date;
    private _commConditionType: string;
    private _orderProposalConditionId: number;
    private _orderProposalCode: string;
    private _sealFlag: string;
    private _parentSentenceCategory: string;
    private _categoryType: string;
    public get categoryType(): string {
        return this._categoryType;
    }
    public set categoryType(value: string) {
        this._categoryType = value;
    }

    public get parentSentenceCategory(): string {
        return this._parentSentenceCategory;
    }
    public set parentSentenceCategory(value: string) {
        this._parentSentenceCategory = value;
    }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get orderId(): number { return this._orderId; }
    set orderId(porderId: number) { this._orderId = porderId; }
    get lengthUnitCode(): string { return this._lengthUnitCode; }
    set lengthUnitCode(plengthUnitCode: string) { this._lengthUnitCode = plengthUnitCode; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get length(): number { return this._length; }
    set length(plength: number) { this._length = plength; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get commConditionCode(): string { return this._commConditionCode; }
    set commConditionCode(pcommConditionCode: string) { this._commConditionCode = pcommConditionCode; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get commConditionType(): string { return this._commConditionType; }
    set commConditionType(pcommConditionType: string) { this._commConditionType = pcommConditionType; }
    get orderProposalConditionId(): number { return this._orderProposalConditionId; }
    set orderProposalConditionId(porderProposalConditionId: number) { this._orderProposalConditionId = porderProposalConditionId; }
    get orderProposalCode(): string { return this._orderProposalCode; }
    set orderProposalCode(porderProposalCode: string) { this._orderProposalCode = porderProposalCode; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'orderId': this._orderId,
            'lengthUnitCode': this._lengthUnitCode,
            'modifyUserId': this._modifyUserId,
            'length': this._length,
            'commentText': this._commentText,
            'commConditionCode': this._commConditionCode,
            'createDatetime': this._createDatetime,
            'commConditionType': this._commConditionType,
            'orderProposalConditionId': this._orderProposalConditionId,
            'orderProposalCode': this._orderProposalCode,
            'sealFlag': this._sealFlag,
        };
    }
}
