export class OffenderSenetenceTerms {

    private _createUserId: string;
		 private _hours: number;
		 private _months: number;
		 private _weeks: number;
		 private _offenderBookId: number;
		 private _endDate: Date;
		 private _modifyDatetime: Date;
		 private _modifyUserId: string;
		 private _lifeSentenceFlag: string;
		 private _sentenceSeq: number;
		 private _years: number;
		 private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _termSeq: number;
		 private _sentenceTermCode: string;
		 private _days: number;
		 private _sealFlag: string;
		 private _startDate: Date;

		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get hours(): number{ return this._hours; }
		 set hours(phours: number){ this._hours = phours ;}
		 get months(): number{ return this._months; }
		 set months(pmonths: number){ this._months = pmonths ;}
		 get weeks(): number{ return this._weeks; }
		 set weeks(pweeks: number){ this._weeks = pweeks ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get endDate(): Date{ return this._endDate; }
		 set endDate(pendDate: Date){ this._endDate = pendDate ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get lifeSentenceFlag(): string{ return this._lifeSentenceFlag; }
		 set lifeSentenceFlag(plifeSentenceFlag: string){ this._lifeSentenceFlag = plifeSentenceFlag ;}
		 get sentenceSeq(): number{ return this._sentenceSeq; }
		 set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq ;}
		 get years(): number{ return this._years; }
		 set years(pyears: number){ this._years = pyears ;}
		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get termSeq(): number{ return this._termSeq; }
		 set termSeq(ptermSeq: number){ this._termSeq = ptermSeq ;}
		 get sentenceTermCode(): string{ return this._sentenceTermCode; }
		 set sentenceTermCode(psentenceTermCode: string){ this._sentenceTermCode = psentenceTermCode ;}
		 get days(): number{ return this._days; }
		 set days(pdays: number){ this._days = pdays ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get startDate(): Date{ return this._startDate; }
		 set startDate(pstartDate: Date){ this._startDate = pstartDate ;}

 	toJSON(): any {
 		return { 
			'createUserId': this._createUserId,
			'hours': this._hours,
			'months': this._months,
			'weeks': this._weeks,
			'offenderBookId': this._offenderBookId,
			'endDate': this._endDate,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'lifeSentenceFlag': this._lifeSentenceFlag,
			'sentenceSeq': this._sentenceSeq,
			'years': this._years,
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'termSeq': this._termSeq,
			'sentenceTermCode': this._sentenceTermCode,
			'days': this._days,
			'sealFlag': this._sealFlag,
			'startDate': this._startDate,
 			};
 		} 

}