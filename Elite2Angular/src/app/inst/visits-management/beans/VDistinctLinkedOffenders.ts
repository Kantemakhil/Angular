	export class VDistinctLinkedOffenders {
		 private _lastName: String;
		 private _firstName: String;
		 private _contactTypeDescription: String;
		 private _relationshipType: String;
		 private _offenderIdDisplay: String;
		 private _middleName: String;
		 private _contactType: String;
		 private _personId: number;
		 private _rootOffenderId: number;
		 private _relationshipTypeDescription: String;

		 get lastName(): String{ return this._lastName; }
		 set lastName(plastName: String){ this._lastName = plastName ;}
		 get firstName(): String{ return this._firstName; }
		 set firstName(pfirstName: String){ this._firstName = pfirstName ;}
		 get contactTypeDescription(): String{ return this._contactTypeDescription; }
		 set contactTypeDescription(pcontactTypeDescription: String){ this._contactTypeDescription = pcontactTypeDescription ;}
		 get relationshipType(): String{ return this._relationshipType; }
		 set relationshipType(prelationshipType: String){ this._relationshipType = prelationshipType ;}
		 get offenderIdDisplay(): String{ return this._offenderIdDisplay; }
		 set offenderIdDisplay(poffenderIdDisplay: String){ this._offenderIdDisplay = poffenderIdDisplay ;}
		 get middleName(): String{ return this._middleName; }
		 set middleName(pmiddleName: String){ this._middleName = pmiddleName ;}
		 get contactType(): String{ return this._contactType; }
		 set contactType(pcontactType: String){ this._contactType = pcontactType ;}
		 get personId(): number{ return this._personId; }
		 set personId(ppersonId: number){ this._personId = ppersonId ;}
		 get rootOffenderId(): number{ return this._rootOffenderId; }
		 set rootOffenderId(prootOffenderId: number){ this._rootOffenderId = prootOffenderId ;}
		 get relationshipTypeDescription(): String{ return this._relationshipTypeDescription; }
		 set relationshipTypeDescription(prelationshipTypeDescription: String){ this._relationshipTypeDescription = prelationshipTypeDescription ;}

 	toJSON(): any {
 		return { 
			'lastName': this._lastName,
			'firstName': this._firstName,
			'contactTypeDescription': this._contactTypeDescription,
			'relationshipType': this._relationshipType,
			'offenderIdDisplay': this._offenderIdDisplay,
			'middleName': this._middleName,
			'contactType': this._contactType,
			'personId': this._personId,
			'rootOffenderId': this._rootOffenderId,
			'relationshipTypeDescription': this._relationshipTypeDescription,
 			};
 		}  
 }