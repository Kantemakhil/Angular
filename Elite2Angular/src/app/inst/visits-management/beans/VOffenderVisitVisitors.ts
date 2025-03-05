export class VOffenderVisitVisitors {
    private _offenderVisitVisitorId: number;
    private _eventId: number;
    private _lastName: string;
    private _relationshipType: string;
    private _offenderBookId: number;
    private _visitOffenderBookId: number;
    private _contactType: string;
    private _commentText: string;
    private _outcomeReasonCode: string;
    private _offenderVisitOrderId: string;
    private _firstName: string;
    private _serialVersionUID: number;
    private _eventOutcome: string;
    private _eventStatus: string;
    private _restriction: string;
    private _personId: number;
    private _visitDate: Date;
    private _offenderVisitId: number;
    private _groupLeaderFlag: string;
    private _age: number;
    private _butOiuovres: any;
    private _butOmuvrest: any;
    private _globalRestriction: string;
    private _relationshipTypeDesc: string;
    private _contactTypeDesc: string;
    
    get offenderVisitVisitorId(): number { return this._offenderVisitVisitorId }

    set offenderVisitVisitorId(poffenderVisitVisitorId: number) { this._offenderVisitVisitorId = poffenderVisitVisitorId }

    get eventId(): number { return this._eventId }

    set eventId(peventId: number) { this._eventId = peventId }

    get lastName(): string { return this._lastName }

    set lastName(plastName: string) { this._lastName = plastName }

    get relationshipType(): string { return this._relationshipType }

    set relationshipType(prelationshipType: string) { this._relationshipType = prelationshipType }

    get offenderBookId(): number { return this._offenderBookId }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId }

    get visitOffenderBookId(): number { return this._visitOffenderBookId }

    set visitOffenderBookId(pvisitOffenderBookId: number) { this._visitOffenderBookId = pvisitOffenderBookId }

    get contactType(): string { return this._contactType }

    set contactType(pcontactType: string) { this._contactType = pcontactType }

    get commentText(): string { return this._commentText }

    set commentText(pcommentText: string) { this._commentText = pcommentText }

    get outcomeReasonCode(): string { return this._outcomeReasonCode }

    set outcomeReasonCode(poutcomeReasonCode: string) { this._outcomeReasonCode = poutcomeReasonCode }

    get offenderVisitOrderId(): string { return this._offenderVisitOrderId }

    set offenderVisitOrderId(poffenderVisitOrderId: string) { this._offenderVisitOrderId = poffenderVisitOrderId }

    get firstName(): string { return this._firstName }

    set firstName(pfirstName: string) { this._firstName = pfirstName }

    get serialVersionUID(): number { return this._serialVersionUID }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID }

    get eventOutcome(): string { return this._eventOutcome }

    set eventOutcome(peventOutcome: string) { this._eventOutcome = peventOutcome }

    get eventStatus(): string { return this._eventStatus }

    set eventStatus(peventStatus: string) { this._eventStatus = peventStatus }

    get restriction(): string { return this._restriction }

    set restriction(prestriction: string) { this._restriction = prestriction }

    get personId(): number { return this._personId }

    set personId(ppersonId: number) { this._personId = ppersonId }

    get visitDate(): Date { return this._visitDate }

    set visitDate(pvisitDate: Date) { this._visitDate = pvisitDate }

    get offenderVisitId(): number { return this._offenderVisitId }

    set offenderVisitId(poffenderVisitId: number) { this._offenderVisitId = poffenderVisitId }

    get groupLeaderFlag(): string { return this._groupLeaderFlag }

    set groupLeaderFlag(pgroupLeaderFlag: string) { this._groupLeaderFlag = pgroupLeaderFlag }

    get age(): number { return this._age }

    set age(page: number) { this._age = page }

    get butOiuovres(): any { return this._butOiuovres }

    set butOiuovres(pbutOiuovres: any) { this._butOiuovres = pbutOiuovres }

    get butOmuvrest(): any { return this._butOmuvrest }

    set butOmuvrest(pbutOmuvrest: any) { this._butOmuvrest = pbutOmuvrest }

    get globalRestriction(): string { return this._globalRestriction }

    set globalRestriction(pglobalRestriction: string) { this._globalRestriction = pglobalRestriction }


    get relationshipTypeDesc(): string { return this._relationshipTypeDesc }

    set relationshipTypeDesc(prelationshipTypeDesc: string) { this._relationshipTypeDesc = prelationshipTypeDesc }


    get contactTypeDesc(): string { return this._contactTypeDesc}

    set contactTypeDesc(pcontactTypeDesc: string) { this._contactTypeDesc = pcontactTypeDesc }


    toJSON(): any {
        return {
            'offenderVisitVisitorId': this._offenderVisitVisitorId,
            'eventId': this._eventId,
            'lastName': this._lastName,
            'relationshipType': this._relationshipType,
            'offenderBookId': this._offenderBookId,
            'visitOffenderBookId': this._visitOffenderBookId,
            'contactType': this._contactType,
            'commentText': this._commentText,
            'outcomeReasonCode': this._outcomeReasonCode,
            'offenderVisitOrderId': this._offenderVisitOrderId,
            'firstName': this._firstName,
            'serialVersionUID': this._serialVersionUID,
            'eventOutcome': this._eventOutcome,
            'eventStatus': this._eventStatus,
            'restriction': this._restriction,
            'personId': this._personId,
            'visitDate': this._visitDate,
            'offenderVisitId': this._offenderVisitId,
            'groupLeaderFlag': this._groupLeaderFlag,
            'age': this._age,
            'butOiuovres': this._butOiuovres,
            'butOmuvrest': this._butOmuvrest,
            'globalRestriction': this._globalRestriction,
            'contactTypeDesc': this._contactTypeDesc,
            'relationshipTypeDesc': this._relationshipTypeDesc
        };
    }
}