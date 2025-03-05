import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderAssessments } from '@inst/classification/beans/OffenderAssessments';

export class OffenderAssessmentsCommitBean extends BaseModel {

    private _insertList: Array<OffenderAssessments>;
    private _deleteList: Array<OffenderAssessments>;
    private _updateList: Array<OffenderAssessments>;

    get insertList(): Array<OffenderAssessments> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderAssessments>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderAssessments> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderAssessments>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderAssessments> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderAssessments>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
