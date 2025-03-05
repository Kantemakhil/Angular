import { BaseModel } from '@commonbeans/BaseModel';
import { StaffMemberRoles } from './StaffMemberRoles';


export class StaffMemberRolesCommitBean extends BaseModel {

    private _insertList: Array<StaffMemberRoles>;
    private _deleteList: Array<StaffMemberRoles>;
    private _updateList: Array<StaffMemberRoles>;

    get insertList(): Array<StaffMemberRoles> { return this._insertList; }

    set insertList( pinsertList: Array<StaffMemberRoles> ) { this._insertList = pinsertList; }

    get deleteList(): Array<StaffMemberRoles> { return this._deleteList; }

    set deleteList( pdeleteList: Array<StaffMemberRoles> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<StaffMemberRoles> { return this._updateList; }

    set updateList( pupdateList: Array<StaffMemberRoles> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

}
