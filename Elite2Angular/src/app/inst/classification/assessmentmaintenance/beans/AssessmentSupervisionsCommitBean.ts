import { BaseModel } from '@commonbeans/BaseModel';
import { AssessmentSupervisions } from './AssessmentSupervisions';


export class AssessmentSupervisionsCommitBean extends BaseModel {
    private _insertList: Array<AssessmentSupervisions>;
    private _deleteList: Array<AssessmentSupervisions>;
    private _updateList: Array<AssessmentSupervisions>;

    get insertList(): Array<AssessmentSupervisions> { return this._insertList; }

    set insertList( pinsertList: Array<AssessmentSupervisions> ) { this._insertList = pinsertList; }

    get deleteList(): Array<AssessmentSupervisions> { return this._deleteList; }

    set deleteList( pdeleteList: Array<AssessmentSupervisions> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<AssessmentSupervisions> { return this._updateList; }

    set updateList( pupdateList: Array<AssessmentSupervisions> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}