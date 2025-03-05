import { BaseModel } from "@common/beans/BaseModel";

export class VRouteLocations extends BaseModel {

    private _optimumCapacity: number;
    private _physicalCapacity: number;
    private _fromAgyLocId: String;
    private _toAgyLocId: String;
    private _scheduledTripId: number;


    public get optimumCapacity(): number {
        return this._optimumCapacity;
    }
    public set optimumCapacity(value: number) {
        this._optimumCapacity = value;
    }
    public get physicalCapacity(): number {
        return this._physicalCapacity;
    }
    public set physicalCapacity(value: number) {
        this._physicalCapacity = value;
    }
    public get fromAgyLocId(): String {
        return this._fromAgyLocId;
    }
    public set fromAgyLocId(value: String) {
        this._fromAgyLocId = value;
    }

    public get toAgyLocId(): String {
        return this._toAgyLocId;
    }
    public set toAgyLocId(value: String) {
        this._toAgyLocId = value;
    }

    public get scheduledTripId(): number {
        return this._scheduledTripId;
    }
    public set scheduledTripId(value: number) {
        this._scheduledTripId = value;
    }


    toJSON(): any {
        return {
            'optimumCapacity': this._optimumCapacity,
            'fromAgyLocId': this._fromAgyLocId,
            'physicalCapacity': this._physicalCapacity,
            'toAgyLocId': this._toAgyLocId,
            'scheduledTripId': this._scheduledTripId,
        };
    }

}