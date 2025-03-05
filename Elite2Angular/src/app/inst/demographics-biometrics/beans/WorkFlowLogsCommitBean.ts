import { BaseModel } from '@commonbeans/BaseModel';
import { CasePlans } from '@inst/casemanagement/beans/CasePlans';
import { WorkFlowLogs } from '@instdemographicsbeans/WorkFlowLogs';

export class WorkFlowLogsCommitBean extends BaseModel {
    private _insertList: Array<WorkFlowLogs>;
    private _deleteList: Array<WorkFlowLogs>;
    private _updateList: Array<WorkFlowLogs>;
    private _updateNextReviewDate: CasePlans;
    public get updateNextReviewDate(): CasePlans {
        return this._updateNextReviewDate;
    }
    public set updateNextReviewDate(value: CasePlans) {
        this._updateNextReviewDate = value;
    }

    get insertList(): Array<WorkFlowLogs> { return this._insertList; }

    set insertList( pinsertList: Array<WorkFlowLogs> ) { this._insertList = pinsertList; }

    get deleteList(): Array<WorkFlowLogs> { return this._deleteList; }

    set deleteList( pdeleteList: Array<WorkFlowLogs> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<WorkFlowLogs> { return this._updateList; }

    set updateList( pupdateList: Array<WorkFlowLogs> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'updateNextReviewDate':this._updateNextReviewDate
        };
    }
}
