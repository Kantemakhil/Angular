import { BaseModel } from '@commonbeans/BaseModel';

export class VStaffAddresses extends BaseModel {


    private _addressId: number;
    private _addressType: string;
    private _staffId: number;
    private _lastName: string;
    private _firstName: string;
    private _startDate: Date
    private _endDate: Date
    private _suiteNumber: string;
    private _streetDirection: string;
    private _streetNumber: string;
    private _cityCode: string;
    private _countryCode: string;
    private _provStateCode: string;
    private _commentText: string;
    private _validatedFlag: string;
    private _house: string;
    private _streetInformation: string;
    private _cityName: string;
    private _provStateDesc: string;
    private _area: string;
    private _zipPostalCode: string;
    private _country: string;
    private _primaryFlag: string;
    private _mailFlag: string;
    private _activeFlag: string;
    private _addQuery: string;
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

    get staffId(): number { return this._staffId; }
    set staffId( pstaffId: number ) { this._staffId = pstaffId; }

    get lastName(): string { return this._lastName; }

    set lastName( plastName: string ) { this._lastName = plastName; }

    get firstName(): string { return this._firstName; }

    set firstName( pfirstName: string ) { this._firstName = pfirstName; }

    get startDate(): Date { return this._startDate; }

    set startDate( pstartDate: Date ) { this._startDate = pstartDate; }

    get endDate(): Date { return this._endDate; }

    set endDate( pendDate: Date ) { this._endDate = pendDate; }

    get suiteNumber(): string { return this._suiteNumber; }

    set suiteNumber( psuiteNumber: string ) { this._suiteNumber = psuiteNumber; }

    get streetDirection(): string { return this._streetDirection; }

    set streetDirection( pstreetDirection: string ) { this._streetDirection = pstreetDirection; }

    get streetNumber(): string { return this._streetNumber; }

    set streetNumber( pstreetNumber: string ) { this._streetNumber = pstreetNumber; }

    get cityCode(): string { return this._cityCode; }

    set cityCode( pcityCode: string ) { this._cityCode = pcityCode; }

    get countryCode(): string { return this._countryCode; }

    set countryCode( pcountryCode: string ) { this._countryCode = pcountryCode; }

    get provStateCode(): string { return this._provStateCode; }

    set provStateCode( pprovStateCode: string ) { this._provStateCode = pprovStateCode; }

    get commentText(): string { return this._commentText; }

    set commentText( pcommentText: string ) { this._commentText = pcommentText; }

    get validatedFlag(): string { return this._validatedFlag; }

    set validatedFlag( pvalidatedFlag: string ) { this._validatedFlag = pvalidatedFlag; }

    get house(): string { return this._house; }

    set house( phouse: string ) { this._house = phouse; }

    get streetInformation(): string { return this._streetInformation; }

    set streetInformation( pstreetInformation: string ) { this._streetInformation = pstreetInformation; }

    get cityName(): string { return this._cityName; }

    set cityName( pcityName: string ) { this._cityName = pcityName; }

    get provStateDesc(): string { return this._provStateDesc; }

    set provStateDesc( pprovStateDesc: string ) { this._provStateDesc = pprovStateDesc; }

    get area(): string { return this._area; }

    set area( parea: string ) { this._area = parea; }

    get zipPostalCode(): string { return this._zipPostalCode; }

    set zipPostalCode( pzipPostalCode: string ) { this._zipPostalCode = pzipPostalCode; }

    get country(): string { return this._country; }

    set country( pcountry: string ) { this._country = pcountry; }

    get primaryFlag(): string { return this._primaryFlag; }

    set primaryFlag( pprimaryFlag: string ) { this._primaryFlag = pprimaryFlag; }

    get mailFlag(): string { return this._mailFlag; }

    set mailFlag( pmailFlag: string ) { this._mailFlag = pmailFlag; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag( pactiveFlag: string ) { this._activeFlag = pactiveFlag; }
    
    get addQuery(): string { return this._addQuery; }

    set addQuery( paddQuery: string ) { this._addQuery = paddQuery; }

    toJSON(): any {
        return {
            'addressId': this._addressId,
            'addressType': this._addressType,
            'cityCode': this._cityCode,
            'cityName': this._cityName,
            'commentText': this._commentText,
            'countryCode': this._countryCode,
            'endDate': this._endDate,
            'mailFlag': this._mailFlag,
            'primaryFlag': this._primaryFlag,
            'provStateCode': this._provStateCode,
            'startDate': this._startDate,
            'streetDirection': this._streetDirection,
            'streetNumber': this._streetNumber,
            'suiteNumber': this._suiteNumber,
            'zipPostalCode': this._zipPostalCode,
            'provStateDbCode': this._provStateCode,
            'streetDirectionDbCode': this.streetDirection,
            'lastName': this._lastName,
            'firstName': this._firstName,
            'staffId': this._staffId,
            'validatedFlag': this._validatedFlag,
            'house': this._house,
            'streetInformation': this.streetInformation,
            'provStateDesc': this._provStateDesc,
            'area': this._area,
            'country': this._country,
            'activeFlag': this._activeFlag,
            'addQuery': this._addQuery,
            'isAddressValid':this._isAddressValid,
            'streetAddress':this._streetAddress
        };
    }

}