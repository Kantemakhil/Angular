import { BaseModel } from "@common/beans/BaseModel";
import { IwpBookmarkParameters } from "./IwpBookmarkParameters";

export class IwpBookmarkParametersCommitBean extends BaseModel {
    private _insertList: Array<IwpBookmarkParameters>;
    private _deleteList: Array<IwpBookmarkParameters>;
    private _updateList: Array<IwpBookmarkParameters>;

    get insertList(): Array<IwpBookmarkParameters> { return this._insertList; }

    set insertList(pinsertList: Array<IwpBookmarkParameters>) { this._insertList = pinsertList; }

    get deleteList(): Array<IwpBookmarkParameters> { return this._deleteList; }

    set deleteList(pdeleteList: Array<IwpBookmarkParameters>) { this._deleteList = pdeleteList; }

    get updateList(): Array<IwpBookmarkParameters> { return this._updateList; }

    set updateList(pupdateList: Array<IwpBookmarkParameters>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }

}
