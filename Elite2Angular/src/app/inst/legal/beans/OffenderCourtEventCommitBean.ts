import { BaseModel } from '@commonbeans/BaseModel';
import { CourtEvents } from "../beans/CourtEvents";
import { CourtCase } from "../beans/CourtCase";


export class OffenderCourtEventCommitBean extends BaseModel {
    private _insertList: Array<CourtEvents>;
    private _updateList: Array<CourtEvents>;
    private _selectedCourtcase: CourtCase;

    get insertList(): Array<CourtEvents> { return this._insertList; }

    set insertList( pinsertList: Array<CourtEvents> ) { this._insertList = pinsertList; }

    get updateList(): Array<CourtEvents> { return this._updateList; }

    set updateList( pupdateList: Array<CourtEvents> ) { this._updateList = pupdateList; }
    
    get selectedCourtcase(): CourtCase { return this._selectedCourtcase; }

    set selectedCourtcase( selectedCourtcase: CourtCase ) { this._selectedCourtcase = selectedCourtcase; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'selectedCourtcase':this._selectedCourtcase,
        };
    }
}