import { BaseModel } from "@common/beans/BaseModel";
import { OffenderPaymentPlans } from "./OffenderPaymentPlans";

export class OffenderPaymentPlanCommitBean extends BaseModel {
    private _insertList: Array<OffenderPaymentPlans>;
    private _deleteList: Array<OffenderPaymentPlans>;
    private _updateList: Array<OffenderPaymentPlans>;

    get insertList(): Array<OffenderPaymentPlans> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderPaymentPlans> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderPaymentPlans> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderPaymentPlans> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderPaymentPlans> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderPaymentPlans> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}