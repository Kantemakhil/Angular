import { BaseModel } from "@common/beans/BaseModel";
import { VOffBalCals } from "./VOffBalCals";

export  class VOffBalCalsCommitBean extends  BaseModel {
    private _deleteList:  Array<VOffBalCals>;

    private _insertList: Array<VOffBalCals>;
    private _updateList:  Array<VOffBalCals>;

    get deleteList(): Array<VOffBalCals> { return this._deleteList; }
    set deleteList(pdeleteList: Array<VOffBalCals>) { this._deleteList = pdeleteList ; }

    get insertList(): Array<VOffBalCals> { return this._insertList; }
    set insertList(pinsertList: Array<VOffBalCals>) { this._insertList = pinsertList ; }
    get updateList(): Array<VOffBalCals> { return this._updateList; }
    set updateList(pupdateList: Array<VOffBalCals>) { this._updateList = pupdateList ; }

toJSON(): any {
    return {
       'deleteList': this._deleteList,
       'insertList': this._insertList,
       'updateList': this._updateList,
        };
    }
}
