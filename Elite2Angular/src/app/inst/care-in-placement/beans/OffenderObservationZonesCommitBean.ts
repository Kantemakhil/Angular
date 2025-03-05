import { BaseModel } from "@common/beans/BaseModel";
import { OffenderObservationZones } from "./OffenderObservationZones";

export class OffenderObservationZonesCommitBean extends BaseModel {
    private _insertList: Array<OffenderObservationZones>;
    private _deleteList: Array<OffenderObservationZones>;
    private _updateList: Array<OffenderObservationZones>;


    get insertList(): Array<OffenderObservationZones> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderObservationZones>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderObservationZones> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderObservationZones>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderObservationZones> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderObservationZones>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
