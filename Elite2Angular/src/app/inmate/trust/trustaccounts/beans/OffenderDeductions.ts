import { OffenderTransactions } from '../beans/OffenderTransactions';
import { OffenderDeductionReceipts } from '@inmate/trust/deductions/beans/OffenderDeductionReceipts';
import { OffenderBeneficiaries } from '@inmate/trust/trustaccounts/beans/OffenderBeneficiaries';
    export class OffenderDeductions {
         private _jsStatus: string;
         private _payeePersonId: number;
         private _createUserId: string;
         private _maxRecursiveAmount: number;
         private _deductionType: string;
         private _groupId: number;
         private _modifyUserId: string;
         private _commentText: string;
         private _offenderPaymentProfileId: number;
         private _adjustmentReasonCode: string;
         private _payeeCorporateId: number;
         private _serialVersionUID: number;
         private _deductionAmount: number;
         private _adjustmentTxnId: number;
         private _collectAgencyAmount: number;
         private _deductionStatus: string;
         private _caseId: number;
         private _creditLimit: number;
         private _adjustmentUserId: string;
         private _sealFlag: string;
         private _collectAgencyFlag: string;
         private _collectSentDate: Date;
         private _offenderDeductionId: number;
         private _modifyDate: Date;
         private _maxTotalAmount: number;
         private _fifoFlag: string;
         private _createDateTime: Date;
         private _informationNumber: string;
         private _maxMonthlyAmount: number;
         private _payDeductionFlag: string;
         private _processPriorityNumber: number;
         private _modifyDateTime: Date;
         private _caseloadId: string;
         private _adjustmentText: string;
         private _offenderId: number;
         private _deductionPercentage: number;
         private _adjustmentAmount: number;
         private _deductionPriority: number;
         private _effectiveDate: Date;
         private _deductionDesc: string;
         private _fixedFlag: string;
         private _mthFlag: string;
         private _actFlag: string;
         private _indigentFlag: string;
         private _accountClosedFlag: string;
         private _totPaid: number;
         private _totOwing: number;
         private _offTransList: OffenderTransactions[];
         private _cgnbtMaxMonthlyAmount: string;
         private _uniqueobligationprofile: string;
         private _vsDamtCurVal: number;
         private _profilePayplnFlg: string;
         private _caseloadType: string;
         private _offenderBookId: number;
         private _deductionCategory: string;
         private _amountStatus: string;
         private _commitBean: OffenderDeductions;
         private _offenderDeductionReceipts: OffenderDeductionReceipts[] = [];
         private _offenderBeneficiaries: OffenderBeneficiaries [] = [];
         private  _tbdFlag: string;
         private  _orgAmount: number;
         private  _totCollected: number;
         private  _totalOwing: number;
         private _txnType: string;
         private _txnDescription: string;
         private _amount: number;
         private _originalAmount: number;
      
      
       public get originalAmount(): number {
        return this._originalAmount;
      }
      public set originalAmount(value: number) {
        this._originalAmount = value;
      }

         get amount(): number { return  this._amount; }
         set amount(pamount: number) { this._amount = pamount; }

         get txnType(): string { return this._txnType; }

         set txnType(ptxnType: string) { this._txnType = ptxnType; }


         get txnDescription(): string { return this._txnDescription; }

         set txnDescription(ptxnDescription: string) { this._txnDescription = ptxnDescription; }
      get tbdFlag(): string { return this._tbdFlag; }

      set tbdFlag(ptbdFlag: string) { this._tbdFlag = ptbdFlag; }

      get orgAmount(): number { return this._orgAmount; }

      set orgAmount(porgAmount: number) { this._orgAmount = porgAmount; }

      get totCollected(): number { return this._totCollected; }

      set totCollected(ptotCollected: number) { this._totCollected = ptotCollected; }

      get totalOwing(): number { return this._totalOwing; }

      set totalOwing(ptotalOwing: number) { this._totalOwing = ptotalOwing; }

         get commitBean(): OffenderDeductions {
            return this._commitBean;
          }

          set commitBean(pcommitBean: OffenderDeductions) {
            this._commitBean = pcommitBean;
          }

          get offenderBeneficiaries(): OffenderBeneficiaries[] {
            return this._offenderBeneficiaries;
          }

          set offenderBeneficiaries(poffenderBeneficiaries: OffenderBeneficiaries []) {
            this._offenderBeneficiaries = poffenderBeneficiaries;
          }

         get amountStatus(): string { return this._amountStatus; }

         set amountStatus(pamountStatus: string) { this._amountStatus = pamountStatus; }

         get deductionCategory(): string { return this._deductionCategory; }

         set deductionCategory(pdeductionCategory: string) { this._deductionCategory = pdeductionCategory; }

         get offenderBookId(): number { return this._offenderBookId; }

         set offenderBookId(poffenderBookId: number) {this._offenderBookId = poffenderBookId; }

         get caseloadType(): string { return this._caseloadType; }

         set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }

         get profilePayplnFlg(): string { return this._profilePayplnFlg; }

         set profilePayplnFlg(pprofilePayplnFlg: string) { this._profilePayplnFlg = pprofilePayplnFlg; }

         get vsDamtCurVal(): number { return this._vsDamtCurVal; }

         set vsDamtCurVal(pvsDamtCurVal: number) {this._vsDamtCurVal = pvsDamtCurVal; }

         get uniqueobligationprofile(): string { return this._uniqueobligationprofile; }

         set uniqueobligationprofile(puniqueobligationprofile: string) { this._uniqueobligationprofile = puniqueobligationprofile; }

         get cgnbtMaxMonthlyAmount(): string { return this._cgnbtMaxMonthlyAmount; }

         set cgnbtMaxMonthlyAmount(pcgnbtMaxMonthlyAmount: string) { this._cgnbtMaxMonthlyAmount = pcgnbtMaxMonthlyAmount; }

         get offTransList(): OffenderTransactions[] { return this._offTransList; }

         set offTransList(poffTransList: OffenderTransactions[]) { this._offTransList = poffTransList; }

         get totPaid(): number { return this._totPaid; }

         set totPaid(ptotPaid: number) { this._totPaid = ptotPaid; }

         get totOwing(): number { return this._totOwing; }

         set totOwing(ptotOwing: number) {this._totOwing = ptotOwing; }

        get indigentFlag(): string { return this._indigentFlag; }

        set indigentFlag(pindigentFlag: string) { this._indigentFlag = pindigentFlag; }

        get accountClosedFlag(): string { return this._accountClosedFlag; }

        set accountClosedFlag(paccountClosedFlag: string) { this._accountClosedFlag = paccountClosedFlag; }

        get deductionDesc(): string { return this._deductionDesc; }

        set deductionDesc(pdeductionDesc: string) { this._deductionDesc = pdeductionDesc; }

        get fixedFlag(): string { return this._fixedFlag; }

        set fixedFlag(pfixedFlag: string) { this._fixedFlag = pfixedFlag; }

        get mthFlag(): string { return this._mthFlag; }

        set mthFlag(pmthFlag: string) { this._mthFlag = pmthFlag; }

       get actFlag(): string { return this._actFlag; }

        set actFlag(pactFlag: string) { this._actFlag = pactFlag; }

         get jsStatus(): string { return  this._jsStatus; }

         set jsStatus(pjsStatus: string) { this._jsStatus = pjsStatus; }

         get payeePersonId(): number { return  this._payeePersonId; }

         set payeePersonId(ppayeePersonId: number) { this._payeePersonId = ppayeePersonId; }

         get createUserId(): string { return  this._createUserId; }

         set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

         get maxRecursiveAmount(): number { return  this._maxRecursiveAmount; }

         set maxRecursiveAmount(pmaxRecursiveAmount: number) { this._maxRecursiveAmount = pmaxRecursiveAmount; }

         get deductionType(): string { return  this._deductionType; }

         set deductionType(pdeductionType: string) { this._deductionType = pdeductionType; }

         get groupId(): number { return  this._groupId; }

         set groupId(pgroupId: number) { this._groupId = pgroupId; }

         get modifyUserId(): string { return  this._modifyUserId; }

         set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

         get commentText(): string { return  this._commentText; }

         set commentText(pcommentText: string) { this._commentText = pcommentText; }

         get offenderPaymentProfileId(): number { return  this._offenderPaymentProfileId; }

         set offenderPaymentProfileId(poffenderPaymentProfileId: number) { this._offenderPaymentProfileId = poffenderPaymentProfileId; }

         get adjustmentReasonCode(): string { return  this._adjustmentReasonCode; }

         set adjustmentReasonCode(padjustmentReasonCode: string) { this._adjustmentReasonCode = padjustmentReasonCode; }

         get payeeCorporateId(): number { return  this._payeeCorporateId; }

         set payeeCorporateId(ppayeeCorporateId: number) { this._payeeCorporateId = ppayeeCorporateId; }

         get serialVersionUID(): number { return  this._serialVersionUID; }

         set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

         get deductionAmount(): number { return  this._deductionAmount; }

         set deductionAmount(pdeductionAmount: number) { this._deductionAmount = pdeductionAmount; }

         get adjustmentTxnId(): number { return  this._adjustmentTxnId; }

         set adjustmentTxnId(padjustmentTxnId: number) { this._adjustmentTxnId = padjustmentTxnId; }

         get collectAgencyAmount(): number { return  this._collectAgencyAmount; }

         set collectAgencyAmount(pcollectAgencyAmount: number) { this._collectAgencyAmount = pcollectAgencyAmount; }

         get deductionStatus(): string { return  this._deductionStatus; }

         set deductionStatus(pdeductionStatus: string) { this._deductionStatus = pdeductionStatus; }

         get caseId(): number { return  this._caseId; }

         set caseId(pcaseId: number) { this._caseId = pcaseId; }

         get creditLimit(): number { return  this._creditLimit; }

         set creditLimit(pcreditLimit: number) { this._creditLimit = pcreditLimit; }

         get adjustmentUserId(): string { return  this._adjustmentUserId; }

         set adjustmentUserId(padjustmentUserId: string) { this._adjustmentUserId = padjustmentUserId; }

         get sealFlag(): string { return  this._sealFlag; }

         set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

         get collectAgencyFlag(): string { return  this._collectAgencyFlag; }

         set collectAgencyFlag(pcollectAgencyFlag: string) { this._collectAgencyFlag = pcollectAgencyFlag; }

         get collectSentDate(): Date { return  this._collectSentDate; }

         set collectSentDate(pcollectSentDate: Date) { this._collectSentDate = pcollectSentDate; }

         get offenderDeductionId(): number { return  this._offenderDeductionId; }

         set offenderDeductionId(poffenderDeductionId: number) { this._offenderDeductionId = poffenderDeductionId; }

         get modifyDate(): Date { return  this._modifyDate; }

         set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }

         get maxTotalAmount(): number { return  this._maxTotalAmount; }

         set maxTotalAmount(pmaxTotalAmount: number) { this._maxTotalAmount = pmaxTotalAmount; }

         get fifoFlag(): string { return  this._fifoFlag; }

         set fifoFlag(pfifoFlag: string) { this._fifoFlag = pfifoFlag; }

         get createDateTime(): Date { return  this._createDateTime; }

         set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }

         get informationNumber(): string { return  this._informationNumber; }

         set informationNumber(pinformationNumber: string) { this._informationNumber = pinformationNumber; }

         get maxMonthlyAmount(): number { return  this._maxMonthlyAmount; }

         set maxMonthlyAmount(pmaxMonthlyAmount: number) { this._maxMonthlyAmount = pmaxMonthlyAmount; }

         get payDeductionFlag(): string { return  this._payDeductionFlag; }

         set payDeductionFlag(ppayDeductionFlag: string) { this._payDeductionFlag = ppayDeductionFlag; }

         get processPriorityNumber(): number { return  this._processPriorityNumber; }

         set processPriorityNumber(pprocessPriorityNumber: number) { this._processPriorityNumber = pprocessPriorityNumber; }

         get modifyDateTime(): Date { return  this._modifyDateTime; }

         set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

         get caseloadId(): string { return  this._caseloadId; }

         set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

         get adjustmentText(): string { return  this._adjustmentText; }

         set adjustmentText(padjustmentText: string) { this._adjustmentText = padjustmentText; }

         get offenderId(): number { return  this._offenderId; }

         set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

         get deductionPercentage(): number { return  this._deductionPercentage; }

         set deductionPercentage(pdeductionPercentage: number) { this._deductionPercentage = pdeductionPercentage; }

         get adjustmentAmount(): number { return  this._adjustmentAmount; }

         set adjustmentAmount(padjustmentAmount: number) { this._adjustmentAmount = padjustmentAmount; }

         get deductionPriority(): number { return  this._deductionPriority; }

         set deductionPriority(pdeductionPriority: number) { this._deductionPriority = pdeductionPriority; }

         get effectiveDate(): Date { return  this._effectiveDate; }

         set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }

         get offenderDeductionReceipts(): OffenderDeductionReceipts[] { return this._offenderDeductionReceipts; }

         set offenderDeductionReceipts(poffenderDeductionReceipts: OffenderDeductionReceipts[]) {
            this._offenderDeductionReceipts = poffenderDeductionReceipts; }


     toJSON(): any {
         return {
            'jsStatus': this._jsStatus,
            'payeePersonId': this._payeePersonId,
            'createUserId': this._createUserId,
            'maxRecursiveAmount': this._maxRecursiveAmount,
            'deductionType': this._deductionType,
            'groupId': this._groupId,
            'modifyUserId': this._modifyUserId,
            'commentText': this._commentText,
            'offenderPaymentProfileId': this._offenderPaymentProfileId,
            'adjustmentReasonCode': this._adjustmentReasonCode,
            'payeeCorporateId': this._payeeCorporateId,
            'serialVersionUID': this._serialVersionUID,
            'deductionAmount': this._deductionAmount,
            'adjustmentTxnId': this._adjustmentTxnId,
            'collectAgencyAmount': this._collectAgencyAmount,
            'deductionStatus': this._deductionStatus,
            'caseId': this._caseId,
            'creditLimit': this._creditLimit,
            'adjustmentUserId': this._adjustmentUserId,
            'sealFlag': this._sealFlag,
            'collectAgencyFlag': this._collectAgencyFlag,
            'collectSentDate': this._collectSentDate,
            'offenderDeductionId': this._offenderDeductionId,
            'modifyDate': this._modifyDate,
            'maxTotalAmount': this._maxTotalAmount,
            'fifoFlag': this._fifoFlag,
            'createDateTime': this._createDateTime,
            'informationNumber': this._informationNumber,
            'maxMonthlyAmount': this._maxMonthlyAmount,
            'payDeductionFlag': this._payDeductionFlag,
            'processPriorityNumber': this._processPriorityNumber,
            'modifyDateTime': this._modifyDateTime,
            'caseloadId': this._caseloadId,
            'adjustmentText': this._adjustmentText,
            'offenderId': this._offenderId,
            'deductionPercentage': this._deductionPercentage,
            'adjustmentAmount': this._adjustmentAmount,
            'deductionPriority': this._deductionPriority,
            'effectiveDate': this._effectiveDate,
            'offTransList': this._offTransList,
            'totPaid': this._totPaid,
            'totOwing': this._totOwing,
            'cgnbtMaxMonthlyAmount': this._cgnbtMaxMonthlyAmount,
            'uniqueobligationprofile': this._uniqueobligationprofile,
            'vsDamtCurVal': this._vsDamtCurVal,
            'profilePayplnFlg': this._profilePayplnFlg,
            'caseloadType': this._caseloadType,
            'offenderBookId': this._offenderBookId,
            'deductionCategory': this._deductionCategory,
            'amountStatus': this._amountStatus,
            'commitBean': this._commitBean,
            'offenderDeductionReceipts' : this._offenderDeductionReceipts,
            'offenderBeneficiaries': this._offenderBeneficiaries,
            'tbdFlag': this._tbdFlag,
            'orgAmount': this._orgAmount,
            'totCollected': this._totCollected,
            'totalOwing': this._totalOwing,
            'txnType': this._txnType,
            'txnDescription': this._txnDescription,
            'originalAmount': this._originalAmount
             };

         }
 }
