import {BaseModel} from '@commonbeans/BaseModel';
import { BankAccountsMaintenances} from '@inmate/trust/checks/beans/BankAccountsMaintenances';

export class BankAccountsMaintenancesCommitBean extends BaseModel {

    private _insertList: Array<BankAccountsMaintenances>;
    private _deleteList: Array<BankAccountsMaintenances>;
    private _updateList: Array<BankAccountsMaintenances>;

    get insertList(): Array<BankAccountsMaintenances> { return this._insertList; }

    set insertList(pinsertList: Array<BankAccountsMaintenances>) { this._insertList = pinsertList; }

    get deleteList(): Array<BankAccountsMaintenances> { return this._deleteList; }

    set deleteList(pdeleteList: Array<BankAccountsMaintenances>) { this._deleteList = pdeleteList; }

    get updateList(): Array<BankAccountsMaintenances> { return this._updateList; }

    set updateList(pupdateList: Array<BankAccountsMaintenances>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}
