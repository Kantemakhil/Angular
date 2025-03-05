export class OffenderObservationInquiry {
         private _lastName: string;
		 private _overDueFlag: string;
		 private _offenderBookId: number;
		 private _offenderIdDisplay: string;
		 private _checkDate: Date;
		 private _frequency: number;
		 private _nextCheckTime: Date;
		 private _firstName: string;
		 private _serialVersionUID: number;
		 private _checkTime: Date;
		 private _observationType: string;
		 private _livingUnitDescription: string;
		 private _agyLocId: string;
		 private _zoneId: string;
		 private _offenderId: number;
		 private _checkId: number;
		 private _obsPeriodId: number;
		 
		 get lastName(): string{ return this._lastName; }
		 set lastName(plastName: string){ this._lastName = plastName ;}
		 get overDueFlag(): string{ return this._overDueFlag; }
		 set overDueFlag(poverDueFlag: string){ this._overDueFlag = poverDueFlag ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get offenderIdDisplay(): string{ return this._offenderIdDisplay; }
		 set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay ;}
		 get checkDate(): Date{ return this._checkDate; }
		 set checkDate(pcheckDate: Date){ this._checkDate = pcheckDate ;}
		 get frequency(): number{ return this._frequency; }
		 set frequency(pfrequency: number){ this._frequency = pfrequency ;}
		 get nextCheckTime(): Date{ return this._nextCheckTime; }
		 set nextCheckTime(pnextCheckTime: Date){ this._nextCheckTime = pnextCheckTime ;}
		 get firstName(): string{ return this._firstName; }
		 set firstName(pfirstName: string){ this._firstName = pfirstName ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get checkTime(): Date{ return this._checkTime; }
		 set checkTime(pcheckTime: Date){ this._checkTime = pcheckTime ;}
		 get observationType(): string{ return this._observationType; }
		 set observationType(pobservationType: string){ this._observationType = pobservationType ;}
		 get livingUnitDescription(): string{ return this._livingUnitDescription; }
		 set livingUnitDescription(plivingUnitDescription: string){ this._livingUnitDescription = plivingUnitDescription ;}
		 get agyLocId(): string{ return this._agyLocId; }
		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
		 get zoneId(): string{ return this._zoneId; }
		 set zoneId(pzoneId: string){ this._zoneId = pzoneId ;}
		 get offenderId(): number { return this._offenderId; }

         set offenderId( poffenderId: number ) { this._offenderId = poffenderId; }

		 get checkId(): number { return this._checkId ; }
         set checkId(pcheckId: number) { this._checkId  = pcheckId  ; }

		 get obsPeriodId(): number { return this._obsPeriodId; }
		 set obsPeriodId(pobsPeriodId: number) { this._obsPeriodId = pobsPeriodId ; }

 	toJSON(): any {
 		return { 
			'lastName': this._lastName,
			'overDueFlag': this._overDueFlag,
			'offenderBookId': this._offenderBookId,
			'offenderIdDisplay': this._offenderIdDisplay,
			'checkDate': this._checkDate,
			'frequency': this._frequency,
			'nextCheckTime': this._nextCheckTime,
			'firstName': this._firstName,
			'serialVersionUID': this._serialVersionUID,
			'checkTime': this._checkTime,
			'observationType': this._observationType,
			'livingUnitDescription': this._livingUnitDescription,
			'agyLocId': this._agyLocId,
			'zoneId': this._zoneId,
			'offenderId': this._offenderId,
			'checkId': this._checkId,
			'obsPeriodId': this._obsPeriodId,
 			};
 		} 
}