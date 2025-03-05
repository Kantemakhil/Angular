import {
    CaseloadDedBeneficiariesCommitBean
} from "@inmate/trust/deductions/deductionsmaintenance/beans/CaseloadDedBeneficiariesCommitBean";
import { CaseloadDeductionDetailsCommitBean } from "@inmate/trust/checks/beans/CaseloadDeductionDetailsCommitBean";

export class CaseloadDeductionProfiles {
    private _coLimitAmount: number;
    private _payeePersonId: number;
    private _createUserId: string;
    private _maxRecursiveAmount: number;
    private _modifyDatetime: Date;
    private _deductionType: string;
    private _modifyUserId: string;
    private _commConditionCode: string;
    private _expiryDate: Date;
    private _foAlAllOffenderFlag: string;
    private _coCreditWhenIndigentFlag: string;
    private _flatRate: number;
    private _payeeCorporateId: number;
    private _serialVersionUID: number;
    private _indigentMandatoryFlag: string;
    private _percentage: number;
    private _internalPriorityNo: number;
    private _sealFlag: string;
    private _activeFlag: string;
    private _accountCode: number;
    private _modifyDate: Date;
    private _externalPriorityNo: number;
    private _delayRecapture: number;
    private _maxTotalAmount: number;
    private _fifoFlag: string;
    private _minimumTrustBalance: number;
    private _maxMonthlyAmount: number;
    private _categoryType: string;
    private _commConditionType: string;
    private _createDatetime: Date;
    private _caseloadId: string;
    private _listSeq: number;
    private _effectiveDate: Date;
    private _agyLocId: string;
    private _txnUsage: string;
    private _caseloadType: string;
    private _nbtModifyUserId: string;
    private _deductionTypeDesc: string;
    private _fromBalType: string;
    private _caseloadDedBeneficiariesCommitBean: CaseloadDedBeneficiariesCommitBean;
    private _caseloadDeductionDetailsCommitBean: CaseloadDeductionDetailsCommitBean;
    private _nbtDeductionType: string;
    private _nbtAccountCode: string;
    private _corporateName: string;
    private _monthlyMax: string;
    private _totalMax: string;
    private _minTrustBal: string;
    private _nbtPersonIdOne: string;
    private _nbtPersonIdTwo: string;
    private _receiptNumber: string;
    private _code: string;
    private _location: string;
    private _amount: number;
    private _frequency: string;
    private _dayOfMonth: number;
    private _backBill: string;
    private _nbtCode: string;
    private _nbtFrequency: string;
    private _frequencyCode:string;
	private _frequencyType:string;
    private _nonBillableStatus:string;


    get nbtCode(): string { return this._nbtCode; }
    set nbtCode(pnbtCode: string) { this._nbtCode = pnbtCode; }

    get nbtFrequency(): string { return this._nbtFrequency; }
    set nbtFrequency(pnbtFrequency: string) { this._nbtFrequency = pnbtFrequency; }

    get deductionTypeDesc(): string { return this._deductionTypeDesc; }
    set deductionTypeDesc(pdeductionTypeDesc: string) { this._deductionTypeDesc = pdeductionTypeDesc; }

    get fromBalType(): string { return this._fromBalType; }
    set fromBalType(pfromBalType: string) { this._fromBalType = pfromBalType; }

    get nbtModifyUserId(): string { return this._nbtModifyUserId; }
    set nbtModifyUserId(pnbtModifyUserId: string) { this._nbtModifyUserId = pnbtModifyUserId; }

    get caseloadType(): string { return this._caseloadType; }
    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }

    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get txnUsage(): string { return this._txnUsage; }
    set txnUsage(ptxnUsage: string) { this._txnUsage = ptxnUsage; }

    get coLimitAmount(): number { return this._coLimitAmount; }
    set coLimitAmount(pcoLimitAmount: number) { this._coLimitAmount = pcoLimitAmount; }
    get payeePersonId(): number { return this._payeePersonId; }
    set payeePersonId(ppayeePersonId: number) { this._payeePersonId = ppayeePersonId; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get maxRecursiveAmount(): number { return this._maxRecursiveAmount; }
    set maxRecursiveAmount(pmaxRecursiveAmount: number) { this._maxRecursiveAmount = pmaxRecursiveAmount; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get deductionType(): string { return this._deductionType; }
    set deductionType(pdeductionType: string) { this._deductionType = pdeductionType; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get commConditionCode(): string { return this._commConditionCode; }
    set commConditionCode(pcommConditionCode: string) { this._commConditionCode = pcommConditionCode; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
    get foAlAllOffenderFlag(): string { return this._foAlAllOffenderFlag; }
    set foAlAllOffenderFlag(pfoAlAllOffenderFlag: string) { this._foAlAllOffenderFlag = pfoAlAllOffenderFlag; }
    get coCreditWhenIndigentFlag(): string { return this._coCreditWhenIndigentFlag; }
    set coCreditWhenIndigentFlag(pcoCreditWhenIndigentFlag: string) { this._coCreditWhenIndigentFlag = pcoCreditWhenIndigentFlag; }
    get flatRate(): number { return this._flatRate; }
    set flatRate(pflatRate: number) { this._flatRate = pflatRate; }
    get payeeCorporateId(): number { return this._payeeCorporateId; }
    set payeeCorporateId(ppayeeCorporateId: number) { this._payeeCorporateId = ppayeeCorporateId; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get indigentMandatoryFlag(): string { return this._indigentMandatoryFlag; }
    set indigentMandatoryFlag(pindigentMandatoryFlag: string) { this._indigentMandatoryFlag = pindigentMandatoryFlag; }
    get percentage(): number { return this._percentage; }
    set percentage(ppercentage: number) { this._percentage = ppercentage; }
    get internalPriorityNo(): number { return this._internalPriorityNo; }
    set internalPriorityNo(pinternalPriorityNo: number) { this._internalPriorityNo = pinternalPriorityNo; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get accountCode(): number { return this._accountCode; }
    set accountCode(paccountCode: number) { this._accountCode = paccountCode; }
    get modifyDate(): Date { return this._modifyDate; }
    set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }
    get externalPriorityNo(): number { return this._externalPriorityNo; }
    set externalPriorityNo(pexternalPriorityNo: number) { this._externalPriorityNo = pexternalPriorityNo; }
    get delayRecapture(): number { return this._delayRecapture; }
    set delayRecapture(pdelayRecapture: number) { this._delayRecapture = pdelayRecapture; }
    get maxTotalAmount(): number { return this._maxTotalAmount; }
    set maxTotalAmount(pmaxTotalAmount: number) { this._maxTotalAmount = pmaxTotalAmount; }
    get fifoFlag(): string { return this._fifoFlag; }
    set fifoFlag(pfifoFlag: string) { this._fifoFlag = pfifoFlag; }
    get minimumTrustBalance(): number { return this._minimumTrustBalance; }
    set minimumTrustBalance(pminimumTrustBalance: number) { this._minimumTrustBalance = pminimumTrustBalance; }
    get maxMonthlyAmount(): number { return this._maxMonthlyAmount; }
    set maxMonthlyAmount(pmaxMonthlyAmount: number) { this._maxMonthlyAmount = pmaxMonthlyAmount; }
    get categoryType(): string { return this._categoryType; }
    set categoryType(pcategoryType: string) { this._categoryType = pcategoryType; }
    get commConditionType(): string { return this._commConditionType; }
    set commConditionType(pcommConditionType: string) { this._commConditionType = pcommConditionType; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get effectiveDate(): Date { return this._effectiveDate; }
    set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }
    get code(): string { return this._code; }
    set code(pcode: string) { this._code = pcode; }
    get location(): string { return this._location; }
    set location(plocation: string) { this._location = plocation; }
    get amount(): number { return this._amount; }
    set amount(pamount: number) { this._amount = pamount; }
    get frequency(): string { return this._frequency; }
    set frequency(pfrequency: string) { this._frequency = pfrequency; }
    get dayOfMonth(): number { return this._dayOfMonth; }
    set dayOfMonth(pdayOfMonth: number) { this._dayOfMonth = pdayOfMonth; }
    get backBill(): string { return this._backBill; }
    set backBill(pbackBill: string) { this._backBill = pbackBill; }
    get caseloadDedBeneficiariesCommitBean(): CaseloadDedBeneficiariesCommitBean {
        return this._caseloadDedBeneficiariesCommitBean;
    }

    set caseloadDedBeneficiariesCommitBean(pcaseloadDedBeneficiariesCommitBean: CaseloadDedBeneficiariesCommitBean) {
        this._caseloadDedBeneficiariesCommitBean = pcaseloadDedBeneficiariesCommitBean;
    }
    get caseloadDeductionDetailsCommitBean(): CaseloadDeductionDetailsCommitBean {
        return this._caseloadDeductionDetailsCommitBean;
    }

    set caseloadDeductionDetailsCommitBean(pcaseloadDeductionDetailsCommitBean: CaseloadDeductionDetailsCommitBean) {
        this._caseloadDeductionDetailsCommitBean = pcaseloadDeductionDetailsCommitBean;
    }

    get nbtDeductionType(): string {
        return this._nbtDeductionType;
    }

    set nbtDeductionType(pnbtDeductionType: string) {
        this._nbtDeductionType = pnbtDeductionType;
    }
    get nbtAccountCode(): string {
        return this._nbtAccountCode;
    }

    set nbtAccountCode(pnbtAccountCode: string) {
        this._nbtAccountCode = pnbtAccountCode;
    }

    get corporateName(): string {
        return this._corporateName;
    }

    set corporateName(pcorporateName: string) {
        this._corporateName = pcorporateName;
    }
    get monthlyMax(): string {
        return this._monthlyMax;
    }

    set monthlyMax(pmonthlyMax: string) {
        this._monthlyMax = pmonthlyMax;
    }
    get totalMax(): string {
        return this._totalMax;
    }

    set totalMax(ptotalMax: string) {
        this._totalMax = ptotalMax;
    }
    get minTrustBal(): string {
        return this._minTrustBal;
    }

    set minTrustBal(pminTrustBal: string) {
        this._minTrustBal = pminTrustBal;
    }

    get nbtPersonIdOne(): string {
        return this._nbtPersonIdOne;
    }

    set nbtPersonIdOne(pnbtPersonIdOne: string) {
        this._nbtPersonIdOne = pnbtPersonIdOne;
    }
    get nbtPersonIdTwo(): string {
        return this._nbtPersonIdTwo;
    }

    set nbtPersonIdTwo(pnbtPersonIdTwo: string) {
        this._nbtPersonIdTwo = pnbtPersonIdTwo;
    }

    get receiptNumber(): string {
        return this._receiptNumber;
    }

    set receiptNumber(preceiptNumber: string) {
        this._receiptNumber = preceiptNumber;
    }


    get frequencyCode(): string { return this._frequencyCode; }
    set frequencyCode(pfrequencyCode: string) { this._frequencyCode = pfrequencyCode; }
	get frequencyType(): string { return this._frequencyType; }
    set frequencyType(pfrequencyType: string) { this._frequencyType = pfrequencyType; }
    get nonBillableStatus(): string { return this._nonBillableStatus; }
    set nonBillableStatus(pnonBillableStatus: string) { this._nonBillableStatus = pnonBillableStatus; }


    toJSON(): any {
        return {
            'coLimitAmount': this._coLimitAmount,
            'payeePersonId': this._payeePersonId,
            'createUserId': this._createUserId,
            'maxRecursiveAmount': this._maxRecursiveAmount,
            'modifyDatetime': this._modifyDatetime,
            'deductionType': this._deductionType,
            'modifyUserId': this._modifyUserId,
            'commConditionCode': this._commConditionCode,
            'expiryDate': this._expiryDate,
            'foAlAllOffenderFlag': this._foAlAllOffenderFlag,
            'coCreditWhenIndigentFlag': this._coCreditWhenIndigentFlag,
            'flatRate': this._flatRate,
            'payeeCorporateId': this._payeeCorporateId,
            'serialVersionUID': this._serialVersionUID,
            'indigentMandatoryFlag': this._indigentMandatoryFlag,
            'percentage': this._percentage,
            'internalPriorityNo': this._internalPriorityNo,
            'sealFlag': this._sealFlag,
            'activeFlag': this._activeFlag,
            'accountCode': this._accountCode,
            'modifyDate': this._modifyDate,
            'externalPriorityNo': this._externalPriorityNo,
            'delayRecapture': this._delayRecapture,
            'maxTotalAmount': this._maxTotalAmount,
            'fifoFlag': this._fifoFlag,
            'minimumTrustBalance': this._minimumTrustBalance,
            'maxMonthlyAmount': this._maxMonthlyAmount,
            'categoryType': this._categoryType,
            'commConditionType': this._commConditionType,
            'createDatetime': this._createDatetime,
            'caseloadId': this._caseloadId,
            'listSeq': this._listSeq,
            'effectiveDate': this._effectiveDate,
            'agyLocId': this._agyLocId,
            'txnUsage': this._txnUsage,
            'caseloadType': this._caseloadType,
            'nbtModifyUserId': this._nbtModifyUserId,
            'deductionTypeDesc': this._deductionTypeDesc,
            'fromBalType': this._fromBalType,
            'caseloadDedBeneficiariesCommitBean': this._caseloadDedBeneficiariesCommitBean,
            'caseloadDeductionDetailsCommitBean': this._caseloadDeductionDetailsCommitBean,
            'nbtDeductionType': this._nbtDeductionType,
            'nbtAccountCode': this._nbtAccountCode,
            'corporateName': this._corporateName,
            'monthlyMax': this._monthlyMax,
            'totalMax': this._totalMax,
            'minTrustBal': this._minTrustBal,
            'nbtPersonIdOne': this._nbtPersonIdOne,
            'nbtPersonIdTwo': this._nbtPersonIdTwo,
            'receiptNumber': this._receiptNumber,
            'code': this._code,
            'location': this._location,
            'amount': this._amount,
            'frequency': this._frequency,
            'dayOfMonth': this._dayOfMonth,
            'backBill': this._backBill,
            'nbtCode': this._nbtCode,
            'nbtFrequency': this._nbtFrequency,
            'frequencyType':this._frequencyType,
			'frequencyCode':this._frequencyCode,
            'nonBillableStatus':this._nonBillableStatus
        };
    }
}
