import { BaseModel } from "@common/beans/BaseModel";
import { PotWeightings } from "./PotWeightings";

export class PotWeightingsCommitBean extends BaseModel {
    private _deleteList: Array<PotWeightings>;
    private _insertList: Array<PotWeightings>;
    private _updateList: Array<PotWeightings>;

    get deleteList(): Array<PotWeightings> { return this._deleteList; }
    set deleteList(pdeleteList: Array<PotWeightings>) { this._deleteList = pdeleteList; }
    get insertList(): Array<PotWeightings> { return this._insertList; }
    set insertList(pinsertList: Array<PotWeightings>) { this._insertList = pinsertList; }
    get updateList(): Array<PotWeightings> { return this._updateList; }
    set updateList(pupdateList: Array<PotWeightings>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}
