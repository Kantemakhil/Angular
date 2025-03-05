import { BaseModel } from "@common/beans/BaseModel";
import { SentenceUpdateReasons } from "./SentenceUpdateReasons";

export class SentenceUpdateReasonscommitBean extends BaseModel {
private _insertList: Array<SentenceUpdateReasons>;
    private _deleteList: Array<SentenceUpdateReasons>;
    private _updateList: Array<SentenceUpdateReasons>;

    get insertList(): Array<SentenceUpdateReasons> { return this._insertList; }

    set insertList( pinsertList: Array<SentenceUpdateReasons> ) { this._insertList = pinsertList; }

    get deleteList(): Array<SentenceUpdateReasons> { return this._deleteList; }

    set deleteList( pdeleteList: Array<SentenceUpdateReasons> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<SentenceUpdateReasons> { return this._updateList; }

    set updateList( pupdateList: Array<SentenceUpdateReasons> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
