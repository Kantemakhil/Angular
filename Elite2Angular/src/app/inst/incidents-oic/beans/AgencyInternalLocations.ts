import { BaseModel } from '@commonbeans/BaseModel';
export class AgencyInternalLocations extends BaseModel {

    private _internalLocationId: number;
    private _internalLocationCode: string;
    private _agyLocId: string;
    private _internalLocationType: number;
    private _description: string;
    private _securityLevelCode: string;
    private _capacity: number;
    private _createUserId: string;
    private _parentInternalLocationId: number;
    private _activeFlag: string;
    private _listSeq: number;
    private _createDateTime: Date;
    private _modifyDateTime: Date;
    private _modifyUserId: string;
    private _cnaNo: number;
    private _certifiedFlag: string;
    private _acaCapRating: number;
    private _deactiveReasonCode: string;
    private _unitType: string;
    private _deactiveDate: Date;
    private _reactiveDate: Date;
    private _commentText: string;
    private _operationCapacity: number;
    private _userDesc: string;
    private _noOfOccupant: number;
    private _trackingFlag: string;
    private _sealFlag: string;
    private _inserted: number;
    private _canDisplay: boolean;
    private _levelCode: string;
    private _internalLocationUsageId: number;
    private _activeFlagData: string;
    private _trackingFlagData: string;
    private _linkedOffenderCount: number;
    private _linkedOffenderCount1: number;
  
    

    get internalLocationUsageId(): number { return this._internalLocationUsageId; }

    set internalLocationUsageId( pinternalLocationUsageId: number ) { this._internalLocationUsageId = pinternalLocationUsageId; }

    get activeFlagData(): string { return this._activeFlagData; }

    set activeFlagData( pactiveFlagData: string ) { this._activeFlagData = pactiveFlagData; }

    get trackingFlagData(): string { return this._trackingFlagData; }

    set trackingFlagData( ptrackingFlagData: string ) { this._trackingFlagData = ptrackingFlagData; }

    get levelCode(): string { return this._levelCode; }

    set levelCode( plevelCode: string ) { this._levelCode = plevelCode; }

    get internalLocationId(): number { return this._internalLocationId; }

    set internalLocationId( pinternalLocationId: number ) { this._internalLocationId = pinternalLocationId; }

    get internalLocationCode(): string { return this._internalLocationCode; }

    set internalLocationCode( pinternalLocationCode: string ) { this._internalLocationCode = pinternalLocationCode; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId( pagyLocId: string ) { this._agyLocId = pagyLocId; }

    get internalLocationType(): number { return this._internalLocationType; }

    set internalLocationType( pinternalLocationType: number ) { this._internalLocationType = pinternalLocationType; }

    get description(): string { return this._description; }

    set description( pdescription: string ) { this._description = pdescription; }

    get securityLevelCode(): string { return this._securityLevelCode; }

    set securityLevelCode( psecurityLevelCode: string ) { this._securityLevelCode = psecurityLevelCode; }


    get capacity(): number { return this._capacity; }

    set capacity( pcapacity: number ) { this._capacity = pcapacity; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag( pactiveFlag: string ) { this._activeFlag = pactiveFlag; }

    get parentInternalLocationId(): number { return this._parentInternalLocationId; }

    set parentInternalLocationId( pparentInternalLocationId: number ) { this._parentInternalLocationId = pparentInternalLocationId; }

    get listSeq(): number { return this._listSeq; }

    set listSeq( plistSeq: number ) { this._listSeq = plistSeq; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime( pcreateDateTime: Date ) { this._createDateTime = pcreateDateTime; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime( pmodifyDateTime: Date ) { this._modifyDateTime = pmodifyDateTime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get cnaNo(): number { return this._cnaNo; }

    set cnaNo( pcnaNo: number ) { this._cnaNo = pcnaNo; }

    get certifiedFlag(): string { return this._certifiedFlag; }

    set certifiedFlag( pcertifiedFlag: string ) { this._certifiedFlag = pcertifiedFlag; }

    get acaCapRating(): number { return this._acaCapRating; }

    set acaCapRating( pacaCapRating: number ) { this._acaCapRating = pacaCapRating; }

    get deactiveReasonCode(): string { return this._deactiveReasonCode; }

    set deactiveReasonCode( pdeactiveReasonCode: string ) { this._deactiveReasonCode = pdeactiveReasonCode; }


    get unitType(): string { return this._unitType; }

    set unitType( punitType: string ) { this._unitType = punitType; }

    get deactiveDate(): Date { return this._deactiveDate; }

    set deactiveDate( pdeactiveDate: Date ) { this._deactiveDate = pdeactiveDate; }

    get reactiveDate(): Date { return this._reactiveDate; }

    set reactiveDate( preactiveDate: Date ) { this._reactiveDate = preactiveDate; }

    get commentText(): string { return this._commentText; }

    set commentText( pcommentText: string ) { this._commentText = pcommentText; }

    get operationCapacity(): number { return this._operationCapacity; }

    set operationCapacity( poperationCapacity: number ) { this._operationCapacity = poperationCapacity; }

    get userDesc(): string { return this._userDesc; }

    set userDesc( puserDesc: string ) { this._userDesc = puserDesc; }

    get noOfOccupant(): number { return this._noOfOccupant; }

    set noOfOccupant( pnoOfOccupant: number ) { this._noOfOccupant = pnoOfOccupant; }

    get trackingFlag(): string { return this._trackingFlag; }

    set trackingFlag( ptrackingFlag: string ) { this._trackingFlag = ptrackingFlag; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get inserted(): number { return this._inserted; }

    set inserted( pinserted: number ) { this._inserted = pinserted; }

    get canDisplay(): boolean { return this._canDisplay; }

    set canDisplay( pcanDisplay: boolean ) { this._canDisplay = pcanDisplay; }
    public get linkedOffenderCount(): number {
        return this._linkedOffenderCount;
    }
    public set linkedOffenderCount(value: number) {
        this._linkedOffenderCount = value;
    }
    public get linkedOffenderCount1(): number {
        return this._linkedOffenderCount1;
    }
    public set linkedOffenderCount1(value: number) {
        this._linkedOffenderCount1 = value;
    }

    toJSON(): any {
        return {
            'internalLocationId': this._internalLocationId,
            'internalLocationCode': this._internalLocationCode,
            'agyLocId': this._agyLocId,
            'internalLocationType': this._internalLocationType,
            'description': this._description,
            'securityLevelCode': this._securityLevelCode,
            'capacity': this._capacity,
            'createUserId': this._createUserId,
            'parentInternalLocationId': this._parentInternalLocationId,
            'activeFlag': this._activeFlag,
            'listSeq': this._listSeq,
            'createDateTime': this._createDateTime,
            'modifyDateTime': this._modifyDateTime,
            'modifyUserId': this._modifyUserId,
            'cnaNo': this._cnaNo,
            'certifiedFlag': this._certifiedFlag,
            'acaCapRating': this._acaCapRating,
            'deactiveReasonCode': this._deactiveReasonCode,
            'unitType': this._unitType,
            'deactiveDate': this._deactiveDate,
            'reactiveDate': this._reactiveDate,
            'commentText': this._commentText,
            'operationCapacity': this._operationCapacity,
            'sealFlag': this._sealFlag,
            'userDesc': this._userDesc,
            'noOfOccupant': this._noOfOccupant,
            'trackingFlag': this._trackingFlag,
            'inserted': this._inserted,
            'canDisplay': this._canDisplay,
            'levelCode': this._levelCode,
            'internalLocationUsageId': this._internalLocationUsageId,
            'activeFlagData': this._activeFlagData,
            'trackingFlagData': this._trackingFlagData,
            'linkedOffenderCount': this._linkedOffenderCount,
            'linkedOffenderCount1': this._linkedOffenderCount1
        };
    }
}
