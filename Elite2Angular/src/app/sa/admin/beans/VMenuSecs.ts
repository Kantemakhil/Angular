import { BaseModel } from '@commonbeans/BaseModel';
export class VMenuSecs extends BaseModel {
    private _serialVersionUID: number;
    private _moduleType: string;
    private _parentMenuId: number;
    private _applnCode: string;
    private _sortOrder: number;
    private _moduleName: string;
    private _description: string;
    private _menuId: number;
    private _menuItem: string;
    private _moduleDescription: string;

    private _menuExistCount: number;

    get moduleDescription(): string { return this._moduleDescription; }
    
    set moduleDescription(pmoduleDescription: string) { this._moduleDescription = pmoduleDescription; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get moduleType(): string { return this._moduleType; }

    set moduleType(pmoduleType: string) { this._moduleType = pmoduleType; }

    get parentMenuId(): number { return this._parentMenuId; }

    set parentMenuId(pparentMenuId: number) { this._parentMenuId = pparentMenuId; }

    get applnCode(): string { return this._applnCode; }

    set applnCode(papplnCode: string) { this._applnCode = papplnCode; }

    get sortOrder(): number { return this._sortOrder; }

    set sortOrder(psortOrder: number) { this._sortOrder = psortOrder; }

    get moduleName(): string { return this._moduleName; }

    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get menuId(): number { return this._menuId; }

    set menuId(pmenuId: number) { this._menuId = pmenuId; }

    get menuItem(): string { return this._menuItem; }

    set menuItem(pmenuItem: string) { this._menuItem = pmenuItem; }

    get menuExistCount(): number { return this._menuExistCount; }

    set menuExistCount(pmenuExistCount: number) { this._menuExistCount = pmenuExistCount; }

    toJSON(): any {
        return {
            'serialVersionUID': this._serialVersionUID,
            'moduleType': this._moduleType,
            'parentMenuId': this._parentMenuId,
            'applnCode': this._applnCode,
            'sortOrder': this._sortOrder,
            'moduleName': this._moduleName,
            'description': this._description,
            'menuId': this._menuId,
            'menuItem': this._menuItem,
            'moduleDescription': this._moduleDescription,
            'menuExistCount': this._menuExistCount
        };
    }
}
