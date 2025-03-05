export class Appeals {
    private _courtType: string;
		 private _eventId: number;
		 private _createUserId: string;
		 private _upheldDate: Date;
		 private _appealResultCode: string;
		 private _modifyDatetime: Date;
		 private _offenderBookId: number;
		 private _offenderChargeId: number;
		 private _modifyUserId: string;
		 private _courtAgyLocId: string;
		 private _appealPartyCode: string;
		 private _judgeText: string;
		 private _appealId: number;
		 private _commentText: string;
		 private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _appealLodgedDate: Date;
		 private _adjustRequiredFlag: string;
		 private _workflowTempData: string;
		 private _applyFlag: string;

		 get courtType(): string{ return this._courtType; }
		 set courtType(pcourtType: string){ this._courtType = pcourtType ;}
		 get eventId(): number{ return this._eventId; }
		 set eventId(peventId: number){ this._eventId = peventId ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get upheldDate(): Date{ return this._upheldDate; }
		 set upheldDate(pupheldDate: Date){ this._upheldDate = pupheldDate ;}
		 get appealResultCode(): string{ return this._appealResultCode; }
		 set appealResultCode(pappealResultCode: string){ this._appealResultCode = pappealResultCode ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get offenderChargeId(): number{ return this._offenderChargeId; }
		 set offenderChargeId(poffenderChargeId: number){ this._offenderChargeId = poffenderChargeId ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get courtAgyLocId(): string{ return this._courtAgyLocId; }
		 set courtAgyLocId(pcourtAgyLocId: string){ this._courtAgyLocId = pcourtAgyLocId ;}
		 get appealPartyCode(): string{ return this._appealPartyCode; }
		 set appealPartyCode(pappealPartyCode: string){ this._appealPartyCode = pappealPartyCode ;}
		 get judgeText(): string{ return this._judgeText; }
		 set judgeText(pjudgeText: string){ this._judgeText = pjudgeText ;}
		 get appealId(): number{ return this._appealId; }
		 set appealId(pappealId: number){ this._appealId = pappealId ;}
		 get commentText(): string{ return this._commentText; }
		 set commentText(pcommentText: string){ this._commentText = pcommentText ;}
		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get appealLodgedDate(): Date{ return this._appealLodgedDate; }
		 set appealLodgedDate(pappealLodgedDate: Date){ this._appealLodgedDate = pappealLodgedDate ;}
		 get adjustRequiredFlag(): string{ return this._adjustRequiredFlag; }
		 set adjustRequiredFlag(padjustRequiredFlag: string){ this._adjustRequiredFlag = padjustRequiredFlag ;}
		 get workflowTempData(): string{ return this._workflowTempData; }
		 set workflowTempData(pworkflowTempData: string){ this._workflowTempData = pworkflowTempData ;}
		 get applyFlag(): string{ return this._applyFlag; }
		 set applyFlag(papplyFlag: string){ this._applyFlag = papplyFlag ;}

 	toJSON(): any {
 		return { 
			'courtType': this._courtType,
			'eventId': this._eventId,
			'createUserId': this._createUserId,
			'upheldDate': this._upheldDate,
			'appealResultCode': this._appealResultCode,
			'modifyDatetime': this._modifyDatetime,
			'offenderBookId': this._offenderBookId,
			'offenderChargeId': this._offenderChargeId,
			'modifyUserId': this._modifyUserId,
			'courtAgyLocId': this._courtAgyLocId,
			'appealPartyCode': this._appealPartyCode,
			'judgeText': this._judgeText,
			'appealId': this._appealId,
			'commentText': this._commentText,
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'appealLodgedDate': this._appealLodgedDate,
			'adjustRequiredFlag': this._adjustRequiredFlag,
			'workflowTempData': this._workflowTempData,
			'applyFlag': this._applyFlag,
 			};
 		} 
}