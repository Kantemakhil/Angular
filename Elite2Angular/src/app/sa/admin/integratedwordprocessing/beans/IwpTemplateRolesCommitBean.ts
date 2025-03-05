import { BaseModel } from "@common/beans/BaseModel";
import { IwpTemplateRoles } from "./IwpTemplateRoles";

export class IwpTemplateRolesCommitBean extends BaseModel {
    private _insertList: Array<IwpTemplateRoles>;
    private _deleteList: Array<IwpTemplateRoles>;
    private _updateList: Array<IwpTemplateRoles>;

    get insertList(): Array<IwpTemplateRoles> { return this._insertList; }

    set insertList(pinsertList: Array<IwpTemplateRoles>) { this._insertList = pinsertList; }

    get deleteList(): Array<IwpTemplateRoles> { return this._deleteList; }

    set deleteList(pdeleteList: Array<IwpTemplateRoles>) { this._deleteList = pdeleteList; }

    get updateList(): Array<IwpTemplateRoles> { return this._updateList; }

    set updateList(pupdateList: Array<IwpTemplateRoles>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }

}
