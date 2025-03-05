import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderTxnFeeDetails } from './OffenderTxnFeeDetails';

// import { OffenderTxnFeeDetails } from '@inst/classification/beans/OffenderTxnFeeDetails';
// import { OffenderAssessments } from '@inst/classification/beans/OffenderAssessments';

export class OffenderTxnFeeDetailsCommitBean extends BaseModel {

    private _insertList: Array<OffenderTxnFeeDetails>;
    private _deleteList: Array<OffenderTxnFeeDetails>;
    private _updateList: Array<OffenderTxnFeeDetails>;

    get insertList(): Array<OffenderTxnFeeDetails> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderTxnFeeDetails>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderTxnFeeDetails> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderTxnFeeDetails>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderTxnFeeDetails> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderTxnFeeDetails>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
