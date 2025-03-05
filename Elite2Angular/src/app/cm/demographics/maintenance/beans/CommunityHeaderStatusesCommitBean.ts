import { BaseModel } from '@commonbeans/BaseModel';
import { CommunityHeaderStatuses } from '@cmdemographics/maintenance/beans/CommunityHeaderStatuses';
export class CommunityHeaderStatusesCommitBean extends BaseModel {
    private _insertList: Array<CommunityHeaderStatuses>;
    private _deleteList: Array<CommunityHeaderStatuses>;
    private _updateList: Array<CommunityHeaderStatuses>;
    get insertList(): Array<CommunityHeaderStatuses> { return this._insertList; }

    set insertList(pinsertList: Array<CommunityHeaderStatuses>) { this._insertList = pinsertList; }

    get deleteList(): Array<CommunityHeaderStatuses> { return this._deleteList; }

    set deleteList(pdeleteList: Array<CommunityHeaderStatuses>) { this._deleteList = pdeleteList; }

    get updateList(): Array<CommunityHeaderStatuses> { return this._updateList; }

    set updateList(pupdateList: Array<CommunityHeaderStatuses>) { this._updateList = pupdateList; }


    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}