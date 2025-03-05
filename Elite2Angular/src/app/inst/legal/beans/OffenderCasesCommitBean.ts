import { BaseModel } from '@commonbeans/BaseModel';
import { CourtCase } from "../beans/CourtCase";


export class OffenderCasesCommitBean extends BaseModel {
    private _insertList: Array<CourtCase>;
    private _updateList: Array<CourtCase>;
    private _deleteList: Array<CourtCase>;

    get insertList(): Array<CourtCase> { return this._insertList; }

    set insertList( pinsertList: Array<CourtCase> ) { this._insertList = pinsertList; }

    get updateList(): Array<CourtCase> { return this._updateList; }

    set updateList( pupdateList: Array<CourtCase> ) { this._updateList = pupdateList; }
    
    get deleteList(): Array<CourtCase> { return this._deleteList; }

    set deleteList( pdeleteList: Array<CourtCase> ) { this._deleteList = pdeleteList; }
    

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList':this._deleteList,
        };
    }
}