import { BaseModel } from '@commonbeans/BaseModel';
import { OffApV1 } from '@inst/casemanagement/beans/OffApV1';


export class OffApV1CommitBean extends BaseModel {

    private _insertList: Array<OffApV1>;
    private _deleteList: Array<OffApV1>;
    private _updateList: Array<OffApV1>;

    get insertList(): Array<OffApV1> { return this._insertList; }

    set insertList( pinsertList: Array<OffApV1> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffApV1> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffApV1> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffApV1> { return this._updateList; }

    set updateList( pupdateList: Array<OffApV1> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}