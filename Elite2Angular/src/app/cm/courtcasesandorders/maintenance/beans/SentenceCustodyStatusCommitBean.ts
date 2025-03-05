import { BaseModel } from '@commonbeans/BaseModel';
import { SentenceCustodyStatus } from './SentenceCustodyStatus';
export class SentenceCustodyStatusCommitBean extends BaseModel {
    private _insertList: Array<SentenceCustodyStatus>;
    private _deleteList: Array<SentenceCustodyStatus>;
    private _updateList: Array<SentenceCustodyStatus>;

    get insertList(): Array<SentenceCustodyStatus> { return this._insertList; }

    set insertList( pinsertList: Array<SentenceCustodyStatus> ) { this._insertList = pinsertList; }

    get deleteList(): Array<SentenceCustodyStatus> { return this._deleteList; }

    set deleteList( pdeleteList: Array<SentenceCustodyStatus> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<SentenceCustodyStatus> { return this._updateList; }

    set updateList( pupdateList: Array<SentenceCustodyStatus> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
