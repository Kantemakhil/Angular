export class VNameSearch2 {
  private _bookingNo: string;
  private _lastName: string;
  private _offenderBookId: number;
  private _offenderIdDisplay: string;
  private _communityActiveFlag: string;
  private _bookingEndDate: Date;
  private _createIntakeAgyLocId: string;
  private _createAgyLocId: string;
  private _suffix: string;
  private _agencyImlId: number;
  private _assignedStaffId: number;
  private _bookingBeginDate: Date;
  private _livingUnitId: number;
  private _inOutStatus: string;
  private _staffFirstName: string;
  private _bookingType: string;
  private _livingUnitDescription: string;
  private _disclosureFlag: string;
  private _bookingStatus: string;
  private _activeFlag: string;
  private _communityStatus: string;
  private _statusDisplay: string;
  private _staffLastName: string;
  private _livUnitDesc: string;
  private _rootOffenderId: number;
  private _communityAgyLocId: string;
  private _birthDate: Date;
  private _agyLocType: string;
  private _firstName: string;
  private _agyLocId: string;
  private _middleName: string;
  private _offenderId: number;
  private _aliasOffenderId: number;
  private _bookingCreatedDate: Date;
  private _locationCode: string;
  private _intakeAgyLocId: string;
  private _agyLocName: string;
  private _age: number;
  private _offAlerts: string;
  private _offSupLevel: string;
  private _gender: string;
  private _moduleName: string;
  private _description: string;
  private _parentForm: String;
  public get parentForm(): String {
    return this._parentForm;
  }
  public set parentForm(value: String) {
    this._parentForm = value;
  }

  get bookingNo(): string { return this._bookingNo; }
  set bookingNo(pbookingNo: string) { this._bookingNo = pbookingNo; }
  get lastName(): string { return this._lastName; }
  set lastName(plastName: string) { this._lastName = plastName; }
  get offenderBookId(): number { return this._offenderBookId; }
  set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
  get offenderIdDisplay(): string { return this._offenderIdDisplay; }
  set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }
  get communityActiveFlag(): string { return this._communityActiveFlag; }
  set communityActiveFlag(pcommunityActiveFlag: string) { this._communityActiveFlag = pcommunityActiveFlag; }
  get bookingEndDate(): Date { return this._bookingEndDate; }
  set bookingEndDate(pbookingEndDate: Date) { this._bookingEndDate = pbookingEndDate; }
  get createIntakeAgyLocId(): string { return this._createIntakeAgyLocId; }
  set createIntakeAgyLocId(pcreateIntakeAgyLocId: string) { this._createIntakeAgyLocId = pcreateIntakeAgyLocId; }
  get createAgyLocId(): string { return this._createAgyLocId; }
  set createAgyLocId(pcreateAgyLocId: string) { this._createAgyLocId = pcreateAgyLocId; }
  get suffix(): string { return this._suffix; }
  set suffix(psuffix: string) { this._suffix = psuffix; }
  get agencyImlId(): number { return this._agencyImlId; }
  set agencyImlId(pagencyImlId: number) { this._agencyImlId = pagencyImlId; }
  get assignedStaffId(): number { return this._assignedStaffId; }
  set assignedStaffId(passignedStaffId: number) { this._assignedStaffId = passignedStaffId; }
  get bookingBeginDate(): Date { return this._bookingBeginDate; }
  set bookingBeginDate(pbookingBeginDate: Date) { this._bookingBeginDate = pbookingBeginDate; }
  get livingUnitId(): number { return this._livingUnitId; }
  set livingUnitId(plivingUnitId: number) { this._livingUnitId = plivingUnitId; }
  get inOutStatus(): string { return this._inOutStatus; }
  set inOutStatus(pinOutStatus: string) { this._inOutStatus = pinOutStatus; }
  get staffFirstName(): string { return this._staffFirstName; }
  set staffFirstName(pstaffFirstName: string) { this._staffFirstName = pstaffFirstName; }
  get bookingType(): string { return this._bookingType; }
  set bookingType(pbookingType: string) { this._bookingType = pbookingType; }
  get livingUnitDescription(): string { return this._livingUnitDescription; }
  set livingUnitDescription(plivingUnitDescription: string) { this._livingUnitDescription = plivingUnitDescription; }
  get disclosureFlag(): string { return this._disclosureFlag; }
  set disclosureFlag(pdisclosureFlag: string) { this._disclosureFlag = pdisclosureFlag; }
  get bookingStatus(): string { return this._bookingStatus; }
  set bookingStatus(pbookingStatus: string) { this._bookingStatus = pbookingStatus; }
  get activeFlag(): string { return this._activeFlag; }
  set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
  get communityStatus(): string { return this._communityStatus; }
  set communityStatus(pcommunityStatus: string) { this._communityStatus = pcommunityStatus; }
  get statusDisplay(): string { return this._statusDisplay; }
  set statusDisplay(pstatusDisplay: string) { this._statusDisplay = pstatusDisplay; }
  get staffLastName(): string { return this._staffLastName; }
  set staffLastName(pstaffLastName: string) { this._staffLastName = pstaffLastName; }
  get livUnitDesc(): string { return this._livUnitDesc; }
  set livUnitDesc(plivUnitDesc: string) { this._livUnitDesc = plivUnitDesc; }
  get rootOffenderId(): number { return this._rootOffenderId; }
  set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }
  get communityAgyLocId(): string { return this._communityAgyLocId; }
  set communityAgyLocId(pcommunityAgyLocId: string) { this._communityAgyLocId = pcommunityAgyLocId; }
  get birthDate(): Date { return this._birthDate; }
  set birthDate(pbirthDate: Date) { this._birthDate = pbirthDate; }
  get agyLocType(): string { return this._agyLocType; }
  set agyLocType(pagyLocType: string) { this._agyLocType = pagyLocType; }
  get firstName(): string { return this._firstName; }
  set firstName(pfirstName: string) { this._firstName = pfirstName; }
  get agyLocId(): string { return this._agyLocId; }
  set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
  get middleName(): string { return this._middleName; }
  set middleName(pmiddleName: string) { this._middleName = pmiddleName; }
  get offenderId(): number { return this._offenderId; }
  set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
  get aliasOffenderId(): number { return this._aliasOffenderId; }
  set aliasOffenderId(paliasOffenderId: number) { this._aliasOffenderId = paliasOffenderId; }
  get bookingCreatedDate(): Date { return this._bookingCreatedDate; }
  set bookingCreatedDate(pbookingCreatedDate: Date) { this._bookingCreatedDate = pbookingCreatedDate; }
  get locationCode(): string { return this._locationCode; }
  set locationCode(plocationCode: string) { this._locationCode = plocationCode; }
  get intakeAgyLocId(): string { return this._intakeAgyLocId; }
  set intakeAgyLocId(pintakeAgyLocId: string) { this._intakeAgyLocId = pintakeAgyLocId; }
  get agyLocName(): string { return this._agyLocName; }
  set agyLocName(pagyLocName: string) { this._agyLocName = pagyLocName; }
  get age(): number { return this._age; }
  set age(page: number) { this._age = page; }
  get offAlerts(): string { return this._offAlerts; }
  set offAlerts(poffAlerts: string) { this._offAlerts = poffAlerts; }
  get offSupLevel(): string { return this._offSupLevel; }
  set offSupLevel(poffSupLevel: string) { this._offSupLevel = poffSupLevel; }
  get gender(): string { return this._gender; }
  set gender(pgender: string) { this._gender = pgender; }
  get moduleName(): string { return this._moduleName; }
  set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }
  get description(): string {return this._description; }
  set description(value: string) {this._description = value;}


  toJSON(): any {
    return {
      'bookingNo': this._bookingNo,
      'lastName': this._lastName,
      'offenderBookId': this._offenderBookId,
      'offenderIdDisplay': this._offenderIdDisplay,
      'communityActiveFlag': this._communityActiveFlag,
      'bookingEndDate': this._bookingEndDate,
      'createIntakeAgyLocId': this._createIntakeAgyLocId,
      'createAgyLocId': this._createAgyLocId,
      'suffix': this._suffix,
      'agencyImlId': this._agencyImlId,
      'assignedStaffId': this._assignedStaffId,
      'bookingBeginDate': this._bookingBeginDate,
      'livingUnitId': this._livingUnitId,
      'inOutStatus': this._inOutStatus,
      'staffFirstName': this._staffFirstName,
      'bookingType': this._bookingType,
      'livingUnitDescription': this._livingUnitDescription,
      'disclosureFlag': this._disclosureFlag,
      'bookingStatus': this._bookingStatus,
      'activeFlag': this._activeFlag,
      'communityStatus': this._communityStatus,
      'statusDisplay': this._statusDisplay,
      'staffLastName': this._staffLastName,
      'livUnitDesc': this._livUnitDesc,
      'rootOffenderId': this._rootOffenderId,
      'communityAgyLocId': this._communityAgyLocId,
      'birthDate': this._birthDate,
      'agyLocType': this._agyLocType,
      'firstName': this._firstName,
      'agyLocId': this._agyLocId,
      'middleName': this._middleName,
      'offenderId': this._offenderId,
      'aliasOffenderId': this._aliasOffenderId,
      'bookingCreatedDate': this._bookingCreatedDate,
      'locationCode': this._locationCode,
      'intakeAgyLocId': this._intakeAgyLocId,
      'agyLocName': this._agyLocName,
      'age': this._age,
      'gender': this._gender,
      'offAlerts': this._offAlerts,
      'offSupLevel': this._offSupLevel,
      'moduleName': this._moduleName,
      'description': this._description,
      'parentForm':this._parentForm
    };
  }
}
