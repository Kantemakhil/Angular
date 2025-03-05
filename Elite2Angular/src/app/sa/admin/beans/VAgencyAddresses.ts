import { BaseModel } from '@commonbeans/BaseModel';

export class VAgencyAddresses extends BaseModel {

    private _addressId: number;
private _addressType: string;
private _addressTypeDesc: string;
private _agyLocId: string;
private _startDate: Date;
private _endDate: Date;
private _activeFlag: string;
private _house: string;
private _street: string;
private _area: string;
private _country: string;
private _streetNumber: string;
private _suiteNumber: string;
private _streetDirection: string;
private _streetDirectionDesc: string;
private _streetInformation: string;
private _cityCode: string;
private _cityName: string;
private _provStateCode: string;
private _provStateDesc: string;
private _zipPostalCode: string;
private _countryCode: string;
private _commentText: string;
private _mailFlag: string;
private _validatedFlag: string;
private _primaryFlag: string;
private _mailCareOf: string;
private _isAddressValid: string;
 private _streetAddress: string;
	
	
	get streetAddress(): string { return this._streetAddress; }

set streetAddress( pstreetAddress: string ) { this._streetAddress = pstreetAddress; }

    get isAddressValid(): string { return this._isAddressValid; }

    set isAddressValid( pisAddressValid: string ) { this._isAddressValid = pisAddressValid; }


get addressId(): number { return this._addressId; }

set addressId( paddressId: number ) { this._addressId = paddressId; }

get addressType(): string { return this._addressType; }

set addressType( paddressType: string ) { this._addressType = paddressType; }

get addressTypeDesc(): string { return this._addressTypeDesc; }

set addressTypeDesc( paddressTypeDesc: string ) { this._addressTypeDesc = paddressTypeDesc; }

get agyLocId(): string { return this._agyLocId; }

set agyLocId( pagyLocId: string ) { this._agyLocId = pagyLocId; }

get startDate(): Date { return this._startDate; }

set startDate( pstartDate: Date ) { this._startDate = pstartDate; }

get endDate(): Date { return this._endDate; }

set endDate( pendDate: Date ) { this._endDate = pendDate; }

get activeFlag(): string { return this._activeFlag; }

set activeFlag( pactiveFlag: string ) { this._activeFlag = pactiveFlag; }

get house(): string { return this._house; }

set house( phouse: string ) { this._house = phouse; }

get street(): string { return this._street; }

set street( pstreet: string ) { this._street = pstreet; }

get area(): string { return this._area; }

set area( parea: string ) { this._area = parea; }

get country(): string { return this._country; }

set country( pcountry: string ) { this._country = pcountry; }

get streetDirection(): string { return this._streetDirection; }

set streetDirection( pstreetDirection: string ) { this._streetDirection = pstreetDirection; }

get streetNumber(): string { return this._streetNumber; }

set streetNumber( pstreetNumber: string ) { this._streetNumber = pstreetNumber; }

get suiteNumber(): string { return this._suiteNumber; }

set suiteNumber( psuiteNumber: string ) { this._suiteNumber = psuiteNumber; }

get streetDirectionDesc(): string { return this._streetDirectionDesc; }

set streetDirectionDesc( pstreetDirectionDesc: string ) { this._streetDirectionDesc = pstreetDirectionDesc; }

get streetInformation(): string { return this._streetInformation; }

set streetInformation( pstreetInformation: string ) { this._streetInformation = pstreetInformation; }

get cityCode(): string { return this._cityCode; }

set cityCode( pcityCode: string ) { this._cityCode = pcityCode; }

get cityName(): string { return this._cityName; }

set cityName( pcityName: string ) { this._cityName = pcityName; }

get provStateCode(): string { return this._provStateCode; }

set provStateCode( pprovStateCode: string ) { this._provStateCode = pprovStateCode; }

get provStateDesc(): string { return this._provStateDesc; }

set provStateDesc( pprovStateDesc: string ) { this._provStateDesc = pprovStateDesc; }

get zipPostalCode(): string { return this._zipPostalCode; }

set zipPostalCode( pzipPostalCode: string ) { this._zipPostalCode = pzipPostalCode; }

get countryCode(): string { return this._countryCode; }

set countryCode( pcountryCode: string ) { this._countryCode = pcountryCode; }

get commentText(): string { return this._commentText; }

set commentText( pcommentText: string ) { this._commentText = pcommentText; }

get mailCareOf(): string { return this._mailCareOf; }

set mailCareOf( pmailCareOf: string ) { this._mailCareOf = pmailCareOf; }

get mailFlag(): string { return this._mailFlag; }

set mailFlag( pmailFlag: string ) { this._mailFlag = pmailFlag; }

get validatedFlag(): string { return this._validatedFlag; }

set validatedFlag( pvalidatedFlag: string ) { this._validatedFlag = pvalidatedFlag; }

get primaryFlag(): string { return this._primaryFlag; }

set primaryFlag( pprimaryFlag: string ) { this._primaryFlag = pprimaryFlag; }


toJSON(): any {
    return {
        'addressId': this._addressId,
        'addressType': this._addressType,
        'addressTypeDesc': this._addressTypeDesc,
        'agyLocId': this._agyLocId,
        'description': this._startDate,
        'agencyLocationType': this._endDate,
        'activeFlag ': this._activeFlag,
        'abbreviation': this._house,
        'deactivationDate': this._street,
        'contactName': this._area,
        'printQueue': this._country,
        'jurisdictionCode': this._streetNumber,
        'bailOfficeFlag': this._suiteNumber,
        'housingLev1Code': this._streetDirection,
        'housingLev2Code': this._streetDirectionDesc,
        'housingLev3Code': this._streetInformation,
        'housingLev4Code': this._cityCode,
        'propertyLev1Code': this._cityName,
        'propertyLev2Code': this._provStateCode,
        'propertyLev3Code': this._provStateDesc,
        'lastBookingNo': this._zipPostalCode,
        'commissaryPrivilege': this._countryCode,
        'businessHours': this._commentText,
        'mailFlag': this._mailFlag,
        'validatedFlag': this._validatedFlag,
        'primaryFlag': this._primaryFlag,
        'mailCareOf': this._mailCareOf,
        'isAddressValid':this._isAddressValid,
     'streetAddress':this._streetAddress
    };
}
}

