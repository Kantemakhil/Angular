import { BaseModel } from '@commonbeans/BaseModel';
export class OffenderPptyItems extends BaseModel {
    private _propertyItemSeq: number;
    private _offenderBookId: number;
    private _propertyType: string;
    private _propertyDescription: string;
    private _agyLocId: string;
    private _statusCode: string;
    private _conditionCode: string;
    private _receivedFrom: string;
    private _propertyContainerId: number;
    private _commentText: string;
    private _confirmFlag: string;
    private _disposedToCorpId: number;
    private _disposedToOffenderFlag: string;
    private _disposedToPerson: string;
    private _disposedToPersonId: number;
    private _color: string;
    private _make: string;
    private _serialNo: string;
    private _quantity: number;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _inserted: number;
    private _offenderIdDisplay: string;
    private _bookingNumber: string;
    private _newStatusCode: string;
    private _disableRow: boolean;
    private _propertyTypeDesc: string;
    private _internalLocationId: number;
    private _dspDescription: string;
    private _pptyDescription: string;
    private _imageFlag: string;
    private _groupId: string;
    private _propertyItemId : number;
    private _dataFlag:string;
    private _primaryFlag:boolean;
    private _imageUrl:string;
    private _imageId : number;
    private _images: any;
    private _propertyOnlyFlag: string;
    private _contdes: string;
    private _activeFlag: string;
    private _proposedDisposalDate: Date;
    private _offInternalLocationId: number;
    private _containerCode: string;
    private _expiryDate: Date;
    private _sealMark: string;
    private _imagesFlag:boolean;
    private _trnFromAgyLocId: string;
    private _propertyStorageId: string;
    private _disposedTo: string;
    private _disposedToName: string;
    private _locdes: string;
    private _cameraLaunchButton: any;
    

    get propertyOnlyFlag(): string { return this._propertyOnlyFlag; }
    
    set propertyOnlyFlag(ppropertyOnlyFlag: string) { this._propertyOnlyFlag = ppropertyOnlyFlag; }

    get contdes(): string { return this._contdes; }
    
    set contdes(pcontdes: string) { this._contdes = pcontdes; }

    get activeFlag(): string { return this._activeFlag; }
    
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get proposedDisposalDate(): Date { return this._proposedDisposalDate; }
    
    set proposedDisposalDate(pproposedDisposalDate: Date) { this._proposedDisposalDate = pproposedDisposalDate; }

    get offInternalLocationId(): number { return this._offInternalLocationId; }
    
    set offInternalLocationId(poffInternalLocationId: number) { this._offInternalLocationId = poffInternalLocationId; }

    get containerCode(): string { return this._containerCode; }
    
    set containerCode(pcontainerCode: string) { this._containerCode = pcontainerCode; }

    get expiryDate(): Date { return this._expiryDate; }
    
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get sealMark(): string { return this._sealMark; }
    
    set sealMark(psealMark: string) { this._sealMark = psealMark; }

    get trnFromAgyLocId(): string { return this._trnFromAgyLocId; }
    
    set trnFromAgyLocId(ptrnFromAgyLocId: string) { this._trnFromAgyLocId = ptrnFromAgyLocId; }

    get propertyStorageId(): string { return this._propertyStorageId; }
    
    set propertyStorageId(ppropertyStorageId: string) { this._propertyStorageId = ppropertyStorageId; }

    get disposedTo(): string { return this._disposedTo; }
    
    set disposedTo(pdisposedTo: string) { this._disposedTo = pdisposedTo; }

    get disposedToName(): string { return this._disposedToName; }
    
    set disposedToName(pdisposedToName: string) { this._disposedToName = pdisposedToName; }

    get locdes(): string { return this._locdes; }
    
    set locdes(plocdes: string) { this._locdes = plocdes; }

    get imageFlag(): string { return this._imageFlag; }
    
    set imageFlag(pimageFlag: string) { this._imageFlag = pimageFlag; }

    get pptyDescription(): string { return this._pptyDescription; }

    set pptyDescription(ppptyDescription: string) { this._pptyDescription = ppptyDescription; }

    private _propertyTypeMap = new Map<string, string>();

    private _colorTypeMap = new Map<string, string>();

    private _conditionTypeMap = new Map<string, string>();

    get propertyTypeMap(): Map<string, string> { return this._propertyTypeMap; }

    set propertyTypeMap(ppropertyTypeMap: Map<string, string>) { this._propertyTypeMap = ppropertyTypeMap; }

    get colorTypeMap(): Map<string, string> { return this._colorTypeMap; }

    set colorTypeMap(pcolorTypeMap: Map<string, string>) { this._colorTypeMap = pcolorTypeMap; }

    get conditionTypeMap(): Map<string, string> { return this._conditionTypeMap; }

    set conditionTypeMap(pconditionTypeMap: Map<string, string>) { this._conditionTypeMap = pconditionTypeMap; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

    get bookingNumber(): string { return this._bookingNumber; }

    set bookingNumber(pbookingNumber: string) { this._bookingNumber = pbookingNumber; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get disposedToCorpId(): number { return this._disposedToCorpId; }

    set disposedToCorpId(pdisposedToCorpId: number) { this._disposedToCorpId = pdisposedToCorpId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get propertyContainerId(): number { return this._propertyContainerId; }

    set propertyContainerId(ppropertyContainerId: number) { this._propertyContainerId = ppropertyContainerId; }

    get confirmFlag(): string { return this._confirmFlag; }

    set confirmFlag(pconfirmFlag: string) { this._confirmFlag = pconfirmFlag; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get disposedToPerson(): string { return this._disposedToPerson; }

    set disposedToPerson(pdisposedToPerson: string) { this._disposedToPerson = pdisposedToPerson; }

    get inserted(): number { return this._inserted; }

    set inserted(pinserted: number) { this._inserted = pinserted; }

    get propertyType(): string { return this._propertyType; }

    set propertyType(ppropertyType: string) { this._propertyType = ppropertyType; }

    get receivedFrom(): string { return this._receivedFrom; }

    set receivedFrom(preceivedFrom: string) { this._receivedFrom = preceivedFrom; }

    get disposedToPersonId(): number { return this._disposedToPersonId; }

    set disposedToPersonId(pdisposedToPersonId: number) { this._disposedToPersonId = pdisposedToPersonId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get disposedToOffenderFlag(): string { return this._disposedToOffenderFlag; }

    set disposedToOffenderFlag(pdisposedToOffenderFlag: string) { this._disposedToOffenderFlag = pdisposedToOffenderFlag; }

    get propertyDescription(): string { return this._propertyDescription; }

    set propertyDescription(ppropertyDescription: string) { this._propertyDescription = ppropertyDescription; }

    get color(): string { return this._color; }

    set color(pcolor: string) { this._color = pcolor; }

    get quantity(): number { return this._quantity; }

    set quantity(pquantity: number) { this._quantity = pquantity; }

    get make(): string { return this._make; }

    set make(pmake: string) { this._make = pmake; }

    get conditionCode(): string { return this._conditionCode; }

    set conditionCode(pconditionCode: string) { this._conditionCode = pconditionCode; }

    get serialNo(): string { return this._serialNo; }

    set serialNo(pserialNo: string) { this._serialNo = pserialNo; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get propertyItemSeq(): number { return this._propertyItemSeq; }

    set propertyItemSeq(ppropertyItemSeq: number) { this._propertyItemSeq = ppropertyItemSeq; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get statusCode(): string { return this._statusCode; }

    set statusCode(pstatusCode: string) { this._statusCode = pstatusCode; }

    get newStatusCode(): string { return this._newStatusCode; }

    set newStatusCode(pnewStatusCode: string) { this._newStatusCode = pnewStatusCode; }


    get disableRow(): boolean { return this._disableRow; }

    set disableRow(pdisableRow: boolean) { this._disableRow = pdisableRow; }

    get propertyTypeDesc(): string { return this._propertyTypeDesc; }

    set propertyTypeDesc(ppropertyTypeDesc: string) { this._propertyTypeDesc = ppropertyTypeDesc; }

    get dspDescription(): string { return this._dspDescription; }

    set dspDescription(pdspDescription: string) { this._dspDescription = pdspDescription; }

    get internalLocationId(): number { return this._internalLocationId; }

    set internalLocationId(pinternalLocationId: number) { this._internalLocationId = pinternalLocationId; }

    get groupId(): string { return this._groupId; }

    set groupId(groupId: string) { this._groupId = groupId; }
    
    get propertyItemId(): number { return this._propertyItemId; }

    set propertyItemId(propertyItemId: number) { this._propertyItemId = propertyItemId; }
    
    get dataFlag(): string { return this._dataFlag; }

    set dataFlag(dataFlag: string) { this._dataFlag = dataFlag; }
    
    get primaryFlag(): boolean { return this._primaryFlag; }

    set primaryFlag(primaryFlag: boolean) { this._primaryFlag = primaryFlag; }
    
    get imagesFlag(): boolean { return this._imagesFlag; }


    set imagesFlag(imagesFlag: boolean) { this._imagesFlag = imagesFlag; }
    
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
            'offenderIdDisplay': this._offenderIdDisplay,
            'bookingNumber': this._bookingNumber,
            'createUserId': this._createUserId,
            'offenderBookId': this._offenderBookId,
            'modifyDatetime': this._modifyDatetime,
            'disposedToCorpId': this._disposedToCorpId,
            'modifyUserId': this._modifyUserId,
            'propertyContainerId': this._propertyContainerId,
            'confirmFlag': this._confirmFlag,
            'commentText': this._commentText,
            'disposedToPerson': this._disposedToPerson,
            'inserted': this._inserted,
            'propertyType': this._propertyType,
            'receivedFrom': this._receivedFrom,
            'disposedToPersonId': this._disposedToPersonId,
            'sealFlag': this._sealFlag,
            'disposedToOffenderFlag': this._disposedToOffenderFlag,
            'propertyDescription': this._propertyDescription,
            'color': this._color,
            'quantity': this._quantity,
            'make': this._make,
            'conditionCode': this._conditionCode,
            'serialNo': this._serialNo,
            'createDatetime': this._createDatetime,
            'propertyItemSeq': this._propertyItemSeq,
            'agyLocId': this._agyLocId,
            'statusCode': this._statusCode,
            'newStatusCode': this._newStatusCode,
            'disableRow': this._disableRow,
            'propertyTypeDesc': this._propertyTypeDesc,
            'dspDescription': this._dspDescription,
            'internalLocationId': this._internalLocationId,
            'ppptyDescription' : this._pptyDescription,
            'groupId' : this._groupId,
            'imageUrl' : this._imageUrl,
            'imageId' : this._imageId,
            'images' :this._images,
            'imageFlag': this._imageFlag,
            'propertyOnlyFlag' : this._propertyOnlyFlag,
            'contdes' : this._contdes,
            'activeFlag' : this._activeFlag,
            'proposedDisposalDate' : this._proposedDisposalDate,
            'offInternalLocationId' : this._offInternalLocationId,
            'containerCode' : this._containerCode,
            'expiryDate' : this._expiryDate,
            'sealMark' : this._sealMark,
            'trnFromAgyLocId' : this._trnFromAgyLocId,
            'propertyStorageId' : this._propertyStorageId,
            'disposedTo' : this._disposedTo,
            'disposedToName' : this._disposedToName,
            'locdes' : this._locdes,  
            'cameraLaunchButton' : this._cameraLaunchButton, 
        };
    }
}
