import {BaseModel} from '@commonbeans/BaseModel';

export class AgencyLocations extends BaseModel {
    private  _agyLocId: string;
    private  _description: string;
    private  _agencyLocationType: string;
    private  _districtCode: string;
    private  _abbreviation: string;
    private  _deactivationDate: Date;
    private  _contactName: string;
    private  _printQueue: string;
    private  _jurisdictionCode: string;
    private  _bailOfficeFlag: string;
    private  _housingLev1Code: string;
    private  _housingLev2Code: string;
    private  _housingLev3Code: string;
    private  _housingLev4Code: string;
    private  _propertyLev1Code: string;
    private  _propertyLev2Code: string;
    private  _propertyLev3Code: string;
    private  _lastBookingNo: number;
    private  _commissaryPrivilege: string;
    private  _businessHours: string;
    private  _addressType: string;
    private  _activeFlag : string;
    private  _disabilityAccessCode: string;
    private  _intakeFlag: string;
    private  _subAreaCode: string;
    private  _areaCode: string;
    private  _nomsRegionCode: string;
    private  _geographicRegionCode: string;
    private  _justiceAreaCode: string;
    private  _createDateTime: Date;
    private  _createUserId: string;
    private  _modifyDateTime: Date;
    private  _modifyUserId: string;
    private  _longDescription: string;
    private  _labcorpClientId: string;
    private  _sealFlag: string;
    private  _inserted: boolean;
    private _listSeq: number;
    private _canDisplay: boolean;
    private _caseloadId: string;
    private _staffId: number;
    private _tempSubAreaCode: string;
    private _tempAreaCode: string;
    private _tempNomsRegionCode: string;
    private _tempGeographicRegionCode: string;



    get staffId(): number { return this._staffId; }

set staffId(pstaffId: number){ this._staffId = pstaffId; }

get agyLocId(): string { return this._agyLocId; }

set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId; }

get description(): string { return this._description; }

set description(pdescription: string){ this._description = pdescription; }

get agencyLocationType(): string { return this._agencyLocationType; }

set agencyLocationType(pagencyLocationType: string){ this._agencyLocationType = pagencyLocationType; }

get districtCode(): string { return this._districtCode; }

set districtCode(pdistrictCode: string){ this._districtCode = pdistrictCode; }

get abbreviation(): string { return this._abbreviation; }

set abbreviation(pabbreviation: string){ this._abbreviation = pabbreviation; }

get deactivationDate(): Date { return this._deactivationDate; }

set deactivationDate(pdeactivationDate: Date){ this._deactivationDate = pdeactivationDate; }

get contactName(): string { return this._contactName; }

set contactName(pcontactName: string){ this._contactName = pcontactName; }

get printQueue(): string { return this._printQueue; }

set printQueue(pprintQueue: string){ this._printQueue = pprintQueue; }

get jurisdictionCode(): string { return this._jurisdictionCode; }

set jurisdictionCode(pjurisdictionCode: string){ this._jurisdictionCode = pjurisdictionCode; }

get bailOfficeFlag(): string { return this._bailOfficeFlag; }

set bailOfficeFlag(pbailOfficeFlag: string){ this._bailOfficeFlag = pbailOfficeFlag; }

get housingLev1Code(): string { return this._housingLev1Code; }

set housingLev1Code(phousingLev1Code: string){ this._housingLev1Code = phousingLev1Code; }

get housingLev2Code(): string { return this._housingLev2Code; }

set housingLev2Code(phousingLev2Code: string){ this._housingLev2Code = phousingLev2Code; }

get housingLev3Code(): string { return this._housingLev3Code; }

set housingLev3Code(phousingLev3Code: string){ this._housingLev3Code = phousingLev3Code; }

get housingLev4Code(): string { return this._housingLev4Code; }

set housingLev4Code(phousingLev4Code: string){ this._housingLev4Code = phousingLev4Code; }

get propertyLev1Code(): string { return this._propertyLev1Code; }

set propertyLev1Code(ppropertyLev1Code: string){ this._propertyLev1Code = ppropertyLev1Code; }

get propertyLev2Code(): string { return this._propertyLev2Code; }

set propertyLev2Code(ppropertyLev2Code: string){ this._propertyLev2Code = ppropertyLev2Code; }

get propertyLev3Code(): string { return this._propertyLev3Code; }

set propertyLev3Code(ppropertyLev3Code: string){ this._propertyLev3Code = ppropertyLev3Code; }

get businessHours(): string { return this._businessHours; }

set businessHours(pbusinessHours: string){ this._businessHours = pbusinessHours; }

get addressType(): string { return this._addressType; }

set addressType(paddressType: string){ this._addressType = paddressType; }

get activeFlag(): string { return this._activeFlag; }

set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag; }

get lastBookingNo(): number { return this._lastBookingNo; }

set lastBookingNo(plastBookingNo: number){ this._lastBookingNo = plastBookingNo; }

get commissaryPrivilege(): string { return this._commissaryPrivilege; }

set commissaryPrivilege(pcommissaryPrivilege: string){ this._commissaryPrivilege = pcommissaryPrivilege; }

get disabilityAccessCode(): string { return this._disabilityAccessCode; }

set disabilityAccessCode(pdisabilityAccessCode: string){ this._disabilityAccessCode = pdisabilityAccessCode; }

get intakeFlag(): string { return this._intakeFlag; }

set intakeFlag(pintakeFlag: string){ this._intakeFlag = pintakeFlag; }

get subAreaCode(): string { return this._subAreaCode; }

set subAreaCode(psubAreaCode: string){ this._subAreaCode = psubAreaCode; }

get areaCode(): string { return this._areaCode; }

set areaCode(pareaCode: string){ this._areaCode = pareaCode; }

get nomsRegionCode(): string { return this._nomsRegionCode; }

set nomsRegionCode(pnomsRegionCode: string){ this._nomsRegionCode = pnomsRegionCode; }

get geographicRegionCode(): string { return this._geographicRegionCode; }

set geographicRegionCode(pgeographicRegionCode: string){ this._geographicRegionCode = pgeographicRegionCode; }

get justiceAreaCode(): string { return this._justiceAreaCode; }

set justiceAreaCode(pjusticeAreaCode: string){ this._justiceAreaCode = pjusticeAreaCode; }

get createDateTime(): Date { return this._createDateTime; }

set createDateTime(pcreateDateTime: Date){ this._createDateTime = pcreateDateTime; }

get createUserId(): string { return this._createUserId; }

set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }

get modifyDateTime(): Date { return this._modifyDateTime; }

set modifyDateTime(pmodifyDateTime: Date){ this._modifyDateTime = pmodifyDateTime; }

get modifyUserId(): string { return this._modifyUserId; }

set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

get longDescription(): string { return this._longDescription; }

set longDescription(plongDescription: string){ this._longDescription = plongDescription; }

get labcorpClientId(): string { return this._labcorpClientId; }

set labcorpClientId(plabcorpClientId: string){ this._labcorpClientId = plabcorpClientId; }

get sealFlag(): string { return this._sealFlag; }

set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }

get inserted(): boolean { return this._inserted; }

set inserted(pinserted: boolean){ this._inserted = pinserted; }

get listSeq(): number { return this._listSeq; }

set listSeq( plistSeq: number ) { this._listSeq = plistSeq; }

get canDisplay(): boolean { return this._canDisplay; }

set canDisplay( pcanDisplay: boolean ) { this._canDisplay = pcanDisplay; }

get caseloadId(): string { return this._caseloadId; }

set caseloadId( pcaseloadId: string ) { this._caseloadId = pcaseloadId; }

get tempSubAreaCode(): string { return this._tempSubAreaCode; }

set tempSubAreaCode( ptempSubAreaCode: string ) { this._tempSubAreaCode = ptempSubAreaCode; }


get tempAreaCode(): string { return this._tempAreaCode; }

set tempAreaCode( ptempAreaCode: string ) { this._tempAreaCode = ptempAreaCode; }

get tempNomsRegionCode(): string { return this._tempNomsRegionCode; }

set tempNomsRegionCode( ptempNomsRegionCode: string ) { this._tempNomsRegionCode = ptempNomsRegionCode; }

get tempGeographicRegionCode(): string { return this._tempGeographicRegionCode; }

set tempGeographicRegionCode( ptempGeographicRegionCode: string ) { this._tempGeographicRegionCode = ptempGeographicRegionCode; }

toJSON(): any {
    return {
        'agyLocId': this._agyLocId,
        'description': this._description,
        'agencyLocationType': this._agencyLocationType,
        'districtCode': this._districtCode,
        'abbreviation': this._abbreviation,
        'deactivationDate': this._deactivationDate,
        'contactName': this._contactName,
        'printQueue': this._printQueue,
        'jurisdictionCode': this._jurisdictionCode,
        'bailOfficeFlag': this._bailOfficeFlag,
        'housingLev1Code': this._housingLev1Code,
        'housingLev2Code': this._housingLev2Code,
        'housingLev3Code': this._housingLev3Code,
        'housingLev4Code': this._housingLev4Code,
        'propertyLev1Code': this._propertyLev1Code,
        'propertyLev2Code': this._propertyLev2Code,
        'propertyLev3Code': this._propertyLev3Code,
        'lastBookingNo': this._lastBookingNo,
        'commissaryPrivilege': this._commissaryPrivilege,
        'businessHours': this._businessHours,
        'addressType': this._addressType,
        'activeFlag': this._activeFlag,
        'disabilityAccessCode': this._disabilityAccessCode,
        'intakeFlag': this._intakeFlag,
        'subAreaCode': this._subAreaCode,
        'areaCode': this._areaCode,
        'nomsRegionCode': this._nomsRegionCode,
        'geographicRegionCode': this._geographicRegionCode,
        'justiceAreaCode': this._justiceAreaCode,
        'createDateTime': this._createDateTime,
        'createUserId': this._createUserId,
        'modifyDateTime': this._modifyDateTime,
        'modifyUserId': this._modifyUserId,
        'longDescription': this._longDescription,
        'labcorpClientId': this._labcorpClientId,
        'sealFlag': this._sealFlag,
        'inserted': this._inserted,
        'listSeq': this._listSeq,
        'canDisplay': this._canDisplay,
        'caseloadId': this._caseloadId,
        'staffId': this._staffId,
        'tempSubAreaCode': this._tempSubAreaCode,
        'tempAreaCode': this._tempAreaCode,
        'tempNomsRegionCode': this._tempNomsRegionCode,
        'tempGeographicRegionCode': this._tempGeographicRegionCode,

    };
}
}

