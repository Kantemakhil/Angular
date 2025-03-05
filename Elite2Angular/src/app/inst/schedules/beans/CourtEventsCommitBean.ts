import {BaseModel} from '@commonbeans/BaseModel';
import {CourtEvents} from '@instschedulebeans/CourtEvents';

export class CourtEventsCommitBean extends BaseModel {

    private _insertList: Array<CourtEvents>;
    private _deleteList: Array<CourtEvents>;
    private _updateList: Array<CourtEvents>;
    private _insertAndUpdateList: Array<CourtEvents>;


    public get insertAndUpdateList(): Array<CourtEvents> {
        return this._insertAndUpdateList;
    }
    public set insertAndUpdateList(value: Array<CourtEvents>) {
        this._insertAndUpdateList = value;
    }

    get insertList(): Array<CourtEvents> { return this._insertList; }

    set insertList(pinsertList: Array<CourtEvents>) { this._insertList = pinsertList; }

    get deleteList(): Array<CourtEvents> { return this._deleteList; }

    set deleteList(pdeleteList: Array<CourtEvents>) { this._deleteList = pdeleteList; }

    get updateList(): Array<CourtEvents> { return this._updateList; }

    set updateList(pupdateList: Array<CourtEvents>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'insertAndUpdateList':this._insertAndUpdateList
        };
    }
}
