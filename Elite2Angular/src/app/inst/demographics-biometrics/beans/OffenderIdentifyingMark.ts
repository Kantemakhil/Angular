import { BaseModel } from '../../../common/beans/BaseModel';
// import {OffenderBookings} from './OffenderBookings';

export class OffenderIdentifyingMark extends BaseModel {

    private _bodyPartCode: string;
    private _commentText: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _markType: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _partOrientationCode: string;
    private _sealFlag: string;
    private _sideCode: string;
    // private _offenderBookings: OffenderBookings;
    private _offenderBookId: number;
    private _idMarkSeq: number;
    private _nbtMarkTypeDesc: string;
    private _nbtSideCodeDesc: string;
    private _nbtBodyPartDesc: string;
    private _nbtOrientationDesc: string;
    private _imageFlag: string;
    private _imageObjectType: string;
    private _imageUrl:string;
    private _imageId : number;
    private _images: any;
    private _cameraLaunchButton: any;



    get imageObjectType(): string { return this._imageObjectType; }

    set imageObjectType(pimageObjectType: string) { this._imageObjectType = pimageObjectType; }

    get imageFlag(): string { return this._imageFlag; }

    set imageFlag(pimageFlag: string) { this._imageFlag = pimageFlag; }

    get bodyPartCode(): string { return this._bodyPartCode; }

    set bodyPartCode(pbodyPartCode: string) { this._bodyPartCode = pbodyPartCode; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get markType(): string { return this._markType; }

    set markType(pmarkType: string) { this._markType = pmarkType; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get partOrientationCode(): string { return this._partOrientationCode; }

    set partOrientationCode(ppartOrientationCode: string) { this._partOrientationCode = ppartOrientationCode; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get sideCode(): string { return this._sideCode; }

    set sideCode(psideCode: string) { this._sideCode = psideCode; }

    //get offenderBookings(): OffenderBookings { return this._offenderBookings; }

    //set offenderBookings(poffenderBookings: OffenderBookings){ this._offenderBookings = poffenderBookings; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get idMarkSeq(): number { return this._idMarkSeq; }

    set idMarkSeq(pidMarkSeq: number) { this._idMarkSeq = pidMarkSeq; }

    get nbtMarkTypeDesc(): string { return this._nbtMarkTypeDesc; }

    set nbtMarkTypeDesc(pnbtMarkTypeDesc: string) { this._nbtMarkTypeDesc = pnbtMarkTypeDesc; }

    get nbtSideCodeDesc(): string { return this._nbtSideCodeDesc; }

    set nbtSideCodeDesc(pnbtSideCodeDesc: string) { this._nbtSideCodeDesc = pnbtSideCodeDesc; }

    get nbtBodyPartDesc(): string { return this._nbtBodyPartDesc; }

    set nbtBodyPartDesc(pnbtBodyPartDesc: string) { this._nbtBodyPartDesc = pnbtBodyPartDesc; }

    get nbtOrientationDesc(): string { return this._nbtOrientationDesc; }

    set nbtOrientationDesc(pnbtOrientationDesc: string) { this._nbtOrientationDesc = pnbtOrientationDesc; }

    get imageUrl(): string { return this._imageUrl; }

    set imageUrl(imageUrl: string) { this._imageUrl = imageUrl; }

    get imageId(): number { return this._imageId; }

    set imageId(imageId: number) { this._imageId = imageId; }
    
    get images(): any { return this._images; }

    set images( images: any ) { this._images = images; }
    
    get cameraLaunchButton(): any { return this._cameraLaunchButton; }


    set cameraLaunchButton( cameraLaunchButton: any ) { this._cameraLaunchButton = cameraLaunchButton; }

    toJSON(): any {
        return {
            'bodyPartCode': this._bodyPartCode,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'markType': this._markType,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'partOrientationCode': this._partOrientationCode,
            'sealFlag': this._sealFlag,
            'sideCode': this._sideCode,
            // 'offenderBookings': this._offenderBookings,
            'offenderBookId': this._offenderBookId,
            'idMarkSeq': this._idMarkSeq,
            'nbtMarkTypeDesc': this._nbtMarkTypeDesc,
            'nbtSideCodeDesc': this._nbtSideCodeDesc,
            'nbtBodyPartDesc': this._nbtBodyPartDesc,
            'nbtOrientationDesc': this._nbtOrientationDesc,
            'imageFlag': this._imageFlag,
            'imageObjectType': this._imageObjectType,
            'imageUrl' : this._imageUrl,
            'imageId' : this._imageId,
            'images' :this._images,
            'cameraLaunchButton' : this._cameraLaunchButton, 
        };
    }
}