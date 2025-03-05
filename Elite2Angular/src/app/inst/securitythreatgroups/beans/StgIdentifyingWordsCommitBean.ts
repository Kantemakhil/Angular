
import { BaseModel } from '@commonbeans/BaseModel';
import { StgIdentifyingWords } from '@instSecurityThreatGroupsbeans/StgIdentifyingWords';
export class StgIdentifyingWordsCommitBean extends BaseModel {

    private _insertList: Array<StgIdentifyingWords>;
    private _deleteList: Array<StgIdentifyingWords>;
    private _updateList: Array<StgIdentifyingWords>;

    get insertList(): Array<StgIdentifyingWords> { return this._insertList; }

    set insertList(pinsertList: Array<StgIdentifyingWords>) { this._insertList = pinsertList; }

    get deleteList(): Array<StgIdentifyingWords> { return this._deleteList; }

    set deleteList(pdeleteList: Array<StgIdentifyingWords>) { this._deleteList = pdeleteList; }

    get updateList(): Array<StgIdentifyingWords> { return this._updateList; }

    set updateList(pupdateList: Array<StgIdentifyingWords>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
