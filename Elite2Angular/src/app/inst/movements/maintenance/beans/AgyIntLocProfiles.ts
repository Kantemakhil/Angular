import { BaseModel } from '@commonbeans/BaseModel';
export class AgyIntLocProfiles extends BaseModel {
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _intLocProfileType: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _intLocProfileCode: string;
    private _internalLocationId: number;
    private _rowId: string;
    private _iepLevelCode: string;
    private _iepLeveldescription: string;
    public get iepLeveldescription(): string {
        return this._iepLeveldescription;
    }
    public set iepLeveldescription(value: string) {
        this._iepLeveldescription = value;
    }
    public get iepLevelCode(): string {
        return this._iepLevelCode;
    }
    public set iepLevelCode(value: string) {
        this._iepLevelCode = value;
    }
   

    get rowId(): string { return this._rowId; }

    set rowId(prowId: string) { this._rowId = prowId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get intLocProfileType(): string { return this._intLocProfileType; }

    set intLocProfileType(pintLocProfileType: string) { this._intLocProfileType = pintLocProfileType; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get intLocProfileCode(): string { return this._intLocProfileCode; }

    set intLocProfileCode(pintLocProfileCode: string) { this._intLocProfileCode = pintLocProfileCode; }

    get internalLocationId(): number { return this._internalLocationId; }

    set internalLocationId(pinternalLocationId: number) { this._internalLocationId = pinternalLocationId; }


    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'intLocProfileType': this._intLocProfileType,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'intLocProfileCode': this._intLocProfileCode,
            'internalLocationId': this._internalLocationId,
            'rowId' : this._rowId,
            'iepLevelCode':this._iepLevelCode,
            'iepLeveldescription':this._iepLeveldescription
            };
    }
}
