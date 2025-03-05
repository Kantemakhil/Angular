import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderChecklistDetails } from '@inst/movement-external/beans/OffenderChecklistDetails';

export class OffenderChecklistDetailsCommitBean extends BaseModel {
    private _insertList: Array<OffenderChecklistDetails>;
    private _deleteList: Array<OffenderChecklistDetails>;
    private _updateList: Array<OffenderChecklistDetails>;

    get insertList(): Array<OffenderChecklistDetails> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderChecklistDetails> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderChecklistDetails> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderChecklistDetails> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderChecklistDetails> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderChecklistDetails> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
