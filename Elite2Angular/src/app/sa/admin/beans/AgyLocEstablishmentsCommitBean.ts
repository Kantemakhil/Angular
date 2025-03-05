import {BaseModel} from '@commonbeans/BaseModel';
import {AgyLocEstablishments} from './AgyLocEstablishments';

export class AgyLocEstablishmentsCommitBean extends BaseModel {

    private _insertList: Array<AgyLocEstablishments>;
    private _deleteList: Array<AgyLocEstablishments>;
    private _updateList: Array<AgyLocEstablishments>;

    get insertList(): Array<AgyLocEstablishments> { return this._insertList; }

    set insertList(pinsertList: Array<AgyLocEstablishments>) { this._insertList = pinsertList; }

    get deleteList(): Array<AgyLocEstablishments> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AgyLocEstablishments>) { this._deleteList = pdeleteList; }

    get updateList(): Array<AgyLocEstablishments> { return this._updateList; }

    set updateList(pupdateList: Array<AgyLocEstablishments>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
