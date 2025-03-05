import { OffenderSubstanceTreatments } from "@inst/booking/beans/OffenderSubstanceTreatments";

export class OffenderSubstanceTreatmentsCommitBean {

    private _insertList: Array<OffenderSubstanceTreatments>;
    private _deleteList: Array<OffenderSubstanceTreatments>;
    private _updateList: Array<OffenderSubstanceTreatments>;

    get insertList(): Array<OffenderSubstanceTreatments> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderSubstanceTreatments>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderSubstanceTreatments> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderSubstanceTreatments>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderSubstanceTreatments> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderSubstanceTreatments>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}