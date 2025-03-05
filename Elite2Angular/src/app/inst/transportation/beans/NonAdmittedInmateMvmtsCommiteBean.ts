import { BaseModel } from "@common/beans/BaseModel";
import{NonAdmittedInmateMvmts} from "./NonAdmittedInmateMvmts"

export class NonAdmittedInmateMvmtsCommiteBean extends BaseModel {

    private _insertList: Array<NonAdmittedInmateMvmts>;
    private _deleteList: Array<NonAdmittedInmateMvmts>;
    private _updateList: Array<NonAdmittedInmateMvmts>;

    get insertList(): Array<NonAdmittedInmateMvmts> { return this._insertList; }

    set insertList(pinsertList: Array<NonAdmittedInmateMvmts>) { this._insertList = pinsertList; }

    get deleteList(): Array<NonAdmittedInmateMvmts> { return this._deleteList; }

    set deleteList(pdeleteList: Array<NonAdmittedInmateMvmts>) { this._deleteList = pdeleteList; }

    get updateList(): Array<NonAdmittedInmateMvmts> { return this._updateList; }

    set updateList(pupdateList: Array<NonAdmittedInmateMvmts>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}