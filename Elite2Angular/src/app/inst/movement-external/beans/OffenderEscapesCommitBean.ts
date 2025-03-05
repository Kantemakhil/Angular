import {BaseModel} from '@commonbeans/BaseModel';
import {OffenderEscapes} from '@instmovementexternalbeans/OffenderEscapes';

export class OffenderEscapesCommitBean extends BaseModel {

    private _insertList: Array<OffenderEscapes>;
    private _deleteList: Array<OffenderEscapes>;
    private _updateList: Array<OffenderEscapes>;

    get insertList(): Array<OffenderEscapes> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderEscapes>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderEscapes> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderEscapes>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderEscapes> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderEscapes>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
