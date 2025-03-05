import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderSentConditionsHty } from '../beans/OffenderSentConditionsHty';

export class OffenderSentConditionsHtyCommitBean extends BaseModel {

    private _insertList: Array<OffenderSentConditionsHty>;
    private _updateList: Array<OffenderSentConditionsHty>;
    private _deleteList: Array<OffenderSentConditionsHty>;

    get insertList(): Array<OffenderSentConditionsHty> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderSentConditionsHty> ) { this._insertList = pinsertList; }

    get updateList(): Array<OffenderSentConditionsHty> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderSentConditionsHty> ) { this._updateList = pupdateList; }

    get deleteList(): Array<OffenderSentConditionsHty> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderSentConditionsHty> ) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList,
        };
    }
}