export class DeductionTypes {
  private _createUserId: string;
  private _code: string;
  private _modifyDate: Date;
  private _caseloadRestrictedFlag: string;
  private _modifyDatetime: Date;
  private _deductionType: string;
  private _deductionDesc: string;
  private _modifyUserId: string;
  private _description: string;
  private _deductionCategory: string;
  private _createDatetime: Date;
  private _expiryDate: Date;
  private _caseloadCode: string;
  private _serialVersionUID: number;
  private _clpFlag: string;
  private _parentDeductionType: string;
  private _percentageOfParent: number;
  private _listSeq: number;
  private _sealFlag: string;
  private _updateAllowedFlag: string;
  private _incrementPayablesFlag: string;
  private _fromBalanceType: string;
  private _activeFlag: string;
  private _calculateON: string;

  public get calculateON(): string {
    return this._calculateON;
  }
  public set calculateON(value: string) {
    this._calculateON = value;
  }

  get createUserId(): string { return this._createUserId; }
  set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
  get code(): string { return this._code; }
  set code(pcode: string) { this._code = pcode; }
  get modifyDate(): Date { return this._modifyDate; }
  set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }
  get caseloadRestrictedFlag(): string { return this._caseloadRestrictedFlag; }
  set caseloadRestrictedFlag(pcaseloadRestrictedFlag: string) { this._caseloadRestrictedFlag = pcaseloadRestrictedFlag; }
  get modifyDatetime(): Date { return this._modifyDatetime; }
  set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
  get deductionType(): string { return this._deductionType; }
  set deductionType(pdeductionType: string) { this._deductionType = pdeductionType; }
  get deductionDesc(): string { return this._deductionDesc; }
  set deductionDesc(pdeductionDesc: string) { this._deductionDesc = pdeductionDesc; }
  get modifyUserId(): string { return this._modifyUserId; }
  set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
  get description(): string { return this._description; }
  set description(pdescription: string) { this._description = pdescription; }
  get deductionCategory(): string { return this._deductionCategory; }
  set deductionCategory(pdeductionCategory: string) { this._deductionCategory = pdeductionCategory; }
  get createDatetime(): Date { return this._createDatetime; }
  set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
  get expiryDate(): Date { return this._expiryDate; }
  set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
  get caseloadCode(): string { return this._caseloadCode; }
  set caseloadCode(pcaseloadCode: string) { this._caseloadCode = pcaseloadCode; }
  get serialVersionUID(): number { return this._serialVersionUID; }
  set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
  get clpFlag(): string { return this._clpFlag; }
  set clpFlag(pclpFlag: string) { this._clpFlag = pclpFlag; }
  get percentageOfParent(): number { return this._percentageOfParent; }
  set percentageOfParent(ppercentageOfParent: number) { this._percentageOfParent = ppercentageOfParent; }
  get listSeq(): number { return this._listSeq; }
  set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
  get sealFlag(): string { return this._sealFlag; }
  set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
  get updateAllowedFlag(): string { return this._updateAllowedFlag; }
  set updateAllowedFlag(pupdateAllowedFlag: string) { this._updateAllowedFlag = pupdateAllowedFlag; }
  get incrementPayablesFlag(): string { return this._incrementPayablesFlag; }
  set incrementPayablesFlag(pincrementPayablesFlag: string) { this._incrementPayablesFlag = pincrementPayablesFlag; }
  get fromBalanceType(): string { return this._fromBalanceType; }
  set fromBalanceType(pfromBalanceType: string) { this._fromBalanceType = pfromBalanceType; }
  get activeFlag(): string { return this._activeFlag; }
  set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
  get parentDeductionType(): string { return this._parentDeductionType; }
  set parentDeductionType(pparentDeductionType: string) { this._parentDeductionType = pparentDeductionType; }

  toJSON(): any {
    return {
      'createUserId': this._createUserId,
      'code': this._code,
      'modifyDate': this._modifyDate,
      'caseloadRestrictedFlag': this._caseloadRestrictedFlag,
      'modifyDatetime': this._modifyDatetime,
      'deductionType': this._deductionType,
      'deductionDesc': this._deductionDesc,
      'modifyUserId': this._modifyUserId,
      'description': this._description,
      'deductionCategory': this._deductionCategory,
      'createDatetime': this._createDatetime,
      'expiryDate': this._expiryDate,
      'caseloadCode': this._caseloadCode,
      'serialVersionUID': this._serialVersionUID,
      'clpFlag': this._clpFlag,
      'percentageOfParent': this._percentageOfParent,
      'listSeq': this._listSeq,
      'sealFlag': this._sealFlag,
      'updateAllowedFlag': this._updateAllowedFlag,
      'incrementPayablesFlag': this._incrementPayablesFlag,
      'fromBalanceType': this._fromBalanceType,
      'activeFlag': this._activeFlag,
      'parentDeductionType': this._parentDeductionType,
      'calculateON':this._calculateON,
    };
  }
}
