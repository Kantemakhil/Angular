import { BaseModel} from '@commonbeans/BaseModel';

export class VOffenderEmployAddresses extends BaseModel {


    private _addressId: number;
    private _addressType: string;
    private _addressTypeDesc: string;
    private _offenderBookId: number;
    private _employmentSeq: number;
    private _startDate: Date;
    private _endDate: Date;
    private _activeFlag: string;
    private _house: string;
    private _street: string;
    private _area: string;
    private _country: string;
    private _suiteNumber: string;
    private _streetNumber: string;
    private _streetDirection: string;
    private _cityCode: string;
    private _provStateCode: string;
    private _zipPostalCode: string;
    private _countryCode: string;
    private _commentText: string;
    private _primaryFlag: string;
    private _mailFlag: string;
    private _validatedFlag: string;
    private _streetInformation: string;
    private _cityName: string;
    private _provStateDesc: string;
    private _inserted: boolean;

    private _countryDbCode: string;
    private _cityDbCode: string;
    private _provStateDbCode: string;
    private _streetDirectionDbCode: string;
private _addressTypeDbCode: string;


get addressTypeDbCode(): string { return this._addressTypeDbCode; }

set addressTypeDbCode( paddressTypeDbCode: string ) { this._addressTypeDbCode = paddressTypeDbCode; }

    get countryDbCode(): string { return this._countryDbCode; }

    set countryDbCode( pcountryDbCode: string ) { this._countryDbCode = pcountryDbCode; }

    get cityDbCode(): string { return this._cityDbCode; }

    set cityDbCode( pcityDbCode: string ) { this._cityDbCode = pcityDbCode; }

    get provStateDbCode(): string { return this._provStateDbCode; }

    set provStateDbCode( pprovStateDbCode: string ) { this._provStateDbCode = pprovStateDbCode; }

    get streetDirectionDbCode(): string { return this._streetDirectionDbCode; }

    set streetDirectionDbCode( pstreetDirectionDbCode: string ) { this._streetDirectionDbCode = pstreetDirectionDbCode; }

    get addressId(): number { return this._addressId; }

    set addressId( paddressId: number ) { this._addressId = paddressId; }

    get addressType(): string { return this._addressType; }

    set addressType( paddressType: string ) { this._addressType = paddressType; }

    get addressTypeDesc(): string { return this._addressTypeDesc; }

    set addressTypeDesc( paddressTypeDesc: string ) { this._addressTypeDesc = paddressTypeDesc; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }

    get employmentSeq(): number { return this._employmentSeq; }

    set employmentSeq( pemploymentSeq: number ) { this._employmentSeq = pemploymentSeq; }

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

    get suiteNumber(): string { return this._suiteNumber; }

    set suiteNumber( psuiteNumber: string ) { this._suiteNumber = psuiteNumber; }

    get streetNumber(): string { return this._streetNumber; }

    set streetNumber( pstreetNumber: string ) { this._streetNumber = pstreetNumber; }

    get streetDirection(): string { return this._streetDirection; }

    set streetDirection( pstreetDirection: string ) { this._streetDirection = pstreetDirection; }

    get cityCode(): string { return this._cityCode; }

    set cityCode( pcityCode: string ) { this._cityCode = pcityCode; }

    get provStateCode(): string { return this._provStateCode; }

    set provStateCode( pprovStateCode: string ) { this._provStateCode = pprovStateCode; }

    get zipPostalCode(): string { return this._zipPostalCode; }

    set zipPostalCode( pzipPostalCode: string ) { this._zipPostalCode = pzipPostalCode; }

    get countryCode(): string { return this._countryCode; }

    set countryCode( pcountryCode: string ) { this._countryCode = pcountryCode; }

    get commentText(): string { return this._commentText; }

    set commentText( pcommentText: string ) { this._commentText = pcommentText; }

    get primaryFlag(): string { return this._primaryFlag; }

    set primaryFlag( pprimaryFlag: string ) { this._primaryFlag = pprimaryFlag; }

    get mailFlag(): string { return this._mailFlag; }

    set mailFlag( pmailFlag: string ) { this._mailFlag = pmailFlag; }

    get validatedFlag(): string { return this._validatedFlag; }

    set validatedFlag( pvalidatedFlag: string ) { this._validatedFlag = pvalidatedFlag; }

    get streetInformation(): string { return this._streetInformation; }

    set streetInformation( pstreetInformation: string ) { this._streetInformation = pstreetInformation; }

    get cityName(): string { return this._cityName; }

    set cityName( pcityName: string ) { this._cityName = pcityName; }

    get provStateDesc(): string { return this._provStateDesc; }

    set provStateDesc( pprovStateDesc: string ) { this._provStateDesc = pprovStateDesc; }

    get inserted(): boolean { return this._inserted; }

    set inserted( pinserted: boolean ) { this._inserted = pinserted; }


    toJSON(): any {
        return {
            'addressId': this._addressId,
            'addressType': this._addressType,
            'addressTypeDesc': this._addressTypeDesc,
            'offenderBookId': this._offenderBookId,
            'employmentSeq': this._employmentSeq,
            'startDate': this._startDate,
            'endDate': this._endDate,
            'activeFlag': this._activeFlag,
            'house': this._house,
            'street': this._street,
            'area': this._area,
            'country': this._country,
            'suiteNumber': this._suiteNumber,
            'streetNumber': this._streetNumber,
            'streetDirection': this._streetDirection,
            'cityCode': this._cityCode,
            'provStateCode': this._provStateCode,
            'zipPostalCode': this._zipPostalCode,
            'countryCode': this._countryCode,
            'commentText': this._commentText,
            'primaryFlag': this._primaryFlag,
            'mailFlag': this._mailFlag,
            'validatedFlag': this._validatedFlag,
            'streetIinformation': this._streetInformation,
            'cityName': this._cityName,
            'provStateDesc': this._provStateDesc,
            'inserted': this._inserted,
            'countryDbCode': this._countryDbCode,
            'cityDbCode': this._cityDbCode,
            'provStateDbCode': this._provStateCode,
            'streetDirectionDbCode': this.streetDirection,
            'addressTypeDbCode':this._addressTypeDbCode,

        };
    }

}