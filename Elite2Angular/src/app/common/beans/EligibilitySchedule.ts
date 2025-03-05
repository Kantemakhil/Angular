import { BaseModel } from "@common/beans/BaseModel";

export class EligibilitySchedule extends BaseModel {

	private _offenderId: number;
	private _lastName: string;
	private _firstName: string;
	private _housingLocation: string;
	private _dateType: string;
	private _eligibilityDate: Date;
	private _schedule: string;
	private _hearingType:string;
	private _agencyLocation:string




	  get offenderId(): number {
		return this._offenderId;
	}
	  set offenderId(value: number) {
		this._offenderId = value;
	}

	  get eligibilityDate(): Date {
		return this._eligibilityDate;
	}
	  set eligibilityDate(value: Date) {
		this._eligibilityDate = value;
	}

	  get lastName(): string {
		return this._lastName;
	}
	  set lastName(value: string) {
		this._lastName = value;
	}

	  set firstName(value: string) {
		this._firstName = value;
	}
	  get firstName(): string {
		return this._firstName;
	}

	
	  set housingLocation(value: string) {
		this._housingLocation= value;
	}
	  get housingLocation(): string {
		return this._housingLocation;
	}

	  set dateType(value: string) {
		this._dateType = value;
	}
	  get dateType(): string {
		return this._dateType;
	}

	  set schedule(value: string) {
		this._schedule = value;
	}
	  get schedule(): string {
		return this._schedule;
	}

	set hearingType(value: string) {
		this._hearingType = value;
	}
	  get hearingType(): string {
		return this._hearingType;
	}
	set agencyLocation(value: string) {
		this._agencyLocation = value;
	}
	  get agencyLocation(): string {
		return this._agencyLocation;
	}

	

	toJSON(): any {
		return {
			'offenderId': this._offenderId,
			'lastName': this._lastName,
			'firstName': this._firstName,
			'eligibilityDate': this._eligibilityDate,
			'dateType': this._dateType,
			'housingLocation': this._housingLocation,
			'schedule': this._schedule,
			'hearingType': this._hearingType,
			'agencyLocation':this._agencyLocation
		

		}

	}


}