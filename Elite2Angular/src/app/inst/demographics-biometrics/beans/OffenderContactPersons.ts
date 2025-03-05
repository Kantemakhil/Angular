export class OffenderContactPersons {
    private _emergencyContactFlag: string;
    private _createUserId: string;
    private _relationshipType: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _caseloadType: string;
    private _contactType: string;
    private _canBeContactedFlag: string;
    private _commentText: string;
    private _offenderContactPersonId: number;
    private _approvedVisitorFlag: string;
    private _contactRootOffenderId: number;
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _nextOfKinFlag: string;
    private _serialVersionUID: number;
    private _awareOfChargesFlag: string;
    private _caseInfoNumber: string;
    private _personId: number;
    private _sealFlag: string;
    private _activeFlag: string;
    private _offenderBookId: number;
    private _lastName: string;
    private _age: number;
    private _firstName: string;
    private _middleName: string;


    get emergencyContactFlag(): string { return this._emergencyContactFlag }

    set emergencyContactFlag(pemergencyContactFlag: string) { this._emergencyContactFlag = pemergencyContactFlag }

    get createUserId(): string { return this._createUserId }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId }

    get relationshipType(): string { return this._relationshipType }

    set relationshipType(prelationshipType: string) { this._relationshipType = prelationshipType }

    get modifyDatetime(): Date { return this._modifyDatetime }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime }

    get modifyUserId(): string { return this._modifyUserId }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId }

    get caseloadType(): string { return this._caseloadType }

    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType }

    get contactType(): string { return this._contactType }

    set contactType(pcontactType: string) { this._contactType = pcontactType }

    get canBeContactedFlag(): string { return this._canBeContactedFlag }

    set canBeContactedFlag(pcanBeContactedFlag: string) { this._canBeContactedFlag = pcanBeContactedFlag }

    get commentText(): string { return this._commentText }

    set commentText(pcommentText: string) { this._commentText = pcommentText }

    get offenderContactPersonId(): number { return this._offenderContactPersonId }

    set offenderContactPersonId(poffenderContactPersonId: number) { this._offenderContactPersonId = poffenderContactPersonId }

    get approvedVisitorFlag(): string { return this._approvedVisitorFlag }

    set approvedVisitorFlag(papprovedVisitorFlag: string) { this._approvedVisitorFlag = papprovedVisitorFlag }

    get contactRootOffenderId(): number { return this._contactRootOffenderId }

    set contactRootOffenderId(pcontactRootOffenderId: number) { this._contactRootOffenderId = pcontactRootOffenderId }

    get createDatetime(): Date { return this._createDatetime }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime }

    get expiryDate(): Date { return this._expiryDate }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate }

    get nextOfKinFlag(): string { return this._nextOfKinFlag }

    set nextOfKinFlag(pnextOfKinFlag: string) { this._nextOfKinFlag = pnextOfKinFlag }

    get serialVersionUID(): number { return this._serialVersionUID }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID }

    get awareOfChargesFlag(): string { return this._awareOfChargesFlag }

    set awareOfChargesFlag(pawareOfChargesFlag: string) { this._awareOfChargesFlag = pawareOfChargesFlag }

    get caseInfoNumber(): string { return this._caseInfoNumber }

    set caseInfoNumber(pcaseInfoNumber: string) { this._caseInfoNumber = pcaseInfoNumber }

    get personId(): number { return this._personId }

    set personId(ppersonId: number) { this._personId = ppersonId }

    get sealFlag(): string { return this._sealFlag }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag }

    get activeFlag(): string { return this._activeFlag }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get lastName(): string { return this._lastName }

    set lastName(plastName: string) { this._lastName = plastName }

    get firstName(): string { return this._firstName }

    set firstName(pfirstName: string) { this._firstName = pfirstName }


    get middleName(): string { return this._middleName }

    set middleName(pmiddleName: string) { this._middleName = pmiddleName }


    get age(): number { return this._age; }

    set age(page: number) { this._age = page; }


    toJSON(): any {
        return {
            'emergencyContactFlag': this._emergencyContactFlag,
            'createUserId': this._createUserId,
            'relationshipType': this._relationshipType,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'caseloadType': this._caseloadType,
            'contactType': this._contactType,
            'canBeContactedFlag': this._canBeContactedFlag,
            'commentText': this._commentText,
            'offenderContactPersonId': this._offenderContactPersonId,
            'approvedVisitorFlag': this._approvedVisitorFlag,
            'contactRootOffenderId': this._contactRootOffenderId,
            'createDatetime': this._createDatetime,
            'expiryDate': this._expiryDate,
            'nextOfKinFlag': this._nextOfKinFlag,
            'serialVersionUID': this._serialVersionUID,
            'awareOfChargesFlag': this._awareOfChargesFlag,
            'caseInfoNumber': this._caseInfoNumber,
            'personId': this._personId,
            'sealFlag': this._sealFlag,
            'activeFlag': this._activeFlag,
            'offenderBookId': this._offenderBookId,
            'lastName': this._lastName,
            'firstName': this._firstName,
            'middleName': this._middleName,
            'age': this._age,
        };
    }
}
