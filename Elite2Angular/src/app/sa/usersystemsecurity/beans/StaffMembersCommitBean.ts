import { BaseModel } from '@commonbeans/BaseModel';
import { StaffMembers } from '@instincidentsbeans/StaffMembers';
export class StaffMembersCommitBean extends BaseModel {

    private _insertList: Array<StaffMembers>;
    private _deleteList: Array<StaffMembers>;
    private _updateList: Array<StaffMembers>;

    get insertList(): Array<StaffMembers> { return this._insertList; }

    set insertList( pinsertList: Array<StaffMembers> ) { this._insertList = pinsertList; }

    get deleteList(): Array<StaffMembers> { return this._deleteList; }

    set deleteList( pdeleteList: Array<StaffMembers> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<StaffMembers> { return this._updateList; }

    set updateList( pupdateList: Array<StaffMembers> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

}