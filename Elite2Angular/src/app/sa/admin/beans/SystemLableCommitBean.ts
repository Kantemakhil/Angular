import { SystemLable } from "@sa/admin/beans/SystemLable";

export class SystemLableCommitBean {
    private _insertList: Array<SystemLable>;
    private _deleteList: Array<SystemLable>;
    private _updateList: Array<SystemLable>;


    get insertList(): Array<SystemLable> { return this._insertList; }

    set insertList( pinsertList: Array<SystemLable> ) { this._insertList = pinsertList; }

    get updateList(): Array<SystemLable> { return this._updateList; }

    set updateList( pupdateList: Array<SystemLable> ) { this._updateList = pupdateList; }

    get deleteList(): Array<SystemLable> { return this._deleteList; }

    set deleteList( pdeleteList: Array<SystemLable> ) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}