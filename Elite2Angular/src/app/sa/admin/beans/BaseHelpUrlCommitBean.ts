import { BaseHelpUrl } from "../../usersystemsecurity/beans/BaseHelpUrl";

export class BaseHelpUrlCommitBean {
    private _insertList: Array<BaseHelpUrl>;
    private _deleteList: Array<BaseHelpUrl>;
    private _updateList: Array<BaseHelpUrl>;


    get insertList(): Array<BaseHelpUrl> { return this._insertList; }

    set insertList( pinsertList: Array<BaseHelpUrl> ) { this._insertList = pinsertList; }

    get updateList(): Array<BaseHelpUrl> { return this._updateList; }

    set updateList( pupdateList: Array<BaseHelpUrl> ) { this._updateList = pupdateList; }

    get deleteList(): Array<BaseHelpUrl> { return this._deleteList; }

    set deleteList( pdeleteList: Array<BaseHelpUrl> ) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}