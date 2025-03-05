import { BaseModel } from '@commonbeans/BaseModel';	
export class VOiusstri extends BaseModel  {
		 private _actDepartureTime: number;
		 private _serialVersionUID: number;
		 private _estDepartureTime: number;
		 private _description: string;
		 private _departureDate: number;
		 private _estCompTime: number;
		 private _scheduledTripId: number;
		 private _routeName: string;
		 private _status: string;

		 get actDepartureTime(): number{ return  this._actDepartureTime }

		 set actDepartureTime(pactDepartureTime: number){ this._actDepartureTime = pactDepartureTime }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get estDepartureTime(): number{ return  this._estDepartureTime }

		 set estDepartureTime(pestDepartureTime: number){ this._estDepartureTime = pestDepartureTime }

		 get description(): string{ return  this._description }

		 set description(pdescription: string){ this._description = pdescription }

		 get departureDate(): number{ return  this._departureDate }

		 set departureDate(pdepartureDate: number){ this._departureDate = pdepartureDate }

		 get estCompTime(): number{ return  this._estCompTime }

		 set estCompTime(pestCompTime: number){ this._estCompTime = pestCompTime }

		 get scheduledTripId(): number{ return  this._scheduledTripId }

		 set scheduledTripId(pscheduledTripId: number){ this._scheduledTripId = pscheduledTripId }

		 get routeName(): string{ return  this._routeName }

		 set routeName(prouteName: string){ this._routeName = prouteName }

		 get status(): string{ return  this._status }

		 set status(pstatus: string){ this._status = pstatus }


 	toJSON(): any {
 		return { 
			'actDepartureTime': this._actDepartureTime,
			'serialVersionUID': this._serialVersionUID,
			'estDepartureTime': this._estDepartureTime,
			'description': this._description,
			'departureDate': this._departureDate,
			'estCompTime': this._estCompTime,
			'scheduledTripId': this._scheduledTripId,
			'routeName': this._routeName,
			'status': this._status,
 			};
 		}  
 }