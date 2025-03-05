export class OffenderNaDetails {
  private _createUserId: string;
  private _recipNsReasonCode: string;
  private _nsEffectiveDate: Date;
  private _typeSeq: number;
  private _modifyDatetime: number;
  private _offenderBookId: number;
  private _modifyUserId: string;
  private _nsOffenderId: number;
  private _commentText: string;
  private _authorizedStaff: string;
  private _nsType: string;
  private _createDatetime: number;
  private _serialVersionUID: number;
  private _nsExpiryDate: Date;
  private _nsReasonCode: string;
  private _nsLevelCode: string;
  private _offenderId: number;
  private _sealFlag: string;
  private _nsOffenderBookId: number;
  private _OffenderIdDisplay: number;
  private _offenderName: string;
  private _livingUnitDescription: any;
  private _nbtType: string;
  private _nbtReason: string;
  private _scheduledTripId: number;
  private _moduleName: any;



  get createUserId(): string { return this._createUserId; }
  set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
  get recipNsReasonCode(): string { return this._recipNsReasonCode; }
  set recipNsReasonCode(precipNsReasonCode: string) { this._recipNsReasonCode = precipNsReasonCode; }
  get nsEffectiveDate(): Date { return this._nsEffectiveDate; }
  set nsEffectiveDate(pnsEffectiveDate: Date) { this._nsEffectiveDate = pnsEffectiveDate; }
  get typeSeq(): number { return this._typeSeq; }
  set typeSeq(ptypeSeq: number) { this._typeSeq = ptypeSeq; }
  get modifyDatetime(): number { return this._modifyDatetime; }
  set modifyDatetime(pmodifyDatetime: number) { this._modifyDatetime = pmodifyDatetime; }
  get offenderBookId(): number { return this._offenderBookId; }
  set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
  get modifyUserId(): string { return this._modifyUserId; }
  set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
  get nsOffenderId(): number { return this._nsOffenderId; }
  set nsOffenderId(pnsOffenderId: number) { this._nsOffenderId = pnsOffenderId; }
  get commentText(): string { return this._commentText; }
  set commentText(pcommentText: string) { this._commentText = pcommentText; }
  get authorizedStaff(): string { return this._authorizedStaff; }
  set authorizedStaff(pauthorizedStaff: string) { this._authorizedStaff = pauthorizedStaff; }
  get nsType(): string { return this._nsType; }
  set nsType(pnsType: string) { this._nsType = pnsType; }
  get createDatetime(): number { return this._createDatetime; }
  set createDatetime(pcreateDatetime: number) { this._createDatetime = pcreateDatetime; }
  get serialVersionUID(): number { return this._serialVersionUID; }
  set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
  get nsExpiryDate(): Date { return this._nsExpiryDate; }
  set nsExpiryDate(pnsExpiryDate: Date) { this._nsExpiryDate = pnsExpiryDate; }
  get nsReasonCode(): string { return this._nsReasonCode; }
  set nsReasonCode(pnsReasonCode: string) { this._nsReasonCode = pnsReasonCode; }
  get nsLevelCode(): string { return this._nsLevelCode; }
  set nsLevelCode(pnsLevelCode: string) { this._nsLevelCode = pnsLevelCode; }
  get offenderId(): number { return this._offenderId; }
  set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
  get sealFlag(): string { return this._sealFlag; }
  set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
  get nsOffenderBookId(): number { return this._nsOffenderBookId; }
  set nsOffenderBookId(pnsOffenderBookId: number) { this._nsOffenderBookId = pnsOffenderBookId; }
  get OffenderIdDisplay(): number { return this._OffenderIdDisplay; }
  set OffenderIdDisplay(pOffenderIdDisplay: number) { this._OffenderIdDisplay= pOffenderIdDisplay; }
  get offenderName(): string{ return this._offenderName; }
  set offenderName(poffenderName: string){ this._offenderName = poffenderName ;}
  get livingUnitDescription(): any{ return this._livingUnitDescription; }
  set livingUnitDescription(plivingUnitDescription: any){ this._livingUnitDescription = plivingUnitDescription;}
  get nbtType(): string{ return this._nbtType; }
  set nbtType(pnbtType: string){ this._nbtType = pnbtType ;}
  get nbtReason(): string{ return this._nbtReason; }
  set nbtReason(pnbtReason: string){ this._nbtReason = pnbtReason ;}
  get scheduledTripId(): number{ return this._scheduledTripId; }
  set scheduledTripId(pscheduledTripId: number){ this._scheduledTripId = pscheduledTripId ;}
  get moduleName(): any{ return this._moduleName; }
  set moduleName(pmoduleName: any){ this._moduleName = pmoduleName;}

  toJSON(): any {
    return {
      'createUserId': this._createUserId,
      'recipNsReasonCode': this._recipNsReasonCode,
      'nsEffectiveDate': this._nsEffectiveDate,
      'typeSeq': this._typeSeq,
      'modifyDatetime': this._modifyDatetime,
      'offenderBookId': this._offenderBookId,
      'modifyUserId': this._modifyUserId,
      'nsOffenderId': this._nsOffenderId,
      'commentText': this._commentText,
      'authorizedStaff': this._authorizedStaff,
      'nsType': this._nsType,
      'createDatetime': this._createDatetime,
      'serialVersionUID': this._serialVersionUID,
      'nsExpiryDate': this._nsExpiryDate,
      'nsReasonCode': this._nsReasonCode,
      'nsLevelCode': this._nsLevelCode,
      'offenderId': this._offenderId,
      'sealFlag': this._sealFlag,
      'nsOffenderBookId': this._nsOffenderBookId,
      'OffenderIdDisplay': this._OffenderIdDisplay,
      'offenderName': this._offenderName,
      'livingUnitDescription': this._livingUnitDescription,
      'nbtReason': this._nbtReason,
      'nbtType': this._nbtType,
      'scheduledTripId':this._scheduledTripId,
      'moduleName':this._moduleName,
    };
  }
}
