import { BaseModel } from '@commonbeans/BaseModel';
import { GroupedObligations } from './GroupedObligations';

// import { GroupedObligations } from '@inst/classification/beans/GroupedObligations';
// import { OffenderAssessments } from '@inst/classification/beans/OffenderAssessments';

export class GroupedObligationsCommitBean extends BaseModel {

    private _insertList: Array<GroupedObligations>;
    private _deleteList: Array<GroupedObligations>;
    private _updateList: Array<GroupedObligations>;

    get insertList(): Array<GroupedObligations> { return this._insertList; }

    set insertList(pinsertList: Array<GroupedObligations>) { this._insertList = pinsertList; }

    get deleteList(): Array<GroupedObligations> { return this._deleteList; }

    set deleteList(pdeleteList: Array<GroupedObligations>) { this._deleteList = pdeleteList; }

    get updateList(): Array<GroupedObligations> { return this._updateList; }

    set updateList(pupdateList: Array<GroupedObligations>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
