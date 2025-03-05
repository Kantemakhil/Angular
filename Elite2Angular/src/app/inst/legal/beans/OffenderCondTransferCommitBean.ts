import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderCondTransfer } from "../beans/OffenderCondTransfer";


export class OffenderCondTransferCommitBean extends BaseModel {
    private _insertList: Array<OffenderCondTransfer>;
    private _updateList: Array<OffenderCondTransfer>;
    private _deleteList: Array<OffenderCondTransfer>;

    get insertList(): Array<OffenderCondTransfer> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderCondTransfer> ) { this._insertList = pinsertList; }

    get updateList(): Array<OffenderCondTransfer> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderCondTransfer> ) { this._updateList = pupdateList; }
    
    get deleteList(): Array<OffenderCondTransfer> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderCondTransfer> ) { this._deleteList = pdeleteList; }
    

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList':this._deleteList,
        };
    }
}