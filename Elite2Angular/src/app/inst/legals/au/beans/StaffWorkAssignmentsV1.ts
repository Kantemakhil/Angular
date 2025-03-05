export class StaffWorkAssignmentsV1 {
    private _lastName: string;
    private _orderType: string;
    private _role: string;
    private _orderReqExpiry: Date;
    private _offenderBookId: number;
    private _line: number;
    private _offenderIdDisplay: string;
    private _description: string;
    private _serialVersionUID: number;
    private _offassId: number;
    private _supExpRptDue: Date;
    private _sacStaffId: number;
    private _staffName: string;
    private _calAgyLocId: string;
    private _chargeSeq: number;
    private _offenderBookIdRequest: number;
    private _requestSeq: number;
    private _sentenceSeq: number;
    private _bookId: number;
    private _fromDate: Date;
    private _firstName: string;
    private _component: string;
    private _viewOrder: Date;
    private _agyLocId: string;
    private _offenderName: string;
    private _orderCode: string;
    private _offenderId: number;
    private _position: string;
    private _staffId: number;
    private _status: string;

    get lastName(): string { return this._lastName; }
    set lastName(plastName: string) { this._lastName = plastName; }
    get orderType(): string { return this._orderType; }
    set orderType(porderType: string) { this._orderType = porderType; }
    get role(): string { return this._role; }
    set role(prole: string) { this._role = prole; }
    get orderReqExpiry(): Date { return this._orderReqExpiry; }
    set orderReqExpiry(porderReqExpiry: Date) { this._orderReqExpiry = porderReqExpiry; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get line(): number { return this._line; }
    set line(pline: number) { this._line = pline; }
    get offenderIdDisplay(): string { return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get offassId(): number { return this._offassId; }
    set offassId(poffassId: number) { this._offassId = poffassId; }
    get supExpRptDue(): Date { return this._supExpRptDue; }
    set supExpRptDue(psupExpRptDue: Date) { this._supExpRptDue = psupExpRptDue; }
    get sacStaffId(): number { return this._sacStaffId; }
    set sacStaffId(psacStaffId: number) { this._sacStaffId = psacStaffId; }
    get staffName(): string { return this._staffName; }
    set staffName(pstaffName: string) { this._staffName = pstaffName; }
    get calAgyLocId(): string { return this._calAgyLocId; }
    set calAgyLocId(pcalAgyLocId: string) { this._calAgyLocId = pcalAgyLocId; }
    get chargeSeq(): number { return this._chargeSeq; }
    set chargeSeq(pchargeSeq: number) { this._chargeSeq = pchargeSeq; }
    get offenderBookIdRequest(): number { return this._offenderBookIdRequest; }
    set offenderBookIdRequest(poffenderBookIdRequest: number) { this._offenderBookIdRequest = poffenderBookIdRequest; }
    get requestSeq(): number { return this._requestSeq; }
    set requestSeq(prequestSeq: number) { this._requestSeq = prequestSeq; }
    get sentenceSeq(): number { return this._sentenceSeq; }
    set sentenceSeq(psentenceSeq: number) { this._sentenceSeq = psentenceSeq; }
    get bookId(): number { return this._bookId; }
    set bookId(pbookId: number) { this._bookId = pbookId; }
    get fromDate(): Date { return this._fromDate; }
    set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }
    get firstName(): string { return this._firstName; }
    set firstName(pfirstName: string) { this._firstName = pfirstName; }
    get component(): string { return this._component; }
    set component(pcomponent: string) { this._component = pcomponent; }
    get viewOrder(): Date { return this._viewOrder; }
    set viewOrder(pviewOrder: Date) { this._viewOrder = pviewOrder; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    get offenderName(): string { return this._offenderName; }
    set offenderName(poffenderName: string) { this._offenderName = poffenderName; }
    get orderCode(): string { return this._orderCode; }
    set orderCode(porderCode: string) { this._orderCode = porderCode; }
    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get position(): string { return this._position; }
    set position(pposition: string) { this._position = pposition; }
    get staffId(): number { return this._staffId; }
    set staffId(pstaffId: number) { this._staffId = pstaffId; }
    get status(): string { return this._status; }
    set status(pstatus: string) { this._status = pstatus; }

    toJSON(): any {
        return {
            'lastName': this._lastName,
            'orderType': this._orderType,
            'role': this._role,
            'orderReqExpiry': this._orderReqExpiry,
            'offenderBookId': this._offenderBookId,
            'line': this._line,
            'offenderIdDisplay': this._offenderIdDisplay,
            'description': this._description,
            'serialVersionUID': this._serialVersionUID,
            'offassId': this._offassId,
            'supExpRptDue': this._supExpRptDue,
            'sacStaffId': this._sacStaffId,
            'staffName': this._staffName,
            'calAgyLocId': this._calAgyLocId,
            'chargeSeq': this._chargeSeq,
            'offenderBookIdRequest': this._offenderBookIdRequest,
            'requestSeq': this._requestSeq,
            'sentenceSeq': this._sentenceSeq,
            'bookId': this._bookId,
            'fromDate': this._fromDate,
            'firstName': this._firstName,
            'component': this._component,
            'viewOrder': this._viewOrder,
            'agyLocId': this._agyLocId,
            'offenderName': this._offenderName,
            'orderCode': this._orderCode,
            'offenderId': this._offenderId,
            'position': this._position,
            'staffId': this._staffId,
            'status': this._status,
        };
    }
}
