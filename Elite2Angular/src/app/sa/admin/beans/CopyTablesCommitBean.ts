import { BaseModel } from '@commonbeans/BaseModel';
import { CopyTables } from '../beans/CopyTables';

export class CopyTablesCommitBean extends BaseModel {
    private _insertList: Array<CopyTables>;
    private _deleteList: Array<CopyTables>;
    private _updateList: Array<CopyTables>;

    get insertList(): Array<CopyTables> { return this._insertList; }

    set insertList( pinsertList: Array<CopyTables> ) { this._insertList = pinsertList; }

    get deleteList(): Array<CopyTables> { return this._deleteList; }

    set deleteList( pdeleteList: Array<CopyTables> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<CopyTables> { return this._updateList; }

    set updateList( pupdateList: Array<CopyTables> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
