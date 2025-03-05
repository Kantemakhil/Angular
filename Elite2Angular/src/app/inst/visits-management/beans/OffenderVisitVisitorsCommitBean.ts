import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderVisitVisitors } from '@inst/visits-management/beans/OffenderVisitVisitors';


export class OffenderVisitVisitorsCommitBean extends BaseModel{
    
    private _insertList: Array<OffenderVisitVisitors>;
    private _updateList: Array<OffenderVisitVisitors>;
    private _deleteList: Array<OffenderVisitVisitors>;
    
    get insertList(): Array<OffenderVisitVisitors> { return this._insertList; }    
    set insertList( insert: Array<OffenderVisitVisitors> ) { this._insertList = insert; }
    
    get updateList(): Array<OffenderVisitVisitors> { return this._updateList; }    
    set updateList( update: Array<OffenderVisitVisitors> ) { this._updateList = update; }
    
    get deleteList(): Array<OffenderVisitVisitors> { return this._deleteList; }
    set deleteList( pdeleteList: Array<OffenderVisitVisitors> ) { this._deleteList = pdeleteList; }

toJSON(): any {
    return {
        'insertList': this._insertList,
        'updateList': this._updateList,
        'deleteList': this._deleteList
    };
}
}