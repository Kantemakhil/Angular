import { BaseModel } from '@commonbeans/BaseModel';
import { SentenceCalcTypes } from './SentenceCalcTypes';
export class SentenceCalcTypesCommitBean extends BaseModel {
    private _insertList: Array<SentenceCalcTypes>;
    private _deleteList: Array<SentenceCalcTypes>;
    private _updateList: Array<SentenceCalcTypes>;

    get insertList(): Array<SentenceCalcTypes> { return this._insertList; }

    set insertList( pinsertList: Array<SentenceCalcTypes> ) { this._insertList = pinsertList; }

    get deleteList(): Array<SentenceCalcTypes> { return this._deleteList; }

    set deleteList( pdeleteList: Array<SentenceCalcTypes> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<SentenceCalcTypes> { return this._updateList; }

    set updateList( pupdateList: Array<SentenceCalcTypes> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
