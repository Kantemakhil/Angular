
import { BaseModel } from '@commonbeans/BaseModel';
export class MenuSecurities extends BaseModel {
    private _createUserId: string;
    private _data: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _moduleName: string;
    private _icon: string;
    private _menuItem: string;
    private _userId: string;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _parentMenuId: number;
    private _sortOrder: number;
    private _menuId: number;
    private _sealFlag: string;
    private _moduleDescription: string;
    private _parentId: number;
    private _parentMenuIdDup: number;
    private _sortOrderDup: number;

    get moduleDescription(): string { return this._moduleDescription; }

    set moduleDescription(pmoduleDescription: string) { this._moduleDescription = pmoduleDescription; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get data(): string { return this._data; }

    set data(pdata: string) { this._data = pdata; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get moduleName(): string { return this._moduleName; }

    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }

    get icon(): string { return this._icon; }

    set icon(picon: string) { this._icon = picon; }

    get menuItem(): string { return this._menuItem; }

    set menuItem(pmenuItem: string) { this._menuItem = pmenuItem; }

    get userId(): string { return this._userId; }

    set userId(puserId: string) { this._userId = puserId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get parentMenuId(): number { return this._parentMenuId; }

    set parentMenuId(pparentMenuId: number) { this._parentMenuId = pparentMenuId; }

    get sortOrder(): number { return this._sortOrder; }

    set sortOrder(psortOrder: number) { this._sortOrder = psortOrder; }

    get menuId(): number { return this._menuId; }

    set menuId(pmenuId: number) { this._menuId = pmenuId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get parentId(): number { return this._parentId; }

    set parentId(pparentId: number) { this._parentId = pparentId; }

    get parentMenuIdDup(): number { return this._parentMenuIdDup; }

    set parentMenuIdDup(pparentMenuIdDup: number) { this._parentMenuIdDup = pparentMenuIdDup; }

    get sortOrderDup(): number { return this._sortOrderDup; }

    set sortOrderDup(psortOrderDup: number) { this._sortOrderDup = psortOrderDup; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'data': this._data,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'moduleName': this._moduleName,
            'icon': this._icon,
            'menuItem': this._menuItem,
            'userId': this._userId,
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'parentMenuId': this._parentMenuId,
            'sortOrder': this._sortOrder,
            'menuId': this._menuId,
            'sealFlag': this._sealFlag,
            'moduleDescription': this._moduleDescription,
            'parentId': this._parentId
        };
    }
}
