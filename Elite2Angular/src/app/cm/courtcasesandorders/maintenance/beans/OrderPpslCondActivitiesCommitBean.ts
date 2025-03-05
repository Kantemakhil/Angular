import { OrderPpslCondActivities } from "./OrderPpslCondActivities"

export class OrderPpslCondActivitiesCommitBean {
    private _insertList: OrderPpslCondActivities[] = []
    private _updateList: OrderPpslCondActivities[] = []
    private _deleteList: OrderPpslCondActivities[] = [];

    get insertList(): Array<OrderPpslCondActivities> { return this._insertList; }

    set insertList(pinsertList: Array<OrderPpslCondActivities>) { this._insertList = pinsertList; }

    get deleteList(): Array<OrderPpslCondActivities> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OrderPpslCondActivities>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OrderPpslCondActivities> { return this._updateList; }

    set updateList(pupdateList: Array<OrderPpslCondActivities>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

}
