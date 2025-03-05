import { VHousingMoves } from "./VHousingMoves"
import { BaseModel } from "@common/beans/BaseModel";

export class VHousingMovesCommitBean extends BaseModel {

    private _insertList: Array<VHousingMoves>;
    private _deleteList: Array<VHousingMoves>;
    private _updateList: Array<VHousingMoves>;

    get insertList(): Array<VHousingMoves> { return this._insertList; }

    set insertList(pinsertList: Array<VHousingMoves>) { this._insertList = pinsertList; }

    get deleteList(): Array<VHousingMoves> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VHousingMoves>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VHousingMoves> { return this._updateList; }

    set updateList(pupdateList: Array<VHousingMoves>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}