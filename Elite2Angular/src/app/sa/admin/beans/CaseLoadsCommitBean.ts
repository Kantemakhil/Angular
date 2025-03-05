import { BaseModel } from '@commonbeans/BaseModel';
import { CaseLoads } from '@commonbeans/CaseLoads';

export class CaseLoadsCommitBean extends BaseModel {
	
	private _insertList: Array<CaseLoads>;
    private _deleteList: Array<CaseLoads>;
    private _updateList: Array<CaseLoads>;

    get insertList(): Array<CaseLoads> { return this._insertList; }

    set insertList( pinsertList: Array<CaseLoads> ) { this._insertList = pinsertList; }

    get deleteList(): Array<CaseLoads> { return this._deleteList; }

    set deleteList( pdeleteList: Array<CaseLoads> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<CaseLoads> { return this._updateList; }

    set updateList( pupdateList: Array<CaseLoads> ) { this._updateList = pupdateList; }

toJSON(): any {
    return {
        'insertList': this._insertList,
        'deleteList': this._deleteList,
        'updateList': this._updateList
    };
}
}
