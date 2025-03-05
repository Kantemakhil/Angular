import { BaseModel } from '@commonbeans/BaseModel';

export class OffenderProgramProfiles extends BaseModel {
   
    private _parentOffPrgrefId: number;
    private _createUserId: string;
    private _creditOtherHours: number;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _modifyUserId: string;
    private _offenderProgramStatus: string;
    private _referralCommentText: string;
    private _commentText: string;
    private _neededFlag: string;
    private _serialVersionUID: number;
    private _rejectDate: Date;
    private _offPrgrefId: number;
    private _referralDate: Date;
    private _crsActyId: number;
    private _offenderEndReason: string;
    private _offenderEndCommentText: string;
    private _offenderEndDate: Date;
    private _earlyEndReason: string;
    private _sealFlag: string;
    private _agreedTravelFare: number;
    private _holidayFlag: string;
    private _offenderStartDate: Date;
    private _agreedTravelHour: number;
    private _referralStaffId: number;
    private _profileClass: string;
    private _reviewedBy: string;
    private _rejectReasonCode: string;
    private _waitlistDecisionCode: string;
    private _sentenceSeq: number;
    private _startSessionNo: number;
    private _createDatetime: Date;
    private _medicalRecordSeq: number;
    private _creditWorkHours: number;
    private _suspendedFlag: string;
    private _agyLocId: string;
    private _completionDate: Date;
    private _offenderId: number;
    private _programId: number;
    private _parameter1: string;
    private _referralPriority: string;
    private _offenderPrgObligationId: number;
    private _providerName: string;
    private _programDescription: string;
    private _offenderIdDisplay: string;
    private _lastName: string;
    private _firstName: string;
    private _priority: string;
    private _activity: string;
    private _vacancy: string;
    private _decision: string;
    private _rejectReason: string;
    private _decisionDate: Date;
    private _facilityDescription: string;
    private _moduleName: string;
    private _offEndReasonVal: string;
    private _offEndCommentVal: string;
    private _refCommentVal: string;
    private _rejReason: string;
    private _rejDate: Date;
    private _scheduleStartDate: Date;
    private _scheduleEndDate: Date;
    private _allocate: string;
    private _chkActiveIaAllocation: number;
    private _offEndDate: Date;
    private _warningMsg: string;
    private _warningPrompt: string;
    private _begngDate: Date;
    private _maxCapacity: number;
    private _projectCode: string;
    private _projectDescription: string;
    private _teamDescription: string;
    private _offenderSentConditionId: number;
    private _activityDescription: string;
    private _programOffPrgrefId: number;
    private _internalLocationId: number;
    private _view: string;
    private _phaseDesc: string;
    private _moduleFlag: string;
    private _occuranceCode: string;
    private _agreedTravelTime: Date;
    private _nbtteamAreaCode: string;
    private _nbtAgyLocId :string;
    private _nbtStatus: string;
    private _offPrgStatusDbVal: string;
    private _moduleFrom: number;
    private _moduleTo: number;
    private _queryOnly: Boolean;
    private _emailAddressCount: number;
    private _phoneNumberCount: number;

   private _emailFlag: string;
    public get emailFlag(): string {
        return this._emailFlag;
    }
    public set emailFlag(value: string) {
        this._emailFlag = value;
    }
   private _smsFlag: string;
    public get smsFlag(): string {
        return this._smsFlag;
    }
    public set smsFlag(value: string) {
        this._smsFlag = value;
    }

   private _smsScheduleHoursBefore: number;
    public get smsScheduleHoursBefore(): number {
        return this._smsScheduleHoursBefore;
    }
    public set smsScheduleHoursBefore(value: number) {
        this._smsScheduleHoursBefore = value;
    }
   private _emailScheduleHoursBefore: number;
    public get emailScheduleHoursBefore(): number {
        return this._emailScheduleHoursBefore;
    }
    public set emailScheduleHoursBefore(value: number) {
        this._emailScheduleHoursBefore = value;
    }

    private _programLastEventDate: Date;

    public get programLastEventDate(): Date {
        return this._programLastEventDate;
    }
    public set programLastEventDate(value: Date) {
        this._programLastEventDate = value;
    }


    private _agreedTravelFare1:number;
    private _placementRecord: string;

    private _nonAssocationByIngAndGang: string;
    public get nonAssocationByIngAndGang(): string {
        return this._nonAssocationByIngAndGang;
    }
    public set nonAssocationByIngAndGang(value: string) {
        this._nonAssocationByIngAndGang = value;
    }

    get queryOnly(): Boolean { return this._queryOnly;     }
    set queryOnly(value: Boolean) { this._queryOnly = value; }

    get moduleFrom(): number { return this._moduleFrom;     }
    set moduleFrom(value: number) { this._moduleFrom = value; }

    get moduleTo(): number { return this._moduleTo;     }
    set moduleTo(value: number) { this._moduleTo = value; }

    get offPrgStatusDbVal(): string { return this._offPrgStatusDbVal;     }
    set offPrgStatusDbVal(value: string) { this._offPrgStatusDbVal = value; }

    get phaseDesc(): string { return this._phaseDesc;     }
    set phaseDesc(value: string) { this._phaseDesc = value; }

    get moduleFlag(): string { return this._moduleFlag;     }
    set moduleFlag(value: string) { this._moduleFlag = value; }

    get occuranceCode(): string { return this._occuranceCode;     }
    set occuranceCode(value: string) { this._occuranceCode = value; }

    get view(): string { return this._view;     }
    set view(value: string) { this._view = value; }

    get offenderSentConditionId(): number {       return this._offenderSentConditionId;     }
    set offenderSentConditionId(value: number) {          this._offenderSentConditionId = value;     } 

    get programOffPrgrefId(): number {         return this._programOffPrgrefId;     }
    set programOffPrgrefId(value: number) {         this._programOffPrgrefId = value;     }

    get activityDescription(): string {         return this._activityDescription;     }
    set activityDescription(value: string) {          this._activityDescription = value;     }

    get internalLocationId(): number {         return this._internalLocationId;     }
    set internalLocationId(value: number) {         this._internalLocationId = value;     }

    get teamDescription(): string { return this._teamDescription;    }
    set teamDescription(pteamDescription: string) { this._teamDescription = pteamDescription;}
    
    get projectDescription(): string { return this._projectDescription; }
    set projectDescription(pprojectDescription: string) { this._projectDescription = pprojectDescription; }

    get projectCode(): string {        return this._projectCode;     }
    set projectCode(pprojectCode: string) {         this._projectCode = pprojectCode;     }

    get maxCapacity(): number { return this._maxCapacity; }
    set maxCapacity(pmaxCapacity: number) { this._maxCapacity = pmaxCapacity; } 

    
    get begngDate(): Date { return this._begngDate; }
    set begngDate( pbegngDate: Date ) { this._begngDate =  pbegngDate; }

    get warningMsg(): string { return this._warningMsg; }
    set warningMsg( pwarningMsg: string ) { this._warningMsg =  pwarningMsg; }

    get warningPrompt(): string { return this._warningPrompt; }
    set warningPrompt( pwarningPrompt: string ) { this._warningPrompt =  pwarningPrompt; }

    get offEndDate(): Date { return this._offEndDate; }
    set offEndDate( poffEndDate: Date ) { this._offEndDate =  poffEndDate; }
    get chkActiveIaAllocation(): number { return this._chkActiveIaAllocation; }
    set chkActiveIaAllocation( pchkActiveIaAllocation: number ) { this._chkActiveIaAllocation =  pchkActiveIaAllocation; }
    
    get allocate(): string { return this._allocate; }
    set allocate( pallocate: string ) { this._allocate =  pallocate; }
    get scheduleStartDate(): Date { return this._scheduleStartDate; }
    set scheduleStartDate( pscheduleStartDate: Date ) { this._scheduleStartDate = pscheduleStartDate; }
    get scheduleEndDate(): Date { return this._scheduleEndDate; }
    set scheduleEndDate( pscheduleEndDate: Date ) { this._scheduleEndDate = pscheduleEndDate; }
    get rejDate(): Date { return this._rejDate; }
    set rejDate( prejDate: Date ) { this._rejDate = prejDate; }
    get refCommentVal(): string { return this._refCommentVal; }
    set refCommentVal( prefCommentVal: string ) { this._refCommentVal = prefCommentVal; }
    get rejReason(): string { return this._rejReason; }
    set rejReason( prejReason: string ) { this._rejReason = prejReason; }
    get offEndReasonVal(): string { return this._offEndReasonVal; }
    set offEndReasonVal( poffEndReasonVal: string ) { this._offEndReasonVal = poffEndReasonVal; }
    get offEndCommentVal(): string { return this._offEndCommentVal; }
    set offEndCommentVal( poffEndCommentVal: string ) { this._offEndCommentVal = poffEndCommentVal; }
    get moduleName(): string { return this._moduleName; }
    set moduleName( pmoduleName: string ) { this._moduleName = pmoduleName; }
    get facilityDescription(): string { return this._facilityDescription; }
    set facilityDescription( pfacilityDescription: string ) { this._facilityDescription = pfacilityDescription; }
    get parentOffPrgrefId(): number { return this._parentOffPrgrefId; }
    set parentOffPrgrefId( pparentOffPrgrefId: number ) { this._parentOffPrgrefId = pparentOffPrgrefId; }
    get createUserId(): string { return this._createUserId; }
    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }
    get creditOtherHours(): number { return this._creditOtherHours; }
    set creditOtherHours( pcreditOtherHours: number ) { this._creditOtherHours = pcreditOtherHours; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }
    get offenderProgramStatus(): string { return this._offenderProgramStatus; }
    set offenderProgramStatus( poffenderProgramStatus: string ) { this._offenderProgramStatus = poffenderProgramStatus; }
    get referralCommentText(): string { return this._referralCommentText; }
    set referralCommentText( preferralCommentText: string ) { this._referralCommentText = preferralCommentText; }
    get commentText(): string { return this._commentText; }
    set commentText( pcommentText: string ) { this._commentText = pcommentText; }
    get neededFlag(): string { return this._neededFlag; }
    set neededFlag( pneededFlag: string ) { this._neededFlag = pneededFlag; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID( pserialVersionUID: number ) { this._serialVersionUID = pserialVersionUID; }
    get rejectDate(): Date { return this._rejectDate; }
    set rejectDate( prejectDate: Date ) { this._rejectDate = prejectDate; }
    get offPrgrefId(): number { return this._offPrgrefId; }
    set offPrgrefId( poffPrgrefId: number ) { this._offPrgrefId = poffPrgrefId; }
    get referralDate(): Date { return this._referralDate; }
    set referralDate( preferralDate: Date ) { this._referralDate = preferralDate; }
    get crsActyId(): number { return this._crsActyId; }
    set crsActyId( pcrsActyId: number ) { this._crsActyId = pcrsActyId; }
    get offenderEndReason(): string { return this._offenderEndReason; }
    set offenderEndReason( poffenderEndReason: string ) { this._offenderEndReason = poffenderEndReason; }
    get offenderEndCommentText(): string { return this._offenderEndCommentText; }
    set offenderEndCommentText( poffenderEndCommentText: string ) { this._offenderEndCommentText = poffenderEndCommentText; }
    get offenderEndDate(): Date { return this._offenderEndDate; }
    set offenderEndDate( poffenderEndDate: Date ) { this._offenderEndDate = poffenderEndDate; }
    get earlyEndReason(): string { return this._earlyEndReason; }
    set earlyEndReason( pearlyEndReason: string ) { this._earlyEndReason = pearlyEndReason; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }
    get agreedTravelFare(): number { return this._agreedTravelFare; }
    set agreedTravelFare( pagreedTravelFare: number ) { this._agreedTravelFare = pagreedTravelFare; }
    get holidayFlag(): string { return this._holidayFlag; }
    set holidayFlag( pholidayFlag: string ) { this._holidayFlag = pholidayFlag; }
    get offenderStartDate(): Date { return this._offenderStartDate; }
    set offenderStartDate( poffenderStartDate: Date ) { this._offenderStartDate = poffenderStartDate; }
    get agreedTravelHour(): number { return this._agreedTravelHour; }
    set agreedTravelHour( pagreedTravelHour: number ) { this._agreedTravelHour = pagreedTravelHour; }
    get referralStaffId(): number { return this._referralStaffId; }
    set referralStaffId( preferralStaffId: number ) { this._referralStaffId = preferralStaffId; }
    get profileClass(): string { return this._profileClass; }
    set profileClass( pprofileClass: string ) { this._profileClass = pprofileClass; }
    get reviewedBy(): string { return this._reviewedBy; }
    set reviewedBy( previewedBy: string ) { this._reviewedBy = previewedBy; }
    get rejectReasonCode(): string { return this._rejectReasonCode; }
    set rejectReasonCode( prejectReasonCode: string ) { this._rejectReasonCode = prejectReasonCode; }
    get waitlistDecisionCode(): string { return this._waitlistDecisionCode; }
    set waitlistDecisionCode( pwaitlistDecisionCode: string ) { this._waitlistDecisionCode = pwaitlistDecisionCode; }
    get sentenceSeq(): number { return this._sentenceSeq; }
    set sentenceSeq( psentenceSeq: number ) { this._sentenceSeq = psentenceSeq; }
    get startSessionNo(): number { return this._startSessionNo; }
    set startSessionNo( pstartSessionNo: number ) { this._startSessionNo = pstartSessionNo; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }
    get medicalRecordSeq(): number { return this._medicalRecordSeq; }
    set medicalRecordSeq( pmedicalRecordSeq: number ) { this._medicalRecordSeq = pmedicalRecordSeq; }
    get creditWorkHours(): number { return this._creditWorkHours; }
    set creditWorkHours( pcreditWorkHours: number ) { this._creditWorkHours = pcreditWorkHours; }
    get suspendedFlag(): string { return this._suspendedFlag; }
    set suspendedFlag( psuspendedFlag: string ) { this._suspendedFlag = psuspendedFlag; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId( pagyLocId: string ) { this._agyLocId = pagyLocId; }
    get completionDate(): Date { return this._completionDate; }
    set completionDate( pcompletionDate: Date ) { this._completionDate = pcompletionDate; }
    get offenderId(): number { return this._offenderId; }
    set offenderId( poffenderId: number ) { this._offenderId = poffenderId; }
    get programId(): number { return this._programId; }
    set programId( programId: number ) { this._programId = programId; }
    get parameter1(): string { return this._parameter1; }
    set parameter1( pparameter1: string ) { this._parameter1 = pparameter1; }
    get referralPriority(): string { return this._referralPriority; }
    set referralPriority( preferralPriority: string ) { this._referralPriority = preferralPriority; }
    get offenderPrgObligationId(): number { return this._offenderPrgObligationId; }
    set offenderPrgObligationId(poffenderPrgObligationId: number) { this._offenderPrgObligationId = poffenderPrgObligationId ; }
    get providerName(): string { return this._providerName; }
    set providerName( pproviderName: string ) { this._providerName = pproviderName; }
    get programDescription(): string { return this._programDescription; }
    set programDescription( pprogramDescription: string ) { this._programDescription = pprogramDescription; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }
    set offenderIdDisplay( poffenderIdDisplay: string ) { this._offenderIdDisplay = poffenderIdDisplay; }
    get firstName(): string { return this._firstName; }
    set firstName( pfirstName: string ) { this._firstName = pfirstName; }
    get lastName(): string { return this._lastName; }
    set lastName( plastName: string ) { this._lastName = plastName; }
    get priority(): string { return this._priority; }
    set priority( ppriority: string ) { this._priority = ppriority; }
    get activity(): string { return this._activity; }
    set activity( pactivity: string ) { this._activity = pactivity; }
    get vacancy(): string { return this._vacancy; }
    set vacancy( pvacancy: string ) { this._vacancy = pvacancy; }
    get decision(): string { return this._decision; }
    set decision( pdecision: string ) { this._decision = pdecision; }
    get rejectReason(): string { return this._rejectReason; }
    set rejectReason( prejectReason: string ) { this._rejectReason = prejectReason; }
    get decisionDate(): Date { return this._decisionDate; }
    set decisionDate( pdecisionDate: Date ) { this._decisionDate = pdecisionDate; }
    get agreedTravelTime(): Date { return this._agreedTravelTime; }
    set agreedTravelTime( pagreedTravelTime: Date ) { this._agreedTravelTime = pagreedTravelTime; }

    get nbtteamAreaCode(): string { return this._nbtteamAreaCode; }
    set nbtteamAreaCode( pnbtteamAreaCode: string ) { this._nbtteamAreaCode = pnbtteamAreaCode; }

    get nbtAgyLocId(): string { return this._nbtAgyLocId; }
    set nbtAgyLocId( pnbtAgyLocId: string ) { this._nbtAgyLocId = pnbtAgyLocId; }
    get nbtStatus(): string { return this._nbtStatus; }
    set nbtStatus( pnbtStatus: string ) { this._nbtStatus = pnbtStatus; }
    get agreedTravelFare1(): number { return this._agreedTravelFare1; }
    set agreedTravelFare1( pagreedTravelFare1: number ) { this._agreedTravelFare1 = pagreedTravelFare1; }
    get placementRecord(): string { return this._placementRecord; }
    set placementRecord(value: string) { this._placementRecord = value; }
    public get emailAddressCount(): number { return this._emailAddressCount;}
    public set emailAddressCount(value: number) {this._emailAddressCount = value;}
    public get phoneNumberCount(): number {return this._phoneNumberCount;}
    public set phoneNumberCount(value: number) { this._phoneNumberCount = value;}

    toJSON(): any {
        return {
            'parentOffPrgrefId': this._parentOffPrgrefId,
            'createUserId': this._createUserId,
            'creditOtherHours': this._creditOtherHours,
            'modifyDatetime': this._modifyDatetime,
            'offenderBookId': this._offenderBookId,
            'modifyUserId': this._modifyUserId,
            'offenderProgramStatus': this._offenderProgramStatus,
            'referralCommentText': this._referralCommentText,
            'commentText': this._commentText,
            'neededFlag': this._neededFlag,
            'serialVersionUID': this._serialVersionUID,
            'rejectDate': this._rejectDate,
            'offPrgrefId': this._offPrgrefId,
            'referralDate': this._referralDate,
            'crsActyId': this._crsActyId,
            'offenderEndReason': this._offenderEndReason,
            'offenderEndCommentText': this._offenderEndCommentText,
            'offenderEndDate': this._offenderEndDate,
            'earlyEndReason': this._earlyEndReason,
            'sealFlag': this._sealFlag,
            'agreedTravelFare': this._agreedTravelFare,
            'holidayFlag': this._holidayFlag,
            'offenderStartDate': this._offenderStartDate,
            'agreedTravelHour': this._agreedTravelHour,
            'referralStaffId': this._referralStaffId,
            'profileClass': this._profileClass,
            'reviewedBy': this._reviewedBy,
            'rejectReasonCode': this._rejectReasonCode,
            'waitlistDecisionCode': this._waitlistDecisionCode,
            'sentenceSeq': this._sentenceSeq,
            'startSessionNo': this._startSessionNo,
            'createDatetime': this._createDatetime,
            'medicalRecordSeq': this._medicalRecordSeq,
            'creditWorkHours': this._creditWorkHours,
            'suspendedFlag': this._suspendedFlag,
            'agyLocId': this._agyLocId,
            'completionDate': this._completionDate,
            'offenderId': this._offenderId,
            'programId': this._programId,
            'parameter1': this._parameter1,
            'referralPriority': this._referralPriority,
            'offenderPrgObligationId': this._offenderPrgObligationId,
            'providerName': this._providerName,
            'programDescription': this._programDescription,
            'offenderIdDisplay': this._offenderIdDisplay,
            'firstName': this._firstName,
            'lastName': this._lastName,
            'priority': this._priority,
            'activity': this._activity,
            'vacancy': this._vacancy,
            'decision': this._decision,
            'rejectReason': this._rejectReason,
            'decisionDate': this._decisionDate,
            'facilityDescription': this._facilityDescription,
            'moduleName': this._moduleName,
            'offEndCommentVal': this._offEndCommentVal,
            'offEndReasonVal': this._offEndReasonVal,
            'rejReason': this._rejReason,
            'refCommentVal': this._refCommentVal,
            'rejDate': this._rejDate,
            'scheduleEndDate': this._scheduleEndDate,
            'scheduleStartDate': this._scheduleStartDate,
            'chkActiveIaAllocation': this._chkActiveIaAllocation,
            'offEndDate': this._offEndDate,
            'begngDate' : this._begngDate,
            'occuranceCode': this._occuranceCode,
            'moduleFlag': this._moduleFlag,
            'phaseDesc': this._phaseDesc,
            'agreedTravelTime': this._agreedTravelTime,
            'nbtteamAreaCode' : this._nbtteamAreaCode,
            'nbtAgyLocId' : this._nbtAgyLocId,
            'nbtStatus': this._nbtStatus,
            'offPrgStatusDbVal': this._offPrgStatusDbVal,
            'moduleFrom': this._moduleFrom,
            'moduleTo': this._moduleTo,
            'queryOnly': this.queryOnly,
            'agreedTravelFare1' :this.agreedTravelFare1,
            'placementRecord': this.placementRecord,
            'emailFlag':this._emailFlag,
            'smsFlag':this._smsFlag,
            'smsScheduleHoursBefore':this._smsScheduleHoursBefore,
            'emailScheduleHoursBefore':this._emailScheduleHoursBefore,
            'programLastEventDate':this._programLastEventDate,
            'emailAddressCount':this._emailAddressCount,
            'phoneNumberCount':this._phoneNumberCount,
        };
    }
 }
