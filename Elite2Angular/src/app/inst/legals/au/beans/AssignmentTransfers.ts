export class AssignmentTransfers {
    private _createUserId: string;
    private _creationUser: string;
    private _role: string;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _fromDateFrom: Date;
    private _modifyUserId: string;
    private _transferDate: Date;
    private _calAgyLocIdFrom: string;
    private _serialVersionUID: number;
    private _offassId: number;
    private _statusTo: string;
    private _roleFrom: string;
    private _sacStaffId: number;
    private _calAgyLocId: string;
    private _chargeSeq: number;
    private _sealFlag: string;
    private _offenderBookIdRequest: number;
    private _requestSeq: number;
    private _creationDate: Date;
    private _sacStaffIdFrom: number;
    private _asstraId: number;
    private _sentenceSeq: number;
    private _createDatetime: number;
    private _fromDate: Date;
    private _component: string;
    private _positionFrom: string;
    private _transferDateTo: Date;
    private _position: string;
    private _statusFrom: string;
    private _sacCaseloadId: string;

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get creationUser(): string { return this._creationUser; }
    set creationUser(pcreationUser: string) { this._creationUser = pcreationUser; }
    get role(): string { return this._role; }
    set role(prole: string) { this._role = prole; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get fromDateFrom(): Date { return this._fromDateFrom; }
    set fromDateFrom(pfromDateFrom: Date) { this._fromDateFrom = pfromDateFrom; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get transferDate(): Date { return this._transferDate; }
    set transferDate(ptransferDate: Date) { this._transferDate = ptransferDate; }
    get calAgyLocIdFrom(): string { return this._calAgyLocIdFrom; }
    set calAgyLocIdFrom(pcalAgyLocIdFrom: string) { this._calAgyLocIdFrom = pcalAgyLocIdFrom; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get offassId(): number { return this._offassId; }
    set offassId(poffassId: number) { this._offassId = poffassId; }
    get statusTo(): string { return this._statusTo; }
    set statusTo(pstatusTo: string) { this._statusTo = pstatusTo; }
    get roleFrom(): string { return this._roleFrom; }
    set roleFrom(proleFrom: string) { this._roleFrom = proleFrom; }
    get sacStaffId(): number { return this._sacStaffId; }
    set sacStaffId(psacStaffId: number) { this._sacStaffId = psacStaffId; }
    get calAgyLocId(): string { return this._calAgyLocId; }
    set calAgyLocId(pcalAgyLocId: string) { this._calAgyLocId = pcalAgyLocId; }
    get chargeSeq(): number { return this._chargeSeq; }
    set chargeSeq(pchargeSeq: number) { this._chargeSeq = pchargeSeq; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get offenderBookIdRequest(): number { return this._offenderBookIdRequest; }
    set offenderBookIdRequest(poffenderBookIdRequest: number) { this._offenderBookIdRequest = poffenderBookIdRequest; }
    get requestSeq(): number { return this._requestSeq; }
    set requestSeq(prequestSeq: number) { this._requestSeq = prequestSeq; }
    get creationDate(): Date { return this._creationDate; }
    set creationDate(pcreationDate: Date) { this._creationDate = pcreationDate; }
    get sacStaffIdFrom(): number { return this._sacStaffIdFrom; }
    set sacStaffIdFrom(psacStaffIdFrom: number) { this._sacStaffIdFrom = psacStaffIdFrom; }
    get asstraId(): number { return this._asstraId; }
    set asstraId(passtraId: number) { this._asstraId = passtraId; }
    get sentenceSeq(): number { return this._sentenceSeq; }
    set sentenceSeq(psentenceSeq: number) { this._sentenceSeq = psentenceSeq; }
    get createDatetime(): number { return this._createDatetime; }
    set createDatetime(pcreateDatetime: number) { this._createDatetime = pcreateDatetime; }
    get fromDate(): Date { return this._fromDate; }
    set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }
    get component(): string { return this._component; }
    set component(pcomponent: string) { this._component = pcomponent; }
    get positionFrom(): string { return this._positionFrom; }
    set positionFrom(ppositionFrom: string) { this._positionFrom = ppositionFrom; }
    get transferDateTo(): Date { return this._transferDateTo; }
    set transferDateTo(ptransferDateTo: Date) { this._transferDateTo = ptransferDateTo; }
    get position(): string { return this._position; }
    set position(pposition: string) { this._position = pposition; }
    get statusFrom(): string { return this._statusFrom; }
    set statusFrom(pstatusFrom: string) { this._statusFrom = pstatusFrom; }
    get sacCaseloadId(): string { return this._sacCaseloadId; }
    set sacCaseloadId(psacCaseloadId: string) { this._sacCaseloadId = psacCaseloadId; }

    

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'creationUser': this._creationUser,
            'role': this._role,
            'modifyDatetime': this._modifyDatetime,
            'offenderBookId': this._offenderBookId,
            'fromDateFrom': this._fromDateFrom,
            'modifyUserId': this._modifyUserId,
            'transferDate': this._transferDate,
            'calAgyLocIdFrom': this._calAgyLocIdFrom,
            'serialVersionUID': this._serialVersionUID,
            'offassId': this._offassId,
            'statusTo': this._statusTo,
            'roleFrom': this._roleFrom,
            'sacStaffId': this._sacStaffId,
            'calAgyLocId': this._calAgyLocId,
            'chargeSeq': this._chargeSeq,
            'sealFlag': this._sealFlag,
            'offenderBookIdRequest': this._offenderBookIdRequest,
            'requestSeq': this._requestSeq,
            'creationDate': this._creationDate,
            'sacStaffIdFrom': this._sacStaffIdFrom,
            'asstraId': this._asstraId,
            'sentenceSeq': this._sentenceSeq,
            'createDatetime': this._createDatetime,
            'fromDate': this._fromDate,
            'component': this._component,
            'positionFrom': this._positionFrom,
            'transferDateTo': this._transferDateTo,
            'position': this._position,
            'statusFrom': this._statusFrom,
            'sacCaseloadId' : this._sacCaseloadId,
        };
    }
}
