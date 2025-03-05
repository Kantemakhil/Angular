import { BaseModel } from '@commonbeans/BaseModel';

export class AgencyIncidents extends BaseModel {

    private _reportedStaffId: number;
    private _agencyIncidentId: number;
    private _incidentDate: Date;
    private _internalLocationId: number;
    private _incidentTime: Date;
    private _incidentType: string;
    private _incidentStatus: string;
    private _createDateTime: Date;
    private _createUserId: string;
    private _modifyUserId: string;
    private _modifyDateTime: Date;
    private _lockFlag: string;
    private _incidentDetails: string;
    private _reportDate: Date;
    private _reportTime: Date;
    private _agyLocId: string;
    private _levelCode: string;
    private _logNo: string;
    private _incidentText: any;
    private _sealFlag: string;
    private _createStaffName: string;
    private _interLocationIdDes: string;
    private _flag: boolean;
    private _appendDetailesflag: boolean;
    private _reportStaffIdAsCode: string;
    private _fromDate: Date;
    private _toDate: Date;
    private _incidentTypeDescription: string;
    private _originatingForm: string;
    private _offenderBookId: number;
    private _parentForm: string;
    public get parentForm(): string {
        return this._parentForm;
    }
    public set parentForm(value: string) {
        this._parentForm = value;
    }
    


    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }

    get reportStaffIdAsCode(): string { return this._reportStaffIdAsCode; }

    set reportStaffIdAsCode(reportStaffIdAsCode: string) { this._reportStaffIdAsCode = reportStaffIdAsCode; }

    get appendDetailesflag(): boolean { return this._flag; }

    set appendDetailesflag(pappendDetailesflag: boolean) { this._appendDetailesflag = pappendDetailesflag; }

    get flag(): boolean { return this._flag; }

    set flag(pflag: boolean) { this._flag = pflag; }

    get interLocationIdDes(): string { return this._interLocationIdDes; }

    set interLocationIdDes(pinterLocationIdDes: string) { this._interLocationIdDes = pinterLocationIdDes; }

    get reportedStaffId(): number { return this._reportedStaffId; }

    set reportedStaffId(reportedStaffId: number) { this._reportedStaffId = reportedStaffId; }

    get agencyIncidentId(): number { return this._agencyIncidentId; }

    set agencyIncidentId(pagencyIncidentId: number) { this._agencyIncidentId = pagencyIncidentId; }

    get incidentDate(): Date { return this._incidentDate; }

    set incidentDate(pincidentDate: Date) { this._incidentDate = pincidentDate; }

    get internalLocationId(): number { return this._internalLocationId; }

    set internalLocationId(pinternalLocationId: number) { this._internalLocationId = pinternalLocationId; }

    get incidentTime(): Date { return this._incidentTime; }

    set incidentTime(pincidentTime: Date) { this._incidentTime = pincidentTime; }

    get incidentType(): string { return this._incidentType; }

    set incidentType(pincidentType: string) { this._incidentType = pincidentType; }

    get incidentStatus(): string { return this._incidentStatus; }

    set incidentStatus(pincidentStatus: string) { this._incidentStatus = pincidentStatus; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

    get lockFlag(): string { return this._lockFlag; }

    set lockFlag(plockFlag: string) { this._lockFlag = plockFlag; }

    get incidentDetails(): string { return this._incidentDetails; }

    set incidentDetails(pincidentDetails: string) { this._incidentDetails = pincidentDetails; }

    get reportDate(): Date { return this._reportDate; }

    set reportDate(preportDate: Date) { this._reportDate = preportDate; }

    get reportTime(): Date { return this._reportTime; }

    set reportTime(preportTime: Date) { this._reportTime = preportTime; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get levelCode(): string { return this._levelCode; }

    set levelCode(plevelCode: string) { this._levelCode = plevelCode; }

    get logNo(): string { return this._logNo; }

    set logNo(plogNo: string) { this._logNo = plogNo; }

    get incidentText(): any { return this._incidentText; }

    set incidentText(pincidentText: any) { this._incidentText = pincidentText; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get createStaffName(): string { return this._createStaffName; }

    set createStaffName(createStaffName: string) { this._createStaffName = createStaffName; }

    get fromDate(): Date { return this._fromDate; }

    set fromDate(fromDate: Date) { this._fromDate = fromDate; }

    get toDate(): Date { return this._toDate; }

    set toDate(toDate: Date) { this._toDate = toDate; }

    get incidentTypeDescription(): string { return this._incidentTypeDescription; }

    set incidentTypeDescription(incidentTypeDescription: string) { this._incidentTypeDescription = incidentTypeDescription; }

    get originatingForm(): string { return this._originatingForm; }

    set originatingForm(originatingForm: string) { this._originatingForm = originatingForm; }

    toJSON(): any {
        return {

            'reportedStaffId': this._reportedStaffId,
            'agencyIncidentId': this._agencyIncidentId,
            'incidentDate': this._incidentDate,
            'incidentTime': this._incidentTime,
            'internalLocationId': this._internalLocationId,
            'incidentType': this._incidentType,
            'incidentStatus': this._incidentStatus,
            'createDateTime': this._createDateTime,
            'createUserId': this._createUserId,
            'modifyUserId': this._modifyUserId,
            'modifyDateTime': this._modifyDateTime,
            'lockFlag': this._lockFlag,
            'incidentDetails': this._incidentDetails,
            'reportDate': this._reportDate,
            'reportTime': this._reportTime,
            'agyLocId': this._agyLocId,
            'levelCode': this._levelCode,
            'logNo': this._logNo,
            'incidentText': this._incidentText,
            'sealFlag': this._sealFlag,
            'createStaffName': this._createStaffName,
            'interLocationIdDes': this._interLocationIdDes,
            '_flag': this._flag,
            '_appendDetailesflag': this._appendDetailesflag,
            '_reportStaffIdAsCode': this._reportStaffIdAsCode,
            '_fromDate': this._fromDate,
            '_toDate': this._toDate,
            '_incidentTypeDescription': this._incidentTypeDescription,
            'originatingForm': this._originatingForm,
            'offenderBookId': this._offenderBookId,
            'parentForm':this._parentForm
        };
    }
}
