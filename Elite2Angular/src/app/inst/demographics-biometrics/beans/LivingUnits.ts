import { BaseModel } from '@commonbeans/BaseModel';

export class LivingUnits extends BaseModel {
    private _acaCapRating: number;
    private _activeFlag: string;
    private _agyLocId: string;
    private _facilityAgyLocId: string;
    private _capacity: number;
    private _certifiedFlag: string;
    private _cnaNo: number;
    private _commentText: string;
    private _controlActiveFlag: string;
    private _deactivateDate: Date;
    private _deactivateReasonCode: string;
    private _description: string;
    private _housingUnitType: string;
    private _level1Code: string;
    private _level2Code: string;
    private _level3Code: string;
    private _level4Code: string;
    private _listSeq: number;
    private _livingUnitCode: string;
    private _livingUnitId: number;
    private _livingUnitType: string;
    private _lowestLevelFlag: string;
    private _noOfOccupant: number;
    private _operationCapacity: number;
    private _parentLivingUnitId: number;
    private _reachOperCapacityFlag: string;
    private _reactivateDate: Date;
    private _securityLevelCode: string;
    private _userDesc: string;
    private _availableLocation: string;
    private _occupied: number;
    private _available: number;
    private _atoperationCapacity: string;
    private _offenderConflict: string;
    private _securityConflict: string;
    private _cellsharingConflict: string;
    private _code: string;
    private _agencyImlId: number;
    private _stgId: number;
    private _luType: string;
    private _deactivateReasonCodeTemp: string;
    private _selectFlag: string;
    get stgId(): number { return this._stgId; }

    set stgId(pstgId: number) { this._stgId = pstgId; }

    get atoperationCapacity(): string { return this._atoperationCapacity; }

    set atoperationCapacity(patoperationCapacity: string) { this._atoperationCapacity = patoperationCapacity; }

    get offenderConflict(): string { return this._offenderConflict; }

    set offenderConflict(poffenderConflict: string) { this._offenderConflict = poffenderConflict; }

    get securityConflict(): string { return this._securityConflict; }

    set securityConflict(psecurityConflict: string) { this._securityConflict = psecurityConflict; }

    get cellsharingConflict(): string { return this._cellsharingConflict; }

    set cellsharingConflict(pcellsharingConflict: string) { this._cellsharingConflict = pcellsharingConflict; }

    get occupied(): number { return this._occupied; }

    set occupied(poccupied: number) { this._occupied = poccupied; }

    get available(): number { return this._available; }

    set available(pavailable: number) { this._available = pavailable; }

    get acaCapRating(): number { return this._acaCapRating; }

    set acaCapRating(pacaCapRating: number) { this._acaCapRating = pacaCapRating; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    
    get facilityAgyLocId(): string { return this._facilityAgyLocId; }

    set facilityAgyLocId(pfacilityAgyLocId: string) { this._facilityAgyLocId = pfacilityAgyLocId; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get capacity(): number { return this._capacity; }

    set capacity(pcapacity: number) { this._capacity = pcapacity; }


    get certifiedFlag(): string { return this._certifiedFlag; }

    set certifiedFlag(pcertifiedFlag: string) { this._certifiedFlag = pcertifiedFlag; }

    get cnaNo(): number { return this._cnaNo; }

    set cnaNo(pcnaNo: number) { this._cnaNo = pcnaNo; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get controlActiveFlag(): string { return this._controlActiveFlag; }

    set controlActiveFlag(pcontrolActiveFlag: string) { this._controlActiveFlag = pcontrolActiveFlag; }

    get deactivateDate(): Date { return this._deactivateDate; }

    set deactivateDate(pdeactivateDate: Date) { this._deactivateDate = pdeactivateDate; }

    get deactivateReasonCode(): string { return this._deactivateReasonCode; }

    set deactivateReasonCode(pdeactivateReasonCode: string) { this._deactivateReasonCode = pdeactivateReasonCode; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get housingUnitType(): string { return this._housingUnitType; }

    set housingUnitType(phousingUnitType: string) { this._housingUnitType = phousingUnitType; }

    get level1Code(): string { return this._level1Code; }

    set level1Code(plevel1Code: string) { this._level1Code = plevel1Code; }

    get level2Code(): string { return this._level2Code; }

    set level2Code(plevel2Code: string) { this._level2Code = plevel2Code; }

    get level3Code(): string { return this._level3Code; }

    set level3Code(plevel3Code: string) { this._level3Code = plevel3Code; }

    get level4Code(): string { return this._level4Code; }

    set level4Code(plevel4Code: string) { this._level4Code = plevel4Code; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get livingUnitCode(): string { return this._livingUnitCode; }

    set livingUnitCode(plivingUnitCode: string) { this._livingUnitCode = plivingUnitCode; }

    get livingUnitId(): number { return this._livingUnitId; }

    set livingUnitId(plivingUnitId: number) { this._livingUnitId = plivingUnitId; }

    get livingUnitType(): string { return this._livingUnitType; }

    set livingUnitType(plivingUnitType: string) { this._livingUnitType = plivingUnitType; }

    get lowestLevelFlag(): string { return this._lowestLevelFlag; }

    set lowestLevelFlag(plowestLevelFlag: string) { this._securityLevelCode = plowestLevelFlag; }

    get noOfOccupant(): number { return this._noOfOccupant; }

    set noOfOccupant(pnoOfOccupant: number) { this._noOfOccupant = pnoOfOccupant; }

    get operationCapacity(): number { return this._parentLivingUnitId; }

    set operationCapacity(poperationCapacity: number) { this._operationCapacity = poperationCapacity; }

    get parentLivingUnitId(): number { return this._parentLivingUnitId; }

    set parentLivingUnitId(pparentLivingUnitId: number) { this._parentLivingUnitId = pparentLivingUnitId; }

    get reachOperCapacityFlag(): string { return this._reachOperCapacityFlag; }

    set reachOperCapacityFlag(preachOperCapacityFlag: string) { this._securityLevelCode = preachOperCapacityFlag; }

    get reactivateDate(): Date { return this._reactivateDate; }

    set reactivateDate(preactivateDate: Date) { this._reactivateDate = preactivateDate; }

    get securityLevelCode(): string { return this._securityLevelCode; }

    set securityLevelCode(psecurityLevelCode: string) { this._securityLevelCode = psecurityLevelCode; }
    get userDesc(): string { return this._userDesc; }

    set userDesc(puserDesc: string) { this._userDesc = puserDesc; }

    get availableLocation(): string { return this._availableLocation; }

    set availableLocation(pavailableLocation: string) { this._availableLocation = pavailableLocation; }

    get code(): string { return this._code; }

    set code(pcode: string) { this._code = pcode; }

    get agencyImlId(): number { return this._agencyImlId; }

    set agencyImlId(pagencyImlId: number) { this._agencyImlId = pagencyImlId; }

    get luType(): string { return this._luType; }

    set luType(pluType: string) { this._luType = pluType; }

    get deactivateReasonCodeTemp(): string { return this._deactivateReasonCodeTemp; }

    set deactivateReasonCodeTemp(pdeactivateReasonCodeTemp: string) { this._deactivateReasonCodeTemp = pdeactivateReasonCodeTemp; }

    get selectFlag(): string { return this._selectFlag; }

    set selectFlag(pactiveFlag: string) { this._selectFlag = pactiveFlag; }
    toJSON(): any {
        return {
            'acaCapRating': this._acaCapRating,
            'activeFlag': this._activeFlag,
            'agyLocId': this._agyLocId,
            'capacity': this._capacity,
            'certifiedFlag': this._certifiedFlag,
            'cnaNo': this._cnaNo,
            'commentText': this._commentText,
            'controlActiveFlag': this._controlActiveFlag,
            'deactivateDate': this._deactivateDate,
            'deactivateReasonCode': this._deactivateReasonCode,
            'description': this._description,
            'housingUnitType': this._housingUnitType,
            'level1Code': this._level1Code,
            'level2Code': this._level2Code,
            'level3Code': this._level3Code,
            'level4Code': this._level4Code,
            'listSeq': this._listSeq,
            'livingUnitCode': this._livingUnitCode,
            'livingUnitId': this._livingUnitId,
            'livingUnitType': this._livingUnitType,
            'lowestLevelFlag': this._lowestLevelFlag,
            'noOfOccupant': this._noOfOccupant,
            'operationCapacity': this._operationCapacity,
            'parentLivingUnitId': this._parentLivingUnitId,
            'reachOperCapacityFlag': this._reachOperCapacityFlag,
            'reactivateDate': this._reactivateDate,
            'securityLevelCode': this._securityLevelCode,
            'userDesc': this._userDesc,
            'availableLocation': this._availableLocation,
            'occupied': this._occupied,
            'available': this._available,
            'atoperationCapacity': this._atoperationCapacity,
            'offenderConflict': this._offenderConflict,
            'securityConflict': this._securityConflict,
            'cellsharingConflict': this._cellsharingConflict,
            'code': this._code,
            'agencyImlId': this._agencyImlId,
            'stgId': this._stgId,
            'luType': this._luType,
            'facilityAgyLocId':this._facilityAgyLocId,
            'deactivateReasonCodeTemp': this._deactivateReasonCodeTemp,
            'selectFlag': this._selectFlag,

        };
    }

}
