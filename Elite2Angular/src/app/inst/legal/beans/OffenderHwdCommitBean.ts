import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderHwd } from "../beans/OffenderHwd";


export class OffenderHwdCommitBean extends BaseModel {
 
    private _insertList: Array<OffenderHwd>;
    private _updateList: Array<OffenderHwd>;
    private _deleteList: Array<OffenderHwd>;
   

    get insertList(): Array<OffenderHwd> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderHwd> ) { this._insertList = pinsertList; }

    get updateList(): Array<OffenderHwd> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderHwd> ) { this._updateList = pupdateList; }
    
    get deleteList(): Array<OffenderHwd> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderHwd> ) { this._deleteList = pdeleteList; }
    
  

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList,
        };
    }
}