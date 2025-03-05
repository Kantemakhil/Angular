export class OrderPpslCondActivities {
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _orderProposalConditionId: number;
    private _modifyUserId: string;
    private _orderPpslCondActivityId: number;
    private _sealFlag: string;
    private _commentText: string;
    private _programId: number;
    private _conditionActivityCode: string;
    private _orderPropCondActivityId: number;
    private _orderId: number;

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get orderProposalConditionId(): number { return this._orderProposalConditionId; }
    set orderProposalConditionId(porderProposalConditionId: number) { this._orderProposalConditionId = porderProposalConditionId; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get orderPpslCondActivityId(): number { return this._orderPpslCondActivityId; }
    set orderPpslCondActivityId(porderPpslCondActivityId: number) { this._orderPpslCondActivityId = porderPpslCondActivityId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get programId(): number { return this._programId; }
    set programId(pprogramId: number) { this._programId = pprogramId; }
    get conditionActivityCode(): string { return this._conditionActivityCode; }
    set conditionActivityCode(pconditionActivityCode: string) { this._conditionActivityCode = pconditionActivityCode; }

    get orderPropCondActivityId(): number { return this._orderPropCondActivityId; }
    set orderPropCondActivityId(porderPropCondActivityId: number) { this._orderPropCondActivityId = porderPropCondActivityId; }

    get orderId(): number { return this._orderId; }
    set orderId(porderId: number) { this._orderId = porderId; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'orderProposalConditionId': this._orderProposalConditionId,
            'modifyUserId': this._modifyUserId,
            'orderPpslCondActivityId': this._orderPpslCondActivityId,
            'sealFlag': this._sealFlag,
            'commentText': this._commentText,
            'programId': this._programId,
            'conditionActivityCode': this._conditionActivityCode,
            'orderPropCondActivityId': this._orderPropCondActivityId,
            'orderId': this._orderId
        };
    }
}