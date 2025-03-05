import { BaseModel } from '@commonbeans/BaseModel';
export class programsPayBean extends BaseModel{
    private _programCategory: string;
    private _activeFlag: string;
    private _expiryDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _sealFlag: string;


    get programCategory(): string { return this._programCategory; }
    set programCategory(pprogramCategory: string) { this._programCategory = pprogramCategory; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    toJSON(): any {
        return {
            'programCategory': this._programCategory,
            'activeFlag': this._activeFlag,
            'expiryDate': this._expiryDate,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'createDatetime': this._createDatetime,
        };
    }
}