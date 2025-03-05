import {BaseModel} from '@commonbeans/BaseModel';
import {AddressUsages} from './AddressUsages';

export class AddressUsagesCommitBean extends BaseModel {

    private _insertList: Array<AddressUsages>;
    private _deleteList: Array<AddressUsages>;
    private _updateList: Array<AddressUsages>;

    get insertList(): Array<AddressUsages> { return this._insertList; }

    set insertList(pinsertList: Array<AddressUsages>) { this._insertList = pinsertList; }

    get deleteList(): Array<AddressUsages> { return this._deleteList; }

    set deleteList(pdeleteList: Array<AddressUsages>) { this._deleteList = pdeleteList; }

    get updateList(): Array<AddressUsages> { return this._updateList; }

    set updateList(pupdateList: Array<AddressUsages>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
