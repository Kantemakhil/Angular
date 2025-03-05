import {BaseModel} from '@commonbeans/BaseModel';
import { AgencyReportingLocs } from '@inst/automated-counts/maintenance/beans/AgencyReportingLocs';

export class AgencyReportingLocsCommitBean extends BaseModel {

    private _insertList: Array<AgencyReportingLocs>;
    private _deleteList: Array<AgencyReportingLocs>;
    private _updateList: Array<AgencyReportingLocs>;

    get insertList(): Array<AgencyReportingLocs> { return this._insertList; }

    set insertList(pinsertList: Array<AgencyReportingLocs>) { this._insertList = pinsertList; }

    get deleteList(): Array<AgencyReportingLocs> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AgencyReportingLocs>) { this._deleteList = pdeleteList; }

    get updateList(): Array<AgencyReportingLocs> { return this._updateList; }

    set updateList(pupdateList: Array<AgencyReportingLocs>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
