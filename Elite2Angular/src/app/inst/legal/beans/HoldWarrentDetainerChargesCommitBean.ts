import { BaseModel } from '@commonbeans/BaseModel';
import { Charges } from "../beans/Charges";


export class HoldWarrentDetainerChargesCommitBean extends BaseModel {
 
    private _insertList: Array<Charges>;
    private _updateList: Array<Charges>;
    private _deleteList: Array<Charges>;
   

    get insertList(): Array<Charges> { return this._insertList; }

    set insertList( pinsertList: Array<Charges> ) { this._insertList = pinsertList; }

    get updateList(): Array<Charges> { return this._updateList; }

    set updateList( pupdateList: Array<Charges> ) { this._updateList = pupdateList; }
    
    get deleteList(): Array<Charges> { return this._deleteList; }

    set deleteList( pdeleteList: Array<Charges> ) { this._deleteList = pdeleteList; }
    
  

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList,
        };
    }
}