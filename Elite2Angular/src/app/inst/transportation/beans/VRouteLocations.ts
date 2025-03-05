export class VRouteLocations {
		 private _toSeq: string;
		 private _fromAgyLocId: string;
		 private _fromSeq: string;
		 private _segmentLength: number;
		 private _toAgyLocId: string;
		 private _routeName: string;
		 private _vacancy:number;

		 get vacancy(): number{ return this._vacancy; }
		 set vacancy(pvacancy: number){ this._vacancy = pvacancy ;}
		 get toSeq(): string{ return this._toSeq; }
		 set toSeq(ptoSeq: string){ this._toSeq = ptoSeq ;}
		 get fromAgyLocId(): string{ return this._fromAgyLocId; }
		 set fromAgyLocId(pfromAgyLocId: string){ this._fromAgyLocId = pfromAgyLocId ;}
		 get fromSeq(): string{ return this._fromSeq; }
		 set fromSeq(pfromSeq: string){ this._fromSeq = pfromSeq ;}
		 get segmentLength(): number{ return this._segmentLength; }
		 set segmentLength(psegmentLength: number){ this._segmentLength = psegmentLength ;}
		 get toAgyLocId(): string{ return this._toAgyLocId; }
		 set toAgyLocId(ptoAgyLocId: string){ this._toAgyLocId = ptoAgyLocId ;}
		 get routeName(): string{ return this._routeName; }
		 set routeName(prouteName: string){ this._routeName = prouteName ;}

 	toJSON(): any {
 		return { 
			'toSeq': this._toSeq,
			'fromAgyLocId': this._fromAgyLocId,
			'fromSeq': this._fromSeq,
			'segmentLength': this._segmentLength,
			'toAgyLocId': this._toAgyLocId,
			'routeName': this._routeName,
			'vacancy':this._vacancy,
 			};
 		} 
 }