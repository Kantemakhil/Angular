
	export class OffenderProceedings {
		 private _proceedingStatus: string;
		 private _createUserId: string;
		 private _offenderBookId: number;
		 private _modifyDatetime: Date;
		 private _modifyUserId: string;
		 private _proceedingAgyLocId: String;
		 private _commentText: string;
		 private _offenderProceedingId: number;
		 private _proceedingType: string;
		 private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _outcomeDate: Date;
		 private _sealFlag: string;
		 private _startDate: Date;
		 private _caseStartDate: Date;
		 private _commitFlag:string;
		 private _teamResponsible:string;
		 private _staffResponsible:number;
		 private _orderType;
		 private _sentenceSeq;
		 private _staffUpdateFlag;
		 private _crtActionRecommendation:string;
		 private _proceedingPursuantAct:string;

		 private _teamId: number;
		 private _staffId: string;

		 get proceedingStatus(): string{ return this._proceedingStatus; }
		 set proceedingStatus(pproceedingStatus: string){ this._proceedingStatus = pproceedingStatus ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get proceedingAgyLocId(): String{ return this._proceedingAgyLocId; }
		 set proceedingAgyLocId(pproceedingAgyLocId: String){ this._proceedingAgyLocId = pproceedingAgyLocId ;}
		 get commentText(): string{ return this._commentText; }
		 set commentText(pcommentText: string){ this._commentText = pcommentText ;}
		 get offenderProceedingId(): number{ return this._offenderProceedingId; }
		 set offenderProceedingId(poffenderProceedingId: number){ this._offenderProceedingId = poffenderProceedingId ;}
		 get proceedingType(): string{ return this._proceedingType; }
		 set proceedingType(pproceedingType: string){ this._proceedingType = pproceedingType ;}
		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get outcomeDate(): Date{ return this._outcomeDate; }
		 set outcomeDate(poutcomeDate: Date){ this._outcomeDate = poutcomeDate ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get startDate(): Date{ return this._startDate; }
		 set startDate(pstartDate: Date){ this._startDate = pstartDate ;}
		 get commitFlag(): string { return this._commitFlag; }
    set commitFlag( commitFlag: string ) { this._commitFlag = commitFlag; }
		 public get caseStartDate(): Date {
			return this._caseStartDate;
		}
		public set caseStartDate(value: Date) {
			this._caseStartDate = value;
		}

		get teamResponsible(): string{ return this._teamResponsible; }
		set teamResponsible(pteamResponsible: string){ this._teamResponsible = pteamResponsible ;}
		get staffResponsible(): number{ return this._staffResponsible; }
		set staffResponsible(pstaffResponsible: number){ this._staffResponsible = pstaffResponsible ;}
		get orderType(): string{ return this._orderType; }
		set orderType(porderType: string){ this._orderType = porderType ;}
		get sentenceSeq(): number{ return this._sentenceSeq; }
		set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq ;}
		get staffUpdateFlag(): string{ return this._staffUpdateFlag; }
		set staffUpdateFlag(pstaffUpdateFlag: string){ this._staffUpdateFlag = pstaffUpdateFlag ;}


		get crtActionRecommendation(): string{ return this._crtActionRecommendation; }
		set crtActionRecommendation(pcrtActionRecommendation: string){ this._crtActionRecommendation = pcrtActionRecommendation ;}


		get proceedingPursuantAct(): string{ return this._proceedingPursuantAct; }
		set proceedingPursuantAct(pproceedingPursuantAct: string){ this._proceedingPursuantAct = pproceedingPursuantAct ;}

		get teamId(): number{ return this._teamId; }
		set teamId(pteamId: number){ this._teamId = pteamId ;}

		get staffId(): string{ return this._staffId; }
		set staffId(pstaffId: string){ this._staffId = pstaffId ;}

		
 	toJSON(): any {
 		return { 
			'proceedingStatus': this._proceedingStatus,
			'createUserId': this._createUserId,
			'offenderBookId': this._offenderBookId,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'proceedingAgyLocId': this._proceedingAgyLocId,
			'commentText': this._commentText,
			'offenderProceedingId': this._offenderProceedingId,
			'proceedingType': this._proceedingType,
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'outcomeDate': this._outcomeDate,
			'sealFlag': this._sealFlag,
			'startDate': this._startDate,
			'caseStartDate':this._caseStartDate,
			'commitFlag' : this._commitFlag,
			'teamResponsible' : this._teamResponsible,
			'staffResponsible' : this._staffResponsible,
			'orderType' : this._orderType,
			'sentenceSeq':this._sentenceSeq,
			'staffUpdateFlag': this._staffUpdateFlag,
			'crtActionRecommendation': this._crtActionRecommendation,
			'proceedingPursuantAct': this._proceedingPursuantAct,
			'teamId':this._teamId,
			'staffId': this._staffId
 			};
 		}  
 }