import { BaseModel } from "@common/beans/BaseModel";

export class JujRefOrderType extends BaseModel {
    private _createUserId: string;
    private _allowMultiplesPerProceeding: string;
    private _displayOrder: number;
    private _description: string;
    private _allowMultiplesAcrossCases: string;
    private _isEffective: string;
    private _createDatetime: Date;
    private _isDefault: string;
    private _modifiedByUser: string;
    private _modifiedDate: Date;
    private _lockVersion: number;
    private _orderCategory: string;

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get allowMultiplesPerProceeding(): string { return this._allowMultiplesPerProceeding; }
    set allowMultiplesPerProceeding(pallowMultiplesPerProceeding: string) { this._allowMultiplesPerProceeding = pallowMultiplesPerProceeding; }
    get displayOrder(): number { return this._displayOrder; }
    set displayOrder(pdisplayOrder: number) { this._displayOrder = pdisplayOrder; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get allowMultiplesAcrossCases(): string { return this._allowMultiplesAcrossCases; }
    set allowMultiplesAcrossCases(pallowMultiplesAcrossCases: string) { this._allowMultiplesAcrossCases = pallowMultiplesAcrossCases; }
    get isEffective(): string { return this._isEffective; }
    set isEffective(pisEffective: string) { this._isEffective = pisEffective; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get isDefault(): string { return this._isDefault; }
    set isDefault(pisDefault: string) { this._isDefault = pisDefault; }
    get modifiedByUser(): string { return this._modifiedByUser; }
    set modifiedByUser(pmodifiedByUser: string) { this._modifiedByUser = pmodifiedByUser; }
    get modifiedDate(): Date { return this._modifiedDate; }
    set modifiedDate(pmodifiedDate: Date) { this._modifiedDate = pmodifiedDate; }
    get lockVersion(): number { return this._lockVersion; }
    set lockVersion(plockVersion: number) { this._lockVersion = plockVersion; }
    get orderCategory(): string { return this._orderCategory; }
    set orderCategory(porderCategory: string) { this._orderCategory = porderCategory; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'allowMultiplesPerProceeding': this._allowMultiplesPerProceeding,
            'displayOrder': this._displayOrder,
            'description': this._description,
            'allowMultiplesAcrossCases': this._allowMultiplesAcrossCases,
            'isEffective': this._isEffective,
            'createDatetime': this._createDatetime,
            'isDefault': this._isDefault,
            'modifiedByUser': this._modifiedByUser,
            'modifiedDate': this._modifiedDate,
            'lockVersion': this._lockVersion,
            'orderCategory': this._orderCategory,
        };
    }
}
