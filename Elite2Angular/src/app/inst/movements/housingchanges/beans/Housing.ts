import {BaseModel} from '@commonbeans/BaseModel';
export class Housing extends BaseModel {
    
    private _housingId :number;
    private _agyLocId:string;
    private  _internalLocationType:string;
    private _internalLocationId:number;
    private _internalLocHotSpotId:number;
    private _internalLocationCode :string;
    private _xCoordinate:number ;
    private  _yCoordinate:number;
    private  _parentLocId:number;
    private _totalBeds:number;
    private _availBeds:number;
    private _allocatedBeds:number;
    private _height:string;
    private _top:string;
    private _left:string;
    private _offenderBookId:number;
    private _offenderId:number; 
    private _oprationalConflict:string; 
    private _securityConflict:string; 
    private _offenderConflict:string; 
    private _cellSharingConflict:string;
    private _isAssignable:boolean;   
    private _imageId:number;
    private _floorPlanId: number;
    private _description: string;
    private _floorPlanNextId:number;
    private _rootFloorPlan:string;
    private _totalConflicts:number;
    private _isConflictView:boolean;
    private _firstName:string;
    private _lastName:string;
    private _isViewEnable:boolean;
    private _image: any;
    private _conflict:string;
    private _showOffenderDetails:boolean=false;
    private _showBedsDetails:boolean=true;
    private _showOnlyConflicts:boolean=false;
    private _capacity:number;
    private _imageObjectId:number;
    private _hotspotStyle:string;
    private _cell:number;
    private _bed:string;
    private _pLevel1Code: string;
    private _pLevel2Code: string;
    private _pLevel3Code: string;
    private _pLevel4Code: string;
    private _baseClass:string;
    private _isExploreFurtherEnable:boolean;
    private _cellCode:string;
    private _imageThumbnail: any;
    private _offenderIdDisplay: string;

get image(): any { return this._image; }

set image( image: any ) { this._image = image; }

get housingId(): number { return  this._housingId; }

set housingId(housingId: number) { this._housingId = housingId; }

get agyLocId(): string { return  this._agyLocId; }

set agyLocId(agyLocId: string) { this._agyLocId = agyLocId; }

get internalLocationType(): string { return  this._internalLocationType; }

set internalLocationType(internalLocationType: string) { this._internalLocationType = internalLocationType; }

get internalLocationId(): number { return  this._internalLocationId; }

set internalLocationId(internalLocationId: number) { this._internalLocationId = internalLocationId; }

get internalLocHotSpotId(): number { return  this._internalLocHotSpotId; }

set internalLocHotSpotId(internalLocHotSpotId: number) { this._internalLocHotSpotId = internalLocHotSpotId; }

get internalLocationCode(): string { return  this._internalLocationCode; }

set internalLocationCode(internalLocationCode: string) { this._internalLocationCode = internalLocationCode; }

get xCoordinate():number { return  this._xCoordinate; }

set xCoordinate(xCoordinate: number) { this._xCoordinate = xCoordinate; }

get yCoordinate(): number { return  this._yCoordinate; }

set yCoordinate(yCoordinate: number) { this._yCoordinate = yCoordinate; }

get parentLocId(): number { return  this._parentLocId; }

set parentLocId(parentLocId: number) { this._parentLocId = parentLocId; }

get totalBeds(): number { return  this._totalBeds; }

set totalBeds(totalBeds: number) { this._totalBeds = totalBeds; }

get availBeds(): number { return  this._availBeds; }

set availBeds(availBeds: number) { this._availBeds = availBeds; }

get allocatedBeds(): number { return  this._allocatedBeds; }

set allocatedBeds(allocatedBeds: number) { this._allocatedBeds = allocatedBeds; }

get height(): string { return  this._height; }

set height(height: string) { this._height= height; }

get top(): string { return  this._top; }

set top(top: string) { this._top = top; }

get left(): string { return  this._left; }

set left(left: string) { this._left = left; }

get offenderBookId(): number { return  this._offenderBookId; }
set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }

get offenderId(): number { return  this._offenderId; }
set offenderId(offenderId: number) { this._offenderId = offenderId; }

get oprationalConflict(): string { return  this._oprationalConflict; }
set oprationalConflict(oprationalConflict: string) { this._oprationalConflict = oprationalConflict; }

get securityConflict(): string { return  this._securityConflict; }
set securityConflict(securityConflict: string) { this._securityConflict = securityConflict; }

get offenderConflict(): string { return  this._offenderConflict; }
set offenderConflict(offenderConflict: string) { this._offenderConflict = offenderConflict; }

get cellSharingConflict(): string { return  this._cellSharingConflict; }
set cellSharingConflict(cellSharingConflict: string) { this._cellSharingConflict = cellSharingConflict; }

get isAssignable(): boolean { return  this._isAssignable; }

set isAssignable(isAssignable: boolean) { this._isAssignable = isAssignable; }

get imageId(): number { return  this._imageId; }

set imageId(imageId: number) { this._imageId = imageId; }

get floorPlanId(): number { return  this._floorPlanId; }

set floorPlanId(floorPlanId: number) { this._floorPlanId = floorPlanId; }

get description(): string { return  this._description; }

set description(description: string) { this._description = description; }

get floorPlanNextId(): number { return  this._floorPlanNextId; }

set floorPlanNextId(floorPlanNextId: number) { this._floorPlanNextId = floorPlanNextId; }

get rootFloorPlan(): string { return  this._rootFloorPlan; }

set rootFloorPlan(rootFloorPlan: string) { this._rootFloorPlan = rootFloorPlan; } 

get firstName(): string { return  this._firstName; }
set firstName(firstName: string) { this._firstName = firstName; }

get lastName(): string { return  this._lastName; }
set lastName(lastName: string) { this._lastName = lastName; }


get totalConflicts(): number { return  this._totalConflicts; }
set totalConflicts(totalConflicts: number) { this._totalConflicts = totalConflicts; }

get isConflictView(): boolean { return  this._isConflictView; }
set isConflictView(isConflictView: boolean) { this._isConflictView = isConflictView; }

get isViewEnable(): boolean { return  this._isViewEnable; }

set isViewEnable(isViewEnable: boolean) { this._isViewEnable = isViewEnable; }

get conflict(): string { return  this._conflict; }

set conflict(conflict: string) { this._conflict = conflict; }

get showOffenderDetails(): boolean { return  this._showOffenderDetails; }

set showOffenderDetails(showOffenderDetails: boolean) { this._showOffenderDetails = showOffenderDetails; }

get showBedsDetails(): boolean { return  this._showBedsDetails; }

set showBedsDetails(showBedsDetails: boolean) { this._showBedsDetails = showBedsDetails; }

get showOnlyConflicts(): boolean { return  this._showOnlyConflicts; }

set showOnlyConflicts(showOnlyConflicts: boolean) { this._showOnlyConflicts = showOnlyConflicts; }

get capacity(): number { return  this._capacity; }

set capacity(capacity: number) { this._capacity = capacity; }

get imageObjectId(): number { return  this._imageObjectId; }
set imageObjectId(imageObjectId: number) { this._imageObjectId = imageObjectId; }

get hotspotStyle(): string { return  this._hotspotStyle; }

set hotspotStyle(hotspotStyle: string) { this._hotspotStyle = hotspotStyle; }

get cell(): number { return  this._cell; }
set cell(cell: number) { this._cell = cell; }

get bed(): string { return  this._bed; }
set bed(bed: string) { this._bed = bed; }

get pLevel1Code(): string { return this._pLevel1Code; }

set pLevel1Code(pLevel1Code: string) { this._pLevel1Code = pLevel1Code; }

get pLevel2Code(): string { return this._pLevel2Code; }

set pLevel2Code(pLevel2Code: string) { this._pLevel2Code = pLevel2Code; }

get pLevel3Code(): string { return this._pLevel3Code; }

set pLevel3Code(pLevel3Code: string) { this._pLevel3Code = pLevel3Code; }

get pLevel4Code(): string { return this._pLevel4Code; }

set pLevel4Code(pLevel4Code: string) { this._pLevel4Code = pLevel4Code; }

get baseClass(): any { return this._baseClass; }

set baseClass( baseClass: any ) { this._baseClass = baseClass; }

set isExploreFurtherEnable(isExploreFurtherEnable: boolean) { this._isExploreFurtherEnable = isExploreFurtherEnable; }

get isExploreFurtherEnable(): boolean { return  this._isExploreFurtherEnable; }

get cellCode(): string { return  this._cellCode; }
set cellCode(cellCode: string) { this._cellCode = cellCode; }

get imageThumbnail(): any { return this._imageThumbnail; }
set imageThumbnail(pimageThumbnail: any) { this._imageThumbnail = pimageThumbnail; }

get offenderIdDisplay(): string { return this._offenderIdDisplay; }

set offenderIdDisplay( poffenderIdDisplay: string ) { this._offenderIdDisplay = poffenderIdDisplay; }

tojason(): any {
    return{
        'housingId': this._housingId,
        'agyLocId': this._agyLocId,
        'internalLocationType': this._internalLocationType,
        'internalLocationId': this._internalLocationId,
        'internalLocationCode': this._internalLocationCode,
        'internalLocHotSpotId': this._internalLocHotSpotId,
        'xCodinate': this._xCoordinate,
        'yCodinate': this._yCoordinate,
        'parentLocId': this._parentLocId,
        'totalBeds': this._totalBeds,
        'availBeds': this._availBeds,
        'allocatedBeds': this._allocatedBeds,
        'height': this._height,
        'top': this._top,
        'left': this._left,
        'offenderBookId': this._offenderBookId,
        'offenderId': this._offenderId,
        'oprationalConflict': this._oprationalConflict,
        'securityConflict': this._securityConflict,
        'offenderConflict': this._offenderConflict,
        'cellSharingConflict': this._cellSharingConflict,
        'isAssignable': this._isAssignable,
        'imageId': this._imageId,
        'floorPlanId': this._floorPlanId,
        'description': this._description,
        'floorPlanNextId': this._floorPlanNextId,
        'rootFloorPlan': this._rootFloorPlan,
        'firstName': this._firstName,
        'lastName': this._lastName,
        'isViewEnable': this._isViewEnable,
        'image': this._image,
        'conflict':this._conflict,
        'showOffenderDetails':this._showOffenderDetails,
        'showBedsDetails':this._showBedsDetails,
        'showOnlyConflicts':this._showOnlyConflicts,
        'capacity':this._capacity,
        'imageObjectId':this._imageObjectId,
        'pLevel1Code': this._pLevel1Code,
        'pLevel2Code': this._pLevel2Code,
        'pLevel3Code': this._pLevel3Code,
        'pLevel4Code': this._pLevel4Code,
        'isExploreFurtherEnable':this._isExploreFurtherEnable,
        'cellCode': this._cellCode,
        'imageThumbnail': this._imageThumbnail,
        'offenderIdDisplay': this._offenderIdDisplay
    }
    
}

}
