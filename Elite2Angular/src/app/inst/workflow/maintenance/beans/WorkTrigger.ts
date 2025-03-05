export class WorkTrigger {
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _due: number;
    private _modifyDatetime: Date;
    private _triggerName: string;
    private _modifyUserId: string;
    private _days: number;
    private _sealFlag: string;
    private _workId: number;
    private _activeFlag: string;

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get due(): number { return this._due; }

    set due(pdue: number) { this._due = pdue; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get triggerName(): string { return this._triggerName; }

    set triggerName(ptriggerName: string) { this._triggerName = ptriggerName; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get days(): number { return this._days; }

    set days(pdays: number) { this._days = pdays; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get workId(): number { return this._workId; }

    set workId(pworkId: number) { this._workId = pworkId; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }


    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'expiryDate': this._expiryDate,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'due': this._due,
            'modifyDatetime': this._modifyDatetime,
            'triggerName': this._triggerName,
            'modifyUserId': this._modifyUserId,
            'days': this._days,
            'sealFlag': this._sealFlag,
            'workId': this._workId,
            'activeFlag': this._activeFlag,
        };
    }
}
