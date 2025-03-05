import { RoleInaccessibleRefCodes } from "./RoleInaccessibleRefCodes";

export class RoleInaccessibleRefCodesCommitBean {
    private _insertList: Array<RoleInaccessibleRefCodes>;
    private _deleteList: Array<RoleInaccessibleRefCodes>;
    private _updateList: Array<RoleInaccessibleRefCodes>;


    get insertList(): Array<RoleInaccessibleRefCodes> { return this._insertList; }

    set insertList( pinsertList: Array<RoleInaccessibleRefCodes> ) { this._insertList = pinsertList; }

    get updateList(): Array<RoleInaccessibleRefCodes> { return this._updateList; }

    set updateList( pupdateList: Array<RoleInaccessibleRefCodes> ) { this._updateList = pupdateList; }

    get deleteList(): Array<RoleInaccessibleRefCodes> { return this._deleteList; }

    set deleteList( pdeleteList: Array<RoleInaccessibleRefCodes> ) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}