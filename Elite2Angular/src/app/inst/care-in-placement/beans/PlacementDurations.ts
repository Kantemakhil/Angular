import {BaseModel} from '@commonbeans/BaseModel';

export class PlacementDurations extends BaseModel {

    private _placementType: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _durationType: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _expiryDate: Date;
    private _activeFlag: string;
    private _listSeq: number;
    private _sealFlag: string;
    private _maximumDuration: number;
    private _minimumDuration: number;
    private _code: string;
    private _description: string;
    private _canDisplay: boolean;
    private _rowId: string;

    get placementType(): string { return this._placementType; }

    set placementType(pplacementType: string) { this._placementType = pplacementType; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get durationType(): string { return this._durationType; }

    set durationType(pdurationType: string) { this._durationType = pdurationType; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get maximumDuration(): number { return this._maximumDuration; }

    set maximumDuration(pmaximumDuration: number) { this._maximumDuration = pmaximumDuration; }

    get minimumDuration(): number { return this._minimumDuration; }

    set minimumDuration(pminimumDuration: number) { this._minimumDuration = pminimumDuration; }

    get code(): string { return this._code; }

    set code(pcode: string) { this._code = pcode; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get canDisplay(): boolean { return this._canDisplay; }

    set canDisplay( pcanDisplay: boolean ) { this._canDisplay = pcanDisplay; }

    get rowId(): string { return this._rowId; }

	set rowId(prowId: string) { this._rowId = prowId; }
    toJSON(): any {
        return {
             'placementType': this._placementType,
             'createDatetime': this._createDatetime,
             'createUserId': this._createUserId,
             'durationType': this._durationType,
             'modifyDatetime': this._modifyDatetime,
             'modifyUserId': this._modifyUserId,
             'expiryDate': this._expiryDate,
             'activeFlag': this._activeFlag,
             'listSeq': this._listSeq,
             'sealFlag': this._sealFlag,
             'maximumDuration': this._maximumDuration,
             'minimumDuration': this._minimumDuration,
             'code': this._code,
             'description': this._description,
             'canDisplay': this._canDisplay,
             'rowId': this._rowId,
        };


    }
}
