	export class VIntLocSummaries {
		 private _parentInternalLocationId: number;
		 private _userDesc: String;
		 private _inLocations:number
		 private _trackingFlag: String;
		 private _internalLocationDesc: String;
		 private _capacity:number
		 private _internalLocationCode: String;
		 private _deactivateDate: Date;
		 private _internalLocationType: String;
		 private _agyLocId: String;
		 private _listSeq:number
		 private _internalLocationTypeDesc: String;
		 private _internalLocationId:number
		 private _activeFlag: String;
		 private _nextButton: String;

		 get parentInternalLocationId(): number{ return this._parentInternalLocationId; }
		 set parentInternalLocationId(pparentInternalLocationId: number){ this._parentInternalLocationId = pparentInternalLocationId ;}
		 get userDesc(): String{ return this._userDesc; }
		 set userDesc(puserDesc: String){ this._userDesc = puserDesc ;}
		 get inLocations(): number{ return this._inLocations; }
		 set inLocations(pinLocations: number){ this._inLocations = pinLocations ;}
		 get trackingFlag(): String{ return this._trackingFlag; }
		 set trackingFlag(ptrackingFlag: String){ this._trackingFlag = ptrackingFlag ;}
		 get internalLocationDesc(): String{ return this._internalLocationDesc; }
		 set internalLocationDesc(pinternalLocationDesc: String){ this._internalLocationDesc = pinternalLocationDesc ;}
		 get capacity(): number{ return this._capacity; }
		 set capacity(pcapacity: number){ this._capacity = pcapacity ;}
		 get internalLocationCode(): String{ return this._internalLocationCode; }
		 set internalLocationCode(pinternalLocationCode: String){ this._internalLocationCode = pinternalLocationCode ;}
		 get deactivateDate(): Date{ return this._deactivateDate; }
		 set deactivateDate(pdeactivateDate: Date){ this._deactivateDate = pdeactivateDate ;}
		 get internalLocationType(): String{ return this._internalLocationType; }
		 set internalLocationType(pinternalLocationType: String){ this._internalLocationType = pinternalLocationType ;}
		 get agyLocId(): String{ return this._agyLocId; }
		 set agyLocId(pagyLocId: String){ this._agyLocId = pagyLocId ;}
		 get listSeq(): number{ return this._listSeq; }
		 set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
		 get internalLocationTypeDesc(): String{ return this._internalLocationTypeDesc; }
		 set internalLocationTypeDesc(pinternalLocationTypeDesc: String){ this._internalLocationTypeDesc = pinternalLocationTypeDesc ;}
		 get internalLocationId(): number{ return this._internalLocationId; }
		 set internalLocationId(pinternalLocationId: number){ this._internalLocationId = pinternalLocationId ;}
		 get activeFlag(): String{ return this._activeFlag; }
		 set activeFlag(pactiveFlag: String){ this._activeFlag = pactiveFlag ;}
		 get nextButton(): String{ return this._nextButton; }
         set nextButton(pnextButton: String){ this._nextButton = pnextButton ;}


 	toJSON(): any {
 		return { 
			'parentInternalLocationId': this._parentInternalLocationId,
			'userDesc': this._userDesc,
			'inLocations': this._inLocations,
			'trackingFlag': this._trackingFlag,
			'internalLocationDesc': this._internalLocationDesc,
			'capacity': this._capacity,
			'internalLocationCode': this._internalLocationCode,
			'deactivateDate': this._deactivateDate,
			'internalLocationType': this._internalLocationType,
			'agyLocId': this._agyLocId,
			'listSeq': this._listSeq,
			'internalLocationTypeDesc': this._internalLocationTypeDesc,
			'internalLocationId': this._internalLocationId,
			'activeFlag': this._activeFlag,
			'nextButton': this._nextButton,
 			};
 		}  
 }