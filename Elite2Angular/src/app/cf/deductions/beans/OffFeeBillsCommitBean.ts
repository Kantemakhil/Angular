import { BaseModel } from '@commonbeans/BaseModel';
import { OffFeeBills } from './OffFeeBills';

export class OffFeeBillsCommitBean extends BaseModel {

    private _insertList: Array<OffFeeBills>;
    private _deleteList: Array<OffFeeBills>;
    private _updateList: Array<OffFeeBills>;

    get insertList(): Array<OffFeeBills> { return this._insertList; }

    set insertList(pinsertList: Array<OffFeeBills>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffFeeBills> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffFeeBills>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffFeeBills> { return this._updateList; }

    set updateList(pupdateList: Array<OffFeeBills>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
