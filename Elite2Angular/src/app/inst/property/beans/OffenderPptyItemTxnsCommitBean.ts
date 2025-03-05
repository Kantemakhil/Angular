import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderPptyItemTxns } from '@instproperty/OffenderPptyItemTxns';

export class OffenderPptyItemTxnsCommitBean extends BaseModel {

    private _insertList: Array<OffenderPptyItemTxns>;
    private _deleteList: Array<OffenderPptyItemTxns>;
    private _updateList: Array<OffenderPptyItemTxns>;

    get insertList(): Array<OffenderPptyItemTxns> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderPptyItemTxns> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderPptyItemTxns> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderPptyItemTxns> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderPptyItemTxns> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderPptyItemTxns> ) { this._updateList = pupdateList; }


    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}