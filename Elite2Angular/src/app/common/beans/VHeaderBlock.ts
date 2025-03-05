import { BaseModel } from '@commonbeans/BaseModel';
import { Offenders } from './Offenders';

export class VHeaderBlock extends BaseModel {

    private _activeFlag: string;
    private _age: number;
    private _agencyImlId: number;
    private _agyLocId: string;
    private _agyLocType: string;
    private _aliasOffenderId: number;
    private _assignedStaffId: number;
    private _birthDate: Date;
    private _bookingBeginDate: Date;
    private _bookingCreatedDate: Date;
    private _bookingEndDate: Date;
    private _bookingNo: string;
    private _bookingStatus: string;
    private _bookingType: string;
    private _communityActiveFlag: string;
    private _communityStatus: string;
    private _createAgyLocId: string;
    private _createIntakeAgyLocId: string;
    private _disclosureFlag: string;
    private _ethnicity: string;
    private _firstName: string;
    private _gender: string;
    private _headerStatus: string;
    private _inOutStatus: string;
    private _intakeAgyLocId: string;
    private _lastName: string;
    private _livUnitDesc: string;
    private _livingUnitDescription: string;
    private _livingUnitId: number;
    private _locationCode: string;
    private _middleName: string;
    private _movementReason: string;
    private _offAlerts: string;
    private _offSupLevel: string;
    private _offenderBookId: number;
    private _offenderId: number;
    private _offenderIdDisplay: string;
    private _officer: string;
    private _prisonLocation: string;
    private _rootOffenderId: number;
    private _status1: string;
    private _status2: string;
    private _status3: string;
    private _statusDisplay: string;
    private _statusReason: string;
    private _suffix: string;
    private _currTime: string;
    private _currDate: string;
    private _selectedReason: string;
    private _selectedReasonDescription: string;
    private _image: any;
    private _caseLoadId: string;
    private _userId: string;
    private _createuserId: string;
    private _createDatetime: Date;
    private _activeDatetime: Date;
    private _nbtAssignReason: string;
    private _nbtUpdate: string;
    private _nbtOffenderBookId: number;
    private _nbtOffenderId: number;
    private _nbtAgyLocId: string;
    private _nbtNonAssBProceed: boolean;
    private _nbtNonAssVProceed: boolean;
    private _nbtChkSecBProceed: boolean;
    private _nbtChkSecVProceed: boolean;
    private _insertedFlag: boolean;
    private _caseloadType: boolean;
    private _trustAccount: boolean;
    private _createAccount: boolean;
    private _sealFlag: string;
    private _offenderFullName: string;
    private _activeCheckbox: boolean;
    private _sex: string;
    private _isNonAssocOverriddenWarn: string;
    private _notification: string;
    private _offenderName: string;
    
    private _casePlanFlag: string;
    private _conditionsFlag: string;
    private _courtReportFlag: string;
    private _courtActionFlag: string;

    private _nonAssocationDetails: Array<Offenders>;

    private _nonAssocationData: string;
    private _gangConflitData: string;
    private _parentForm: string;
    private _releaseConfirmFlag: boolean;

    get gangConflitData(): string { return this._gangConflitData; }
    set gangConflitData( pgangConflitData: string ) { this._gangConflitData = pgangConflitData; }
    
    public get nonAssocationData(): string {
        return this._nonAssocationData;
    }
    public set nonAssocationData(value: string) {
        this._nonAssocationData = value;
    }

    public get nonAssocationDetails(): Array<Offenders> {
        return this._nonAssocationDetails;
    }
    public set nonAssocationDetails(value: Array<Offenders>) {
        this._nonAssocationDetails = value;
    }


    public get sex(): string {
        return this._sex;
    }
    public set sex(value: string) {
        this._sex = value;
    }
    
    
    public get activeCheckbox(): boolean {
        return this._activeCheckbox;
    }
    public set activeCheckbox(value: boolean) {
        this._activeCheckbox = value;
    }


    get offenderFullName(): string { return this._offenderFullName; }

    set offenderFullName( poffenderFullName: string ) { this._offenderFullName = poffenderFullName; }


    get image(): any { return this._image; }

    set image( image: any ) { this._image = image; }

    get selectedReasonDescription(): string { return this._selectedReasonDescription; }

    set selectedReasonDescription( pselectedReasonDescription: string ) { this._selectedReasonDescription = pselectedReasonDescription; }

    get selectedReason(): string { return this._selectedReason; }

    set selectedReason( pselectedReason: string ) { this._selectedReason = pselectedReason; }

    get currTime(): string { return this._currTime; }

    set currTime( pcurrTime: string ) { this._currTime = pcurrTime; }

    get currDate(): string { return this._currDate; }

    set currDate( pcurrDate: string ) { this._currDate = pcurrDate; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag( pactiveFlag: string ) { this._activeFlag = pactiveFlag; }

    get age(): number { return this._age; }

    set age( page: number ) { this._age = page; }

    get agencyImlId(): number { return this._agencyImlId; }

    set agencyImlId( pagencyImlId: number ) { this._agencyImlId = pagencyImlId; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId( pagyLocId: string ) { this._agyLocId = pagyLocId; }

    get agyLocType(): string { return this._agyLocType; }

    set agyLocType( pagyLocType: string ) { this._agyLocType = pagyLocType; }

    get aliasOffenderId(): number { return this._aliasOffenderId; }

    set aliasOffenderId( paliasOffenderId: number ) { this._aliasOffenderId = paliasOffenderId; }

    get assignedStaffId(): number { return this._assignedStaffId; }

    set assignedStaffId( passignedStaffId: number ) { this._assignedStaffId = passignedStaffId; }

    get birthDate(): Date { return this._birthDate; }

    set birthDate( pbirthDate: Date ) { this._birthDate = pbirthDate; }

    get bookingBeginDate(): Date { return this._bookingBeginDate; }

    set bookingBeginDate( pbookingBeginDate: Date ) { this._bookingBeginDate = pbookingBeginDate; }

    get bookingCreatedDate(): Date { return this._bookingCreatedDate; }

    set bookingCreatedDate( pbookingCreatedDate: Date ) { this._bookingCreatedDate = pbookingCreatedDate; }

    get bookingEndDate(): Date { return this._bookingEndDate; }

    set bookingEndDate( pbookingEndDate: Date ) { this._bookingEndDate = pbookingEndDate; }

    get bookingNo(): string { return this._bookingNo; }

    set bookingNo( pbookingNo: string ) { this._bookingNo = pbookingNo; }

    get bookingStatus(): string { return this._bookingStatus; }

    set bookingStatus( pbookingStatus: string ) { this._bookingStatus = pbookingStatus; }

    get bookingType(): string { return this._bookingType; }

    set bookingType( pbookingType: string ) { this._bookingType = pbookingType; }

    get communityActiveFlag(): string { return this._communityActiveFlag; }

    set communityActiveFlag( pcommunityActiveFlag: string ) { this._communityActiveFlag = pcommunityActiveFlag; }

    get communityStatus(): string { return this._communityStatus; }

    set communityStatus( pcommunityStatus: string ) { this._communityStatus = pcommunityStatus; }

    get createAgyLocId(): string { return this._createAgyLocId; }

    set createAgyLocId( pcreateAgyLocId: string ) { this._createAgyLocId = pcreateAgyLocId; }

    get createIntakeAgyLocId(): string { return this._createIntakeAgyLocId; }

    set createIntakeAgyLocId( pcreateIntakeAgyLocId: string ) { this._createIntakeAgyLocId = pcreateIntakeAgyLocId; }

    get disclosureFlag(): string { return this._disclosureFlag; }

    set disclosureFlag( pdisclosureFlag: string ) { this._disclosureFlag = pdisclosureFlag; }

    get ethnicity(): string { return this._ethnicity; }

    set ethnicity( pethnicity: string ) { this._ethnicity = pethnicity; }

    get firstName(): string { return this._firstName; }

    set firstName( pfirstName: string ) { this._firstName = pfirstName; }

    get gender(): string { return this._gender; }

    set gender( pgender: string ) { this._gender = pgender; }

    get headerStatus(): string { return this._headerStatus; }

    set headerStatus( pheaderStatus: string ) { this._headerStatus = pheaderStatus; }

    get inOutStatus(): string { return this._inOutStatus; }

    set inOutStatus( pinOutStatus: string ) { this._inOutStatus = pinOutStatus; }

    get intakeAgyLocId(): string { return this._intakeAgyLocId; }

    set intakeAgyLocId( pintakeAgyLocId: string ) { this._intakeAgyLocId = pintakeAgyLocId; }

    get lastName(): string { return this._lastName; }

    set lastName( plastName: string ) { this._lastName = plastName; }

    get livUnitDesc(): string { return this._livUnitDesc; }

    set livUnitDesc( plivUnitDesc: string ) { this._livUnitDesc = plivUnitDesc; }

    get livingUnitDescription(): string { return this._livingUnitDescription; }

    set livingUnitDescription( plivingUnitDescription: string ) { this._livingUnitDescription = plivingUnitDescription; }

    get livingUnitId(): number { return this._livingUnitId; }

    set livingUnitId( plivingUnitId: number ) { this._livingUnitId = plivingUnitId; }

    get locationCode(): string { return this._locationCode; }

    set locationCode( plocationCode: string ) { this._locationCode = plocationCode; }

    get middleName(): string { return this._middleName; }

    set middleName( pmiddleName: string ) { this._middleName = pmiddleName; }

    get movementReason(): string { return this._movementReason; }

    set movementReason( pmovementReason: string ) { this._movementReason = pmovementReason; }

    get offAlerts(): string { return this._offAlerts; }

    set offAlerts( poffAlerts: string ) { this._offAlerts = poffAlerts; }

    get offSupLevel(): string { return this._offSupLevel; }

    set offSupLevel( poffSupLevel: string ) { this._offSupLevel = poffSupLevel; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }

    get offenderId(): number { return this._offenderId; }

    set offenderId( poffenderId: number ) { this._offenderId = poffenderId; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay( poffenderIdDisplay: string ) { this._offenderIdDisplay = poffenderIdDisplay; }

    get officer(): string { return this._officer; }

    set officer( pofficer: string ) { this._officer = pofficer; }

    get prisonLocation(): string { return this._prisonLocation; }

    set prisonLocation( pprisonLocation: string ) { this._prisonLocation = pprisonLocation; }

    get rootOffenderId(): number { return this._rootOffenderId; }

    set rootOffenderId( prootOffenderId: number ) { this._rootOffenderId = prootOffenderId; }

    get status1(): string { return this._status1; }

    set status1( pstatus1: string ) { this._status1 = pstatus1; }

    get status2(): string { return this._status2; }

    set status2( pstatus2: string ) { this._status2 = pstatus2; }

    get status3(): string { return this._status3; }

    set status3( pstatus3: string ) { this._status3 = pstatus3; }

    get statusDisplay(): string { return this._statusDisplay; }

    set statusDisplay( pstatusDisplay: string ) { this._statusDisplay = pstatusDisplay; }

    get statusReason(): string { return this._statusReason; }

    set statusReason( pstatusReason: string ) { this._statusReason = pstatusReason; }

    get suffix(): string { return this._suffix; }

    set suffix( psuffix: string ) { this._suffix = psuffix; }

    get caseLoadId(): string { return this._caseLoadId; }

    set caseLoadId( pcaseLoadId: string ) { this._caseLoadId = pcaseLoadId; }

    get userId(): string { return this._userId; }

    set userId( puserId: string ) { this._userId = puserId; }

    get createuserId(): string { return this._createuserId; }

    set createuserId( pcreateuserId: string ) { this._createuserId = pcreateuserId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }

    get activeDatetime(): Date { return this._activeDatetime; }

    set activeDatetime( pactiveDatetime: Date ) { this._activeDatetime = pactiveDatetime; }

    get nbtAssignReason(): string { return this._nbtAssignReason; }

    set nbtAssignReason( pnbtAssignReason: string ) { this._nbtAssignReason = pnbtAssignReason; }

    get nbtUpdate(): string { return this._nbtUpdate; }

    set nbtUpdate( pnbtUpdate: string ) { this._nbtUpdate = pnbtUpdate; }

    get nbtOffenderBookId(): number { return this._nbtOffenderBookId; }

    set nbtOffenderBookId( pnbtOffenderBookId: number ) { this._nbtOffenderBookId = pnbtOffenderBookId; }

    get nbtOffenderId(): number { return this._nbtOffenderId; }

    set nbtOffenderId( pnbtOffenderId: number ) { this._nbtOffenderId = pnbtOffenderId; }

    get nbtAgyLocId(): string { return this._nbtAgyLocId; }

    set nbtAgyLocId( pnbtAgyLocId: string ) { this._nbtAgyLocId = pnbtAgyLocId; }

    get nbtNonAssBProceed(): boolean { return this._nbtNonAssBProceed; }

    set nbtNonAssBProceed(pnbtNonAssBProceed: boolean) { this._nbtNonAssBProceed = pnbtNonAssBProceed; }

    get nbtNonAssVProceed(): boolean { return this._nbtNonAssVProceed; }

    set nbtNonAssVProceed(pnbtNonAssVProceed: boolean) { this._nbtNonAssVProceed = pnbtNonAssVProceed; }

    get nbtChkSecBProceed(): boolean { return this._nbtChkSecBProceed; }

    set nbtChkSecBProceed(pnbtChkSecBProceed: boolean) { this._nbtChkSecBProceed = pnbtChkSecBProceed; }

    get nbtChkSecVProceed(): boolean { return this._nbtChkSecVProceed; }

    set nbtChkSecVProceed(pnbtChkSecVProceed: boolean) { this._nbtChkSecVProceed = pnbtChkSecVProceed; }

    get insertedFlag(): boolean { return this._insertedFlag; }

    set insertedFlag(pinsertedFlag: boolean) { this._insertedFlag = pinsertedFlag; }

    get trustAccount(): boolean { return this._trustAccount; }

    set trustAccount(ptrustAccount: boolean) { this._trustAccount = ptrustAccount; }

    get createAccount(): boolean { return this._createAccount; }

    set createAccount( pcreateAccount: boolean ) { this._createAccount = pcreateAccount; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get isNonAssocOverriddenWarn(): string { return this._isNonAssocOverriddenWarn; }

     set isNonAssocOverriddenWarn(pisNonAssocOverriddenWarn: string) { this._isNonAssocOverriddenWarn = pisNonAssocOverriddenWarn; }
   
     get notification(): string { return this._notification; }

     set notification(pnotification: string) { this._notification = pnotification; }

     public get offenderName(): string { return this._offenderName;}
    public set offenderName(value: string) { this._offenderName = value; }


    get casePlanFlag(): string { return this._casePlanFlag; }

    set casePlanFlag( pcasePlanFlag: string ) { this._casePlanFlag = pcasePlanFlag; }

    get conditionsFlag(): string { return this._conditionsFlag; }

    set conditionsFlag( pconditionsFlag: string ) { this._conditionsFlag = pconditionsFlag; }

    get courtReportFlag(): string { return this._courtReportFlag; }

    set courtReportFlag( pcourtReportFlag: string ) { this._courtReportFlag = pcourtReportFlag; }

    get courtActionFlag(): string { return this._courtActionFlag; }

    set courtActionFlag( pcourtActionFlag: string ) { this._courtActionFlag = pcourtActionFlag; }

    get parentForm(): string { return this._parentForm; }

    set parentForm(value: string) { this._parentForm = value; }

    public get releaseConfirmFlag(): boolean {
        return this._releaseConfirmFlag;
    }
    public set releaseConfirmFlag(value: boolean) {
        this._releaseConfirmFlag = value;
    }
    toJSON(): any {
        return {
            'activeFlag': this._activeFlag,
            'age': this._age,
            'agencyImlId': this._agencyImlId,
            'agyLocId': this._agyLocId,
            'agyLocType': this._agyLocType,
            'aliasOffenderId': this._aliasOffenderId,
            'assignedStaffId': this._assignedStaffId,
            'birthDate': this._birthDate,
            'bookingBeginDate': this._bookingBeginDate,
            'bookingCreatedDate': this._bookingCreatedDate,
            'bookingEndDate': this._bookingEndDate,
            'bookingNo': this._bookingNo,
            'bookingStatus': this._bookingStatus,
            'bookingType': this._bookingType,
            'communityActiveFlag': this._communityActiveFlag,
            'communityStatus': this._communityStatus,
            'createAgyLocId': this._createAgyLocId,
            'createIntakeAgyLocId': this._createIntakeAgyLocId,
            'disclosureFlag': this._disclosureFlag,
            'ethnicity': this._ethnicity,
            'firstName': this._firstName,
            'gender': this._gender,
            'headerStatus': this._headerStatus,
            'inOutStatus': this._inOutStatus,
            'intakeAgyLocId': this._intakeAgyLocId,
            'lastName': this._lastName,
            'livUnitDesc': this._livUnitDesc,
            'livingUnitDescription': this._livingUnitDescription,
            'livingUnitId': this._livingUnitId,
            'locationCode': this._locationCode,
            'middleName': this._middleName,
            'movementReason': this._movementReason,
            'offAlerts': this._offAlerts,
            'offSupLevel': this._offSupLevel,
            'offenderBookId': this._offenderBookId,
            'offenderId': this._offenderId,
            'offenderIdDisplay': this._offenderIdDisplay,
            'officer': this._officer,
            'prisonLocation': this._prisonLocation,
            'rootOffenderId': this._rootOffenderId,
            'status1': this._status1,
            'status2': this._status2,
            'status3': this._status3,
            'statusDisplay': this._statusDisplay,
            'statusReason': this._statusReason,
            'suffix': this._suffix,
            'image': this._image,
            'caseLoadId': this._caseLoadId,
            'userId' : this._userId,
            'createuserId': this._createuserId,
            'createDatetime': this._createDatetime,
            'activeDatetime': this._activeDatetime,
            'nbtAssignReason' : this._nbtAssignReason,
            'nbtUpdate': this._nbtUpdate,
            'nbtOffenderBookId': this._nbtOffenderBookId,
            'nbtOffenderId': this._nbtOffenderId,
            'nbtAgyLocId': this._nbtAgyLocId,
            'nbtNonAssBProceed': this._nbtNonAssBProceed,
            'nbtNonAssVProceed': this._nbtNonAssVProceed,
            'nbtChkSecBProceed': this._nbtChkSecBProceed,
            'nbtChkSecVProceed': this._nbtChkSecVProceed,
            'insertedFlag': this._insertedFlag,
            'trustAccount': this._trustAccount,
            'createAccount': this._createAccount,
            'sealFlag': this._sealFlag,
            'offenderFullName':this._offenderFullName,
            'sex':this._sex,
            'isNonAssocOverriddenWarn':this.isNonAssocOverriddenWarn,
            'notification':this._notification,
            'casePlanFlag': this._casePlanFlag,
            'conditionsFlag': this._conditionsFlag,
            'courtReportFlag': this._courtReportFlag,
            'courtActionFlag': this._courtActionFlag,
            'nonAssocationDetails':this._nonAssocationDetails,
            '_nonAssocationData':this.nonAssocationData,
            'gangConflitData': this._gangConflitData,
            'parentForm': this._parentForm,
            'releaseConfirmFlag': this._releaseConfirmFlag
        };
    }
}
