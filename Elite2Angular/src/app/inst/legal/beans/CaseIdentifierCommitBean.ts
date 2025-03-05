import { BaseModel } from '@commonbeans/BaseModel';
import { CaseIdentifiers } from "../beans/CaseIdentifiers";

export class CaseIdentifierCommitBean extends BaseModel {
    
    private _insertList: Array<CaseIdentifiers>;
    private _updateList: Array<CaseIdentifiers>;
    private _deleteList: Array<CaseIdentifiers>;

    get insertList(): Array<CaseIdentifiers> { return this._insertList; }
    set insertList( pinsertList: Array<CaseIdentifiers> ) { this._insertList = pinsertList; }
    
    get updateList(): Array<CaseIdentifiers> { return this._updateList; }
    set updateList( pupdateList: Array<CaseIdentifiers> ) { this._updateList = pupdateList; }
    
    get deleteList(): Array<CaseIdentifiers> { return this._deleteList; }
    set deleteList( pdeleteList: Array<CaseIdentifiers> ) { this._deleteList = pdeleteList; }
    
    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList
        };
    }

}