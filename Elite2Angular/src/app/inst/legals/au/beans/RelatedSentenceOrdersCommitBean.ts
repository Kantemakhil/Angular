import { BaseModel } from '@commonbeans/BaseModel';
import { RelatedSentenceOrders } from './RelatedSentenceOrders';
export class RelatedSentenceOrdersCommitBean extends BaseModel {
    private _insertList: Array<RelatedSentenceOrders>;
    private _deleteList: Array<RelatedSentenceOrders>;
    private _updateList: Array<RelatedSentenceOrders>;

    get insertList(): Array<RelatedSentenceOrders> { return this._insertList; }

    set insertList( pinsertList: Array<RelatedSentenceOrders> ) { this._insertList = pinsertList; }

    get deleteList(): Array<RelatedSentenceOrders> { return this._deleteList; }

    set deleteList( pdeleteList: Array<RelatedSentenceOrders> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<RelatedSentenceOrders> { return this._updateList; }

    set updateList( pupdateList: Array<RelatedSentenceOrders> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
