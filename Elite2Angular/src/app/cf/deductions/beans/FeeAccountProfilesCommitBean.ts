import { FeeAccountProfiles } from "./FeeAccountProfiles";

export class FeeAccountProfilesCommitBean {
    private _insertList: Array<FeeAccountProfiles>;
    private _updateList: Array<FeeAccountProfiles>;
    private _deleteList: Array<FeeAccountProfiles>;

    get insertList(): Array<FeeAccountProfiles> { return this._insertList; }

    set insertList(pinsertList: Array<FeeAccountProfiles>) { this._insertList = pinsertList; }

    get deleteList(): Array<FeeAccountProfiles> { return this._deleteList; }

    set deleteList(pdeleteList: Array<FeeAccountProfiles>) { this._deleteList = pdeleteList; }

    get updateList(): Array<FeeAccountProfiles> { return this._updateList; }

    set updateList(pupdateList: Array<FeeAccountProfiles>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
