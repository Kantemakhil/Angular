export class WorkFunction {
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _functionType: string;
    private _sealFlag: string;
    private _workId: number;

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get functionType(): string { return this._functionType; }

    set functionType(pfunctionType: string) { this._functionType = pfunctionType; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get workId(): number { return this._workId; }

    set workId(pworkId: number) { this._workId = pworkId; }


    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'functionType': this._functionType,
            'sealFlag': this._sealFlag,
            'workId': this._workId,
        };
    }
}
