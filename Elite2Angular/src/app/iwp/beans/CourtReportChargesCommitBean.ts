import { CourtReportCharges } from "./CourtReportCharges";

export class CourtReportChargesCommitBean{
    private _deleteList: Array<CourtReportCharges>;
    private _insertList: Array<CourtReportCharges>;
    private _updateList: Array<CourtReportCharges>;

    get deleteList(): Array<CourtReportCharges> { return this._deleteList; }
    set deleteList(pdeleteList: Array<CourtReportCharges>) { this._deleteList = pdeleteList; }
    get insertList(): Array<CourtReportCharges> { return this._insertList; }
    set insertList(pinsertList: Array<CourtReportCharges>) { this._insertList = pinsertList; }
    get updateList(): Array<CourtReportCharges> { return this._updateList; }
    set updateList(pupdateList: Array<CourtReportCharges>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}