import {BaseModel} from './BaseModel';

export class Offenders extends BaseModel {

  private _offenderId: number;
  private _addInfoCode: string;
  private _age: number;
  private _aliasNameType: string;
  private _aliasOffenderId: number;
  private _birthCountryCode: string;
  private _birthCounty: string;
  private _birthDate: Date;
  private _birthPlace: string;
  private _birthState: string;
  private _caseloadType: string;
  private _createDate: Date;
  private _createDateTime: Date;
  private _createUserId: string;
  private _firstName: string;
  private _firstNameKey: string;
  private _idSourceCode: string;
  private _lastName: string;
  private _lastNameAlphaKey: string;
  private _lastNameKey: string;
  private _lastNameSoundex: string;
  private _middleName: string;
  private _middleName2: string;
  private _middleNameKey: string;
  private _modifyDateTime: Date;
  private _modifyUserId: string;
  private _nameSequence: string;
  private _nameType: string;
  private _offenderIdDisplay: string;
  private _offenderNameSeq: number;
  private _parentOffenderId: number;
  private _raceCode: string;
  private _remarkCode: string;
  private _rootOffenderId: number;
  private _sealFlag: string;
  private _sexCode: string;
  private _suffix: string;
  private _suspendedDate: Date;
  private _suspendedFlag: string;
  private _title: string;
  private _uniqueObligationFlag: string;
  private _userDisplay: string;
  private _aliasColEditCheck: Boolean = false;
  private _lastNameDisable: boolean;
  private _firstNameDisable: boolean;
  private _middleNameDisable: boolean;
  private _birthDateDisable: boolean;
  private _ageDisable: boolean;
  private _aliasEditCheckDisable: boolean;
  private _genderCode: string;
  private _secondMiddleName: string;
  private _personId: number;
  private _persAddNameId: number;
  private _sexCodeDesc: string;
   



    get aliasColEditCheck(): Boolean { return this._aliasColEditCheck; }

    set aliasColEditCheck(paliasColEditCheck: Boolean){ this._aliasColEditCheck = paliasColEditCheck; }

    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number){ this._offenderId = poffenderId; }

    get addInfoCode(): string { return this._addInfoCode; }

    set addInfoCode(paddInfoCode: string){ this._addInfoCode = paddInfoCode; }

    get age(): number { return this._age; }

    set age(page: number){ this._age = page; }

    get aliasNameType(): string { return this._aliasNameType; }

    set aliasNameType(paliasNameType: string){ this._aliasNameType = paliasNameType; }

    get aliasOffenderId(): number { return this._aliasOffenderId; }

    set aliasOffenderId(paliasOffenderId: number){ this._aliasOffenderId = paliasOffenderId; }

    get birthCountryCode(): string { return this._birthCountryCode; }

    set birthCountryCode(pbirthCountryCode: string){ this._birthCountryCode = pbirthCountryCode; }

    get birthCounty(): string { return this._birthCounty; }

    set birthCounty(pbirthCounty: string){ this._birthCounty = pbirthCounty; }

    get birthDate(): Date { return this._birthDate; }

    set birthDate(pbirthDate: Date){ this._birthDate = pbirthDate; }

    get birthPlace(): string { return this._birthPlace; }

    set birthPlace(pbirthPlace: string){ this._birthPlace = pbirthPlace; }

    get birthState(): string { return this._birthState; }

    set birthState(pbirthState: string){ this._birthState = pbirthState; }

    get caseloadType(): string { return this._caseloadType; }

    set caseloadType(pcaseloadType: string){ this._caseloadType = pcaseloadType; }

    get createDate(): Date { return this._createDate; }

    set createDate(pcreateDate: Date){ this._createDate = pcreateDate; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime(pcreateDateTime: Date){ this._createDateTime = pcreateDateTime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }

    get firstName(): string { return this._firstName; }

    set firstName(pfirstName: string){ this._firstName = pfirstName; }

    get firstNameKey(): string { return this._firstNameKey; }

    set firstNameKey(pfirstNameKey: string){ this._firstNameKey = pfirstNameKey; }

    get idSourceCode(): string { return this._idSourceCode; }

    set idSourceCode(pidSourceCode: string){ this._idSourceCode = pidSourceCode; }

    get lastName(): string { return this._lastName; }

    set lastName(plastName: string){ this._lastName = plastName; }

    get lastNameAlphaKey(): string { return this._lastNameAlphaKey; }

    set lastNameAlphaKey(plastNameAlphaKey: string){ this._lastNameAlphaKey = plastNameAlphaKey; }

    get lastNameKey(): string { return this._lastNameKey; }

    set lastNameKey(plastNameKey: string){ this._lastNameKey = plastNameKey; }

    get lastNameSoundex(): string { return this._lastNameSoundex; }

    set lastNameSoundex(plastNameSoundex: string){ this._lastNameSoundex = plastNameSoundex; }

    get middleName(): string { return this._middleName; }

    set middleName(pmiddleName: string){ this._middleName = pmiddleName; }

    get middleName2(): string { return this._middleName2; }

    set middleName2(pmiddleName2: string){ this._middleName2 = pmiddleName2; }

    get middleNameKey(): string { return this._middleNameKey; }

    set middleNameKey(pmiddleNameKey: string){ this._middleNameKey = pmiddleNameKey; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime(pmodifyDateTime: Date){ this._modifyDateTime = pmodifyDateTime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

    get nameSequence(): string { return this._nameSequence; }

    set nameSequence(pnameSequence: string){ this._nameSequence = pnameSequence; }

    get nameType(): string { return this._nameType; }

    set nameType(pnameType: string){ this._nameType = pnameType; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay; }

    get offenderNameSeq(): number { return this._offenderNameSeq; }

    set offenderNameSeq(poffenderNameSeq: number){ this._offenderNameSeq = poffenderNameSeq; }

    get parentOffenderId(): number { return this._parentOffenderId; }

    set parentOffenderId(pparentOffenderId: number){ this._parentOffenderId = pparentOffenderId; }

    get raceCode(): string { return this._raceCode; }

    set raceCode(praceCode: string){ this._raceCode = praceCode; }

    get remarkCode(): string { return this._remarkCode; }

    set remarkCode(premarkCode: string){ this._remarkCode = premarkCode; }

    get rootOffenderId(): number { return this._rootOffenderId; }

    set rootOffenderId(prootOffenderId: number){ this._rootOffenderId = prootOffenderId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }

    get sexCode(): string { return this._sexCode; }

    set sexCode(psexCode: string){ this._sexCode = psexCode; }

    get suffix(): string { return this._suffix; }

    set suffix(psuffix: string){ this._suffix = psuffix; }

    get suspendedDate(): Date { return this._suspendedDate; }

    set suspendedDate(psuspendedDate: Date){ this._suspendedDate = psuspendedDate; }

    get suspendedFlag(): string { return this._suspendedFlag; }

    set suspendedFlag(psuspendedFlag: string){ this._suspendedFlag = psuspendedFlag; }

    get title(): string { return this._title; }

    set title(ptitle: string){ this._title = ptitle; }



    get userDisplay(): string { return this._userDisplay; }

    set userDisplay(puserDisplay: string){ this._userDisplay = puserDisplay; }

    get uniqueObligationFlag(): string { return this._uniqueObligationFlag; }

    set uniqueObligationFlag(puniqueObligationFlag: string){ this._uniqueObligationFlag = puniqueObligationFlag; }

     get lastNameDisable(): boolean { return this._lastNameDisable; }

    set lastNameDisable(plastNameDisable: boolean){ this._lastNameDisable = plastNameDisable; }

     get firstNameDisable(): boolean { return this._firstNameDisable; }

    set firstNameDisable(pfirstNameDisable: boolean){ this._firstNameDisable = pfirstNameDisable; }

     get middleNameDisable(): boolean { return this._middleNameDisable; }

    set middleNameDisable(pmiddleNameDisable: boolean){ this._middleNameDisable = pmiddleNameDisable; }

     get birthDateDisable(): boolean { return this._birthDateDisable; }

    set birthDateDisable(pbirthDateDisable: boolean){ this._birthDateDisable = pbirthDateDisable; }

    get ageDisable(): boolean { return this._ageDisable; }

    set ageDisable(pageDisable: boolean){ this._ageDisable = pageDisable; }

    get aliasEditCheckDisable(): boolean { return this._aliasEditCheckDisable; }

    set aliasEditCheckDisable(paliasEditCheckDisable: boolean){ this._aliasEditCheckDisable = paliasEditCheckDisable; }

    get genderCode(): string { return this._genderCode; }

    set genderCode(pgenderCode: string){ this._genderCode = pgenderCode; }

    get secondMiddleName(): string { return this._secondMiddleName; }

    set secondMiddleName(psecondMiddleName: string){ this._secondMiddleName = psecondMiddleName; }

    get personId(): number { return this._personId;}

    set personId(value: number) {this._personId = value;}
    
    get persAddNameId(): number { return this._persAddNameId;}

    set persAddNameId(value: number) {this._persAddNameId = value;}

    public get sexCodeDesc(): string {
        return this._sexCodeDesc;
    }
    public set sexCodeDesc(value: string) {
        this._sexCodeDesc = value;
    }
    toJSON(): any {
        return {
            'offenderId': this._offenderId,
            'addInfoCode': this._addInfoCode,
            'age': this._age,
            'aliasOffenderId': this._aliasOffenderId,
            'aliasNameType': this._aliasNameType,
            'birthCountryCode': this._birthCountryCode,
            'birthCounty': this._birthCounty,
            'birthDate': this._birthDate,
            'birthPlace': this._birthPlace,
            'birthState': this._birthState,
            'caseloadType': this._caseloadType,
            'createDate': this._createDate,
            'createDateTime': this._createDateTime,
            'createUserId': this._createUserId,
            'firstName': this._firstName,
            'firstNameKey': this._firstNameKey,
            'idSourceCode': this._idSourceCode,
            'lastName': this._lastName,
            'lastNameAlphaKey': this._lastNameAlphaKey,
            'lastNameKey': this._lastNameKey,
            'lastNameSoundex': this._lastNameSoundex,
            'middleName': this._middleName,
            'middleName2': this._middleName2,
            'middleNameKey': this._middleNameKey,
            'modifyDateTime': this._modifyDateTime,
            'modifyUserId': this._modifyUserId,
            'nameSequence': this._nameSequence,
            'nameType': this._nameType,
            'offenderIdDisplay': this._offenderIdDisplay,
            'offenderNameSeq': this._offenderNameSeq,
            'parentOffenderId': this._parentOffenderId,
            'raceCode': this._raceCode,
            'remarkCode': this._remarkCode,
            'rootOffenderId': this._rootOffenderId,
            'sealFlag': this._sealFlag,
            'sexCode': this._sexCode,
            'suffix': this._suffix,
            'suspendedDate': this._suspendedDate,
            'suspendedFlag': this._suspendedFlag,
            'title': this._title,
            'userDisplay': this._userDisplay,
            'uniqueObligationFlag': this._uniqueObligationFlag,
            'genderCode': this._genderCode,
            'secondMiddleName': this._secondMiddleName,
            'personId' : this._personId,
            'persAddNameId' : this._persAddNameId,
            'sexCodeDesc' : this._sexCodeDesc
        };
    }
}
