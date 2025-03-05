import { BaseModel } from "@common/beans/BaseModel";
import { Arrests } from "./Arrests";

export class ArrestsCommitBean extends BaseModel {

    private _deleteList: Array<Arrests>;
    private _insertList: Array<Arrests>;
    private _updateList: Array<Arrests>;

    get deleteList(): Array<Arrests> { return this._deleteList; }
    set deleteList(pdeleteList: Array<Arrests>) { this._deleteList = pdeleteList; }
    get insertList(): Array<Arrests> { return this._insertList; }
    set insertList(pinsertList: Array<Arrests>) { this._insertList = pinsertList; }
    get updateList(): Array<Arrests> { return this._updateList; }
    set updateList(pupdateList: Array<Arrests>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}
