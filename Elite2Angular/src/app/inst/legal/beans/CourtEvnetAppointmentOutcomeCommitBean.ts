import { BaseModel } from "@common/beans/BaseModel";
import { CourtEvnetAppointmentOutcome } from "./CourtEvnetAppointmentOutcome";

export class CourtEvnetAppointmentOutcomeCommitBean extends BaseModel {
    private _deleteList: Array<CourtEvnetAppointmentOutcome>;
    private _insertList: Array<CourtEvnetAppointmentOutcome>;
    private _updateList: Array<CourtEvnetAppointmentOutcome>;
   

    get deleteList(): Array<CourtEvnetAppointmentOutcome> { return this._deleteList; }
    set deleteList(pdeleteList: Array<CourtEvnetAppointmentOutcome>) { this._deleteList = pdeleteList; }
    get insertList(): Array<CourtEvnetAppointmentOutcome>  { return this._insertList; }
    set insertList(pinsertList: Array<CourtEvnetAppointmentOutcome> ) { this._insertList = pinsertList; }
    get updateList(): Array<CourtEvnetAppointmentOutcome>  { return this._updateList; }
    set updateList(pupdateList: Array<CourtEvnetAppointmentOutcome> ) { this._updateList = pupdateList; }
    
    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}
