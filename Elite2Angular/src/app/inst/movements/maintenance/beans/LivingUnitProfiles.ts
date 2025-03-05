	export class LivingUnitProfiles {
		 private _livingUnitId: number;
		 private _serialVersionUID: number;
		 private _intLocProfileType: string;
		 private _profileId: number;
		 private _agyLocId: string;
		 private _description: string;
		 private _intLocProfileCode: string;

		 get livingUnitId(): number{ return this._livingUnitId; }
		 set livingUnitId(plivingUnitId: number){ this._livingUnitId = plivingUnitId ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get intLocProfileType(): string{ return this._intLocProfileType; }
		 set intLocProfileType(pintLocProfileType: string){ this._intLocProfileType = pintLocProfileType ;}
		 get profileId(): number{ return this._profileId; }
		 set profileId(pprofileId: number){ this._profileId = pprofileId ;}
		 get agyLocId(): string{ return this._agyLocId; }
		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
		 get description(): string{ return this._description; }
		 set description(pdescription: string){ this._description = pdescription ;}
		 get intLocProfileCode(): string{ return this._intLocProfileCode; }
		 set intLocProfileCode(pintLocProfileCode: string){ this._intLocProfileCode = pintLocProfileCode ;}

 	toJSON(): any {
 		return { 
			'livingUnitId': this._livingUnitId,
			'serialVersionUID': this._serialVersionUID,
			'intLocProfileType': this._intLocProfileType,
			'profileId': this._profileId,
			'agyLocId': this._agyLocId,
			'description': this._description,
			'intLocProfileCode': this._intLocProfileCode,
 			};
 		}  
 }