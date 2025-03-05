import {BaseModel} from './BaseModel';
import {Images} from './Images';

export class ImageOriginals extends BaseModel {

  private _imageId: number;
  private _createDatetime: Date;
  private _createUserId: string;
  private _imageFull: any;
  private _imageOriginals: any;
  private _modifyDatetime: Date;
  private _modifyUserId: string;
  private _sealFlag: string;
  private _image: Images;

    get imageId(): number { return this._imageId; }

    set imageId(pimageId: number){ this._imageId = pimageId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }

    get imageFull(): any { return this._imageFull; }

    set imageFull(pimageFull: any){ this._imageFull = pimageFull; }

    get imageOriginals(): any { return this._imageOriginals; }

    set imageOriginals(pimageOriginals: any){ this._imageOriginals = pimageOriginals; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }

    get image(): Images { return this._image; }

    set image(pimage: Images){ this._image = pimage; }

    toJSON(): any {
        return {
            'imageId': this._imageId,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'imageFull': this._imageFull,
            'imageOriginal': this._imageOriginals,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'image': this._image
        };
    }
}
