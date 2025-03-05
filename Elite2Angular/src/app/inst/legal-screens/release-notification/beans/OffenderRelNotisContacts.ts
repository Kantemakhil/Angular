export class OffenderRelNotisContacts {
    private _offenderBookId: number;
    private _notiSeq: number;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _name: string;
    private _mobile: string;
    private _modifyUserId: string;
    private _location: string;
    private _fax: number;
    private _sealFlag: string;
    private _email: string;
    private _phoneNo: string;
    private _contactSeq: number;

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId ; }
    get notiSeq(): number { return this._notiSeq; }
    set notiSeq(pnotiSeq: number) { this._notiSeq = pnotiSeq ; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime ; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID ; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId ; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime ; }
    get name(): string { return this._name; }
    set name(pname: string) { this._name = pname ; }
    get mobile(): string { return this._mobile; }
    set mobile(pmobile: string) { this._mobile = pmobile ; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId ; }
    get location(): string { return this._location; }
    set location(plocation: string) { this._location = plocation ; }
    get fax(): number { return this._fax; }
    set fax(pfax: number) { this._fax = pfax ; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag ; }
    get email(): string { return this._email; }
    set email(pemail: string) { this._email = pemail ; }
    get phoneNo(): string { return this._phoneNo; }
    set phoneNo(pphoneNo: string) { this._phoneNo = pphoneNo ; }
    get contactSeq(): number { return this._contactSeq; }
    set contactSeq(pcontactSeq: number) { this._contactSeq = pcontactSeq ; }

toJSON(): any {
    return {
        'offenderBookId': this._offenderBookId,
        'notiSeq': this._notiSeq,
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'name': this._name,
       'mobile': this._mobile,
       'modifyUserId': this._modifyUserId,
       'location': this._location,
       'fax': this._fax,
       'sealFlag': this._sealFlag,
       'email': this._email,
       'phoneNo': this._phoneNo,
       'contactSeq': this._contactSeq,
        };
    }
}
