import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderHwdCharges } from "../beans/OffenderHwdCharges";


export class OffenderHwdChargesCommitBean extends BaseModel {
 
    private _insertList: Array<OffenderHwdCharges>;
    private _updateList: Array<OffenderHwdCharges>;
    private _deleteList: Array<OffenderHwdCharges>;
   

    get insertList(): Array<OffenderHwdCharges> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderHwdCharges> ) { this._insertList = pinsertList; }

    get updateList(): Array<OffenderHwdCharges> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderHwdCharges> ) { this._updateList = pupdateList; }
    
    get deleteList(): Array<OffenderHwdCharges> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderHwdCharges> ) { this._deleteList = pdeleteList; }
    
  

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList,
        };
    }
}