import {BaseModel} from '@commonbeans/BaseModel';
import { Phones } from '@inst/demographics-biometrics/beans/Phones';
import { AddressUsages } from './AddressUsages';

export class VAddresses extends BaseModel {

    private _activeFlag: string;
    private _addressId: number;
    private _addressType: string;
    private _addressTypeDesc: string;
    private _area: string;
    private _businessHour: string;
    private _capacity: number;
    private _cityCode: string;
    private _cityName: string;
    private _commentText: string;
    private _contactPersonName: string;
    private _country: string;
    private _countryCode: string;
    private _countryDesc: string;
    private _endDate: Date;
    private _fullAddress: string;
    private _house: string;
    private _mailCareOf: string;
    private _mailFlag: string;
    private _noFixedAddressFlag: string;
    private _ownerClass: string;
    private _ownerCode: string;
    private _ownerId: number;
    private _ownerSeq: number;
    private _primaryFlag: string;
    private _provStateCode: string;
    private _provStateDesc: string;
    private _servicesFlag: string;
    private _specialNeeds: string;
    private _startDate: Date;
    private _street: string;
    private _streetDirection: string;
    private _streetDirectionDesc: string;
    private _streetInformation: string;
    private _streetNumber: string;
    private _suiteNumber: string;
    private _validatedFlag: string;
    private _zipPostalCode: string;
    private _countryDbCode: string;
    private _cityDbCode: string;
    private _provStateDbCode: string;
    private _streetDirectionDbCode: string;
    private _description: string;
    private _addr: string;
    private _agency: string;
    private _code: string;
    private _phones: Phones[];
    private _facility: string;
    private _latitude:number ;
    private _longitude:number ;
    private _meshBlock:number;
    private _streetAddress: string;
    private _addressUsages: Array<AddressUsages>;
    private _defaultState: string;
    private _defaultCountry: string;
    
    
    get defaultState(): string { return this._defaultState; }
    
        set defaultState( pdefaultState: string ) { this._defaultState = pdefaultState; }
    
        get defaultCountry(): string { return this._defaultCountry; }
    
        set defaultCountry( pdefaultCountry: string ) { this._defaultCountry = pdefaultCountry; }

    get addressUsages(): Array<AddressUsages> { return this._addressUsages; }

    set addressUsages( paddressUsages: Array<AddressUsages> ) { this._addressUsages = paddressUsages; }
    get latitude(): number { return this._latitude; }

    set latitude(platitude: number) { this._latitude = platitude; }
    get longitude(){ return this._longitude; }
    
    set longitude( platitude: number) { this._longitude = platitude; }
    
    get meshBlock(){ return this._meshBlock; }
    
    set meshBlock(  pmeshBlock: number ) { this._meshBlock = pmeshBlock; }
    get streetAddress(): string { return this._streetAddress; }
    
    set streetAddress( pstreetAddress: string ) { this._streetAddress = pstreetAddress; }

    get facility(): string { return this._facility; }

    set facility( pfacility: string ) { this._facility = pfacility; }

    get agency(): string { return this._agency; }

    set agency(pagency: string) { this._agency = pagency; }

    get code(): string { return this._code; }

    set code(pcode: string) { this._code = pcode; }
    get cityDbCode(): string { return this._cityDbCode; }

    set cityDbCode(pcityDbCode: string) { this._cityDbCode = pcityDbCode; }

    get provStateDbCode(): string { return this._provStateDbCode; }

    set provStateDbCode(pprovStateDbCode: string) { this._provStateDbCode = pprovStateDbCode; }

    get streetDirectionDbCode(): string { return this._streetDirectionDbCode; }

    set streetDirectionDbCode(pstreetDirectionDbCode: string) { this._streetDirectionDbCode = pstreetDirectionDbCode; }

    get countryDbCode(): string { return this._countryDbCode; }
    set countryDbCode(pcountryDbCode: string) { this._countryDbCode = pcountryDbCode; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get addressId(): number { return this._addressId; }

    set addressId(paddressId: number) { this._addressId = paddressId; }

    get addressType(): string { return this._addressType; }

    set addressType(paddressType: string) { this._addressType = paddressType; }

    get addressTypeDesc(): string { return this._addressTypeDesc; }

    set addressTypeDesc(paddressTypeDesc: string) { this._addressTypeDesc = paddressTypeDesc; }

    get area(): string { return this._area; }

    set area(parea: string) { this._area = parea; }

    get businessHour(): string { return this._businessHour; }

    set businessHour(pbusinessHour: string) { this._businessHour = pbusinessHour; }

    get capacity(): number { return this._capacity; }

    set capacity(pcapacity: number) { this._capacity = pcapacity; }

    get cityCode(): string { return this._cityCode; }

    set cityCode(pcityCode: string) { this._cityCode = pcityCode; }

    get cityName(): string { return this._cityName; }

    set cityName(pcityName: string) { this._cityName = pcityName; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get contactPersonName(): string { return this._contactPersonName; }

    set contactPersonName(pcontactPersonName: string) { this._contactPersonName = pcontactPersonName; }

    get country(): string { return this._country; }

    set country(pcountry: string) { this._country = pcountry; }

    get countryCode(): string { return this._countryCode; }

    set countryCode(pcountryCode: string) { this._countryCode = pcountryCode; }

    get countryDesc(): string { return this._countryDesc; }

    set countryDesc(pcountryDesc: string) { this._countryDesc = pcountryDesc; }

    get endDate(): Date { return this._endDate; }

    set endDate(pendDate: Date) { this._endDate = pendDate; }

    get fullAddress(): string { return this._fullAddress; }

    set fullAddress(pfullAddress: string) { this._fullAddress = pfullAddress; }

    get house(): string { return this._house; }

    set house(phouse: string) { this._house = phouse; }

    get mailCareOf(): string { return this._mailCareOf; }

    set mailCareOf(pmailCareOf: string) { this._mailCareOf = pmailCareOf; }

    get mailFlag(): string { return this._mailFlag; }

    set mailFlag(pmailFlag: string) { this._mailFlag = pmailFlag; }

    get noFixedAddressFlag(): string { return this._noFixedAddressFlag; }

    set noFixedAddressFlag(pnoFixedAddressFlag: string) { this._noFixedAddressFlag = pnoFixedAddressFlag; }

    get ownerClass(): string { return this._ownerClass; }

    set ownerClass(pownerClass: string) { this._ownerClass = pownerClass; }

    get ownerCode(): string { return this._ownerCode; }

    set ownerCode(pownerCode: string) { this._ownerCode = pownerCode; }

    get ownerId(): number { return this._ownerId; }

    set ownerId(pownerId: number) { this._ownerId = pownerId; }

    get ownerSeq(): number { return this._ownerSeq; }

    set ownerSeq(pownerSeq: number) { this._ownerSeq = pownerSeq; }

    get primaryFlag(): string { return this._primaryFlag; }

    set primaryFlag(pprimaryFlag: string) { this._primaryFlag = pprimaryFlag; }

    get provStateCode(): string { return this._provStateCode; }

    set provStateCode(pprovStateCode: string) { this._provStateCode = pprovStateCode; }

    get provStateDesc(): string { return this._provStateDesc; }

    set provStateDesc(pprovStateDesc: string) { this._provStateDesc = pprovStateDesc; }

    get servicesFlag(): string { return this._servicesFlag; }

    set servicesFlag(pservicesFlag: string) { this._servicesFlag = pservicesFlag; }

    get specialNeeds(): string { return this._specialNeeds; }

    set specialNeeds(pspecialNeeds: string) { this._specialNeeds = pspecialNeeds; }

    get startDate(): Date { return this._startDate; }

    set startDate(pstartDate: Date) { this._startDate = pstartDate; }

    get street(): string { return this._street; }

    set street(pstreet: string) { this._street = pstreet; }

    get streetDirection(): string { return this._streetDirection; }

    set streetDirection(pstreetDirection: string) { this._streetDirection = pstreetDirection; }

    get streetDirectionDesc(): string { return this._streetDirectionDesc; }

    set streetDirectionDesc(pstreetDirectionDesc: string) { this._streetDirectionDesc = pstreetDirectionDesc; }

    get streetInformation(): string { return this._streetInformation; }

    set streetInformation(pstreetInformation: string) { this._streetInformation = pstreetInformation; }

    get streetNumber(): string { return this._streetNumber; }

    set streetNumber(pstreetNumber: string) { this._streetNumber = pstreetNumber; }

    get suiteNumber(): string { return this._suiteNumber; }

    set suiteNumber(psuiteNumber: string) { this._suiteNumber = psuiteNumber; }

    get validatedFlag(): string { return this._validatedFlag; }

    set validatedFlag(pvalidatedFlag: string) { this._validatedFlag = pvalidatedFlag; }

    get zipPostalCode(): string { return this._zipPostalCode; }

    set zipPostalCode(pzipPostalCode: string) { this._zipPostalCode = pzipPostalCode; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get addr(): string { return this._addr; }

    set addr(paddr: string) { this._addr = paddr; }

    get phones(): Phones[] { return this.phones; }

    set phones(pphones: Phones[]) { this._phones = pphones; }

    toJSON(): any {
        return {
            'activeFlag': this._activeFlag,
            'addressId': this._addressId,
            'addressType': this._addressType,
            'addressTypeDesc': this._addressTypeDesc,
            'area': this._area,
            'businessHour': this._businessHour,
            'capacity': this._capacity,
            'cityCode': this._cityCode,
            'cityName': this._cityName,
            'commentText': this._commentText,
            'contactPersonName': this._contactPersonName,
            'country': this._country,
            'countryCode': this._countryCode,
            'countryDesc': this._countryDesc,
            'endDate': this._endDate,
            'fullAddress': this._fullAddress,
            'house': this._house,
            'mailCareOf': this._mailCareOf,
            'mailFlag': this._mailFlag,
            'noFixedAddressFlag': this._noFixedAddressFlag,
            'ownerClass': this._ownerClass,
            'ownerCode': this._ownerCode,
            'ownerId': this._ownerId,
            'ownerSeq': this._ownerSeq,
            'primaryFlag': this._primaryFlag,
            'provStateCode': this._provStateCode,
            'provStateDesc': this._provStateDesc,
            'servicesFlag': this._servicesFlag,
            'specialNeeds': this._specialNeeds,
            'startDate': this._startDate,
            'street': this._street,
            'streetDirection': this._streetDirection,
            'streetDirectionDesc': this._streetDirectionDesc,
            'streetInformation': this._streetInformation,
            'streetNumber': this._streetNumber,
            'suiteNumber': this._suiteNumber,
            'validatedFlag': this._validatedFlag,
            'zipPostalCode': this._zipPostalCode,
            'countryDbCode': this._countryDbCode,
            'description': this._description,
            'addr': this._addr,
            'phones': this._phones,
            'code':this._code,
            'agency':this._agency,
            'facility':this._facility,
            'addressUsages': this._addressUsages,
            'defaultState':this._defaultState,
             'defaultCountry':this._defaultCountry
        };
    }
}
