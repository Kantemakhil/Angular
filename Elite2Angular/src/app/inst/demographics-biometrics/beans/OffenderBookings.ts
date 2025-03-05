import { BaseModel } from '@commonbeans/BaseModel';

export class OffenderBookings extends BaseModel {

private _offenderBookId: number;
private _offenderId: number;
private _activeFlag: string;
private _activityDate: Date;
private _agencyImlId: number;
private _agyLocId: string;
private _agyLocIdList: string;
private _assignedStaffId: number;
private _bookingBeginDate: Date;
private _bookingCreatedDate: Date;
private _bookingEndDate: Date;
private _bookingNo: string;
private _bookingStatus: string;
private _bookingType: string;
private _caseDate: Date;
private _caseOfficerId: number;
private _caseTime: Date;
private _commStaffId: number;
private _commStaffRole: string;
private _commStatus: string;
private _communityActiveFlag: string;
private _communityAgyLocId: string;
private _createAgyLocId: string;
private _createDatetime: Date;
private _createIntakeAgyLocId: string;
private _createUserId: string;
private _disclosureFlag: string;
private _earnedCreditLevel: string;
private _ekstrandCreditLevel: string;
private _fingerPrintedStaffId: number;
private _inOutStatus: string;
private _intakeAgyLocAssignDate: Date;
private _intakeAgyLocId: string;
private _intakeCaseloadId: string;
private _intakeUserId: string;
private _livingUnitId: number;
private _modifyDatetime: Date;
private _modifyUserId: string;
private _noCommAgyLocId: number;
private _photoTakingStaffId: number;
private _recordUserId: string;
private _requestName: string;
private _rootOffenderId: number;
private _sealFlag: string;
private _searchStaffId: number;
private _serviceFeeFlag: string;
private _statusReason: string;
private _totalUnexcusedAbsences: number;
private _youthAdultCode: string;
private _dspFirstName: string;
private _dspLastName: string;
private _cgnbtActiveFlag: string;
private _cgnbtCommunityActiveFlag: string;
private _cgnbtBookingStatus: string;
private _tempBookingBeginDate: string;
private _livUnitDesc: string;
private _intakeStatus: string;
private _instStatus: string;
private _caseloadId: string;
private _assignFlag: boolean;
private _dspDescription: string;
private _trustAccountFlag: string;
private _trustAccountFlagTemp: boolean;

private _role: string;
private _staffId: number;
private _offenderIdDisplay: string;
private _warningMsg: string;
private _warningPrompt: string;
    private _offenderEndDate: Date;
    private _offenderStartDate: Date;
    private _referralDate: Date;
    private _conditionLength: string;

    private _offenderPrgObligationId: number;
    private _workloadUnits: number;
    private _workedStaffMembers: Array<number>;
    

get warningMsg(): string { return this._warningMsg; }

set warningMsg(pwarningMsg: string) { this._warningMsg = pwarningMsg; }

get warningPrompt(): string { return this._warningPrompt; }

set warningPrompt(pwarningPrompt: string) { this._warningPrompt = pwarningPrompt; }

    private _caseloadType: string;
    private _position:string;
    public get caseloadType(): string {
        return this._caseloadType;
    }
    public set caseloadType(value: string) {
        this._caseloadType = value;
    }

    get position(): string { return this._position; }
    
    set position(pposition: string) { this._position =pposition; }

get trustAccountFlag(): string { return this._trustAccountFlag; }

set trustAccountFlag(ptrustAccountFlag: string) { this._trustAccountFlag = ptrustAccountFlag; }

get trustAccountFlagTemp(): boolean { return this._trustAccountFlagTemp; }

set trustAccountFlagTemp(ptrustAccountFlagTemp: boolean) { this._trustAccountFlagTemp = ptrustAccountFlagTemp; }


get cgnbtBookingStatus(): string { return this._cgnbtBookingStatus; }

set cgnbtBookingStatus(pcgnbtBookingStatus: string) { this._cgnbtBookingStatus = pcgnbtBookingStatus; }

get cgnbtActiveFlag(): string { return this._cgnbtActiveFlag; }

set cgnbtActiveFlag(pcgnbtActiveFlag: string) { this._cgnbtActiveFlag = pcgnbtActiveFlag; }

get cgnbtCommunityActiveFlag(): string { return this._cgnbtCommunityActiveFlag; }

set cgnbtCommunityActiveFlag(pcgnbtCommunityActiveFlag: string) { this._cgnbtCommunityActiveFlag = pcgnbtCommunityActiveFlag; }

get dspFirstName(): string { return this._dspFirstName; }

set dspFirstName(pdspFirstName: string) { this._dspFirstName = pdspFirstName; }

get dspLastName(): string { return this._dspLastName; }

set dspLastName(pdspLastName: string) { this._dspLastName = pdspLastName; }

get offenderId(): number { return this._offenderId; }

set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

get offenderBookId(): number { return this._offenderBookId; }

set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

get activeFlag(): string { return this._activeFlag; }

set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

get activityDate(): Date { return this._activityDate; }

set activityDate(pactivityDate: Date) { this._activityDate = pactivityDate; }

get agencyImlId(): number { return this._agencyImlId; }

set agencyImlId(pagencyImlId: number) { this._agencyImlId = pagencyImlId; }

get agyLocId(): string { return this._agyLocId; }

set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

get agyLocIdList(): string { return this._agyLocIdList; }

set agyLocIdList(pagyLocIdList: string) { this._agyLocIdList = pagyLocIdList; }

get assignedStaffId(): number { return this._assignedStaffId; }

set assignedStaffId(passignedStaffId: number) { this._assignedStaffId = passignedStaffId; }

get bookingBeginDate(): Date { return this._bookingBeginDate; }

set bookingBeginDate(pbookingBeginDate: Date) { this._bookingBeginDate = pbookingBeginDate; }

get bookingCreatedDate(): Date { return this._bookingCreatedDate; }

set bookingCreatedDate(pbookingCreatedDate: Date) { this._bookingCreatedDate = pbookingCreatedDate; }

get bookingEndDate(): Date { return this._bookingEndDate; }

set bookingEndDate(pbookingEndDate: Date) { this._bookingEndDate = pbookingEndDate; }

get bookingNo(): string { return this._bookingNo; }

set bookingNo(pbookingNo: string) { this._bookingNo = pbookingNo; }

get bookingStatus(): string { return this._bookingStatus; }

set bookingStatus(pbookingStatus: string) { this._bookingStatus = pbookingStatus; }

get bookingType(): string { return this._bookingType; }

set bookingType(pbookingType: string) { this._bookingType = pbookingType; }

get caseDate(): Date { return this._caseDate; }

set caseDate(pcaseDate: Date) { this._caseDate = pcaseDate; }

get caseOfficerId(): number { return this._caseOfficerId; }

set caseOfficerId(pcaseOfficerId: number) { this._caseOfficerId = pcaseOfficerId; }

get caseTime(): Date { return this._caseTime; }

set caseTime(pcaseTime: Date) { this._caseTime = pcaseTime; }

get commStaffId(): number { return this._commStaffId; }

set commStaffId(pcommStaffId: number) { this._commStaffId = pcommStaffId; }

get commStaffRole(): string { return this._commStaffRole; }

set commStaffRole(pcommStaffRole: string) { this._commStaffRole = pcommStaffRole; }

get commStatus(): string { return this._commStatus; }

set commStatus(pcommStatus: string) { this._commStatus = pcommStatus; }

get communityActiveFlag(): string { return this._communityActiveFlag; }

set communityActiveFlag(pcommunityActiveFlag: string) { this._communityActiveFlag = pcommunityActiveFlag; }

get communityAgyLocId(): string { return this._communityAgyLocId; }

set communityAgyLocId(pcommunityAgyLocId: string) { this._communityAgyLocId = pcommunityAgyLocId; }

get createAgyLocId(): string { return this._createAgyLocId; }

set createAgyLocId(pcreateAgyLocId: string) { this._createAgyLocId = pcreateAgyLocId; }

get createDatetime(): Date { return this._createDatetime; }

set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

get createIntakeAgyLocId(): string { return this._createIntakeAgyLocId; }

set createIntakeAgyLocId(pcreateIntakeAgyLocId: string) { this._createIntakeAgyLocId = pcreateIntakeAgyLocId; }

get createUserId(): string { return this._createUserId; }

set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

get disclosureFlag(): string { return this._disclosureFlag; }

set disclosureFlag(pdisclosureFlag: string) { this._disclosureFlag = pdisclosureFlag; }

get earnedCreditLevel(): string { return this._earnedCreditLevel; }

set earnedCreditLevel(pearnedCreditLevel: string) { this._earnedCreditLevel = pearnedCreditLevel; }

get ekstrandCreditLevel(): string { return this._ekstrandCreditLevel; }

set ekstrandCreditLevel(pekstrandCreditLevel: string) { this._ekstrandCreditLevel = pekstrandCreditLevel; }

get fingerPrintedStaffId(): number { return this._fingerPrintedStaffId; }

set fingerPrintedStaffId(pfingerPrintedStaffId: number) { this._fingerPrintedStaffId = pfingerPrintedStaffId; }

get inOutStatus(): string { return this._inOutStatus; }

set inOutStatus(pinOutStatus: string) { this._inOutStatus = pinOutStatus; }

get intakeAgyLocAssignDate(): Date { return this._intakeAgyLocAssignDate; }

set intakeAgyLocAssignDate(pintakeAgyLocAssignDate: Date) { this._intakeAgyLocAssignDate = pintakeAgyLocAssignDate; }

get intakeAgyLocId(): string { return this._intakeAgyLocId; }

set intakeAgyLocId(pintakeAgyLocId: string) { this._intakeAgyLocId = pintakeAgyLocId; }

get intakeCaseloadId(): string { return this._intakeCaseloadId; }

set intakeCaseloadId(pintakeCaseloadId: string) { this._intakeCaseloadId = pintakeCaseloadId; }

get intakeUserId(): string { return this._intakeUserId; }

set intakeUserId(pintakeUserId: string) { this._intakeUserId = pintakeUserId; }

get livingUnitId(): number { return this._livingUnitId; }

set livingUnitId(plivingUnitId: number) { this._livingUnitId = plivingUnitId; }

get modifyDatetime(): Date { return this._modifyDatetime; }

set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

get modifyUserId(): string { return this._modifyUserId; }

set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

get noCommAgyLocId(): number { return this._noCommAgyLocId; }

set noCommAgyLocId(pnoCommAgyLocId: number) { this._noCommAgyLocId = pnoCommAgyLocId; }

get photoTakingStaffId(): number { return this._photoTakingStaffId; }

set photoTakingStaffId(pphotoTakingStaffId: number) { this._photoTakingStaffId = pphotoTakingStaffId; }

get recordUserId(): string { return this._recordUserId; }

set recordUserId(precordUserId: string) { this._recordUserId = precordUserId; }

get requestName(): string { return this._requestName; }

set requestName(prequestName: string) { this._requestName = prequestName; }

get rootOffenderId(): number { return this._rootOffenderId; }

set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }

get sealFlag(): string { return this._sealFlag; }

set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

get searchStaffId(): number { return this._searchStaffId; }

set searchStaffId(psearchStaffId: number) { this._searchStaffId = psearchStaffId; }

get serviceFeeFlag(): string { return this._serviceFeeFlag; }

set serviceFeeFlag(pserviceFeeFlag: string) { this._serviceFeeFlag = pserviceFeeFlag; }

get statusReason(): string { return this._statusReason; }

set statusReason(pstatusReason: string) { this._statusReason = pstatusReason; }

get totalUnexcusedAbsences(): number { return this._totalUnexcusedAbsences; }

set totalUnexcusedAbsences(ptotalUnexcusedAbsences: number) { this._totalUnexcusedAbsences = ptotalUnexcusedAbsences; }

get youthAdultCode(): string { return this._youthAdultCode; }

set youthAdultCode(pyouthAdultCode: string) { this._youthAdultCode = pyouthAdultCode; }

get livUnitDesc(): string { return this._livUnitDesc; }

set livUnitDesc(plivUnitDesc: string) { this._livUnitDesc = plivUnitDesc; }

get intakeStatus(): string { return this._intakeStatus; }

set intakeStatus(pintakeStatus: string) { this._intakeStatus = pintakeStatus; }

get instStatus(): string { return this._instStatus; }

set instStatus(pinstStatus: string) { this._instStatus = pinstStatus; }


get dspDescription(): string { return this._dspDescription; }

set dspDescription(pdspDescription: string) { this._dspDescription = pdspDescription; }

get caseloadId(): string { return this._caseloadId; }

set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

get tempBookingBeginDate(): string { return this._tempBookingBeginDate; }

set tempBookingBeginDate(ptempBookingBeginDate: string) { this._tempBookingBeginDate = ptempBookingBeginDate; }

get assignFlag(): boolean { return this._assignFlag; }

set assignFlag(passignFlag: boolean) { this._assignFlag = passignFlag; }

get role(): string { return this._role; }
set role(prole: string) { this._role = prole; }

get staffId(): number { return this._staffId; }
set staffId(value: number) { this._staffId = value; }
get offenderIdDisplay(): string { return this._offenderIdDisplay; }

set offenderIdDisplay( poffenderIdDisplay: string ) { this._offenderIdDisplay = poffenderIdDisplay; }

    get offenderEndDate(): Date { return this._offenderEndDate; }
    set offenderEndDate(value: Date) { this._offenderEndDate = value; }
    get offenderStartDate(): Date { return this._offenderStartDate; }
    set offenderStartDate(value: Date) { this._offenderStartDate = value; }
    get referralDate(): Date { return this._referralDate; }
    set referralDate(value: Date) { this._referralDate = value; }
    get conditionLength(): string { return this._conditionLength; }
    set conditionLength(value: string) { this._conditionLength = value; }
    public get offenderPrgObligationId(): number { return this._offenderPrgObligationId }
    public set offenderPrgObligationId(value: number) {  this._offenderPrgObligationId = value; }
    public get workloadUnits(): number { return this._workloadUnits; }
    public set workloadUnits(value: number) { this._workloadUnits = value; }
    get workedStaffMembers(): Array<number> { return this._workedStaffMembers; }
    set workedStaffMembers(value: Array<number>) { this._workedStaffMembers = value; }

toJSON(): any {
return {
'offenderBookId': this._offenderBookId,
'activeFlag': this._activeFlag,
'activityDate': this._activityDate,
'agencyImlId': this._agencyImlId,
'agyLocId': this._agyLocId,
'agyLocIdList': this._agyLocIdList,
'assignedStaffId': this._assignedStaffId,
'bookingBeginDate': this._bookingBeginDate,
'bookingCreatedDate': this._bookingCreatedDate,
'bookingEndDate': this._bookingEndDate,
'bookingNo': this._bookingNo,
'bookingStatus': this._bookingStatus,
'bookingType': this._bookingType,
'caseDate': this._caseDate,
'caseOfficerId': this._caseOfficerId,
'caseTime': this._caseTime,
'commStaffId': this._commStaffId,
'commStaffRole': this._commStaffRole,
'commStatus': this._commStatus,
'communityActiveFlag': this._communityActiveFlag,
'communityAgyLocId': this._communityAgyLocId,
'createAgyLocId': this._createAgyLocId,
'createDatetime': this._createDatetime,
'createIntakeAgyLocId': this._createIntakeAgyLocId,
'createUserId': this._createUserId,
'disclosureFlag': this._disclosureFlag,
'earnedCreditLevel': this._earnedCreditLevel,
'ekstrandCreditLevel': this._ekstrandCreditLevel,
'fingerPrintedStaffId': this._fingerPrintedStaffId,
'inOutStatus': this._inOutStatus,
'intakeAgyLocAssignDate': this._intakeAgyLocAssignDate,
'intakeAgyLocId': this._intakeAgyLocId,
'intakeCaseloadId': this._intakeCaseloadId,
'intakeUserId': this._intakeUserId,
'livingUnitId': this._livingUnitId,
'modifyDatetime': this._modifyDatetime,
'modifyUserId': this._modifyUserId,
'noCommAgyLocId': this._noCommAgyLocId,
'photoTakingStaffId': this._photoTakingStaffId,
'recordUserId': this._recordUserId,
'requestName': this._requestName,
'rootOffenderId': this._rootOffenderId,
'sealFlag': this._sealFlag,
'searchStaffId': this._searchStaffId,
'serviceFeeFlag': this._serviceFeeFlag,
'statusReason': this._statusReason,
'totalUnexcusedAbsences': this._totalUnexcusedAbsences,
'youthAdultCode': this._youthAdultCode,
'livUnitDesc': this._livUnitDesc,
'dspFirstName': this._dspFirstName,
'dspLastName': this._dspLastName,
'intakeStatus': this._intakeStatus,
'instStatus': this._instStatus,
'dspDescription': this._dspDescription,
'caseloadId': this._caseloadId,
'offenderId': this._offenderId,
'trustAccountFlag': this._trustAccountFlag,
'trustAccountFlagTemp': this._trustAccountFlagTemp,
'assignFlag': this._assignFlag,

'caseloadType':this._caseloadType,
'position':this._position,
'role': this._role,
'staffId': this._staffId,
'offenderIdDisplay': this._offenderIdDisplay,
'warningMsg': this._warningMsg,
'warningPrompt': this._warningPrompt,
    'offenderStartDate': this._offenderStartDate,
    'offenderEndDate': this._offenderEndDate,
    'referralDate': this._referralDate,
    'conditionLength': this._conditionLength,
    'offenderPrgObligationId' : this._offenderPrgObligationId,
    'workloadUnits': this._workloadUnits,
    'workedStaffMembers': this._workedStaffMembers
};
}
}
