import { BaseModel } from "@common/beans/BaseModel";
import { Printers } from "./Printers";

export class PrintersCommitBean extends BaseModel {

    private _insertList: Array<Printers>;
    private _deleteList: Array<Printers>;
    private _updateList: Array<Printers>;

    get insertList(): Array<Printers> { return this._insertList; }

    set insertList( pinsertList: Array<Printers> ) { this._insertList = pinsertList; }

    get deleteList(): Array<Printers> { return this._deleteList; }

    set deleteList( pdeleteList: Array<Printers> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<Printers> { return this._updateList; }

    set updateList( pupdateList: Array<Printers> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
