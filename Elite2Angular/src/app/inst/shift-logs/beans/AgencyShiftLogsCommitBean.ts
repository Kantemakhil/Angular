import { BaseModel } from '@commonbeans/BaseModel';
import { AgencyShiftLogs } from '@instshiftlogsbeans/AgencyShiftLogs';

export class AgencyShiftLogsCommitBean extends BaseModel {

    private _insertList: Array<AgencyShiftLogs>;
    private _deleteList: Array<AgencyShiftLogs>;
    private _updateList: Array<AgencyShiftLogs>;

    get insertList(): Array<AgencyShiftLogs> { return this._insertList; }

    set insertList(pinsertList: Array<AgencyShiftLogs>) { this._insertList = pinsertList; }

    get deleteList(): Array<AgencyShiftLogs> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AgencyShiftLogs>) { this._deleteList = pdeleteList; }

    get updateList(): Array<AgencyShiftLogs> { return this._updateList; }

    set updateList(pupdateList: Array<AgencyShiftLogs>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
