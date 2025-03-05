
import { OffenderProposedIntlocs } from './OffenderProposedIntlocs';

export class OffenderProposedIntlocsCommitBean {

    private _insertList: Array<OffenderProposedIntlocs>;
    private _deleteList: Array<OffenderProposedIntlocs>;
    private _updateList: Array<OffenderProposedIntlocs>;

    get insertList(): Array<OffenderProposedIntlocs> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderProposedIntlocs>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderProposedIntlocs> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderProposedIntlocs>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderProposedIntlocs> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderProposedIntlocs>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}