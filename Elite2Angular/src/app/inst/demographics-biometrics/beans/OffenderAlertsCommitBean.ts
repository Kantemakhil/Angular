import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderAlerts } from '@instdemographicsbeans/OffenderAlerts';

export class OffenderAlertsCommitBean extends BaseModel {
    private _insertList: Array<OffenderAlerts>;
    private _deleteList: Array<OffenderAlerts>;
    private _updateList: Array<OffenderAlerts>;

    get insertList(): Array<OffenderAlerts> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderAlerts> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderAlerts> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderAlerts> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderAlerts> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderAlerts> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
