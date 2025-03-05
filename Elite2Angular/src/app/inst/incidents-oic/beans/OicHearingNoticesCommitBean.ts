/**
 * New typescript file
 */
import {BaseModel} from '@commonbeans/BaseModel';
import {OicHearingNotices} from '@instoicbeans/OicHearingNotices';

export class OicHearingNoticesCommitBean extends BaseModel {

    private _insertList: Array<OicHearingNotices>;
    private _deleteList: Array<OicHearingNotices>;
    private _updateList: Array<OicHearingNotices>;

    get insertList(): Array<OicHearingNotices> { return this._insertList; }

    set insertList(pinsertList: Array<OicHearingNotices>) { this._insertList = pinsertList; }

    get deleteList(): Array<OicHearingNotices> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OicHearingNotices>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OicHearingNotices> { return this._updateList; }

    set updateList(pupdateList: Array<OicHearingNotices>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}