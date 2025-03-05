import { BaseModel } from "@common/beans/BaseModel";
import { AllowableOffenceTypes } from "./AllowableOffenceTypes";

export class AllowableOffenceTypesCommitBean extends BaseModel{
    private _insertList: Array<AllowableOffenceTypes>;
    private _deleteList: Array<AllowableOffenceTypes>;
    private _updateList: Array<AllowableOffenceTypes>;

    get insertList(): Array<AllowableOffenceTypes> { return this._insertList; }

    set insertList( pinsertList: Array<AllowableOffenceTypes> ) { this._insertList = pinsertList; }

    get deleteList(): Array<AllowableOffenceTypes> { return this._deleteList; }

    set deleteList( pdeleteList: Array<AllowableOffenceTypes> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<AllowableOffenceTypes> { return this._updateList; }

    set updateList( pupdateList: Array<AllowableOffenceTypes> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}