import { BaseModel } from "@common/beans/BaseModel";
import { IwpBookmarks } from "./IwpBookmarks";

export class IwpBookmarksCommitBean extends BaseModel {
    private _insertList: Array<IwpBookmarks>;
    private _deleteList: Array<IwpBookmarks>;
    private _updateList: Array<IwpBookmarks>;

    get insertList(): Array<IwpBookmarks> { return this._insertList; }

    set insertList(pinsertList: Array<IwpBookmarks>) { this._insertList = pinsertList; }

    get deleteList(): Array<IwpBookmarks> { return this._deleteList; }

    set deleteList(pdeleteList: Array<IwpBookmarks>) { this._deleteList = pdeleteList; }

    get updateList(): Array<IwpBookmarks> { return this._updateList; }

    set updateList(pupdateList: Array<IwpBookmarks>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
