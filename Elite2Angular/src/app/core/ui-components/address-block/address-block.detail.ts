

export class AddressDetails {

    private _fullValidatedAddress:any = '';
    private addNoFixedAddressFlag: boolean = false;
    private addSuite: string = "";
    private addStreetNumber: string = "";
    private addStreetV: string = "";
    private addSelectedDirection: string = "";
    private addSelectedCity: any = "";
    private addSelectedState: string = "";
    private addPostalCode: string = "";
    private addSelectedCountry: string = "";
    private addFromDate: string = "";
    private addToDate: string = "";
    private addComment: string = "";
    private addCheckedPrimary: boolean = false;
    private addCheckedMail: boolean = false;
    public placeholder: string = "State";
    private addService: boolean = false;
    private _endDate: Date;
    private addValidated: boolean = false;
    private _latitude:number ;
        private _longitude:number ;
        private _meshBlock:number;
        private _streetAddress: string;
        private _mailCareOf: string;
    private addAddressType: any[] = [];
    private _addrType: string;
    
    private _isAddressValid: string;
    
    private _stateLov: boolean = false;
    
    private _cityLov: boolean = false;
    private _streetDirection: string;
    private _addressId: number;
    private _streetAddressDisable: boolean = false;
    
    private _postalCodeDisable: boolean = false;
    private _defaultState: string;
    private _defaultCountry: string;
    
    
    get defaultState(): string { return this._defaultState; }
    
        set defaultState( pdefaultState: string ) { this._defaultState = pdefaultState; }
    
        get defaultCountry(): string { return this._defaultCountry; }
    
        set defaultCountry( pdefaultCountry: string ) { this._defaultCountry = pdefaultCountry; }
    
    get streetAddressDisable(): boolean { return this._streetAddressDisable; }
        
    set streetAddressDisable( pvalue: boolean ) { this._streetAddressDisable = pvalue; }
    
    
    get postalCodeDisable (): boolean { return this._postalCodeDisable; }
        
    set postalCodeDisable ( value: boolean ) { this._postalCodeDisable = value; }
    
    get isAddressValid(): string { return this._isAddressValid; }
    
        set isAddressValid( pisAddressValid: string ) { this._isAddressValid = pisAddressValid; }
    get addressId(): number { return this._addressId; }
    
        set addressId( paddressId: number ) { this._addressId = paddressId; }
    get streetDirection(): string { return this._streetDirection; }
    
        set streetDirection( pstreetDirection: string ) { this._streetDirection = pstreetDirection; }
    get stateLov(): boolean { return this._stateLov; }
        
    set stateLov( value: boolean ) { this._stateLov = value; }
    
    
    get cityLov (): boolean { return this._cityLov; }
        
    set cityLov ( value: boolean ) { this._cityLov = value; }
    
    
    get addrType(): string {
            
        return this._addrType;
    }
    
    set addrType( value: string ) { this._addrType = value; }
    
    get latitude(): number { return this._latitude; }
        
        set latitude(platitude: number) { this._latitude = platitude; }
        get longitude(){ return this._longitude; }
        
        set longitude( platitude: number) { this._longitude = platitude; }
        
        get meshBlock(){ return this._meshBlock; }
        
        set meshBlock(  pmeshBlock: number ) { this._meshBlock = pmeshBlock; }
        
        
        get streetAddress(): string {
            
            return this._streetAddress;
        }
        
        set streetAddress( value: string ) { this._streetAddress = value; }
        
        get mailCareOf(): string { return this._mailCareOf; }
        
        set mailCareOf( pmailCareOf: string ) { this._mailCareOf = pmailCareOf; }
        
        get chkValidated(): boolean { return this.addValidated; }
        
        set chkValidated( value: boolean ) { this.addValidated = value; }
    
    get addressType(): any { return this.addAddressType; }
    
    set addressType( value: any ) { this.addAddressType = value; }
    
    
    get noFixedAddressFlag(): boolean { return this.addNoFixedAddressFlag; }
    
    set noFixedAddressFlag( addNoFixedAddressFlag: boolean ) { this.addNoFixedAddressFlag = addNoFixedAddressFlag; }
    
    get suite(): string { return this.addSuite; }
    
    set suite( addSuiteValue: string ) { this.addSuite = addSuiteValue; }

    get fullValidatedAddress(): any { return this._fullValidatedAddress; }
    
    set fullValidatedAddress( val: any ) { this._fullValidatedAddress = val; }
    
    get streetNumber(): string { return this.addStreetNumber; }
    
    set streetNumber( addStreetNumber: string ) { this.addStreetNumber = addStreetNumber; }
    
    get street(): string { return this.addStreetV; }
    
    set street( addStreetValue: string ) { this.addStreetV = addStreetValue; }
    
    get selectedDirection(): string {
    return this.addSelectedDirection;
    }
    
    set selectedDirection( addSelectedDirection: string ) {
    this.addSelectedDirection = addSelectedDirection;
    }
    
    get selectedCity(): any { return this.addSelectedCity; }
    
    set selectedCity( addSelectedCity: any ) {
    this.addSelectedCity = addSelectedCity;
    }
    
    get selectedState(): string {
    return this.addSelectedState;
    }
    
    set selectedState( addSelectedState: string ) {
    this.addSelectedState = addSelectedState;
    }
    
    get postalCode(): string { return this.addPostalCode; }
    
    set postalCode( addSelectedPostal: string ) { this.addPostalCode = addSelectedPostal; }
    
    get selectedCountry(): string {
    return this.addSelectedCountry;
    }
    
    set selectedCountry( addSelectedCountry: string ) {
    this.addSelectedCountry = addSelectedCountry;
    if ( this.addSelectedCountry == "UK" ) {
    this.placeholder = "County";
    } else if ( this.addSelectedCountry == "AU" ) {
    this.placeholder = "State/Territory";
    } else if ( this.addSelectedCountry == "US" ) {
    this.placeholder = "State";
    } else if ( this.addSelectedCountry == "CDN" ) {
    this.placeholder = "Provience";
    }
    }
    
    get fromDate(): string { return this.addFromDate; }
    
    set fromDate( addFromDateValue: string ) { this.addFromDate = addFromDateValue; }
    
    get toDate(): string { return this.addToDate; }
    
    set toDate( addToDateValue: string ) { this.addToDate = addToDateValue; }
    
    get comment(): string { return this.addComment; }
    
    set comment( addSelectedComment: string ) { this.addComment = addSelectedComment; }
    
    get chkPrimary(): boolean { return this.addCheckedPrimary; }
    
    set chkPrimary( addCheckedPrimary: boolean ) { this.addCheckedPrimary = addCheckedPrimary; }
    
    get chkMail(): boolean { return this.addCheckedMail; }
    
    set chkMail( addCheckedMail: boolean ) { this.addCheckedMail = addCheckedMail; }
    
    get chkService(): boolean { return this.addService; }
    
    set chkService( addService: boolean ) { this.addService = addService; }
    
    get endDate(): Date { return this._endDate; }
    
    set endDate(pendDate: Date) { this._endDate = pendDate; }
    
    toJSON(): any {
    return {
    'NFA': this.noFixedAddressFlag,
    'Suite': this.suite,
    'StreetNumber': this.streetNumber,
    'Street': this.street,
    'Direction': this.selectedDirection,
    'City': this.selectedCity,
    'State': this.selectedState,
    'Postal': this.postalCode,
    'Country': this.selectedCountry,
    'FromDate': this.fromDate,
    'ToDate': this.toDate,
    'Comment': this.comment,
    'Primary': this.chkPrimary,
    'Mail': this.chkMail,
    'Service': this.chkService,
    'endDate': this._endDate,
    'mailCareOf':this._mailCareOf,
        'latitude':this._latitude,
         'longitude':this._longitude,
         'meshBlock':this._meshBlock,
        'streetAddress':this._streetAddress,
        'addrType':this._addrType,
        'cityLov ':this._cityLov,
        'stateLov':this._stateLov,
        'streetDirection': this._streetDirection,
        'addressId': this._addressId,
        'chkValidated':this.addValidated,
        'streetAddressDisable':this._streetAddressDisable,
        'postalCodeDisable':this._postalCodeDisable,
        'defaultState':this._defaultState,
        'defaultCountry':this._defaultCountry
    
    };
    }
    }
    