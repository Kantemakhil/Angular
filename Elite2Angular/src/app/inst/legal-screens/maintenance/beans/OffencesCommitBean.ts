import { Offences } from "./Offences";
import { BaseModel } from "@common/beans/BaseModel";

export class OffencesCommitBean extends BaseModel{
    private _insertList: Array<Offences>;
    private _deleteList: Array<Offences>;
    private _updateList: Array<Offences>;

    get insertList(): Array<Offences> { return this._insertList; }

    set insertList( pinsertList: Array<Offences> ) { this._insertList = pinsertList; }

    get deleteList(): Array<Offences> { return this._deleteList; }

    set deleteList( pdeleteList: Array<Offences> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<Offences> { return this._updateList; }

    set updateList( pupdateList: Array<Offences> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}