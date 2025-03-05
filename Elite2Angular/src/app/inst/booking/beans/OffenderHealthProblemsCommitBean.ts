import { OffenderHealthProblems } from "./OffenderHealthProblems";

export class OffenderHealthProblemsCommitBean {

    private _insertList: Array<OffenderHealthProblems>;
    private _deleteList: Array<OffenderHealthProblems>;
    private _updateList: Array<OffenderHealthProblems>;

    get insertList(): Array<OffenderHealthProblems> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderHealthProblems>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderHealthProblems> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderHealthProblems>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderHealthProblems> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderHealthProblems>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
    
}