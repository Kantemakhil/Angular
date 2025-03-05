import { BaseModel } from "@common/beans/BaseModel";
import { JujOrderMappings } from "./JujOrderMappings";

export class JujOrderMappingsCommitBean extends BaseModel {
    private _deleteList: Array<JujOrderMappings>;
    private _insertList: Array<JujOrderMappings>;
    private _updateList: Array<JujOrderMappings>;

    get deleteList(): Array<JujOrderMappings> { return this._deleteList; }
    set deleteList(pdeleteList: Array<JujOrderMappings>) { this._deleteList = pdeleteList; }
    get insertList(): Array<JujOrderMappings> { return this._insertList; }
    set insertList(pinsertList: Array<JujOrderMappings>) { this._insertList = pinsertList; }
    get updateList(): Array<JujOrderMappings> { return this._updateList; }
    set updateList(pupdateList: Array<JujOrderMappings>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}