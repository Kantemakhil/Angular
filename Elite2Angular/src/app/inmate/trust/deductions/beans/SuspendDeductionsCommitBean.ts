import { BaseModel } from '@commonbeans/BaseModel';
import { SuspendDeductions } from '@inmate/trust/deductions/beans/SuspendDeductions';

export class SuspendDeductionsCommitBean extends BaseModel {
    private _insertList: Array<SuspendDeductions>;
    private _deleteList: Array<SuspendDeductions>;
    private _updateList: Array<SuspendDeductions>;

    get insertList(): Array<SuspendDeductions> { return this._insertList; }

    set insertList(pinsertList: Array<SuspendDeductions>) { this._insertList = pinsertList; }

    get deleteList(): Array<SuspendDeductions> { return this._deleteList; }

    set deleteList(pdeleteList: Array<SuspendDeductions>) { this._deleteList = pdeleteList; }

    get updateList(): Array<SuspendDeductions> { return this._updateList; }

    set updateList(pupdateList: Array<SuspendDeductions>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
