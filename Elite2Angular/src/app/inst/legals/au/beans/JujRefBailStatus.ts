import { BaseModel } from "@common/beans/BaseModel";

export class JujRefBailStatus extends BaseModel {
    private _isDefault: string;
    private _allowMultiplesPerProceeding: string;
    private _modifiedByUser: string;
    private _displayOrder: number;
    private _modifiedDate: Date;
    private _lockVersion: number;
    private _description: string;
    private _allowMultiplesAcrossCases: string;
    private _bailStatus: string;
    private _isEffective: string;

    get isDefault(): string { return this._isDefault; }
    set isDefault(pisDefault: string) { this._isDefault = pisDefault; }
    get allowMultiplesPerProceeding(): string { return this._allowMultiplesPerProceeding; }
    set allowMultiplesPerProceeding(pallowMultiplesPerProceeding: string) { this._allowMultiplesPerProceeding = pallowMultiplesPerProceeding; }
    get modifiedByUser(): string { return this._modifiedByUser; }
    set modifiedByUser(pmodifiedByUser: string) { this._modifiedByUser = pmodifiedByUser; }
    get displayOrder(): number { return this._displayOrder; }
    set displayOrder(pdisplayOrder: number) { this._displayOrder = pdisplayOrder; }
    get modifiedDate(): Date { return this._modifiedDate; }
    set modifiedDate(pmodifiedDate: Date) { this._modifiedDate = pmodifiedDate; }
    get lockVersion(): number { return this._lockVersion; }
    set lockVersion(plockVersion: number) { this._lockVersion = plockVersion; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get allowMultiplesAcrossCases(): string { return this._allowMultiplesAcrossCases; }
    set allowMultiplesAcrossCases(pallowMultiplesAcrossCases: string) { this._allowMultiplesAcrossCases = pallowMultiplesAcrossCases; }
    get bailStatus(): string { return this._bailStatus; }
    set bailStatus(pbailStatus: string) { this._bailStatus = pbailStatus; }
    get isEffective(): string { return this._isEffective; }
    set isEffective(pisEffective: string) { this._isEffective = pisEffective; }

    toJSON(): any {
        return {
            'isDefault': this._isDefault,
            'allowMultiplesPerProceeding': this._allowMultiplesPerProceeding,
            'modifiedByUser': this._modifiedByUser,
            'displayOrder': this._displayOrder,
            'modifiedDate': this._modifiedDate,
            'lockVersion': this._lockVersion,
            'description': this._description,
            'allowMultiplesAcrossCases': this._allowMultiplesAcrossCases,
            'bailStatus': this._bailStatus,
            'isEffective': this._isEffective,
        };
    }
}