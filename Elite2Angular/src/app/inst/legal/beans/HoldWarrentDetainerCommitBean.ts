import { BaseModel } from '@commonbeans/BaseModel';
import { HoldWarrentDetainer } from "../beans/HoldWarrentDetainer";


export class HoldWarrentDetainerCommitBean extends BaseModel {
 
    private _insertList: Array<HoldWarrentDetainer>;
    private _updateList: Array<HoldWarrentDetainer>;
    private _deleteList: Array<HoldWarrentDetainer>;
   

    get insertList(): Array<HoldWarrentDetainer> { return this._insertList; }

    set insertList( pinsertList: Array<HoldWarrentDetainer> ) { this._insertList = pinsertList; }

    get updateList(): Array<HoldWarrentDetainer> { return this._updateList; }

    set updateList( pupdateList: Array<HoldWarrentDetainer> ) { this._updateList = pupdateList; }
    
    get deleteList(): Array<HoldWarrentDetainer> { return this._deleteList; }

    set deleteList( pdeleteList: Array<HoldWarrentDetainer> ) { this._deleteList = pdeleteList; }
    
  

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList,
        };
    }
}