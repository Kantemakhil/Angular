import { BaseModel } from '@commonbeans/BaseModel';
import { DeductionTypes } from '@inmate/trust/deductions/deductionsmaintenance/beans/DeductionTypes';

export class DeductionTypesCommitBean extends BaseModel {
    private _insertList: Array<DeductionTypes>;
    private _deleteList: Array<DeductionTypes>;
    private _updateList: Array<DeductionTypes>;

    get insertList(): Array<DeductionTypes> { return this._insertList; }

    set insertList(pinsertList: Array<DeductionTypes>) { this._insertList = pinsertList; }

    get deleteList(): Array<DeductionTypes> { return this._deleteList; }

    set deleteList(pdeleteList: Array<DeductionTypes>) { this._deleteList = pdeleteList; }

    get updateList(): Array<DeductionTypes> { return this._updateList; }

    set updateList(pupdateList: Array<DeductionTypes>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
