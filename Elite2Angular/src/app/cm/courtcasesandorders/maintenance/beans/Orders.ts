export class Orders {

    private _orderType: string;
    private _createUserId: string;
    private _courtDate: Date;
    private _orderId: number;
    private _offenderBookId: number;
    private _modifyDatetime: Date;
    private _dueDate: Date;
    private _modifyUserId: string;
    private _orderStatus: string;
    private _commentText: string;
    private _commentTextTemp: string;
    private _completeDate: Date;
    private _expiryDate: Date;
    private _caseId: number;
    private _requestDate: Date;
    private _issueDate: Date;
    private _sealFlag: string;
    private _offenceDate: Date;
    private _courtTime: Date;
    private _createDate: Date;
    private _eventId: number;
    private _issuingAgyLocId: string;
    private _messageId: string;
    private _courtInfoId: string;
    private _updatedAllowedFlag: string;
    private _creationDate: Date;
    private _nonReportFlag: string;
    private _createDatetime: Date;
    private _closedDate: Date;
    private _expiryTime: number;
    private _teamId: string;
    private _staffMemberId: string;
    private _requestingOfficer: string;
    private _statusDate: Date;
    private _defenceSolicitor: any;
    private _SCREEN: string;
    private _navEoffender: string;

    public get commentTextTemp(): string {
        return this._commentTextTemp;
    }
    public set commentTextTemp(value: string) {
        this._commentTextTemp = value;
    }
    public get expiryTime(): number {
        return this._expiryTime;
    }
    public set expiryTime(value: number) {
        this._expiryTime = value;
    }
    private _effectiveDate: Date;
    private _arrestAgyLocId: string;
    private _workflowId: string;
    private _ordLaunchButton: string;

    public get ordLaunchButton(): string {
        return this._ordLaunchButton;
    }
    public set ordLaunchButton(value: string) {
        this._ordLaunchButton = value;
    }
    public get workflowId(): string {
        return this._workflowId;
    }
    public set workflowId(value: string) {
        this._workflowId = value;
    }
    public get arrestAgyLocId(): string {
        return this._arrestAgyLocId;
    }
    public set arrestAgyLocId(value: string) {
        this._arrestAgyLocId = value;
    }

    public get updatedAllowedFlag(): string {
        return this._updatedAllowedFlag;
    }
    public set updatedAllowedFlag(value: string) {
        this._updatedAllowedFlag = value;
    }
    get orderType(): string { return this._orderType; }
    set orderType(porderType: string) { this._orderType = porderType; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get courtDate(): Date { return this._courtDate; }
    set courtDate(pcourtDate: Date) { this._courtDate = pcourtDate; }
    get orderId(): number { return this._orderId; }
    set orderId(porderId: number) { this._orderId = porderId; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get dueDate(): Date { return this._dueDate; }
    set dueDate(pdueDate: Date) { this._dueDate = pdueDate; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get orderStatus(): string { return this._orderStatus; }
    set orderStatus(porderStatus: string) { this._orderStatus = porderStatus; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get completeDate(): Date { return this._completeDate; }
    set completeDate(pcompleteDate: Date) { this._completeDate = pcompleteDate; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
    get caseId(): number { return this._caseId; }
    set caseId(pcaseId: number) { this._caseId = pcaseId; }
    get requestDate(): Date { return this._requestDate; }
    set requestDate(prequestDate: Date) { this._requestDate = prequestDate; }
    get issueDate(): Date { return this._issueDate; }
    set issueDate(pissueDate: Date) { this._issueDate = pissueDate; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get offenceDate(): Date { return this._offenceDate; }
    set offenceDate(poffenceDate: Date) { this._offenceDate = poffenceDate; }
    get courtTime(): Date { return this._courtTime; }
    set courtTime(pcourtTime: Date) { this._courtTime = pcourtTime; }
    get createDate(): Date { return this._createDate; }
    set createDate(pcreateDate: Date) { this._createDate = pcreateDate; }
    get eventId(): number { return this._eventId; }
    set eventId(peventId: number) { this._eventId = peventId; }
    get issuingAgyLocId(): string { return this._issuingAgyLocId; }
    set issuingAgyLocId(pissuingAgyLocId: string) { this._issuingAgyLocId = pissuingAgyLocId; }
    get messageId(): string { return this._messageId; }
    set messageId(pmessageId: string) { this._messageId = pmessageId; }
    get courtInfoId(): string { return this._courtInfoId; }
    set courtInfoId(pcourtInfoId: string) { this._courtInfoId = pcourtInfoId; }
    get creationDate(): Date { return this._creationDate; }
    set creationDate(pcreationDate: Date) { this._creationDate = pcreationDate; }
    get nonReportFlag(): string { return this._nonReportFlag; }
    set nonReportFlag(pnonReportFlag: string) { this._nonReportFlag = pnonReportFlag; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get closedDate(): Date { return this._closedDate; }
    set closedDate(pclosedDate: Date) { this._closedDate = pclosedDate; }
   
    get effectiveDate(): Date { return this._effectiveDate; }
    set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }
    get requestingOfficer(): string { return this._requestingOfficer; }
    set requestingOfficer(value: string) { this._requestingOfficer = value; }
    get staffMemberId(): string { return this._staffMemberId; }
    set staffMemberId(value: string) { this._staffMemberId = value; }
    get teamId(): string { return this._teamId; }
    set teamId(value: string) { this._teamId = value; }
    get statusDate(): Date { return this._statusDate; }
    set statusDate(value: Date) { this._statusDate = value; }
    get defenceSolicitor(): any { return this._defenceSolicitor; }
    set defenceSolicitor(value: any) { this._defenceSolicitor = value; }
    get SCREEN(): string { return this._SCREEN; }
    set SCREEN(ppModuleName: string) { this._SCREEN = ppModuleName; }
    get navEoffender(): string { return this._navEoffender; }
    set navEoffender(ppModuleName: string) { this._navEoffender = ppModuleName; }



    toJSON(): any {
        return {
            'orderType': this._orderType,
            'createUserId': this._createUserId,
            'courtDate': this._courtDate,
            'orderId': this._orderId,
            'offenderBookId': this._offenderBookId,
            'modifyDatetime': this._modifyDatetime,
            'dueDate': this._dueDate,
            'modifyUserId': this._modifyUserId,
            'orderStatus': this._orderStatus,
            'commentText': this._commentText,
            'completeDate': this._completeDate,
            'expiryDate': this._expiryDate,
            'caseId': this._caseId,
            'requestDate': this._requestDate,
            'issueDate': this._issueDate,
            'sealFlag': this._sealFlag,
            'offenceDate': this._offenceDate,
            'courtTime': this._courtTime,
            'createDate': this._createDate,
            'eventId': this._eventId,
            'issuingAgyLocId': this._issuingAgyLocId,
            'messageId': this._messageId,
            'courtInfoId': this._courtInfoId,
            'creationDate': this._creationDate,
            'nonReportFlag': this._nonReportFlag,
            'createDatetime': this._createDatetime,
            'closedDate': this._closedDate,
            'expiryTime': this._expiryTime,
            'effectiveDate': this._effectiveDate,
            'teamId': this._teamId,
            'staffMemberId': this._staffMemberId,
            'requestingOfficer': this._requestingOfficer,
            'statusDate': this._statusDate,
            'defenceSolicitor': this._defenceSolicitor,
        };
    }

}