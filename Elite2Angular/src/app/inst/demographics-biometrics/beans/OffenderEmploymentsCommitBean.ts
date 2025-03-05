import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderEmployments } from '@instdemographicsbeans/OffenderEmployments';

export class OffenderEmploymentsCommitBean extends BaseModel {

    private _insertList: Array<OffenderEmployments>;
    private _deleteList: Array<OffenderEmployments>;
    private _updateList: Array<OffenderEmployments>;

    get insertList(): Array<OffenderEmployments> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderEmployments>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderEmployments> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderEmployments>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderEmployments> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderEmployments>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
