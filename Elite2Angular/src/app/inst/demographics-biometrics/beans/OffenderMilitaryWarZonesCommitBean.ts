import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderMilitaryWarZones } from '@instdemographicsbeans/OffenderMilitaryWarZones';

export class OffenderMilitaryWarZonesCommitBean extends BaseModel {
    private _insertList: Array<OffenderMilitaryWarZones>;
    private _deleteList: Array<OffenderMilitaryWarZones>;
    private _updateList: Array<OffenderMilitaryWarZones>;

    get insertList(): Array<OffenderMilitaryWarZones> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderMilitaryWarZones> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderMilitaryWarZones> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderMilitaryWarZones> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderMilitaryWarZones> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderMilitaryWarZones> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
