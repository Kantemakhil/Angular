import { BaseModel } from '@commonbeans/BaseModel';
import { VClearAccountPayables } from '@inmate/trust/deductions/beans/VClearAccountPayables';

export class VClearAccountPayablesCommitBean extends BaseModel {
    private _insertList: Array<VClearAccountPayables>;
    private _deleteList: Array<VClearAccountPayables>;
    private _updateList: Array<VClearAccountPayables>;

    get insertList(): Array<VClearAccountPayables> { return this._insertList; }

    set insertList(pinsertList: Array<VClearAccountPayables>) { this._insertList = pinsertList; }

    get deleteList(): Array<VClearAccountPayables> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VClearAccountPayables>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VClearAccountPayables> { return this._updateList; }

    set updateList(pupdateList: Array<VClearAccountPayables>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
