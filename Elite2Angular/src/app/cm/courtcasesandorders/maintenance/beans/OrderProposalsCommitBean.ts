import { OrderProposals } from "./OrderProposals";

export class OrderProposalsCommitBean {
    private _insertList: OrderProposals[] = [];

    private _updateList: OrderProposals[] = [];

    private _deleteList: OrderProposals[] = [];

    get insertList(): Array<OrderProposals> { return this._insertList; }

    set insertList(pinsertList: Array<OrderProposals>) { this._insertList = pinsertList; }

    get deleteList(): Array<OrderProposals> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OrderProposals>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OrderProposals> { return this._updateList; }

    set updateList(pupdateList: Array<OrderProposals>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}