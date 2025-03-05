import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderMilitaryTechSpecs } from '@instdemographicsbeans/OffenderMilitaryTechSpecs';

export class OffenderMilitaryTechSpecsCommitBean extends BaseModel {
    private _insertList: Array<OffenderMilitaryTechSpecs>;
    private _deleteList: Array<OffenderMilitaryTechSpecs>;
    private _updateList: Array<OffenderMilitaryTechSpecs>;

    get insertList(): Array<OffenderMilitaryTechSpecs> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderMilitaryTechSpecs> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderMilitaryTechSpecs> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderMilitaryTechSpecs> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderMilitaryTechSpecs> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderMilitaryTechSpecs> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
