import { BaseModel } from './BaseModel';
import { ImageOriginals } from './ImageOriginals';

export class Images extends BaseModel {

    private _imageId: number;
    private _activeFlag: string;
    private _captureDate: Date;
    private _createDatetime: Date;
    private _createUserId: string;
    private _imageObjectId: number;
    private _imageObjectSeq: number;
    private _imageObjectType: string;
    private _imageThumbnail: any;
    private _imageViewType: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _orientationType: string;
    private _sealFlag: string;
    private _imageOriginal: ImageOriginals;
    private _markType: string;
    private _bodyPartCode: string;
    private _insertFlag: string;
    private _pptyDescription: string;
    private _screenName: string;
    private _personId: number;
    private _staffId: number;
    private _userId: string;
    private _lastName: string;
    private _firstName: string;
    private _birthDate: Date;
    private _modelName: string;
    private _imagedescription:string;
    private _addAphoto:string;
    private _previousImageId:number;
    private _imageFlag: string;
    private _parentForm: string;



    get imageFlag(): string { return this._imageFlag; }

    set imageFlag(pimageFlag: string) { this._imageFlag = pimageFlag; }
    get previousImageId(): number { return this._previousImageId; }

    set previousImageId(pimageId: number) { this._previousImageId = pimageId; }

    get addAphoto(): string { return this._addAphoto; }

    set addAphoto(puserId: string) { this._addAphoto = puserId; }

    get imagedescription(): string { return this._imagedescription; }

    set imagedescription(puserId: string) { this._imagedescription = puserId; }
    
    get personId(): number { return this._personId; }

    set personId(ppersonId: number) { this._personId = ppersonId; }

    get staffId(): number { return this._staffId; }

    set staffId(pstaffId: number) { this._staffId = pstaffId; }

    get userId(): string { return this._userId; }

    set userId(puserId: string) { this._userId = puserId; }

    get lastName(): string { return this._lastName; }

    set lastName(plastName: string) { this._lastName = plastName; }

    get firstName(): string { return this._firstName; }

    set firstName(pfirstName: string) { this._firstName = pfirstName; }

    get birthDate(): Date { return this._birthDate; }

    set birthDate(pbirthDate: Date) { this._birthDate = pbirthDate; }

    get screenName(): string { return this._screenName; }

    set screenName(pscreenName: string) { this._screenName = pscreenName; }

    get pptyDescription(): string { return this._pptyDescription; }

    set pptyDescription(ppptyDescription: string) { this._pptyDescription = ppptyDescription; }

    get insertFlag(): string { return this._insertFlag; }

    set insertFlag(pinsertFlag: string) { this._insertFlag = pinsertFlag; }

    get markType(): string { return this._markType; }

    set markType(pmarkType: string) { this._markType = pmarkType; }

    get bodyPartCode(): string { return this._bodyPartCode; }

    set bodyPartCode(pbodyPartCode: string) { this._bodyPartCode = pbodyPartCode; }

    get imageId(): number { return this._imageId; }

    set imageId(pimageId: number) { this._imageId = pimageId; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get captureDate(): Date { return this._captureDate; }

    set captureDate(pcaptureDate: Date) { this._captureDate = pcaptureDate; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get imageObjectId(): number { return this._imageObjectId; }

    set imageObjectId(pimageObjectId: number) { this._imageObjectId = pimageObjectId; }

    get imageObjectSeq(): number { return this._imageObjectSeq; }

    set imageObjectSeq(pimageObjectSeq: number) { this._imageObjectSeq = pimageObjectSeq; }

    get imageObjectType(): string { return this._imageObjectType; }

    set imageObjectType(pimageObjectType: string) { this._imageObjectType = pimageObjectType; }

    get imageThumbnail(): any { return this._imageThumbnail; }

    set imageThumbnail(pimageThumbnail: any) { this._imageThumbnail = pimageThumbnail; }

    get imageViewType(): string { return this._imageViewType; }

    set imageViewType(pimageViewType: string) { this._imageViewType = pimageViewType; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get orientationType(): string { return this._orientationType; }

    set orientationType(porientationType: string) { this._orientationType = porientationType; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get imageOriginal(): ImageOriginals { return this._imageOriginal; }

    set imageOriginal(pimageOriginal: ImageOriginals) { this._imageOriginal = pimageOriginal; }

    get modelName(): string { return this._modelName; }

    set modelName(pmodelName: string) { this._modelName = pmodelName; }

    get parentForm(): string { return this._parentForm; }

    set parentForm(value: string) { this._parentForm = value; }

    toJSON(): any {
        return {
            'imageId': this._imageId,
            'activeFlag': this._activeFlag,
            'captureDate': this._captureDate,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'imageObjectId': this._imageObjectId,
            'imageObjectSeq': this._imageObjectSeq,
            'imageObjectType': this._imageObjectType,
            'imageThumbnail': this._imageThumbnail,
            'imageViewType': this._imageViewType,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'orientationType': this._orientationType,
            'sealFlag': this._sealFlag,
            'imageOriginal': this._imageOriginal,
            'markType': this._markType,
            'bodyPartCode': this._bodyPartCode,
            'insertFlag': this._insertFlag,
            'pptyDescription' : this._pptyDescription,
            'screenName': this._screenName,
            'staffId': this. _staffId,
            'userId': this. _userId,
            'lastName': this. _lastName,
            'firstName': this. _firstName,
            'birthDate': this. _birthDate,
            'modelName': this. _modelName,
            'previousImageId':this._previousImageId,
            'imageFlag':this._imageFlag,
            'parentForm': this._parentForm
        };
    }
}
