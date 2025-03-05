import { BaseModel } from "@common/beans/BaseModel";

export class VisitTypeLimits extends BaseModel {
    private _visitCycleLimitId: number;
    private _visitType: string;
    private _maxHrsType: number;
    private _maxVisitsType: number;
    private _maxVisitorsType: number;
    private _reinstateFlag: string;
    private _activeFlag: string;
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _mmin: number;
    private _maxHrsTypeTemp: number;

    get maxHrsTypeTemp(): number { return this._maxHrsTypeTemp; }

    set maxHrsTypeTemp(pmaxHrsTypeTemp: number) { this._maxHrsTypeTemp = pmaxHrsTypeTemp; }

    get mmin(): number { return this._mmin; }

    set mmin(pmmin: number) { this._mmin = pmmin; }

    get visitCycleLimitId(): number { return this._visitCycleLimitId; }

    set visitCycleLimitId(pvisitCycleLimitId: number) { this._visitCycleLimitId = pvisitCycleLimitId; }

    get visitType(): string { return this._visitType; }

    set visitType(pvisitType: string) { this._visitType = pvisitType; }

    get maxHrsType(): number { return this._maxHrsType; }

    set maxHrsType(pmaxHrsType: number) { this._maxHrsType = pmaxHrsType; }

    get maxVisitsType(): number { return this._maxVisitsType; }

    set maxVisitsType(pmaxVisitsType: number) { this._maxVisitsType = pmaxVisitsType; }

    get maxVisitorsType(): number { return this._maxVisitorsType; }

    set maxVisitorsType(pmaxVisitorsType: number) { this._maxVisitorsType = pmaxVisitorsType; }

    get reinstateFlag(): string { return this._reinstateFlag; }

    set reinstateFlag(preinstateFlag: string) { this._reinstateFlag = preinstateFlag; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }


    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }


    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }


    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }


    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetimed: Date) { this._modifyDatetime = pmodifyDatetimed; }


    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }





    toJSON(): any {
        return {
            'mmin': this._mmin,
            'visitCycleLimitId': this._visitCycleLimitId,
            'visitType': this._visitType,
            'maxHrsType': this._maxHrsType,
            'maxVisitsType': this._maxVisitsType,
            'maxVisitorsType': this._maxVisitorsType,
            'reinstateFlag': this._reinstateFlag,
            'activeFlag': this._activeFlag,
            'expiryDate': this._expiryDate,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'maxHrsTypeTemp': this._maxHrsTypeTemp
        };
    }
}
