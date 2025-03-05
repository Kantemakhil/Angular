	export class OiiclassClassInquiry {
		 private _bookingNo: string;
		 private _assessmentType: string;
		 private _pAgyLocId: string;
		 private _offenderBookID: number;
		 private _offenderIdDisplay: string;
		 private _resultSet: number;
		 private _currentLevel: string;
		 private _serialVersionUID: number;
		 private _pAssessmentId: number;
		 private _pToDate: Date;
		 private _pSearchType: string;
		 private _scheduleDate: Date;
		 private _offenderName: string;
		 private _location: string;
		 private _pFromDate: Date;
		 private _pCaseload: string;
		 private _assessmentId: string;
		 private _pLocation: string;
		 private _caseloadType: string;
		

		 get bookingNo(): string{ return  this._bookingNo }

		 set bookingNo(pbookingNo: string){ this._bookingNo = pbookingNo }

		 get assessmentType(): string{ return  this._assessmentType }

		 set assessmentType(passessmentType: string){ this._assessmentType = passessmentType }

		 get pAgyLocId(): string{ return  this._pAgyLocId }

		 set pAgyLocId(ppAgyLocId: string){ this._pAgyLocId = ppAgyLocId }

		 get offenderBookID(): number{ return  this._offenderBookID }

		 set offenderBookID(poffenderBookID: number){ this._offenderBookID = poffenderBookID }

		 get offenderIdDisplay(): string{ return  this._offenderIdDisplay }

		 set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay }

		 get resultSet(): number{ return  this._resultSet }

		 set resultSet(presultSet: number){ this._resultSet = presultSet }

		 get currentLevel(): string{ return  this._currentLevel }

		 set currentLevel(pcurrentLevel: string){ this._currentLevel = pcurrentLevel }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get pAssessmentId(): number{ return  this._pAssessmentId }

		 set pAssessmentId(ppAssessmentId: number){ this._pAssessmentId = ppAssessmentId }

		 get pToDate(): Date{ return  this._pToDate }

		 set pToDate(ppToDate: Date){ this._pToDate = ppToDate }

		 get pSearchType(): string{ return  this._pSearchType }

		 set pSearchType(ppSearchType: string){ this._pSearchType = ppSearchType }

		 get scheduleDate(): Date{ return  this._scheduleDate }

		 set scheduleDate(pscheduleDate: Date){ this._scheduleDate = pscheduleDate }

		 get offenderName(): string{ return  this._offenderName }

		 set offenderName(poffenderName: string){ this._offenderName = poffenderName }

		 get location(): string{ return  this._location }

		 set location(plocation: string){ this._location = plocation }

		 get pFromDate(): Date{ return  this._pFromDate }

		 set pFromDate(ppFromDate: Date){ this._pFromDate = ppFromDate }

		 get pCaseload(): string{ return  this._pCaseload }

		 set pCaseload(ppCaseload: string){ this._pCaseload = ppCaseload }

		 get assessmentId(): string{ return  this._assessmentId }

		 set assessmentId(passessmentId: string){ this._assessmentId = passessmentId }

		 get pLocation(): string{ return  this._pLocation }

		 set pLocation(ppLocation: string){ this._pLocation = ppLocation }

		 public get caseloadType(): string {return this._caseloadType;		}
		public set caseloadType(value: string) { this._caseloadType = value;		}


 	toJSON(): any {
 		return { 
			'bookingNo': this._bookingNo,
			'assessmentType': this._assessmentType,
			'pAgyLocId': this._pAgyLocId,
			'offenderBookID': this._offenderBookID,
			'offenderIdDisplay': this._offenderIdDisplay,
			'resultSet': this._resultSet,
			'currentLevel': this._currentLevel,
			'serialVersionUID': this._serialVersionUID,
			'pAssessmentId': this._pAssessmentId,
			'pToDate': this._pToDate,
			'pSearchType': this._pSearchType,
			'scheduleDate': this._scheduleDate,
			'offenderName': this._offenderName,
			'location': this._location,
			'pFromDate': this._pFromDate,
			'pCaseload': this._pCaseload,
			'assessmentId': this._assessmentId,
			'pLocation': this._pLocation,
			'caseloadType':this._caseloadType
 			};
 		}  
 }