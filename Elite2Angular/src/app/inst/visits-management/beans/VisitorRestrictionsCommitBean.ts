import { BaseModel } from '@commonbeans/BaseModel';
import { VisitorRestrictions } from '@inst/visits-management/beans/VisitorRestrictions';

export class VisitorRestrictionsCommitBean extends BaseModel {
    private _insertList: Array<VisitorRestrictions>;
    private _deleteList: Array<VisitorRestrictions>;
    private _updateList: Array<VisitorRestrictions>;

    get insertList(): Array<VisitorRestrictions> { return this._insertList; }

    set insertList( pinsertList: Array<VisitorRestrictions> ) { this._insertList = pinsertList; }

    get deleteList(): Array<VisitorRestrictions> { return this._deleteList; }

    set deleteList( pdeleteList: Array<VisitorRestrictions> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<VisitorRestrictions> { return this._updateList; }

    set updateList( pupdateList: Array<VisitorRestrictions> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
