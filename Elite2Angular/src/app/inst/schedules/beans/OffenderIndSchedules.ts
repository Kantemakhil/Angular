import { OffenderNaDetails } from "@common/beans/OffenderNaDetails";
import { OffenderNonAssociations } from "@common/beans/OffenderNonAssociations";

	
export class OffenderIndSchedules {
		 private _unexcusedAbsenceFlag: string;
		 private _createUserId: string;
		 private _offenderBookId: number;
		 private _orderId: number;
		 private _modifyDatetime: number;
		 private _modifyUserId: string;
		 private _applicationTime: Date;
		 private _toCityCode: string;
		 private _details: string;
		 private _toCorporateId: number;
		 private _sealFlag: string;
		 private _toAddressOwnerClass: string;
		 private _eventId: number;
		 private _toInternalLocationId: number;
		 private _hiddenCommentText: string;
		 private _engagementCode: string;
		 private _toCity: string;
		 private _agreedTravelHour: number;
		 private _eventType: string;
		 private _scheduledTripId: number;
		 private _sentenceSeq: number;
		 private _returnTime: Date;
		 private _contactPersonName: string;
		 private _inChargeStaffId: number;
		 private _reportInDate: Date;
		 private _provStateCode: string;
		 private _outTime: Date;
		 private _eventDate: Date;
		 private _applicationDate: Date;
		 private _performanceCode: string;
		 private _escortCode: string;
		 private _courtEventResult: string;
		 private _confirmFlag: string;
		 private _commentText: string;
		 private _outcomeReasonCode: string;
		 private _tempAbsSchId: number;
		 private _referenceId: number;
		 private _unpaidWorkBehaviour: string;
		 private _serialVersionUID: number;
		 private _returnDate: Date;
		 private _inserted: number;
		 private _checkBox2: string;
		 private _pieceWork: number;
		 private _offPrgrefId: number;
		 private _crsSchId: number;
		 private _checkBox1: string;
		 private _startTime: Date;
		 private _parentEventId: number;
		 private _understandingCode: string;
		 private _sickNoteReceivedDate: Date;
		 private _toAgyLocId: string;
		 private _taId: number;
		 private _eventClass: string;
		 private _eventSubType: string;
		 private _sickNoteExpiryDate: Date;
		 private _creditedWorkHour: number;
		 private _unpaidWorkAction: string;
		 private _judgeName: string;
		 private _creditedHours: number;
		 private _transportCode: string;
		 private _unpaidWorkSupervisor: string;
		 private _directionCode: string;
		 private _createDatetime: number;
		 private _inTime: Date;
		 private _fromCityCode: string;
		 private _eventOutcome: string;
		 private _eventStatus: string;
		 private _agyLocId: string;
		 private _offenderPrgObligationId: number;
		 private _endTime: Date;
		 private _fromCity: string;
		 private _toAddressId: number;
         private _conflictFlag: boolean;
		 private _offendersnsoffenderbookid: Array<OffenderNonAssociations>;
		 private _lastName: string;
		 private _offenderIdDisplay: string;
		 private _locType: string;
		 private _eventPurpose: string;
		 
	public get eventPurpose(): string {
		return this._eventPurpose;
	}
	public set eventPurpose(value: string) {
		this._eventPurpose = value;
	}

	public get offenderIdDisplay(): string {
		return this._offenderIdDisplay;
	}
	public set offenderIdDisplay(value: string) {
		this._offenderIdDisplay = value;
	}
	public get lastName(): string {
		return this._lastName;
	}
	public set lastName(value: string) {
		this._lastName = value;
	}
		 private _firstName: string;
	public get firstName(): string {
		return this._firstName;
	}
	public set firstName(value: string) {
		this._firstName = value;
	}
	public get offendersnsoffenderbookid(): Array<OffenderNonAssociations> {
		return this._offendersnsoffenderbookid;
	}
	public set offendersnsoffenderbookid(value: Array<OffenderNonAssociations>) {
		this._offendersnsoffenderbookid = value;
	}

         get conflictFlag(): boolean{ return  this._conflictFlag }

         set conflictFlag(pconflictFlag: boolean){ this._conflictFlag = pconflictFlag }

		 get unexcusedAbsenceFlag(): string{ return  this._unexcusedAbsenceFlag }

		 set unexcusedAbsenceFlag(punexcusedAbsenceFlag: string){ this._unexcusedAbsenceFlag = punexcusedAbsenceFlag }

		 get createUserId(): string{ return  this._createUserId }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId }

		 get offenderBookId(): number{ return  this._offenderBookId }

		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId }

		 get orderId(): number{ return  this._orderId }

		 set orderId(porderId: number){ this._orderId = porderId }

		 get modifyDatetime(): number{ return  this._modifyDatetime }

		 set modifyDatetime(pmodifyDatetime: number){ this._modifyDatetime = pmodifyDatetime }

		 get modifyUserId(): string{ return  this._modifyUserId }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId }

		 get applicationTime(): Date{ return  this._applicationTime }

		 set applicationTime(papplicationTime: Date){ this._applicationTime = papplicationTime }

		 get toCityCode(): string{ return  this._toCityCode }

		 set toCityCode(ptoCityCode: string){ this._toCityCode = ptoCityCode }

		 get details(): string{ return  this._details }

		 set details(pdetails: string){ this._details = pdetails }

		 get toCorporateId(): number{ return  this._toCorporateId }

		 set toCorporateId(ptoCorporateId: number){ this._toCorporateId = ptoCorporateId }

		 get sealFlag(): string{ return  this._sealFlag }

		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag }

		 get toAddressOwnerClass(): string{ return  this._toAddressOwnerClass }

		 set toAddressOwnerClass(ptoAddressOwnerClass: string){ this._toAddressOwnerClass = ptoAddressOwnerClass }

		 get eventId(): number{ return  this._eventId }

		 set eventId(peventId: number){ this._eventId = peventId }

		 get toInternalLocationId(): number{ return  this._toInternalLocationId }

		 set toInternalLocationId(ptoInternalLocationId: number){ this._toInternalLocationId = ptoInternalLocationId }

		 get hiddenCommentText(): string{ return  this._hiddenCommentText }

		 set hiddenCommentText(phiddenCommentText: string){ this._hiddenCommentText = phiddenCommentText }

		 get engagementCode(): string{ return  this._engagementCode }

		 set engagementCode(pengagementCode: string){ this._engagementCode = pengagementCode }

		 get toCity(): string{ return  this._toCity }

		 set toCity(ptoCity: string){ this._toCity = ptoCity }

		 get agreedTravelHour(): number{ return  this._agreedTravelHour }

		 set agreedTravelHour(pagreedTravelHour: number){ this._agreedTravelHour = pagreedTravelHour }

		 get eventType(): string{ return  this._eventType }

		 set eventType(peventType: string){ this._eventType = peventType }

		 get scheduledTripId(): number{ return  this._scheduledTripId }

		 set scheduledTripId(pscheduledTripId: number){ this._scheduledTripId = pscheduledTripId }

		 get sentenceSeq(): number{ return  this._sentenceSeq }

		 set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq }

		 get returnTime(): Date{ return  this._returnTime }

		 set returnTime(preturnTime: Date){ this._returnTime = preturnTime }

		 get contactPersonName(): string{ return  this._contactPersonName }

		 set contactPersonName(pcontactPersonName: string){ this._contactPersonName = pcontactPersonName }

		 get inChargeStaffId(): number{ return  this._inChargeStaffId }

		 set inChargeStaffId(pinChargeStaffId: number){ this._inChargeStaffId = pinChargeStaffId }

		 get reportInDate(): Date{ return  this._reportInDate }

		 set reportInDate(preportInDate: Date){ this._reportInDate = preportInDate }

		 get provStateCode(): string{ return  this._provStateCode }

		 set provStateCode(pprovStateCode: string){ this._provStateCode = pprovStateCode }

		 get outTime(): Date{ return  this._outTime }

		 set outTime(poutTime: Date){ this._outTime = poutTime }

		 get eventDate(): Date{ return  this._eventDate }

		 set eventDate(peventDate: Date){ this._eventDate = peventDate }

		 get applicationDate(): Date{ return  this._applicationDate }

		 set applicationDate(papplicationDate: Date){ this._applicationDate = papplicationDate }

		 get performanceCode(): string{ return  this._performanceCode }

		 set performanceCode(pperformanceCode: string){ this._performanceCode = pperformanceCode }

		 get escortCode(): string{ return  this._escortCode }

		 set escortCode(pescortCode: string){ this._escortCode = pescortCode }

		 get courtEventResult(): string{ return  this._courtEventResult }

		 set courtEventResult(pcourtEventResult: string){ this._courtEventResult = pcourtEventResult }

		 get confirmFlag(): string{ return  this._confirmFlag }

		 set confirmFlag(pconfirmFlag: string){ this._confirmFlag = pconfirmFlag }

		 get commentText(): string{ return  this._commentText }

		 set commentText(pcommentText: string){ this._commentText = pcommentText }

		 get outcomeReasonCode(): string{ return  this._outcomeReasonCode }

		 set outcomeReasonCode(poutcomeReasonCode: string){ this._outcomeReasonCode = poutcomeReasonCode }

		 get tempAbsSchId(): number{ return  this._tempAbsSchId }

		 set tempAbsSchId(ptempAbsSchId: number){ this._tempAbsSchId = ptempAbsSchId }

		 get referenceId(): number{ return  this._referenceId }

		 set referenceId(preferenceId: number){ this._referenceId = preferenceId }

		 get unpaidWorkBehaviour(): string{ return  this._unpaidWorkBehaviour }

		 set unpaidWorkBehaviour(punpaidWorkBehaviour: string){ this._unpaidWorkBehaviour = punpaidWorkBehaviour }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get returnDate(): Date{ return  this._returnDate }

		 set returnDate(preturnDate: Date){ this._returnDate = preturnDate }

		 get inserted(): number{ return  this._inserted }

		 set inserted(pinserted: number){ this._inserted = pinserted }

		 get checkBox2(): string{ return  this._checkBox2 }

		 set checkBox2(pcheckBox2: string){ this._checkBox2 = pcheckBox2 }

		 get pieceWork(): number{ return  this._pieceWork }

		 set pieceWork(ppieceWork: number){ this._pieceWork = ppieceWork }

		 get offPrgrefId(): number{ return  this._offPrgrefId }

		 set offPrgrefId(poffPrgrefId: number){ this._offPrgrefId = poffPrgrefId }

		 get crsSchId(): number{ return  this._crsSchId }

		 set crsSchId(pcrsSchId: number){ this._crsSchId = pcrsSchId }

		 get checkBox1(): string{ return  this._checkBox1 }

		 set checkBox1(pcheckBox1: string){ this._checkBox1 = pcheckBox1 }

		 get startTime(): Date{ return  this._startTime }

		 set startTime(pstartTime: Date){ this._startTime = pstartTime }

		 get parentEventId(): number{ return  this._parentEventId }

		 set parentEventId(pparentEventId: number){ this._parentEventId = pparentEventId }

		 get understandingCode(): string{ return  this._understandingCode }

		 set understandingCode(punderstandingCode: string){ this._understandingCode = punderstandingCode }

		 get sickNoteReceivedDate(): Date{ return  this._sickNoteReceivedDate }

		 set sickNoteReceivedDate(psickNoteReceivedDate: Date){ this._sickNoteReceivedDate = psickNoteReceivedDate }

		 get toAgyLocId(): string{ return  this._toAgyLocId }

		 set toAgyLocId(ptoAgyLocId: string){ this._toAgyLocId = ptoAgyLocId }

		 get taId(): number{ return  this._taId }

		 set taId(ptaId: number){ this._taId = ptaId }

		 get eventClass(): string{ return  this._eventClass }

		 set eventClass(peventClass: string){ this._eventClass = peventClass }

		 get eventSubType(): string{ return  this._eventSubType }

		 set eventSubType(peventSubType: string){ this._eventSubType = peventSubType }

		 get sickNoteExpiryDate(): Date{ return  this._sickNoteExpiryDate }

		 set sickNoteExpiryDate(psickNoteExpiryDate: Date){ this._sickNoteExpiryDate = psickNoteExpiryDate }

		 get creditedWorkHour(): number{ return  this._creditedWorkHour }

		 set creditedWorkHour(pcreditedWorkHour: number){ this._creditedWorkHour = pcreditedWorkHour }

		 get unpaidWorkAction(): string{ return  this._unpaidWorkAction }

		 set unpaidWorkAction(punpaidWorkAction: string){ this._unpaidWorkAction = punpaidWorkAction }

		 get judgeName(): string{ return  this._judgeName }

		 set judgeName(pjudgeName: string){ this._judgeName = pjudgeName }

		 get creditedHours(): number{ return  this._creditedHours }

		 set creditedHours(pcreditedHours: number){ this._creditedHours = pcreditedHours }

		 get transportCode(): string{ return  this._transportCode }

		 set transportCode(ptransportCode: string){ this._transportCode = ptransportCode }

		 get unpaidWorkSupervisor(): string{ return  this._unpaidWorkSupervisor }

		 set unpaidWorkSupervisor(punpaidWorkSupervisor: string){ this._unpaidWorkSupervisor = punpaidWorkSupervisor }

		 get directionCode(): string{ return  this._directionCode }

		 set directionCode(pdirectionCode: string){ this._directionCode = pdirectionCode }

		 get createDatetime(): number{ return  this._createDatetime }

		 set createDatetime(pcreateDatetime: number){ this._createDatetime = pcreateDatetime }

		 get inTime(): Date{ return  this._inTime }

		 set inTime(pinTime: Date){ this._inTime = pinTime }

		 get fromCityCode(): string{ return  this._fromCityCode }

		 set fromCityCode(pfromCityCode: string){ this._fromCityCode = pfromCityCode }

		 get eventOutcome(): string{ return  this._eventOutcome }

		 set eventOutcome(peventOutcome: string){ this._eventOutcome = peventOutcome }

		 get eventStatus(): string{ return  this._eventStatus }

		 set eventStatus(peventStatus: string){ this._eventStatus = peventStatus }

		 get agyLocId(): string{ return  this._agyLocId }

		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId }

		 get offenderPrgObligationId(): number{ return  this._offenderPrgObligationId }

		 set offenderPrgObligationId(poffenderPrgObligationId: number){ this._offenderPrgObligationId = poffenderPrgObligationId }

		 get endTime(): Date{ return  this._endTime }

		 set endTime(pendTime: Date){ this._endTime = pendTime }

		 get fromCity(): string{ return  this._fromCity }

		 set fromCity(pfromCity: string){ this._fromCity = pfromCity }

		 get toAddressId(): number{ return  this._toAddressId }

		 set toAddressId(ptoAddressId: number){ this._toAddressId = ptoAddressId }

		 get locType(): string{ return  this._locType }

		 set locType(plocType: string){ this._locType = plocType }

 	toJSON(): any {
 		return { 
			'unexcusedAbsenceFlag': this._unexcusedAbsenceFlag,
			'createUserId': this._createUserId,
			'offenderBookId': this._offenderBookId,
			'orderId': this._orderId,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'applicationTime': this._applicationTime,
			'toCityCode': this._toCityCode,
			'details': this._details,
			'toCorporateId': this._toCorporateId,
			'sealFlag': this._sealFlag,
			'toAddressOwnerClass': this._toAddressOwnerClass,
			'eventId': this._eventId,
			'toInternalLocationId': this._toInternalLocationId,
			'hiddenCommentText': this._hiddenCommentText,
			'engagementCode': this._engagementCode,
			'toCity': this._toCity,
			'agreedTravelHour': this._agreedTravelHour,
			'eventType': this._eventType,
			'scheduledTripId': this._scheduledTripId,
			'sentenceSeq': this._sentenceSeq,
			'returnTime': this._returnTime,
			'contactPersonName': this._contactPersonName,
			'inChargeStaffId': this._inChargeStaffId,
			'reportInDate': this._reportInDate,
			'provStateCode': this._provStateCode,
			'outTime': this._outTime,
			'eventDate': this._eventDate,
			'applicationDate': this._applicationDate,
			'performanceCode': this._performanceCode,
			'escortCode': this._escortCode,
			'courtEventResult': this._courtEventResult,
			'confirmFlag': this._confirmFlag,
			'commentText': this._commentText,
			'outcomeReasonCode': this._outcomeReasonCode,
			'tempAbsSchId': this._tempAbsSchId,
			'referenceId': this._referenceId,
			'unpaidWorkBehaviour': this._unpaidWorkBehaviour,
			'serialVersionUID': this._serialVersionUID,
			'returnDate': this._returnDate,
			'inserted': this._inserted,
			'checkBox2': this._checkBox2,
			'pieceWork': this._pieceWork,
			'offPrgrefId': this._offPrgrefId,
			'crsSchId': this._crsSchId,
			'checkBox1': this._checkBox1,
			'startTime': this._startTime,
			'parentEventId': this._parentEventId,
			'understandingCode': this._understandingCode,
			'sickNoteReceivedDate': this._sickNoteReceivedDate,
			'toAgyLocId': this._toAgyLocId,
			'taId': this._taId,
			'eventClass': this._eventClass,
			'eventSubType': this._eventSubType,
			'sickNoteExpiryDate': this._sickNoteExpiryDate,
			'creditedWorkHour': this._creditedWorkHour,
			'unpaidWorkAction': this._unpaidWorkAction,
			'judgeName': this._judgeName,
			'creditedHours': this._creditedHours,
			'transportCode': this._transportCode,
			'unpaidWorkSupervisor': this._unpaidWorkSupervisor,
			'directionCode': this._directionCode,
			'createDatetime': this._createDatetime,
			'inTime': this._inTime,
			'fromCityCode': this._fromCityCode,
			'eventOutcome': this._eventOutcome,
			'eventStatus': this._eventStatus,
			'agyLocId': this._agyLocId,
			'offenderPrgObligationId': this._offenderPrgObligationId,
			'endTime': this._endTime,
			'fromCity': this._fromCity,
			'toAddressId': this._toAddressId,
			'conflictFlag': this._conflictFlag,
			'locType': this._locType
 			};
 		}  
 }