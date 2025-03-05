import { BaseModel } from '@commonbeans/BaseModel';
import { OrderTypes } from './OrderTypes';

export class OrderTypesCommitBean extends BaseModel {

    private _insertList: Array<OrderTypes>;
    private _deleteList: Array<OrderTypes>;
    private _updateList: Array<OrderTypes>;

    get insertList(): Array<OrderTypes> { return this._insertList; }

    set insertList(pinsertList: Array<OrderTypes>) { this._insertList = pinsertList; }

    get deleteList(): Array<OrderTypes> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OrderTypes>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OrderTypes> { return this._updateList; }

    set updateList(pupdateList: Array<OrderTypes>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
