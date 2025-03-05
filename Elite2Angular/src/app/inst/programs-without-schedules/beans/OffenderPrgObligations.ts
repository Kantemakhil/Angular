import { BaseModel } from '@commonbeans/BaseModel';

export class OffenderPrgObligations extends BaseModel {
		 private _statusChangeReason: string;
		 private _createUserId: string;
		 private _endDate: Date;
		 private _modifyDatetime: Date;
		 private _offenderBookId: number;
		 private _availabilityCode: string;
		 private _modifyUserId: string;
		 private _commentText: string;
		 private _statusChangeDate: Date;
		 private _specialNeedFlag: string;
		 private _specialNeedFlagTemp: boolean;
		 private _serialVersionUID: number;
		 private _referralDate: Date;
		 private _sealFlag: string;
		 private _eventSubType: string;
		 private _length: number;
		 private _eventType: string;
		 private _sentenceSeq: number;
		 private _decisionDate: Date;
		 private _createDatetime: Date;
		 private _obligationSource: string;
		 private _lengthUnit: string;
		 private _offenderPrgObligationId: number;
		 private _offenderSentConditionId: number;
		 private _programId: number;
		 private _startDate: Date;
		 private _referralPriority: string;
		 private _status: string;
         private _description: string;
         private _statusDescription: string;
         private _pCategory: string;
         private _pOperation: string;
		 private _flag: boolean;
		 private _sentenceEndDate: string;
		 private _sentenceStartDate: string;
		 private _orderType: string;
		 private _sentenceDesc: string;
		 private _programDesc: string;
	

	

		 get statusChangeReason(): string{ return this._statusChangeReason; }
		 set statusChangeReason(pstatusChangeReason: string){ this._statusChangeReason = pstatusChangeReason ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get endDate(): Date{ return this._endDate; }
		 set endDate(pendDate: Date){ this._endDate = pendDate ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get availabilityCode(): string{ return this._availabilityCode; }
		 set availabilityCode(pavailabilityCode: string){ this._availabilityCode = pavailabilityCode ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get commentText(): string{ return this._commentText; }
		 set commentText(pcommentText: string){ this._commentText = pcommentText ;}
		 get statusChangeDate(): Date{ return this._statusChangeDate; }
		 set statusChangeDate(pstatusChangeDate: Date){ this._statusChangeDate = pstatusChangeDate ;}
		 get specialNeedFlag(): string{ return this._specialNeedFlag; }
		 set specialNeedFlag(pspecialNeedFlag: string){ this._specialNeedFlag = pspecialNeedFlag ;}
		 get specialNeedFlagTemp(): boolean{ return this._specialNeedFlagTemp; }
		 set specialNeedFlagTemp(specialNeedFlagTemp: boolean){ this._specialNeedFlagTemp = specialNeedFlagTemp ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get referralDate(): Date{ return this._referralDate; }
		 set referralDate(preferralDate: Date){ this._referralDate = preferralDate ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get eventSubType(): string{ return this._eventSubType; }
		 set eventSubType(peventSubType: string){ this._eventSubType = peventSubType ;}
		 get length(): number{ return this._length; }
		 set length(plength: number){ this._length = plength ;}
		 get eventType(): string{ return this._eventType; }
		 set eventType(peventType: string){ this._eventType = peventType ;}
		 get sentenceSeq(): number{ return this._sentenceSeq; }
		 set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq ;}
		 get decisionDate(): Date{ return this._decisionDate; }
		 set decisionDate(pdecisionDate: Date){ this._decisionDate = pdecisionDate ;}
		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get obligationSource(): string{ return this._obligationSource; }
		 set obligationSource(pobligationSource: string){ this._obligationSource = pobligationSource ;}
		 get lengthUnit(): string{ return this._lengthUnit; }
		 set lengthUnit(plengthUnit: string){ this._lengthUnit = plengthUnit ;}
		 get offenderPrgObligationId(): number{ return this._offenderPrgObligationId; }
		 set offenderPrgObligationId(poffenderPrgObligationId: number){ this._offenderPrgObligationId = poffenderPrgObligationId ;}
		 get offenderSentConditionId(): number{ return this._offenderSentConditionId; }
		 set offenderSentConditionId(poffenderSentConditionId: number){ this._offenderSentConditionId = poffenderSentConditionId ;}
		 get programId(): number{ return this._programId; }
		 set programId(pprogramId: number){ this._programId = pprogramId ;}
		 get startDate(): Date{ return this._startDate; }
		 set startDate(pstartDate: Date){ this._startDate = pstartDate ;}
		 get referralPriority(): string{ return this._referralPriority; }
		 set referralPriority(preferralPriority: string){ this._referralPriority = preferralPriority ;}
		 get status(): string{ return this._status; }
		 set status(pstatus: string){ this._status = pstatus ;}
		 get description(): string{ return this._description; }
         set description(pdescription: string){ this._description = pdescription ;}
         get statusDescription(): string{ return this._statusDescription; }
         set statusDescription(pstatusDescription: string){ this._statusDescription = pstatusDescription ;}
         get pCategory(): string{ return this._pCategory; }
         set pCategory(ppCategory: string){ this._pCategory = ppCategory ;}
         get pOperation(): string{ return this._pOperation; }
         set pOperation(ppOperation: string){ this._pOperation = ppOperation ;}
		 get flag(): boolean { return this._flag; }
		 set flag(value: boolean) { this._flag = value; }
		 get sentenceEndDate(): string { return this._sentenceEndDate; }
		 set sentenceEndDate(value: string) { this._sentenceEndDate = value; }
		 get sentenceStartDate(): string { return this._sentenceStartDate; }
		 set sentenceStartDate(value: string) { this._sentenceStartDate = value; }
		 get sentenceDesc(): string { return this._sentenceDesc; }
		 set sentenceDesc(value: string) { this._sentenceDesc = value; }
		 get orderType(): string { return this._orderType; }
		 set orderType(value: string) { this._orderType = value; }
		 get programDesc(): string {return this._programDesc;}
		 set programDesc(value: string) {this._programDesc = value;}

 	toJSON(): any {
 		return { 
			'statusChangeReason': this._statusChangeReason,
			'createUserId': this._createUserId,
			'endDate': this._endDate,
			'modifyDatetime': this._modifyDatetime,
			'offenderBookId': this._offenderBookId,
			'availabilityCode': this._availabilityCode,
			'modifyUserId': this._modifyUserId,
			'commentText': this._commentText,
			'statusChangeDate': this._statusChangeDate,
			'specialNeedFlag': this._specialNeedFlag,
			'serialVersionUID': this._serialVersionUID,
			'referralDate': this._referralDate,
			'sealFlag': this._sealFlag,
			'eventSubType': this._eventSubType,
			'length': this._length,
			'eventType': this._eventType,
			'sentenceSeq': this._sentenceSeq,
			'decisionDate': this._decisionDate,
			'createDatetime': this._createDatetime,
			'obligationSource': this._obligationSource,
			'lengthUnit': this._lengthUnit,
			'offenderPrgObligationId': this._offenderPrgObligationId,
			'offenderSentConditionId': this._offenderSentConditionId,
			'programId': this._programId,
			'startDate': this._startDate,
			'referralPriority': this._referralPriority,
			'status': this._status,
			'description': this._description,
			'statusDescription': this._statusDescription,
            'pOperation': this._pOperation,
            'pCategory' : this._pCategory,
			'flag':this._flag,
			'sentenceEndDate': this._sentenceEndDate,
			'sentenceStartDate': this._sentenceStartDate,
			'orderType': this._orderType,
			'sentenceDesc': this._sentenceDesc,
			'programDesc' : this._programDesc,
 			};
 		}  
 }