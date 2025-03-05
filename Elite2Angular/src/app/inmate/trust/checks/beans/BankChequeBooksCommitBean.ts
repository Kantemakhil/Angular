import { BaseModel } from '@commonbeans/BaseModel';
import { BankChequeBooks } from '@inmate/trust/checks/beans/BankChequeBooks';

export class BankChequeBooksCommitBean extends BaseModel {
    private _insertList: Array<BankChequeBooks>;
    private _deleteList: Array<BankChequeBooks>;
    private _updateList: Array<BankChequeBooks>;

    get insertList(): Array<BankChequeBooks> { return this._insertList; }

    set insertList(pinsertList: Array<BankChequeBooks>) { this._insertList = pinsertList; }

    get deleteList(): Array<BankChequeBooks> { return this._deleteList; }

    set deleteList(pdeleteList: Array<BankChequeBooks>) { this._deleteList = pdeleteList; }

    get updateList(): Array<BankChequeBooks> { return this._updateList; }

    set updateList(pupdateList: Array<BankChequeBooks>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
