import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderSentences } from "../beans/OffenderSentences";


export class SentenceCommitBean extends BaseModel {
    
    private _insertList: Array<OffenderSentences>;
    private _updateList: Array<OffenderSentences>;
   // private _deleteList: Array<CourtReport>;
    //private _selectedReport: CourtReport;

    get insertList(): Array<OffenderSentences> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderSentences> ) { this._insertList = pinsertList; }

    get updateList(): Array<OffenderSentences> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderSentences> ) { this._updateList = pupdateList; }
    
//    get deleteList(): Array<CourtReport> { return this._deleteList; }
//
//    set deleteList( pdeleteList: Array<CourtReport> ) { this._deleteList = pdeleteList; }
    
//    get selectedCourtcase(): CourtReport { return this._selectedReport; }
//
//    set selectedCourtcase( selectedReport: CourtReport ) { this._selectedReport = selectedReport; }
//    
//    get courtReportModel(): CourtReport { return this._courtReportModel; }
//
//    set courtReportModel( courtReportModel: CourtReport ) { this._courtReportModel = courtReportModel; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
//            'deleteList': this._deleteList,
//            'selectedCourtReport':this._selectedReport,
//            'courtReportModel':this._courtReportModel
        };
    }
}