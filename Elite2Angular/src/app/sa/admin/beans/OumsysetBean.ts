import { BaseModel } from '@commonbeans/BaseModel';

export class OumsysetBean extends BaseModel {
    private _settingType:string;
    private _settingProviderCode:string;
    private _settingValue:string;
    private _createDatetime:Date;
    private _createUserId:string;
    private _modifyDatetime:Date;
    private _modifyUserId:string;


    get settingType(): string { return this._settingType; }
    set settingType(pmenuItem: string) { this._settingType = pmenuItem; }

    get settingProviderCode(): string { return this._settingProviderCode; }
    set settingProviderCode(pmenuItem: string) { this._settingProviderCode = pmenuItem; }

    get settingValue(): string { return this._settingValue; }
    set settingValue(pmenuItem: string) { this._settingValue = pmenuItem; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pmenuItem: Date) { this._createDatetime = pmenuItem; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pmenuItem: string) { this._createUserId = pmenuItem; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmenuItem: Date) { this._modifyDatetime = pmenuItem; }
    
    
    toJSON(): any {
        return {
        'settingType':this._settingType,
        'settingProviderCode':this._settingProviderCode,
        'settingValue':this._settingValue,
        'createDatetime':this._createDatetime,
        'createUserId':this._createUserId,
        'modifyDatetime':this._modifyDatetime,
        'modifyUserId':this._modifyUserId
        };
    }

}
