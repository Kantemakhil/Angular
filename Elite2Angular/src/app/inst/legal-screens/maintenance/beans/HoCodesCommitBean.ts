import { BaseModel } from '@commonbeans/BaseModel';
import { HoCodes } from './HoCodes';

export class HoCodesCommitBean extends BaseModel {
    private _insertList: Array<HoCodes>;
    private _deleteList: Array<HoCodes>;
    private _updateList: Array<HoCodes>;

    get insertList(): Array<HoCodes> { return this._insertList; }

    set insertList( pinsertList: Array<HoCodes> ) { this._insertList = pinsertList; }

    get deleteList(): Array<HoCodes> { return this._deleteList; }

    set deleteList( pdeleteList: Array<HoCodes> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<HoCodes> { return this._updateList; }

    set updateList( pupdateList: Array<HoCodes> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
