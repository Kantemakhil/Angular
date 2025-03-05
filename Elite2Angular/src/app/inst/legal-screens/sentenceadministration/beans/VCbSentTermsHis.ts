
	export class VCbSentTermsHis {
		 private _sentenceCategory: string;
		 private _serialVersionUID: number;
		 private _sentenceCalcType: string;
		 private _offenderBookId: number;
		 private _endDate: Date;
		 private _termSeq: number;
		 private _sentencePeriod: string;
		 private _sentenceTermCode: string;
		 private _offenderBalCalcId: number;
		 private _sentenceSeq: number;
		 private _startDate: Date;

		 get sentenceCategory(): string{ return this._sentenceCategory; }
		 set sentenceCategory(psentenceCategory: string){ this._sentenceCategory = psentenceCategory ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get sentenceCalcType(): string{ return this._sentenceCalcType; }
		 set sentenceCalcType(psentenceCalcType: string){ this._sentenceCalcType = psentenceCalcType ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get endDate(): Date{ return this._endDate; }
		 set endDate(pendDate: Date){ this._endDate = pendDate ;}
		 get termSeq(): number{ return this._termSeq; }
		 set termSeq(ptermSeq: number){ this._termSeq = ptermSeq ;}
		 get sentencePeriod(): string{ return this._sentencePeriod; }
		 set sentencePeriod(psentencePeriod: string){ this._sentencePeriod = psentencePeriod ;}
		 get sentenceTermCode(): string{ return this._sentenceTermCode; }
		 set sentenceTermCode(psentenceTermCode: string){ this._sentenceTermCode = psentenceTermCode ;}
		 get offenderBalCalcId(): number{ return this._offenderBalCalcId; }
		 set offenderBalCalcId(poffenderBalCalcId: number){ this._offenderBalCalcId = poffenderBalCalcId ;}
		 get sentenceSeq(): number{ return this._sentenceSeq; }
		 set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq ;}
		 get startDate(): Date{ return this._startDate; }
		 set startDate(pstartDate: Date){ this._startDate = pstartDate ;}

 	toJSON(): any {
 		return { 
			'sentenceCategory': this._sentenceCategory,
			'serialVersionUID': this._serialVersionUID,
			'sentenceCalcType': this._sentenceCalcType,
			'offenderBookId': this._offenderBookId,
			'endDate': this._endDate,
			'termSeq': this._termSeq,
			'sentencePeriod': this._sentencePeriod,
			'sentenceTermCode': this._sentenceTermCode,
			'offenderBalCalcId': this._offenderBalCalcId,
			'sentenceSeq': this._sentenceSeq,
			'startDate': this._startDate,
 			};
 		}  
 }