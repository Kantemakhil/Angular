import { BaseModel} from '@commonbeans/BaseModel';
  export class Persons extends BaseModel {
          private _lastName: string;
          private _remitterFlag: string;
          private _createUserId: string;
          private _middleNameKey: string;
          private _birthdate: Date;
          private _modifyDatetime: Date;
          private _modifyUserId: string;
          private _nameType: string;
          private _birthPlace: string;
          private _serialVersionUID: number;
          private _criminalHistoryText: string;
          private _employer: string;
          private _sealFlag: string;
          private _coronerNumber: string;
          private _staffFlag: string;
          private _lastNameSoundex: string;
          private _citizenship: string;
          private _sex: string;
          private _languageCode: string;
          private _firstNameKey: string;
          private _lastNameKey: string;
          private _createDatetime: Date;
          private _firstName: string;
          private _suspendedFlag: string;
          private _careOf: string;
          private _occupationCode: string;
          private _primaryLanguageCode: string;
          private _attention: string;
          private _profileCode: string;
          private _personId: number;
          private _aliasPersonId: number;
          private _middleName: string;
          private _interpreterRequired: string;
          private _suspendedDate: Date;
          private _deceasedDate: Date;
          private _maritalStatus: string;
          private _memoText: string;
          private _comprehendEnglishFlag: string;
          private _globalCaseloadId: string;
          private _streetInformation: string;
          private _suiteNumber: string;
          private _zipPostalCode: string;
          private _cityDesc: string;
          private _stateDesc: string;
          private _countryDesc: string;
          private _rootPersonId: number;
          private _secondMiddleName: string;
          private _sexDescription: string;
          private _title: string;
          private _gender: string;
          private _notes: string;
          private _pinValue: string;
          private _pIdentifierType: string;
          private _pIdentifierValue: string;
          private _pninValue: string;



          get lastName(): string { return  this._lastName; }

          set lastName(plastName: string) { this._lastName = plastName; }

          get remitterFlag(): string { return  this._remitterFlag; }

          set remitterFlag(premitterFlag: string) { this._remitterFlag = premitterFlag; }

          get createUserId(): string { return  this._createUserId; }

          set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

          get middleNameKey(): string { return  this._middleNameKey; }

          set middleNameKey(pmiddleNameKey: string) { this._middleNameKey = pmiddleNameKey; }

          get birthdate(): Date { return  this._birthdate; }

          set birthdate(pbirthdate: Date) { this._birthdate = pbirthdate; }

          get modifyDatetime(): Date { return  this._modifyDatetime; }

          set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

          get modifyUserId(): string { return  this._modifyUserId; }

          set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

          get nameType(): string { return  this._nameType; }

          set nameType(pnameType: string) { this._nameType = pnameType; }

          get birthPlace(): string { return  this._birthPlace; }

          set birthPlace(pbirthPlace: string) { this._birthPlace = pbirthPlace; }

          get serialVersionUID(): number { return  this._serialVersionUID; }

          set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

          get criminalHistoryText(): string { return  this._criminalHistoryText; }

          set criminalHistoryText(pcriminalHistoryText: string) { this._criminalHistoryText = pcriminalHistoryText; }

          get employer(): string { return  this._employer; }

          set employer(pemployer: string) { this._employer = pemployer; }

          get sealFlag(): string { return  this._sealFlag; }

          set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

          get coronerNumber(): string { return  this._coronerNumber; }

          set coronerNumber(pcoronerNumber: string) { this._coronerNumber = pcoronerNumber; }

          get staffFlag(): string { return  this._staffFlag; }

          set staffFlag(pstaffFlag: string) { this._staffFlag = pstaffFlag; }

          get lastNameSoundex(): string { return  this._lastNameSoundex; }

          set lastNameSoundex(plastNameSoundex: string) { this._lastNameSoundex = plastNameSoundex; }

          get citizenship(): string { return  this._citizenship; }

          set citizenship(pcitizenship: string) { this._citizenship = pcitizenship; }

          get sex(): string { return  this._sex; }

          set sex(psex: string) { this._sex = psex; }

          get languageCode(): string { return  this._languageCode; }

          set languageCode(planguageCode: string) { this._languageCode = planguageCode; }

          get firstNameKey(): string { return  this._firstNameKey; }

          set firstNameKey(pfirstNameKey: string) { this._firstNameKey = pfirstNameKey; }

          get lastNameKey(): string { return  this._lastNameKey; }

          set lastNameKey(plastNameKey: string) { this._lastNameKey = plastNameKey; }

          get createDatetime(): Date { return  this._createDatetime; }

          set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

          get firstName(): string { return  this._firstName; }

          set firstName(pfirstName: string) { this._firstName = pfirstName; }

          get suspendedFlag(): string { return  this._suspendedFlag; }

          set suspendedFlag(psuspendedFlag: string) { this._suspendedFlag = psuspendedFlag; }

          get careOf(): string { return  this._careOf; }

          set careOf(pcareOf: string) { this._careOf = pcareOf; }

          get occupationCode(): string { return  this._occupationCode; }

          set occupationCode(poccupationCode: string) { this._occupationCode = poccupationCode; }

          get primaryLanguageCode(): string { return  this._primaryLanguageCode; }

          set primaryLanguageCode(pprimaryLanguageCode: string) { this._primaryLanguageCode = pprimaryLanguageCode; }

          get attention(): string { return  this._attention; }

          set attention(pattention: string) { this._attention = pattention; }

          get profileCode(): string { return  this._profileCode; }

          set profileCode(pprofileCode: string) { this._profileCode = pprofileCode; }

          get personId(): number { return  this._personId; }

          set personId(ppersonId: number) { this._personId = ppersonId; }

          get aliasPersonId(): number { return  this._aliasPersonId; }

          set aliasPersonId(paliasPersonId: number) { this._aliasPersonId = paliasPersonId; }

          get middleName(): string { return  this._middleName; }

          set middleName(pmiddleName: string) { this._middleName = pmiddleName; }

          get interpreterRequired(): string { return  this._interpreterRequired; }

          set interpreterRequired(pinterpreterRequired: string) { this._interpreterRequired = pinterpreterRequired; }

          get suspendedDate(): Date { return  this._suspendedDate; }

          set suspendedDate(psuspendedDate: Date) { this._suspendedDate = psuspendedDate; }

          get deceasedDate(): Date { return  this._deceasedDate; }

          set deceasedDate(pdeceasedDate: Date) { this._deceasedDate = pdeceasedDate; }

          get maritalStatus(): string { return  this._maritalStatus; }

          set maritalStatus(pmaritalStatus: string) { this._maritalStatus = pmaritalStatus; }

          get memoText(): string { return  this._memoText; }

          set memoText(pmemoText: string) { this._memoText = pmemoText; }

          get comprehendEnglishFlag(): string { return  this._comprehendEnglishFlag; }

          set comprehendEnglishFlag(pcomprehendEnglishFlag: string) { this._comprehendEnglishFlag = pcomprehendEnglishFlag; }

          get globalCaseloadId(): string { return  this._globalCaseloadId; }

          set globalCaseloadId(pglobalCaseloadId: string) { this._globalCaseloadId = pglobalCaseloadId; }

          get streetInformation(): string { return this._streetInformation; }

          set streetInformation(pstreetInformation: string) { this._streetInformation = pstreetInformation; }

          get suiteNumber(): string { return this._suiteNumber; }

          set suiteNumber(psuiteNumber: string) { this._suiteNumber = psuiteNumber; }

          get zipPostalCode(): string { return this._zipPostalCode; }

          set zipPostalCode(pzipPostalCode: string) { this._zipPostalCode = pzipPostalCode; }

          get cityDesc(): string { return this._cityDesc; }

          set cityDesc(pcityDesc: string) { this._cityDesc = pcityDesc; }

          get stateDesc(): string { return this._stateDesc; }

          set stateDesc(pstateDesc: string) { this._stateDesc = pstateDesc; }

          get countryDesc(): string { return this._countryDesc; }

          set countryDesc(pcountryDesc: string) { this._countryDesc = pcountryDesc; }

          get rootPersonId(): number { return  this._rootPersonId; }

          set rootPersonId(prootPersonId: number) { this._rootPersonId = prootPersonId; }

          get secondMiddleName(): string { return this._secondMiddleName; }

          set secondMiddleName(psecondMiddleName: string) { this._secondMiddleName = psecondMiddleName; }

          get sexDescription(): string { return this._sexDescription; }

          set sexDescription(value: string) {this._sexDescription = value;}

          get title(): string {return this._title;}

          set title(value: string) {this._title = value; }

          get gender(): string {return this._gender;}

          set gender(value: string) {this._gender = value;}

          get notes(): string {return this._notes; }
          
          set notes(value: string) {this._notes = value; }

          get pinValue(): string {return this._pinValue;}

          set pinValue(value: string) {this._pinValue = value;}

          get pIdentifierValue(): string {return this._pIdentifierValue;}

          set pIdentifierValue(value: string) {this._pIdentifierValue = value;}

          get pIdentifierType(): string { return this._pIdentifierType;}

          set pIdentifierType(value: string) {this._pIdentifierType = value;}

          get pninValue(): string { return this._pninValue;}

          set pninValue(value: string) {this._pninValue = value;}
    toJSON(): any {
        return {
            'lastName': this._lastName,
            'remitterFlag': this._remitterFlag,
            'createUserId': this._createUserId,
            'middleNameKey': this._middleNameKey,
            'birthdate': this._birthdate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'nameType': this._nameType,
            'birthPlace': this._birthPlace,
            'serialVersionUID': this._serialVersionUID,
            'criminalHistoryText': this._criminalHistoryText,
            'employer': this._employer,
            'sealFlag': this._sealFlag,
            'coronerNumber': this._coronerNumber,
            'staffFlag': this._staffFlag,
            'lastNameSoundex': this._lastNameSoundex,
            'citizenship': this._citizenship,
            'sex': this._sex,
            'languageCode': this._languageCode,
            'firstNameKey': this._firstNameKey,
            'lastNameKey': this._lastNameKey,
            'createDatetime': this._createDatetime,
            'firstName': this._firstName,
            'suspendedFlag': this._suspendedFlag,
            'careOf': this._careOf,
            'occupationCode': this._occupationCode,
            'primaryLanguageCode': this._primaryLanguageCode,
            'attention': this._attention,
            'profileCode': this._profileCode,
            'personId': this._personId,
            'aliasPersonId': this._aliasPersonId,
            'middleName': this._middleName,
            'interpreterRequired': this._interpreterRequired,
            'suspendedDate': this._suspendedDate,
            'deceasedDate': this._deceasedDate,
            'maritalStatus': this._maritalStatus,
            'memoText': this._memoText,
            'comprehendEnglishFlag': this._comprehendEnglishFlag,
            'globalCaseloadId': this._globalCaseloadId,
            'suiteNumber': this._suiteNumber,
            'streetInformation': this._streetInformation,
            'zipPostalCode': this._zipPostalCode,
            'cityDesc': this._cityDesc,
            'stateDesc': this._stateDesc,
            'countryDesc': this._countryDesc,
            'rootPersonId': this._rootPersonId,
            'secondMiddleName': this._secondMiddleName,
            'sexDescription': this._sexDescription,
            'title': this._title,
            'gender': this._gender,
            'notes': this._notes,
            'pinValue': this._pinValue,
            'pIdentifierValue' : this._pIdentifierValue,
            'pIdentifierType': this._pIdentifierType,
            'pninValue': this._pninValue
             };
        }
 }
