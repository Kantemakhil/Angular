
export class VCorporateAddresses {
		 private _country: String;
		 private _endDate: Date;
		 private _cityCode: String;
		 private _streetDirectionDesc: String;
		 private _house: String;
		 private _commentText: String;
		 private _primaryFlag: String;
		 private _specialNeeds: String;
		 private _addressId: number;
		 private _corporateId: number;
		 private _provStateDesc: String;
		 private _servicesFlag: String;
		 private _cityName: String;
		 private _zipPostalCode: String;
		 private _street: String;
		 private _countryCode: String;
		 private _suiteNumber: String;
		 private _activeFlag: String;
		 private _mailFlag: String;
		 private _area: String;
		 private _streetInformation: String;
		 private _addressSeq: number;
		 private _streetNumber: String;
		 private _businessHour: String;
		 private _addressType: String;
		 private _streetDirection: String;
		 private _validatedFlag: String;
		 private _contactPersonName: String;
		 private _addressTypeDesc: String;
		 private _provStateCode: String;
		 private _startDate: Date;
         private _description: String;
         private _contactperson: string;
         private _isAddressValid: string;
        private _streetAddress: string;
	
	
	    get streetAddress(): string { return this._streetAddress; }

       set streetAddress( pstreetAddress: string ) { this._streetAddress = pstreetAddress; }

      get isAddressValid(): string { return this._isAddressValid; }

	  set isAddressValid( pisAddressValid: string ) { this._isAddressValid = pisAddressValid; }
	
         get contactperson(): string{ return this._contactperson; }
         set contactperson(pcontactperson: string){ this._contactperson = pcontactperson ;}
         get description(): String{ return this._description; }
         set description(pdescription: String){ this._description = pdescription ;}
		 get country(): String{ return this._country; }
		 set country(pcountry: String){ this._country = pcountry ;}
		 get endDate(): Date{ return this._endDate; }
		 set endDate(pendDate: Date){ this._endDate = pendDate ;}
		 get cityCode(): String{ return this._cityCode; }
		 set cityCode(pcityCode: String){ this._cityCode = pcityCode ;}
		 get streetDirectionDesc(): String{ return this._streetDirectionDesc; }
		 set streetDirectionDesc(pstreetDirectionDesc: String){ this._streetDirectionDesc = pstreetDirectionDesc ;}
		 get house(): String{ return this._house; }
		 set house(phouse: String){ this._house = phouse ;}
		 get commentText(): String{ return this._commentText; }
		 set commentText(pcommentText: String){ this._commentText = pcommentText ;}
		 get primaryFlag(): String{ return this._primaryFlag; }
		 set primaryFlag(pprimaryFlag: String){ this._primaryFlag = pprimaryFlag ;}
		 get specialNeeds(): String{ return this._specialNeeds; }
		 set specialNeeds(pspecialNeeds: String){ this._specialNeeds = pspecialNeeds ;}
		 get addressId(): number{ return this._addressId; }
		 set addressId(paddressId: number){ this._addressId = paddressId ;}
		 get corporateId(): number{ return this._corporateId; }
		 set corporateId(pcorporateId: number){ this._corporateId = pcorporateId ;}
		 get provStateDesc(): String{ return this._provStateDesc; }
		 set provStateDesc(pprovStateDesc: String){ this._provStateDesc = pprovStateDesc ;}
		 get servicesFlag(): String{ return this._servicesFlag; }
		 set servicesFlag(pservicesFlag: String){ this._servicesFlag = pservicesFlag ;}
		 get cityName(): String{ return this._cityName; }
		 set cityName(pcityName: String){ this._cityName = pcityName ;}
		 get zipPostalCode(): String{ return this._zipPostalCode; }
		 set zipPostalCode(pzipPostalCode: String){ this._zipPostalCode = pzipPostalCode ;}
		 get street(): String{ return this._street; }
		 set street(pstreet: String){ this._street = pstreet ;}
		 get countryCode(): String{ return this._countryCode; }
		 set countryCode(pcountryCode: String){ this._countryCode = pcountryCode ;}
		 get suiteNumber(): String{ return this._suiteNumber; }
		 set suiteNumber(psuiteNumber: String){ this._suiteNumber = psuiteNumber ;}
		 get activeFlag(): String{ return this._activeFlag; }
		 set activeFlag(pactiveFlag: String){ this._activeFlag = pactiveFlag ;}
		 get mailFlag(): String{ return this._mailFlag; }
		 set mailFlag(pmailFlag: String){ this._mailFlag = pmailFlag ;}
		 get area(): String{ return this._area; }
		 set area(parea: String){ this._area = parea ;}
		 get streetInformation(): String{ return this._streetInformation; }
		 set streetInformation(pstreetInformation: String){ this._streetInformation = pstreetInformation ;}
		 get addressSeq(): number{ return this._addressSeq; }
		 set addressSeq(paddressSeq: number){ this._addressSeq = paddressSeq ;}
		 get streetNumber(): String{ return this._streetNumber; }
		 set streetNumber(pstreetNumber: String){ this._streetNumber = pstreetNumber ;}
		 get businessHour(): String{ return this._businessHour; }
		 set businessHour(pbusinessHour: String){ this._businessHour = pbusinessHour ;}
		 get addressType(): String{ return this._addressType; }
		 set addressType(paddressType: String){ this._addressType = paddressType ;}
		 get streetDirection(): String{ return this._streetDirection; }
		 set streetDirection(pstreetDirection: String){ this._streetDirection = pstreetDirection ;}
		 get validatedFlag(): String{ return this._validatedFlag; }
		 set validatedFlag(pvalidatedFlag: String){ this._validatedFlag = pvalidatedFlag ;}
		 get contactPersonName(): String{ return this._contactPersonName; }
		 set contactPersonName(pcontactPersonName: String){ this._contactPersonName = pcontactPersonName ;}
		 get addressTypeDesc(): String{ return this._addressTypeDesc; }
		 set addressTypeDesc(paddressTypeDesc: String){ this._addressTypeDesc = paddressTypeDesc ;}
		 get provStateCode(): String{ return this._provStateCode; }
		 set provStateCode(pprovStateCode: String){ this._provStateCode = pprovStateCode ;}
		 get startDate(): Date{ return this._startDate; }
		 set startDate(pstartDate: Date){ this._startDate = pstartDate ;}

 	toJSON(): any {
 		return { 
			'country': this._country,
			'endDate': this._endDate,
			'cityCode': this._cityCode,
			'streetDirectionDesc': this._streetDirectionDesc,
			'house': this._house,
			'commentText': this._commentText,
			'primaryFlag': this._primaryFlag,
			'specialNeeds': this._specialNeeds,
			'addressId': this._addressId,
			'corporateId': this._corporateId,
			'provStateDesc': this._provStateDesc,
			'servicesFlag': this._servicesFlag,
			'cityName': this._cityName,
			'zipPostalCode': this._zipPostalCode,
			'street': this._street,
			'countryCode': this._countryCode,
			'suiteNumber': this._suiteNumber,
			'activeFlag': this._activeFlag,
			'mailFlag': this._mailFlag,
			'area': this._area,
			'streetInformation': this._streetInformation,
			'addressSeq': this._addressSeq,
			'streetNumber': this._streetNumber,
			'businessHour': this._businessHour,
			'addressType': this._addressType,
			'streetDirection': this._streetDirection,
			'validatedFlag': this._validatedFlag,
			'contactPersonName': this._contactPersonName,
			'addressTypeDesc': this._addressTypeDesc,
			'provStateCode': this._provStateCode,
			'startDate': this._startDate,
			'description': this._description,
			'contactperson': this._contactperson,
			'isAddressValid':this._isAddressValid,
            'streetAddress':this._streetAddress
 			};
 		}  
 }