import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderDeductionReceipts } from '@inmate/trust/deductions/beans/OffenderDeductionReceipts';


export class OffenderDeductionReceiptsCommitBean extends BaseModel {

    private _insertList: Array<OffenderDeductionReceipts>;
    private _deleteList: Array<OffenderDeductionReceipts>;
    private _updateList: Array<OffenderDeductionReceipts>;

    get insertList(): Array<OffenderDeductionReceipts> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderDeductionReceipts>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderDeductionReceipts> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderDeductionReceipts>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderDeductionReceipts> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderDeductionReceipts>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
