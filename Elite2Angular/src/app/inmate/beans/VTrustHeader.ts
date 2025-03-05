export class VTrustHeader {
    private _accountClosedFlag: string;
    private _bookingNo: string;
    private _lastName: string;
    private _prisonLocation: string;
    private _ethnicity: string;
    private _gender: string;
    private _offenderBookId: number;
    private _commissaryTrustCaseload: string;
    private _officer: string;
    private _communityActiveFlag: string;
    private _offenderIdDisplay: string;
    private _bookingEndDate: Date;
    private _createIntakeAgyLocId: string;
    private _offAlerts: string;
    private _suffix: string;
    private _movementReason: string;
    private _offSupLevel: string;
    private _bookingBeginDate: Date;
    private _indigentFlag: string;
    private _livingUnitId: number;
    private _serialVersionUID: number;
    private _inOutStatus: string;
    private _status1: string;
    private _statusReason: string;
    private _bookingType: string;
    private _livingUnitDescription: string;
    private _bookingStatus: string;
    private _disclosureFlag: string;
    private _headerStatus: string;
    private _activeFlag: string;
    private _communityStatus: string;
    private _communityTrustCaseload: string;
    private _statusDisplay: string;
    private _rootOffenderId: number;
    private _status2: string;
    private _birthDate: Date;
    private _status3: string;
    private _agyLocType: string;
    private _firstName: string;
    private _trustCaseloadId: string;
    private _caseloadId: string;
    private _agyLocId: string;
    private _middleName: string;
    private _aliasOffenderId: number;
    private _offenderId: number;
    private _intakeAgyLocId: string;
    private _age: number;
    private _dialogData: number;
    private _currentBalance: number;
    private _caseloadType: string;
    private _moduleName: string;
    private _trustAccount: boolean;

    get moduleName(): string { return this._moduleName; }
    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }
    get caseloadType(): string { return this._caseloadType; }
    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }
    get accountClosedFlag(): string { return this._accountClosedFlag; }
    set accountClosedFlag(paccountClosedFlag: string) { this._accountClosedFlag = paccountClosedFlag; }
    get bookingNo(): string { return this._bookingNo; }
    set bookingNo(pbookingNo: string) { this._bookingNo = pbookingNo; }
    get lastName(): string { return this._lastName; }
    set lastName(plastName: string) { this._lastName = plastName; }
    get prisonLocation(): string { return this._prisonLocation; }
    set prisonLocation(pprisonLocation: string) { this._prisonLocation = pprisonLocation; }
    get ethnicity(): string { return this._ethnicity; }
    set ethnicity(pethnicity: string) { this._ethnicity = pethnicity; }
    get gender(): string { return this._gender; }
    set gender(pgender: string) { this._gender = pgender; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get commissaryTrustCaseload(): string { return this._commissaryTrustCaseload; }
    set commissaryTrustCaseload(pcommissaryTrustCaseload: string) { this._commissaryTrustCaseload = pcommissaryTrustCaseload; }
    get officer(): string { return this._officer; }
    set officer(pofficer: string) { this._officer = pofficer; }
    get communityActiveFlag(): string { return this._communityActiveFlag; }
    set communityActiveFlag(pcommunityActiveFlag: string) { this._communityActiveFlag = pcommunityActiveFlag; }
    get offenderIdDisplay(): string { return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }
    get bookingEndDate(): Date { return this._bookingEndDate; }
    set bookingEndDate(pbookingEndDate: Date) { this._bookingEndDate = pbookingEndDate; }
    get createIntakeAgyLocId(): string { return this._createIntakeAgyLocId; }
    set createIntakeAgyLocId(pcreateIntakeAgyLocId: string) { this._createIntakeAgyLocId = pcreateIntakeAgyLocId; }
    get offAlerts(): string { return this._offAlerts; }
    set offAlerts(poffAlerts: string) { this._offAlerts = poffAlerts; }
    get suffix(): string { return this._suffix; }
    set suffix(psuffix: string) { this._suffix = psuffix; }
    get movementReason(): string { return this._movementReason; }
    set movementReason(pmovementReason: string) { this._movementReason = pmovementReason; }
    get offSupLevel(): string { return this._offSupLevel; }
    set offSupLevel(poffSupLevel: string) { this._offSupLevel = poffSupLevel; }
    get bookingBeginDate(): Date { return this._bookingBeginDate; }
    set bookingBeginDate(pbookingBeginDate: Date) { this._bookingBeginDate = pbookingBeginDate; }
    get indigentFlag(): string { return this._indigentFlag; }
    set indigentFlag(pindigentFlag: string) { this._indigentFlag = pindigentFlag; }
    get livingUnitId(): number { return this._livingUnitId; }
    set livingUnitId(plivingUnitId: number) { this._livingUnitId = plivingUnitId; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get inOutStatus(): string { return this._inOutStatus; }
    set inOutStatus(pinOutStatus: string) { this._inOutStatus = pinOutStatus; }
    get status1(): string { return this._status1; }
    set status1(pstatus1: string) { this._status1 = pstatus1; }
    get statusReason(): string { return this._statusReason; }
    set statusReason(pstatusReason: string) { this._statusReason = pstatusReason; }
    get bookingType(): string { return this._bookingType; }
    set bookingType(pbookingType: string) { this._bookingType = pbookingType; }
    get livingUnitDescription(): string { return this._livingUnitDescription; }
    set livingUnitDescription(plivingUnitDescription: string) { this._livingUnitDescription = plivingUnitDescription; }
    get bookingStatus(): string { return this._bookingStatus; }
    set bookingStatus(pbookingStatus: string) { this._bookingStatus = pbookingStatus; }
    get disclosureFlag(): string { return this._disclosureFlag; }
    set disclosureFlag(pdisclosureFlag: string) { this._disclosureFlag = pdisclosureFlag; }
    get headerStatus(): string { return this._headerStatus; }
    set headerStatus(pheaderStatus: string) { this._headerStatus = pheaderStatus; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get communityStatus(): string { return this._communityStatus; }
    set communityStatus(pcommunityStatus: string) { this._communityStatus = pcommunityStatus; }
    get communityTrustCaseload(): string { return this._communityTrustCaseload; }
    set communityTrustCaseload(pcommunityTrustCaseload: string) { this._communityTrustCaseload = pcommunityTrustCaseload; }
    get statusDisplay(): string { return this._statusDisplay; }
    set statusDisplay(pstatusDisplay: string) { this._statusDisplay = pstatusDisplay; }
    get rootOffenderId(): number { return this._rootOffenderId; }
    set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }
    get status2(): string { return this._status2; }
    set status2(pstatus2: string) { this._status2 = pstatus2; }
    get birthDate(): Date { return this._birthDate; }
    set birthDate(pbirthDate: Date) { this._birthDate = pbirthDate; }
    get status3(): string { return this._status3; }
    set status3(pstatus3: string) { this._status3 = pstatus3; }
    get agyLocType(): string { return this._agyLocType; }
    set agyLocType(pagyLocType: string) { this._agyLocType = pagyLocType; }
    get firstName(): string { return this._firstName; }
    set firstName(pfirstName: string) { this._firstName = pfirstName; }
    get trustCaseloadId(): string { return this._trustCaseloadId; }
    set trustCaseloadId(ptrustCaseloadId: string) { this._trustCaseloadId = ptrustCaseloadId; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    get middleName(): string { return this._middleName; }
    set middleName(pmiddleName: string) { this._middleName = pmiddleName; }
    get aliasOffenderId(): number { return this._aliasOffenderId; }
    set aliasOffenderId(paliasOffenderId: number) { this._aliasOffenderId = paliasOffenderId; }
    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get intakeAgyLocId(): string { return this._intakeAgyLocId; }
    set intakeAgyLocId(pintakeAgyLocId: string) { this._intakeAgyLocId = pintakeAgyLocId; }
    get age(): number { return this._age; }
    set age(page: number) { this._age = page; }
    get dialogData(): number { return this._dialogData; }
    set dialogData(pdialogData: number) { this._dialogData = pdialogData; }
    get currentBalance(): number { return this._currentBalance; }
    set currentBalance(pcurrentBalance: number) { this._currentBalance = pcurrentBalance; }
    get trustAccount(): boolean { return this._trustAccount; }
    set trustAccount(ptrustAccount: boolean) { this._trustAccount = ptrustAccount; }

    toJSON(): any {
        return {
            'accountClosedFlag': this._accountClosedFlag,
            'bookingNo': this._bookingNo,
            'lastName': this._lastName,
            'prisonLocation': this._prisonLocation,
            'ethnicity': this._ethnicity,
            'gender': this._gender,
            'offenderBookId': this._offenderBookId,
            'commissaryTrustCaseload': this._commissaryTrustCaseload,
            'officer': this._officer,
            'communityActiveFlag': this._communityActiveFlag,
            'offenderIdDisplay': this._offenderIdDisplay,
            'bookingEndDate': this._bookingEndDate,
            'createIntakeAgyLocId': this._createIntakeAgyLocId,
            'offAlerts': this._offAlerts,
            'suffix': this._suffix,
            'movementReason': this._movementReason,
            'offSupLevel': this._offSupLevel,
            'bookingBeginDate': this._bookingBeginDate,
            'indigentFlag': this._indigentFlag,
            'livingUnitId': this._livingUnitId,
            'serialVersionUID': this._serialVersionUID,
            'inOutStatus': this._inOutStatus,
            'status1': this._status1,
            'statusReason': this._statusReason,
            'bookingType': this._bookingType,
            'livingUnitDescription': this._livingUnitDescription,
            'bookingStatus': this._bookingStatus,
            'disclosureFlag': this._disclosureFlag,
            'headerStatus': this._headerStatus,
            'activeFlag': this._activeFlag,
            'communityStatus': this._communityStatus,
            'communityTrustCaseload': this._communityTrustCaseload,
            'statusDisplay': this._statusDisplay,
            'rootOffenderId': this._rootOffenderId,
            'status2': this._status2,
            'birthDate': this._birthDate,
            'status3': this._status3,
            'agyLocType': this._agyLocType,
            'firstName': this._firstName,
            'trustCaseloadId': this._trustCaseloadId,
            'caseloadId': this._caseloadId,
            'agyLocId': this._agyLocId,
            'middleName': this._middleName,
            'aliasOffenderId': this._aliasOffenderId,
            'offenderId': this._offenderId,
            'intakeAgyLocId': this._intakeAgyLocId,
            'age': this._age,
            'dialogData': this._dialogData,
            'caseloadType': this._caseloadType,
            'moduleName': this._moduleName,
            'trustAccount': this._trustAccount
        };
    }
}
