import { Orders } from "./Orders";

export class OrdersCommitBean {
    private _updateList: Orders[] = [];
    private _insertList: Orders[] = [];

    get insertList(): Orders[] { return this._insertList; }

    set insertList(value: Orders[]) { this._insertList = value; }

    get updateList(): Array<Orders> { return this._updateList; }

    set updateList(pupdateList: Array<Orders>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'updateList': this._updateList,
            'insertList': this._insertList
        };
    }
}