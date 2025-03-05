import { BaseModel } from '@commonbeans/BaseModel';
import { AgencyLocationCounts } from '@automatedbeans/AgencyLocationCounts';

export class AgencyLocationCountsCommitBean extends BaseModel {

    private _insertList: Array<AgencyLocationCounts>;
    private _deleteList: Array<AgencyLocationCounts>;
    private _updateList: Array<AgencyLocationCounts>;

    get insertList(): Array<AgencyLocationCounts> { return this._insertList; }

    set insertList(pinsertList: Array<AgencyLocationCounts>) { this._insertList = pinsertList; }

    get deleteList(): Array<AgencyLocationCounts> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AgencyLocationCounts>) { this._deleteList = pdeleteList; }

    get updateList(): Array<AgencyLocationCounts> { return this._updateList; }

    set updateList(pupdateList: Array<AgencyLocationCounts>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
