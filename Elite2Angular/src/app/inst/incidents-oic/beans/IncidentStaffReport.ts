import { BaseModel } from '@commonbeans/BaseModel';

export class IncidentStaffReport extends BaseModel {
    private incident_report_id: number;
    private staff_id: number;
    private report_date: Date;
    private report_time: Date;
    private report_type: string;
    private lock_flag: string;
    private create_datetime: Date;
    private create_user_id: string;
    private modify_user_id: string;
    private modify_datetime: Date;
    private agency_incident_id: number;
    private party_seq: number;
    private seal_flag: string;
    private flag: boolean;
    private _incidentDetails: string;

    public get incidentDetails(): string {
        return this._incidentDetails;
    }
    public set incidentDetails(value: string) {
        this._incidentDetails = value;
    }

    private _reportDetails: string;
    private _repCompletFlag: string;

    private locked_By: string;
    private _lockReferenceTime: Date;

    get incidentReportId(): number { return this.incident_report_id; }

    set incidentReportId(incidentReportId: number) { this.incident_report_id = incidentReportId; }

    get staffId(): number { return this.staff_id; }

    set staffId(staffId: number) { this.staff_id = staffId; }

    get reportDate(): Date { return this.report_date; }

    set reportDate(reportDate: Date) { this.report_date = reportDate; }

    get reportTime(): Date { return this.report_time; }

    set reportTime(reportTime: Date) { this.report_time = reportTime; }

    get reportType(): string { return this.report_type; }

    set reportType(reportType: string) { this.report_type = reportType; }

    get lockFlag(): string { return this.lock_flag; }

    set lockFlag(lockFlag: string) { this.lock_flag = lockFlag; }

    get createDatetime(): Date { return this.create_datetime; }

    set createDatetime(createDatetime: Date) { this.create_datetime = createDatetime; }

    get createUserId(): string { return this.create_user_id; }

    set createUserId(createUserId: string) { this.create_user_id = createUserId; }

    get modifyUserId(): string { return this.modify_user_id; }

    set modifyUserId(modifyUserId: string) { this.modify_user_id = modifyUserId; }

    get modifyDatetime(): Date { return this.modify_datetime; }

    set modifyDatetime(modifyDatetime: Date) { this.modify_datetime = modifyDatetime; }

    get agencyIncidentId(): number { return this.agency_incident_id; }

    set agencyIncidentId(agencyIncidentId: number) { this.agency_incident_id = agencyIncidentId; }

    get partySeq(): number { return this.party_seq; }

    set partySeq(partySeq: number) { this.party_seq = partySeq; }

    get sealFlag(): string { return this.seal_flag; }

    set sealFlag(sealFlag: string) { this.seal_flag = sealFlag; }



    get lockedBy(): string { return this.locked_By; }

    set lockedBy(value: string) { this.locked_By = value; }

    get lockReferenceTime(): Date { return this._lockReferenceTime; }

    set lockReferenceTime(value: Date) { this._lockReferenceTime = value; }

    get reportDetails(): string { return this._reportDetails; }

    set reportDetails(preportDetails: string) { this._reportDetails = preportDetails; }

    get repCompletFlag(): string { return this._repCompletFlag; }

    set repCompletFlag(prepCompletFlag: string) { this._repCompletFlag = prepCompletFlag; }

    toJSON(): any {
        return {
            'incidentReportId': this.incident_report_id,
            'staffId': this.staff_id,
            'reportDate': this.report_date,
            'reportTime': this.report_time,
            'reportType': this.report_type,
            'lockFlag': this.lock_flag,
            'createDatetime': this.create_datetime,
            'createUserId': this.create_user_id,
            'modifyUserId': this.modify_user_id,
            'modifyDatetime': this.modify_datetime,
            'agencyIncidentId': this.agency_incident_id,
            'partySeq': this.party_seq,
            'sealFlag': this.seal_flag,
            'incidentDetails': this._incidentDetails,
            'lockedBy': this.locked_By,
            'lockReferenceTime': this._lockReferenceTime,
            'reportDetails': this._reportDetails,
            'repCompletFlag': this._repCompletFlag

        };


    }
}
