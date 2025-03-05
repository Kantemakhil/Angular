import {BaseModel} from '@commonbeans/BaseModel';
import { AgencyCountTypes } from '@inst/automated-counts/beans/AgencyCountTypes';
import { AgencyReportingLocs } from '@inst/automated-counts/maintenance/beans/AgencyReportingLocs';

export class AgencyCountTypesCommitBean extends BaseModel {

    private _insertList: Array<AgencyCountTypes>;
    private _deleteList: Array<AgencyCountTypes>;
    private _updateList: Array<AgencyCountTypes>;
    private _reportInsertList: Array<AgencyReportingLocs>;

    get insertList(): Array<AgencyCountTypes> { return this._insertList; }

    set insertList(pinsertList: Array<AgencyCountTypes>) { this._insertList = pinsertList; }

    get deleteList(): Array<AgencyCountTypes> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AgencyCountTypes>) { this._deleteList = pdeleteList; }

    get updateList(): Array<AgencyCountTypes> { return this._updateList; }

    set updateList(pupdateList: Array<AgencyCountTypes>) { this._updateList = pupdateList; }

    get reportInsertList(): Array<AgencyReportingLocs> { return this._reportInsertList; }

    set reportInsertList(preportInsertList: Array<AgencyReportingLocs>) { this._reportInsertList = preportInsertList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'reportInsertList': this._reportInsertList,
        };
    }
}
