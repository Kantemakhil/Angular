import { BaseModel } from '@commonbeans/BaseModel';
import { OffApV2 } from '@inst/casemanagement/beans/OffApV2';


export class OffApV2CommitBean extends BaseModel {

    private _insertList: Array<OffApV2>;
    private _deleteList: Array<OffApV2>;
    private _updateList: Array<OffApV2>;

    get insertList(): Array<OffApV2> { return this._insertList; }

    set insertList( pinsertList: Array<OffApV2> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffApV2> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffApV2> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffApV2> { return this._updateList; }

    set updateList( pupdateList: Array<OffApV2> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}