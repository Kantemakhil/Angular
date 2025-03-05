import {BaseModel} from '@commonbeans/BaseModel';

export class VOicIncidents extends BaseModel {

    private _agencyIncidentId: number;
    private _agyLocId: string;
    private _bookingNo: string;
    private _incidentDate: Date;
    private _incidentDetails: string;
    private _incidentTime: Date;
    private _incidentType: string;
    private _incidentTypeDesc: string;
    private _intLocDescription: string;
    private _offenderBookId: number;
    private _oicChargeFlag: string;
    private _oicIncidentId: number;
    private _partySeq: number;
    private _reportDate: Date;
    private _reportedStaffId: number;
    private _staffIdDescription: string;

    get agencyIncidentId(): number { return this._agencyIncidentId; }

    set agencyIncidentId(pagencyIncidentId: number) { this._agencyIncidentId = pagencyIncidentId; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get bookingNo(): string { return this._bookingNo; }

    set bookingNo(pbookingNo: string) { this._bookingNo = pbookingNo; }

    get incidentDate(): Date { return this._incidentDate; }

    set incidentDate(pincidentDate: Date) { this._incidentDate = pincidentDate; }

    get incidentDetails(): string { return this._incidentDetails; }

    set incidentDetails(pincidentDetails: string) { this._incidentDetails = pincidentDetails; }

    get incidentTime(): Date { return this._incidentTime; }

    set incidentTime(pincidentTime: Date) { this._incidentTime = pincidentTime; }

    get incidentType(): string { return this._incidentType; }

    set incidentType(pincidentType: string) { this._incidentType = pincidentType; }

    get incidentTypeDesc(): string { return this._incidentTypeDesc; }

    set incidentTypeDesc(pincidentTypeDesc: string) { this._incidentTypeDesc = pincidentTypeDesc; }

    get intLocDescription(): string { return this._intLocDescription; }

    set intLocDescription(pintLocDescription: string) { this._intLocDescription = pintLocDescription; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get oicChargeFlag(): string { return this._oicChargeFlag; }

    set oicChargeFlag(poicChargeFlag: string) { this._oicChargeFlag = poicChargeFlag; }

    get oicIncidentId(): number { return this._oicIncidentId; }

    set oicIncidentId(poicIncidentId: number) { this._oicIncidentId = poicIncidentId; }

    get partySeq(): number { return this._partySeq; }

    set partySeq(ppartySeq: number) { this._partySeq = ppartySeq; }

    get reportDate(): Date { return this._reportDate; }

    set reportDate(preportDate: Date) { this._reportDate = preportDate; }

    get reportedStaffId(): number { return this._reportedStaffId; }

    set reportedStaffId(preportedStaffId: number) { this._reportedStaffId = preportedStaffId; }

    get staffIdDescription(): string { return this._staffIdDescription; }

    set staffIdDescription(pstaffIdDescription: string) { this._staffIdDescription = pstaffIdDescription; }

    toJSON(): any {
        return {
            'agencyIncidentId': this._agencyIncidentId,
            'agyLocId': this._agyLocId,
            'bookingNo': this._bookingNo,
            'incidentDate': this._incidentDate,
            'incidentDetails': this._incidentDetails,
            'incidentTime': this._incidentTime,
            'incidentType': this._incidentType,
            'incidentTypeDesc': this._incidentTypeDesc,
            'intLocDescription': this._intLocDescription,
            'offenderBookId': this._offenderBookId,
            'oicChargeFlag': this._oicChargeFlag,
            'oicIncidentId': this._oicIncidentId,
            'partySeq': this._partySeq,
            'reportDate': this._reportDate,
            'reportedStaffId': this._reportedStaffId,
            'staffIdDescription': this._staffIdDescription
        };
    }
}
