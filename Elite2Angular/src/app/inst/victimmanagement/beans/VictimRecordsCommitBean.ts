import { BaseModel } from '@commonbeans/BaseModel';
import { VictimRecords } from '@inst/victimmanagement/beans/VictimRecords';


export class VictimRecordsCommitBean extends BaseModel{
    
    private _insertList: Array<VictimRecords>;
    private _updateList: Array<VictimRecords>;
    
    get insertList(): Array<VictimRecords> { return this._insertList; }    
    set insertList( insert: Array<VictimRecords> ) { this._insertList = insert; }
    
    get updateList(): Array<VictimRecords> { return this._updateList; }    
    set updateList( update: Array<VictimRecords> ) { this._updateList = update; }
toJSON(): any {
    return {
        'insertList': this._insertList,
        'updateList': this._updateList,
    };
}
}