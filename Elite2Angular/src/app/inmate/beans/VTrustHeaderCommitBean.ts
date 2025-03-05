import { BaseModel } from '@commonbeans/BaseModel';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';

export class VTrustHeaderCommitBean extends BaseModel {
    private _insertList: Array<VTrustHeader>;
    private _deleteList: Array<VTrustHeader>;
    private _updateList: Array<VTrustHeader>;

    get insertList(): Array<VTrustHeader> { return this._insertList; }

    set insertList( pinsertList: Array<VTrustHeader> ) { this._insertList = pinsertList; }

    get deleteList(): Array<VTrustHeader> { return this._deleteList; }

    set deleteList( pdeleteList: Array<VTrustHeader> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<VTrustHeader> { return this._updateList; }

    set updateList( pupdateList: Array<VTrustHeader> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
