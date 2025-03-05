import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderGrievances } from '@instoffenderissuestrackingbeans/OffenderGrievances';
import { OffenderGrievanceTxns } from '@instoffenderissuestrackingbeans/OffenderGrievanceTxns';

export class OffenderGrievancesCommitBean extends BaseModel {

    private _insertList: Array<OffenderGrievances>;
    private _deleteList: Array<OffenderGrievances>;
    private _updateList: Array<OffenderGrievances>;
    private _offenderGrievanceTxnsList: Array<OffenderGrievanceTxns>;


    get insertList(): Array<OffenderGrievances> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderGrievances>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderGrievances> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderGrievances>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderGrievances> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderGrievances>) { this._updateList = pupdateList; }
    
    get offenderGrievanceTxnsList(): Array<OffenderGrievanceTxns> { return this._offenderGrievanceTxnsList; }

    set offenderGrievanceTxnsList(poffenderGrievanceTxnsList: Array<OffenderGrievanceTxns>) { this._offenderGrievanceTxnsList = poffenderGrievanceTxnsList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'offenderGrievanceTxnsList': this._offenderGrievanceTxnsList
        };
    }
}
