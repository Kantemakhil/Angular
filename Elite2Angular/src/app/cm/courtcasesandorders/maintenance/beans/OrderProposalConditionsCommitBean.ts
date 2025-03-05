import { OrderProposalConditions } from "./OrderProposalConditions"

export class OrderProposalConditionsCommitBean {

    private _insertList: Array<OrderProposalConditions>;
    private _deleteList: Array<OrderProposalConditions>;
    private _updateList: Array<OrderProposalConditions>;

    get insertList(): Array<OrderProposalConditions> { return this._insertList; }

    set insertList(pinsertList: Array<OrderProposalConditions>) { this._insertList = pinsertList; }

    get deleteList(): Array<OrderProposalConditions> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OrderProposalConditions>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OrderProposalConditions> { return this._updateList; }

    set updateList(pupdateList: Array<OrderProposalConditions>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

}