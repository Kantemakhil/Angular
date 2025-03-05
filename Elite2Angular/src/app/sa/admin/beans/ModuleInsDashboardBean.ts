import { BaseModel } from '@common/beans/BaseModel';

export class ModuleInsDashboardBean extends BaseModel {
    private _module:string;
    private _dashboard:string;
    private _activeFlag:string;
    private _offenderSpecificFlag;
    private _createDatetime:Date;
    private _createUserId:string;
    private _modifyDatetime:Date;
    private _modifyUserId:string;
    private _active:boolean;
    private _offenderSpecific:boolean;

    get module(): string { return this._module; }
    set module(pmodule: string) { this._module = pmodule; }

    get dashboard(): string { return this._dashboard; }
    set dashboard(pdashboard: string) { this._dashboard = pdashboard; }

    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get offenderSpecificFlag(): string { return this._offenderSpecificFlag; }
    set offenderSpecificFlag(poffenderSpecificFlag: string) { this._offenderSpecificFlag = poffenderSpecificFlag; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pmenuItem: Date) { this._createDatetime = pmenuItem; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pmenuItem: string) { this._createUserId = pmenuItem; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmenuItem: Date) { this._modifyDatetime = pmenuItem; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get active(): boolean{ return this._active; }
    set active(pactive: boolean){ this._active = pactive ;}

    get offenderSpecific(): boolean{ return this._offenderSpecific; }
    set offenderSpecific(poffenderSpecific: boolean){ this._offenderSpecific = poffenderSpecific ;}

    toJSON(): any {
        return {
        'module':this._module,
        'dashboard':this._dashboard,
        'activeFlag':this._activeFlag,
        'offenderSpecificFlag':this._offenderSpecificFlag,
        'createDatetime':this._createDatetime,
        'createUserId':this._createUserId,
        'modifyDatetime':this._modifyDatetime,
        'modifyUserId':this._modifyUserId,
        'active':this._active,
        'offenderSpecific':this._offenderSpecific
        };
    }
}