import { BaseModel } from "@common/beans/BaseModel";

export class Printers extends BaseModel {
    private _printerId: string;
    private _printerType: string;
    private _updateAllowedFlag: string;
    private _activeFlag: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _description: string;
    private _expiryDate: Date;
    private _listSeq: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _defaultPrinterId: string;
    
    get defaultPrinterId(): string { return this._defaultPrinterId; }
    set defaultPrinterId(pdefaultPrinterId: string) { this._defaultPrinterId = pdefaultPrinterId; }

    get printerId(): string { return this._printerId; }
    set printerId(pprinterId: string) { this._printerId = pprinterId; }

    get printerType(): string { return this._printerType; }
    set printerType(pprinterType: string) { this._printerType = pprinterType; }

    get updateAllowedFlag(): string { return this._updateAllowedFlag; }
    set updateAllowedFlag(pupdateAllowedFlag: string) { this._updateAllowedFlag = pupdateAllowedFlag; }

    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }

    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this.sealFlag = psealFlag; }

    toJSON(): any {
        return {
            'printerId': this._printerId,
            'printerType': this._printerType,
            'activeFlag': this._activeFlag,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'description': this._description,
            'expiryDate': this._expiryDate,
            'listSeq': this._listSeq,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'updateAllowedFlag': this._updateAllowedFlag,
            'defaultPrinterId': this._defaultPrinterId,
        };
    }
}
