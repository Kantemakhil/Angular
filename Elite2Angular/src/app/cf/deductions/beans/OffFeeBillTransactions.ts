export class OffFeeBillTransactions {
    private _billStatus: string;
    private _billTxnComment: string;
    private _originalBillTxnNo: number;
    private _offAdjRevRsn: string;
    private _billAgingEndDate: Date;
    private _billTxnStaffId: number;
    private _offAdjTxnId: number;
    private _billTxnCategory: string;
    private _trustTxnEntrySeq: number;
    private _originalBillId: string;
    private _billTxnDatetime: Date;
    private _txnStatementGeneratedFlag: string;
    private _billTxnType: string;
    private _trustTxnId: number;
    private _billAgingStartDate: Date;
    private _billTxnAmount: number;
    private _offAdjSubRsn: string;
    private _billTxnNo: number;
    private _billingStatementId: number;
    private _billId: string;
    private _originalOffAdjTxnId: number;
    private _offAdjCancRsn: string;
    private _billTxnUser: string;
    private _offenderFeeId: number;
    private _caseloadId: string;
    private _feeCode: string;
    private _description: string;
    private _paymentAmount: number;
    private _adjustmentAmount: number;
    private _balanceOwingAmount: number;
    private _billTxnAmountTot: number;
    private _paymentAmountTot: number;
    private _adjustmentAmountTot: number;
    private _balanceOwingAmountTot: number;
    private _offenderBookId: number;
    private _amount: number;
    private _balance;
    private _adjustmentType: string;
    private _billOverrideIncreaseDecAmount: number; 
    private _bookingNo : string;
    private _billingCycleStartDate: Date;
    private _billingCycleEndDate: Date;
    private _rootOffenderId: number;
    private _userId: string;
    private _billStatusDescription: string;
    private _txnReferenceNumber: string;
    private _offenderId: number;
    private _liReturn: number;
    private _feeActStatus: string;
    private _sessionId: number;
    private _moduleName: string;
    private _currentBalanceOwning: number; 
    private _offAdjRevAmount: number;
    private _caseloadDesc: string;
    private _feecodeDesc: string;
    private _billGenerateAmount: number;
    private _billTxnTypeDesc: string;
    private _reversal: boolean;
    private _offAdjTxnIdTemp: string;
    private _trustTxnIdTemp: number;
    private _billArDueDate: Date;
    private _billLdppEndDate: Date;
    private _billLdppStartDate: Date;
    private _billGenerateDatetime: Date;
    get reversal(): boolean { return this._reversal; }
    set reversal(value: boolean) { this._reversal = value; }
        
    get billTxnTypeDesc(): string { return this._billTxnTypeDesc; }
    set billTxnTypeDesc(pbillTxnTypeDesc: string) { this._billTxnTypeDesc = pbillTxnTypeDesc; }


    get caseloadDesc(): string { return this._caseloadDesc; }
    set caseloadDesc(PcaseloadDesc: string) { this._caseloadDesc = PcaseloadDesc; }

    get feecodeDesc(): string { return this._feecodeDesc; }
    set feecodeDesc(PfeecodeDesc: string) { this._feecodeDesc = PfeecodeDesc; }

    get offAdjRevAmount(): number { return this._offAdjRevAmount; }
    set offAdjRevAmount(poffAdjRevAmount: number) { this._offAdjRevAmount = poffAdjRevAmount; }

    get feeActStatus(): string { return this._feeActStatus; }
    set feeActStatus(pfeeActStatus: string) { this._feeActStatus = pfeeActStatus; }

    get billingCycleStartDate(): Date { return this._billingCycleStartDate; }
    set billingCycleStartDate(pbillingCycleStartDate: Date) { this._billingCycleStartDate = pbillingCycleStartDate; }

    get billingCycleEndDate(): Date { return this._billingCycleEndDate; }
    set billingCycleEndDate(pbillingCycleEndDate: Date) { this._billingCycleEndDate = pbillingCycleEndDate; }

    get rootOffenderId(): number { return this._rootOffenderId; }
    set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }

    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get feeCode(): string { return this._feeCode; }
    set feeCode(pfeeCode: string) { this._feeCode = pfeeCode; }

    get billStatus(): string { return this._billStatus; }
    set billStatus(pbillStatus: string) { this._billStatus = pbillStatus; }
    get billTxnComment(): string { return this._billTxnComment; }
    set billTxnComment(pbillTxnComment: string) { this._billTxnComment = pbillTxnComment; }
    get originalBillTxnNo(): number { return this._originalBillTxnNo; }
    set originalBillTxnNo(poriginalBillTxnNo: number) { this._originalBillTxnNo = poriginalBillTxnNo; }
    get offAdjRevRsn(): string { return this._offAdjRevRsn; }
    set offAdjRevRsn(poffAdjRevRsn: string) { this._offAdjRevRsn = poffAdjRevRsn; }
    get billAgingEndDate(): Date { return this._billAgingEndDate; }
    set billAgingEndDate(pbillAgingEndDate: Date) { this._billAgingEndDate = pbillAgingEndDate; }
    get billTxnStaffId(): number { return this._billTxnStaffId; }
    set billTxnStaffId(pbillTxnStaffId: number) { this._billTxnStaffId = pbillTxnStaffId; }
    get offAdjTxnId(): number { return this._offAdjTxnId; }
    set offAdjTxnId(poffAdjTxnId: number) { this._offAdjTxnId = poffAdjTxnId; }
    get billTxnCategory(): string { return this._billTxnCategory; }
    set billTxnCategory(pbillTxnCategory: string) { this._billTxnCategory = pbillTxnCategory; }
    get trustTxnEntrySeq(): number { return this._trustTxnEntrySeq; }
    set trustTxnEntrySeq(ptrustTxnEntrySeq: number) { this._trustTxnEntrySeq = ptrustTxnEntrySeq; }
    get originalBillId(): string { return this._originalBillId; }
    set originalBillId(poriginalBillId: string) { this._originalBillId = poriginalBillId; }
    get billTxnDatetime(): Date { return this._billTxnDatetime; }
    set billTxnDatetime(pbillTxnDatetime: Date) { this._billTxnDatetime = pbillTxnDatetime; }
    get txnStatementGeneratedFlag(): string { return this._txnStatementGeneratedFlag; }
    set txnStatementGeneratedFlag(ptxnStatementGeneratedFlag: string) { this._txnStatementGeneratedFlag = ptxnStatementGeneratedFlag; }
    get billTxnType(): string { return this._billTxnType; }
    set billTxnType(pbillTxnType: string) { this._billTxnType = pbillTxnType; }
    get trustTxnId(): number { return this._trustTxnId; }
    set trustTxnId(ptrustTxnId: number) { this._trustTxnId = ptrustTxnId; }
    get billAgingStartDate(): Date { return this._billAgingStartDate; }
    set billAgingStartDate(pbillAgingStartDate: Date) { this._billAgingStartDate = pbillAgingStartDate; }
    get billTxnAmount(): number { return this._billTxnAmount; }
    set billTxnAmount(pbillTxnAmount: number) { this._billTxnAmount = pbillTxnAmount; }
    get offAdjSubRsn(): string { return this._offAdjSubRsn; }
    set offAdjSubRsn(poffAdjSubRsn: string) { this._offAdjSubRsn = poffAdjSubRsn; }
    get billTxnNo(): number { return this._billTxnNo; }
    set billTxnNo(pbillTxnNo: number) { this._billTxnNo = pbillTxnNo; }
    get billingStatementId(): number { return this._billingStatementId; }
    set billingStatementId(pbillingStatementId: number) { this._billingStatementId = pbillingStatementId; }
    get billId(): string { return this._billId; }
    set billId(pbillId: string) { this._billId = pbillId; }
    get originalOffAdjTxnId(): number { return this._originalOffAdjTxnId; }
    set originalOffAdjTxnId(poriginalOffAdjTxnId: number) { this._originalOffAdjTxnId = poriginalOffAdjTxnId; }
    get offAdjCancRsn(): string { return this._offAdjCancRsn; }
    set offAdjCancRsn(poffAdjCancRsn: string) { this._offAdjCancRsn = poffAdjCancRsn; }
    get billTxnUser(): string { return this._billTxnUser; }
    set billTxnUser(pbillTxnUser: string) { this._billTxnUser = pbillTxnUser; }
    get offenderFeeId(): number { return this._offenderFeeId; }
    set offenderFeeId(poffenderFeeId: number) { this._offenderFeeId = poffenderFeeId; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get paymentAmount(): number { return this._paymentAmount; }
    set paymentAmount(ppaymentAmount: number) { this._paymentAmount = ppaymentAmount; }
    get adjustmentAmount(): number { return this._adjustmentAmount; }
    set adjustmentAmount(padjustmentAmount: number) { this._adjustmentAmount = padjustmentAmount; }
    get balanceOwingAmount(): number { return this._balanceOwingAmount; }
    set balanceOwingAmount(pbalanceOwingAmount: number) { this._balanceOwingAmount = pbalanceOwingAmount; }
    get billTxnAmountTot(): number { return this._billTxnAmountTot; }
    set billTxnAmountTot(pbillTxnAmountTot: number) { this._billTxnAmountTot = pbillTxnAmountTot; }
    get paymentAmountTot(): number { return this._paymentAmountTot; }
    set paymentAmountTot(ppaymentAmountTot: number) { this._paymentAmountTot = ppaymentAmountTot; }
    get adjustmentAmountTot(): number { return this._adjustmentAmountTot; }
    set adjustmentAmountTot(padjustmentAmountTot: number) { this._adjustmentAmountTot = padjustmentAmountTot; }
    get balanceOwingAmountTot(): number { return this._balanceOwingAmountTot; }
    set balanceOwingAmountTot(pbalanceOwingAmountTot: number) { this._balanceOwingAmountTot = pbalanceOwingAmountTot; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get amount(): number { return this._amount; }
    set amount(pamount: number) { this._amount = pamount; }
    get balance(): number { return this._balance; }
    set balance(pbalance: number) { this._balance = pbalance; }
    get adjustmentType(): string { return this._adjustmentType; }
    set adjustmentType(padjustmentType: string) { this._adjustmentType = padjustmentType; }
    get billOverrideIncreaseDecAmount(): number { return this._billOverrideIncreaseDecAmount; }
    set billOverrideIncreaseDecAmount(pbillOverrideIncreaseDecAmount: number) { this._billOverrideIncreaseDecAmount = pbillOverrideIncreaseDecAmount; }
    get bookingNo(): string { return this._bookingNo; }
    set bookingNo(pbookingNo: string) { this._bookingNo = pbookingNo; }

    get userId(): string{ return this._userId; }
    set userId(puserId: string){ this._userId = puserId ;}

    get billStatusDescription(): string{ return this._billStatusDescription; }
    set billStatusDescription(pbillStatusDescription: string){ this._billStatusDescription = pbillStatusDescription ;}
    get txnReferenceNumber(): string{ return this._txnReferenceNumber; }
    set txnReferenceNumber(ptxnReferenceNumber: string){ this._txnReferenceNumber = ptxnReferenceNumber ;}
    get offenderId(): number { return this._offenderId; }

  set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    

  get liReturn(): number { return this._liReturn; }
 set liReturn(pliReturn: number) { this._liReturn = pliReturn; }

 get sessionId(): number { return this._sessionId; }
 set sessionId(psessionId: number) { this._sessionId = psessionId; }

 get moduleName(): string { return this._moduleName; }
 set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }

 get currentBalanceOwning(): number { return this._currentBalanceOwning; }
 set currentBalanceOwning(pcurrentBalanceOwning: number) { this._currentBalanceOwning = pcurrentBalanceOwning; }
 
 get billGenerateAmount(): number{ return this._billGenerateAmount; }
 set billGenerateAmount(pbillGenerateAmount: number){ this._billGenerateAmount = pbillGenerateAmount ;}

 get offAdjTxnIdTemp(): string {
    return this._offAdjTxnIdTemp;
}
set offAdjTxnIdTemp(value: string) {
    this._offAdjTxnIdTemp = value;
}
get trustTxnIdTemp(): number { return this._trustTxnIdTemp; }
set trustTxnIdTemp(ptrustTxnIdTemp: number) { this._trustTxnIdTemp = ptrustTxnIdTemp; }
get billLdppStartDate(): Date{ return this._billLdppStartDate; }
set billLdppStartDate(pbillLdppStartDate: Date){ this._billLdppStartDate = pbillLdppStartDate ;}
get billArDueDate(): Date{ return this._billArDueDate; }
set billArDueDate(pbillArDueDate: Date){ this._billArDueDate = pbillArDueDate ;}
get billLdppEndDate(): Date{ return this._billLdppEndDate; }
set billLdppEndDate(pbillLdppEndDate: Date){ this._billLdppEndDate = pbillLdppEndDate ;}

get billGenerateDatetime(): Date{ return this._billGenerateDatetime; }
set billGenerateDatetime(pbillGenerateDatetime: Date){ this._billGenerateDatetime = pbillGenerateDatetime ;}

    toJSON(): any {
        return {
            'billStatus': this._billStatus,
            'billTxnComment': this._billTxnComment,
            'originalBillTxnNo': this._originalBillTxnNo,
            'offAdjRevRsn': this._offAdjRevRsn,
            'billAgingEndDate': this._billAgingEndDate,
            'billTxnStaffId': this._billTxnStaffId,
            'offAdjTxnId': this._offAdjTxnId,
            'billTxnCategory': this._billTxnCategory,
            'trustTxnEntrySeq': this._trustTxnEntrySeq,
            'originalBillId': this._originalBillId,
            'billTxnDatetime': this._billTxnDatetime,
            'txnStatementGeneratedFlag': this._txnStatementGeneratedFlag,
            'billTxnType': this._billTxnType,
            'trustTxnId': this._trustTxnId,
            'billAgingStartDate': this._billAgingStartDate,
            'billTxnAmount': this._billTxnAmount,
            'offAdjSubRsn': this._offAdjSubRsn,
            'billTxnNo': this._billTxnNo,
            'billingStatementId': this._billingStatementId,
            'billId': this._billId,
            'originalOffAdjTxnId': this._originalOffAdjTxnId,
            'offAdjCancRsn': this._offAdjCancRsn,
            'billTxnUser': this._billTxnUser,
            'offenderFeeId': this._offenderFeeId,
            'caseloadId': this._caseloadId,
            'feeCode': this._feeCode,
            'description': this._description,
            'paymentAmount': this._paymentAmount,
            'adjustmentAmount': this._adjustmentAmount,
            'balanceOwingAmount': this._balanceOwingAmount,
            'paymentAmountTot': this._paymentAmountTot,
            'billTxnAmountTot': this._billTxnAmountTot,
            'adjustmentAmountTot': this._adjustmentAmountTot,
            'balanceOwingAmountTot': this._balanceOwingAmountTot,
            'offenderBookId': this._offenderBookId,
            'amount': this._amount,
            'balance': this._balance,
            'adjustmentType': this._adjustmentType,
            'billOverrideIncreaseDecAmount': this._billOverrideIncreaseDecAmount,
            'bookingNo': this._bookingNo,
            'rootOffenderId': this._rootOffenderId,
            'billingCycleStartDate': this._billingCycleStartDate,
            'billingCycleEndDate': this._billingCycleEndDate,
            'userId': this._userId,
            'billStatusDescription': this._billStatusDescription,
            'txnReferenceNumber': this._txnReferenceNumber,
            'offenderId': this._offenderId,
            'liReturn': this._liReturn,
            'feeActStatus': this._feeActStatus,
            'sessionId': this._sessionId,
            'moduleName': this._moduleName,
            'currentBalanceOwning': this._currentBalanceOwning,
            'offAdjRevAmount': this._offAdjRevAmount,
            'feecodeDesc': this._feecodeDesc,
            'caseloadDesc': this._caseloadDesc,
            'billGenerateAmount': this._billGenerateAmount,
            'billTxnTypeDesc': this._billTxnTypeDesc,
            'reversal': this._reversal,
            'trustTxnIdTemp': this._trustTxnIdTemp,
            'billArDueDate': this._billArDueDate,
            'billLdppStartDate': this._billLdppStartDate,
            'billLdppEndDate': this._billLdppEndDate,
            'billGenerateDatetime': this._billGenerateDatetime,
        };
    }
}