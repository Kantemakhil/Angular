import { BaseModel } from '@commonbeans/BaseModel';
import { VOffenderVisits } from '@inst/visits-management/beans/VOffenderVisits';
import { VOffenderVisitVisitors } from '@inst/visits-management/beans/VOffenderVisitVisitors';
import { OffenderVisitVisitors } from '@inst/visits-management/beans/OffenderVisitVisitors';


export class VOffenderVisitsCommitBean extends BaseModel {

    private _insertList: Array<VOffenderVisits>;
    private _updateList: Array<VOffenderVisits>;
    private _deleteList: Array<VOffenderVisits>;
    private _vOffenderVisitVisitorsList: Array<VOffenderVisitVisitors>;
    private _offenderVisitVisitorsList: Array<OffenderVisitVisitors>;

    get insertList(): Array<VOffenderVisits> { return this._insertList; }
    set insertList( insert: Array<VOffenderVisits> ) { this._insertList = insert; }

    get vOffenderVisitVisitorsList(): Array<VOffenderVisitVisitors> { return this._vOffenderVisitVisitorsList; }
    set vOffenderVisitVisitorsList( insert: Array<VOffenderVisitVisitors> ) { this._vOffenderVisitVisitorsList = insert; }

    get offenderVisitVisitorsList(): Array<OffenderVisitVisitors> { return this._offenderVisitVisitorsList; }
    set offenderVisitVisitorsList( insert: Array<OffenderVisitVisitors> ) { this._offenderVisitVisitorsList = insert; }

    get updateList(): Array<VOffenderVisits> { return this._updateList; }
    set updateList( update: Array<VOffenderVisits> ) { this._updateList = update; }

    get deleteList(): Array<VOffenderVisits> { return this._deleteList; }
    set deleteList( pdeleteList: Array<VOffenderVisits> ) { this._deleteList = pdeleteList; }

toJSON(): any {
    return {
        'insertList': this._insertList,
        'updateList': this._updateList,
        'deleteList': this._deleteList,
        'vOffenderVisitVisitorsList': this._vOffenderVisitVisitorsList,
        'offenderVisitVisitorsList': this._offenderVisitVisitorsList
    };
}
}
