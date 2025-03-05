export class VOffObservationPeriodsRes {
    private _obsPeriodId: number;
		 private _lastName: string;
		 private _offenderBookId: number;
		 private _offenderIdDisplay: string;
		 private _livUnitDesc: string;
		 private _rootOffenderId: number;
		 private _birthDate: Date;
		 private _observationTypeDesc: string;
		 private _frequency: number;
		 private _firstName: string;
		 private _livingUnitId: number;
		 private _serialVersionUID: number;
		 private _observationType: string;
		 private _livingUnitDescription: string;
		 private _scheduleDate: Date;
		 private _agyLocId: string;
		 private _offenderId: number;
		 private _checkId: number;
		 private _activeFlag: string;

		 get obsPeriodId(): number{ return this._obsPeriodId; }
		 set obsPeriodId(pobsPeriodId: number){ this._obsPeriodId = pobsPeriodId ;}
		 get lastName(): string{ return this._lastName; }
		 set lastName(plastName: string){ this._lastName = plastName ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get offenderIdDisplay(): string{ return this._offenderIdDisplay; }
		 set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay ;}
		 get livUnitDesc(): string{ return this._livUnitDesc; }
		 set livUnitDesc(plivUnitDesc: string){ this._livUnitDesc = plivUnitDesc ;}
		 get rootOffenderId(): number{ return this._rootOffenderId; }
		 set rootOffenderId(prootOffenderId: number){ this._rootOffenderId = prootOffenderId ;}
		 get birthDate(): Date{ return this._birthDate; }
		 set birthDate(pbirthDate: Date){ this._birthDate = pbirthDate ;}
		 get observationTypeDesc(): string{ return this._observationTypeDesc; }
		 set observationTypeDesc(pobservationTypeDesc: string){ this._observationTypeDesc = pobservationTypeDesc ;}
		 get frequency(): number{ return this._frequency; }
		 set frequency(pfrequency: number){ this._frequency = pfrequency ;}
		 get firstName(): string{ return this._firstName; }
		 set firstName(pfirstName: string){ this._firstName = pfirstName ;}
		 get livingUnitId(): number{ return this._livingUnitId; }
		 set livingUnitId(plivingUnitId: number){ this._livingUnitId = plivingUnitId ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get observationType(): string{ return this._observationType; }
		 set observationType(pobservationType: string){ this._observationType = pobservationType ;}
		 get livingUnitDescription(): string{ return this._livingUnitDescription; }
		 set livingUnitDescription(plivingUnitDescription: string){ this._livingUnitDescription = plivingUnitDescription ;}
		 get scheduleDate(): Date{ return this._scheduleDate; }
		 set scheduleDate(pscheduleDate: Date){ this._scheduleDate = pscheduleDate ;}
		 get agyLocId(): string{ return this._agyLocId; }
		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
		 get offenderId(): number{ return this._offenderId; }
		 set offenderId(poffenderId: number){ this._offenderId = poffenderId ;}
		 get checkId(): number{ return this._checkId; }
		 set checkId(pcheckId: number){ this._checkId = pcheckId ;}
		 get activeFlag(): string{ return this._activeFlag; }
		 set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}

 	toJSON(): any {
 		return { 
			'obsPeriodId': this._obsPeriodId,
			'lastName': this._lastName,
			'offenderBookId': this._offenderBookId,
			'offenderIdDisplay': this._offenderIdDisplay,
			'livUnitDesc': this._livUnitDesc,
			'rootOffenderId': this._rootOffenderId,
			'birthDate': this._birthDate,
			'observationTypeDesc': this._observationTypeDesc,
			'frequency': this._frequency,
			'firstName': this._firstName,
			'livingUnitId': this._livingUnitId,
			'serialVersionUID': this._serialVersionUID,
			'observationType': this._observationType,
			'livingUnitDescription': this._livingUnitDescription,
			'scheduleDate': this._scheduleDate,
			'agyLocId': this._agyLocId,
			'offenderId': this._offenderId,
			'checkId': this._checkId,
			'activeFlag': this._activeFlag,
 			};
 		} 
}