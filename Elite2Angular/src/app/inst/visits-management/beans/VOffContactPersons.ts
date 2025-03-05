export class VOffContactPersons {
    private _lastName: string;
    private _relationshipType: string;
    private _offenderBookId: number;
    private _modifyDatetime: Date;
    private _offenderIdDisplay: string;
    private _modifyUserId: string;
    private _contactType: string;
    private _caseloadType: string;
    private _commentText: string;
    private _relationshipTypeDescription: string;
    private _approvedVisitorFlag: string;
    private _contactRootOffenderId: number;
    private _offenderContactPersonId: number;
    private _firstName: string;
    private _contactTypeDescription: string;
    private _checkSum: number;
    private _middleName: string;
    private _personId: number;
    private _personLastName: string;
    private _offenderId: number;
    private _personFirstName: string;
    private _activeFlag: string;
    private _button: string;
    private _butRestriction: string;
    private _butVisitban: string;
    private _age: number;
    private _restriction: string;
    private _globalRestriction: string;
    private _visitDate: Date;



    get butRestriction(): string { return this._butRestriction; }
    set butRestriction(pbutRestriction: string) { this._butRestriction = pbutRestriction; }
    get butVisitban(): string { return this._butVisitban; }
    set butVisitban(pbutVisitban: string) { this._butVisitban = pbutVisitban; }
    get button(): string { return this._button; }
    set button(pbutton: string) { this._button = pbutton; }
    get lastName(): string { return this._lastName; }
    set lastName(plastName: string) { this._lastName = plastName; }
    get relationshipType(): string { return this._relationshipType; }
    set relationshipType(prelationshipType: string) { this._relationshipType = prelationshipType; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get offenderIdDisplay(): string { return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get contactType(): string { return this._contactType; }
    set contactType(pcontactType: string) { this._contactType = pcontactType; }
    get caseloadType(): string { return this._caseloadType; }
    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get relationshipTypeDescription(): string { return this._relationshipTypeDescription; }
    set relationshipTypeDescription(prelationshipTypeDescription: string) { this._relationshipTypeDescription = prelationshipTypeDescription; }
    get approvedVisitorFlag(): string { return this._approvedVisitorFlag; }
    set approvedVisitorFlag(papprovedVisitorFlag: string) { this._approvedVisitorFlag = papprovedVisitorFlag; }
    get contactRootOffenderId(): number { return this._contactRootOffenderId; }
    set contactRootOffenderId(pcontactRootOffenderId: number) { this._contactRootOffenderId = pcontactRootOffenderId; }
    get offenderContactPersonId(): number { return this._offenderContactPersonId; }
    set offenderContactPersonId(poffenderContactPersonId: number) { this._offenderContactPersonId = poffenderContactPersonId; }
    get firstName(): string { return this._firstName; }
    set firstName(pfirstName: string) { this._firstName = pfirstName; }
    get contactTypeDescription(): string { return this._contactTypeDescription; }
    set contactTypeDescription(pcontactTypeDescription: string) { this._contactTypeDescription = pcontactTypeDescription; }
    get checkSum(): number { return this._checkSum; }
    set checkSum(pcheckSum: number) { this._checkSum = pcheckSum; }
    get middleName(): string { return this._middleName; }
    set middleName(pmiddleName: string) { this._middleName = pmiddleName; }
    get personId(): number { return this._personId; }
    set personId(ppersonId: number) { this._personId = ppersonId; }
    get personLastName(): string { return this._personLastName; }
    set personLastName(ppersonLastName: string) { this._personLastName = ppersonLastName; }
    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get personFirstName(): string { return this._personFirstName; }
    set personFirstName(ppersonFirstName: string) { this._personFirstName = ppersonFirstName; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get age(): number { return this._age; }
    set age(page: number) { this._age = page; }
    get restriction(): string { return this._restriction; }
    set restriction(prestriction: string) { this._restriction = prestriction; }
    get globalRestriction(): string { return this._globalRestriction; }
    set globalRestriction(pglobalRestriction: string) { this._globalRestriction = pglobalRestriction; }
    get visitDate(): Date { return this._visitDate; }
    set visitDate(pvisitDate: Date) { this._visitDate = pvisitDate; }



    toJSON(): any {
        return {
            'lastName': this._lastName,
            'relationshipType': this._relationshipType,
            'offenderBookId': this._offenderBookId,
            'modifyDatetime': this._modifyDatetime,
            'offenderIdDisplay': this._offenderIdDisplay,
            'modifyUserId': this._modifyUserId,
            'contactType': this._contactType,
            'caseloadType': this._caseloadType,
            'commentText': this._commentText,
            'relationshipTypeDescription': this._relationshipTypeDescription,
            'approvedVisitorFlag': this._approvedVisitorFlag,
            'contactRootOffenderId': this._contactRootOffenderId,
            'offenderContactPersonId': this._offenderContactPersonId,
            'firstName': this._firstName,
            'contactTypeDescription': this._contactTypeDescription,
            'checkSum': this._checkSum,
            'middleName': this._middleName,
            'personId': this._personId,
            'personLastName': this._personLastName,
            'offenderId': this._offenderId,
            'personFirstName': this._personFirstName,
            'activeFlag': this._activeFlag,
            'butRestriction': this._butRestriction,
            'butVisitban': this._butVisitban,
            'age': this._age,
            'restriction': this._restriction,
            'globalRestriction': this._globalRestriction,
            'visitDate': this._visitDate
        };
    }
}
