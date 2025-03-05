import {BaseModel} from '@commonbeans/BaseModel';
import { GlTransactions } from '@inmate/trust/trustaccounts/beans/GlTransactions';

export class GlTransactionsCommitBean extends BaseModel {

    private _insertList: Array<GlTransactions>;
    private _deleteList: Array<GlTransactions>;
    private _updateList: Array<GlTransactions>;

    get insertList(): Array<GlTransactions> { return this._insertList; }

    set insertList(pinsertList: Array<GlTransactions>){ this._insertList = pinsertList; }

    get deleteList(): Array<GlTransactions> { return this._deleteList; }

    set deleteList(pdeleteList: Array<GlTransactions>){ this._deleteList = pdeleteList; }

    get updateList(): Array<GlTransactions> { return this._updateList; }

    set updateList(pupdateList: Array<GlTransactions>){ this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}