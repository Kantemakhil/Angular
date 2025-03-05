import {BaseModel} from '@commonbeans/BaseModel';
import { IncidentStaffReport } from '../beans/IncidentStaffReport';

export class IncidentStaffReportCommitBean extends BaseModel {

    private _insertList: Array<IncidentStaffReport>;
    private _deleteList: Array<IncidentStaffReport>;
    private _updateList: Array<IncidentStaffReport>;

    get insertList(): Array<IncidentStaffReport> { return this._insertList; }

    set insertList(pinsertList: Array<IncidentStaffReport>){ this._insertList = pinsertList; }

    get deleteList(): Array<IncidentStaffReport> { return this._deleteList; }

    set deleteList(pdeleteList: Array<IncidentStaffReport>){ this._deleteList = pdeleteList; }

    get updateList(): Array<IncidentStaffReport> { return this._updateList; }

    set updateList(pupdateList: Array<IncidentStaffReport>){ this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}