import { BaseModel } from '@commonbeans/BaseModel';
export class OffBalanceCalcCustodyDtl extends BaseModel {
		 private _daysAfterEffDate: number;
		 private _addittionalDays: number;
		 private _serialVersionUID: number;
		 private _admissionDate: Date;
		 private _releaseDate: Date;
		 private _offenderBalCalcId: number;
		 private _addittionalDaysReason: string;

		 get daysAfterEffDate(): number{ return this._daysAfterEffDate; }
		 set daysAfterEffDate(pdaysAfterEffDate: number){ this._daysAfterEffDate = pdaysAfterEffDate ;}
		 get addittionalDays(): number{ return this._addittionalDays; }
		 set addittionalDays(paddittionalDays: number){ this._addittionalDays = paddittionalDays ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get admissionDate(): Date{ return this._admissionDate; }
		 set admissionDate(padmissionDate: Date){ this._admissionDate = padmissionDate ;}
		 get releaseDate(): Date{ return this._releaseDate; }
		 set releaseDate(preleaseDate: Date){ this._releaseDate = preleaseDate ;}
		 get offenderBalCalcId(): number{ return this._offenderBalCalcId; }
		 set offenderBalCalcId(poffenderBalCalcId: number){ this._offenderBalCalcId = poffenderBalCalcId ;}
		 get addittionalDaysReason(): string{ return this._addittionalDaysReason; }
		 set addittionalDaysReason(paddittionalDaysReason: string){ this._addittionalDaysReason = paddittionalDaysReason ;}

 	toJSON(): any {
 		return { 
			'daysAfterEffDate': this._daysAfterEffDate,
			'addittionalDays': this._addittionalDays,
			'serialVersionUID': this._serialVersionUID,
			'admissionDate': this._admissionDate,
			'releaseDate': this._releaseDate,
			'offenderBalCalcId': this._offenderBalCalcId,
			'addittionalDaysReason': this._addittionalDaysReason,
 			};
 		}  
 }