	export class OffenderCriminogenicNeeds {
		 private _casePlanId: number;
		 private _createUserId: string;
		 private _endDate: Date;
		 private _modifyDatetime: Date;
		 private _offenderBookId: number;
		 private _targetDate: Date;
		 private _modifyUserId: string;
		 private _objective: string;
		 private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _assessedNeedCode: string;
		 private _offCrimNeedId: number;
		 private _sealFlag: string;
		 private _statusCode: string;
		 private _latestDate: Date;
		 private _rowId: string;

		 get casePlanId(): number{ return  this._casePlanId }

		 set casePlanId(pcasePlanId: number){ this._casePlanId = pcasePlanId }

		 get createUserId(): string{ return  this._createUserId }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId }

		 get endDate(): Date{ return  this._endDate }

		 set endDate(pendDate: Date){ this._endDate = pendDate }

		 get modifyDatetime(): Date{ return  this._modifyDatetime }

		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime }

		 get offenderBookId(): number{ return  this._offenderBookId }

		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId }

		 get targetDate(): Date{ return  this._targetDate }

		 set targetDate(ptargetDate: Date){ this._targetDate = ptargetDate }

		 get modifyUserId(): string{ return  this._modifyUserId }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId }

		 get objective(): string{ return  this._objective }

		 set objective(pobjective: string){ this._objective = pobjective }

		 get createDatetime(): Date{ return  this._createDatetime }

		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get assessedNeedCode(): string{ return  this._assessedNeedCode }

		 set assessedNeedCode(passessedNeedCode: string){ this._assessedNeedCode = passessedNeedCode }

		 get offCrimNeedId(): number{ return  this._offCrimNeedId }

		 set offCrimNeedId(poffCrimNeedId: number){ this._offCrimNeedId = poffCrimNeedId }

		 get sealFlag(): string{ return  this._sealFlag }

		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag }

		 get statusCode(): string{ return  this._statusCode }

		 set statusCode(pstatusCode: string){ this._statusCode = pstatusCode }

		 get latestDate(): Date{ return  this._latestDate }
		 
		 set latestDate(platestDate: Date){ this._latestDate = platestDate }

		 get rowId(): string{ return  this._rowId }

		 set rowId(prowId: string){ this._rowId = prowId }


 	toJSON(): any {
 		return { 
			'casePlanId': this._casePlanId,
			'createUserId': this._createUserId,
			'endDate': this._endDate,
			'modifyDatetime': this._modifyDatetime,
			'offenderBookId': this._offenderBookId,
			'targetDate': this._targetDate,
			'modifyUserId': this._modifyUserId,
			'objective': this._objective,
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'assessedNeedCode': this._assessedNeedCode,
			'offCrimNeedId': this._offCrimNeedId,
			'sealFlag': this._sealFlag,
			'statusCode': this._statusCode,
			'latestDate': this._latestDate,
			'rowId': this._rowId,
 			};
 		}  
 }