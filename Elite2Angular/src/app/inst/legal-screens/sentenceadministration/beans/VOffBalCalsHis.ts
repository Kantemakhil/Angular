import { BaseModel } from '@commonbeans/BaseModel';
	
	export class VOffBalCalsHis extends BaseModel {
		 private _hearingType: string;
		 private _cbDays: number;
		 private _offenderBookId: number;
		 private _pbScheduleId: number;
		 private _hearingDate: Date;
		 private _offenderBalCalcId: number;
		 private _hearingReasonCode: string;
		 private _cbYears: number;
		 private _verificationFlag: string;
		 private _serialVersionUID: number;
		 private _cbWeeks: number;
		 private _effectiveDate: Date;
		 private _cbMonths: number;
		 private _workFlowId: number;
		 private _workActionCode: string;

		 get hearingType(): string{ return this._hearingType; }
		 set hearingType(phearingType: string){ this._hearingType = phearingType ;}
		 get cbDays(): number{ return this._cbDays; }
		 set cbDays(pcbDays: number){ this._cbDays = pcbDays ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get pbScheduleId(): number{ return this._pbScheduleId; }
		 set pbScheduleId(ppbScheduleId: number){ this._pbScheduleId = ppbScheduleId ;}
		 get hearingDate(): Date{ return this._hearingDate; }
		 set hearingDate(phearingDate: Date){ this._hearingDate = phearingDate ;}
		 get offenderBalCalcId(): number{ return this._offenderBalCalcId; }
		 set offenderBalCalcId(poffenderBalCalcId: number){ this._offenderBalCalcId = poffenderBalCalcId ;}
		 get hearingReasonCode(): string{ return this._hearingReasonCode; }
		 set hearingReasonCode(phearingReasonCode: string){ this._hearingReasonCode = phearingReasonCode ;}
		 get cbYears(): number{ return this._cbYears; }
		 set cbYears(pcbYears: number){ this._cbYears = pcbYears ;}
		 get verificationFlag(): string{ return this._verificationFlag; }
		 set verificationFlag(pverificationFlag: string){ this._verificationFlag = pverificationFlag ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get cbWeeks(): number{ return this._cbWeeks; }
		 set cbWeeks(pcbWeeks: number){ this._cbWeeks = pcbWeeks ;}
		 get effectiveDate(): Date{ return this._effectiveDate; }
		 set effectiveDate(peffectiveDate: Date){ this._effectiveDate = peffectiveDate ;}
		 get cbMonths(): number{ return this._cbMonths; }
		 set cbMonths(pcbMonths: number){ this._cbMonths = pcbMonths ;}
		 get workFlowId(): number{ return this._workFlowId; }
		 set workFlowId(pworkFlowId: number){ this._workFlowId = pworkFlowId ;}
		 get workActionCode(): string{ return this._workActionCode; }
		 set workActionCode(pworkActionCode: string){ this._workActionCode = pworkActionCode ;}

 	toJSON(): any {
 		return { 
			'hearingType': this._hearingType,
			'cbDays': this._cbDays,
			'offenderBookId': this._offenderBookId,
			'pbScheduleId': this._pbScheduleId,
			'hearingDate': this._hearingDate,
			'offenderBalCalcId': this._offenderBalCalcId,
			'hearingReasonCode': this._hearingReasonCode,
			'cbYears': this._cbYears,
			'verificationFlag': this._verificationFlag,
			'serialVersionUID': this._serialVersionUID,
			'cbWeeks': this._cbWeeks,
			'effectiveDate': this._effectiveDate,
			'cbMonths': this._cbMonths,
			'workFlowId': this._workFlowId,
			'workActionCode': this._workActionCode,
 			};
 		}  
 }