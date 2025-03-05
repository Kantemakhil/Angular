import { BaseModel } from './../../../common/beans/BaseModel';
export class HousingBean extends BaseModel{
          private _lastName: string;
		 private _cellSharingConflict: string;
		 private _floorPlanId: number;
		 private _parentLocId: number;
		 private _offenderBookId: number;
		 private _offenderIdDisplay: string;
		 private _description: string;
		 private _offenderConflict: string;
		 private _pLevel4Code: string;
		 private _capacity: number;
		 private _availBeds: number;
		 private _internalLocationCode: string;
		 private _pLevel1Code: string;
		 private _yCoordinate: number;
		 private _internalLocationId: number;
		 private _imageObjectId: number;
		 private _imageId: number;
		 private _internalLocHotspotId: number;
		 private _parentFloorPlan: number;
		 private _oprationalConflict: string;
		 private _internalLocId: number;
		 private _pLevel2Code: string;
		 private _xCoordinate: number;
		 private _firstName: string;
		 private _internalLocationType: string;
		 private _housingId: number;
		 private _agyLocId: string;
		 private _totalBeds: number;
		 private _allocatedBeds: number;
		 private _pLevel3Code: string;
		 private _offenderId: number;
		 private _securityConflict: string;
		 private _rootFloorPlan: string;
		 private _floorPlanNextId: number;
		 private _imageThumbnail: any;

		 get lastName(): string{ return this._lastName; }
		 set lastName(plastName: string){ this._lastName = plastName ;}
		 get cellSharingConflict(): string{ return this._cellSharingConflict; }
		 set cellSharingConflict(pcellSharingConflict: string){ this._cellSharingConflict = pcellSharingConflict ;}
		 get floorPlanId(): number{ return this._floorPlanId; }
		 set floorPlanId(pfloorPlanId: number){ this._floorPlanId = pfloorPlanId ;}
		 get parentLocId(): number{ return this._parentLocId; }
		 set parentLocId(pparentLocId: number){ this._parentLocId = pparentLocId ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get offenderIdDisplay(): string{ return this._offenderIdDisplay; }
		 set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay ;}
		 get description(): string{ return this._description; }
		 set description(pdescription: string){ this._description = pdescription ;}
		 get offenderConflict(): string{ return this._offenderConflict; }
		 set offenderConflict(poffenderConflict: string){ this._offenderConflict = poffenderConflict ;}
		 get pLevel4Code(): string{ return this._pLevel4Code; }
		 set pLevel4Code(ppLevel4Code: string){ this._pLevel4Code = ppLevel4Code ;}
		 get capacity(): number{ return this._capacity; }
		 set capacity(pcapacity: number){ this._capacity = pcapacity ;}
		 get availBeds(): number{ return this._availBeds; }
		 set availBeds(pavailBeds: number){ this._availBeds = pavailBeds ;}
		 get internalLocationCode(): string{ return this._internalLocationCode; }
		 set internalLocationCode(pinternalLocationCode: string){ this._internalLocationCode = pinternalLocationCode ;}
		 get pLevel1Code(): string{ return this._pLevel1Code; }
		 set pLevel1Code(ppLevel1Code: string){ this._pLevel1Code = ppLevel1Code ;}
		 get yCoordinate(): number{ return this._yCoordinate; }
		 set yCoordinate(pyCoordinate: number){ this._yCoordinate = pyCoordinate ;}
		 get internalLocationId(): number{ return this._internalLocationId; }
		 set internalLocationId(pinternalLocationId: number){ this._internalLocationId = pinternalLocationId ;}
		
		 get imageObjectId(): number{ return this._imageObjectId; }
		 set imageObjectId(pimageObjectId: number){ this._imageObjectId = pimageObjectId ;}
		 get imageId(): number{ return this._imageId; }
		 set imageId(pimageId: number){ this._imageId = pimageId ;}
		 get internalLocHotspotId(): number{ return this._internalLocHotspotId; }
		 set internalLocHotspotId(pinternalLocHotspotId: number){ this._internalLocHotspotId = pinternalLocHotspotId ;}
		 get parentFloorPlan(): number{ return this._parentFloorPlan; }
		 set parentFloorPlan(pparentFloorPlan: number){ this._parentFloorPlan = pparentFloorPlan ;}
		 get oprationalConflict(): string{ return this._oprationalConflict; }
		 set oprationalConflict(poprationalConflict: string){ this._oprationalConflict = poprationalConflict ;}
		 get internalLocId(): number{ return this._internalLocId; }
		 set internalLocId(pinternalLocId: number){ this._internalLocId = pinternalLocId ;}
		 get pLevel2Code(): string{ return this._pLevel2Code; }
		 set pLevel2Code(ppLevel2Code: string){ this._pLevel2Code = ppLevel2Code ;}
		 get xCoordinate(): number{ return this._xCoordinate; }
		 set xCoordinate(pxCoordinate: number){ this._xCoordinate = pxCoordinate ;}
		 get firstName(): string{ return this._firstName; }
		 set firstName(pfirstName: string){ this._firstName = pfirstName ;}
		 get internalLocationType(): string{ return this._internalLocationType; }
		 set internalLocationType(pinternalLocationType: string){ this._internalLocationType = pinternalLocationType ;}
		 get housingId(): number{ return this._housingId; }
		 set housingId(phousingId: number){ this._housingId = phousingId ;}
		 get agyLocId(): string{ return this._agyLocId; }
		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
		 get totalBeds(): number{ return this._totalBeds; }
		 set totalBeds(ptotalBeds: number){ this._totalBeds = ptotalBeds ;}
		 get allocatedBeds(): number{ return this._allocatedBeds; }
		 set allocatedBeds(pallocatedBeds: number){ this._allocatedBeds = pallocatedBeds ;}
		 get pLevel3Code(): string{ return this._pLevel3Code; }
		 set pLevel3Code(ppLevel3Code: string){ this._pLevel3Code = ppLevel3Code ;}
		 get offenderId(): number{ return this._offenderId; }
		 set offenderId(poffenderId: number){ this._offenderId = poffenderId ;}
		 get securityConflict(): string{ return this._securityConflict; }
		 set securityConflict(psecurityConflict: string){ this._securityConflict = psecurityConflict ;}
		 get rootFloorPlan(): string{ return this._rootFloorPlan; }
		 set rootFloorPlan(prootFloorPlan: string){ this._rootFloorPlan = prootFloorPlan ;}
		 get floorPlanNextId(): number{ return this._floorPlanNextId; }
		 set floorPlanNextId(pfloorPlanNextId: number){ this._floorPlanNextId = pfloorPlanNextId ;}
		 get imageThumbnail(): any { return this._imageThumbnail; }

		 set imageThumbnail(pimageThumbnail: any) { this._imageThumbnail = pimageThumbnail; }

 	toJSON(): any {
 		return { 
			'lastName': this._lastName,
			'cellSharingConflict': this._cellSharingConflict,
			'floorPlanId': this._floorPlanId,
			'parentLocId': this._parentLocId,
			'offenderBookId': this._offenderBookId,
			'offenderIdDisplay': this._offenderIdDisplay,
			'description': this._description,
			'offenderConflict': this._offenderConflict,
			'pLevel4Code': this._pLevel4Code,
			'capacity': this._capacity,
			'availBeds': this._availBeds,
			'internalLocationCode': this._internalLocationCode,
			'pLevel1Code': this._pLevel1Code,
			'yCoordinate': this._yCoordinate,
			'internalLocationId': this._internalLocationId,
			'imageObjectId': this._imageObjectId,
			'imageId': this._imageId,
			'internalLocHotspotId': this._internalLocHotspotId,
			'parentFloorPlan': this._parentFloorPlan,
			'oprationalConflict': this._oprationalConflict,
			'internalLocId': this._internalLocId,
			'pLevel2Code': this._pLevel2Code,
			'xCoordinate': this._xCoordinate,
			'firstName': this._firstName,
			'internalLocationType': this._internalLocationType,
			'housingId': this._housingId,
			'agyLocId': this._agyLocId,
			'totalBeds': this._totalBeds,
			'allocatedBeds': this._allocatedBeds,
			'pLevel3Code': this._pLevel3Code,
			'offenderId': this._offenderId,
			'securityConflict': this._securityConflict,
			'rootFloorPlan': this._rootFloorPlan,
			'floorPlanNextId': this._floorPlanNextId,
			'imageThumbnail': this._imageThumbnail,
 			};
 		} 


}