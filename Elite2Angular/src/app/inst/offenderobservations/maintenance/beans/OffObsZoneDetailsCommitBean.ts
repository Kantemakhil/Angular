import { BaseModel } from "@common/beans/BaseModel";
import { OffObsZoneDetails } from "./OffObsZoneDetails";

export class OffObsZoneDetailsCommitBean extends BaseModel {
private _insertList: Array<OffObsZoneDetails>;
    private _deleteList: Array<OffObsZoneDetails>;
    private _updateList: Array<OffObsZoneDetails>;

    get insertList(): Array<OffObsZoneDetails> { return this._insertList; }

    set insertList( pinsertList: Array<OffObsZoneDetails> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffObsZoneDetails> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffObsZoneDetails> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffObsZoneDetails> { return this._updateList; }

    set updateList( pupdateList: Array<OffObsZoneDetails> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
