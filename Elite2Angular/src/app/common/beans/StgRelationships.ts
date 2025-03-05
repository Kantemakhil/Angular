export class StgRelationships {
  private _reason: string;
  private _createUserId: string;
  private _relationshipType: string;
  private _modifyDatetime: Date;
  private _modifyUserId: string;
  private _stgId: number;
  private _commentText: string;
  private _createDatetime: Date;
  private _expiryDate: Date;
  private _serialVersionUID: number;
  private _expiredBy: string;
  private _relatedStgId: number;
  private _sealFlag: string;
  private _relationshipSeq: number;
  private _effectiveDate: Date;
  private _activeFlag: string;
  private _offenderBookId: number;
  private _butViewMembers: string;
  private _scheduledTripId: number;
  private _moduleName: any;
  private _nbtRelatedStgId: any;



  get butViewMembers(): string {return this._butViewMembers; }
  set butViewMembers (pbutViewMembers: string) {this._butViewMembers = pbutViewMembers; }
  get offenderBookId(): number { return this._offenderBookId; }
  set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
  get reason(): string { return this._reason; }
  set reason(preason: string) { this._reason = preason; }
  get createUserId(): string { return this._createUserId; }
  set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
  get relationshipType(): string { return this._relationshipType; }
  set relationshipType(prelationshipType: string) { this._relationshipType = prelationshipType; }
  get modifyDatetime(): Date { return this._modifyDatetime; }
  set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
  get modifyUserId(): string { return this._modifyUserId; }
  set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
  get stgId(): number { return this._stgId; }
  set stgId(pstgId: number) { this._stgId = pstgId; }
  get commentText(): string { return this._commentText; }
  set commentText(pcommentText: string) { this._commentText = pcommentText; }
  get createDatetime(): Date { return this._createDatetime; }
  set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
  get expiryDate(): Date { return this._expiryDate; }
  set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
  get serialVersionUID(): number { return this._serialVersionUID; }
  set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
  get expiredBy(): string { return this._expiredBy; }
  set expiredBy(pexpiredBy: string) { this._expiredBy = pexpiredBy; }
  get relatedStgId(): number { return this._relatedStgId; }
  set relatedStgId(prelatedStgId: number) { this._relatedStgId = prelatedStgId; }
  get sealFlag(): string { return this._sealFlag; }
  set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
  get relationshipSeq(): number { return this._relationshipSeq; }
  set relationshipSeq(prelationshipSeq: number) { this._relationshipSeq = prelationshipSeq; }
  get effectiveDate(): Date { return this._effectiveDate; }
  set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }
  get activeFlag(): string { return this._activeFlag; }
  set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
  get scheduledTripId(): number{ return this._scheduledTripId; }
  set scheduledTripId(pscheduledTripId: number){ this._scheduledTripId = pscheduledTripId ;}
  get moduleName(): any{ return this._moduleName; }
  set moduleName(pmoduleName: any){ this._moduleName = pmoduleName;}
  get nbtRelatedStgId(): any{ return this._nbtRelatedStgId; }
  set nbtRelatedStgId(pnbtRelatedStgId:any){ this._nbtRelatedStgId = pnbtRelatedStgId ;}


  toJSON(): any {
    return {
      'reason': this._reason,
      'createUserId': this._createUserId,
      'relationshipType': this._relationshipType,
      'modifyDatetime': this._modifyDatetime,
      'modifyUserId': this._modifyUserId,
      'stgId': this._stgId,
      'commentText': this._commentText,
      'createDatetime': this._createDatetime,
      'expiryDate': this._expiryDate,
      'serialVersionUID': this._serialVersionUID,
      'expiredBy': this._expiredBy,
      'relatedStgId': this._relatedStgId,
      'sealFlag': this._sealFlag,
      'relationshipSeq': this._relationshipSeq,
      'effectiveDate': this._effectiveDate,
      'activeFlag': this._activeFlag,
    'offenderBookId': this._offenderBookId,
    'butViewMembers': this._butViewMembers,
    'scheduledTripId':this._scheduledTripId,
     'moduleName':this._moduleName,
     'nbtRelatedStgId': this._nbtRelatedStgId,
    };
  }
}
