
	export class VOffenderProceedingSents {
		 private _sentenceCategory: string;
		 private _caseInfoPrefix: string;
		 private _proceedingStatus: string;
		 private _proceedingSentenceFlag: boolean;
		 private _proceedingSentenceFlagTemp: boolean;	 
		 private _sentenceCalcType: string;
		 private _offenderBookId: number;
		 private _endDate: Date;
		 private _sentenceDesc: string;
		 private _proceedingAgyLocId: string;
		 private _commentText: string;
		 private _caseCourtDesc: string;
		 private _offenderProceedingId: number;
		 private _sentenceSeq: number;
		 private _proceedingType: string;
		 private _serialVersionUID: number;
		 private _caseInfoNumber: string;
		 private _outcomeDate: Date;
		 private _caseId: number;
		 private _sentenceCategoryDesc: string;
		 private _noOfUnexcusedAbsence: number;
		 private _startDate: Date;
		 private _eventId: number;


		 private _resultCode: string;
		 private _resltDescription: string;
		 private _dispositionCode: string;
		 

		 get eventId(): number{ return this._eventId; }
		 set eventId(peventId: number){ this._eventId = peventId ;}
		 get sentenceCategory(): string{ return this._sentenceCategory; }
		 set sentenceCategory(psentenceCategory: string){ this._sentenceCategory = psentenceCategory ;}
		 get caseInfoPrefix(): string{ return this._caseInfoPrefix; }
		 set caseInfoPrefix(pcaseInfoPrefix: string){ this._caseInfoPrefix = pcaseInfoPrefix ;}
		 get proceedingStatus(): string{ return this._proceedingStatus; }
		 set proceedingStatus(pproceedingStatus: string){ this._proceedingStatus = pproceedingStatus ;}
		 get proceedingSentenceFlag(): boolean{ return this._proceedingSentenceFlag; }
		 set proceedingSentenceFlag(pproceedingSentenceFlag: boolean){ this._proceedingSentenceFlag = pproceedingSentenceFlag ;}
		 get sentenceCalcType(): string{ return this._sentenceCalcType; }
		 set sentenceCalcType(psentenceCalcType: string){ this._sentenceCalcType = psentenceCalcType ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get endDate(): Date{ return this._endDate; }
		 set endDate(pendDate: Date){ this._endDate = pendDate ;}
		 get sentenceDesc(): string{ return this._sentenceDesc; }
		 set sentenceDesc(psentenceDesc: string){ this._sentenceDesc = psentenceDesc ;}
		 get proceedingAgyLocId(): string{ return this._proceedingAgyLocId; }
		 set proceedingAgyLocId(pproceedingAgyLocId: string){ this._proceedingAgyLocId = pproceedingAgyLocId ;}
		 get commentText(): string{ return this._commentText; }
		 set commentText(pcommentText: string){ this._commentText = pcommentText ;}
		 get caseCourtDesc(): string{ return this._caseCourtDesc; }
		 set caseCourtDesc(pcaseCourtDesc: string){ this._caseCourtDesc = pcaseCourtDesc ;}
		 get offenderProceedingId(): number{ return this._offenderProceedingId; }
		 set offenderProceedingId(poffenderProceedingId: number){ this._offenderProceedingId = poffenderProceedingId ;}
		 get sentenceSeq(): number{ return this._sentenceSeq; }
		 set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq ;}
		 get proceedingType(): string{ return this._proceedingType; }
		 set proceedingType(pproceedingType: string){ this._proceedingType = pproceedingType ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get caseInfoNumber(): string{ return this._caseInfoNumber; }
		 set caseInfoNumber(pcaseInfoNumber: string){ this._caseInfoNumber = pcaseInfoNumber ;}
		 get outcomeDate(): Date{ return this._outcomeDate; }
		 set outcomeDate(poutcomeDate: Date){ this._outcomeDate = poutcomeDate ;}
		 get caseId(): number{ return this._caseId; }
		 set caseId(pcaseId: number){ this._caseId = pcaseId ;}
		 get sentenceCategoryDesc(): string{ return this._sentenceCategoryDesc; }
		 set sentenceCategoryDesc(psentenceCategoryDesc: string){ this._sentenceCategoryDesc = psentenceCategoryDesc ;}
		 get noOfUnexcusedAbsence(): number{ return this._noOfUnexcusedAbsence; }
		 set noOfUnexcusedAbsence(pnoOfUnexcusedAbsence: number){ this._noOfUnexcusedAbsence = pnoOfUnexcusedAbsence ;}
		 get startDate(): Date{ return this._startDate; }
		 set startDate(pstartDate: Date){ this._startDate = pstartDate ;}

		 get proceedingSentenceFlagTemp(): boolean{ return this._proceedingSentenceFlagTemp; }
		 set proceedingSentenceFlagTemp(pproceedingSentenceFlagTemp: boolean){ this._proceedingSentenceFlagTemp = pproceedingSentenceFlagTemp ;}
		

		 get resultCode(): string{ return this._resultCode; }
		 set resultCode(presultCode: string){ this._resultCode = presultCode ;}
		 get resltDescription(): string{ return this._resltDescription; }
		 set resltDescription(presltDescription: string){ this._resltDescription = presltDescription ;}
		 get dispositionCode(): string{ return this._dispositionCode; }
		 set dispositionCode(pdispositionCode: string){ this._dispositionCode = pdispositionCode ;}

 	toJSON(): any {
 		return { 
			'sentenceCategory': this._sentenceCategory,
			'caseInfoPrefix': this._caseInfoPrefix,
			'proceedingStatus': this._proceedingStatus,
			'proceedingSentenceFlag': this._proceedingSentenceFlag,
			'sentenceCalcType': this._sentenceCalcType,
			'offenderBookId': this._offenderBookId,
			'endDate': this._endDate,
			'sentenceDesc': this._sentenceDesc,
			'proceedingAgyLocId': this._proceedingAgyLocId,
			'commentText': this._commentText,
			'caseCourtDesc': this._caseCourtDesc,
			'offenderProceedingId': this._offenderProceedingId,
			'sentenceSeq': this._sentenceSeq,
			'proceedingType': this._proceedingType,
			'serialVersionUID': this._serialVersionUID,
			'caseInfoNumber': this._caseInfoNumber,
			'outcomeDate': this._outcomeDate,
			'caseId': this._caseId,
			'sentenceCategoryDesc': this._sentenceCategoryDesc,
			'noOfUnexcusedAbsence': this._noOfUnexcusedAbsence,
			'startDate': this._startDate,
			'proceedingSentenceFlagTemp': this._proceedingSentenceFlagTemp,
			'eventId': this._eventId,
			'dispositionCode': this._dispositionCode,
			'resltDescription': this._resltDescription,
			'resultCode': this._resultCode
 			};
 		}  
 }