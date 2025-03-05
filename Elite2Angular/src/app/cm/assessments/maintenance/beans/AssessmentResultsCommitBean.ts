import { BaseModel } from '@commonbeans/BaseModel';
import { AssessmentResults } from '@cm/assessments/maintenance/beans/AssessmentResults';
// import { AssessmentResults } from '@inst/classification/beans/AssessmentResults';
// import { OffenderAssessments } from '@inst/classification/beans/OffenderAssessments';

export class AssessmentResultsCommitBean extends BaseModel {

    private _insertList: Array<AssessmentResults>;
    private _deleteList: Array<AssessmentResults>;
    private _updateList: Array<AssessmentResults>;

    get insertList(): Array<AssessmentResults> { return this._insertList; }

    set insertList(pinsertList: Array<AssessmentResults>) { this._insertList = pinsertList; }

    get deleteList(): Array<AssessmentResults> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AssessmentResults>) { this._deleteList = pdeleteList; }

    get updateList(): Array<AssessmentResults> { return this._updateList; }

    set updateList(pupdateList: Array<AssessmentResults>) { this._updateList = pupdateList; }
    
    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
