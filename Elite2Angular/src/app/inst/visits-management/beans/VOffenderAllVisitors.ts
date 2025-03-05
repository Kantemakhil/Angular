	export class VOffenderAllVisitors {
		 private _firstName: string;
		 private _lastName: string;
		 private _serialVersionUID: number;
		 private _visitorType: string;
		 private _middleName: string;
		 private _offenderVisitId: number;
		 private _relationship: string;
		 private _visitorId: string;

		 get firstName(): string{ return  this._firstName }

		 set firstName(pfirstName: string){ this._firstName = pfirstName }

		 get lastName(): string{ return  this._lastName }

		 set lastName(plastName: string){ this._lastName = plastName }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get visitorType(): string{ return  this._visitorType }

		 set visitorType(pvisitorType: string){ this._visitorType = pvisitorType }

		 get middleName(): string{ return  this._middleName }

		 set middleName(pmiddleName: string){ this._middleName = pmiddleName }

		 get offenderVisitId(): number{ return  this._offenderVisitId }

		 set offenderVisitId(poffenderVisitId: number){ this._offenderVisitId = poffenderVisitId }

		 get relationship(): string{ return  this._relationship }

		 set relationship(prelationship: string){ this._relationship = prelationship }

		 get visitorId(): string{ return  this._visitorId }

		 set visitorId(pvisitorId: string){ this._visitorId = pvisitorId }


 	toJSON(): any {
 		return { 
			'firstName': this._firstName,
			'lastName': this._lastName,
			'serialVersionUID': this._serialVersionUID,
			'visitorType': this._visitorType,
			'middleName': this._middleName,
			'offenderVisitId': this._offenderVisitId,
			'relationship': this._relationship,
			'visitorId': this._visitorId,
 			};
 		}  
 }