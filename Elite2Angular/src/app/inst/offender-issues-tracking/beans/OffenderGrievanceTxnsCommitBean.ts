import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderGrievanceTxns } from '@instoffenderissuestrackingbeans/OffenderGrievanceTxns';

export class OffenderGrievanceTxnsCommitBean extends BaseModel {

    private _insertList: Array<OffenderGrievanceTxns>;
    private _deleteList: Array<OffenderGrievanceTxns>;
    private _updateList: Array<OffenderGrievanceTxns>;

    get insertList(): Array<OffenderGrievanceTxns> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderGrievanceTxns>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderGrievanceTxns> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderGrievanceTxns>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderGrievanceTxns> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderGrievanceTxns>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
