export class CourseActivityParties {
    private _registrationText: string;
    private _lastName: string;
    private _contactText: string;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _firstName: string;
    private _serialVersionUID: number;
    private _partyRole: string;
    private _partyRoleText: string;
    private _personId: number;
    private _sealFlag: string;
    private _staffId: number;
    private _crsActyPartyId: number;
    private _crsActyId: number;
    private _nbtLastName: string;
    private _nbtFirstName: string;
    private _providerId: number;
    private _rowId: string;
    private _returnValue: number;
    private _serverCode: number;

    get providerId(): number { return  this._providerId; }

    set providerId(pproviderId: number) { this._providerId = pproviderId; }
    get nbtLastName(): string{ return this._nbtLastName; }
    set nbtLastName(pnbtLastName: string){ this._nbtLastName = pnbtLastName ; }
    get nbtFirstName(): string{ return this._nbtFirstName; }
    set nbtFirstName(pnbtFirstName: string){ this._nbtFirstName = pnbtFirstName ; }

    get registrationText(): string{ return this._registrationText; }
    set registrationText(pregistrationText: string){ this._registrationText = pregistrationText ;}
    get lastName(): string{ return this._lastName; }
    set lastName(plastName: string){ this._lastName = plastName ;}
    get contactText(): string{ return this._contactText; }
    set contactText(pcontactText: string){ this._contactText = pcontactText ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get firstName(): string{ return this._firstName; }
    set firstName(pfirstName: string){ this._firstName = pfirstName ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get partyRole(): string{ return this._partyRole; }
    set partyRole(ppartyRole: string){ this._partyRole = ppartyRole ;}
    get partyRoleText(): string{ return this._partyRoleText; }
    set partyRoleText(ppartyRoleText: string){ this._partyRoleText = ppartyRoleText ;}
    get personId(): number{ return this._personId; }
    set personId(ppersonId: number){ this._personId = ppersonId ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get staffId(): number{ return this._staffId; }
    set staffId(pstaffId: number){ this._staffId = pstaffId ;}
    get crsActyPartyId(): number { return this._crsActyPartyId; }
    set crsActyPartyId(pcrsActyPartyId: number) { this._crsActyPartyId = pcrsActyPartyId ;}
    get crsActyId(): number { return this._crsActyId; }
    set crsActyId(pcrsActyId: number) { this._crsActyId = pcrsActyId ; }
    get rowId(): string { return this._rowId; }
    set rowId(prowId: string) { this._rowId = prowId; }
    get returnValue(): number { return this._returnValue; }
    set returnValue(preturnValue: number) { this._returnValue = preturnValue; }
    get serverCode(): number{ return this._serverCode; }
    set serverCode(pserverCode: number){ this._serverCode = pserverCode;}

toJSON(): any {
    return { 
       'registrationText': this._registrationText,
       'lastName': this._lastName,
       'contactText': this._contactText,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'createDatetime': this._createDatetime,
       'firstName': this._firstName,
       'serialVersionUID': this._serialVersionUID,
       'partyRole': this._partyRole,
       'partyRoleText': this._partyRoleText,
       'personId': this._personId,
       'sealFlag': this._sealFlag,
       'staffId': this._staffId,
       'crsActyPartyId': this._crsActyPartyId,
       'crsActyId': this._crsActyId,
       'nbtLastName': this._nbtLastName,
       'nbtFirstName': this._nbtFirstName,
       'providerId': this._providerId,
       'rowId': this._rowId,
       'returnValue': this._returnValue,
       'serverCode': this._serverCode,
        };
    }
}
