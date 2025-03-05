import {BaseModel} from '@commonbeans/BaseModel';	
export class VIntLocUsageLocations extends BaseModel {
		 private _eventSubType: string;
		 private _internalLocationUsage: string;
		 private _intLocDeactivateDate: number;
		 private _parentUsageLocationId: number;
		 private _description: string;
		 private _usageLocationId: number;
		 private _userDesc: string;
		 private _lowestLevelFlag: string;
		 private _capacity: number;
		 private _serialVersionUID: number;
		 private _internalLocationCode: string;
		 private _internalLocationUsageId: number;
		 private _agyLocId: string;
		 private _listSeq: number;
		 private _usageLocationType: string;
		 private _internalLocationId: number;
         private _select: string;

		 get eventSubType(): string{ return  this._eventSubType }

		 set eventSubType(peventSubType: string){ this._eventSubType = peventSubType }

		 get internalLocationUsage(): string{ return  this._internalLocationUsage }

		 set internalLocationUsage(pinternalLocationUsage: string){ this._internalLocationUsage = pinternalLocationUsage }

		 get intLocDeactivateDate(): number{ return  this._intLocDeactivateDate }

		 set intLocDeactivateDate(pintLocDeactivateDate: number){ this._intLocDeactivateDate = pintLocDeactivateDate }

		 get parentUsageLocationId(): number{ return  this._parentUsageLocationId }

		 set parentUsageLocationId(pparentUsageLocationId: number){ this._parentUsageLocationId = pparentUsageLocationId }

		 get description(): string{ return  this._description }

		 set description(pdescription: string){ this._description = pdescription }

		 get usageLocationId(): number{ return  this._usageLocationId }

		 set usageLocationId(pusageLocationId: number){ this._usageLocationId = pusageLocationId }

		 get userDesc(): string{ return  this._userDesc }

		 set userDesc(puserDesc: string){ this._userDesc = puserDesc }

		 get lowestLevelFlag(): string{ return  this._lowestLevelFlag }

		 set lowestLevelFlag(plowestLevelFlag: string){ this._lowestLevelFlag = plowestLevelFlag }

		 get capacity(): number{ return  this._capacity }

		 set capacity(pcapacity: number){ this._capacity = pcapacity }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get internalLocationCode(): string{ return  this._internalLocationCode }

		 set internalLocationCode(pinternalLocationCode: string){ this._internalLocationCode = pinternalLocationCode }

		 get internalLocationUsageId(): number{ return  this._internalLocationUsageId }

		 set internalLocationUsageId(pinternalLocationUsageId: number){ this._internalLocationUsageId = pinternalLocationUsageId }

		 get agyLocId(): string{ return  this._agyLocId }

		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId }

		 get listSeq(): number{ return  this._listSeq }

		 set listSeq(plistSeq: number){ this._listSeq = plistSeq }

		 get usageLocationType(): string{ return  this._usageLocationType }

		 set usageLocationType(pusageLocationType: string){ this._usageLocationType = pusageLocationType }

		 get internalLocationId(): number{ return  this._internalLocationId }

		 set internalLocationId(pinternalLocationId: number){ this._internalLocationId = pinternalLocationId }
		 
		 get select(): string{ return  this._select }

         set select(pselect: string){ this._select = pselect }


 	toJSON(): any {
 		return { 
			'eventSubType': this._eventSubType,
			'internalLocationUsage': this._internalLocationUsage,
			'intLocDeactivateDate': this._intLocDeactivateDate,
			'parentUsageLocationId': this._parentUsageLocationId,
			'description': this._description,
			'usageLocationId': this._usageLocationId,
			'userDesc': this._userDesc,
			'lowestLevelFlag': this._lowestLevelFlag,
			'capacity': this._capacity,
			'serialVersionUID': this._serialVersionUID,
			'internalLocationCode': this._internalLocationCode,
			'internalLocationUsageId': this._internalLocationUsageId,
			'agyLocId': this._agyLocId,
			'listSeq': this._listSeq,
			'usageLocationType': this._usageLocationType,
			'internalLocationId': this._internalLocationId,
			'select': this._select,
 			};
 		}  
 }