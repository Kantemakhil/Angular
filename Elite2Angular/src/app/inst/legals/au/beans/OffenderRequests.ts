export class OffenderRequests {
  private _sentenceExpiryDate: Date;
  private _orderType: string;
  private _createUserId: string;
  private _creationUser: string;
  private _modifyDatetime: Date;
  private _offenderBookId: number;
  private _modifyUserId: string;
  private _description: string;
  private _commentText: string;
  private _serialVersionUID: number;
  private _dischargeDate: Date;
  private _dateToBeFixed: string;
  private _chargeSeq: number;
  private _sealFlag: string;
  private _dischargeAuthority: number;
  private _requestSeq: number;
  private _courtDeliveryDate: Date;
  private _caseloadType: string;
  private _creationDate: Date;
  private _dischargeReason: string;
  private _createDatetime: Date;
  private _dischargeComment: string;
  private _transcriptDueDate: Date;
  private _orderCode: string;
  private _reportDueDate: Date;
  private _requestStatus: string;
  private _startDate: Date;
  private _caseId: number;
  private _remandAgyLocId: string;
  private _status: string;
  private _eventId: number;
  private _caseInfoNumber: string;
  private _dateToBeFix: boolean;
  private _rowId: string;
  private _offenderIdDisplay: string;
  private _nbtCompletionAuthor: string;
  private _completionDate: Date;
  private _nbtCompleteStatus: string;
  private _agyLocId: string;
  private _agyLocIdVal: string;
  private _completeStatus: string;
  private _completionAuthor: string;
  

  get completionAuthor(): string { return this._completionAuthor; }

  set completionAuthor(pcompletionAuthor: string) { this._completionAuthor = pcompletionAuthor; }

  get completeStatus(): string { return this._completeStatus; }

  set completeStatus(pcompleteStatus: string) { this._completeStatus = pcompleteStatus; }

  get agyLocIdVal(): string { return this._agyLocIdVal; }

  set agyLocIdVal(pagyLocIdVal: string) { this._agyLocIdVal = pagyLocIdVal; }

  get agyLocId(): string { return this._agyLocId; }

  set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

  get nbtCompleteStatus(): string { return this._nbtCompleteStatus; }

  set nbtCompleteStatus(pnbtCompleteStatus: string) { this._nbtCompleteStatus = pnbtCompleteStatus; }

  get completionDate(): Date { return this._completionDate; }

  set completionDate(pcompletionDate: Date) { this._completionDate = pcompletionDate; }

  get nbtCompletionAuthor(): string { return this._nbtCompletionAuthor; }

  set nbtCompletionAuthor(pnbtCompletionAuthor: string) { this._nbtCompletionAuthor = pnbtCompletionAuthor; }

  get offenderIdDisplay(): string { return this._offenderIdDisplay; }

  set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

  get rowId(): string { return this._rowId; }

  set rowId(prowId: string) { this._rowId = prowId; }

  get dateToBeFix(): boolean { return this._dateToBeFix; }

  set dateToBeFix(pdateToBeFix: boolean) { this._dateToBeFix = pdateToBeFix; }

  get caseInfoNumber(): string { return this._caseInfoNumber; }

  set caseInfoNumber(pcaseInfoNumber: string) { this._caseInfoNumber = pcaseInfoNumber; }

  get eventId(): number { return this._eventId; }

  set eventId(peventId: number) { this._eventId = peventId; }

  get remandAgyLocId(): string { return this._remandAgyLocId; }

  set remandAgyLocId(premandAgyLocId: string) { this._remandAgyLocId = premandAgyLocId; }

  get caseId(): number { return this._caseId; }

  set caseId(pcaseId: number) { this._caseId = pcaseId; }

  get sentenceExpiryDate(): Date { return this._sentenceExpiryDate; }

  set sentenceExpiryDate(psentenceExpiryDate: Date) { this._sentenceExpiryDate = psentenceExpiryDate; }

  get orderType(): string { return this._orderType; }

  set orderType(porderType: string) { this._orderType = porderType; }

  get createUserId(): string { return this._createUserId; }

  set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

  get creationUser(): string { return this._creationUser; }

  set creationUser(pcreationUser: string) { this._creationUser = pcreationUser; }

  get modifyDatetime(): Date { return this._modifyDatetime; }

  set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

  get offenderBookId(): number { return this._offenderBookId; }

  set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

  get modifyUserId(): string { return this._modifyUserId; }

  set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

  get description(): string { return this._description; }

  set description(pdescription: string) { this._description = pdescription; }

  get commentText(): string { return this._commentText; }

  set commentText(pcommentText: string) { this._commentText = pcommentText; }

  get serialVersionUID(): number { return this._serialVersionUID; }

  set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

  get dischargeDate(): Date { return this._dischargeDate; }

  set dischargeDate(pdischargeDate: Date) { this._dischargeDate = pdischargeDate; }

  get dateToBeFixed(): string { return this._dateToBeFixed; }

  set dateToBeFixed(pdateToBeFixed: string) { this._dateToBeFixed = pdateToBeFixed; }

  get chargeSeq(): number { return this._chargeSeq; }

  set chargeSeq(pchargeSeq: number) { this._chargeSeq = pchargeSeq; }

  get sealFlag(): string { return this._sealFlag; }

  set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

  get dischargeAuthority(): number { return this._dischargeAuthority; }

  set dischargeAuthority(pdischargeAuthority: number) { this._dischargeAuthority = pdischargeAuthority; }

  get requestSeq(): number { return this._requestSeq; }

  set requestSeq(prequestSeq: number) { this._requestSeq = prequestSeq; }

  get courtDeliveryDate(): Date { return this._courtDeliveryDate; }

  set courtDeliveryDate(pcourtDeliveryDate: Date) { this._courtDeliveryDate = pcourtDeliveryDate; }

  get caseloadType(): string { return this._caseloadType; }

  set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }

  get creationDate(): Date { return this._creationDate; }

  set creationDate(pcreationDate: Date) { this._creationDate = pcreationDate; }

  get dischargeReason(): string { return this._dischargeReason; }

  set dischargeReason(pdischargeReason: string) { this._dischargeReason = pdischargeReason; }

  get createDatetime(): Date { return this._createDatetime; }

  set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

  get dischargeComment(): string { return this._dischargeComment; }

  set dischargeComment(pdischargeComment: string) { this._dischargeComment = pdischargeComment; }

  get transcriptDueDate(): Date { return this._transcriptDueDate; }

  set transcriptDueDate(ptranscriptDueDate: Date) { this._transcriptDueDate = ptranscriptDueDate; }

  get orderCode(): string { return this._orderCode; }

  set orderCode(porderCode: string) { this._orderCode = porderCode; }

  get reportDueDate(): Date { return this._reportDueDate; }

  set reportDueDate(preportDueDate: Date) { this._reportDueDate = preportDueDate; }

  get requestStatus(): string { return this._requestStatus; }

  set requestStatus(prequestStatus: string) { this._requestStatus = prequestStatus; }

  get startDate(): Date { return this._startDate; }

  set startDate(pstartDate: Date) { this._startDate = pstartDate; }

  get status(): string { return this._status; }

 set status(pstatus: string) { this._status = pstatus; }

  toJSON(): any {
    return {
      'sentenceExpiryDate': this._sentenceExpiryDate,
      'orderType': this._orderType,
      'createUserId': this._createUserId,
      'creationUser': this._creationUser,
      'modifyDatetime': this._modifyDatetime,
      'offenderBookId': this._offenderBookId,
      'modifyUserId': this._modifyUserId,
      'description': this._description,
      'commentText': this._commentText,
      'serialVersionUID': this._serialVersionUID,
      'dischargeDate': this._dischargeDate,
      'dateToBeFixed': this._dateToBeFixed,
      'chargeSeq': this._chargeSeq,
      'sealFlag': this._sealFlag,
      'dischargeAuthority': this._dischargeAuthority,
      'requestSeq': this._requestSeq,
      'courtDeliveryDate': this._courtDeliveryDate,
      'caseloadType': this._caseloadType,
      'creationDate': this._creationDate,
      'dischargeReason': this._dischargeReason,
      'createDatetime': this._createDatetime,
      'dischargeComment': this._dischargeComment,
      'transcriptDueDate': this._transcriptDueDate,
      'orderCode': this._orderCode,
      'reportDueDate': this._reportDueDate,
      'requestStatus': this._requestStatus,
      'startDate': this._startDate,
      'caseId': this._caseId,
      'remandAgyLocId': this._remandAgyLocId,
      'status': this._status,
      'eventId': this._eventId,
      'caseInfoNumber': this._caseInfoNumber,
      'dateToBeFix': this._dateToBeFix,
      'rowId': this._rowId,
      'offenderIdDisplay': this._offenderIdDisplay,
      'agyLocId': this._agyLocId,
      'agyLocIdVal': this._agyLocIdVal,
      'completeStatus' : this._completeStatus,
      'completionAuthor' : this._completionAuthor

    };
  }
}
