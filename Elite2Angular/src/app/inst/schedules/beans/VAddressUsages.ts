
export class VAddressUsages {
		 private _country: String;
		 private _createUserId: String;
		 private _ownerCode: String;
		 private _endDate: Date;
		 private _modifyDatetime: Date;
		 private _cityCode: String;
		 private _modifyUserId: String;
		 private _addressActiveFlag: String;
		 private _ownerId: number;
		 private _ownerSeq: number;
		 private _house: String;
		 private _commentText: String;
		 private _primaryFlag: String;
		 private _addressId: number;
		 private _capacity: number;
		 private _provStateDesc: String;
		 private _cityName: String;
		 private _zipPostalCode: String;
		 private _street: String;
		 private _countryCode: String;
		 private _suiteNumber: String;
		 private _activeFlag: String;
		 private _mailFlag: String;
		 private _area: String;
		 private _streetInformation: String;
		 private _streetNumber: String;
		 private _addressType: String;
		 private _ownerClass: String;
		 private _streetDirection: String;
		 private _createDatetime: Date;
		 private _usageActiveFlag: String;
		 private _validatedFlag: String;
		 private _fullAddress: String;
		 private _provStateCode: String;
		 private _addressUsage: String;
		 private _startDate: Date;
         private _description: String;
         private _contactperson: string;
         private _streetAddress: string;
         private _isAddressValid: string;

		 get isAddressValid(): string { return this._isAddressValid; }

		 set isAddressValid( pisAddressValid: string ) { this._isAddressValid = pisAddressValid; }

		 get streetAddress(): string { return this._streetAddress; }

       set streetAddress( pstreetAddress: string ) { this._streetAddress = pstreetAddress; }
         get contactperson(): string{ return this._contactperson; }
         set contactperson(pcontactperson: string){ this._contactperson = pcontactperson ;}
         get description(): String{ return this._description; }
         set description(pdescription: String){ this._description = pdescription ;}
		 get country(): String{ return this._country; }
		 set country(pcountry: String){ this._country = pcountry ;}
		 get createUserId(): String{ return this._createUserId; }
		 set createUserId(pcreateUserId: String){ this._createUserId = pcreateUserId ;}
		 get ownerCode(): String{ return this._ownerCode; }
		 set ownerCode(pownerCode: String){ this._ownerCode = pownerCode ;}
		 get endDate(): Date{ return this._endDate; }
		 set endDate(pendDate: Date){ this._endDate = pendDate ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get cityCode(): String{ return this._cityCode; }
		 set cityCode(pcityCode: String){ this._cityCode = pcityCode ;}
		 get modifyUserId(): String{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: String){ this._modifyUserId = pmodifyUserId ;}
		 get addressActiveFlag(): String{ return this._addressActiveFlag; }
		 set addressActiveFlag(paddressActiveFlag: String){ this._addressActiveFlag = paddressActiveFlag ;}
		 get ownerId(): number{ return this._ownerId; }
		 set ownerId(pownerId: number){ this._ownerId = pownerId ;}
		 get ownerSeq(): number{ return this._ownerSeq; }
		 set ownerSeq(pownerSeq: number){ this._ownerSeq = pownerSeq ;}
		 get house(): String{ return this._house; }
		 set house(phouse: String){ this._house = phouse ;}
		 get commentText(): String{ return this._commentText; }
		 set commentText(pcommentText: String){ this._commentText = pcommentText ;}
		 get primaryFlag(): String{ return this._primaryFlag; }
		 set primaryFlag(pprimaryFlag: String){ this._primaryFlag = pprimaryFlag ;}
		 get addressId(): number{ return this._addressId; }
		 set addressId(paddressId: number){ this._addressId = paddressId ;}
		 get capacity(): number{ return this._capacity; }
		 set capacity(pcapacity: number){ this._capacity = pcapacity ;}
		 get provStateDesc(): String{ return this._provStateDesc; }
		 set provStateDesc(pprovStateDesc: String){ this._provStateDesc = pprovStateDesc ;}
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
		 get streetNumber(): String{ return this._streetNumber; }
		 set streetNumber(pstreetNumber: String){ this._streetNumber = pstreetNumber ;}
		 get addressType(): String{ return this._addressType; }
		 set addressType(paddressType: String){ this._addressType = paddressType ;}
		 get ownerClass(): String{ return this._ownerClass; }
		 set ownerClass(pownerClass: String){ this._ownerClass = pownerClass ;}
		 get streetDirection(): String{ return this._streetDirection; }
		 set streetDirection(pstreetDirection: String){ this._streetDirection = pstreetDirection ;}
		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get usageActiveFlag(): String{ return this._usageActiveFlag; }
		 set usageActiveFlag(pusageActiveFlag: String){ this._usageActiveFlag = pusageActiveFlag ;}
		 get validatedFlag(): String{ return this._validatedFlag; }
		 set validatedFlag(pvalidatedFlag: String){ this._validatedFlag = pvalidatedFlag ;}
		 get fullAddress(): String{ return this._fullAddress; }
		 set fullAddress(pfullAddress: String){ this._fullAddress = pfullAddress ;}
		 get provStateCode(): String{ return this._provStateCode; }
		 set provStateCode(pprovStateCode: String){ this._provStateCode = pprovStateCode ;}
		 get addressUsage(): String{ return this._addressUsage; }
		 set addressUsage(paddressUsage: String){ this._addressUsage = paddressUsage ;}
		 get startDate(): Date{ return this._startDate; }
		 set startDate(pstartDate: Date){ this._startDate = pstartDate ;}

 	toJSON(): any {
 		return { 
			'country': this._country,
			'createUserId': this._createUserId,
			'ownerCode': this._ownerCode,
			'endDate': this._endDate,
			'modifyDatetime': this._modifyDatetime,
			'cityCode': this._cityCode,
			'modifyUserId': this._modifyUserId,
			'addressActiveFlag': this._addressActiveFlag,
			'ownerId': this._ownerId,
			'ownerSeq': this._ownerSeq,
			'house': this._house,
			'commentText': this._commentText,
			'primaryFlag': this._primaryFlag,
			'addressId': this._addressId,
			'capacity': this._capacity,
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
			'ownerClass': this._ownerClass,
			'streetDirection': this._streetDirection,
			'createDatetime': this._createDatetime,
			'usageActiveFlag': this._usageActiveFlag,
			'validatedFlag': this._validatedFlag,
			'fullAddress': this._fullAddress,
			'provStateCode': this._provStateCode,
			'addressUsage': this._addressUsage,
			'startDate': this._startDate,
			'description': this._description,
			'contactperson': this._contactperson,
			'streetAddress':this._streetAddress,
			'isAddressValid':this._isAddressValid
			
 			};
 		}  
 }