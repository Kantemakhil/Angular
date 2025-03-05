import { StaffLocationRoles } from "./StaffLocationRoles";
import { BaseModel } from "@common/beans/BaseModel";

export class StaffLocationRolesCommitBean extends BaseModel {

    private _insertList: Array<StaffLocationRoles>;
    private _deleteList: Array<StaffLocationRoles>;
    private _updateList: Array<StaffLocationRoles>;

    get insertList(): Array<StaffLocationRoles> { return this._insertList; }

    set insertList( pinsertList: Array<StaffLocationRoles> ) { this._insertList = pinsertList; }

    get deleteList(): Array<StaffLocationRoles> { return this._deleteList; }

    set deleteList( pdeleteList: Array<StaffLocationRoles> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<StaffLocationRoles> { return this._updateList; }

    set updateList( pupdateList: Array<StaffLocationRoles> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

}
