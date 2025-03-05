import { BaseModel } from '@commonbeans/BaseModel';
import { BankChequeRegisters } from '@inmate/trust/checks/beans/BankChequeRegisters';

export class BankChequeRegistersCommitBean extends BaseModel {
    private _insertList: Array<BankChequeRegisters>;
    private _deleteList: Array<BankChequeRegisters>;
    private _updateList: Array<BankChequeRegisters>;

    get insertList(): Array<BankChequeRegisters> { return this._insertList; }

    set insertList( pinsertList: Array<BankChequeRegisters> ) { this._insertList = pinsertList; }

    get deleteList(): Array<BankChequeRegisters> { return this._deleteList; }

    set deleteList( pdeleteList: Array<BankChequeRegisters> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<BankChequeRegisters> { return this._updateList; }

    set updateList( pupdateList: Array<BankChequeRegisters> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
