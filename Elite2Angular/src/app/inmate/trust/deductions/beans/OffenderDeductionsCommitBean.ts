import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderDeductions } from '@inmate/trust/trustaccounts/beans/OffenderDeductions';


export class OffenderDeductionsCommitBean extends BaseModel {

    private _insertList: Array<OffenderDeductions>;
    private _updateList: Array<OffenderDeductions>;
    private _deleteList: Array<OffenderDeductions>;

    get insertList(): Array<OffenderDeductions> { return this._insertList; }
    set insertList(insert: Array<OffenderDeductions>) { this._insertList = insert; }

    get updateList(): Array<OffenderDeductions> { return this._updateList; }
    set updateList(update: Array<OffenderDeductions>) { this._updateList = update; }

    get deleteList(): Array<OffenderDeductions> { return this._deleteList; }
    set deleteList(pdeleteList: Array<OffenderDeductions>) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList
        };
    }
}
