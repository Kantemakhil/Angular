import { BaseModel } from '@commonbeans/BaseModel';
import { VOffenderAssigned } from '../beans/VOffenderAssigned';

export class VOffenderAssignedCommitBean extends BaseModel {
    private _insertList: Array<VOffenderAssigned>;
    private _deleteList: Array<VOffenderAssigned>;
    private _updateList: Array<VOffenderAssigned>;

    get insertList(): Array<VOffenderAssigned> { return this._insertList; }

    set insertList( pinsertList: Array<VOffenderAssigned> ) { this._insertList = pinsertList; }

    get deleteList(): Array<VOffenderAssigned> { return this._deleteList; }

    set deleteList( pdeleteList: Array<VOffenderAssigned> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<VOffenderAssigned> { return this._updateList; }

    set updateList( pupdateList: Array<VOffenderAssigned> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
