import { BaseModel } from "@common/beans/BaseModel";
import { LockedModules } from "@inst/automated-counts/maintenance/beans/LockedModules";

export class LockedModulesCommitBean extends BaseModel {

    private _insertList: Array<LockedModules>;
    private _deleteList: Array<LockedModules>;
    private _updateList: Array<LockedModules>;

    get insertList(): Array<LockedModules> { return this._insertList; }

    set insertList(pinsertList: Array<LockedModules>) { this._insertList = pinsertList; }

    get deleteList(): Array<LockedModules> { return this._deleteList; }

    set deleteList(pdeleteList: Array<LockedModules>) { this._deleteList = pdeleteList; }

    get updateList(): Array<LockedModules> { return this._updateList; }

    set updateList(pupdateList: Array<LockedModules>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}