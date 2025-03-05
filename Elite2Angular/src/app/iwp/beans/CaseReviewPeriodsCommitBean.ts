import { BaseModel } from "@common/beans/BaseModel";
import { CaseReviewPeriods } from "./CaseReviewPeriods";

export class CaseReviewPeriodsCommitBean extends BaseModel {
    private _deleteList: Array<CaseReviewPeriods>;
    private _insertList: Array<CaseReviewPeriods>;
    private _updateList: Array<CaseReviewPeriods>;

    get deleteList(): Array<CaseReviewPeriods> { return this._deleteList; }
    set deleteList(pdeleteList: Array<CaseReviewPeriods>) { this._deleteList = pdeleteList; }
    get insertList(): Array<CaseReviewPeriods> { return this._insertList; }
    set insertList(pinsertList: Array<CaseReviewPeriods>) { this._insertList = pinsertList; }
    get updateList(): Array<CaseReviewPeriods> { return this._updateList; }
    set updateList(pupdateList: Array<CaseReviewPeriods>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}