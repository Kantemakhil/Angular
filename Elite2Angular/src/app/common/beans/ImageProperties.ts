import { BaseModel } from './BaseModel';

export class ImageProperties extends BaseModel {

    private _imagePropertyId: number;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _property: string;
    private _sealFlag: string;
    private _imageId: number;
    private _description: string;

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get imageId(): number { return this._imageId; }

    set imageId(pimageId: number) { this._imageId = pimageId; }

    get imagePropertyId(): number { return this._imagePropertyId; }

    set imagePropertyId(pimagePropertyId: number) { this._imagePropertyId = pimagePropertyId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get property(): string { return this._property; }

    set property(pproperty: string) { this._property = pproperty; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }


    toJSON(): any {
        return {
            'imagePropertyId': this._imagePropertyId,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'property': this._property,
            'sealFlag': this._sealFlag,
            'imageId': this._imageId,
            'description': this._description
        };
    }
}
