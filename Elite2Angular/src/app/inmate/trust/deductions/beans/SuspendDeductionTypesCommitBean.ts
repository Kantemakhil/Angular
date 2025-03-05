import { BaseModel } from '@commonbeans/BaseModel';
import { SuspendDeductionTypes } from '@inmate/trust/deductions/beans/SuspendDeductionTypes';

export class SuspendDeductionTypesCommitBean extends BaseModel {
    private _insertList: Array<SuspendDeductionTypes>;
    private _deleteList: Array<SuspendDeductionTypes>;
    private _updateList: Array<SuspendDeductionTypes>;

    get insertList(): Array<SuspendDeductionTypes> { return this._insertList; }

    set insertList(pinsertList: Array<SuspendDeductionTypes>) { this._insertList = pinsertList; }

    get deleteList(): Array<SuspendDeductionTypes> { return this._deleteList; }

    set deleteList(pdeleteList: Array<SuspendDeductionTypes>) { this._deleteList = pdeleteList; }

    get updateList(): Array<SuspendDeductionTypes> { return this._updateList; }

    set updateList(pupdateList: Array<SuspendDeductionTypes>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
