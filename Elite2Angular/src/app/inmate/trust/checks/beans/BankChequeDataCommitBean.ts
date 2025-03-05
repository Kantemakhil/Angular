import { BaseModel } from '@commonbeans/BaseModel';
import { BankChequeData } from '@inmate/trust/checks/beans/BankChequeData';

export class BankChequeDataCommitBean extends BaseModel {
    private _insertList: Array<BankChequeData>;
    private _deleteList: Array<BankChequeData>;
    private _updateList: Array<BankChequeData>;

    get insertList(): Array<BankChequeData> { return this._insertList; }

    set insertList(pinsertList: Array<BankChequeData>) { this._insertList = pinsertList; }

    get deleteList(): Array<BankChequeData> { return this._deleteList; }

    set deleteList(pdeleteList: Array<BankChequeData>) { this._deleteList = pdeleteList; }

    get updateList(): Array<BankChequeData> { return this._updateList; }

    set updateList(pupdateList: Array<BankChequeData>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
