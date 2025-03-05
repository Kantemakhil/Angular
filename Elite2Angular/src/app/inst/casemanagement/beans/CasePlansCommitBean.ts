import { BaseModel } from '@commonbeans/BaseModel';
import { CasePlans } from '@instCaseManagementbeans/CasePlans';

export class CasePlansCommitBean extends BaseModel {
    private _insertList: Array<CasePlans>;
    private _deleteList: Array<CasePlans>;
    private _updateList: Array<CasePlans>;

    get insertList(): Array<CasePlans> { return this._insertList; }

    set insertList( pinsertList: Array<CasePlans> ) { this._insertList = pinsertList; }

    get deleteList(): Array<CasePlans> { return this._deleteList; }

    set deleteList( pdeleteList: Array<CasePlans> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<CasePlans> { return this._updateList; }

    set updateList( pupdateList: Array<CasePlans> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
