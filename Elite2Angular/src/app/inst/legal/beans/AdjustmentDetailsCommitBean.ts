import { BaseModel } from '@commonbeans/BaseModel';
import { AdjustmentDetails } from "../beans/AdjustmentDetails";
import { SentenceAdjustment } from "../beans/SentenceAdjustment";


export class AdjustmentDetailsCommitBean extends BaseModel {
    private _insertList: Array<AdjustmentDetails>;
    private _updateList: Array<AdjustmentDetails>;
    private _selectedAdjustmentRecord: SentenceAdjustment;
    private _deleteList: Array<AdjustmentDetails>;

    get insertList(): Array<AdjustmentDetails> { return this._insertList; }

    set insertList( pinsertList: Array<AdjustmentDetails> ) { this._insertList = pinsertList; }

    get updateList(): Array<AdjustmentDetails> { return this._updateList; }

    set updateList( pupdateList: Array<AdjustmentDetails> ) { this._updateList = pupdateList; }
    
    get selectedAdjustmentRecord(): SentenceAdjustment { return this._selectedAdjustmentRecord; }

    set selectedAdjustmentRecord( selectedAdjustmentRecord: SentenceAdjustment ) { this._selectedAdjustmentRecord = selectedAdjustmentRecord; }

    get deleteList(): Array<AdjustmentDetails> { return this._deleteList; }

    set deleteList( pdeleteList: Array<AdjustmentDetails> ) { this._deleteList = pdeleteList; }
    
    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'selectedAdjustmentRecord':this._selectedAdjustmentRecord,
            'deleteList':this._deleteList,
        };
    }
}