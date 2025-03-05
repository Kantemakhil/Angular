import { BaseModel } from '@commonbeans/BaseModel';
import { AddressUsages } from './AddressUsages';

export class Addresses extends BaseModel {

    private _addressId: number;
    private _addressType: string;
    private _businessHour: string;
    private _capacity: number;
    private _cityCode: string;
    private _cityName: string;
    private _commentText: string;
    private _contactPersonName: string;
    private _countryCode: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _endDate: Date;
    private _mailCareOf: string;
    private _mailFlag: string;
    private _mailFlagTemp: boolean;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _noFixedAddressFlag: string;
    private _noFixedAddressFlagTemp: boolean;
    private _ownerClass: string;
    private _ownerCode: string;
    private _ownerId: number;
    private _ownerSeq: number;
    private _primaryFlag: string;
    private _primaryFlagTemp: boolean;
    private _provStateCode: string;
    private _sealFlag: string;
    private _servicesFlag: string;
    private _specialNeedsCode: string;
    private _startDate: Date;
    private _street: string;
    private _streetDirection: string;
    private _streetNumber: string;
    private _suiteNumber: string;
    private _validatedPafFlag: string;
    private _zipPostalCode: string;
    private _length: number;
    private _addressUsages: Array<AddressUsages>;
private _offenderBookId: number;
private _facility: string;
private _latitude:number ;
private _longitude:number ;
private _meshBlock:number;
private _streetAddress: string;
private _isAddressValid: string;
private _addrType: string;
private _fullValidatedAddress:any = '';

get fullValidatedAddress(): any { return this._fullValidatedAddress; }
    
set fullValidatedAddress( fullValidatedValue: any ) { this._fullValidatedAddress = fullValidatedValue; }

get addrType(): string {
        
    return this._addrType;
}

get isAddressValid(): string { return this._isAddressValid; }

    set isAddressValid( pisAddressValid: string ) { this._isAddressValid = pisAddressValid; }
    get facility(): string { return this._facility; }

    set facility( pfacility: string ) { this._facility = pfacility; }
get addressId(): number { return this._addressId; }

    set addressId( paddressId: number ) { this._addressId = paddressId; }

    get addressType(): string { return this._addressType; }

    set addressType( paddressType: string ) { this._addressType = paddressType; }

    get businessHour(): string { return this._businessHour; }

    set businessHour( pbusinessHour: string ) { this._businessHour = pbusinessHour; }

    get capacity(): number { return this._capacity; }

    set capacity( pcapacity: number ) { this._capacity = pcapacity; }

    get cityCode(): string { return this._cityCode; }

    set cityCode( pcityCode: string ) { this._cityCode = pcityCode; }

    get cityName(): string { return this._cityName; }

    set cityName( pcityName: string ) { this._cityName = pcityName; }

    get commentText(): string { return this._commentText; }

    set commentText( pcommentText: string ) { this._commentText = pcommentText; }

    get contactPersonName(): string { return this._contactPersonName; }

    set contactPersonName( pcontactPersonName: string ) { this._contactPersonName = pcontactPersonName; }

    get countryCode(): string { return this._countryCode; }

    set countryCode( pcountryCode: string ) { this._countryCode = pcountryCode; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get endDate(): Date { return this._endDate; }

    set endDate( pendDate: Date ) { this._endDate = pendDate; }

    get mailCareOf(): string { return this._mailCareOf; }

    set mailCareOf( pmailCareOf: string ) { this._mailCareOf = pmailCareOf; }

    get mailFlag(): string { return this._mailFlag; }

    set mailFlag( pmailFlag: string ) { this._mailFlag = pmailFlag; }

    get noFixedAddressFlagTemp(): boolean { return this._noFixedAddressFlagTemp; }

    set noFixedAddressFlagTemp( pnoFixedAddressFlagTemp: boolean ) { this._noFixedAddressFlagTemp = pnoFixedAddressFlagTemp; }

    get mailFlagTemp(): boolean { return this._mailFlagTemp; }

    set mailFlagTemp( pmailFlagTemp: boolean ) { this._mailFlagTemp = pmailFlagTemp; }

    get primaryFlagTemp(): boolean { return this._primaryFlagTemp; }

    set primaryFlagTemp( pprimaryFlagTemp: boolean ) { this._primaryFlagTemp = pprimaryFlagTemp; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get noFixedAddressFlag(): string { return this._noFixedAddressFlag; }

    set noFixedAddressFlag( pnoFixedAddressFlag: string ) { this._noFixedAddressFlag = pnoFixedAddressFlag; }

    get ownerClass(): string { return this._ownerClass; }

    set ownerClass( pownerClass: string ) { this._ownerClass = pownerClass; }

    get ownerCode(): string { return this._ownerCode; }

    set ownerCode( pownerCode: string ) { this._ownerCode = pownerCode; }

    get ownerId(): number { return this._ownerId; }

    set ownerId( pownerId: number ) { this._ownerId = pownerId; }

    get ownerSeq(): number { return this._ownerSeq; }

    set ownerSeq( pownerSeq: number ) { this._ownerSeq = pownerSeq; }

    get primaryFlag(): string { return this._primaryFlag; }

    set primaryFlag( pprimaryFlag: string ) { this._primaryFlag = pprimaryFlag; }

    get provStateCode(): string { return this._provStateCode; }

    set provStateCode( pprovStateCode: string ) { this._provStateCode = pprovStateCode; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get servicesFlag(): string { return this._servicesFlag; }

    set servicesFlag( pservicesFlag: string ) { this._servicesFlag = pservicesFlag; }

    get specialNeedsCode(): string { return this._specialNeedsCode; }

    set specialNeedsCode( pspecialNeedsCode: string ) { this._specialNeedsCode = pspecialNeedsCode; }

    get startDate(): Date { return this._startDate; }

    set startDate( pstartDate: Date ) { this._startDate = pstartDate; }

    get street(): string { return this._street; }

    set street( pstreet: string ) { this._street = pstreet; }

    get streetDirection(): string { return this._streetDirection; }

    set streetDirection( pstreetDirection: string ) { this._streetDirection = pstreetDirection; }

    get streetNumber(): string { return this._streetNumber; }

    set streetNumber( pstreetNumber: string ) { this._streetNumber = pstreetNumber; }

    get suiteNumber(): string { return this._suiteNumber; }

    set suiteNumber( psuiteNumber: string ) { this._suiteNumber = psuiteNumber; }

    get validatedPafFlag(): string { return this._validatedPafFlag; }

    set validatedPafFlag( pvalidatedPafFlag: string ) { this._validatedPafFlag = pvalidatedPafFlag; }

    get zipPostalCode(): string { return this._zipPostalCode; }

    set zipPostalCode( pzipPostalCode: string ) { this._zipPostalCode = pzipPostalCode; }

    get length(): number { return this._length; }

    set length( plength: number ) { this._length = plength; }

    get addressUsages(): Array<AddressUsages> { return this._addressUsages; }

    set addressUsages( paddressUsages: Array<AddressUsages> ) { this._addressUsages = paddressUsages; }
    
    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }

    get latitude(): number { return this._latitude; }

set latitude(platitude: number) { this._latitude = platitude; }
get longitude(){ return this._longitude; }

set longitude( platitude: number) { this._longitude = platitude; }

get meshBlock(){ return this._meshBlock; }

set meshBlock(  pmeshBlock: number ) { this._meshBlock = pmeshBlock; }
get streetAddress(): string { return this._streetAddress; }

set streetAddress( pstreetAddress: string ) { this._streetAddress = pstreetAddress; }


    toJSON(): any {
        return {
            'fullValidatedAddress': this._fullValidatedAddress,
            'addressId': this._addressId,
            'addressType': this._addressType,
            'businessHour': this._businessHour,
            'capacity': this._capacity,
            'cityCode': this._cityCode,
            'cityName': this._cityName,
            'commentText': this._commentText,
            'contactPersonName': this._contactPersonName,
            'countryCode': this._countryCode,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'endDate': this._endDate,
            'mailCareOf': this._mailCareOf,
            'mailFlag': this._mailFlag,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'noFixedAddressFlag': this._noFixedAddressFlag,
            'ownerClass': this._ownerClass,
            'ownerCode': this._ownerCode,
            'ownerId': this._ownerId,
            'ownerSeq': this._ownerSeq,
            'primaryFlag': this._primaryFlag,
            'provStateCode': this._provStateCode,
            'sealFlag': this._sealFlag,
            'servicesFlag': this._servicesFlag,
            'specialNeedsCode': this._specialNeedsCode,
            'startDate': this._startDate,
            'street': this._street,
            'streetDirection': this._streetDirection,
            'streetNumber': this._streetNumber,
            'suiteNumber': this._suiteNumber,
            'validatedPafFlag': this._validatedPafFlag,
            'zipPostalCode': this._zipPostalCode,
            'length': this._length,
            'addressUsages': this._addressUsages,
            'provStateDbCode': this._provStateCode,
            'streetDirectionDbCode': this.streetDirection,
            'offenderBookId': this._offenderBookId,
            'facility': this._facility,
            'latitude':this._latitude,
            'longitude':this._longitude,
            'meshBlock':this._meshBlock,
            'streetAddress':this._streetAddress,
            'isAddressValid':this._isAddressValid,
            "addrType":this._addrType
        };
    }
}
