import { BaseModel } from "@common/beans/BaseModel";
import { IwpCompositeOutParameter } from "./IwpCompositeOutParameter";

export class IwpCompositeBookmarksCommitBean extends BaseModel {
   
    private _updateList: Array<IwpCompositeOutParameter>;

    get updateList(): Array<IwpCompositeOutParameter> { return this._updateList; }

    set updateList(pupdateList: Array<IwpCompositeOutParameter>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'updateList': this._updateList,
        };
    }

}
