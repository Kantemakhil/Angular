import {BaseModel} from '@commonbeans/BaseModel';
import {OffenderIndSchWaitLists} from '@instschedulebeans/OffenderIndSchWaitLists';

export class OffenderIndSchWaitListsCommitBean extends BaseModel {

    private _insertList: Array<OffenderIndSchWaitLists>;
    private _deleteList: Array<OffenderIndSchWaitLists>;
    private _updateList: Array<OffenderIndSchWaitLists>;

    get insertList(): Array<OffenderIndSchWaitLists> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderIndSchWaitLists>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderIndSchWaitLists> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderIndSchWaitLists>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderIndSchWaitLists> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderIndSchWaitLists>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
