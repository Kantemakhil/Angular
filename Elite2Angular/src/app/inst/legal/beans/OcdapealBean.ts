export class OcdapealBean {
    private _eventId: number;
		 private _offenderBookId: number;
		 private _offenderChargeId: number;
		 private _offRes: string;
		 private _offenceType: string;
		 private _resultCode1: string;
		 private _statuteCode: string;
		 private _dispositionCode: string;
		 private _offenceDescription: string;
		 private _chargeInfoNumber: string;
		 private _serialVersionUID: number;
		 private _offenceCode: string;
		 private _convictionFlag: string;
		 private _resultCode1Desc: string;
		 private _caseId: number;
		 private _offenceDescriptionType: string;
		 private _applyFlag: string;
		 private _offenceDate: Date;
		 private _resultCode1Indicator: string;
		 private _complicityTypeDesc: string;
		 private _appealId: number;
		 private _bailApplyFlag: string;

		 get eventId(): number{ return this._eventId; }
		 set eventId(peventId: number){ this._eventId = peventId ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get offenderChargeId(): number{ return this._offenderChargeId; }
		 set offenderChargeId(poffenderChargeId: number){ this._offenderChargeId = poffenderChargeId ;}
		 get offRes(): string{ return this._offRes; }
		 set offRes(poffRes: string){ this._offRes = poffRes ;}
		 get offenceType(): string{ return this._offenceType; }
		 set offenceType(poffenceType: string){ this._offenceType = poffenceType ;}
		 get resultCode1(): string{ return this._resultCode1; }
		 set resultCode1(presultCode1: string){ this._resultCode1 = presultCode1 ;}
		 get statuteCode(): string{ return this._statuteCode; }
		 set statuteCode(pstatuteCode: string){ this._statuteCode = pstatuteCode ;}
		 get dispositionCode(): string{ return this._dispositionCode; }
		 set dispositionCode(pdispositionCode: string){ this._dispositionCode = pdispositionCode ;}
		 get offenceDescription(): string{ return this._offenceDescription; }
		 set offenceDescription(poffenceDescription: string){ this._offenceDescription = poffenceDescription ;}
		 get chargeInfoNumber(): string{ return this._chargeInfoNumber; }
		 set chargeInfoNumber(pchargeInfoNumber: string){ this._chargeInfoNumber = pchargeInfoNumber ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get offenceCode(): string{ return this._offenceCode; }
		 set offenceCode(poffenceCode: string){ this._offenceCode = poffenceCode ;}
		 get convictionFlag(): string{ return this._convictionFlag; }
		 set convictionFlag(pconvictionFlag: string){ this._convictionFlag = pconvictionFlag ;}
		 get resultCode1Desc(): string{ return this._resultCode1Desc; }
		 set resultCode1Desc(presultCode1Desc: string){ this._resultCode1Desc = presultCode1Desc ;}
		 get caseId(): number{ return this._caseId; }
		 set caseId(pcaseId: number){ this._caseId = pcaseId ;}
		 get offenceDescriptionType(): string{ return this._offenceDescriptionType; }
		 set offenceDescriptionType(poffenceDescriptionType: string){ this._offenceDescriptionType = poffenceDescriptionType ;}
		 get applyFlag(): string{ return this._applyFlag; }
		 set applyFlag(papplyFlag: string){ this._applyFlag = papplyFlag ;}
		 get offenceDate(): Date{ return this._offenceDate; }
		 set offenceDate(poffenceDate: Date){ this._offenceDate = poffenceDate ;}
		 get resultCode1Indicator(): string{ return this._resultCode1Indicator; }
		 set resultCode1Indicator(presultCode1Indicator: string){ this._resultCode1Indicator = presultCode1Indicator ;}
		 get complicityTypeDesc(): string{ return this._complicityTypeDesc; }
		 set complicityTypeDesc(pcomplicityTypeDesc: string){ this._complicityTypeDesc = pcomplicityTypeDesc ;}
		 get appealId(): number{ return this._appealId; }
		 set appealId(pappealId: number){ this._appealId = pappealId ;}
		 get bailApplyFlag(): string{ return this._bailApplyFlag; }
		 set bailApplyFlag(pbailApplyFlag: string){ this._bailApplyFlag = pbailApplyFlag ;}

 	toJSON(): any {
 		return { 
			'eventId': this._eventId,
			'offenderBookId': this._offenderBookId,
			'offenderChargeId': this._offenderChargeId,
			'offRes': this._offRes,
			'offenceType': this._offenceType,
			'resultCode1': this._resultCode1,
			'statuteCode': this._statuteCode,
			'dispositionCode': this._dispositionCode,
			'offenceDescription': this._offenceDescription,
			'chargeInfoNumber': this._chargeInfoNumber,
			'serialVersionUID': this._serialVersionUID,
			'offenceCode': this._offenceCode,
			'convictionFlag': this._convictionFlag,
			'resultCode1Desc': this._resultCode1Desc,
			'caseId': this._caseId,
			'offenceDescriptionType': this._offenceDescriptionType,
			'applyFlag': this._applyFlag,
			'offenceDate': this._offenceDate,
			'resultCode1Indicator': this._resultCode1Indicator,
			'complicityTypeDesc': this._complicityTypeDesc,
			'appealId': this._appealId,
			'bailApplyFlag': this._bailApplyFlag
 			};
 		} 
}