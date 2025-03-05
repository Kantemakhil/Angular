import { OmsModules } from "../../usersystemsecurity/beans/OmsModules";

export class OmsModulesCommitBean {
    private _insertList: Array<OmsModules>;
    private _deleteList: Array<OmsModules>;
    private _updateList: Array<OmsModules>;


    get insertList(): Array<OmsModules> { return this._insertList; }

    set insertList( pinsertList: Array<OmsModules> ) { this._insertList = pinsertList; }

    get updateList(): Array<OmsModules> { return this._updateList; }

    set updateList( pupdateList: Array<OmsModules> ) { this._updateList = pupdateList; }

    get deleteList(): Array<OmsModules> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OmsModules> ) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}