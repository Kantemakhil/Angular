import { BaseModel } from "../../../../common/beans/BaseModel";

export class WlDefaultStaffUnits extends BaseModel {
    
    private _staffPosition: String;
    private _defaultStartingUnits: number;
    private _sealFlag: String;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _createDatetime: Date;


    public get createDatetime(): Date { return this._createDatetime; }
    public set createDatetime(value: Date) { this._createDatetime = value; }
    public get modifyUserId(): string { return this._modifyUserId; }
    public set modifyUserId(value: string) { this._modifyUserId = value; }
    public get modifyDatetime(): Date { return this._modifyDatetime; }
    public set modifyDatetime(value: Date) { this._modifyDatetime = value; }
    public get createUserId(): string { return this._createUserId; }
    public set createUserId(value: string) { this._createUserId = value; }
    public get sealFlag(): String { return this._sealFlag; }
    public set sealFlag(value: String) { this._sealFlag = value; }
    public get defaultStartingUnits(): number { return this._defaultStartingUnits; }
    public set defaultStartingUnits(value: number) { this._defaultStartingUnits = value; }
    public get staffPosition(): String { return this._staffPosition; }
    public set staffPosition(value: String) { this._staffPosition = value; }

    toJSON(): any {
        return {
            'staffPosition': this._staffPosition,
            'defaultStartingUnits': this._defaultStartingUnits,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'createDatetime': this._createDatetime,
            'sealFlag': this._sealFlag
        }
    }
}