import { BaseModel } from "@common/beans/BaseModel";

export class OffenderObservationZones extends BaseModel {

	private _agyLocId: string;
	private _zoneCode: string;
	private _listSeq: number;
	private _activeFlag: string;
	private _expiryDate: Date;
	private _createDatetime: Date;
	private _placementType: string;
	private _modifyDatetime: Date;
	private _modifyUserId: string;
    private _sealFlag: string;
    private _createUserId: string;


    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get zoneCode(): string { return this._zoneCode; }

    set zoneCode(pzoneCode: string) { this._zoneCode = pzoneCode; }


    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

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
             'listSeq': this._listSeq,
             'agyLocId' : this._agyLocId,
             'zoneCode' : this._zoneCode,
             'createUserId': this._createUserId,
        };
    }
    
}
