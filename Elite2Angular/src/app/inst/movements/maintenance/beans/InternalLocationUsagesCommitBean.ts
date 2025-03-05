import {BaseModel} from '@commonbeans/BaseModel';
import {InternalLocationUsages} from '@inst/movements/maintenance/beans/InternalLocationUsages';

export class InternalLocationUsagesCommitBean extends BaseModel {

    private _insertList: Array<InternalLocationUsages>;
    private _deleteList: Array<InternalLocationUsages>;
    private _updateList: Array<InternalLocationUsages>;

    get insertList(): Array<InternalLocationUsages> { return this._insertList; }

    set insertList(pinsertList: Array<InternalLocationUsages>) { this._insertList = pinsertList; }

    get deleteList(): Array<InternalLocationUsages> { return this._deleteList; }

    set deleteList(pdeleteList: Array<InternalLocationUsages>) { this._deleteList = pdeleteList; }

    get updateList(): Array<InternalLocationUsages> { return this._updateList; }

    set updateList(pupdateList: Array<InternalLocationUsages>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
