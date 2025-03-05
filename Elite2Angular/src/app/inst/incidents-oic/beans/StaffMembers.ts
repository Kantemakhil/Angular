import { StaffDetails } from './../../../common/workspace/beans/StaffDetails';
import { BaseModel } from '@commonbeans/BaseModel';
import { Teams } from '../../casemanagement/beans/Teams';
export class StaffMembers extends BaseModel {
    private _lastName: string;
    private _createUserId: string;
    private _birthdate: Date;
    private _role: string;
    private _badgeId: string;
    private _modifyDatetime: Date;
    private _suspensionDate: Date;
    private _modifyUserId: string;
    private _forcePasswordChangeFlag: string;
    private _lastPasswordChangeDate: Date;
    private _licenseCode: string;
    private _suffix: string;
    private _title: string;
    private _workingCaseloadId: string;
    private _terminationDate: Date;
    private _commReceiptPrinterId: string;
    private _serialVersionUID: number;
    private _sealFlag: string;
    private _updateAllowedFlag: string;
    private _nameSequence: string;
    private _emergencyContact: string;
    private _suspensionReason: string;
    private _queueClusterId: number;
    private _abbreviation: string;
    private _userId: string;
    private _createDatetime: Date;
    private _firstName: string;
    private _suspendedFlag: string;
    private _licenseExpiryDate: Date;
    private _sexCode: string;
    private _defaultPrinterId: number;
    private _firstLogonFlag: string;
    private _personnelType: string;
    private _assignedCaseloadId: string;
    private _middleName: string;
    private _position: string;
    private _asOfDate: Date;
    private _workingStockLocId: string;
    private _staffId: number;
    private _status: string;
    private _nbtDescription: string;
    private _assignedCaseloadIdDes: string;
    private _addressId: number;
    private _description: string;
    private _code: string;
    private _officer: string;
    private _noOfTasks: number;
    private _teamName: string;
    private _workType: string;
    private _workSubType: string;
    private _severity: string;
    private _offenderId: number;
    private _acknowledgementFlag: boolean;
    private _acknowledgementSubject: string;
    private _prisonLocation: string;
    private _workMessage: string;
    private _staffName: string;
    private _workId: number;
    private _teamList: Array<Teams>;
    private _staffList: Array<StaffDetails>;
    private _offenderBookId: number;
    private _agyLocId: string;
    private _calAgyLocId: boolean;
    private _totalWorkload: number;
    private _cgnbtNoOffender: number;
    private _caseloadType: string;
    private _userIdVal: string;
    private _fromDate: Date;
    private _scheduleType: string;
    private _hoursPerWeek: number;
    private _mailId:string;
    private _password: String;	
   	private _passwordReturnVal: number;
    private _adUser: string;
   
    public get userIdVal(): string {
        return this._userIdVal;
    }
    public set userIdVal(value: string) {
        this._userIdVal = value;
    }
    public get cgnbtNoOffender(): number {
        return this._cgnbtNoOffender;
    }
    public set cgnbtNoOffender(value: number) {
        this._cgnbtNoOffender = value;
    }
    public get totalWorkload(): number {
        return this._totalWorkload;
    }
    public set totalWorkload(value: number) {
        this._totalWorkload = value;
    }





    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get teamList(): Array<Teams> { return this._teamList; }

    set teamList(pteamList: Array<Teams>) { this._teamList = pteamList; }
    get staffList(): Array<StaffDetails> { return this._staffList; }

    set staffList(pstaffList: Array<StaffDetails>) { this._staffList = pstaffList; }

    get workId(): number { return this._workId; }
    set workId(pworkId: number) { this._workId = pworkId; }
    get staffName(): string { return this._staffName; }

    set staffName(pstaffName: string) { this._staffName = pstaffName; }

    get workMessage(): string { return this._workMessage; }

    set workMessage(pworkMessage: string) { this._workMessage = pworkMessage; }
    get prisonLocation(): string { return this._prisonLocation; }

    set prisonLocation(pprisonLocation: string) { this._prisonLocation = pprisonLocation; }
    get acknowledgementSubject(): string { return this._acknowledgementSubject; }

    set acknowledgementSubject(packnowledgementSubject: string) { this._acknowledgementSubject = packnowledgementSubject; }


    get acknowledgementFlag(): boolean { return this._acknowledgementFlag; }

    set acknowledgementFlag(packnowledgementFlag: boolean) { this._acknowledgementFlag = packnowledgementFlag; }
    get workType(): string { return this._workType; }

    set workType(pworkType: string) { this._workType = pworkType; }
    get workSubType(): string { return this._workSubType; }

    set workSubType(pworkSubType: string) { this._workSubType = pworkSubType; }

    get severity(): string { return this._severity; }

    set severity(pseverity: string) { this._severity = pseverity; }

    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }



    get code(): string { return this._code; }

    set code(pcode: string) { this._code = pcode; }

    get lastName(): string { return this._lastName; }

    set lastName(plastName: string) { this._lastName = plastName; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get birthdate(): Date { return this._birthdate; }

    set birthdate(pbirthdate: Date) { this._birthdate = pbirthdate; }

    get role(): string { return this._role; }

    set role(prole: string) { this._role = prole; }

    get badgeId(): string { return this._badgeId; }

    set badgeId(pbadgeId: string) { this._badgeId = pbadgeId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get suspensionDate(): Date { return this._suspensionDate; }

    set suspensionDate(psuspensionDate: Date) { this._suspensionDate = psuspensionDate; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get forcePasswordChangeFlag(): string { return this._forcePasswordChangeFlag; }

    set forcePasswordChangeFlag(pforcePasswordChangeFlag: string) { this._forcePasswordChangeFlag = pforcePasswordChangeFlag; }

    get lastPasswordChangeDate(): Date { return this._lastPasswordChangeDate; }

    set lastPasswordChangeDate(plastPasswordChangeDate: Date) { this._lastPasswordChangeDate = plastPasswordChangeDate; }

    get licenseCode(): string { return this._licenseCode; }

    set licenseCode(plicenseCode: string) { this._licenseCode = plicenseCode; }

    get suffix(): string { return this._suffix; }

    set suffix(psuffix: string) { this._suffix = psuffix; }

    get title(): string { return this._title; }

    set title(ptitle: string) { this._title = ptitle; }

    get workingCaseloadId(): string { return this._workingCaseloadId; }

    set workingCaseloadId(pworkingCaseloadId: string) { this._workingCaseloadId = pworkingCaseloadId; }

    get terminationDate(): Date { return this._terminationDate; }

    set terminationDate(pterminationDate: Date) { this._terminationDate = pterminationDate; }

    get commReceiptPrinterId(): string { return this._commReceiptPrinterId; }

    set commReceiptPrinterId(pcommReceiptPrinterId: string) { this._commReceiptPrinterId = pcommReceiptPrinterId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get updateAllowedFlag(): string { return this._updateAllowedFlag; }

    set updateAllowedFlag(pupdateAllowedFlag: string) { this._updateAllowedFlag = pupdateAllowedFlag; }

    get nameSequence(): string { return this._nameSequence; }

    set nameSequence(pnameSequence: string) { this._nameSequence = pnameSequence; }

    get emergencyContact(): string { return this._emergencyContact; }

    set emergencyContact(pemergencyContact: string) { this._emergencyContact = pemergencyContact; }

    get suspensionReason(): string { return this._suspensionReason; }
    set suspensionReason(psuspensionReason: string) { this._suspensionReason = psuspensionReason; }
    get queueClusterId(): number { return this._queueClusterId; }
    set queueClusterId(pqueueClusterId: number) { this._queueClusterId = pqueueClusterId; }
    get abbreviation(): string { return this._abbreviation; }
    set abbreviation(pabbreviation: string) { this._abbreviation = pabbreviation; }
    get userId(): string { return this._userId; }
    set userId(puserId: string) { this._userId = puserId; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get firstName(): string { return this._firstName; }
    set firstName(pfirstName: string) { this._firstName = pfirstName; }
    get suspendedFlag(): string { return this._suspendedFlag; }
    set suspendedFlag(psuspendedFlag: string) { this._suspendedFlag = psuspendedFlag; }
    get licenseExpiryDate(): Date { return this._licenseExpiryDate; }
    set licenseExpiryDate(plicenseExpiryDate: Date) { this._licenseExpiryDate = plicenseExpiryDate; }
    get sexCode(): string { return this._sexCode; }
    set sexCode(psexCode: string) { this._sexCode = psexCode; }
    get defaultPrinterId(): number { return this._defaultPrinterId; }
    set defaultPrinterId(pdefaultPrinterId: number) { this._defaultPrinterId = pdefaultPrinterId; }
    get firstLogonFlag(): string { return this._firstLogonFlag; }
    set firstLogonFlag(pfirstLogonFlag: string) { this._firstLogonFlag = pfirstLogonFlag; }
    get personnelType(): string { return this._personnelType; }
    set personnelType(ppersonnelType: string) { this._personnelType = ppersonnelType; }
    get assignedCaseloadId(): string { return this._assignedCaseloadId; }
    set assignedCaseloadId(passignedCaseloadId: string) { this._assignedCaseloadId = passignedCaseloadId; }
    get middleName(): string { return this._middleName; }
    set middleName(pmiddleName: string) { this._middleName = pmiddleName; }
    get position(): string { return this._position; }
    set position(pposition: string) { this._position = pposition; }
    get asOfDate(): Date { return this._asOfDate; }
    set asOfDate(pasOfDate: Date) { this._asOfDate = pasOfDate; }
    get workingStockLocId(): string { return this._workingStockLocId; }
    set workingStockLocId(pworkingStockLocId: string) { this._workingStockLocId = pworkingStockLocId; }
    get staffId(): number { return this._staffId; }
    set staffId(pstaffId: number) { this._staffId = pstaffId; }
    get status(): string { return this._status; }
    set status(pstatus: string) { this._status = pstatus; }
    get nbtDescription(): string { return this._nbtDescription; }
    set nbtDescription(pnbtDescription: string) { this._nbtDescription = pnbtDescription; }
    get description(): string { return this._description; }
    set description(pDescription: string) { this._description = pDescription; }
    get assignedCaseloadIdDes(): string { return this._assignedCaseloadIdDes; }
    set assignedCaseloadIdDes(passignedCaseloadIdDes: string) { this._assignedCaseloadIdDes = passignedCaseloadIdDes; }
    get addressId(): number { return this._addressId; }
    set addressId(paddressId: number) { this._addressId = paddressId; }
    get officer(): string { return this._officer; }
    set officer(pofficer: string) { this._officer = pofficer; }
    get noOfTasks(): number { return this._noOfTasks; }
    set noOfTasks(pnoOfTasks: number) { this._noOfTasks = pnoOfTasks; }
    get teamName(): string { return this._teamName; }
    set teamName(pteamName: string) { this._teamName = pteamName; }
    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get calAgyLocId(): boolean { return this._calAgyLocId; }

    set calAgyLocId(pcalAgyLocId: boolean) { this._calAgyLocId = pcalAgyLocId; }

    get caseloadType(): string { return this._caseloadType; }
    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }
    get fromDate(): Date { return this._fromDate; }
    set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }
    get hoursPerWeek(): number { return this._hoursPerWeek; }

       set hoursPerWeek(phoursPerWeek: number) { this._hoursPerWeek = phoursPerWeek; }

       get scheduleType(): string { return this._scheduleType; }

       set scheduleType(pscheduleType: string) { this._scheduleType = pscheduleType; }

       get mailId(): string { return this._mailId; }

       set mailId(pmailId: string) { this._mailId = pmailId; }
    public get password(): String { return this._password; }
    public set password(value: String) { this._password = value; }
    public get passwordReturnVal(): number { return this._passwordReturnVal; }
    public set passwordReturnVal(value: number) { this._passwordReturnVal = value; }
    public get adUser(): string {  return this._adUser;  }
    public set adUser(value: string) {  this._adUser = value; }



    toJSON(): any {
        return {
            'lastName': this._lastName,
            'createUserId': this._createUserId,
            'birthdate': this._birthdate,
            'role': this._role,
            'badgeId': this._badgeId,
            'modifyDatetime': this._modifyDatetime,
            'suspensionDate': this._suspensionDate,
            'modifyUserId': this._modifyUserId,
            'forcePasswordChangeFlag': this._forcePasswordChangeFlag,
            'lastPasswordChangeDate': this._lastPasswordChangeDate,
            'licenseCode': this._licenseCode,
            'suffix': this._suffix,
            'title': this._title,
            'workingCaseloadId': this._workingCaseloadId,
            'terminationDate': this._terminationDate,
            'commReceiptPrinterId': this._commReceiptPrinterId,

            'sealFlag': this._sealFlag,
            'updateAllowedFlag': this._updateAllowedFlag,
            'nameSequence': this._nameSequence,
            'emergencyContact': this._emergencyContact,
            'suspensionReason': this._suspensionReason,
            'queueClusterId': this._queueClusterId,
            'abbreviation': this._abbreviation,
            'userId': this._userId,
            'createDatetime': this._createDatetime,
            'firstName': this._firstName,
            'suspendedFlag': this._suspendedFlag,
            'licenseExpiryDate': this._licenseExpiryDate,
            'sexCode': this._sexCode,
            'defaultPrinterId': this._defaultPrinterId,
            'firstLogonFlag': this._firstLogonFlag,
            'personnelType': this._personnelType,
            'assignedCaseloadId': this._assignedCaseloadId,
            'middleName': this._middleName,
            'position': this._position,
            'asOfDate': this._asOfDate,
            'workingStockLocId': this._workingStockLocId,
            'staffId': this._staffId,
            'status': this._status,
            'nbtDescription': this._nbtDescription,
            'assignedCaseloadIdDes': this._assignedCaseloadIdDes,
            'addressId': this._addressId,
            //             'addrSpecPhoneNumber' : this._addrSpecPhoneNumber,
            //            'globalPhoneNumber' : this._globalPhoneNumber,
            //            'globalEmails' : this._globalEmails,
            'code': this._code,
            'description': this._description,
            'officer': this._officer,
            'noOfTasks': this._noOfTasks,
            'teamName': this._teamName,
            'workType': this._workType,
            'workSubType': this._workSubType,
            'severity': this._severity,
            'offenderId': this._offenderId,
            'acknowledgementFlag': this._acknowledgementFlag,
            'acknowledgementSubject': this._acknowledgementSubject,
            'prisonLocation': this._prisonLocation,
            'workMessage': this._workMessage,
            'staffName': this._staffName,
            'workId': this._workId,
            'teamList': this._teamList,
            'staffList': this._staffList,
            'offenderBookId': this._offenderBookId,
            'agyLocId': this._agyLocId,
            'calAgyLocId': this._calAgyLocId,
            'totalWorkload': this._totalWorkload,
            'cgnbtNoOffender': this._cgnbtNoOffender,
            'caseloadType': this._caseloadType,
            'userIdVal': this.userIdVal,
            'fromDate':this._fromDate,
            'hoursPerWeek': this._hoursPerWeek,
            'scheduleType': this._scheduleType,
            'mailId':this._mailId,
            'password':this._password,
            'passwordReturnVal':this._passwordReturnVal,
            'adUser':this._adUser,
        };


    }
}
