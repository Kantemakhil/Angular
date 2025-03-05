	export class OffenderCaseConditions {
		 private _casePlanId: number;
		 private _offCaseCondId: number;
		 private _createUserId: string;
		 private _endDate: Date;
		 private _modifyDatetime: Date;
		 private _offenderBookId: number;
		 private _length: number;
		 private _modifyUserId: string;
		 private _commConditionCode: string;
		 private _objective: string;
		 private _categoryType: string;
		 private _commConditionType: string;
		 private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _conditionStatus: string;
		 private _lengthUnit: string;
		 private _offenderSentConditionId: number;
		 private _sealFlag: string;
		 private _startDate: Date;
	private _description: string;
	private _latestDatetime: Date;
		private _casePlanStatusDesc: string;
		private _staffName: string;
		private _teamName: string;
		

		 get casePlanId(): number{ return  this._casePlanId }

		 set casePlanId(pcasePlanId: number){ this._casePlanId = pcasePlanId }

		 get offCaseCondId(): number{ return  this._offCaseCondId }

		 set offCaseCondId(poffCaseCondId: number){ this._offCaseCondId = poffCaseCondId }

		 get createUserId(): string{ return  this._createUserId }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId }

		 get endDate(): Date{ return  this._endDate }

		 set endDate(pendDate: Date){ this._endDate = pendDate }

		 get modifyDatetime(): Date{ return  this._modifyDatetime }

		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime }

		 get offenderBookId(): number{ return  this._offenderBookId }

		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId }

		 get length(): number{ return  this._length }

		 set length(plength: number){ this._length = plength }

		 get modifyUserId(): string{ return  this._modifyUserId }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId }

		 get commConditionCode(): string{ return  this._commConditionCode }

		 set commConditionCode(pcommConditionCode: string){ this._commConditionCode = pcommConditionCode }

		 get objective(): string{ return  this._objective }

		 set objective(pobjective: string){ this._objective = pobjective }

		 get categoryType(): string{ return  this._categoryType }

		 set categoryType(pcategoryType: string){ this._categoryType = pcategoryType }

		 get commConditionType(): string{ return  this._commConditionType }

		 set commConditionType(pcommConditionType: string){ this._commConditionType = pcommConditionType }

		 get createDatetime(): Date{ return  this._createDatetime }

		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get conditionStatus(): string{ return  this._conditionStatus }

		 set conditionStatus(pconditionStatus: string){ this._conditionStatus = pconditionStatus }

		 get lengthUnit(): string{ return  this._lengthUnit }

		 set lengthUnit(plengthUnit: string){ this._lengthUnit = plengthUnit }

		 get offenderSentConditionId(): number{ return  this._offenderSentConditionId }

		 set offenderSentConditionId(poffenderSentConditionId: number){ this._offenderSentConditionId = poffenderSentConditionId }

		 get sealFlag(): string{ return  this._sealFlag }

		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag }

		 get startDate(): Date{ return  this._startDate }

		 set startDate(pstartDate: Date){ this._startDate = pstartDate }
		 
		 get description(): string { return this._description; }

		    set description(pdescription: string){ this._description = pdescription; }

		    get latestDatetime(): Date{ return  this._latestDatetime }

	         set latestDatetime(platestDatetime: Date){ this._latestDatetime = platestDatetime }

		get casePlanStatusDesc(): string { return this._casePlanStatusDesc }

		set casePlanStatusDesc(value: string) { this._casePlanStatusDesc = value }

		get staffName(): string {return this._staffName;}
		set staffName(value: string) {this._staffName = value;}

		get teamName(): string {return this._teamName;}
		set teamName(value: string) {this._teamName = value;}

 	toJSON(): any {
 		return { 
			'casePlanId': this._casePlanId,
			'offCaseCondId': this._offCaseCondId,
			'createUserId': this._createUserId,
			'endDate': this._endDate,
			'modifyDatetime': this._modifyDatetime,
			'offenderBookId': this._offenderBookId,
			'length': this._length,
			'modifyUserId': this._modifyUserId,
			'commConditionCode': this._commConditionCode,
			'objective': this._objective,
			'categoryType': this._categoryType,
			'commConditionType': this._commConditionType,
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'conditionStatus': this._conditionStatus,
			'lengthUnit': this._lengthUnit,
			'offenderSentConditionId': this._offenderSentConditionId,
			'sealFlag': this._sealFlag,
			'startDate': this._startDate,
			'description': this._description,
			'latestDatetime': this._latestDatetime,
				'casePlanStatusDesc': this._casePlanStatusDesc,
			'staffName':this._staffName,
			'teamName' :this._teamName
 			};
 		}  
 }