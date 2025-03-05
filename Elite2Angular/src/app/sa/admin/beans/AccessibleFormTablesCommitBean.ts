import {BaseModel} from '@commonbeans/BaseModel';
import {AccessibleFormTables} from './AccessibleFormTables';

export class AccessibleFormTablesCommitBean extends BaseModel {

    private _insertList: Array<AccessibleFormTables>;
    private _deleteList: Array<AccessibleFormTables>;
    private _updateList: Array<AccessibleFormTables>;

    get insertList(): Array<AccessibleFormTables> { return this._insertList; }

    set insertList(pinsertList: Array<AccessibleFormTables>) { this._insertList = pinsertList; }

    get deleteList(): Array<AccessibleFormTables> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AccessibleFormTables>) { this._deleteList = pdeleteList; }

    get updateList(): Array<AccessibleFormTables> { return this._updateList; }

    set updateList(pupdateList: Array<AccessibleFormTables>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
