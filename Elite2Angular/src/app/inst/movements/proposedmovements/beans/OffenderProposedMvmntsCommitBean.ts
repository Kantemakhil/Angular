import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderProposedMvmnts } from "./OffenderProposedMvmnts";

export class OffenderProposedMvmntsCommitBean extends BaseModel {

    private _insertList: Array<OffenderProposedMvmnts>;
    private _deleteList: Array<OffenderProposedMvmnts>;
    private _updateList: Array<OffenderProposedMvmnts>;

    get insertList(): Array<OffenderProposedMvmnts> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderProposedMvmnts> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderProposedMvmnts> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderProposedMvmnts> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderProposedMvmnts> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderProposedMvmnts> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}