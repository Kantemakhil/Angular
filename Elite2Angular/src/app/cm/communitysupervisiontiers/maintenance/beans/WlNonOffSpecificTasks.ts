import { BaseModel } from "../../../../common/beans/BaseModel";
export class WlNonOffSpecificTasks extends BaseModel {
    private _agyLocId: String;
    private _workloadTaskType: String;
    private _units: number;
    private _staffPosition: String;
    private _sealFlag: String;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _createDatetime: Date;

    public get units(): number { return this._units; }
    public set units(value: number) { this._units = value; }
    public get workloadTaskType(): String { return this._workloadTaskType; }
    public set workloadTaskType(value: String) { this._workloadTaskType = value; }
    public get agyLocId(): String { return this._agyLocId; }
    public set agyLocId(value: String) { this._agyLocId = value; }
    public get staffPosition(): String { return this._staffPosition; }
    public set staffPosition(value: String) { this._staffPosition = value; }
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

    toJSON(): any {
        return {
            'staffPosition': this._staffPosition,
            'workloadTaskType': this._workloadTaskType,
            'agyLocId': this._agyLocId,
            'units': this._units,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'createDatetime': this._createDatetime,
            'sealFlag': this._sealFlag
        }
    }
}