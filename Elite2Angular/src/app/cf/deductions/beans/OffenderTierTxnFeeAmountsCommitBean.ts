import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderTierTxnFeeAmounts } from './OffenderTierTxnFeeAmounts';

// import { OffenderTierTxnFeeAmounts } from '@inst/classification/beans/OffenderTierTxnFeeAmounts';
// import { OffenderAssessments } from '@inst/classification/beans/OffenderAssessments';

export class OffenderTierTxnFeeAmountsCommitBean extends BaseModel {

    private _insertList: Array<OffenderTierTxnFeeAmounts>;
    private _deleteList: Array<OffenderTierTxnFeeAmounts>;
    private _updateList: Array<OffenderTierTxnFeeAmounts>;

    get insertList(): Array<OffenderTierTxnFeeAmounts> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderTierTxnFeeAmounts>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderTierTxnFeeAmounts> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderTierTxnFeeAmounts>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderTierTxnFeeAmounts> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderTierTxnFeeAmounts>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
