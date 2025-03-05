    export class VOffenderAuthorisedVisitors {
         private _relationshipType: string;
         private _offenderBookId: number ;
         private _contactPersonId: number ;
         private _visitorOffenderIdDisplay: string;
         private _contactPersonType: string;
         private _contactType: string;
         private _age: number ;
         private _contactRootOffenderId: number ;
         private _visitorFirstName: string;
         private _offenderContactPersonId: number ;
         private _visitorLastName: string;
         private _location: string;
         private _restriction: string;
         private _visitDate: Date;
         private _visitorOffenderId: number;
         private _select: string;
         get select(): string { return this._select; }
         set select(pselect: string) { this._select = pselect; }

        get visitorOffenderId(): number { return this._visitorOffenderId; }

        set visitorOffenderId(pvisitorOffenderId: number) { this._visitorOffenderId = pvisitorOffenderId; }
         get location(): string { return this._location; }
         set location(plocation: string) { this._location = plocation; }

         get restriction(): string { return this._restriction; }
         set restriction(prestriction: string) { this._restriction = prestriction; }

         get visitDate(): Date { return this._visitDate; }
         set visitDate(pvisitDate: Date) { this._visitDate = pvisitDate; }

         get relationshipType(): string { return this._relationshipType; }
         set relationshipType(prelationshipType: string) { this._relationshipType = prelationshipType; }
         get offenderBookId(): number { return this._offenderBookId; }
         set offenderBookId(poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }
         get contactPersonId(): number { return this._contactPersonId; }
         set contactPersonId(pcontactPersonId: number ) { this._contactPersonId = pcontactPersonId; }
         get visitorOffenderIdDisplay(): string { return this._visitorOffenderIdDisplay; }
         set visitorOffenderIdDisplay(pvisitorOffenderIdDisplay: string) { this._visitorOffenderIdDisplay = pvisitorOffenderIdDisplay; }
         get contactPersonType(): string { return this._contactPersonType; }
         set contactPersonType(pcontactPersonType: string) { this._contactPersonType = pcontactPersonType; }
         get contactType(): string { return this._contactType; }
         set contactType(pcontactType: string) { this._contactType = pcontactType; }
         get age(): number { return this._age; }
         set age(page: number ) { this._age = page; }
         get contactRootOffenderId(): number { return this._contactRootOffenderId; }
         set contactRootOffenderId(pcontactRootOffenderId: number ) { this._contactRootOffenderId = pcontactRootOffenderId; }
         get visitorFirstName(): string { return this._visitorFirstName; }
         set visitorFirstName(pvisitorFirstName: string) { this._visitorFirstName = pvisitorFirstName; }
         get offenderContactPersonId(): number { return this._offenderContactPersonId; }
         set offenderContactPersonId(poffenderContactPersonId: number ) { this._offenderContactPersonId = poffenderContactPersonId; }
         get visitorLastName(): string { return this._visitorLastName; }
         set visitorLastName(pvisitorLastName: string) { this._visitorLastName = pvisitorLastName; }

     toJSON(): any {
         return {
            'relationshipType': this._relationshipType,
            'offenderBookId': this._offenderBookId,
            'contactPersonId': this._contactPersonId,
            'visitorOffenderIdDisplay': this._visitorOffenderIdDisplay,
            'contactPersonType': this._contactPersonType,
            'contactType': this._contactType,
            'age': this._age,
            'contactRootOffenderId': this._contactRootOffenderId,
            'visitorFirstName': this._visitorFirstName,
            'offenderContactPersonId': this._offenderContactPersonId,
            'visitorLastName': this._visitorLastName,
            'location': this._location,
            'restriction': this._restriction,
            'visitDate': this._visitDate,
            'visitorOffenderId': this._visitorOffenderId,
            'select': this._select
             };
         }
 }
