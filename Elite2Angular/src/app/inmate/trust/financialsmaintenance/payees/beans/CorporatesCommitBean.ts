import { BaseModel } from "@commonbeans/BaseModel";
import { Corporates } from "@inmate/trust/trustaccounts/beans/Corporates";

export class CorporatesCommitBean extends BaseModel {

    private _insertList: Array<Corporates>;
    private _updateList: Array<Corporates>;
    private _deleteList: Array<Corporates>;

    get insertList(): Array<Corporates> { return this._insertList; }

    set insertList(pinsertList: Array<Corporates>) { this._insertList = pinsertList; }

    get updateList(): Array<Corporates> { return this._updateList; }

    set updateList(pupdateList: Array<Corporates>) { this._updateList = pupdateList; }

    get deleteList(): Array<Corporates> { return this._deleteList; }

    set deleteList(pdeleteList: Array<Corporates>) { this._deleteList = pdeleteList; }


    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList
        };
    }

}
