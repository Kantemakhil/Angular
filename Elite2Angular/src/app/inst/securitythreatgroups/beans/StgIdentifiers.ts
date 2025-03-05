import { BaseModel } from '@commonbeans/BaseModel';

export class  StgIdentifiers extends BaseModel {

    private _createDatetime: Date;

    private _createUserId: string;

    private _detail: string;

    private _imageData: any;

    private _imageSize: number;

    private _modifyDatetime: Date;

    private _modifyUserId: string;

    private _profileType: string;

    private _sealFlag: string;

    private _stgId: number;

    private _identifierSeq: number;

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(_createUserId: string) { this._createUserId = _createUserId; }

    get detail(): string {
        return this._detail;
    }

    set detail(pdetail: string) {
        this._detail = pdetail;
    }

    get imageData(): any {
        return this.imageData;
    }

    set imageData(pimageData: any) {
        this.imageData = pimageData;
    }

    get imageSize(): number {
        return this._imageSize;
    }

    set imageSize(pimageSize: number) {
        this._imageSize = pimageSize;
    }

    get modifyDatetime(): Date {
        return this._modifyDatetime;
    }

    set modifyDatetime(pmodifyDatetime: Date) {
        this._modifyDatetime = pmodifyDatetime;
    }

    get modifyUserId(): string {
        return this._modifyUserId;
    }

    set modifyUserId(pmodifyUserId: string) {
        this._modifyUserId = pmodifyUserId;
    }

    get profileType(): string {
        return this._profileType;
    }

    set profileType(pprofileType: string) {
        this._profileType = pprofileType;
    }

    get sealFlag(): string {
        return this._sealFlag;
    }

    set sealFlag(psealFlag: string) {
        this._sealFlag = psealFlag;
    }

    get stgId(): number {
        return this._stgId;
    }

    set stgId(pstgId: number) {
        this._stgId = pstgId;
    }

    get identifierSeq(): number {
        return this._identifierSeq;
    }

    set identifierSeq(pidentifierSeq: number) {
        this._identifierSeq = pidentifierSeq;
    }
    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'detail': this._detail,
            'imageData': this._imageData,
            'imageSize': this._imageSize,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'profileType': this._profileType,
            'sealFlag': this._sealFlag,
            'stgId': this._stgId,
            'identifierSeq': this._identifierSeq,
        };


    }
}
