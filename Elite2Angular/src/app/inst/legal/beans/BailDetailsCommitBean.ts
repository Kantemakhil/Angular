import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderBailDetails } from "../beans/OffenderBailDetails";

export class BailDetailsCommitBean extends BaseModel {
    
    private _insertList: Array<OffenderBailDetails>;
    private _updateList: Array<OffenderBailDetails>;
    private _deleteList: Array<OffenderBailDetails>;

    get insertList(): Array<OffenderBailDetails> { return this._insertList; }    
    set insertList( insert: Array<OffenderBailDetails> ) { this._insertList = insert; }
    
    get updateList(): Array<OffenderBailDetails> { return this._updateList; }    
    set updateList( update: Array<OffenderBailDetails> ) { this._updateList = update; }
    
    get deleteList(): Array<OffenderBailDetails> { return this._deleteList; }
    set deleteList( pdeleteList: Array<OffenderBailDetails> ) { this._deleteList = pdeleteList; }
    
    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList
        };
    }
   
}