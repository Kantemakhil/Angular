import { BaseModel } from '@commonbeans/BaseModel';
import { VisitingMembers } from '@visitsbeans/VisitingMembers';

export class VisitingMembersCommitBean extends BaseModel {

    private _insertList: Array<VisitingMembers>;
    private _deleteList: Array<VisitingMembers>;
    private _updateList: Array<VisitingMembers>;

    get insertList(): Array<VisitingMembers> { return this._insertList; }

    set insertList(pinsertList: Array<VisitingMembers>) { this._insertList = pinsertList; }

    get deleteList(): Array<VisitingMembers> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VisitingMembers>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VisitingMembers> { return this._updateList; }

    set updateList(pupdateList: Array<VisitingMembers>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
