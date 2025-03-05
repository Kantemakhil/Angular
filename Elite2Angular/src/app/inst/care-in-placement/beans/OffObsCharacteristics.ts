import { BaseModel } from "@common/beans/BaseModel";

export class OffObsCharacteristics extends BaseModel {

    private _agyLocId: string;
	private _frequency: number;
	private _characteristicsCode: string ;
	private _activeFlag: string;
	private _expiryDate: Date;
	private _createDatetime: Date;
	private _placementType: string;
	private _modifyDatetime: Date;
	private _modifyUserId: string;
    private _sealFlag: string;
    private _createUserId: string;
    private _observationType: string;
    

    get observationType(): string { return this._observationType; }

    set observationType(pobservationType: string) { this._observationType = pobservationType; }


    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get characteristicsCode(): string { return this._characteristicsCode; }

    set characteristicsCode(_characteristicsCode: string) { this._characteristicsCode = _characteristicsCode; }

    get frequency(): number { return this._frequency; }

    set frequency(pfrequency: number) { this._frequency = pfrequency; }

    get placementType(): string { return this._placementType; }

    set placementType(pplacementType: string) { this._placementType = pplacementType; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    toJSON(): any {
        return {
             'placementType': this._placementType,
             'createDatetime': this._createDatetime,
             'modifyDatetime': this._modifyDatetime,
             'modifyUserId': this._modifyUserId,
             'expiryDate': this._expiryDate,
             'activeFlag': this._activeFlag,
             'sealFlag': this._sealFlag,
             'frequency' : this._frequency,
             'agyLocId' : this._agyLocId,
           'characteristicsCode' : this._characteristicsCode,
           'createUserId': this._createUserId,
           'observationType': this._observationType,
};
    }
}
