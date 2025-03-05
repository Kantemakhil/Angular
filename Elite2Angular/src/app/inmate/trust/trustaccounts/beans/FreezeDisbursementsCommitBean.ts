import { BaseModel } from '@commonbeans/BaseModel';
import { FreezeDisbursements } from '@inmate/trust/trustaccounts/beans/FreezeDisbursements';


export class FreezeDisbursementsCommitBean extends BaseModel{
    
    private _insertList: Array<FreezeDisbursements>;
    private _updateList: Array<FreezeDisbursements>;
    private _deleteList: Array<FreezeDisbursements>;
    
    get insertList(): Array<FreezeDisbursements> { return this._insertList; }    
    set insertList( insert: Array<FreezeDisbursements> ) { this._insertList = insert; }
    
    get updateList(): Array<FreezeDisbursements> { return this._updateList; }    
    set updateList( update: Array<FreezeDisbursements> ) { this._updateList = update; }
    
    get deleteList(): Array<FreezeDisbursements> { return this._deleteList; }
    set deleteList( pdeleteList: Array<FreezeDisbursements> ) { this._deleteList = pdeleteList; }

toJSON(): any {
    return {
        'insertList': this._insertList,
        'updateList': this._updateList,
        'deleteList': this._deleteList
    };
}
}