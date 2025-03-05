export class RpOtherOccupants {
    private _rpOtherOccupantId: number;
    private _createUserId: string;
    private _contactedFlag: string;
    private _extNo: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _primaryFlag: string;
    private _offenderContactPersonId: number;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _rpComment: string;
    private _format: string;
    private _contactPhone: string;
    private _sealFlag: string;
    private _releasePlanId: number;
    private _contactType: string;
    private _personName: string;
    private _age: number;
    private _relationshipType: string;
    private _button: any;
    private _personId: number;


    get rpOtherOccupantId(): number { return this._rpOtherOccupantId }

    set rpOtherOccupantId(prpOtherOccupantId: number) { this._rpOtherOccupantId = prpOtherOccupantId }

    get createUserId(): string { return this._createUserId }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId }

    get contactedFlag(): string { return this._contactedFlag }

    set contactedFlag(pcontactedFlag: string) { this._contactedFlag = pcontactedFlag }

    get extNo(): string { return this._extNo }

    set extNo(pextNo: string) { this._extNo = pextNo }

    get modifyDatetime(): Date { return this._modifyDatetime }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime }

    get modifyUserId(): string { return this._modifyUserId }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId }

    get primaryFlag(): string { return this._primaryFlag }

    set primaryFlag(pprimaryFlag: string) { this._primaryFlag = pprimaryFlag }

    get offenderContactPersonId(): number { return this._offenderContactPersonId }

    set offenderContactPersonId(poffenderContactPersonId: number) { this._offenderContactPersonId = poffenderContactPersonId }

    get createDatetime(): Date { return this._createDatetime }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime }

    get serialVersionUID(): number { return this._serialVersionUID }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID }

    get rpComment(): string { return this._rpComment }

    set rpComment(prpComment: string) { this._rpComment = prpComment }

    get format(): string { return this._format }

    set format(format: string) { this._format = format }

    get contactPhone(): string { return this._contactPhone }

    set contactPhone(pcontactPhone: string) { this._contactPhone = pcontactPhone }

    get sealFlag(): string { return this._sealFlag }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag }

    get releasePlanId(): number { return this._releasePlanId }

    set releasePlanId(preleasePlanId: number) { this._releasePlanId = preleasePlanId }

    get contactType(): string { return this._contactType }

    set contactType(pcontactType: string) { this._contactType = pcontactType }

    get personName(): string { return this._personName }

    set personName(ppersonName: string) { this._personName = ppersonName }

    get age(): number { return this._age }

    set age(page: number) { this._age = page }

    get relationshipType(): string { return this._relationshipType }

    set relationshipType(prelationshipType: string) { this._relationshipType = prelationshipType }

    get button(): string { return this._button }

    set button(pbutton: string) { this._button = pbutton }

    get personId(): number { return this._personId }

    set personId(ppersonId: number) { this._personId = ppersonId }

    toJSON(): any {
        return {
            'rpOtherOccupantId': this._rpOtherOccupantId,
            'createUserId': this._createUserId,
            'contactedFlag': this._contactedFlag,
            'extNo': this._extNo,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'primaryFlag': this._primaryFlag,
            'offenderContactPersonId': this._offenderContactPersonId,
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'rpComment': this._rpComment,
            'format': this._format,
            'contactPhone': this._contactPhone,
            'sealFlag': this._sealFlag,
            'releasePlanId': this._releasePlanId,
            'contactType': this._contactType,
            'personName': this._personName,
            'age': this._age,
            'relationshipType': this._relationshipType,
            'button': this._button,
            'personId': this._personId,
        };
    }
}