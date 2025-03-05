import { BaseModel } from '@commonbeans/BaseModel';
import { VictimLinkedOffenders } from '@inst/victimmanagement/beans/VictimLinkedOffenders';


export class VictimLinkedOffendersCommitBean extends BaseModel{
    
    private _insertList: Array<VictimLinkedOffenders>;
    private _updateList: Array<VictimLinkedOffenders>;
    
    get insertList(): Array<VictimLinkedOffenders> { return this._insertList; }    
    set insertList( insert: Array<VictimLinkedOffenders> ) { this._insertList = insert; }
    
    get updateList(): Array<VictimLinkedOffenders> { return this._updateList; }    
    set updateList( update: Array<VictimLinkedOffenders> ) { this._updateList = update; }
toJSON(): any {
    return {
        'insertList': this._insertList,
        'updateList': this._updateList,
    };
}
}