import { BaseModel } from '@commonbeans/BaseModel';
import { VictimContactLogs } from '@inst/victimmanagement/beans/VictimContactLogs';


export class VictimContactLogsCommitBean extends BaseModel{
    
    private _insertList: Array<VictimContactLogs>;
    private _updateList: Array<VictimContactLogs>;
    
    get insertList(): Array<VictimContactLogs> { return this._insertList; }    
    set insertList( insert: Array<VictimContactLogs> ) { this._insertList = insert; }
    
    get updateList(): Array<VictimContactLogs> { return this._updateList; }    
    set updateList( update: Array<VictimContactLogs> ) { this._updateList = update; }
toJSON(): any {
    return {
        'insertList': this._insertList,
        'updateList': this._updateList,
    };
}
}