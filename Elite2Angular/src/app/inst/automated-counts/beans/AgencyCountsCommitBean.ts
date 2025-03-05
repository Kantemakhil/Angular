import { BaseModel } from '@commonbeans/BaseModel';
import { AgencyCounts } from '@automatedbeans/AgencyCounts';

export class AgencyCountsCommitBean extends BaseModel {

    private _insertList: Array<AgencyCounts>;
    private _deleteList: Array<AgencyCounts>;
    private _updateList: Array<AgencyCounts>;

    get insertList(): Array<AgencyCounts> { return this._insertList; }

    set insertList(pinsertList: Array<AgencyCounts>) { this._insertList = pinsertList; }

    get deleteList(): Array<AgencyCounts> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AgencyCounts>) { this._deleteList = pdeleteList; }

    get updateList(): Array<AgencyCounts> { return this._updateList; }

    set updateList(pupdateList: Array<AgencyCounts>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
