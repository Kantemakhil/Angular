
export class OffenderInternalStatuses {
  private _authorizedPersonText: string;
  private _createUserId: string;
  private _authPersonPostCode: string;
  private _offenderBookId: number;
  private _modifyDatetime: Date;
  private _effectiveTime: Date;
  private _modifyUserId: string;
  private _commentText: string;
  private _cipCauseCode: string;
  private _revokedPersonName: string;
  private _expiryDate: Date;
  private _reviewDate: Date;
  private _isReqPartyTypeDom: string;
  private _internalStatusDom: string;
  private _revokedDate: Date;
  private _revPerPostCodeDom: string;
  private _intStsRsnCodeDom: string;
  private _intStsReasonCode: string;
  private _sealFlag: string;
  private _revokeDirection: string;
  private _createDate: Date;
  private _authorizedPersonName: string;
  private _recordStatusDom: string;
  private _isRequestedPartyType: string;
  private _cipDirection: string;
  private _revokedPersonPostCode: string;
  private _internalStatus: string;
  private _createDatetime: Date;
  private _authPerPostCodeDom: string;
  private _recordStatus: string;
  private _internalStatusSeq: number;
  private _agyLocId: string;
  private _revokedBy: number;
  private _signedFlag: string;
  private _durationCode: string;
  private _effectiveDate: Date;
  private _verifiedFlag: boolean;
  private _extension: boolean;
  private _maxMovementDate: Date;
  private _daysOnCip: number;
  private _reasChild: string;

  get reasChild(): string { return this._reasChild; }

  set reasChild(preasChild: string) { this._reasChild = preasChild; }

  get daysOnCip(): number { return this._daysOnCip; }

  set daysOnCip(pdaysOnCip: number) { this._daysOnCip = pdaysOnCip; }

  get extension(): boolean { return this._extension; }

  set extension(pextension: boolean) { this._extension = pextension; }

  get verifiedFlag(): boolean { return this._verifiedFlag; }

  set verifiedFlag(pverifiedFlag: boolean) { this._verifiedFlag = pverifiedFlag; }

  get authorizedPersonText(): string { return this._authorizedPersonText; }

  set authorizedPersonText(pauthorizedPersonText: string) { this._authorizedPersonText = pauthorizedPersonText; }

  get createUserId(): string { return this._createUserId; }

  set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

  get authPersonPostCode(): string { return this._authPersonPostCode; }

  set authPersonPostCode(pauthPersonPostCode: string) { this._authPersonPostCode = pauthPersonPostCode; }

  get offenderBookId(): number { return this._offenderBookId; }

  set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

  get modifyDatetime(): Date { return this._modifyDatetime; }

  set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

  get effectiveTime(): Date { return this._effectiveTime; }

  set effectiveTime(peffectiveTime: Date) { this._effectiveTime = peffectiveTime; }

  get modifyUserId(): string { return this._modifyUserId; }

  set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

  get commentText(): string { return this._commentText; }

  set commentText(pcommentText: string) { this._commentText = pcommentText; }

  get cipCauseCode(): string { return this._cipCauseCode; }

  set cipCauseCode(pcipCauseCode: string) { this._cipCauseCode = pcipCauseCode; }

  get revokedPersonName(): string { return this._revokedPersonName; }

  set revokedPersonName(prevokedPersonName: string) { this._revokedPersonName = prevokedPersonName; }

  get expiryDate(): Date { return this._expiryDate; }

  set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

  get reviewDate(): Date { return this._reviewDate; }

  set reviewDate(previewDate: Date) { this._reviewDate = previewDate; }

  get isReqPartyTypeDom(): string { return this._isReqPartyTypeDom; }

  set isReqPartyTypeDom(pisReqPartyTypeDom: string) { this._isReqPartyTypeDom = pisReqPartyTypeDom; }

  get internalStatusDom(): string { return this._internalStatusDom; }

  set internalStatusDom(pinternalStatusDom: string) { this._internalStatusDom = pinternalStatusDom; }

  get revokedDate(): Date { return this._revokedDate; }

  set revokedDate(prevokedDate: Date) { this._revokedDate = prevokedDate; }

  get revPerPostCodeDom(): string { return this._revPerPostCodeDom; }

  set revPerPostCodeDom(prevPerPostCodeDom: string) { this._revPerPostCodeDom = prevPerPostCodeDom; }

  get intStsRsnCodeDom(): string { return this._intStsRsnCodeDom; }

  set intStsRsnCodeDom(pintStsRsnCodeDom: string) { this._intStsRsnCodeDom = pintStsRsnCodeDom; }

  get intStsReasonCode(): string { return this._intStsReasonCode; }

  set intStsReasonCode(pintStsReasonCode: string) { this._intStsReasonCode = pintStsReasonCode; }

  get sealFlag(): string { return this._sealFlag; }

  set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

  get revokeDirection(): string { return this._revokeDirection; }

  set revokeDirection(prevokeDirection: string) { this._revokeDirection = prevokeDirection; }

  get createDate(): Date { return this._createDate; }

  set createDate(pcreateDate: Date) { this._createDate = pcreateDate; }

  get authorizedPersonName(): string { return this._authorizedPersonName; }

  set authorizedPersonName(pauthorizedPersonName: string) { this._authorizedPersonName = pauthorizedPersonName; }

  get recordStatusDom(): string { return this._recordStatusDom; }

  set recordStatusDom(precordStatusDom: string) { this._recordStatusDom = precordStatusDom; }

  get isRequestedPartyType(): string { return this._isRequestedPartyType; }

  set isRequestedPartyType(pisRequestedPartyType: string) { this._isRequestedPartyType = pisRequestedPartyType; }

  get cipDirection(): string { return this._cipDirection; }

  set cipDirection(pcipDirection: string) { this._cipDirection = pcipDirection; }

  get revokedPersonPostCode(): string { return this._revokedPersonPostCode; }

  set revokedPersonPostCode(prevokedPersonPostCode: string) { this._revokedPersonPostCode = prevokedPersonPostCode; }

  get internalStatus(): string { return this._internalStatus; }

  set internalStatus(pinternalStatus: string) { this._internalStatus = pinternalStatus; }

  get createDatetime(): Date { return this._createDatetime; }

  set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

  get authPerPostCodeDom(): string { return this._authPerPostCodeDom; }

  set authPerPostCodeDom(pauthPerPostCodeDom: string) { this._authPerPostCodeDom = pauthPerPostCodeDom; }

  get recordStatus(): string { return this._recordStatus; }

  set recordStatus(precordStatus: string) { this._recordStatus = precordStatus; }

  get internalStatusSeq(): number { return this._internalStatusSeq; }

  set internalStatusSeq(pinternalStatusSeq: number) { this._internalStatusSeq = pinternalStatusSeq; }

  get agyLocId(): string { return this._agyLocId; }

  set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

  get revokedBy(): number { return this._revokedBy; }

  set revokedBy(prevokedBy: number) { this._revokedBy = prevokedBy; }

  get signedFlag(): string { return this._signedFlag; }

  set signedFlag(psignedFlag: string) { this._signedFlag = psignedFlag; }

  get durationCode(): string { return this._durationCode; }

  set durationCode(pdurationCode: string) { this._durationCode = pdurationCode; }

  get effectiveDate(): Date { return this._effectiveDate; }

  set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }

  get maxMovementDate(): Date { return this._maxMovementDate; }

  set maxMovementDate(pmaxMovementDate: Date) { this._maxMovementDate = pmaxMovementDate; }

  toJSON(): any {
    return {
      'authorizedPersonText': this._authorizedPersonText,
      'createUserId': this._createUserId,
      'authPersonPostCode': this._authPersonPostCode,
      'offenderBookId': this._offenderBookId,
      'modifyDatetime': this._modifyDatetime,
      'effectiveTime': this._effectiveTime,
      'modifyUserId': this._modifyUserId,
      'commentText': this._commentText,
      'cipCauseCode': this._cipCauseCode,
      'revokedPersonName': this._revokedPersonName,
      'expiryDate': this._expiryDate,
      'reviewDate': this._reviewDate,
      'isReqPartyTypeDom': this._isReqPartyTypeDom,
      'internalStatusDom': this._internalStatusDom,
      'revokedDate': this._revokedDate,
      'revPerPostCodeDom': this._revPerPostCodeDom,
      'intStsRsnCodeDom': this._intStsRsnCodeDom,
      'intStsReasonCode': this._intStsReasonCode,
      'sealFlag': this._sealFlag,
      'revokeDirection': this._revokeDirection,
      'createDate': this._createDate,
      'authorizedPersonName': this._authorizedPersonName,
      'recordStatusDom': this._recordStatusDom,
      'isRequestedPartyType': this._isRequestedPartyType,
      'cipDirection': this._cipDirection,
      'revokedPersonPostCode': this._revokedPersonPostCode,
      'internalStatus': this._internalStatus,
      'createDatetime': this._createDatetime,
      'authPerPostCodeDom': this._authPerPostCodeDom,
      'recordStatus': this._recordStatus,
      'internalStatusSeq': this._internalStatusSeq,
      'agyLocId': this._agyLocId,
      'revokedBy': this._revokedBy,
      'signedFlag': this._signedFlag,
      'durationCode': this._durationCode,
      'effectiveDate': this._effectiveDate,
      'verifiedFlag': this._verifiedFlag,
      'extension': this._extension,
      'maxMovementDate': this._maxMovementDate,
      'daysOnCip': this._daysOnCip,
      'reasChild': this._reasChild
    };
  }
}
