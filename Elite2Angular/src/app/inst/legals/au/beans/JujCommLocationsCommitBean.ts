import { BaseModel } from "@common/beans/BaseModel";
import { JujCommLocations } from "./JujCommLocations";

export  class JujCommLocationsCommitBean extends BaseModel {


    private _deleteList: Array<JujCommLocations>;
    private _insertList: Array<JujCommLocations>;
    private _updateList: Array<JujCommLocations>;

    get deleteList(): Array <JujCommLocations> { return this._deleteList; }
    set deleteList(pdeleteList: Array<JujCommLocations>) { this._deleteList = pdeleteList; }
    get insertList(): Array <JujCommLocations> { return this._insertList; }
    set insertList(pinsertList: Array<JujCommLocations>) { this._insertList = pinsertList; }
    get updateList(): Array <JujCommLocations> { return this._updateList; }
    set updateList(pupdateList: Array<JujCommLocations>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}
