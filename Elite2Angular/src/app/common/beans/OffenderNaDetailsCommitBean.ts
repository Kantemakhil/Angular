import { BaseModel } from './BaseModel';
import { OffenderNaDetails } from '@commonbeans/OffenderNaDetails';

export class OffenderNaDetailsCommitBean extends BaseModel {

    private _insertList: Array<OffenderNaDetails>;
    private _deleteList: Array<OffenderNaDetails>;
    private _updateList: Array<OffenderNaDetails>;

    get insertList(): Array<OffenderNaDetails> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderNaDetails>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderNaDetails> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderNaDetails>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderNaDetails> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderNaDetails>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}