	export class TagPersonSearchGetPartialSoundexPersons {
		 private _Hits: number;
		 private _PBirthYear: number;
		 private _PSearchType: string;
		 private _PPersonId: number;
		 private _errorMessage: string;
		 private _PLastName: string;
		 private _PIdentifierValue: string;
		 private _serialVersionUID: number;
		 private _PSex: string;
		 private _PIdentifierType: string;
		 private _inserted: number;
		 private _PMiddleName: string;
		 private _PBirthRange: number;
		 private _PBirthDate: Date;
		 private _LastName: string;
		 private _PFirstName: string;
		 private _secondMiddleName: string;

		 get Hits(): number{ return  this._Hits }

		 set Hits(pHits: number){ this._Hits = pHits }

		 get PBirthYear(): number{ return  this._PBirthYear }

		 set PBirthYear(pPBirthYear: number){ this._PBirthYear = pPBirthYear }

		 get PSearchType(): string{ return  this._PSearchType }

		 set PSearchType(pPSearchType: string){ this._PSearchType = pPSearchType }

		 get PPersonId(): number{ return  this._PPersonId }

		 set PPersonId(pPPersonId: number){ this._PPersonId = pPPersonId }

		 get errorMessage(): string{ return  this._errorMessage }

		 set errorMessage(perrorMessage: string){ this._errorMessage = perrorMessage }

		 get PLastName(): string{ return  this._PLastName }

		 set PLastName(pPLastName: string){ this._PLastName = pPLastName }

		 get PIdentifierValue(): string{ return  this._PIdentifierValue }

		 set PIdentifierValue(pPIdentifierValue: string){ this._PIdentifierValue = pPIdentifierValue }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get PSex(): string{ return  this._PSex }

		 set PSex(pPSex: string){ this._PSex = pPSex }

		 get PIdentifierType(): string{ return  this._PIdentifierType }

		 set PIdentifierType(pPIdentifierType: string){ this._PIdentifierType = pPIdentifierType }

		 get inserted(): number{ return  this._inserted }

		 set inserted(pinserted: number){ this._inserted = pinserted }

		 get PMiddleName(): string{ return  this._PMiddleName }

		 set PMiddleName(pPMiddleName: string){ this._PMiddleName = pPMiddleName }

		 get PBirthRange(): number{ return  this._PBirthRange }

		 set PBirthRange(pPBirthRange: number){ this._PBirthRange = pPBirthRange }

		 get PBirthDate(): Date{ return  this._PBirthDate }

		 set PBirthDate(pPBirthDate: Date){ this._PBirthDate = pPBirthDate }

		 get LastName(): string{ return  this._LastName }

		 set LastName(pLastName: string){ this._LastName = pLastName }

		 get PFirstName(): string{ return  this._PFirstName }

		 set PFirstName(pPFirstName: string){ this._PFirstName = pPFirstName }

		 get secondMiddleName(): string{ return this._secondMiddleName; }
		 set secondMiddleName(psecondMiddleName: string){ this._secondMiddleName = psecondMiddleName ;}


 	toJSON(): any {
 		return { 
			'Hits': this._Hits,
			'PBirthYear': this._PBirthYear,
			'PSearchType': this._PSearchType,
			'PPersonId': this._PPersonId,
			'errorMessage': this._errorMessage,
			'PLastName': this._PLastName,
			'PIdentifierValue': this._PIdentifierValue,
			'serialVersionUID': this._serialVersionUID,
			'PSex': this._PSex,
			'PIdentifierType': this._PIdentifierType,
			'inserted': this._inserted,
			'PMiddleName': this._PMiddleName,
			'PBirthRange': this._PBirthRange,
			'PBirthDate': this._PBirthDate,
			'LastName': this._LastName,
			'PFirstName': this._PFirstName,
			'secondMiddleName': this._secondMiddleName,
 			};
 		}  
 }