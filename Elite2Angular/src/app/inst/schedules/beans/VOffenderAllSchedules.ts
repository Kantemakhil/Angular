
export class VOffenderAllSchedules {
    private _unexcusedAbsenceFlag: string;
    private _offenderBookId: number;
    private _livingUnitDesc: string;
    private _luLevel4Code: string;
    private _toIntLocLevel1Code: string;
    private _offenderFirstName: string;
    private _toLocDesc: string;
    private _livingUnitId: number;
    private _applicationTime: Date;
    private _bookingActiveFlag: string;
    private _scheduleMovementTime: Date;
    private _toCityCode: string;
    private _details: string;
    private _toIntLocLevel2Code: string;
    private _toAddressOwnerClass: string;
    private _eventId: number;
    private _luLevel1Code: string;
    private _toCityName: string;
    private _toInternalLocationId: number;
    private _toIntLocUserDesc: string;
    private _hiddenCommentText: string;
    private _engagementCode: string;
    private _toAgyLocDesc: string;
    private _escortDesc: string;
    private _agencyImlLevel2Code: string;
    private _agreedTravelHour: number;
    private _eventType: string;
    private _scheduledTripId: number;
    private _offenderLastName: string;
    private _returnTime: Date;
    private _toIntLocLevel3Code: string;
    private _eventOutcomeDesc: string;
    private _agencyImlDesc: string;
    private _contactPersonName: string;
    private _luLevel2Code: string;
    private _agencyImlLevel1Code: string;
    private _inChargeStaffName: string;
    private _inChargeStaffId: number;
    private _eventSubTypeDesc: string;
    private _checkSum: number;
    private _luLevel3Code: string;
    private _offenderId: number;
    private _provStateCode: string;
    private _outTime: Date;
    private _eventDate: Date;
    private _applicationDate: Date;
    private _bookingNo: string;
    private _performanceCode: string;
    private _escortCode: string;
    private _offenderIdDisplay: string;
    private _eventTypeDesc: string;
    private _commentText: string;
    private _outcomeReasonCode: string;
    private _referenceId: number;
    private _agencyImlId: number;
    private _unpaidWorkBehaviour: string;
    private _provStateDesc: string;
    private _inOutStatus: string;
    private _returnDate: Date;
    private _toLoc: string;
    private _pieceWork: number;
    private _checkBox2: string;
    private _offPrgrefId: number;
    private _checkBox1: string;
    private _fromCityName: string;
    private _startTime: Date;
    private _eventStatusDesc: string;
    private _agencyImlLevel3Code: string;
    private _understandingCode: string;
    private _sickNoteReceivedDate: Date;
    private _toAgyLocId: string;
    private _taId: number;
    private _activeFlag: string;
    private _busyDateFlag: string;
    private _recordSource: string;
    private _eventClass: string;
    private _eventSubType: string;
    private _toInternalLocationDesc: string;
    private _sickNoteExpiryDate: Date;
    private _unpaidWorkAction: string;
    private _creditedHours: number;
    private _transportCode: string;
    private _directionCode: string;
    private _unpaidWorkSupervisor: string;
    private _inTime: Date;
    private _fromCityCode: string;
    private _eventOutcome: string;
    private _eventStatus: string;
    private _agyLocId: string;
    private _endTime: Date;
    private _agyLocDesc: string;
    private _toAddressId: number;
    private _daysOut: string;
    private _hoursOut: string;
    private _fromDate: Date;
    private _toDate: Date;
    private _fMDate: Date;
    private _fMTime: Date;
    private _confirmMove: string;
    private _caseLoadId: string;
    private _nbtEventId: number;
    private _nbtRequestDate: Date;
    private _nbtWaitListStatus: string;
    private _nbtStatusDate: Date;
    private _nbtTransferPriority: string;
    private _nbtApprovedFlag: string;
    private _nbtApprovedStaffId: number;
    private _nbtOutcomeReasonCode: string;
    private _nbtCommentText1: string;
    private _nbtLastName: string;
    private _nbtFirstName: string;
    private _nbtCreateDatetime: Date;
    private _conflictFlag: boolean;
    private _insertedFlag: boolean;
    private _nbtCreateUserId: string;
    private _nbtEventDate: string;
    private _nbtStartTime: string;
    private _alertDateDisplay: string;
    private _description: string;
    private _eventPurpose: string;

    private _offenderBookIdOne: number;
    private _offenderIdOne: number;
    private _toInternalLocationIdOne: number;

    private _warningMsg: string;
    private _warningPrompt: string;
    private _returnValue: number;
    private _nbtUpdOutcomeFlag: string;
    private _ctrlpsFromDate: Date;
    private _ctrlpsToDate: Date;
    private _ctrlpsStartTime: Date;
    private _ctrlpsEndTime: Date;
    private _ctrlpsOutCome: string;
	private _nbtSchCount: number;

	private _eventDateCount: Date;
	private _eventOutcomeDb: string;
	private _eventOutcomeCount: string;
	private _threeip: string;
    private _staffId: number;
    private _count: boolean;
    private _emailFlag: string;
    private _smsFlag: string;
    private _cancelFlag: string;
    private _emailScheduleHoursBefore: number;
    private _smsScheduleHoursBefore: number;
    private _emailSentFlag: string;
    private _smsSentFlag: string;
    private _emailFlagTemp: string;
    private _smsFlagTemp: string;
    private _emailAddressCount: number;
    private _phoneNumberCount: number;
    private _nonAssociationFlag: string;
    private _seriesId: number;
    private _isSeriesDelete: boolean;
    private _agyLocIdTemp: string;
    private _location: string;
    private _outcome: string;
    private _cancelReason: string;
    private _cancelEventFalg: boolean;
    private _checkscheduledtrip:boolean;
    private _departureDate: Date;
    private _status: string;
    private _moduleName: string;


    

    public get eventPurpose(): string {
        return this._eventPurpose;
    }
    public set eventPurpose(value: string) {
        this._eventPurpose = value;
    }

    public get moduleName(): string {
        return this._moduleName;
    }
    public set moduleName(value: string) {
        this._moduleName = value;
    }
    
    public get cancelEventFalg(): boolean {
        return this._cancelEventFalg;
    }
    public set cancelEventFalg(value: boolean) {
        this._cancelEventFalg = value;
    }

    public get cancelReason(): string {
        return this._cancelReason;
    }
    public set cancelReason(value: string) {
        this._cancelReason = value;
    }
    public get outcome(): string {
        return this._outcome;
    }
    public set outcome(value: string) {
        this._outcome = value;
    }
    public get location(): string {
        return this._location;
    }
    public set location(value: string) {
        this._location = value;
    }
    

    public get isSeriesDelete(): boolean {
        return this._isSeriesDelete;
    }
    public set isSeriesDelete(value: boolean) {
        this._isSeriesDelete = value;
    }

    
    get smsSentFlag(): string { return this._smsSentFlag; }
    set smsSentFlag(value: string) { this._smsSentFlag = value; }

    get emailSentFlag(): string { return this._emailSentFlag; }
    set emailSentFlag(value: string) { this._emailSentFlag = value; }

    get staffId(): number { return this._staffId; }
    set staffId( pstaffId: number ) { this._staffId = pstaffId; }

    public set threeip(threeip: string) {
        this._threeip = threeip;
    }
    public get threeip(): string {
        return this._threeip;
    }
		
		
    public set eventOutcomeCount(eventOutcomeCount: string) {
        this._eventOutcomeCount = eventOutcomeCount;
    }
    public get eventOutcomeCount(): string {
        return this._eventOutcomeCount;
    }
	
    public set eventOutcomeDb(eventOutcomeDb: string) {
        this._eventOutcomeDb = eventOutcomeDb;
    }
    public get eventOutcomeDb(): string {
        return this._eventOutcomeDb;
    }
	
    public set eventDateCount(eventDateCount: Date) {
        this._eventDateCount = eventDateCount;
    }
    public get eventDateCount(): Date {
        return this._eventDateCount;
    }
	
	
    public set nbtSchCount(nbtSchCount: number) {
        this._nbtSchCount = nbtSchCount;
    }
    public get nbtSchCount(): number {
        return this._nbtSchCount;
    }


    get ctrlpsOutCome(): string { return this._ctrlpsOutCome; }
    set ctrlpsOutCome( ctrlpsOutCome: string ) { this._ctrlpsOutCome = ctrlpsOutCome; }

    get ctrlpsFromDate(): Date { return this._ctrlpsFromDate; }
    set ctrlpsFromDate( ctrlpsFromDate: Date ) { this._ctrlpsFromDate = ctrlpsFromDate; }

    get ctrlpsToDate(): Date { return this._ctrlpsToDate; }
    set ctrlpsToDate( ctrlpsToDate: Date ) { this._ctrlpsToDate = ctrlpsToDate; }

    get ctrlpsStartTime(): Date { return this._ctrlpsStartTime; }
    set ctrlpsStartTime( ctrlpsStartTime: Date ) { this._ctrlpsStartTime = ctrlpsStartTime; }

    get ctrlpsEndTime(): Date { return this._ctrlpsEndTime; }
    set ctrlpsEndTime( ctrlpsEndTime: Date ) { this._ctrlpsEndTime = ctrlpsEndTime; }

    get nbtUpdOutcomeFlag(): string { return this._nbtUpdOutcomeFlag; }
    set nbtUpdOutcomeFlag( nbtUpdOutcomeFlag: string ) { this._nbtUpdOutcomeFlag = nbtUpdOutcomeFlag; }
    get warningMsg(): string { return this._warningMsg; }
    set warningMsg( pwarningMsg: string ) { this._warningMsg = pwarningMsg; }
    get warningPrompt(): string { return this._warningPrompt; }
    set warningPrompt( pwarningPrompt: string ) { this._warningPrompt = pwarningPrompt; }
    get returnValue(): number { return this._returnValue; }
    set returnValue( preturnValue: number ) { this._returnValue = preturnValue; }
    get offenderBookIdOne(): number { return this._offenderBookIdOne; }
    set offenderBookIdOne( poffenderBookIdOne: number ) { this._offenderBookIdOne = poffenderBookIdOne; }
    get offenderIdOne(): number { return this._offenderIdOne; }
    set offenderIdOne( poffenderIdOne: number ) { this._offenderIdOne = poffenderIdOne; }
    get toInternalLocationIdOne(): number { return this._toInternalLocationIdOne; }
    set toInternalLocationIdOne( ptoInternalLocationIdOne: number ) { this._toInternalLocationIdOne = ptoInternalLocationIdOne; }

    get nbtEventDate(): string { return this._nbtEventDate; }
    set nbtEventDate( nbtEventDate: string ) { this._nbtEventDate = nbtEventDate; }
    get nbtStartTime(): string { return this._nbtStartTime; }
    set nbtStartTime( nbtStartTime: string ) { this._nbtStartTime = nbtStartTime; }
    get daysOut(): string { return this._daysOut; }
    set daysOut( pdaysOut: string ) { this._daysOut = pdaysOut; }
    get hoursOut(): string { return this._hoursOut; }
    set hoursOut( phoursOut: string ) { this._hoursOut = phoursOut; }
    get unexcusedAbsenceFlag(): string { return this._unexcusedAbsenceFlag; }
    set unexcusedAbsenceFlag( punexcusedAbsenceFlag: string ) { this._unexcusedAbsenceFlag = punexcusedAbsenceFlag; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }
    get livingUnitDesc(): string { return this._livingUnitDesc; }
    set livingUnitDesc( plivingUnitDesc: string ) { this._livingUnitDesc = plivingUnitDesc; }
    get luLevel4Code(): string { return this._luLevel4Code; }
    set luLevel4Code( pluLevel4Code: string ) { this._luLevel4Code = pluLevel4Code; }
    get toIntLocLevel1Code(): string { return this._toIntLocLevel1Code; }
    set toIntLocLevel1Code( ptoIntLocLevel1Code: string ) { this._toIntLocLevel1Code = ptoIntLocLevel1Code; }
    get offenderFirstName(): string { return this._offenderFirstName; }
    set offenderFirstName( poffenderFirstName: string ) { this._offenderFirstName = poffenderFirstName; }
    get toLocDesc(): string { return this._toLocDesc; }
    set toLocDesc( ptoLocDesc: string ) { this._toLocDesc = ptoLocDesc; }
    get livingUnitId(): number { return this._livingUnitId; }
    set livingUnitId( plivingUnitId: number ) { this._livingUnitId = plivingUnitId; }
    get applicationTime(): Date { return this._applicationTime; }
    set applicationTime( papplicationTime: Date ) { this._applicationTime = papplicationTime; }
    get bookingActiveFlag(): string { return this._bookingActiveFlag; }
    set bookingActiveFlag( pbookingActiveFlag: string ) { this._bookingActiveFlag = pbookingActiveFlag; }
    get scheduleMovementTime(): Date { return this._scheduleMovementTime; }
    set scheduleMovementTime( pscheduleMovementTime: Date ) { this._scheduleMovementTime = pscheduleMovementTime; }
    get toCityCode(): string { return this._toCityCode; }
    set toCityCode( ptoCityCode: string ) { this._toCityCode = ptoCityCode; }
    get details(): string { return this._details; }
    set details( pdetails: string ) { this._details = pdetails; }
    get toIntLocLevel2Code(): string { return this._toIntLocLevel2Code; }
    set toIntLocLevel2Code( ptoIntLocLevel2Code: string ) { this._toIntLocLevel2Code = ptoIntLocLevel2Code; }
    get toAddressOwnerClass(): string { return this._toAddressOwnerClass; }
    set toAddressOwnerClass( ptoAddressOwnerClass: string ) { this._toAddressOwnerClass = ptoAddressOwnerClass; }
    get eventId(): number { return this._eventId; }
    set eventId( peventId: number ) { this._eventId = peventId; }
    get luLevel1Code(): string { return this._luLevel1Code; }
    set luLevel1Code( pluLevel1Code: string ) { this._luLevel1Code = pluLevel1Code; }
    get toCityName(): string { return this._toCityName; }
    set toCityName( ptoCityName: string ) { this._toCityName = ptoCityName; }
    get toInternalLocationId(): number { return this._toInternalLocationId; }
    set toInternalLocationId( ptoInternalLocationId: number ) { this._toInternalLocationId = ptoInternalLocationId; }
    get toIntLocUserDesc(): string { return this._toIntLocUserDesc; }
    set toIntLocUserDesc( ptoIntLocUserDesc: string ) { this._toIntLocUserDesc = ptoIntLocUserDesc; }
    get hiddenCommentText(): string { return this._hiddenCommentText; }
    set hiddenCommentText( phiddenCommentText: string ) { this._hiddenCommentText = phiddenCommentText; }
    get engagementCode(): string { return this._engagementCode; }
    set engagementCode( pengagementCode: string ) { this._engagementCode = pengagementCode; }
    get toAgyLocDesc(): string { return this._toAgyLocDesc; }
    set toAgyLocDesc( ptoAgyLocDesc: string ) { this._toAgyLocDesc = ptoAgyLocDesc; }
    get escortDesc(): string { return this._escortDesc; }
    set escortDesc( pescortDesc: string ) { this._escortDesc = pescortDesc; }
    get agencyImlLevel2Code(): string { return this._agencyImlLevel2Code; }
    set agencyImlLevel2Code( pagencyImlLevel2Code: string ) { this._agencyImlLevel2Code = pagencyImlLevel2Code; }
    get agreedTravelHour(): number { return this._agreedTravelHour; }
    set agreedTravelHour( pagreedTravelHour: number ) { this._agreedTravelHour = pagreedTravelHour; }
    get eventType(): string { return this._eventType; }
    set eventType( peventType: string ) { this._eventType = peventType; }
    get scheduledTripId(): number { return this._scheduledTripId; }
    set scheduledTripId( pscheduledTripId: number ) { this._scheduledTripId = pscheduledTripId; }
    get offenderLastName(): string { return this._offenderLastName; }
    set offenderLastName( poffenderLastName: string ) { this._offenderLastName = poffenderLastName; }
    get returnTime(): Date { return this._returnTime; }
    set returnTime( preturnTime: Date ) { this._returnTime = preturnTime; }
    get toIntLocLevel3Code(): string { return this._toIntLocLevel3Code; }
    set toIntLocLevel3Code( ptoIntLocLevel3Code: string ) { this._toIntLocLevel3Code = ptoIntLocLevel3Code; }
    get eventOutcomeDesc(): string { return this._eventOutcomeDesc; }
    set eventOutcomeDesc( peventOutcomeDesc: string ) { this._eventOutcomeDesc = peventOutcomeDesc; }
    get agencyImlDesc(): string { return this._agencyImlDesc; }
    set agencyImlDesc( pagencyImlDesc: string ) { this._agencyImlDesc = pagencyImlDesc; }
    get contactPersonName(): string { return this._contactPersonName; }
    set contactPersonName( pcontactPersonName: string ) { this._contactPersonName = pcontactPersonName; }
    get luLevel2Code(): string { return this._luLevel2Code; }
    set luLevel2Code( pluLevel2Code: string ) { this._luLevel2Code = pluLevel2Code; }
    get agencyImlLevel1Code(): string { return this._agencyImlLevel1Code; }
    set agencyImlLevel1Code( pagencyImlLevel1Code: string ) { this._agencyImlLevel1Code = pagencyImlLevel1Code; }
    get inChargeStaffName(): string { return this._inChargeStaffName; }
    set inChargeStaffName( pinChargeStaffName: string ) { this._inChargeStaffName = pinChargeStaffName; }
    get inChargeStaffId(): number { return this._inChargeStaffId; }
    set inChargeStaffId( pinChargeStaffId: number ) { this._inChargeStaffId = pinChargeStaffId; }
    get eventSubTypeDesc(): string { return this._eventSubTypeDesc; }
    set eventSubTypeDesc( peventSubTypeDesc: string ) { this._eventSubTypeDesc = peventSubTypeDesc; }
    get checkSum(): number { return this._checkSum; }
    set checkSum( pcheckSum: number ) { this._checkSum = pcheckSum; }
    get luLevel3Code(): string { return this._luLevel3Code; }
    set luLevel3Code( pluLevel3Code: string ) { this._luLevel3Code = pluLevel3Code; }
    get offenderId(): number { return this._offenderId; }
    set offenderId( poffenderId: number ) { this._offenderId = poffenderId; }
    get provStateCode(): string { return this._provStateCode; }
    set provStateCode( pprovStateCode: string ) { this._provStateCode = pprovStateCode; }
    get outTime(): Date { return this._outTime; }
    set outTime( poutTime: Date ) { this._outTime = poutTime; }
    get eventDate(): Date { return this._eventDate; }
    set eventDate( peventDate: Date ) { this._eventDate = peventDate; }
    get applicationDate(): Date { return this._applicationDate; }
    set applicationDate( papplicationDate: Date ) { this._applicationDate = papplicationDate; }
    get bookingNo(): string { return this._bookingNo; }
    set bookingNo( pbookingNo: string ) { this._bookingNo = pbookingNo; }
    get performanceCode(): string { return this._performanceCode; }
    set performanceCode( pperformanceCode: string ) { this._performanceCode = pperformanceCode; }
    get escortCode(): string { return this._escortCode; }
    set escortCode( pescortCode: string ) { this._escortCode = pescortCode; }
    get offenderIdDisplay(): string { return this._offenderIdDisplay; }
    set offenderIdDisplay( poffenderIdDisplay: string ) { this._offenderIdDisplay = poffenderIdDisplay; }
    get eventTypeDesc(): string { return this._eventTypeDesc; }
    set eventTypeDesc( peventTypeDesc: string ) { this._eventTypeDesc = peventTypeDesc; }
    get commentText(): string { return this._commentText; }
    set commentText( pcommentText: string ) { this._commentText = pcommentText; }
    get outcomeReasonCode(): string { return this._outcomeReasonCode; }
    set outcomeReasonCode( poutcomeReasonCode: string ) { this._outcomeReasonCode = poutcomeReasonCode; }
    get referenceId(): number { return this._referenceId; }
    set referenceId( preferenceId: number ) { this._referenceId = preferenceId; }
    get agencyImlId(): number { return this._agencyImlId; }
    set agencyImlId( pagencyImlId: number ) { this._agencyImlId = pagencyImlId; }
    get unpaidWorkBehaviour(): string { return this._unpaidWorkBehaviour; }
    set unpaidWorkBehaviour( punpaidWorkBehaviour: string ) { this._unpaidWorkBehaviour = punpaidWorkBehaviour; }
    get provStateDesc(): string { return this._provStateDesc; }
    set provStateDesc( pprovStateDesc: string ) { this._provStateDesc = pprovStateDesc; }
    get inOutStatus(): string { return this._inOutStatus; }
    set inOutStatus( pinOutStatus: string ) { this._inOutStatus = pinOutStatus; }
    get returnDate(): Date { return this._returnDate; }
    set returnDate( preturnDate: Date ) { this._returnDate = preturnDate; }
    get toLoc(): string { return this._toLoc; }
    set toLoc( ptoLoc: string ) { this._toLoc = ptoLoc; }
    get pieceWork(): number { return this._pieceWork; }
    set pieceWork( ppieceWork: number ) { this._pieceWork = ppieceWork; }
    get checkBox2(): string { return this._checkBox2; }
    set checkBox2( pcheckBox2: string ) { this._checkBox2 = pcheckBox2; }
    get offPrgrefId(): number { return this._offPrgrefId; }
    set offPrgrefId( poffPrgrefId: number ) { this._offPrgrefId = poffPrgrefId; }
    get checkBox1(): string { return this._checkBox1; }
    set checkBox1( pcheckBox1: string ) { this._checkBox1 = pcheckBox1; }
    get fromCityName(): string { return this._fromCityName; }
    set fromCityName( pfromCityName: string ) { this._fromCityName = pfromCityName; }
    get startTime(): Date { return this._startTime; }
    set startTime( pstartTime: Date ) { this._startTime = pstartTime; }
    get eventStatusDesc(): string { return this._eventStatusDesc; }
    set eventStatusDesc( peventStatusDesc: string ) { this._eventStatusDesc = peventStatusDesc; }
    get agencyImlLevel3Code(): string { return this._agencyImlLevel3Code; }
    set agencyImlLevel3Code( pagencyImlLevel3Code: string ) { this._agencyImlLevel3Code = pagencyImlLevel3Code; }
    get understandingCode(): string { return this._understandingCode; }
    set understandingCode( punderstandingCode: string ) { this._understandingCode = punderstandingCode; }
    get sickNoteReceivedDate(): Date { return this._sickNoteReceivedDate; }
    set sickNoteReceivedDate( psickNoteReceivedDate: Date ) { this._sickNoteReceivedDate = psickNoteReceivedDate; }
    get toAgyLocId(): string { return this._toAgyLocId; }
    set toAgyLocId( ptoAgyLocId: string ) { this._toAgyLocId = ptoAgyLocId; }
    get taId(): number { return this._taId; }
    set taId( ptaId: number ) { this._taId = ptaId; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag( pactiveFlag: string ) { this._activeFlag = pactiveFlag; }
    get busyDateFlag(): string { return this._busyDateFlag; }
    set busyDateFlag( pbusyDateFlag: string ) { this._busyDateFlag = pbusyDateFlag; }
    get recordSource(): string { return this._recordSource; }
    set recordSource( precordSource: string ) { this._recordSource = precordSource; }
    get eventClass(): string { return this._eventClass; }
    set eventClass( peventClass: string ) { this._eventClass = peventClass; }
    get eventSubType(): string { return this._eventSubType; }
    set eventSubType( peventSubType: string ) { this._eventSubType = peventSubType; }
    get toInternalLocationDesc(): string { return this._toInternalLocationDesc; }
    set toInternalLocationDesc( ptoInternalLocationDesc: string ) { this._toInternalLocationDesc = ptoInternalLocationDesc; }
    get sickNoteExpiryDate(): Date { return this._sickNoteExpiryDate; }
    set sickNoteExpiryDate( psickNoteExpiryDate: Date ) { this._sickNoteExpiryDate = psickNoteExpiryDate; }
    get unpaidWorkAction(): string { return this._unpaidWorkAction; }
    set unpaidWorkAction( punpaidWorkAction: string ) { this._unpaidWorkAction = punpaidWorkAction; }
    get creditedHours(): number { return this._creditedHours; }
    set creditedHours( pcreditedHours: number ) { this._creditedHours = pcreditedHours; }
    get transportCode(): string { return this._transportCode; }
    set transportCode( ptransportCode: string ) { this._transportCode = ptransportCode; }
    get directionCode(): string { return this._directionCode; }
    set directionCode( pdirectionCode: string ) { this._directionCode = pdirectionCode; }
    get unpaidWorkSupervisor(): string { return this._unpaidWorkSupervisor; }
    set unpaidWorkSupervisor( punpaidWorkSupervisor: string ) { this._unpaidWorkSupervisor = punpaidWorkSupervisor; }
    get inTime(): Date { return this._inTime; }
    set inTime( pinTime: Date ) { this._inTime = pinTime; }
    get fromCityCode(): string { return this._fromCityCode; }
    set fromCityCode( pfromCityCode: string ) { this._fromCityCode = pfromCityCode; }
    get eventOutcome(): string { return this._eventOutcome; }
    set eventOutcome( peventOutcome: string ) { this._eventOutcome = peventOutcome; }
    get eventStatus(): string { return this._eventStatus; }
    set eventStatus( peventStatus: string ) { this._eventStatus = peventStatus; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId( pagyLocId: string ) { this._agyLocId = pagyLocId; }
    get endTime(): Date { return this._endTime; }
    set endTime( pendTime: Date ) { this._endTime = pendTime; }
    get agyLocDesc(): string { return this._agyLocDesc; }
    set agyLocDesc( pagyLocDesc: string ) { this._agyLocDesc = pagyLocDesc; }
    get toAddressId(): number { return this._toAddressId; }
    set toAddressId( ptoAddressId: number ) { this._toAddressId = ptoAddressId; }
    get fromDate(): Date { return this._fromDate; }
    set fromDate( pfromDate: Date ) { this._fromDate = pfromDate; }
    get toDate(): Date { return this._toDate; }
    set toDate( ptoDate: Date ) { this._toDate = ptoDate; }
    get fMDate(): Date { return this._fMDate; }
    set fMDate( pfMDate: Date ) { this._fMDate = pfMDate; }
    get fMTime(): Date { return this._fMTime; }
    set fMTime( pfMTime: Date ) { this._fMTime = pfMTime; }
    get confirmMove(): string { return this._confirmMove; }
    set confirmMove( pconfirmMove: string ) { this._confirmMove = pconfirmMove; }
    get caseLoadId(): string { return this._caseLoadId; }
    set caseLoadId( pcaseLoadId: string ) { this._caseLoadId = pcaseLoadId; }
    get nbtEventId(): number { return this._nbtEventId; }
    set nbtEventId(pnbtEventId: number) { this._nbtEventId = pnbtEventId; }
    get nbtRequestDate(): Date { return this._nbtRequestDate; }
    set nbtRequestDate(pnbtRequestDate: Date) { this._nbtRequestDate = pnbtRequestDate; }
    get nbtWaitListStatus(): string { return this._nbtWaitListStatus; }
    set nbtWaitListStatus(pnbtWaitListStatus: string) { this._nbtWaitListStatus = pnbtWaitListStatus; }
    get nbtStatusDate(): Date { return this._nbtStatusDate; }
    set nbtStatusDate(pnbtStatusDate: Date) { this._nbtStatusDate = pnbtStatusDate; }
    get nbtTransferPriority(): string { return this._nbtTransferPriority; }
    set nbtTransferPriority(pnbtTransferPriority: string) { this._nbtTransferPriority = pnbtTransferPriority; }
    get nbtApprovedFlag(): string { return this._nbtApprovedFlag; }
    set nbtApprovedFlag(pnbtApprovedFlag: string) { this._nbtApprovedFlag = pnbtApprovedFlag; }
    get nbtOutcomeReasonCode(): string { return this._nbtOutcomeReasonCode; }
    set nbtOutcomeReasonCode(pnbtOutcomeReasonCode: string) { this._nbtOutcomeReasonCode = pnbtOutcomeReasonCode; }
    get nbtCommentText1(): string { return this._nbtCommentText1; }
    set nbtCommentText1(pnbtCommentText1: string) { this._nbtCommentText1 = pnbtCommentText1; }
    get nbtLastName(): string { return this._nbtLastName; }
    set nbtLastName(pnbtLastName: string) { this._nbtLastName = pnbtLastName; }
    get nbtFirstName(): string { return this._nbtFirstName; }
    set nbtFirstName(pnbtFirstName: string) { this._nbtFirstName = pnbtFirstName; }
    get nbtCreateDatetime(): Date { return this._nbtCreateDatetime; }
    set nbtCreateDatetime(pnbtCreateDatetime: Date) { this._nbtCreateDatetime = pnbtCreateDatetime; }
    get nbtApprovedStaffId(): number { return this._nbtApprovedStaffId; }
    set nbtApprovedStaffId(pnbtApprovedStaffId: number) { this._nbtApprovedStaffId = pnbtApprovedStaffId; }
    get conflictFlag(): boolean { return  this._conflictFlag; }
    set conflictFlag(pconflictFlag: boolean) { this._conflictFlag = pconflictFlag; }
    get insertedFlag(): boolean { return  this._insertedFlag; }
    set insertedFlag(pinsertedFlag: boolean) { this._insertedFlag = pinsertedFlag; }
    get nbtCreateUserId(): string { return  this._nbtCreateUserId; }
    set nbtCreateUserId(pnbtCreateUserId: string) { this._nbtCreateUserId = pnbtCreateUserId; }
    get alertDateDisplay(): string { return this._alertDateDisplay; }
    set alertDateDisplay( palertDateDisplay: string ) { this._alertDateDisplay = palertDateDisplay; }
    get description(): string { return this._description; }
    set description( pdescription: string ) { this._description = pdescription; }

    get count(): boolean { return  this._count; }
    set count(pcount: boolean) { this._count = pcount; }
    get emailFlag(): string{ return this._emailFlag; }
    set emailFlag(pemailFlag: string){ this._emailFlag = pemailFlag ;}
    get smsFlag(): string{ return this._smsFlag; }
    set smsFlag(psmsFlag: string){ this._smsFlag = psmsFlag ;}
    get cancelFlag(): string{ return this._cancelFlag; }
    set cancelFlag(pcancelFlag: string){ this._cancelFlag = pcancelFlag ;}

    get emailScheduleHoursBefore(): number { return this._emailScheduleHoursBefore; }
    set emailScheduleHoursBefore( pemailScheduleHoursBefore: number ) { this._emailScheduleHoursBefore = pemailScheduleHoursBefore; }

    get smsScheduleHoursBefore(): number { return this._smsScheduleHoursBefore; }
    set smsScheduleHoursBefore( psmsScheduleHoursBefore: number ) { this._smsScheduleHoursBefore = psmsScheduleHoursBefore; }

    get emailFlagTemp(): string{ return this._emailFlagTemp; }
    set emailFlagTemp(pemailFlagTemp: string){ this._emailFlagTemp = pemailFlagTemp ;}
    get smsFlagTemp(): string{ return this._smsFlagTemp; }
    set smsFlagTemp(psmsFlagTemp: string){ this._smsFlagTemp = psmsFlagTemp ;}
    get emailAddressCount(): number { return this._emailAddressCount; }
    set emailAddressCount(value: number) { this._emailAddressCount = value; }

    get phoneNumberCount(): number { return this._phoneNumberCount; }
    set phoneNumberCount(value: number) { this._phoneNumberCount = value; }

    get nonAssociationFlag(): string{ return this._nonAssociationFlag; }
	set nonAssociationFlag(pnonAssociationFlag: string){ this._nonAssociationFlag = pnonAssociationFlag ;}

    get seriesId(): number{ return this._seriesId; }
    set seriesId(pseriesId: number){ this._seriesId = pseriesId ;}
    public get agyLocIdTemp(): string {  return this._agyLocIdTemp;}
    public set agyLocIdTemp(value: string) {this._agyLocIdTemp = value;}

    get checkscheduledtrip(): boolean{ return  this._checkscheduledtrip }

    set checkscheduledtrip(pcheckscheduledtrip: boolean){ this._checkscheduledtrip = pcheckscheduledtrip }

    get departureDate(): Date{ return  this._departureDate }

    set departureDate(pdepartureDate: Date){ this._departureDate = pdepartureDate }

    get status(): string{ return  this._status }

    set status(pstatus: string){ this._status = pstatus }

    toJSON(): any {
        return {
            'unexcusedAbsenceFlag': this._unexcusedAbsenceFlag,
            'offenderBookId': this._offenderBookId,
            'livingUnitDesc': this._livingUnitDesc,
            'luLevel4Code': this._luLevel4Code,
            'toIntLocLevel1Code': this._toIntLocLevel1Code,
            'offenderFirstName': this._offenderFirstName,
            'toLocDesc': this._toLocDesc,
            'livingUnitId': this._livingUnitId,
            'applicationTime': this._applicationTime,
            'bookingActiveFlag': this._bookingActiveFlag,
            'scheduleMovementTime': this._scheduleMovementTime,
            'toCityCode': this._toCityCode,
            'details': this._details,
            'toIntLocLevel2Code': this._toIntLocLevel2Code,
            'toAddressOwnerClass': this._toAddressOwnerClass,
            'eventId': this._eventId,
            'luLevel1Code': this._luLevel1Code,
            'toCityName': this._toCityName,
            'toInternalLocationId': this._toInternalLocationId,
            'toIntLocUserDesc': this._toIntLocUserDesc,
            'hiddenCommentText': this._hiddenCommentText,
            'engagementCode': this._engagementCode,
            'toAgyLocDesc': this._toAgyLocDesc,
            'escortDesc': this._escortDesc,
            'agencyImlLevel2Code': this._agencyImlLevel2Code,
            'agreedTravelHour': this._agreedTravelHour,
            'eventType': this._eventType,
            'scheduledTripId': this._scheduledTripId,
            'offenderLastName': this._offenderLastName,
            'returnTime': this._returnTime,
            'toIntLocLevel3Code': this._toIntLocLevel3Code,
            'eventOutcomeDesc': this._eventOutcomeDesc,
            'agencyImlDesc': this._agencyImlDesc,
            'contactPersonName': this._contactPersonName,
            'luLevel2Code': this._luLevel2Code,
            'agencyImlLevel1Code': this._agencyImlLevel1Code,
            'inChargeStaffName': this._inChargeStaffName,
            'inChargeStaffId': this._inChargeStaffId,
            'eventSubTypeDesc': this._eventSubTypeDesc,
            'checkSum': this._checkSum,
            'luLevel3Code': this._luLevel3Code,
            'offenderId': this._offenderId,
            'provStateCode': this._provStateCode,
            'outTime': this._outTime,
            'eventDate': this._eventDate,
            'applicationDate': this._applicationDate,
            'bookingNo': this._bookingNo,
            'performanceCode': this._performanceCode,
            'escortCode': this._escortCode,
            'offenderIdDisplay': this._offenderIdDisplay,
            'eventTypeDesc': this._eventTypeDesc,
            'commentText': this._commentText,
            'outcomeReasonCode': this._outcomeReasonCode,
            'referenceId': this._referenceId,
            'agencyImlId': this._agencyImlId,
            'unpaidWorkBehaviour': this._unpaidWorkBehaviour,
            'provStateDesc': this._provStateDesc,
            'inOutStatus': this._inOutStatus,
            'returnDate': this._returnDate,
            'toLoc': this._toLoc,
            'pieceWork': this._pieceWork,
            'checkBox2': this._checkBox2,
            'offPrgrefId': this._offPrgrefId,
            'checkBox1': this._checkBox1,
            'fromCityName': this._fromCityName,
            'startTime': this._startTime,
            'eventStatusDesc': this._eventStatusDesc,
            'agencyImlLevel3Code': this._agencyImlLevel3Code,
            'understandingCode': this._understandingCode,
            'sickNoteReceivedDate': this._sickNoteReceivedDate,
            'toAgyLocId': this._toAgyLocId,
            'taId': this._taId,
            'activeFlag': this._activeFlag,
            'busyDateFlag': this._busyDateFlag,
            'recordSource': this._recordSource,
            'eventClass': this._eventClass,
            'eventSubType': this._eventSubType,
            'toInternalLocationDesc': this._toInternalLocationDesc,
            'sickNoteExpiryDate': this._sickNoteExpiryDate,
            'unpaidWorkAction': this._unpaidWorkAction,
            'creditedHours': this._creditedHours,
            'transportCode': this._transportCode,
            'directionCode': this._directionCode,
            'unpaidWorkSupervisor': this._unpaidWorkSupervisor,
            'inTime': this._inTime,
            'fromCityCode': this._fromCityCode,
            'eventOutcome': this._eventOutcome,
            'eventStatus': this._eventStatus,
            'agyLocId': this._agyLocId,
            'endTime': this._endTime,
            'agyLocDesc': this._agyLocDesc,
            'toAddressId': this._toAddressId,
            'daysOut': this._daysOut,
            'hoursOut': this._hoursOut,
            'fromDate': this._fromDate,
            'toDate': this._toDate,
            'fMDate': this._fMDate,
            'fMTime': this._fMTime,
            'confirmMove': this._confirmMove,
            'caseLoadId': this._caseLoadId,
            'nbtEventId': this._nbtEventId,
            'nbtRequestDate': this._nbtRequestDate,
            'nbtWaitListStatus': this._nbtWaitListStatus,
            'nbtStatusDate': this._nbtStatusDate,
            'nbtTransferPriority': this._nbtTransferPriority,
            'nbtApprovedFlag': this._nbtApprovedFlag,
            'nbtApprovedStaffId': this._nbtApprovedStaffId,
            'nbtOutcomeReasonCode': this._nbtOutcomeReasonCode,
            'nbtCommentText1': this._nbtCommentText1,
            'nbtFirstName': this._nbtFirstName,
            'nbtLastName': this._nbtLastName,
            'nbtCreateDatetime': this._nbtCreateDatetime,
            'conflictFlag': this._conflictFlag,
            'insertedFlag': this._insertedFlag,
            'nbtCreateUserId': this._nbtCreateUserId,
            'nbtStartTime': this._nbtStartTime,
            'offenderBookIdOne': this._offenderBookIdOne,
            'offenderIdOne': this._offenderIdOne,
            'toInternalLocationIdOne': this._toInternalLocationIdOne,
            'warningMsg': this._warningMsg,
            'warningPrompt': this._warningPrompt,
            'returnValue': this._returnValue,
            'ctrlpsFromDate': this._ctrlpsFromDate,
            'ctrlpsToDate': this._ctrlpsToDate,
            'ctrlpsStartTime': this._ctrlpsStartTime,
            'ctrlpsEndTime': this._ctrlpsEndTime,
            'ctrlpsOutCome': this._ctrlpsOutCome,
            'nbtSchCount': this._nbtSchCount,
            'eventDateCount': this._eventDateCount,
            'eventOutcomeDb': this._eventOutcomeDb,
            'eventOutcomeCount': this._eventOutcomeCount,
            'threeip': this._threeip,
            'staffId': this._staffId,
            'count': this._count, 
            'smsFlag': this._smsFlag,
			'emailFlag': this._emailFlag,
            'cancelFlag':this._cancelFlag,
            'emailScheduleHoursBefore': this._emailScheduleHoursBefore,
            'smsScheduleHoursBefore': this._smsScheduleHoursBefore,
            'smsFlagTemp': this._smsFlagTemp,
			'emailFlagTemp': this._emailFlagTemp,
            'nonAssociationFlag': this._nonAssociationFlag,
            'seriesId': this._seriesId,
            'isSeriesDelete': this._isSeriesDelete,
           'agyLocIdTemp' : this._agyLocIdTemp,
           'location' : this._location,
           'outcome':this._outcome,
           'cancelReason':this._cancelReason,
           'checkscheduledtrip':this._checkscheduledtrip,
           'departureDate': this._departureDate,
           'status': this._status,
            'moduleName': this._moduleName
        };
    }
 }
