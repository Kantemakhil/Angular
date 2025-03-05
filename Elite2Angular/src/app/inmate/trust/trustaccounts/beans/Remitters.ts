
export class Remitters {
    private _lastName: string;
    private _busPhoneArea: string;
    private _createUserId: string;
    private _address: string;
    private _city: string;
    private _homePhone: string;
    private _modifyUserId: string;
    private _busPhone: string;
    private _createDateTime: Date;
    private _remitterId: number;
    private _zipStateCode: string;
    private _firstName: string;
    private _serialVersionUID: number;
    private _homePhoneArea: string;
    private _homePhoneExt: string;
    private _modifyDateTime: Date;
    private _countryCode: string;
    private _middleName: string;
    private _busPhoneExt: string;
    private _sealFlag: string;
    private _provStateCode: string;

    get lastName(): string { return this._lastName; }

    set lastName( plastName: string ) { this._lastName = plastName; }

    get busPhoneArea(): string { return this._busPhoneArea; }

    set busPhoneArea( pbusPhoneArea: string ) { this._busPhoneArea = pbusPhoneArea; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get address(): string { return this._address; }

    set address( paddress: string ) { this._address = paddress; }

    get city(): string { return this._city; }

    set city( pcity: string ) { this._city = pcity; }

    get homePhone(): string { return this._homePhone; }

    set homePhone( phomePhone: string ) { this._homePhone = phomePhone; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get busPhone(): string { return this._busPhone; }

    set busPhone( pbusPhone: string ) { this._busPhone = pbusPhone; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime( pcreateDateTime: Date ) { this._createDateTime = pcreateDateTime; }

    get remitterId(): number { return this._remitterId; }

    set remitterId( premitterId: number ) { this._remitterId = premitterId; }

    get zipStateCode(): string { return this._zipStateCode; }

    set zipStateCode( pzipStateCode: string ) { this._zipStateCode = pzipStateCode; }

    get firstName(): string { return this._firstName; }

    set firstName( pfirstName: string ) { this._firstName = pfirstName; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID( pserialVersionUID: number ) { this._serialVersionUID = pserialVersionUID; }

    get homePhoneArea(): string { return this._homePhoneArea; }

    set homePhoneArea( phomePhoneArea: string ) { this._homePhoneArea = phomePhoneArea; }

    get homePhoneExt(): string { return this._homePhoneExt; }

    set homePhoneExt( phomePhoneExt: string ) { this._homePhoneExt = phomePhoneExt; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime( pmodifyDateTime: Date ) { this._modifyDateTime = pmodifyDateTime; }

    get countryCode(): string { return this._countryCode; }

    set countryCode( pcountryCode: string ) { this._countryCode = pcountryCode; }

    get middleName(): string { return this._middleName; }

    set middleName( pmiddleName: string ) { this._middleName = pmiddleName; }

    get busPhoneExt(): string { return this._busPhoneExt; }

    set busPhoneExt( pbusPhoneExt: string ) { this._busPhoneExt = pbusPhoneExt; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get provStateCode(): string { return this._provStateCode; }

    set provStateCode( pprovStateCode: string ) { this._provStateCode = pprovStateCode; }


    toJSON(): any {
        return {
            'lastName': this._lastName,
            'busPhoneArea': this._busPhoneArea,
            'createUserId': this._createUserId,
            'address': this._address,
            'city': this._city,
            'homePhone': this._homePhone,
            'modifyUserId': this._modifyUserId,
            'busPhone': this._busPhone,
            'createDateTime': this._createDateTime,
            'remitterId': this._remitterId,
            'zipStateCode': this._zipStateCode,
            'firstName': this._firstName,
            'serialVersionUID': this._serialVersionUID,
            'homePhoneArea': this._homePhoneArea,
            'homePhoneExt': this._homePhoneExt,
            'modifyDateTime': this._modifyDateTime,
            'countryCode': this._countryCode,
            'middleName': this._middleName,
            'busPhoneExt': this._busPhoneExt,
            'sealFlag': this._sealFlag,
            'provStateCode': this._provStateCode,
        };
    }
 }