import {BaseModel} from '@commonbeans/BaseModel';
import { CaseloadCurrentAccountsBase} from '@inmate/trust/checks/beans/CaseloadCurrentAccountsBase';

export class CaseloadCurrentAccountsBaseCommitBean extends BaseModel {

    private _insertList: Array<CaseloadCurrentAccountsBase>;
    private _deleteList: Array<CaseloadCurrentAccountsBase>;
    private _updateList: Array<CaseloadCurrentAccountsBase>;

    get insertList(): Array<CaseloadCurrentAccountsBase> { return this._insertList; }

    set insertList(pinsertList: Array<CaseloadCurrentAccountsBase>){ this._insertList = pinsertList; }

    get deleteList(): Array<CaseloadCurrentAccountsBase> { return this._deleteList; }

    set deleteList(pdeleteList: Array<CaseloadCurrentAccountsBase>){ this._deleteList = pdeleteList; }

    get updateList(): Array<CaseloadCurrentAccountsBase> { return this._updateList; }

    set updateList(pupdateList: Array<CaseloadCurrentAccountsBase>){ this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}