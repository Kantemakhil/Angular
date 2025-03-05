import { BaseModel } from '@commonbeans/BaseModel';
import { VisitingGroups } from '@visitsbeans/VisitingGroups';

export class VisitingGroupsCommitBean extends BaseModel {

    private _insertList: Array<VisitingGroups>;
    private _deleteList: Array<VisitingGroups>;
    private _updateList: Array<VisitingGroups>;

    get insertList(): Array<VisitingGroups> { return this._insertList; }

    set insertList(pinsertList: Array<VisitingGroups>) { this._insertList = pinsertList; }

    get deleteList(): Array<VisitingGroups> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VisitingGroups>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VisitingGroups> { return this._updateList; }

    set updateList(pupdateList: Array<VisitingGroups>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
