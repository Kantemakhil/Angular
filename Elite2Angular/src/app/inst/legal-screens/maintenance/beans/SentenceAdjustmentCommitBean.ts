import { BaseModel } from '@commonbeans/BaseModel';
import { SentenceAdjustment } from '@inst/legal/beans/SentenceAdjustment';

export class SentenceAdjustmentCommitBean extends BaseModel {
    private _insertList: Array<SentenceAdjustment>;
    private _deleteList: Array<SentenceAdjustment>;
    private _updateList: Array<SentenceAdjustment>;

    get insertList(): Array<SentenceAdjustment> { return this._insertList; }

    set insertList( pinsertList: Array<SentenceAdjustment> ) { this._insertList = pinsertList; }

    get deleteList(): Array<SentenceAdjustment> { return this._deleteList; }

    set deleteList( pdeleteList: Array<SentenceAdjustment> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<SentenceAdjustment> { return this._updateList; }

    set updateList( pupdateList: Array<SentenceAdjustment> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
