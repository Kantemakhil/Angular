export class TeamFunctions {
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _teamId: number;
    private _modifyUserId: string;
    private _functionType: string;
    private _sealFlag: string;
    private _returnValue: number;
    private _rowId: string;
    private _serverCode: number;
    get rowId(): string { return this._rowId; }
    set rowId(prowId: string) { this._rowId = prowId; }
    get serverCode(): number{ return this._serverCode; }
    set serverCode(pserverCode: number){ this._serverCode = pserverCode; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get teamId(): number { return this._teamId; }
    set teamId(pteamId: number) { this._teamId = pteamId; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get functionType(): string { return this._functionType; }
    set functionType(pfunctionType: string) { this._functionType = pfunctionType; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get returnValue(): number { return this._returnValue; }
    set returnValue(preturnValue: number) { this._returnValue = preturnValue; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'teamId': this._teamId,
            'modifyUserId': this._modifyUserId,
            'functionType': this._functionType,
            'sealFlag': this._sealFlag,
            'returnValue': this._returnValue,
            'rowId': this._rowId,
            'serverCode': this._serverCode,
        };
    }
}
