export class OffenderRestrictions {
    private _createUserId: string;
    private _offenderBookId: number;
    private _offenderRestrictionId: number;
    private _modifyUserId: string;
    private _enteredStaffId: number;
    private _commentText: string;
    private _createDateTime: Date;
    private _authorisedStaffId: number;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _restrictionType: string;
    private _modifyDateTime: Date;
    private _sealFlag: string;
    private _effectiveDate: Date;
    private _personId: number;
    private _visitDate: Date;
    private _age: number;
    private _firstName: string;
    private _lastName: string;


    get age(): number { return this._age; }
    set age(page: number) { this._age = page; }

    get firstName(): string { return this._firstName; }

    set firstName(pfirstName: string) { this._firstName = pfirstName; }
    get lastName(): string { return this._lastName; }

    set lastName(plastName: string) { this._lastName = plastName; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get offenderRestrictionId(): number { return this._offenderRestrictionId; }

    set offenderRestrictionId(poffenderRestrictionId: number) { this._offenderRestrictionId = poffenderRestrictionId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get enteredStaffId(): number { return this._enteredStaffId; }

    set enteredStaffId(penteredStaffId: number) { this._enteredStaffId = penteredStaffId; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }

    get authorisedStaffId(): number { return this._authorisedStaffId; }

    set authorisedStaffId(pauthorisedStaffId: number) { this._authorisedStaffId = pauthorisedStaffId; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get restrictionType(): string { return this._restrictionType; }

    set restrictionType(prestrictionType: string) { this._restrictionType = prestrictionType; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get effectiveDate(): Date { return this._effectiveDate; }

    set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }

    get visitDate(): Date { return this._visitDate; }

    set visitDate(pvisitDate: Date) { this._visitDate = pvisitDate; }

    get personId(): number { return this._personId; }

    set personId(ppersonId: number) { this._personId = ppersonId; }


    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'offenderBookId': this._offenderBookId,
            'offenderRestrictionId': this._offenderRestrictionId,
            'modifyUserId': this._modifyUserId,
            'enteredStaffId': this._enteredStaffId,
            'commentText': this._commentText,
            'createDateTime': this._createDateTime,
            'authorisedStaffId': this._authorisedStaffId,
            'expiryDate': this._expiryDate,
            'serialVersionUID': this._serialVersionUID,
            'restrictionType': this._restrictionType,
            'modifyDateTime': this._modifyDateTime,
            'sealFlag': this._sealFlag,
            'effectiveDate': this._effectiveDate,
            'visitDate': this._visitDate,
            'personId': this._personId,
            'age': this._age,
            'firstName': this._firstName,
            'lastName': this._lastName,
        };
    }
}
