export class RgFromAgyLocIdBean {
    private _code: string;
		 private _icrggq0: string;
		 private _fromAgyLocId: string;
		 private _errorMessage: string;
		 private _agyLocId: string;
		 private _description: string;
		 private _departureDate: Date;
		 private _scheduledTripId: number;
		 private _toAgyLocId: string;
		 private _routeName: string;

		 get code(): string{ return this._code; }
		 set code(pcode: string){ this._code = pcode ;}
		 get icrggq0(): string{ return this._icrggq0; }
		 set icrggq0(picrggq0: string){ this._icrggq0 = picrggq0 ;}
		 get fromAgyLocId(): string{ return this._fromAgyLocId; }
		 set fromAgyLocId(pfromAgyLocId: string){ this._fromAgyLocId = pfromAgyLocId ;}
		 get errorMessage(): string{ return this._errorMessage; }
		 set errorMessage(perrorMessage: string){ this._errorMessage = perrorMessage ;}
		 get agyLocId(): string{ return this._agyLocId; }
		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId ;}
		 get description(): string{ return this._description; }
		 set description(pdescription: string){ this._description = pdescription ;}
		 get departureDate(): Date{ return this._departureDate; }
		 set departureDate(pdepartureDate: Date){ this._departureDate = pdepartureDate ;}
		 get scheduledTripId(): number{ return this._scheduledTripId; }
		 set scheduledTripId(pscheduledTripId: number){ this._scheduledTripId = pscheduledTripId ;}
		 get toAgyLocId(): string{ return this._toAgyLocId; }
		 set toAgyLocId(ptoAgyLocId: string){ this._toAgyLocId = ptoAgyLocId ;}
		 get routeName(): string{ return this._routeName; }
		 set routeName(prouteName: string){ this._routeName = prouteName ;}

 	toJSON(): any {
 		return { 
			'code': this._code,
			'icrggq0': this._icrggq0,
			'fromAgyLocId': this._fromAgyLocId,
			'errorMessage': this._errorMessage,
			'agyLocId': this._agyLocId,
			'description': this._description,
			'departureDate': this._departureDate,
			'scheduledTripId': this._scheduledTripId,
			'toAgyLocId': this._toAgyLocId,
			'routeName': this._routeName,
 			};
 		} 
 }
