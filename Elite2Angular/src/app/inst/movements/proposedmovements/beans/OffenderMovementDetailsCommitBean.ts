import { OffenderMovementDetails } from './OffenderMovementDetails';

export class OffenderMovementDetailsCommitBean{


    private _insertList: Array<OffenderMovementDetails>;
    private _deleteList: Array<OffenderMovementDetails>;
    private _updateList: Array<OffenderMovementDetails>;

    get insertList(): Array<OffenderMovementDetails> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderMovementDetails>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderMovementDetails> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderMovementDetails>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderMovementDetails> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderMovementDetails>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }


}