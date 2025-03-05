import { BaseModel } from '@commonbeans/BaseModel';
import { VTransferWaitingLists2 } from '@inst/movement-external/beans/VTransferWaitingLists2';

export class VTransferWaitingLists2CommitBean extends BaseModel {

    private _insertList: Array<VTransferWaitingLists2>;
    private _deleteList: Array<VTransferWaitingLists2>;
    private _updateList: Array<VTransferWaitingLists2>;

    get insertList(): Array<VTransferWaitingLists2> { return this._insertList; }

    set insertList( pinsertList: Array<VTransferWaitingLists2> ) { this._insertList = pinsertList; }

    get deleteList(): Array<VTransferWaitingLists2> { return this._deleteList; }

    set deleteList( pdeleteList: Array<VTransferWaitingLists2> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<VTransferWaitingLists2> { return this._updateList; }

    set updateList( pupdateList: Array<VTransferWaitingLists2> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}