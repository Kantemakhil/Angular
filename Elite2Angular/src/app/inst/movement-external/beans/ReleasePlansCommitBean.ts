import { BaseModel } from '@commonbeans/BaseModel';
import { ReleasePlans } from '@inst/movement-external/beans/ReleasePlans';

export class ReleasePlansCommitBean extends BaseModel {
    private _insertList: Array<ReleasePlans>;
    private _deleteList: Array<ReleasePlans>;
    private _updateList: Array<ReleasePlans>;

    get insertList(): Array<ReleasePlans> { return this._insertList; }

    set insertList( pinsertList: Array<ReleasePlans> ) { this._insertList = pinsertList; }

    get deleteList(): Array<ReleasePlans> { return this._deleteList; }

    set deleteList( pdeleteList: Array<ReleasePlans> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<ReleasePlans> { return this._updateList; }

    set updateList( pupdateList: Array<ReleasePlans> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
