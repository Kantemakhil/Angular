import {BaseModel} from '@commonbeans/BaseModel';
import { InstitutionMiniBalances } from '@inmate/trust/financialsmaintenance/subaccounts/beans/InstitutionMiniBalances';

export class InstitutionMiniBalancesCommitBean extends BaseModel {

    private _insertList: Array<InstitutionMiniBalances>;
    private _deleteList: Array<InstitutionMiniBalances>;
    private _updateList: Array<InstitutionMiniBalances>;

    get insertList(): Array<InstitutionMiniBalances> { return this._insertList; }

    set insertList(pinsertList: Array<InstitutionMiniBalances>) { this._insertList = pinsertList; }

    get deleteList(): Array<InstitutionMiniBalances> { return this._deleteList; }

    set deleteList(pdeleteList: Array<InstitutionMiniBalances>) { this._deleteList = pdeleteList; }

    get updateList(): Array<InstitutionMiniBalances> { return this._updateList; }

    set updateList(pupdateList: Array<InstitutionMiniBalances>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}
