	export class VPrisonStatusCount {
		 private _serialVersionUID: number;
		 private _imprisonmentStatus: string;
		 private _maleCount: number;
		 private _agyLocId: string;
		 private _totalCount: number;
		 private _femaleCount: number;

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get imprisonmentStatus(): string{ return  this._imprisonmentStatus }

		 set imprisonmentStatus(pimprisonmentStatus: string){ this._imprisonmentStatus = pimprisonmentStatus }

		 get maleCount(): number{ return  this._maleCount }

		 set maleCount(pmaleCount: number){ this._maleCount = pmaleCount }

		 get agyLocId(): string{ return  this._agyLocId }

		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId }

		 get totalCount(): number{ return  this._totalCount }

		 set totalCount(ptotalCount: number){ this._totalCount = ptotalCount }

		 get femaleCount(): number{ return  this._femaleCount }

		 set femaleCount(pfemaleCount: number){ this._femaleCount = pfemaleCount }


 	toJSON(): any {
 		return { 
			'serialVersionUID': this._serialVersionUID,
			'imprisonmentStatus': this._imprisonmentStatus,
			'maleCount': this._maleCount,
			'agyLocId': this._agyLocId,
			'totalCount': this._totalCount,
			'femaleCount': this._femaleCount,
 			};
 		}  
 }