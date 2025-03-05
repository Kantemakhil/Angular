export class ScheduledTrips {
		 private _cancelDate: Date;
		 private _createUserId: string;
		 private _physicalCapacity: number;
		 private _modifyDatetime: Date;
		 private _estDepartureTime: Date;
		 private _modifyUserId: string;
		 private _description: string;
		 private _actCompletionTime: Date;
		 private _scheduledTripId: number;
		 private _cancelFlag: string;
		 private _routeName: string;
		 private _createDatetime: Date;
		 private _actDepartureTime: Date;
		 private _tripCode: string;
		 private _estCompletionTime: Date;
		 private _cancelBy: string;
		 private _completionDate: Date;
		 private _departureDate: Date;
		 private _sealFlag: string;
		 private _status: string;

		 get cancelDate(): Date{ return this._cancelDate; }
		 set cancelDate(pcancelDate: Date){ this._cancelDate = pcancelDate ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get physicalCapacity(): number{ return this._physicalCapacity; }
		 set physicalCapacity(pphysicalCapacity: number){ this._physicalCapacity = pphysicalCapacity ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get estDepartureTime(): Date{ return this._estDepartureTime; }
		 set estDepartureTime(pestDepartureTime: Date){ this._estDepartureTime = pestDepartureTime ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get description(): string{ return this._description; }
		 set description(pdescription: string){ this._description = pdescription ;}
		 get actCompletionTime(): Date{ return this._actCompletionTime; }
		 set actCompletionTime(pactCompletionTime: Date){ this._actCompletionTime = pactCompletionTime ;}
		 get scheduledTripId(): number{ return this._scheduledTripId; }
		 set scheduledTripId(pscheduledTripId: number){ this._scheduledTripId = pscheduledTripId ;}
		 get cancelFlag(): string{ return this._cancelFlag; }
		 set cancelFlag(pcancelFlag: string){ this._cancelFlag = pcancelFlag ;}
		 get routeName(): string{ return this._routeName; }
		 set routeName(prouteName: string){ this._routeName = prouteName ;}
		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get actDepartureTime(): Date{ return this._actDepartureTime; }
		 set actDepartureTime(pactDepartureTime: Date){ this._actDepartureTime = pactDepartureTime ;}
		 get tripCode(): string{ return this._tripCode; }
		 set tripCode(ptripCode: string){ this._tripCode = ptripCode ;}
		 get estCompletionTime(): Date{ return this._estCompletionTime; }
		 set estCompletionTime(pestCompletionTime: Date){ this._estCompletionTime = pestCompletionTime ;}
		 get cancelBy(): string{ return this._cancelBy; }
		 set cancelBy(pcancelBy: string){ this._cancelBy = pcancelBy ;}
		 get completionDate(): Date{ return this._completionDate; }
		 set completionDate(pcompletionDate: Date){ this._completionDate = pcompletionDate ;}
		 get departureDate(): Date{ return this._departureDate; }
		 set departureDate(pdepartureDate: Date){ this._departureDate = pdepartureDate ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get status(): string{ return this._status; }
		 set status(pstatus: string){ this._status = pstatus ;}

 	toJSON(): any {
 		return { 
			'cancelDate': this._cancelDate,
			'createUserId': this._createUserId,
			'physicalCapacity': this._physicalCapacity,
			'modifyDatetime': this._modifyDatetime,
			'estDepartureTime': this._estDepartureTime,
			'modifyUserId': this._modifyUserId,
			'description': this._description,
			'actCompletionTime': this._actCompletionTime,
			'scheduledTripId': this._scheduledTripId,
			'cancelFlag': this._cancelFlag,
			'routeName': this._routeName,
			'createDatetime': this._createDatetime,
			'actDepartureTime': this._actDepartureTime,
			'tripCode': this._tripCode,
			'estCompletionTime': this._estCompletionTime,
			'cancelBy': this._cancelBy,
			'completionDate': this._completionDate,
			'departureDate': this._departureDate,
			'sealFlag': this._sealFlag,
			'status': this._status,
 			};
 		} 
 }
