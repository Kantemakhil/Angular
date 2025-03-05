	export class VOffenderSentCondActs {
		 private _orderId: number;
		 private _offenderBookId: number;
		 private _courtAgyLocId: string;
		 private _conditionDesc: string;
		 private _commConditionCode: string;
		 private _activityDesc: string;
		 private _sentenceProgramMethod: string;
		 private _creditedUnits: number;
		 private _activityCode: string;
		 private _serialVersionUID: number;
		 private _sentenceStatusDesc: string;
		 private _courtName: string;
		 private _commProgramMethod: string;
		 private _programCategory: string;
		 private _sentenceStartDate: Date;
		 private _sentenceEndDate: Date;
		 private _recordSource: string;
		 private _sentenceCategory: string;
		 private _eventId: number;
		 private _programActivityStatus: string;
		 private _sentenceCalcType: string;
		 private _sentenceDesc: string;
		 private _length: number;
		 private _sentenceSeq: number;
		 private _commConditionType: string;
		 private _conditionStatus: string;
		 private _sentenceStatus: string;
		 private _caseInfoNumber: string;
		 private _conditionStartDate: Date;
		 private _conditionEndDate: Date;
		 private _lengthUnit: string;
		 private _offenderSentConditionId: number;
		 private _checkSum: number;
		 private _sentCondDesc: string;
		 private _conditionLength: string;
		 private _programId: number;
		 private _remaining: number;
		private _orderType: string;	
		private _sentenceSeqNo: string;
		
		
		 get remaining(): number {  return this._remaining; }
		 set remaining(value: number) { this._remaining = value; }
		 get orderId(): number{ return this._orderId; }
		 set orderId(porderId: number){ this._orderId = porderId ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get courtAgyLocId(): string{ return this._courtAgyLocId; }
		 set courtAgyLocId(pcourtAgyLocId: string){ this._courtAgyLocId = pcourtAgyLocId ;}
		 get conditionDesc(): string{ return this._conditionDesc; }
		 set conditionDesc(pconditionDesc: string){ this._conditionDesc = pconditionDesc ;}
		 get commConditionCode(): string{ return this._commConditionCode; }
		 set commConditionCode(pcommConditionCode: string){ this._commConditionCode = pcommConditionCode ;}
		 get activityDesc(): string{ return this._activityDesc; }
		 set activityDesc(pactivityDesc: string){ this._activityDesc = pactivityDesc ;}
		 get sentenceProgramMethod(): string{ return this._sentenceProgramMethod; }
		 set sentenceProgramMethod(psentenceProgramMethod: string){ this._sentenceProgramMethod = psentenceProgramMethod ;}
		 get creditedUnits(): number{ return this._creditedUnits; }
		 set creditedUnits(pcreditedUnits: number){ this._creditedUnits = pcreditedUnits ;}
		 get activityCode(): string{ return this._activityCode; }
		 set activityCode(pactivityCode: string){ this._activityCode = pactivityCode ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get sentenceStatusDesc(): string{ return this._sentenceStatusDesc; }
		 set sentenceStatusDesc(psentenceStatusDesc: string){ this._sentenceStatusDesc = psentenceStatusDesc ;}
		 get courtName(): string{ return this._courtName; }
		 set courtName(pcourtName: string){ this._courtName = pcourtName ;}
		 get commProgramMethod(): string{ return this._commProgramMethod; }
		 set commProgramMethod(pcommProgramMethod: string){ this._commProgramMethod = pcommProgramMethod ;}
		 get programCategory(): string{ return this._programCategory; }
		 set programCategory(pprogramCategory: string){ this._programCategory = pprogramCategory ;}
		 get sentenceStartDate(): Date{ return this._sentenceStartDate; }
		 set sentenceStartDate(psentenceStartDate: Date){ this._sentenceStartDate = psentenceStartDate ;}
		 get sentenceEndDate(): Date{ return this._sentenceEndDate; }
		 set sentenceEndDate(psentenceEndDate: Date){ this._sentenceEndDate = psentenceEndDate ;}
		 get recordSource(): string{ return this._recordSource; }
		 set recordSource(precordSource: string){ this._recordSource = precordSource ;}
		 get sentenceCategory(): string{ return this._sentenceCategory; }
		 set sentenceCategory(psentenceCategory: string){ this._sentenceCategory = psentenceCategory ;}
		 get eventId(): number{ return this._eventId; }
		 set eventId(peventId: number){ this._eventId = peventId ;}
		 get programActivityStatus(): string{ return this._programActivityStatus; }
		 set programActivityStatus(pprogramActivityStatus: string){ this._programActivityStatus = pprogramActivityStatus ;}
		 get sentenceCalcType(): string{ return this._sentenceCalcType; }
		 set sentenceCalcType(psentenceCalcType: string){ this._sentenceCalcType = psentenceCalcType ;}
		 get sentenceDesc(): string{ return this._sentenceDesc; }
		 set sentenceDesc(psentenceDesc: string){ this._sentenceDesc = psentenceDesc ;}
		 get length(): number{ return this._length; }
		 set length(plength: number){ this._length = plength ;}
		 get sentenceSeq(): number{ return this._sentenceSeq; }
		 set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq ;}
		 get commConditionType(): string{ return this._commConditionType; }
		 set commConditionType(pcommConditionType: string){ this._commConditionType = pcommConditionType ;}
		 get conditionStatus(): string{ return this._conditionStatus; }
		 set conditionStatus(pconditionStatus: string){ this._conditionStatus = pconditionStatus ;}
		 get sentenceStatus(): string{ return this._sentenceStatus; }
		 set sentenceStatus(psentenceStatus: string){ this._sentenceStatus = psentenceStatus ;}
		 get caseInfoNumber(): string{ return this._caseInfoNumber; }
		 set caseInfoNumber(pcaseInfoNumber: string){ this._caseInfoNumber = pcaseInfoNumber ;}
		 get conditionStartDate(): Date{ return this._conditionStartDate; }
		 set conditionStartDate(pconditionStartDate: Date){ this._conditionStartDate = pconditionStartDate ;}
		 get conditionEndDate(): Date{ return this._conditionEndDate; }
		 set conditionEndDate(pconditionEndDate: Date){ this._conditionEndDate = pconditionEndDate ;}
		 get lengthUnit(): string{ return this._lengthUnit; }
		 set lengthUnit(plengthUnit: string){ this._lengthUnit = plengthUnit ;}
		 get offenderSentConditionId(): number{ return this._offenderSentConditionId; }
		 set offenderSentConditionId(poffenderSentConditionId: number){ this._offenderSentConditionId = poffenderSentConditionId ;}
		 get checkSum(): number{ return this._checkSum; }
		 set checkSum(pcheckSum: number){ this._checkSum = pcheckSum ;}
		 get sentCondDesc(): string{ return this._sentCondDesc; }
		 set sentCondDesc(psentCondDesc: string){ this._sentCondDesc = psentCondDesc ;}
		 get conditionLength(): string{ return this._conditionLength; }
		 set conditionLength(pconditionLength: string){ this._conditionLength = pconditionLength ;}
		 get programId(): number{ return this._programId; }
		 set programId(pprogramId: number){ this._programId = pprogramId ;}
		get orderType(): string { return this._orderType; }
		set orderType(value: string) { this._orderType = value; }
		get sentenceSeqNo(): string { return this._sentenceSeqNo; }
		set sentenceSeqNo(value: string) { this._sentenceSeqNo = value; }

 	toJSON(): any {
 		return { 
			'orderId': this._orderId,
			'offenderBookId': this._offenderBookId,
			'courtAgyLocId': this._courtAgyLocId,
			'conditionDesc': this._conditionDesc,
			'commConditionCode': this._commConditionCode,
			'activityDesc': this._activityDesc,
			'sentenceProgramMethod': this._sentenceProgramMethod,
			'creditedUnits': this._creditedUnits,
			'activityCode': this._activityCode,
			'serialVersionUID': this._serialVersionUID,
			'sentenceStatusDesc': this._sentenceStatusDesc,
			'courtName': this._courtName,
			'commProgramMethod': this._commProgramMethod,
			'programCategory': this._programCategory,
			'sentenceStartDate': this._sentenceStartDate,
			'sentenceEndDate': this._sentenceEndDate,
			'recordSource': this._recordSource,
			'sentenceCategory': this._sentenceCategory,
			'eventId': this._eventId,
			'programActivityStatus': this._programActivityStatus,
			'sentenceCalcType': this._sentenceCalcType,
			'sentenceDesc': this._sentenceDesc,
			'length': this._length,
			'sentenceSeq': this._sentenceSeq,
			'commConditionType': this._commConditionType,
			'conditionStatus': this._conditionStatus,
			'sentenceStatus': this._sentenceStatus,
			'caseInfoNumber': this._caseInfoNumber,
			'conditionStartDate': this._conditionStartDate,
			'conditionEndDate': this._conditionEndDate,
			'lengthUnit': this._lengthUnit,
			'offenderSentConditionId': this._offenderSentConditionId,
			'checkSum': this._checkSum,
			'sentCondDesc': this._sentCondDesc,
			'conditionLength': this._conditionLength,
			'programId': this._programId,
				'orderType': this._orderType,
				'sentenceSeqNo': this._sentenceSeqNo,
 			};
 		}  
 }