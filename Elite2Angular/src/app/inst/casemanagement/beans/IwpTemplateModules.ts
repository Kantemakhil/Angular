import { BaseModel } from '@commonbeans/BaseModel';

export class IwpTemplateModules extends BaseModel {
    private _templateModuleId: number;
    private _createDatetime: number;
    private _expiryDate: number;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _blockDescription: string;
    private _blockName: string;
    private _modifyDatetime: number;
    private _modifyUserId: string;
    private _moduleName: string;
    private _sealFlag: string;
    private _activeFlag: string;
    private _templateId: number;
    private _iwpDocCount: number;
    
    get iwpDocCount(): number { return this._iwpDocCount; }

    set iwpDocCount(piwpDocCount: number) { this._iwpDocCount = piwpDocCount; }

    get templateId(): number { return this._templateId; }

    set templateId(ptemplateId: number) { this._templateId = ptemplateId; }

    get templateModuleId(): number { return this._templateModuleId; }

    set templateModuleId(ptemplateModuleId: number) { this._templateModuleId = ptemplateModuleId; }

    get createDatetime(): number { return this._createDatetime; }

    set createDatetime(pcreateDatetime: number) { this._createDatetime = pcreateDatetime; }

    get expiryDate(): number { return this._expiryDate; }

    set expiryDate(pexpiryDate: number) { this._expiryDate = pexpiryDate; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID ; }

    get createUserId(): string { return this._createUserId ; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId ; }

    get blockDescription(): string { return this._blockDescription; }

    set blockDescription(pblockDescription: string) { this._blockDescription = pblockDescription; }

    get blockName(): string { return this._blockName; }

    set blockName(pblockName: string) { this._blockName = pblockName ; }

    get modifyDatetime(): number { return this._modifyDatetime ; }

    set modifyDatetime(pmodifyDatetime: number) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get moduleName(): string { return this._moduleName; }

    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }


    toJSON(): any {
        return {
            'templateModuleId': this._templateModuleId,
            'createDatetime': this._createDatetime,
            'expiryDate': this._expiryDate,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'blockDescription': this._blockDescription,
            'blockName': this._blockName,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'moduleName': this._moduleName,
            'sealFlag': this._sealFlag,
            'activeFlag': this._activeFlag,
            'templateId': this._templateId,
            'iwpDocCount':this._iwpDocCount
        };
    }
}