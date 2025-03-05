import { BaseModel } from "../../../common/beans/BaseModel";
import { OffenderCaseIdentifiers } from "./OffenderCaseIdentifiers";

export class OffenderCaseIdentifiersCommitBean extends BaseModel{

    private _insertList: Array<OffenderCaseIdentifiers>;
    private _updateList: Array<OffenderCaseIdentifiers>;
    private _deleteList: Array<OffenderCaseIdentifiers>;

    get insertList(): Array<OffenderCaseIdentifiers> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderCaseIdentifiers> ) { this._insertList = pinsertList; }

    get updateList(): Array<OffenderCaseIdentifiers> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderCaseIdentifiers> ) { this._updateList = pupdateList; }

    get deleteList(): Array<OffenderCaseIdentifiers> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderCaseIdentifiers> ) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList,
        };
    }

}