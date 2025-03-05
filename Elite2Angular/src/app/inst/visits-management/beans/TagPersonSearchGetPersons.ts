import { Addresses } from "@inst/demographics-biometrics/beans/Addresses";

	export class TagPersonSearchGetPersons {
		 private _pBirthYear: number;
		 private _pSearchType: string;
		 private _firstName: string;
		 private _sex: string;
		 private _pPersonId: number;
		 private _errorMessage: string;
		 private _pLastName: string;
		 private _middleName: string;
		 private _pIdentifierValue: string;
		 private _serialVersionUID: number;
		 private _pSex: string;
		 private _pIdentifierType: string;
		 private _inserted: number;
		 private _pMiddleName: string;
		 private _personId: number;
		 private _pBirthRange: number;
		 private _pBirthDate: Date;
		 private _lastName: string;
		 private _pFirstName: string;
		 private _birthDate: Date;
		 private _address: Addresses = new Addresses();
		 private _secondMiddleName: string;
		 private _sexDescription: string;
		 private _pin: string;
		 private _intCorrelationId: number;
		 private _moduleName: string;
		 private _pnin: string;



		

		 get pBirthYear(): number { return  this._pBirthYear; }

		 set pBirthYear(pPBirthYear: number) { this._pBirthYear = pPBirthYear; }

		 get pSearchType(): string { return  this._pSearchType; }

		 set pSearchType(pPSearchType: string) { this._pSearchType = pPSearchType; }

		 get firstName(): string { return  this._firstName; }

		 set firstName(pFirstName: string) { this._firstName = pFirstName; }

		 get sex(): string { return  this._sex; }

		 set sex(pSex: string) { this._sex = pSex; }

		 get pPersonId(): number { return  this._pPersonId; }

		 set pPersonId(pPPersonId: number) { this._pPersonId = pPPersonId; }

		 get errorMessage(): string { return  this._errorMessage; }

		 set errorMessage(perrorMessage: string) { this._errorMessage = perrorMessage; }

		 get pLastName(): string { return  this._pLastName; }

		 set pLastName(pPLastName: string) { this._pLastName = pPLastName; }

		 get middleName(): string { return  this._middleName; }

		 set middleName(pMiddleName: string) { this._middleName = pMiddleName; }

		 get pIdentifierValue(): string { return  this._pIdentifierValue; }

		 set pIdentifierValue(pPIdentifierValue: string) { this._pIdentifierValue = pPIdentifierValue; }

		 get serialVersionUID(): number { return  this._serialVersionUID; }

		 set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

		 get pSex(): string { return  this._pSex; }

		 set pSex(pPSex: string) { this._pSex = pPSex; }

		 get pIdentifierType(): string { return  this._pIdentifierType; }

		 set pIdentifierType(pPIdentifierType: string) { this._pIdentifierType = pPIdentifierType; }

		 get inserted(): number { return  this._inserted; }

		 set inserted(pinserted: number) { this._inserted = pinserted; }

		 get pMiddleName(): string { return  this._pMiddleName; }

		 set pMiddleName(pPMiddleName: string) { this._pMiddleName = pPMiddleName; }

		 get personId(): number { return  this._personId; }

		 set personId(pPersonId: number) { this._personId = pPersonId; }

		 get pBirthRange(): number { return  this._pBirthRange; }

		 set pBirthRange(pPBirthRange: number) { this._pBirthRange = pPBirthRange; }

		 get pBirthDate(): Date { return  this._pBirthDate; }

		 set pBirthDate(pPBirthDate: Date) { this._pBirthDate = pPBirthDate; }

		 get lastName(): string { return  this._lastName; }

		 set lastName(pLastName: string) { this._lastName = pLastName; }

		 get pFirstName(): string { return  this._pFirstName; }

		 set pFirstName(pPFirstName: string) { this._pFirstName = pPFirstName; }

		 get birthDate(): Date { return  this._birthDate; }

		 set birthDate(pBirthDate: Date) { this._birthDate = pBirthDate; }

		 get address(): Addresses { return this._address; }
		 
		 set address(value: Addresses) { this._address = value; }

		 get secondMiddleName(): string { return  this._secondMiddleName; }

		 set secondMiddleName(psecondMiddleName: string) { this._secondMiddleName = psecondMiddleName; }

		get sexDescription(): string { return this._sexDescription; }
		
		set sexDescription(value: string) {	this._sexDescription = value; }

		get pin(): string {return this._pin;}

		set pin(value: string) {this._pin = value;}

		get intCorrelationId(): number {return this._intCorrelationId;}

		set intCorrelationId(value: number) {this._intCorrelationId = value;}

		get moduleName(): string {return this._moduleName;}

		set moduleName(value: string) {this._moduleName = value;}

		get pnin(): string {return this._pnin;}

		set pnin(value: string) {this._pnin = value;}

 	toJSON(): any {
 		return { 
			'pBirthYear': this._pBirthYear,
			'pSearchType': this._pSearchType,
			'firstName': this._firstName,
			'sex': this._sex,
			'pPersonId': this._pPersonId,
			'errorMessage': this._errorMessage,
			'pLastName': this._pLastName,
			'middleName': this._middleName,
			'pIdentifierValue': this._pIdentifierValue,
			'serialVersionUID': this._serialVersionUID,
			'pSex': this._pSex,
			'pIdentifierType': this._pIdentifierType,
			'inserted': this._inserted,
			'pMiddleName': this._pMiddleName,
			'personId': this._personId,
			'pBirthRange': this._pBirthRange,
			'pBirthDate': this._pBirthDate,
			'lastName': this._lastName,
			'pFirstName': this._pFirstName,
			'birthDate': this._birthDate,
			'secondMiddleName': this._secondMiddleName,
			'sexDescription': this._sexDescription,
			'pin':this._pin,
			'intCorrelationId' : this._intCorrelationId,
			'moduleName': this._moduleName,
			'pnin':this._pnin
 			};
 		}  
 }