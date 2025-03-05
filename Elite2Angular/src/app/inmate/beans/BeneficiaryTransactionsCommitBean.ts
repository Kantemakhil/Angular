import { BaseModel } from '@commonbeans/BaseModel';
import { BeneficiaryTransactions } from '@inmate/beans/BeneficiaryTransactions';

export class BeneficiaryTransactionsCommitBean extends BaseModel {
    private _insertList: Array<BeneficiaryTransactions>;
    private _deleteList: Array<BeneficiaryTransactions>;
    private _updateList: Array<BeneficiaryTransactions>;

    get insertList(): Array<BeneficiaryTransactions> { return this._insertList; }

    set insertList( pinsertList: Array<BeneficiaryTransactions> ) { this._insertList = pinsertList; }

    get deleteList(): Array<BeneficiaryTransactions> { return this._deleteList; }

    set deleteList( pdeleteList: Array<BeneficiaryTransactions> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<BeneficiaryTransactions> { return this._updateList; }

    set updateList( pupdateList: Array<BeneficiaryTransactions> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
