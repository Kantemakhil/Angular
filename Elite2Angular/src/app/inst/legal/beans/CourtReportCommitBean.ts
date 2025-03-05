import { BaseModel } from '@commonbeans/BaseModel';
import { CourtReport } from "../beans/CourtReport";


export class CourtReportCommitBean extends BaseModel {
    private _courtReportModel: CourtReport;
    private _insertList: Array<CourtReport>;
    private _updateList: Array<CourtReport>;
    private _deleteList: Array<CourtReport>;
    private _selectedReport: CourtReport;

    get insertList(): Array<CourtReport> { return this._insertList; }

    set insertList( pinsertList: Array<CourtReport> ) { this._insertList = pinsertList; }

    get updateList(): Array<CourtReport> { return this._updateList; }

    set updateList( pupdateList: Array<CourtReport> ) { this._updateList = pupdateList; }
    
    get deleteList(): Array<CourtReport> { return this._deleteList; }

    set deleteList( pdeleteList: Array<CourtReport> ) { this._deleteList = pdeleteList; }
    
    get selectedCourtcase(): CourtReport { return this._selectedReport; }

    set selectedCourtcase( selectedReport: CourtReport ) { this._selectedReport = selectedReport; }
    
    get courtReportModel(): CourtReport { return this._courtReportModel; }

    set courtReportModel( courtReportModel: CourtReport ) { this._courtReportModel = courtReportModel; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList,
            'selectedCourtReport':this._selectedReport,
            'courtReportModel':this._courtReportModel
        };
    }
}