import { BaseModel } from '@commonbeans/BaseModel';

export class ReportableIncedentDetails extends BaseModel {

    private _incidentReportableId: number;
    private _agencyIncidentId: number;
    private _partySeq: number;
    private _reportableIncidentType: string;
    private _commentText: string;
    private _reportableStaffId: number;
    private _reportableDatetime: Date;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _userName: string;
    private _sealFlag: string;
    private _returnedOutput: number;

    get incidentReportableId(): number { return this._incidentReportableId; }

    set incidentReportableId(pincidentReportableId: number) { this._incidentReportableId = pincidentReportableId; }

    get agencyIncidentId(): number { return this._agencyIncidentId; }

    set agencyIncidentId(pagencyIncidentId: number) { this._agencyIncidentId = pagencyIncidentId; }

    get partySeq(): number { return this._partySeq; }

    set partySeq(ppartySeq: number) { this._partySeq = ppartySeq; }

    get reportableIncidentType(): string { return this._reportableIncidentType; }

    set reportableIncidentType(preportableIncidentType: string) { this._reportableIncidentType = preportableIncidentType; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get reportableStaffId(): number { return this._reportableStaffId; }

    set reportableStaffId(preportableStaffId: number) { this._reportableStaffId = preportableStaffId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get reportableDatetime(): Date { return this._reportableDatetime; }

    set reportableDatetime(preportableDatetime: Date) { this._reportableDatetime = preportableDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get userName(): string { return this._userName; }

    set userName(puserName: string) { this._userName = puserName; }

    get returnedOutput(): number { return this._returnedOutput; }

    set returnedOutput(preturnedOutput: number) { this._returnedOutput = preturnedOutput; }

    toJSON(): any {
        return {
            'incidentReportableId': this._incidentReportableId,
            'agencyIncidentId': this._agencyIncidentId,
            'partySeq': this.partySeq,
            'reportableIncidentType': this._reportableIncidentType,
            'commentText': this._commentText,
            'reportableStaffId': this._reportableStaffId,
            'reportableDatetime': this.reportableDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'userName': this._userName,
            'createDatetime': this._createDatetime,
            'sealFlag': this._sealFlag,
            'returnedOutput': this._returnedOutput

        };
    }
}
