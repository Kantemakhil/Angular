import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderCaseConditions } from '@inst/casemanagement/beans/OffenderCaseConditions';


export class OffenderCaseConditionsCommitBean extends BaseModel {

    private _insertList: Array<OffenderCaseConditions>;
    private _deleteList: Array<OffenderCaseConditions>;
    private _updateList: Array<OffenderCaseConditions>;

    get insertList(): Array<OffenderCaseConditions> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderCaseConditions> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderCaseConditions> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderCaseConditions> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderCaseConditions> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderCaseConditions> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}