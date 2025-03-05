import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderCipDetails } from '@instcareinplacementbeans/OffenderCipDetails';

export class OffenderCipDetailsCommitBean extends BaseModel {

    private _insertList: Array<OffenderCipDetails>;
    private _deleteList: Array<OffenderCipDetails>;
    private _updateList: Array<OffenderCipDetails>;

    get insertList(): Array<OffenderCipDetails> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderCipDetails>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderCipDetails> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderCipDetails>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderCipDetails> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderCipDetails>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
