
export class VAgencyAddresses {
		 private _country: string;
		 private _endDate: Date;
		 private _cityCode: string;
		 private _streetDirectionDesc: string;
		 private _house: string;
		 private _commentText: string;
		 private _primaryFlag: string;
		 private _addressId: number;
		 private _mailCareOf: string;
		 private _provStateDesc: string;
		 private _cityName: string;
		 private _zipPostalCode: string;
		 private _street: string;
		 private _countryCode: string;
		 private _suiteNumber: string;
		 private _activeFlag: string;
		 private _mailFlag: string;
		 private _area: string;
		 private _streetInformation: string;
		 private _streetNumber: string;
		 private _addressType: string;
		 private _streetDirection: string;
		 private _validatedFlag: string;
		 private _addressTypeDesc: string;
		 private _agyLocId: string;
		 private _provStateCode: string;
		 private _startDate: Date;
         private _agyLocIdDesc: string;
         private _contactperson: string;
         private _streetAddress: string;
         private _isAddressValid: string;

		 get isAddressValid(): string { return this._isAddressValid; }

		 set isAddressValid( pisAddressValid: string ) { this._isAddressValid = pisAddressValid; }

		 get streetAddress(): string { return this._streetAddress; }

       set streetAddress( pstreetAddress: string ) { this._streetAddress = pstreetAddress; }
         get contactperson(): string{ return this._contactperson; }
         set contactperson(pcontactperson: string){ this._contactperson = pcontactperson ;}
		 get country(): string{ return this._country; }
		 set country(pcountry: string){ this._country = pcountry ;}
		 get endDate(): Date{ return this._endDate; }
		 set endDate(pendDate: Date){ this._endDate = pendDate ;}
		 get cityCode(): string{ return this._cityCode; }
		 set cityCode(pcityCode: string){ this._cityCode = pcityCode ;}
		 get streetDirectionDesc(): string{ return this._streetDirectionDesc; }
		 set streetDirectionDesc(pstreetDirectionDesc: string){ this._streetDirectionDesc = pstreetDirectionDesc ;}
		 get house(): string{ return this._house; }
		 set house(phouse: string){ this._house = phouse ;}
		 get commentText(): string{ return this._commentText; }
		 set commentText(pcommentText: string){ this._commentText = pcommentText ;}
		 get primaryFlag(): string{ return this._primaryFlag; }
		 set primaryFlag(pprimaryFlag: string){ this._primaryFlag = pprimaryFlag ;}
		 get addressId(): number{ return this._addressId; }
		 set addressId(paddressId: number){ this._addressId = paddressId ;}
		 get mailCareOf(): string{ return this._mailCareOf; }
		 set mailCareOf(pmailCareOf: string){ this._mailCareOf = pmailCareOf ;}
		 get provStateDesc(): string{ return this._provStateDesc; }
		 set provStateDesc(pprovStateDesc: string){ this._provStateDesc = pprovStateDesc ;}
		 get cityName(): string{ return this._cityName; }
		 set cityName(pcityName: string){ this._cityName = pcityName ;}
		 get zipPostalCode(): string{ return this._zipPostalCode; }
		 set zipPostalCode(pzipPostalCode: string){ this._zipPostalCode = pzipPostalCode ;}
		 get street(): string{ return this._street; }
		 set street(pstreet: string){ this._street = pstreet ;}
		 get countryCode(): string{ return this._countryCode; }
		 set countryCode(pcountryCode: string){ this._countryCode = pcountryCode ;}
		 get suiteNumber(): string{ return this._suiteNumber; }
		 set suiteNumber(psuiteNumber: string){ this._suiteNumber = psuiteNumber ;}
		 get activeFlag(): string{ return this._activeFlag; }
		 set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
		 get mailFlag(): string{ return this._mailFlag; }
		 set mailFlag(pmailFlag: string){ this._mailFlag = pmailFlag ;}
		 get area(): string{ return this._area; }
		 set area(parea: string){ this._area = parea ;}
		 get streetInformation(): string{ return this._streetInformation; }
		 set streetInformation(pstreetInformation: string){ this._streetInformation = pstreetInformation ;}
		 get streetNumber(): string{ return this._streetNumber; }
		 set streetNumber(pstreetNumber: string){ this._streetNumber = pstreetNumber ;}
		 get addressType(): string{ return this._addressType; }
		 set addressType(paddressType: string){ this._addressType = paddressType ;}
		 get streetDirection(): string{ return this._streetDirection; }
		 set streetDirection(pstreetDirection: string){ this._streetDirection = pstreetDirection ;}
		 get validatedFlag(): string{ return this._validatedFlag; }
		 set validatedFlag(pvalidatedFlag: string){ this._validatedFlag = pvalidatedFlag ;}
		 get addressTypeDesc(): string{ return this._addressTypeDesc; }
		 set addressTypeDesc(paddressTypeDesc: string){ this._addressTypeDesc = paddressTypeDesc ;}
		 get agyLocId(): string{ return this._agyLocId; }
		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
		 get provStateCode(): string{ return this._provStateCode; }
		 set provStateCode(pprovStateCode: string){ this._provStateCode = pprovStateCode ;}
		 get startDate(): Date{ return this._startDate; }
		 set startDate(pstartDate: Date){ this._startDate = pstartDate ;}
		 get agyLocIdDesc(): string{ return this._agyLocIdDesc; }
         set agyLocIdDesc(pagyLocIdDesc: string){ this._agyLocIdDesc = pagyLocIdDesc ;}

 	toJSON(): any {
 		return { 
			'country': this._country,
			'endDate': this._endDate,
			'cityCode': this._cityCode,
			'streetDirectionDesc': this._streetDirectionDesc,
			'house': this._house,
			'commentText': this._commentText,
			'primaryFlag': this._primaryFlag,
			'addressId': this._addressId,
			'mailCareOf': this._mailCareOf,
			'provStateDesc': this._provStateDesc,
			'cityName': this._cityName,
			'zipPostalCode': this._zipPostalCode,
			'street': this._street,
			'countryCode': this._countryCode,
			'suiteNumber': this._suiteNumber,
			'activeFlag': this._activeFlag,
			'mailFlag': this._mailFlag,
			'area': this._area,
			'streetInformation': this._streetInformation,
			'streetNumber': this._streetNumber,
			'addressType': this._addressType,
			'streetDirection': this._streetDirection,
			'validatedFlag': this._validatedFlag,
			'addressTypeDesc': this._addressTypeDesc,
			'agyLocId': this._agyLocId,
			'provStateCode': this._provStateCode,
			'startDate': this._startDate,
			'agyLocIdDesc': this._agyLocIdDesc,
			'contactperson': this._contactperson,
			'streetAddress':this._streetAddress,
            'isAddressValid':this._isAddressValid
 			};
 		}  
 }