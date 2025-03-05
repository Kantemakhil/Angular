	export class VOffenderVisitDetails {
		 private _lastName: string;
		 private _offenderBookId: number;
		 private _offenderIdDisplay: string;
		 private _livingUnitDesc: string;
		 private _internalLocationDesc: string;
		 private _visitType: string;
		 private _firstName: string;
		 private _serialVersionUID: number;
		 private _visitStatus: string;
		 private _startTime: Date;
		 private _visitDate: Date;
		 private _endTime: Date;
		 private _offenderVisitId: number;
		 private _caseloadId: string;
		 private _dayOfTheWeek: string;
		 private _fromDate: Date;
		 private _toDate: Date;
		 private _facility: string;
		 private _timeSlotSeq: string;
		 private _visitLocation: string;
		 private _completionStatus: string;
		 private _facilityList: [];
		 private _selectFlag: boolean;
		 private _outcomeReasonCode: string;
		 private _commentText: string;
		 private _visitInternalLocationId: number;

		 get lastName(): string{ return  this._lastName }

		 set lastName(plastName: string){ this._lastName = plastName }

		 get offenderBookId(): number{ return  this._offenderBookId }

		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId }

		 get offenderIdDisplay(): string{ return  this._offenderIdDisplay }

		 set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay }

		 get livingUnitDesc(): string{ return  this._livingUnitDesc }

		 set livingUnitDesc(plivingUnitDesc: string){ this._livingUnitDesc = plivingUnitDesc }

		 get internalLocationDesc(): string{ return  this._internalLocationDesc }

		 set internalLocationDesc(pinternalLocationDesc: string){ this._internalLocationDesc = pinternalLocationDesc }

		 get visitType(): string{ return  this._visitType }

		 set visitType(pvisitType: string){ this._visitType = pvisitType }

		 get firstName(): string{ return  this._firstName }

		 set firstName(pfirstName: string){ this._firstName = pfirstName }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get visitStatus(): string{ return  this._visitStatus }

		 set visitStatus(pvisitStatus: string){ this._visitStatus = pvisitStatus }

		 get startTime(): Date{ return  this._startTime }

		 set startTime(pstartTime: Date){ this._startTime = pstartTime }

		 get visitDate(): Date{ return  this._visitDate }

		 set visitDate(pvisitDate: Date){ this._visitDate = pvisitDate }

		 get endTime(): Date{ return  this._endTime }

		 set endTime(pendTime: Date){ this._endTime = pendTime }

		 get offenderVisitId(): number{ return  this._offenderVisitId }

		 set offenderVisitId(poffenderVisitId: number){ this._offenderVisitId = poffenderVisitId }

		 get caseloadId(): string{ return  this._caseloadId }

		 set caseloadId(pcaseloadId: string){ this._caseloadId = pcaseloadId }

		 get dayOfTheWeek(): string{ return  this._dayOfTheWeek }

		 set dayOfTheWeek(pdayOfTheWeek: string){ this._dayOfTheWeek = pdayOfTheWeek }

		 get fromDate(): Date{ return  this._fromDate }

		 set fromDate(pfromDate: Date){ this._fromDate = pfromDate }

		 get toDate(): Date{ return  this._toDate }

		 set toDate(ptoDate: Date){ this._toDate = ptoDate }

		 get facility(): string{ return  this._facility }

		 set facility(pfacility: string){ this._facility = pfacility }

		 get timeSlotSeq(): string{ return  this._timeSlotSeq }

		 set timeSlotSeq(ptimeSlotSeq: string){ this._timeSlotSeq = ptimeSlotSeq }

		 get visitLocation(): string{ return  this._visitLocation }

		 set visitLocation(pvisitLocation: string){ this._visitLocation = pvisitLocation }

		 get completionStatus(): string{ return  this._completionStatus }

		 set completionStatus(pcompletionStatus: string){ this._completionStatus = pcompletionStatus }
		 
		 get facilityList(): [] { return this._facilityList; }
		 set facilityList(value: []) { this._facilityList = value; }

		 get selectFlag(): boolean { return this._selectFlag; }
		 set selectFlag(pselectFlag: boolean) { this._selectFlag = pselectFlag; }
		 
		 get commentText(): string{ return  this._commentText }

    	set commentText(pcommentText: string){ this._commentText = pcommentText }

    	get outcomeReasonCode(): string{ return  this._outcomeReasonCode }

    	set outcomeReasonCode(poutcomeReasonCode: string){ this._outcomeReasonCode = poutcomeReasonCode }
		 
		set visitInternalLocationId(pvisitInternalLocationId: number){ this._visitInternalLocationId = pvisitInternalLocationId }

		get visitInternalLocationId(): number{ return  this._visitInternalLocationId }

 	toJSON(): any {
 		return { 
			'lastName': this._lastName,
			'offenderBookId': this._offenderBookId,
			'offenderIdDisplay': this._offenderIdDisplay,
			'livingUnitDesc': this._livingUnitDesc,
			'internalLocationDesc': this._internalLocationDesc,
			'visitType': this._visitType,
			'firstName': this._firstName,
			'serialVersionUID': this._serialVersionUID,
			'visitStatus': this._visitStatus,
			'startTime': this._startTime,
			'visitDate': this._visitDate,
			'endTime': this._endTime,
			'offenderVisitId': this._offenderVisitId,
			'caseloadId': this._caseloadId,
			'dayOfTheWeek': this._dayOfTheWeek,
			'fromDate': this._fromDate,
			'toDate': this._toDate,
			'facility': this._facility,
			'timeSlotSeq': this._timeSlotSeq,
			'visitLocation': this._visitLocation,
			'completionStatus': this._completionStatus,
			'facilityList': this._facilityList,
			'selectFlag': this._selectFlag,
			'commentText': this._commentText,
       		'outcomeReasonCode': this._outcomeReasonCode,
			'visitInternalLocationId': this._visitInternalLocationId
 			};
 		}  
 }