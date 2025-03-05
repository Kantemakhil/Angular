export class OffenderSentConditions {
  private _noWorkWithUnderAgeOf: number;
  private _statusDate: Date;
  private _createUserId: string;
  private _exclusionCode: string;
  private _financialTotalAmount: number;
  private _modifyDatetime: Date;
  private _offenderBookId: number;
  private _conditionAppliedFlag: string;
  private _modifyUserId: string;
  private _drugTesting: string;
  private _restrictedChildAgeOf: number;
  private _noUserOfComputer: string;
  private _terminationDate: Date;
  private _activityCode: string;
  private _conditionRecommendedFlag: string;
  private _noWorkWithUnderAge: string;
  private _nonAssociationText: string;
  private _noResidentUnderAgeOf: number;
  private _reportDate: Date;
  private _conditionRequiredFlag: string;
  private _reviewCode: string;
  private _activityStatus: string;
  private _noAccessToInternet: string;
  private _statusUpdateComment: string;
  private _sealFlag: string;
  private _DateType: string;
  private _statusUpdateStaffId: number;
  private _DateId: number;
  private _personalRelationshipFlag: string;
  private _sentenceSeq: number;
  private _categoryType: string;
  private _boardOrderFlag: string;
  private _lengthUnit: string;
  private _listSeq: number;
  private _prohibitedContact: string;
  private _restrictedApprovalPerson: string;
  private _startDate: Date;
  private _workflowId: number;
  private _reportTime: Date;
  private _curfewProvider: string;
  private _supervisorName: string;
  private _statusReasonCode: string;
  private _statusUpdateDate: Date;
  private _alcoholTreatmentProvider: string;
  private _commConditionCode: string;
  private _commentText: string;
  private _expiryDate: Date;
  private _residencyAddressId: number;
  private _serialVersionUID: number;
  private _appointmentPersonName: string;
  private _nonAssociatedOffenders: string;
  private _detailsText: string;
  private _mentalHealthProvider: string;
  private _longCommentText: string;
  private _curfewEndTime: Date;
  private _otherProgram: string;
  private _vehicleDetailsFlag: string;
  private _statusUpdateReason: string;
  private _length: number;
  private _curfewStartTime: Date;
  private _curfewTaggingFlag: string;
  private _attendanceCentre: string;
  private _commConditionType: string;
  private _createDatetime: Date;
  private _conditionStatus: string;
  private _offenderSentConditionId: number;
  private _governorConditionFlag: string;
  private _programId: number;
  private _condActType: string;
  private _provisoFlag: string;
  private _requirement: string;
  private _conditionSuspendedFlag: string;
  private _count: number;
  private _workHours: number;
  private _conditionText: string;

  private _nbtRequirement: string;
  private _nbtProgram: string;

  private _nbtActivity: string;
  private _nbtCurfiewProvider: string;

  private _nbtExclusionCode: string;
  private _nbtMentalHealth: string;

  private _nbtAlchohalTreatMentDescription: string;
  private _nbtAttendenceCenter: string;

  private _nbtUnit: string;

  private _nbtCurfiewReviewCode: string;
  private _nbtStatus: string;
  private _pSusFlag: string;
  private _returnValue: number;
  private _serverCode: number;
  private _objectId: number;
  private _objectType: string;
  private _program: string;
  private _programMethod: string;
  private _copyFlag: Boolean;
  private _categoryTypeCode: string;
  private _caseloadId: string;
  private _courseProfilesActs: number;
  private _appointmentsActs: number;
  private _appointmentsSa: number;
  private _condition: string;
  private _transferFlag: boolean;
  private _assgnTeamCount: number;
  private _agyLocId: string;
  private _offenderProceedingId: number;
  private _linkFlag: string;
  private _orderType: string;
  private _orderOperations: string;

  get condition(): string { return this._condition; }
  set condition(pcondition: string) { this._condition = pcondition; }

  get courseProfilesActs(): number { return this._courseProfilesActs; }

  set courseProfilesActs(pcourseProfilesActs: number) { this._courseProfilesActs = pcourseProfilesActs; }

  get appointmentsActs(): number { return this._appointmentsActs; }

  set appointmentsActs(pappointmentsActs: number) { this._appointmentsActs = pappointmentsActs; }

  get appointmentsSa(): number { return this._appointmentsSa; }

  set appointmentsSa(pappointmentsSa: number) { this._appointmentsSa = pappointmentsSa; }
  // private _conditionSuspendedFlagTemp: string;
  // get conditionSuspendedFlagTemp(): string { return this._pSusFlag; }

  // set pSusFlag(ppSusFlag: string) { this._pSusFlag = ppSusFlag; }
  get caseloadId(): string { return this._caseloadId; }

  set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

  get categoryTypeCode(): string { return this._categoryTypeCode; }

  set categoryTypeCode(pcategoryTypeCode: string) { this._categoryTypeCode = pcategoryTypeCode; }

  get copyFlag(): Boolean { return this._copyFlag; }

  set copyFlag(pcopyFlag: Boolean) { this._copyFlag = pcopyFlag; }

  get programMethod(): string { return this._programMethod; }

  set programMethod(pprogramMethod: string) { this._programMethod = pprogramMethod; }

  get program(): string { return this._program; }

  set program(pprogram: string) { this._program = pprogram; }

  get objectId(): number { return this._objectId; }

  set objectId(pobjectId: number) { this._objectId = pobjectId; }

  get objectType(): string { return this._objectType; }

  set objectType(pobjectType: string) { this._objectType = pobjectType; }

  get pSusFlag(): string { return this._pSusFlag; }

  set pSusFlag(ppSusFlag: string) { this._pSusFlag = ppSusFlag; }

  get nbtRequirement(): string { return this._nbtRequirement; }

  set nbtRequirement(pnbtRequirement: string) { this._nbtRequirement = pnbtRequirement; }

  get nbtProgram(): string { return this._nbtProgram; }

  set nbtProgram(pnbtProgram: string) { this._nbtProgram = pnbtProgram; }


  get nbtActivity(): string { return this._nbtActivity; }

  set nbtActivity(pnbtActivity: string) { this._nbtActivity = pnbtActivity; }

  get nbtCurfiewProvider(): string { return this._nbtCurfiewProvider; }

  set nbtCurfiewProvider(pnbtCurfiewProvider: string) { this._nbtCurfiewProvider = pnbtCurfiewProvider; }


  get nbtExclusionCode(): string { return this._nbtExclusionCode; }

  set nbtExclusionCode(pnbtExclusionCode: string) { this._nbtExclusionCode = pnbtExclusionCode; }

  get nbtMentalHealth(): string { return this._nbtMentalHealth; }

  set nbtMentalHealth(pnbtMentalHealth: string) { this._nbtMentalHealth = pnbtMentalHealth; }


  get nbtAlchohalTreatMentDescription(): string { return this._nbtAlchohalTreatMentDescription; }

  set nbtAlchohalTreatMentDescription(pnbtAlchohalTreatMentDescription: string) { this._nbtAlchohalTreatMentDescription = pnbtAlchohalTreatMentDescription; }

  get nbtAttendenceCenter(): string { return this._nbtAttendenceCenter; }

  set nbtAttendenceCenter(pnbtAttendenceCenter: string) { this._nbtAttendenceCenter = pnbtAttendenceCenter; }


  get nbtUnit(): string { return this._nbtUnit; }

  set nbtUnit(pnbtUnit: string) { this._nbtUnit = pnbtUnit; }

  get nbtCurfiewReviewCode(): string { return this._nbtCurfiewReviewCode; }

  set nbtCurfiewReviewCode(pnbtCurfiewReviewCode: string) { this._nbtCurfiewReviewCode = pnbtCurfiewReviewCode; }


  get nbtStatus(): string { return this._nbtStatus; }

  set nbtStatus(pnbtStatus: string) { this._nbtStatus = pnbtStatus; }

  get conditionText(): string { return this._conditionText; }

  set conditionText(pconditionText: string) { this._conditionText = pconditionText; }

  get requirement(): string { return this._requirement; }

  set requirement(prequirement: string) { this._requirement = prequirement; }

  get provisoFlag(): string { return this._provisoFlag; }

  set provisoFlag(pprovisoFlag: string) { this._provisoFlag = pprovisoFlag; }

  get noWorkWithUnderAgeOf(): number { return this._noWorkWithUnderAgeOf; }

  set noWorkWithUnderAgeOf(pnoWorkWithUnderAgeOf: number) { this._noWorkWithUnderAgeOf = pnoWorkWithUnderAgeOf; }

  get statusDate(): Date { return this._statusDate; }

  set statusDate(pstatusDate: Date) { this._statusDate = pstatusDate; }

  get createUserId(): string { return this._createUserId; }

  set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

  get exclusionCode(): string { return this._exclusionCode; }

  set exclusionCode(pexclusionCode: string) { this._exclusionCode = pexclusionCode; }

  get financialTotalAmount(): number { return this._financialTotalAmount; }

  set financialTotalAmount(pfinancialTotalAmount: number) { this._financialTotalAmount = pfinancialTotalAmount; }

  get modifyDatetime(): Date { return this._modifyDatetime; }

  set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

  get offenderBookId(): number { return this._offenderBookId; }

  set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

  get conditionAppliedFlag(): string { return this._conditionAppliedFlag; }

  set conditionAppliedFlag(pconditionAppliedFlag: string) { this._conditionAppliedFlag = pconditionAppliedFlag; }

  get modifyUserId(): string { return this._modifyUserId; }

  set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

  get drugTesting(): string { return this._drugTesting; }

  set drugTesting(pdrugTesting: string) { this._drugTesting = pdrugTesting; }

  get restrictedChildAgeOf(): number { return this._restrictedChildAgeOf; }

  set restrictedChildAgeOf(prestrictedChildAgeOf: number) { this._restrictedChildAgeOf = prestrictedChildAgeOf; }

  get noUserOfComputer(): string { return this._noUserOfComputer; }

  set noUserOfComputer(pnoUserOfComputer: string) { this._noUserOfComputer = pnoUserOfComputer; }

  get terminationDate(): Date { return this._terminationDate; }

  set terminationDate(pterminationDate: Date) { this._terminationDate = pterminationDate; }

  get activityCode(): string { return this._activityCode; }

  set activityCode(pactivityCode: string) { this._activityCode = pactivityCode; }

  get conditionRecommendedFlag(): string { return this._conditionRecommendedFlag; }

  set conditionRecommendedFlag(pconditionRecommendedFlag: string) { this._conditionRecommendedFlag = pconditionRecommendedFlag; }

  get noWorkWithUnderAge(): string { return this._noWorkWithUnderAge; }

  set noWorkWithUnderAge(pnoWorkWithUnderAge: string) { this._noWorkWithUnderAge = pnoWorkWithUnderAge; }

  get nonAssociationText(): string { return this._nonAssociationText; }

  set nonAssociationText(pnonAssociationText: string) { this._nonAssociationText = pnonAssociationText; }

  get noResidentUnderAgeOf(): number { return this._noResidentUnderAgeOf; }

  set noResidentUnderAgeOf(pnoResidentUnderAgeOf: number) { this._noResidentUnderAgeOf = pnoResidentUnderAgeOf; }

  get reportDate(): Date { return this._reportDate; }

  set reportDate(preportDate: Date) { this._reportDate = preportDate; }

  get conditionRequiredFlag(): string { return this._conditionRequiredFlag; }

  set conditionRequiredFlag(pconditionRequiredFlag: string) { this._conditionRequiredFlag = pconditionRequiredFlag; }

  get reviewCode(): string { return this._reviewCode; }

  set reviewCode(previewCode: string) { this._reviewCode = previewCode; }

  get activityStatus(): string { return this._activityStatus; }

  set activityStatus(pactivityStatus: string) { this._activityStatus = pactivityStatus; }

  get noAccessToInternet(): string { return this._noAccessToInternet; }

  set noAccessToInternet(pnoAccessToInternet: string) { this._noAccessToInternet = pnoAccessToInternet; }

  get statusUpdateComment(): string { return this._statusUpdateComment; }

  set statusUpdateComment(pstatusUpdateComment: string) { this._statusUpdateComment = pstatusUpdateComment; }

  get sealFlag(): string { return this._sealFlag; }

  set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

  get DateType(): string { return this._DateType; }

  set DateType(pDateType: string) { this._DateType = pDateType; }

  get statusUpdateStaffId(): number { return this._statusUpdateStaffId; }

  set statusUpdateStaffId(pstatusUpdateStaffId: number) { this._statusUpdateStaffId = pstatusUpdateStaffId; }

  get DateId(): number { return this._DateId; }

  set DateId(pDateId: number) { this._DateId = pDateId; }

  get personalRelationshipFlag(): string { return this._personalRelationshipFlag; }

  set personalRelationshipFlag(ppersonalRelationshipFlag: string) { this._personalRelationshipFlag = ppersonalRelationshipFlag; }

  get sentenceSeq(): number { return this._sentenceSeq; }

  set sentenceSeq(psentenceSeq: number) { this._sentenceSeq = psentenceSeq; }

  get categoryType(): string { return this._categoryType; }

  set categoryType(pcategoryType: string) { this._categoryType = pcategoryType; }

  get boardOrderFlag(): string { return this._boardOrderFlag; }

  set boardOrderFlag(pboardOrderFlag: string) { this._boardOrderFlag = pboardOrderFlag; }

  get lengthUnit(): string { return this._lengthUnit; }

  set lengthUnit(plengthUnit: string) { this._lengthUnit = plengthUnit; }

  get listSeq(): number { return this._listSeq; }

  set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

  get prohibitedContact(): string { return this._prohibitedContact; }

  set prohibitedContact(pprohibitedContact: string) { this._prohibitedContact = pprohibitedContact; }

  get restrictedApprovalPerson(): string { return this._restrictedApprovalPerson; }

  set restrictedApprovalPerson(prestrictedApprovalPerson: string) { this._restrictedApprovalPerson = prestrictedApprovalPerson; }

  get startDate(): Date { return this._startDate; }

  set startDate(pstartDate: Date) { this._startDate = pstartDate; }

  get workflowId(): number { return this._workflowId; }

  set workflowId(pworkflowId: number) { this._workflowId = pworkflowId; }

  get reportTime(): Date { return this._reportTime; }

  set reportTime(preportTime: Date) { this._reportTime = preportTime; }

  get curfewProvider(): string { return this._curfewProvider; }

  set curfewProvider(pcurfewProvider: string) { this._curfewProvider = pcurfewProvider; }

  get supervisorName(): string { return this._supervisorName; }

  set supervisorName(psupervisorName: string) { this._supervisorName = psupervisorName; }

  get statusReasonCode(): string { return this._statusReasonCode; }

  set statusReasonCode(pstatusReasonCode: string) { this._statusReasonCode = pstatusReasonCode; }

  get statusUpdateDate(): Date { return this._statusUpdateDate; }

  set statusUpdateDate(pstatusUpdateDate: Date) { this._statusUpdateDate = pstatusUpdateDate; }

  get alcoholTreatmentProvider(): string { return this._alcoholTreatmentProvider; }

  set alcoholTreatmentProvider(palcoholTreatmentProvider: string) { this._alcoholTreatmentProvider = palcoholTreatmentProvider; }

  get commConditionCode(): string { return this._commConditionCode; }

  set commConditionCode(pcommConditionCode: string) { this._commConditionCode = pcommConditionCode; }

  get commentText(): string { return this._commentText; }

  set commentText(pcommentText: string) { this._commentText = pcommentText; }

  get expiryDate(): Date { return this._expiryDate; }

  set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

  get residencyAddressId(): number { return this._residencyAddressId; }

  set residencyAddressId(presidencyAddressId: number) { this._residencyAddressId = presidencyAddressId; }

  get serialVersionUID(): number { return this._serialVersionUID; }

  set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

  get appointmentPersonName(): string { return this._appointmentPersonName; }

  set appointmentPersonName(pappointmentPersonName: string) { this._appointmentPersonName = pappointmentPersonName; }

  get nonAssociatedOffenders(): string { return this._nonAssociatedOffenders; }

  set nonAssociatedOffenders(pnonAssociatedOffenders: string) { this._nonAssociatedOffenders = pnonAssociatedOffenders; }

  get detailsText(): string { return this._detailsText; }

  set detailsText(pdetailsText: string) { this._detailsText = pdetailsText; }

  get mentalHealthProvider(): string { return this._mentalHealthProvider; }

  set mentalHealthProvider(pmentalHealthProvider: string) { this._mentalHealthProvider = pmentalHealthProvider; }

  get longCommentText(): string { return this._longCommentText; }

  set longCommentText(plongCommentText: string) { this._longCommentText = plongCommentText; }

  get curfewEndTime(): Date { return this._curfewEndTime; }

  set curfewEndTime(pcurfewEndTime: Date) { this._curfewEndTime = pcurfewEndTime; }

  get otherProgram(): string { return this._otherProgram; }

  set otherProgram(potherProgram: string) { this._otherProgram = potherProgram; }

  get vehicleDetailsFlag(): string { return this._vehicleDetailsFlag; }

  set vehicleDetailsFlag(pvehicleDetailsFlag: string) { this._vehicleDetailsFlag = pvehicleDetailsFlag; }

  get statusUpdateReason(): string { return this._statusUpdateReason; }

  set statusUpdateReason(pstatusUpdateReason: string) { this._statusUpdateReason = pstatusUpdateReason; }

  get length(): number { return this._length; }

  set length(plength: number) { this._length = plength; }

  get curfewStartTime(): Date { return this._curfewStartTime; }

  set curfewStartTime(pcurfewStartTime: Date) { this._curfewStartTime = pcurfewStartTime; }

  get curfewTaggingFlag(): string { return this._curfewTaggingFlag; }

  set curfewTaggingFlag(pcurfewTaggingFlag: string) { this._curfewTaggingFlag = pcurfewTaggingFlag; }

  get attendanceCentre(): string { return this._attendanceCentre; }

  set attendanceCentre(pattendanceCentre: string) { this._attendanceCentre = pattendanceCentre; }

  get commConditionType(): string { return this._commConditionType; }

  set commConditionType(pcommConditionType: string) { this._commConditionType = pcommConditionType; }

  get createDatetime(): Date { return this._createDatetime; }

  set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

  get conditionStatus(): string { return this._conditionStatus; }

  set conditionStatus(pconditionStatus: string) { this._conditionStatus = pconditionStatus; }

  get offenderSentConditionId(): number { return this._offenderSentConditionId; }

  set offenderSentConditionId(poffenderSentConditionId: number) { this._offenderSentConditionId = poffenderSentConditionId; }

  get governorConditionFlag(): string { return this._governorConditionFlag; }

  set governorConditionFlag(pgovernorConditionFlag: string) { this._governorConditionFlag = pgovernorConditionFlag; }

  get programId(): number { return this._programId; }

  set programId(pprogramId: number) { this._programId = pprogramId; }

  get condActType(): string { return this._condActType; }

  set condActType(pcondActType: string) { this._condActType = pcondActType; }

  get conditionSuspendedFlag(): string { return this._conditionSuspendedFlag; }

  set conditionSuspendedFlag(pconditionSuspendedFlag: string) { this._conditionSuspendedFlag = pconditionSuspendedFlag; }

  get count(): number { return this._count; }

  set count(pcount: number) { this._count = pcount; }

  get workHours(): number { return this._workHours; }
  set workHours(pworkHours: number) { this._workHours = pworkHours; }

  get returnValue(): number { return this._returnValue; }
  set returnValue(preturnValue: number) { this._returnValue = preturnValue; }

  get serverCode(): number { return this._serverCode; }
  set serverCode(pserverCode: number) { this._serverCode = pserverCode; }

  get transferFlag(): boolean { return this._transferFlag; }
  set transferFlag(ptransferFlag: boolean) { this._transferFlag = ptransferFlag; }

  get assgnTeamCount(): number { return this._assgnTeamCount; }
  set assgnTeamCount(value: number) { this._assgnTeamCount = value; }

  get agyLocId(): string { return this._agyLocId; }
  set agyLocId(value: string) { this._agyLocId = value; }

  get offenderProceedingId(): number { return this._offenderProceedingId; }

  set offenderProceedingId(poffenderProceedingId: number) { this._offenderProceedingId = poffenderProceedingId; }

  get linkFlag(): string { return this._linkFlag; }
  set linkFlag(plinkFlag: string) { this._linkFlag = plinkFlag; }

  get orderType(): string { return this._orderType; }
  set orderType(porderType: string) { this._orderType = porderType; }

  get orderOperations(): string { return this._orderOperations; }
  set orderOperations(value: string) { this._orderOperations = value; }

  toJSON(): any {
    return {
      'noWorkWithUnderAgeOf': this._noWorkWithUnderAgeOf,
      'statusDate': this._statusDate,
      'createUserId': this._createUserId,
      'exclusionCode': this._exclusionCode,
      'financialTotalAmount': this._financialTotalAmount,
      'modifyDatetime': this._modifyDatetime,
      'offenderBookId': this._offenderBookId,
      'conditionAppliedFlag': this._conditionAppliedFlag,
      'modifyUserId': this._modifyUserId,
      'drugTesting': this._drugTesting,
      'restrictedChildAgeOf': this._restrictedChildAgeOf,
      'noUserOfComputer': this._noUserOfComputer,
      'terminationDate': this._terminationDate,
      'activityCode': this._activityCode,
      'conditionRecommendedFlag': this._conditionRecommendedFlag,
      'noWorkWithUnderAge': this._noWorkWithUnderAge,
      'nonAssociationText': this._nonAssociationText,
      'noResidentUnderAgeOf': this._noResidentUnderAgeOf,
      'reportDate': this._reportDate,
      'conditionRequiredFlag': this._conditionRequiredFlag,
      'reviewCode': this._reviewCode,
      'activityStatus': this._activityStatus,
      'noAccessToInternet': this._noAccessToInternet,
      'statusUpdateComment': this._statusUpdateComment,
      'sealFlag': this._sealFlag,
      'DateType': this._DateType,
      'statusUpdateStaffId': this._statusUpdateStaffId,
      'DateId': this._DateId,
      'personalRelationshipFlag': this._personalRelationshipFlag,
      'sentenceSeq': this._sentenceSeq,
      'categoryType': this._categoryType,
      'boardOrderFlag': this._boardOrderFlag,
      'lengthUnit': this._lengthUnit,
      'listSeq': this._listSeq,
      'prohibitedContact': this._prohibitedContact,
      'restrictedApprovalPerson': this._restrictedApprovalPerson,
      'startDate': this._startDate,
      'workflowId': this._workflowId,
      'reportTime': this._reportTime,
      'curfewProvider': this._curfewProvider,
      'supervisorName': this._supervisorName,
      'statusReasonCode': this._statusReasonCode,
      'statusUpdateDate': this._statusUpdateDate,
      'alcoholTreatmentProvider': this._alcoholTreatmentProvider,
      'commConditionCode': this._commConditionCode,
      'commentText': this._commentText,
      'expiryDate': this._expiryDate,
      'residencyAddressId': this._residencyAddressId,
      'serialVersionUID': this._serialVersionUID,
      'appointmentPersonName': this._appointmentPersonName,
      'nonAssociatedOffenders': this._nonAssociatedOffenders,
      'detailsText': this._detailsText,
      'mentalHealthProvider': this._mentalHealthProvider,
      'longCommentText': this._longCommentText,
      'curfewEndTime': this._curfewEndTime,
      'otherProgram': this._otherProgram,
      'vehicleDetailsFlag': this._vehicleDetailsFlag,
      'statusUpdateReason': this._statusUpdateReason,
      'length': this._length,
      'curfewStartTime': this._curfewStartTime,
      'curfewTaggingFlag': this._curfewTaggingFlag,
      'attendanceCentre': this._attendanceCentre,
      'commConditionType': this._commConditionType,
      'createDatetime': this._createDatetime,
      'conditionStatus': this._conditionStatus,
      'offenderSentConditionId': this._offenderSentConditionId,
      'governorConditionFlag': this._governorConditionFlag,
      'programId': this._programId,
      'condActType': this._condActType,
      'provisoFlag': this._provisoFlag,
      'requirement': this._requirement,
      'conditionSuspendedFlag': this._conditionSuspendedFlag,
      'count': this._count,
      'workHours': this._workHours,
      'conditionText': this._conditionText,
      'nbtRequirement': this._nbtRequirement,
      'nbtProgram': this._nbtProgram,
      'nbtActivity': this._nbtActivity,
      'nbtCurfiewProvider': this._nbtCurfiewProvider,
      'nbtExclusionCode': this._nbtExclusionCode,
      'nbtMentalHealth': this._nbtMentalHealth,
      'nbtAlchohalTreatMentDescription': this._nbtAlchohalTreatMentDescription,
      'nbtAttendenceCenter': this._nbtAttendenceCenter,
      'nbtUnit': this._nbtUnit,
      'nbtCurfiewReviewCode': this._nbtCurfiewReviewCode,
      'nbtStatus': this._nbtStatus,
      'pSusFlag': this._pSusFlag,
      'returnValue': this._returnValue,
      'serverCode': this._serverCode,
      'objectId': this._objectId,
      'objectType': this._objectType,
      'program': this._program,
      'programMethod': this._programMethod,
      'copyFlag': this._copyFlag,
      'categoryTypeCode': this._categoryTypeCode,
      'caseloadId': this._caseloadId,
      'courseProfilesActs': this._courseProfilesActs,
      'appointmentsActs': this._appointmentsActs,
      'appointmentsSa': this._appointmentsSa,
      'condition': this._condition,
      'agyLocId': this._agyLocId,
      'offenderProceedingId': this._offenderProceedingId,
      'linkFlag': this._linkFlag,
      'orderType': this._orderType,
      'orderOperations': this._orderOperations
    };
  }
}
