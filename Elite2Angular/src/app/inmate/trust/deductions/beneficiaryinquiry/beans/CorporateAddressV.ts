
export class CorporateAddressV {
    private _ownerCode: string;
    private _cityCode: string;
    private _ownerId: number;
    private _ownerSeq: number;
    private _primaryFlag: string;
    private _corporateId: number;
    private _addressId: number;
    private _mailCareOf: string;
    private _corporateName: string;
    private _provStateDesc: string;
    private _serialVersionUID: number;
    private _inserted: number;
    private _zipPostalCode: string;
    private _countryCode: string;
    private _Street: string;
    private _suiteNumber: string;
    private _mailFlag: string;
    private _cityDesc: string;
    private _streetNumber: string;
    private _addressType: string;
    private _errorMessage: string;
    private _ownerClass: string;
    private _streetDirection: string;
    private _suspendedFlag: string;
    private _countryDesc: string;
    private _contactPersonName: string;
    private _caseloadId: string;
    private _suspendedDate: Date;
    private _provStateCode: string;
    private _button: string;

    get button(): string { return this._button; }

    set button( pbutton: string ) { this._button = pbutton; }

    get ownerCode(): string { return this._ownerCode; }

    set ownerCode( pownerCode: string ) { this._ownerCode = pownerCode; }

    get cityCode(): string { return this._cityCode; }

    set cityCode( pcityCode: string ) { this._cityCode = pcityCode; }

    get ownerId(): number { return this._ownerId; }

    set ownerId( pownerId: number ) { this._ownerId = pownerId; }

    get ownerSeq(): number { return this._ownerSeq; }

    set ownerSeq( pownerSeq: number ) { this._ownerSeq = pownerSeq; }

    get primaryFlag(): string { return this._primaryFlag; }

    set primaryFlag( pprimaryFlag: string ) { this._primaryFlag = pprimaryFlag; }

    get corporateId(): number { return this._corporateId; }

    set corporateId( pcorporateId: number ) { this._corporateId = pcorporateId; }

    get addressId(): number { return this._addressId; }

    set addressId( paddressId: number ) { this._addressId = paddressId; }

    get mailCareOf(): string { return this._mailCareOf; }

    set mailCareOf( pmailCareOf: string ) { this._mailCareOf = pmailCareOf; }

    get corporateName(): string { return this._corporateName; }

    set corporateName( pcorporateName: string ) { this._corporateName = pcorporateName; }

    get provStateDesc(): string { return this._provStateDesc; }

    set provStateDesc( pprovStateDesc: string ) { this._provStateDesc = pprovStateDesc; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID( pserialVersionUID: number ) { this._serialVersionUID = pserialVersionUID; }

    get inserted(): number { return this._inserted; }

    set inserted( pinserted: number ) { this._inserted = pinserted; }

    get zipPostalCode(): string { return this._zipPostalCode; }

    set zipPostalCode( pzipPostalCode: string ) { this._zipPostalCode = pzipPostalCode; }

    get countryCode(): string { return this._countryCode; }

    set countryCode( pcountryCode: string ) { this._countryCode = pcountryCode; }

    get Street(): string { return this._Street; }

    set Street( pStreet: string ) { this._Street = pStreet; }

    get suiteNumber(): string { return this._suiteNumber; }

    set suiteNumber( psuiteNumber: string ) { this._suiteNumber = psuiteNumber; }

    get mailFlag(): string { return this._mailFlag; }

    set mailFlag( pmailFlag: string ) { this._mailFlag = pmailFlag; }

    get cityDesc(): string { return this._cityDesc; }

    set cityDesc( pcityDesc: string ) { this._cityDesc = pcityDesc; }

    get streetNumber(): string { return this._streetNumber; }

    set streetNumber( pstreetNumber: string ) { this._streetNumber = pstreetNumber; }

    get addressType(): string { return this._addressType; }

    set addressType( paddressType: string ) { this._addressType = paddressType; }

    get errorMessage(): string { return this._errorMessage; }

    set errorMessage( perrorMessage: string ) { this._errorMessage = perrorMessage; }

    get ownerClass(): string { return this._ownerClass; }

    set ownerClass( pownerClass: string ) { this._ownerClass = pownerClass; }

    get streetDirection(): string { return this._streetDirection; }

    set streetDirection( pstreetDirection: string ) { this._streetDirection = pstreetDirection; }

    get suspendedFlag(): string { return this._suspendedFlag; }

    set suspendedFlag( psuspendedFlag: string ) { this._suspendedFlag = psuspendedFlag; }

    get countryDesc(): string { return this._countryDesc; }

    set countryDesc( pcountryDesc: string ) { this._countryDesc = pcountryDesc; }

    get contactPersonName(): string { return this._contactPersonName; }

    set contactPersonName( pcontactPersonName: string ) { this._contactPersonName = pcontactPersonName; }

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId( pcaseloadId: string ) { this._caseloadId = pcaseloadId; }

    get suspendedDate(): Date { return this._suspendedDate; }

    set suspendedDate( psuspendedDate: Date ) { this._suspendedDate = psuspendedDate; }

    get provStateCode(): string { return this._provStateCode; }

    set provStateCode( pprovStateCode: string ) { this._provStateCode = pprovStateCode; }


    toJSON(): any {
        return {
            'ownerCode': this._ownerCode,
            'cityCode': this._cityCode,
            'ownerId': this._ownerId,
            'ownerSeq': this._ownerSeq,
            'primaryFlag': this._primaryFlag,
            'corporateId': this._corporateId,
            'addressId': this._addressId,
            'mailCareOf': this._mailCareOf,
            'corporateName': this._corporateName,
            'provStateDesc': this._provStateDesc,
            'serialVersionUID': this._serialVersionUID,
            'inserted': this._inserted,
            'zipPostalCode': this._zipPostalCode,
            'countryCode': this._countryCode,
            'Street': this._Street,
            'suiteNumber': this._suiteNumber,
            'mailFlag': this._mailFlag,
            'cityDesc': this._cityDesc,
            'streetNumber': this._streetNumber,
            'addressType': this._addressType,
            'errorMessage': this._errorMessage,
            'ownerClass': this._ownerClass,
            'streetDirection': this._streetDirection,
            'suspendedFlag': this._suspendedFlag,
            'countryDesc': this._countryDesc,
            'contactPersonName': this._contactPersonName,
            'caseloadId': this._caseloadId,
            'suspendedDate': this._suspendedDate,
            'provStateCode': this._provStateCode,
            'button': this._button
        };
    }
 }
