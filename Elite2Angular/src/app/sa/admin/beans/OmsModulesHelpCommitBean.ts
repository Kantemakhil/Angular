import { OmsModulesHelp } from "../../usersystemsecurity/beans/OmsModulesHelp";

export class OmsModulesHelpCommitBean {
    private _insertList: Array<OmsModulesHelp>;
    private _deleteList: Array<OmsModulesHelp>;
    private _updateList: Array<OmsModulesHelp>;


    get insertList(): Array<OmsModulesHelp> { return this._insertList; }

    set insertList( pinsertList: Array<OmsModulesHelp> ) { this._insertList = pinsertList; }

    get updateList(): Array<OmsModulesHelp> { return this._updateList; }

    set updateList( pupdateList: Array<OmsModulesHelp> ) { this._updateList = pupdateList; }

    get deleteList(): Array<OmsModulesHelp> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OmsModulesHelp> ) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}