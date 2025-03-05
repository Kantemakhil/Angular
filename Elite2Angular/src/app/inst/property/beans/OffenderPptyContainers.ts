import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderPptyItems } from '@instproperty/OffenderPptyItems';

export class OffenderPptyContainers extends BaseModel {
    private _propertyOnlyFlag: string;
    private _offenderBookId: number;
    private _propertyContainerId: number;
    private _agyLocId: string;
    private _activeFlag: string;
    private _activeFlagTemp: boolean;
    private _proposedDisposalDate: Date;
    private _commentText: string;
    private _internalLocationId: number;
    private _containerCode: string;
    private _expiryDate: Date;
    private _sealMark: string;
    private _trnFromAgyLocId: string;
    private _trnToAgyLocId: string;
    private _createDateTime: Date;
    private _modifyDateTime: Date;
    private _createUserId: string;
    private _modifyUserId: string;
    private _propertyStorageId: number;
    private _disposedTo: string;
    private _disposedToName: string;
    private _sealFlag: string;
    private _inserted: number;
    private _offenderId: number;
    private _offenderIdDisplay: string;
    private _offenderName: string;
    private _type: string;
    private _recievedFrom: string;
    private _locDisable: boolean;
    private _firstName: string;
    private _lastName: string;
    private _description: string;
    private _code: string;
    private _caseLoadId: string;
    private _propertyItemSeq: number;
    private _pptyItemLength: number;
    private _containerValue: number;
    private _gvAgyLocId: string;
    private _containerId:number;
    private _dataFlag:string;
    private _itemsForContainer: OffenderPptyItems[]=[];
    private _moveToContainer:any[]=[];
    private _containerDescription: string;
    private _imageUrl:string;
    private _imageId : number;
    private _images: any;
    private _isDblClicked: boolean
    private _statusCode: string;
    private _locationDescription: string;
    private _containerStatus: string;
    private _moveToContainerLov:string
    private _disableSaveButton:boolean;
    private _sealShow:boolean;
    private _cancelTransfer:string;
    private _cancelReason:string;
    private _cancelLocation:string;
    private _rejectFlag:string;
    private _rejectReason:string;
    private _internalLocationCode:string;
    private _moveTointernalLocation:string;
    private _internalLocationCodeTemp: string;
    private _internalLocationIdTemp: string;
    private _moveToContainerSeal: string;
    private _moveToContainerDesc: string;

    get moveToContainerSeal(): string {return this._moveToContainerSeal; }

    set moveToContainerSeal(pmoveToContainerSeal: string) {this._moveToContainerSeal = pmoveToContainerSeal; }

    get moveToContainerDesc(): string {return this._moveToContainerDesc; }

    set moveToContainerDesc(pmoveToContainerDesc: string) {this._moveToContainerDesc = pmoveToContainerDesc; }





    get internalLocationIdTemp(): string {return this._internalLocationIdTemp; }

    set internalLocationIdTemp(pinternalLocationIdTemp: string) {this._internalLocationIdTemp = pinternalLocationIdTemp; }


    get moveToContainerLov(): string {return this._moveToContainerLov; }

    set moveToContainerLov(moveToContainerLov: string) {this.moveToContainerLov = moveToContainerLov; }

    get gvAgyLocId(): string {return this._gvAgyLocId; }

    set gvAgyLocId(pgvAgyLocId: string) {this.gvAgyLocId = pgvAgyLocId; }

    get pptyItemLength(): number { return this._pptyItemLength; }

    set pptyItemLength(ppptyItemLength: number) { this._pptyItemLength = ppptyItemLength; }

    get containerValue(): number { return this._containerValue; }

    set containerValue(pcontainerValue: number) { this._containerValue = pcontainerValue; }


    get activeFlagTemp(): boolean { return this._activeFlagTemp; }

    set activeFlagTemp( pactiveFlagTemp: boolean ) { this._activeFlagTemp = pactiveFlagTemp; }

    get inserted(): number { return this._inserted; }

    set inserted( pinserted: number ) { this._inserted = pinserted; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get propertyOnlyFlag(): string { return this._propertyOnlyFlag; }

    set propertyOnlyFlag( ppropertyOnlyFlag: string ) { this._propertyOnlyFlag = ppropertyOnlyFlag; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }

    get propertyContainerId(): number { return this._propertyContainerId; }

    set propertyContainerId( ppropertyContainerId: number ) { this._propertyContainerId = ppropertyContainerId; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId( pagyLocId: string ) { this._agyLocId = pagyLocId; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag( pactiveFlag: string ) { this._activeFlag = pactiveFlag; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime( pcreateDateTime: Date ) { this._createDateTime = pcreateDateTime; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime( pmodifyDateTime: Date ) { this._modifyDateTime = pmodifyDateTime; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate( pexpiryDate: Date ) { this._expiryDate = pexpiryDate; }

    get commentText(): string { return this._commentText; }

    set commentText( pcommentText: string ) { this._commentText = pcommentText; }

    get internalLocationId(): number { return this._internalLocationId; }

    set internalLocationId( pinternalLocationId: number ) { this._internalLocationId = pinternalLocationId; }

    get proposedDisposalDate(): Date { return this._proposedDisposalDate; }

    set proposedDisposalDate( pproposedDisposalDate: Date ) { this._proposedDisposalDate = pproposedDisposalDate; }

    get containerCode(): string { return this._containerCode; }

    set containerCode( pcontainerCode: string ) { this._containerCode = pcontainerCode; }

    get sealMark(): string { return this._sealMark; }

    set sealMark( psealMark: string ) { this._sealMark = psealMark; }

    get trnFromAgyLocId(): string { return this._trnFromAgyLocId; }

    set trnFromAgyLocId( ptrnFromAgyLocId: string ) { this._trnFromAgyLocId = ptrnFromAgyLocId; }

    get trnToAgyLocId(): string { return this._trnToAgyLocId; }

    set trnToAgyLocId( ptrnToAgyLocId: string ) { this._trnToAgyLocId = ptrnToAgyLocId; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get propertyStorageId(): number { return this._propertyStorageId; }

    set propertyStorageId( ppropertyStorageId: number ) { this._propertyStorageId = ppropertyStorageId; }

    get disposedTo(): string { return this._disposedTo; }

    set disposedTo( pdisposedTo: string ) { this._disposedTo = pdisposedTo; }

    get disposedToName(): string { return this._disposedToName; }

    set disposedToName( pdisposedToName: string ) { this._disposedToName = pdisposedToName; }

    get offenderId(): number { return this._offenderId; }

    set offenderId( poffenderId: number ) { this._offenderId = poffenderId; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay( poffenderIdDisplay: string ) { this._offenderIdDisplay = poffenderIdDisplay; }

    get offenderName(): string { return this._offenderName; }

    set offenderName( poffenderName: string ) { this._offenderName = poffenderName;; }

    get type(): string { return this._type; }

    set type( ptype: string ) { this._type = ptype; }

    get recievedFrom(): string { return this._recievedFrom; }

    set recievedFrom( precievedFrom: string ) { this._recievedFrom = precievedFrom; }

    get locDisable(): boolean { return this._locDisable; }

    set locDisable( plocDisable: boolean ) { this._locDisable = plocDisable; }
    
    get firstName(): string { return this._firstName; }

    set firstName( pfirstName: string ) { this._firstName = pfirstName; }
    
    get lastName(): string { return this._lastName; }

    set lastName( plastName: string ) { this._lastName = plastName; }
    
    get description(): string { return this._description; }

    set description( pdescription: string ) { this._description = pdescription; }

    get code(): string { return this._code; }

    set code( pcode: string ) { this._code = pcode; }

    get caseLoadId(): string { return this._caseLoadId; }

    set caseLoadId( pcaseLoadId: string ) { this._caseLoadId = pcaseLoadId; }

    get propertyItemSeq(): number { return this._propertyItemSeq; }

    set propertyItemSeq( ppropertyItemSeq: number ) { this._propertyItemSeq = ppropertyItemSeq; }

    get containerId(): number { return this._containerId; }

    set containerId(containerId: number) { this._containerId = containerId; }
    
    get dataFlag(): string { return this._dataFlag; }

    set dataFlag( dataFlag: string ) { this._dataFlag = dataFlag; }
    
    get itemsForContainer() : OffenderPptyItems[] { return this._itemsForContainer } ;

    set itemsForContainer( itemsForContainer: OffenderPptyItems[] ) { this._itemsForContainer = itemsForContainer; }
    
    get moveToContainer() : any[] { return this._moveToContainer } ;

    set moveToContainer( moveToContainer: any[] ) { this._moveToContainer = moveToContainer; }
    
    get containerDescription(): string {return this._containerDescription; }

    set containerDescription(containerDescription: string) {this._containerDescription = containerDescription; }
    
    get imageUrl(): string { return this._imageUrl; }

    set imageUrl(imageUrl: string) { this._imageUrl = imageUrl; }

    get imageId(): number { return this._imageId; }

    set imageId(imageId: number) { this._imageId = imageId; }
    
    get images(): any { return this._images; }

    set images( images: any ) { this._images = images; }
    
    get isDblClicked(): boolean { return this._isDblClicked; }

    set isDblClicked( isDblClicked: boolean ) { this._isDblClicked = isDblClicked; }
    
    get statusCode(): string { return this._statusCode; }

    set statusCode(pstatusCode: string) { this._statusCode = pstatusCode; }
    
    get locationDescription(): string {return this._locationDescription; }

    set locationDescription(locationDescription: string) {this._locationDescription = locationDescription; }
    
    get containerStatus(): string {return this._containerStatus; }

    set containerStatus(containerStatus: string) {this._containerStatus = containerStatus; }
    
    get disableSaveButton(): boolean { return this._disableSaveButton; }

    set disableSaveButton( disableSaveButton: boolean ) { this._disableSaveButton = disableSaveButton; }
    
    get sealShow(): boolean { return this._sealShow; }

    set sealShow( sealShow: boolean ) { this._sealShow = sealShow; }
    
    get cancelTransfer(): string {return this._cancelTransfer; }

    set cancelTransfer(pcancelTransfer: string) {this._cancelTransfer = pcancelTransfer; }

    get cancelReason(): string {return this._cancelReason; }

    set cancelReason(pcancelReason: string) {this._cancelReason = pcancelReason; }

    get cancelLocation(): string {return this._cancelLocation; }

    set cancelLocation(pcancelLocation: string) {this._cancelLocation = pcancelLocation; }

    get rejectFlag(): string {return this._rejectFlag; }

    set rejectFlag(prejectFlag: string) {this._rejectFlag = prejectFlag; }

    get rejectReason(): string {return this._rejectReason; }

    set rejectReason(prejectReason: string) {this._rejectReason = prejectReason; }

    get internalLocationCode(): string {return this._internalLocationCode; }

    set internalLocationCode(pinternalLocationCode: string) {this._internalLocationCode = pinternalLocationCode; }
    
    get internalLocationCodeTemp(): string {return this._internalLocationCodeTemp; }

    set internalLocationCodeTemp(pinternalLocationCodeTemp: string) {this._internalLocationCodeTemp = pinternalLocationCodeTemp; }
    
    get moveTointernalLocation(): string {return this._moveTointernalLocation; }

    set moveTointernalLocation(pmoveTointernalLocation: string) {this._moveTointernalLocation = pmoveTointernalLocation; }
    

    
    toJSON(): any {
        return {
            'propertyOnlyFlag': this._propertyOnlyFlag,
            'offenderBookId': this._offenderBookId,
            'propertyContainerId': this._propertyContainerId,
            'agyLocId': this._agyLocId,
            'activeFlag': this._activeFlag,
            'proposedDisposalDate': this._proposedDisposalDate,
            'commentText': this._commentText,
            'internalLocationId': this._internalLocationId,
            'containerCode': this._containerCode,
            'expiryDate': this._expiryDate,
            'sealMark': this._sealMark,
            'trnFromAgyLocId': this._trnFromAgyLocId,
            'trnToAgyLocId': this._trnToAgyLocId,
            'modifyUserId': this._modifyUserId,
            'createDateTime': this._createDateTime,
            'modifyDateTime': this._modifyDateTime,
            'createUserId': this._createUserId,
            'propertyStorageId': this._propertyStorageId,
            'disposedTo': this._disposedTo,
            'disposedToName': this._disposedToName,
            'sealFlag': this._sealFlag,
            'inserted': this._inserted,
            'recievedFrom': this._recievedFrom,
            'offenderId': this._offenderId,
            'offenderIdDisplay': this._offenderIdDisplay,
            'offenderName': this._offenderName,
            'type': this._type,
            'locDisable': this._locDisable,
            'firstName': this._firstName,
            'lastName': this._lastName,
            'description': this._description,
            'code': this._code,
            'caseLoadId': this._caseLoadId,
            'propertyItemSeq': this._propertyItemSeq,
            'pptyItemLength': this._pptyItemLength,
            'containerValue': this._containerValue,
            'gvAgyLocId': this._gvAgyLocId,
            'itemsForContainer':this._itemsForContainer,
            'containerDescription':this._containerDescription,
            'imageUrl' : this._imageUrl,
            'imageId' : this._imageId,
            'images' :this._images,
            'isDblClicked':this._isDblClicked,
            'statusCode': this._statusCode,
            'locationDescription':this._locationDescription,
            'containerStatus':this._containerStatus,
            'disableSaveButton':this._disableSaveButton,
            'cancelTransfer':this._cancelTransfer,
            'cancelReason':this._cancelReason,
            'cancelLocation':this._cancelLocation,
            'rejectFlag':this._rejectFlag,
            'rejectReason':this._rejectReason,
            'internalLocationCode':this._internalLocationCode,
            'internalLocationCodeTemp':this._internalLocationCodeTemp,
            'moveTointernalLocation':this._moveTointernalLocation,
            'internalLocationIdTemp':this._internalLocationIdTemp,
            'moveToContainerSeal':this._moveToContainerSeal,
            'moveToContainerDesc':this._moveToContainerDesc
        };
    }
}
