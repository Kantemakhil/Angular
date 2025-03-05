import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderHwdHty } from "../beans/OffenderHwdHty";

export class OffenderHwdHtyCommitBean extends BaseModel{
    
    private _insertList: Array<OffenderHwdHty>;
    private _updateList: Array<OffenderHwdHty>;
    private _deleteList: Array<OffenderHwdHty>;


    get insertList(): Array<OffenderHwdHty> { return this._insertList; }
    
    set insertList( pinsertList: Array<OffenderHwdHty> ) { this._insertList = pinsertList; }
    
    get updateList(): Array<OffenderHwdHty> { return this._updateList; }
    
    set updateList( pupdateList: Array<OffenderHwdHty> ) { this._updateList = pupdateList; }
    
    get deleteList(): Array<OffenderHwdHty> { return this._deleteList; }
    
    set deleteList( pdeleteList: Array<OffenderHwdHty> ) { this._deleteList = pdeleteList; }



toJSON(): any {
    return {
        'insertList': this._insertList,
        'updateList': this._updateList,
        'deleteList': this._deleteList,
    };
}
}