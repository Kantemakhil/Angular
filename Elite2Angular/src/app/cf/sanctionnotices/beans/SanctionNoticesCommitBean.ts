import { SanctionNotices } from "./SanctionNotices";
import { BaseModel } from "../../../common/beans/BaseModel";

export class  SanctionNoticesCommitBean extends BaseModel {


    private _insertList: Array<SanctionNotices>;
    private _deleteList: Array<SanctionNotices>;
    private _updateList: Array<SanctionNotices>;

    get insertList(): Array<SanctionNotices> { return this._insertList; }

    set insertList(pinsertList: Array<SanctionNotices>) { this._insertList = pinsertList; }

    get deleteList(): Array<SanctionNotices> { return this._deleteList; }

    set deleteList(pdeleteList: Array<SanctionNotices>) { this._deleteList = pdeleteList; }

    get updateList(): Array<SanctionNotices> { return this._updateList; }

    set updateList(pupdateList: Array<SanctionNotices>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}