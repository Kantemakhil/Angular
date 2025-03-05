import { BaseModel } from './BaseModel';
import { OffenderNonAssociations } from '@commonbeans/OffenderNonAssociations';
import { OffenderNaDetails } from './OffenderNaDetails';

export class OffenderNonAssociationsCommitBean extends BaseModel {

    private _insertList: Array<OffenderNonAssociations>;
    private _deleteList: Array<OffenderNonAssociations>;
    private _updateList: Array<OffenderNonAssociations>;

    private _offNadInsertList: Array<OffenderNaDetails>;
    private _offNadUdateList: Array<OffenderNaDetails>;

    get offNadInsertList(): Array<OffenderNaDetails> { return this._offNadInsertList; }

    set offNadInsertList(poffNadInsertList: Array<OffenderNaDetails>) { this._offNadInsertList = poffNadInsertList; }

    get offNadUdateList(): Array<OffenderNaDetails> { return this._offNadUdateList; }

    set offNadUdateList(poffNadUdateList: Array<OffenderNaDetails>) { this._offNadUdateList = poffNadUdateList; }

    get insertList(): Array<OffenderNonAssociations> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderNonAssociations>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderNonAssociations> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderNonAssociations>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderNonAssociations> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderNonAssociations>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'offNadInsertList': this._offNadInsertList,
            'offNadUdateList': this._offNadUdateList
        };
    }
}