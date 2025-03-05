import { BaseModel } from '@commonbeans/BaseModel';

export class AgencyIncidentParties extends BaseModel {

    private _agencyIncidentId: number;
    private _partySeq: number;
    private _incidentRole: string;
    private _offenderBookId: number;
    private _staffId: number;
    private _personId: number;
    private _dispositionType: string;
    private _dispositionDate: Date;
    private _oicIncidentId: number;
    private _commentText: string;
    private _createDateTime: Date;
    private _createUserId: string;
    private _actionCode: string;
    private _partyAddedDate: Date;
    private _modifyDateTime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _repCompletFlag: string;
    private _lname: string;
    private _fname: string;
    private _offenderId: number;
    private _staffIdDes: string;
    private _incidentRoleDes: string;
    private _disableOffenderId: boolean;
    private _actionCodeDes: string;
    private _code: string;
    private _button: string;
    private _offenderIdDisplay: string;
    private _butGo: string;
    private _affiliation: string;
    private _roleDescription: string;
    private _typeDescription: string;
    private _stgId: number;
    private _description: string;
    private _forceUsedFlag:string;  
    private _reportTypeFlag:string;
    private _forceUsed:boolean;  
    private _reportType:boolean;
    private _staffReportType: string;
    private _lockReferenceTime: Date;
    private _staffCode: number;
    private _reporterStaffId: number;

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

    get reportTypeFlag(): string { return this._reportTypeFlag; }

    set reportTypeFlag(preportTypeFlag: string) { this._reportTypeFlag = preportTypeFlag; }
    
    get forceUsedFlag(): string { return this._forceUsedFlag; }

    set forceUsedFlag(pforceUsedFlag: string) { this._forceUsedFlag = pforceUsedFlag; }

    get forceUsed(): boolean { return this._forceUsed; }

    set forceUsed(pforceUsed: boolean) { this._forceUsed = pforceUsed; }
    
    get reportType(): boolean { return this._reportType; }

    set reportType(preportType: boolean) { this._reportType = preportType; }
    

    get button(): string { return this._button; }

    set button(pbutton: string) { this._button = pbutton; }

    get code(): string { return this._code; }

    set code(pcode: string) { this._code = pcode; }

    get agencyIncidentId(): number { return this._agencyIncidentId; }

    set agencyIncidentId(pagencyIncidentId: number) { this._agencyIncidentId = pagencyIncidentId; }

    get partySeq(): number { return this._partySeq; }

    set partySeq(ppartySeq: number) { this._partySeq = ppartySeq; }

    get incidentRole(): string { return this._incidentRole; }

    set incidentRole(pincidentRole: string) { this._incidentRole = pincidentRole; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get staffId(): number { return this._staffId; }

    set staffId(pstaffId: number) { this._staffId = pstaffId; }

    get personId(): number { return this._personId; }

    set personId(ppersonId: number) { this._personId = ppersonId; }

    get dispositionType(): string { return this._dispositionType; }

    set dispositionType(pdispositionType: string) { this._dispositionType = pdispositionType; }

    get dispositionDate(): Date { return this._dispositionDate; }

    set dispositionDate(pdispositionDate: Date) { this._dispositionDate = pdispositionDate; }

    get oicIncidentId(): number { return this._oicIncidentId; }

    set oicIncidentId(poicIncidentId: number) { this._oicIncidentId = poicIncidentId; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get actionCode(): string { return this._actionCode; }

    set actionCode(pactionCode: string) { this._actionCode = pactionCode; }

    get partyAddedDate(): Date { return this._partyAddedDate; }

    set partyAddedDate(ppartyAddedDate: Date) { this._partyAddedDate = ppartyAddedDate; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get repCompletFlag(): string { return this._repCompletFlag; }

    set repCompletFlag(prepCompletFlag: string) { this._repCompletFlag = prepCompletFlag; }

    get lname(): string { return this._lname; }

    set lname(plname: string) { this._lname = plname; }

    get fname(): string { return this._fname; }

    set fname(pfname: string) { this._fname = pfname; }

    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get staffIdDes(): string { return this._staffIdDes; }

    set staffIdDes(pstaffIdDes: string) { this._staffIdDes = pstaffIdDes; }

    get incidentRoleDes(): string { return this._incidentRoleDes; }

    set incidentRoleDes(pincidentRoleDes: string) { this._incidentRoleDes = pincidentRoleDes; }

    get disableOffenderId(): boolean { return this._disableOffenderId; }

    set disableOffenderId(pdisableOffenderId: boolean) { this._disableOffenderId = pdisableOffenderId; }

    get actionCodeDes(): string { return this._actionCodeDes; }

    set actionCodeDes(pactionCodeDes: string) { this._actionCodeDes = pactionCodeDes; }

    get butGo(): string { return this._butGo; }

    set butGo(pbutGo: string) { this._butGo = pbutGo; }

    get affiliation(): string { return this._affiliation; }

    set affiliation(paffiliation: string) { this._affiliation = paffiliation; }

    get roleDescription(): string { return this._roleDescription; }

    set roleDescription(proleDescription: string) { this._roleDescription = proleDescription; }

    get typeDescription(): string { return this._typeDescription; }

    set typeDescription(ptypeDescription: string) { this._typeDescription = ptypeDescription; }

    get stgId(): number { return this._stgId; }

    set stgId(pstgId: number) { this._stgId = pstgId; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get staffReportType(): string { return this._staffReportType; }

    set staffReportType(value: string) { this._staffReportType = value; }

    get lockReferenceTime(): Date { return this._lockReferenceTime; }

    set lockReferenceTime(value: Date) { this._lockReferenceTime = value; }

    get staffCode(): number { return this._staffCode;  }

    set staffCode(value: number) { this._staffCode = value; }

    get reporterStaffId(): number { return this._reporterStaffId; }

    set reporterStaffId(preporterStaffId: number) { this._reporterStaffId = preporterStaffId; }

    toJSON(): any {
        return {
            'agencyIncidentId': this._agencyIncidentId,
            'partySeq': this._partySeq,
            'incidentRole': this._incidentRole,
            'offenderBookId': this._offenderBookId,
            'staffId': this._staffId,
            'personId': this._personId,
            'dispositionType': this._dispositionType,
            'dispositionDate': this._dispositionDate,
            'oicIncidentId': this._oicIncidentId,
            'commentText': this._commentText,
            'createDateTime': this._createDateTime,
            'createUserId': this._createUserId,
            'actionCode': this._actionCode,
            'partyAddedDate': this._partyAddedDate,
            'modifyDateTime': this._modifyDateTime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'repCompletFlag': this._repCompletFlag,
            'offenderId': this._offenderId,
            'staffIdDes': this._staffIdDes,
            'incidentRoleDes': this._incidentRoleDes,
            'lname': this._lname,
            'fname': this._fname,
            'actionCodeDes': this._actionCodeDes,
            'code': this._code,
            'button': this._button,
            'offenderIdDisplay': this._offenderIdDisplay,
            'butGo': this._butGo,
            'affiliation': this._affiliation,
            'roleDescription': this._roleDescription,
            'typeDescription': this._typeDescription,
            'stgId': this._stgId,
            'staffReportType': this._staffReportType,
            'lockReferenceTime': this._lockReferenceTime,
            'staffCode':this._staffCode,
            'reporterStaffId': this._reporterStaffId
        };
    }
}




