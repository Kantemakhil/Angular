import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderCriminogenicNeeds } from '@inst/casemanagement/beans/OffenderCriminogenicNeeds';


export class OffenderCriminogenicNeedsCommitBean extends BaseModel {

    private _insertList: Array<OffenderCriminogenicNeeds>;
    private _deleteList: Array<OffenderCriminogenicNeeds>;
    private _updateList: Array<OffenderCriminogenicNeeds>;

    get insertList(): Array<OffenderCriminogenicNeeds> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderCriminogenicNeeds> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderCriminogenicNeeds> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderCriminogenicNeeds> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderCriminogenicNeeds> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderCriminogenicNeeds> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}