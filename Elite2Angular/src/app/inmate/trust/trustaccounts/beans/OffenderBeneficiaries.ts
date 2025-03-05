export class OffenderBeneficiaries {

  private _amount: number;
  private _createUserId: string;
  private _unknownBenId: number;
  private _modifyUserId: string;
  private _overrideAmount: number;
  private _receivedAmount: number;
  private _priority: number;
  private _commentText: string;
  private _percent: number;
  private _corporateId: number;
  private _createDateTime: Date;
  private _serialVersionUID: number;
  private _recursiveAmount: number;
  private _tbdFlag: string;
  private _modifyDateTime: Date;
  private _personId: number;
  private _offenderId: number;
  private _monthlyAmount: number;
  private _sealFlag: string;
  private _beneficiaryId: number;
  private _caseloadId: string;
  private _txnType: string;
  private _drvAmount: number;
  private _offenderDeductionId: number;
  private _moduleName: string;
  private _offenderIdDisplay: string;
  private _writeOfAmount: number;
  private _totalAmount: string;
  private _totalCollected: string;
  private _totalOwing: string;
  private _deductionDesc: string;
  private _firstName: string;
  private _lastName: string;
  private _caseLoadType: string;
  private _offenderBookId: number;
  private _subAccountType: string;
  private _txnEntryAmount: number;
  private _cgnbtUnknownBenId: string;
  private _dspPercent: number;
  private _cgnbtCorporateId: string;
  private _totalDescription: string;
  private _commitBean: OffenderBeneficiaries;
  private _maintainceFlag: string;
  private _location: string;
  private _personName: string;
  private _unknwonBenIdFlag: string;
  private _corporateName: string;
  private _totalPaid: string;

  get location(): string { return this._location; }

  set location(plocation: string) { this._location = plocation; }

  get maintainceFlag(): string { return this._maintainceFlag; }

  set maintainceFlag(pmaintainceFlag: string) { this._maintainceFlag = pmaintainceFlag; }

  get commitBean(): OffenderBeneficiaries {
    return this._commitBean;
  }

  set commitBean(pcommitBean: OffenderBeneficiaries) {
    this._commitBean = pcommitBean;
  }

  get cgnbtCorporateId(): string { return this._cgnbtCorporateId; }

  set cgnbtCorporateId(pcgnbtCorporateId: string) { this._cgnbtCorporateId = pcgnbtCorporateId; }

  get dspPercent(): number { return this._dspPercent; }

  set dspPercent(pdspPercent: number) { this._dspPercent = pdspPercent; }

  get cgnbtUnknownBenId(): string { return this._cgnbtUnknownBenId; }

  set cgnbtUnknownBenId(pcgnbtUnknownBenId: string) { this._cgnbtUnknownBenId = pcgnbtUnknownBenId; }

  get firstName(): string { return this._firstName; }

  set firstName(pfirstName: string) { this._firstName = pfirstName; }

  get lastName(): string { return this._lastName; }

  set lastName(plastName: string) { this._lastName = plastName; }

  get deductionDesc(): string { return this._deductionDesc; }

  set deductionDesc(pdeductionDesc: string) { this._deductionDesc = pdeductionDesc; }

  get totalAmount(): string { return this._totalAmount; }

  set totalAmount(ptotalAmount: string) { this._totalAmount = ptotalAmount; }

  get totalCollected(): string { return this._totalCollected; }

  set totalCollected(ptotalCollected: string) { this._totalCollected = ptotalCollected; }

  get totalOwing(): string { return this._totalOwing; }

  set totalOwing(ptotalOwing: string) { this._totalOwing = ptotalOwing; }

  get writeOfAmount(): number { return this._writeOfAmount; }

  set writeOfAmount(pwriteOfAmount: number) { this._writeOfAmount = pwriteOfAmount; }

  get offenderIdDisplay(): string { return this._offenderIdDisplay; }

  set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

  get amount(): number { return this._amount; }

  set amount(pamount: number) { this._amount = pamount; }

  get createUserId(): string { return this._createUserId; }

  set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

  get unknownBenId(): number { return this._unknownBenId; }

  set unknownBenId(punknownBenId: number) { this._unknownBenId = punknownBenId; }

  get modifyUserId(): string { return this._modifyUserId; }

  set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

  get overrideAmount(): number { return this._overrideAmount; }

  set overrideAmount(poverrideAmount: number) { this._overrideAmount = poverrideAmount; }

  get receivedAmount(): number { return this._receivedAmount; }

  set receivedAmount(preceivedAmount: number) { this._receivedAmount = preceivedAmount; }

  get priority(): number { return this._priority; }

  set priority(ppriority: number) { this._priority = ppriority; }

  get commentText(): string { return this._commentText; }

  set commentText(pcommentText: string) { this._commentText = pcommentText; }

  get percent(): number { return this._percent; }

  set percent(ppercent: number) { this._percent = ppercent; }

  get corporateId(): number { return this._corporateId; }

  set corporateId(pcorporateId: number) { this._corporateId = pcorporateId; }

  get createDateTime(): Date { return this._createDateTime; }

  set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }

  get serialVersionUID(): number { return this._serialVersionUID; }

  set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

  get recursiveAmount(): number { return this._recursiveAmount; }

  set recursiveAmount(precursiveAmount: number) { this._recursiveAmount = precursiveAmount; }

  get tbdFlag(): string { return this._tbdFlag; }

  set tbdFlag(ptbdFlag: string) { this._tbdFlag = ptbdFlag; }

  get modifyDateTime(): Date { return this._modifyDateTime; }

  set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

  get personId(): number { return this._personId; }

  set personId(ppersonId: number) { this._personId = ppersonId; }

  get offenderId(): number { return this._offenderId; }

  set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

  get monthlyAmount(): number { return this._monthlyAmount; }

  set monthlyAmount(pmonthlyAmount: number) { this._monthlyAmount = pmonthlyAmount; }

  get sealFlag(): string { return this._sealFlag; }

  set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

  get beneficiaryId(): number { return this._beneficiaryId; }

  set beneficiaryId(pbeneficiaryId: number) { this._beneficiaryId = pbeneficiaryId; }

  get txnType(): string { return this._txnType; }

  set txnType(ptxnType: string) { this._txnType = ptxnType; }

  get caseloadId(): string { return this._caseloadId; }

  set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

  get drvAmount(): number { return this._drvAmount; }

  set drvAmount(pdrvAmount: number) { this._drvAmount = pdrvAmount; }

  get offenderDeductionId(): number { return this._offenderDeductionId; }

  set offenderDeductionId(poffenderDeductionId: number) { this._offenderDeductionId = poffenderDeductionId; }

  get moduleName(): string { return this._moduleName; }

  set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }

  get caseLoadType(): string { return this._caseLoadType; }

  set caseLoadType(pcaseLoadType: string) { this._caseLoadType = pcaseLoadType; }

  get offenderBookId(): number { return this._offenderBookId; }

  set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

  get subAccountType(): string { return this._subAccountType; }

  set subAccountType(psubAccountType: string) { this._subAccountType = psubAccountType; }

  get txnEntryAmount(): number { return this._txnEntryAmount; }

  set txnEntryAmount(ptxnEntryAmount: number) { this._txnEntryAmount = ptxnEntryAmount; }

  get totalDescription(): string { return this._totalDescription; }

  set totalDescription(ptotalDescription: string) { this._totalDescription = ptotalDescription; }

  get totalPaid(): string { return this._totalPaid; }

  set totalPaid(ptotalPaid: string) { this._totalPaid = ptotalPaid; }

  get corporateName(): string { return this._corporateName; }

  set corporateName(pcorporateName: string) { this._corporateName = pcorporateName; }

  get personName(): string { return this._personName; }

  set personName(ppersonName: string) { this._personName = ppersonName; }

  get unknwonBenIdFlag(): string { return this._unknwonBenIdFlag; }

  set unknwonBenIdFlag(punknwonBenIdFlag: string) { this._unknwonBenIdFlag = punknwonBenIdFlag; }

  toJSON(): any {
    return {
      'amount': this._amount,
      'createUserId': this._createUserId,
      'unknownBenId': this._unknownBenId,
      'modifyUserId': this._modifyUserId,
      'overrideAmount': this._overrideAmount,
      'receivedAmount': this._receivedAmount,
      'priority': this._priority,
      'commentText': this._commentText,
      'percent': this._percent,
      'corporateId': this._corporateId,
      'createDateTime': this._createDateTime,
      'serialVersionUID': this._serialVersionUID,
      'recursiveAmount': this._recursiveAmount,
      'tbdFlag': this._tbdFlag,
      'modifyDateTime': this._modifyDateTime,
      'personId': this._personId,
      'offenderId': this._offenderId,
      'monthlyAmount': this._monthlyAmount,
      'sealFlag': this._sealFlag,
      'beneficiaryId': this._beneficiaryId,
      'txnType': this._txnType,
      'caseloadId': this._caseloadId,
      'drvAmount': this._drvAmount,
      'offenderDeductionId': this._offenderDeductionId,
      'moduleName': this._moduleName,
      'offenderIdDisplay': this._offenderIdDisplay,
      'writeOfAmount': this._writeOfAmount,
      'totalOwing': this._totalOwing,
      'totalAmount': this._totalAmount,
      'totalCollected': this._totalCollected,
      'deductionDesc': this._deductionDesc,
      'lastName': this._lastName,
      'firstName': this._firstName,
      'caseLoadType': this._caseLoadType,
      'offenderBookId': this._offenderBookId,
      'subAccountType': this._subAccountType,
      'txnEntryAmount': this._txnEntryAmount,
      'cgnbtUnknownBenId': this._cgnbtUnknownBenId,
      'dspPercent': this.dspPercent,
      'cgnbtCorporateId': this._cgnbtCorporateId,
      'totalDescription': this._totalDescription,
      'commitBean': this._commitBean,
      'maintainceFlag': this._maintainceFlag,
      'personName': this._personName,
      'unknwonBenIdFlag': this._unknwonBenIdFlag,
      'totalPaid': this._totalPaid,

    };
  }
}
