import { OffenderMedicalTreatments } from "./OffenderMedicalTreatments";

export class OffenderMedicalTreatmentsCommitBean {

    private _insertList: Array<OffenderMedicalTreatments>;
    private _deleteList: Array<OffenderMedicalTreatments>;
    private _updateList: Array<OffenderMedicalTreatments>;

    get insertList(): Array<OffenderMedicalTreatments> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderMedicalTreatments>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderMedicalTreatments> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderMedicalTreatments>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderMedicalTreatments> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderMedicalTreatments>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
    
}