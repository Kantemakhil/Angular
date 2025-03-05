import { BaseModel } from "@common/beans/BaseModel";
import { IwpParameterMappings } from "./IwpParameterMappings";

export class IwpParameterMappingsCommitBean extends BaseModel {
    private _insertList: Array<IwpParameterMappings>;
    private _deleteList: Array<IwpParameterMappings>;
    private _updateList: Array<IwpParameterMappings>;

    get insertList(): Array<IwpParameterMappings> { return this._insertList; }

    set insertList(pinsertList: Array<IwpParameterMappings>) { this._insertList = pinsertList; }

    get deleteList(): Array<IwpParameterMappings> { return this._deleteList; }

    set deleteList(pdeleteList: Array<IwpParameterMappings>) { this._deleteList = pdeleteList; }

    get updateList(): Array<IwpParameterMappings> { return this._updateList; }

    set updateList(pupdateList: Array<IwpParameterMappings>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }

}
