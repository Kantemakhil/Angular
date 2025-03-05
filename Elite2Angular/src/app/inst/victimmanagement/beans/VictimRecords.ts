export class VictimRecords {

    private _note: string;
    private _createUserId: string;
    private _gender: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _registeredDatetime: Date;
    private _createDatetime: Date;
    private _personName: string;
    private _preferredContactMethod: string;
    private _personId: number;
    private _sealFlag: string;
    private _age: number;
    private _victimId: number;
    private _activeFlag: string;
    private _deactivatedDatetime: Date;
    private _sex: string;
    private _name: string;
    private _noteTextTemp: string;

    get note(): string{ return this._note; }
    set note(pnote: string){ this._note = pnote ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get gender(): string{ return this._gender; }
    set gender(pgender: string){ this._gender = pgender ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get registeredDatetime(): Date{ return this._registeredDatetime; }
    set registeredDatetime(pregisteredDatetime: Date){ this._registeredDatetime = pregisteredDatetime ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get personName(): string{ return this._personName; }
    set personName(ppersonName: string){ this._personName = ppersonName ;}
    get preferredContactMethod(): string{ return this._preferredContactMethod; }
    set preferredContactMethod(ppreferredContactMethod: string){ this._preferredContactMethod = ppreferredContactMethod ;}
    get personId(): number{ return this._personId; }
    set personId(ppersonId: number){ this._personId = ppersonId ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get age(): number{ return this._age; }
    set age(page: number){ this._age = page ;}
    get victimId(): number{ return this._victimId; }
    set victimId(pvictimId: number){ this._victimId = pvictimId ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
    get deactivatedDatetime(): Date{ return this._deactivatedDatetime; }
    set deactivatedDatetime(pdeactivatedDatetime: Date){ this._deactivatedDatetime = pdeactivatedDatetime ;}
    get sex(): string { return this._sex; }
    set sex(value: string) { this._sex = value; }
    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }
    get noteTextTemp(): string{ return this._noteTextTemp; }
    set noteTextTemp(pnoteTextTemp: string){ this._noteTextTemp = pnoteTextTemp;}

toJSON(): any {
    return { 
       'note': this._note,
       'noteTextTemp': this._noteTextTemp,
       'createUserId': this._createUserId,
       'gender': this._gender,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'registeredDatetime': this._registeredDatetime,
       'createDatetime': this._createDatetime,
       'personName': this._personName,
       'preferredContactMethod': this._preferredContactMethod,
       'personId': this._personId,
       'sealFlag': this._sealFlag,
       'age': this._age,
       'victimId': this._victimId,
       'activeFlag': this._activeFlag,
       'deactivatedDatetime': this._deactivatedDatetime,
       'sex': this._sex,
       'name': this._name,
        };
    } 

}