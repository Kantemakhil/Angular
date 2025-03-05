export class ProgramServicesProfiles {
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _programProfileType: string;
    private _modifyDatetime: Date;
    private _programProfileCode: string;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _programId: number;
    private _returnValue: number;
    private _profileGenderCode: string;
    private _profileEtiCityCode: string;
    private _profileAgeRangeCode: string;
    private _profileFacilityCode: string;
    private _profileInGroupCode: string;
    private _profileExGroupCode: string;
    private _pCode: string;
    private _pType: string;
    private _serverCode: number;
    private _checkFlag: string;

    get checkFlag(): string { return this._checkFlag; }
    set checkFlag(pcheckFlag: string) { this._checkFlag = pcheckFlag ; }
    get serverCode(): number{ return this._serverCode; }
    set serverCode(pserverCode: number) { this._serverCode = pserverCode; }
    get pCode(): string { return this._pCode; }
    set pCode(ppCode: string) { this._pCode = ppCode ; }
    get pType(): string { return this._pType; }
    set pType(ppType: string) { this._pType = ppType ; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime ; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID ; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId ; }
    get programProfileType(): string { return this._programProfileType; }
    set programProfileType(pprogramProfileType: string) { this._programProfileType = pprogramProfileType ; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime ; }
    get programProfileCode(): string { return this._programProfileCode; }
    set programProfileCode(pprogramProfileCode: string) { this._programProfileCode = pprogramProfileCode ; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId ; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag ; }
    get programId(): number { return this._programId; }
    set programId(pprogramId: number) { this._programId = pprogramId ; }

    get profileGenderCode(): string { return this._profileGenderCode; }
    set profileGenderCode(pprofileGenderCode: string) { this._profileGenderCode = pprofileGenderCode ; }
    get profileEtiCityCode(): string { return this._profileEtiCityCode; }
    set profileEtiCityCode(pprofileEtiCityCode: string) { this._profileEtiCityCode = pprofileEtiCityCode ; }
    get profileAgeRangeCode(): string { return this._profileAgeRangeCode; }
    set profileAgeRangeCode(pprofileAgeRangeCode: string) { this._profileAgeRangeCode = pprofileAgeRangeCode ; }
    get profileFacilityCode(): string { return this._profileFacilityCode; }
    set profileFacilityCode(pprofileFacilityCode: string) { this._profileFacilityCode = pprofileFacilityCode ; }
    get profileInGroupCode(): string { return this._profileInGroupCode; }
    set profileInGroupCode(pprofileInGroupCode: string) { this._profileInGroupCode = pprofileInGroupCode ; }
    get profileExGroupCode(): string { return this._profileExGroupCode; }
    set profileExGroupCode(pprofileExGroupCode: string) { this._profileExGroupCode = pprofileExGroupCode ; }
    get returnValue(): number { return this._returnValue; }
    set returnValue(preturnValue: number) { this._returnValue = preturnValue ; }
toJSON(): any {
    return {
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'createUserId': this._createUserId,
       'programProfileType': this._programProfileType,
       'modifyDatetime': this._modifyDatetime,
       'programProfileCode': this._programProfileCode,
       'modifyUserId': this._modifyUserId,
       'sealFlag': this._sealFlag,
       'programId': this._programId,
       'profileGenderCode': this._profileGenderCode,
       'profileEtiCityCode': this._profileEtiCityCode,
       'profileAgeRangeCode': this._profileAgeRangeCode,
       'profileFacilityCode': this._profileFacilityCode,
       'profileInGroupCode': this._profileInGroupCode,
       'profileExGroupCode': this._profileExGroupCode,
       'returnValue' : this._returnValue,
       'pType' : this._pType,
       'pCode' : this._pCode,
       'serverCode': this._serverCode,
       'checkFlag': this._checkFlag
        };
    }
}
