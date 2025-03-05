import {BaseModel} from '@commonbeans/BaseModel';

export class VAgencyIncidents extends BaseModel {

    private _agencyIncidentId: number;
    private _reportedStaffId: number;
    private _staffFirstName: string;
    private _staffLastName: string;
    private _incidentDate: Date;
    private _incidentTime: Date;
    private _createUserId: string;  
    private _internalLocationId: number;
    private _incidentType: string;
    private _incidentTypeDesc: string;
    private _incidentDetails: string;
    private _incidentStatus: string;
    private _reportDate: Date;
    private _reportTime: Date;
    private _agyLocId: string;
    private _intLocDescription: string;
    private _repairFlag: string;
    private _inserted: boolean;
    private _repairFlagTemp: boolean;
    private _repDescription: string;
    private _infoDisable: boolean;
    private _commentText: string;
    private _fromDate: Date;
    private _toDate: Date;
    private _reportid: string;
   // private _reportedBy1: string;
    private _flag: boolean;
    private _lockFlag: string;
    private _appendDetailesflag: boolean;
    private _code: string;
    private _offenderIdDisplay: string;
  
    private _caseloadType: string;
    private _caseloadId: string;

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }
    
     get code(): string { return this._code; }

    set code(pcode: string) { this._code = pcode; }
    
    get appendDetailesflag(): boolean { return this._flag; }

    set appendDetailesflag(pappendDetailesflag: boolean) { this._appendDetailesflag = pappendDetailesflag; }
    
    get flag(): boolean { return this._flag; }

    set flag(pflag: boolean) { this._flag = pflag; }
    
    get lockFlag(): string { return this._lockFlag; }

    set lockFlag(plockFlag: string) { this._lockFlag = plockFlag; }
    
    get reportid(): string { return this._reportid; }

    set reportid(preportid: string) { this._reportid = preportid; }
    
    get agencyIncidentId(): number { return this._agencyIncidentId; }

    set agencyIncidentId(agencyIncidentId: number) { this._agencyIncidentId = agencyIncidentId; }

    get reportedStaffId(): number { return this._reportedStaffId; }

    set reportedStaffId(preportedStaffId: number) { this._reportedStaffId = preportedStaffId; }

    get staffFirstName(): string { return this._staffFirstName; }

    set staffFirstName(pstaffFirstName: string) { this._staffFirstName = pstaffFirstName; }

    get staffLastName(): string { return this._staffLastName; }

    set staffLastName(pstaffLastName: string) { this._staffLastName = pstaffLastName; }

    get incidentDate(): Date { return this._incidentDate; }

    set incidentDate(pincidentDate: Date) { this._incidentDate = pincidentDate; }

    get incidentTime(): Date { return this._incidentTime; }

    set incidentTime(pincidentTime: Date) { this._incidentTime = pincidentTime; }

    get internalLocationId(): number { return this._internalLocationId; }

    set internalLocationId(pinternalLocationId: number) { this._internalLocationId = pinternalLocationId; }

    get incidentType(): string { return this._incidentType; }

    set incidentType(pincidentType: string) { this._incidentType = pincidentType; }

    get incidentTypeDesc(): string { return this._incidentTypeDesc; }

    set incidentTypeDesc(pincidentTypeDesc: string) { this._incidentTypeDesc = pincidentTypeDesc; }

    get incidentDetails(): string { return this._incidentDetails; }
    
    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    set incidentDetails(pincidentDetails: string) { this._incidentDetails = pincidentDetails; }

    get incidentStatus(): string { return this._incidentStatus; }

    set incidentStatus(pincidentStatus: string) { this._incidentStatus = pincidentStatus; }

    get reportDate(): Date { return this._reportDate; }

    set reportDate(preportDate: Date) { this._reportDate = preportDate; }

    get reportTime(): Date { return this._reportTime; }

    set reportTime(preportTime: Date) { this._reportTime = preportTime; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get intLocDescription(): string { return this._intLocDescription; }

    set intLocDescription(pintLocDescription: string) { this._intLocDescription = pintLocDescription; }

    get repairFlag(): string { return this._repairFlag; }

    set repairFlag(prepairFlag: string) { this._repairFlag = prepairFlag; }

    get inserted(): boolean { return this._inserted; }

    set inserted(pinserted: boolean) { this._inserted = pinserted; }

     get repairFlagTemp(): boolean { return this._repairFlagTemp; }

    set repairFlagTemp(prepairFlagTemp: boolean) { this._repairFlagTemp = prepairFlagTemp; }

    get repDescription(): string { return this._repDescription; }

    set repDescription(prepDescription: string) { this._repDescription = prepDescription; }

    get infoDisable(): boolean { return this._infoDisable; }

    set infoDisable(pinfoDisable: boolean) { this._infoDisable = pinfoDisable; }

     get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get fromDate(): Date { return this._fromDate; }

    set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }

    get toDate(): Date { return this._toDate; }

    set toDate(ptoDate: Date) { this._toDate = ptoDate; }


    get caseloadType(): string { return this._caseloadType; }

    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }
    
     get caseloadId(): string { return this._caseloadId; }

    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    toJSON(): any {
        return {
            'agencyIncidentId': this._agencyIncidentId,
             'reportedStaffId': this._reportedStaffId,
             'staffFirstName': this._staffFirstName,
             'staffLastName': this._staffLastName,
             'incidentDate': this._incidentDate,
             'incidentTime': this._incidentTime,
             'internalLocationId': this._internalLocationId,
             'incidentType': this._incidentType,
             'incidentTypeDesc': this._incidentTypeDesc,
             'incidentDetails': this._incidentDetails,
             'incidentStatus': this._incidentStatus,
             'createUserId': this._createUserId,
             'reportDate': this._reportDate,
             'reportTime': this._reportTime,
             'agyLocId': this._agyLocId,
             'intLocDescription': this._intLocDescription,
             'repairFlag': this._repairFlag,
             'inserted': this._inserted,
             'repDescription': this._repDescription,
             'fromDate' : this._fromDate,
             'toDate' : this._toDate,
             'reportid': this._reportid,
             'lockFlag': this._lockFlag,
             '_flag':this._flag,
             '_appendDetailesflag':this._appendDetailesflag,
             '_code':this._code,
             'offenderIdDisplay':this._offenderIdDisplay,
             'caseloadType': this._caseloadType,
             'caseloadId': this._caseloadId

        };
   }
}
