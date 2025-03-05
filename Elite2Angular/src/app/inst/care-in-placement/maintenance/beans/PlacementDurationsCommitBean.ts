import { BaseModel } from "@common/beans/BaseModel";
import { PlacementDurations } from "../../beans/PlacementDurations";

export class PlacementDurationsCommitBean extends BaseModel {

    private _insertList: Array<PlacementDurations>;
    private _deleteList: Array<PlacementDurations>;
    private _updateList: Array<PlacementDurations>;

    get insertList(): Array<PlacementDurations> { return this._insertList; }

    set insertList(pinsertList: Array<PlacementDurations>) { this._insertList = pinsertList; }

    get deleteList(): Array<PlacementDurations> { return this._deleteList; }

    set deleteList(pdeleteList: Array<PlacementDurations>) { this._deleteList = pdeleteList; }

    get updateList(): Array<PlacementDurations> { return this._updateList; }

    set updateList(pupdateList: Array<PlacementDurations>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}