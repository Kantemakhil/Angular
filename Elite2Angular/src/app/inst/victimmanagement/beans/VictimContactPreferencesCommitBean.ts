import { BaseModel } from '@commonbeans/BaseModel';
import { VictimContactPreferences } from '@inst/victimmanagement/beans/VictimContactPreferences';


export class VictimContactPreferencesCommitBean extends BaseModel{
    
    private _insertList: Array<VictimContactPreferences>;
    private _updateList: Array<VictimContactPreferences>;
    
    get insertList(): Array<VictimContactPreferences> { return this._insertList; }    
    set insertList( insert: Array<VictimContactPreferences> ) { this._insertList = insert; }
    
    get updateList(): Array<VictimContactPreferences> { return this._updateList; }    
    set updateList( update: Array<VictimContactPreferences> ) { this._updateList = update; }
toJSON(): any {
    return {
        'insertList': this._insertList,
        'updateList': this._updateList,
    };
}
}