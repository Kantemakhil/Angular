import { BaseModel } from '@commonbeans/BaseModel';
export class IntLocUsageLocations extends BaseModel {

    private _internalLocationId: number;
    private _internalLocationUsageId: number;
    private _capacity: number;
    private _usageLocationType: string;
    private _createDateTime: Date;
    private _modifyDateTime: Date;
    private _createUserId: string;
    private _modifyUserId: string;
    private _listSeq: number;
    private _usageLocationId: number;
    private _parentUsageLocationId: number;
    private _sealFlag: string;
    private _canDisplay: boolean;
    private _locCode: string;
    private _locDescription: string;
    private _userDescription: string;
    private _agylocButton: string;
    private _tabIndex: number;

    get tabIndex(): number { return this._tabIndex; }

    set tabIndex(ptabIndex: number) { this._tabIndex = ptabIndex; }

    get agylocButton(): string { return this._agylocButton; }

    set agylocButton(pagylocButton: string) { this._agylocButton = pagylocButton; }

    get locCode(): string { return this._locCode; }

    set locCode(plocCode: string) { this._locCode = plocCode; }

    get locDescription(): string { return this._locDescription; }

    set locDescription(plocDescription: string) { this._locDescription = plocDescription; }

    get userDescription(): string { return this._userDescription; }

    set userDescription(puserDescription: string) { this._userDescription = puserDescription; }

    get internalLocationId(): number { return this._internalLocationId; }

    set internalLocationId(pinternalLocationId: number) { this._internalLocationId = pinternalLocationId; }

    get internalLocationUsageId(): number { return this._internalLocationUsageId; }

    set internalLocationUsageId(pinternalLocationUsageId: number) { this._internalLocationUsageId = pinternalLocationUsageId; }

    get capacity(): number { return this._capacity; }

    set capacity(pcapacity: number) { this._capacity = pcapacity; }

    get usageLocationType(): string { return this._usageLocationType; }

    set usageLocationType(pusageLocationType: string) { this._usageLocationType = pusageLocationType; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get usageLocationId(): number { return this._usageLocationId; }

    set usageLocationId(pusageLocationId: number) { this._usageLocationId = pusageLocationId; }

    get parentUsageLocationId(): number { return this._parentUsageLocationId; }

    set parentUsageLocationId(pparentUsageLocationId: number) { this._parentUsageLocationId = pparentUsageLocationId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get canDisplay(): boolean { return this._canDisplay; }

    set canDisplay(pcanDisplay: boolean) { this._canDisplay = pcanDisplay; }



    toJSON(): any {
        return {
            'internalLocationId': this._internalLocationId,
            'internalLocationUsageId': this._internalLocationUsageId,
            'capacity': this._capacity,
            'usageLocationType': this._usageLocationType,
            'modifyUserId': this._modifyUserId,
            'createDateTime': this._createDateTime,
            'modifyDateTime': this._modifyDateTime,
            'createUserId': this._createUserId,
            'listSeq': this._listSeq,
            'usageLocationId': this._usageLocationId,
            'parentUsageLocationId': this._parentUsageLocationId,
            'sealFlag': this._sealFlag,
            'canDisplay': this._canDisplay,
            'userDescription': this._userDescription,
            'locDescription': this._locDescription,
            'locCode': this._locCode,
            'agylocButton': this._agylocButton,
            'tabIndex': this._tabIndex
        };
    }
}
