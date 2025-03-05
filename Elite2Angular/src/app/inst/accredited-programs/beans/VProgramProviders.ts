export class VProgramProviders {

    private _firstName: string;
    private _lastName: string;
    private _serialVersionUID: number;
    private _code: string;
    private _provider: string;
    private _partyClass: string;
    private _partyCode: string;
    private _partyName: string;
    private _description: string;
    private _partyId: number;

    get firstName(): string{ return this._firstName; }
    set firstName(pfirstName: string){ this._firstName = pfirstName ;}
    get lastName(): string{ return this._lastName; }
    set lastName(plastName: string){ this._lastName = plastName ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get code(): string{ return this._code; }
    set code(pcode: string){ this._code = pcode ;}
    get provider(): string{ return this._provider; }
    set provider(pprovider: string){ this._provider = pprovider ;}
    get partyClass(): string{ return this._partyClass; }
    set partyClass(ppartyClass: string){ this._partyClass = ppartyClass ;}
    get partyCode(): string{ return this._partyCode; }
    set partyCode(ppartyCode: string){ this._partyCode = ppartyCode ;}
    get partyName(): string{ return this._partyName; }
    set partyName(ppartyName: string){ this._partyName = ppartyName ;}
    get description(): string{ return this._description; }
    set description(pdescription: string){ this._description = pdescription ;}
    get partyId(): number{ return this._partyId; }
    set partyId(ppartyId: number){ this._partyId = ppartyId ;}

toJSON(): any {
    return { 
       'firstName': this._firstName,
       'lastName': this._lastName,
       'serialVersionUID': this._serialVersionUID,
       'code': this._code,
       'provider': this._provider,
       'partyClass': this._partyClass,
       'partyCode': this._partyCode,
       'partyName': this._partyName,
       'description': this._description,
       'partyId': this._partyId,
        };
    } 

}