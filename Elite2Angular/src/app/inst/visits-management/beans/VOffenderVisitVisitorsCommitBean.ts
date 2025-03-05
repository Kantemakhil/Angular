import { BaseModel } from '@commonbeans/BaseModel';
import { VOffenderVisitVisitors } from '@inst/visits-management/beans/VOffenderVisitVisitors';


export class VOffenderVisitVisitorsCommitBean extends BaseModel{
    
    private _insertList: Array<VOffenderVisitVisitors>;
    private _updateList: Array<VOffenderVisitVisitors>;
    private _deleteList: Array<VOffenderVisitVisitors>;
    
    get insertList(): Array<VOffenderVisitVisitors> { return this._insertList; }    
    set insertList( insert: Array<VOffenderVisitVisitors> ) { this._insertList = insert; }
    
    get updateList(): Array<VOffenderVisitVisitors> { return this._updateList; }    
    set updateList( update: Array<VOffenderVisitVisitors> ) { this._updateList = update; }
    
    get deleteList(): Array<VOffenderVisitVisitors> { return this._deleteList; }
    set deleteList( pdeleteList: Array<VOffenderVisitVisitors> ) { this._deleteList = pdeleteList; }

toJSON(): any {
    return {
        'insertList': this._insertList,
        'updateList': this._updateList,
        'deleteList': this._deleteList
    };
}
}