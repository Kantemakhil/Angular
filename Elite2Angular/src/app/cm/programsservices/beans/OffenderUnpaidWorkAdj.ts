	export class OffenderUnpaidWorkAdj {
		 private _adjustmentDate: Date;
		 private _createUserId: string;
		 private _offenderBookId: number;
		 private _modifyDatetime: Date;
		 private _adjustmentType: string;
		 private _modifyUserId: string;
		 private _commentText: string;
		 private _sentenceSeq: number;
		 private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _adjustmentMinutes: number;
		 private _offenderUnpaidWorkAdjId: number;
		 private _reasonCode: string;
		 private _sealFlag: string;
		private _orderType: string;
		private _offenderSentConditionId: number;

		 get adjustmentDate(): Date{ return this._adjustmentDate; }
		 set adjustmentDate(padjustmentDate: Date){ this._adjustmentDate = padjustmentDate ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get adjustmentType(): string{ return this._adjustmentType; }
		 set adjustmentType(padjustmentType: string){ this._adjustmentType = padjustmentType ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get commentText(): string{ return this._commentText; }
		 set commentText(pcommentText: string){ this._commentText = pcommentText ;}
		 get sentenceSeq(): number{ return this._sentenceSeq; }
		 set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq ;}
		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get adjustmentMinutes(): number{ return this._adjustmentMinutes; }
		 set adjustmentMinutes(padjustmentMinutes: number){ this._adjustmentMinutes = padjustmentMinutes ;}
		 get offenderUnpaidWorkAdjId(): number{ return this._offenderUnpaidWorkAdjId; }
		 set offenderUnpaidWorkAdjId(poffenderUnpaidWorkAdjId: number){ this._offenderUnpaidWorkAdjId = poffenderUnpaidWorkAdjId ;}
		 get reasonCode(): string{ return this._reasonCode; }
		 set reasonCode(preasonCode: string){ this._reasonCode = preasonCode ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		get orderType(): string { return this._orderType; }
		set orderType(value: string) { this._orderType = value; }
		get offenderSentConditionId(): number { return this._offenderSentConditionId; }
		set offenderSentConditionId(value: number) { this._offenderSentConditionId = value; }

 	toJSON(): any {
 		return { 
			'adjustmentDate': this._adjustmentDate,
			'createUserId': this._createUserId,
			'offenderBookId': this._offenderBookId,
			'modifyDatetime': this._modifyDatetime,
			'adjustmentType': this._adjustmentType,
			'modifyUserId': this._modifyUserId,
			'commentText': this._commentText,
			'sentenceSeq': this._sentenceSeq,
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'adjustmentMinutes': this._adjustmentMinutes,
			'offenderUnpaidWorkAdjId': this._offenderUnpaidWorkAdjId,
			'reasonCode': this._reasonCode,
			'sealFlag': this._sealFlag,
				'orderType': this._orderType,
				'offenderSentConditionId': this._offenderSentConditionId,
 			};
 		}  
 }