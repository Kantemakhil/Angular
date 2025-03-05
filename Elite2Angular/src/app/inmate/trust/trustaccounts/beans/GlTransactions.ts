export class GlTransactions {
    private _txnEntryDesc: string;
    private _payeePersonId: number;
    private _txnReversedFlag: string;
    private _createUserId: string;
    private _payeeNameText: string;
    private _offenderBookId: number;
    private _modifyDatetime: Date;
    private _reversedTxnId: number;
    private _infoNumber: string;
    private _modifyUserId: string;
    private _txnType: string;
    private _txnEntryAmount: number;
    private _deductionId: number;
    private _payeeCorporateId: number;
    private _txnEntrySeq: number;
    private _reversedGlEntrySeq: number;
    private _reversedTxnEntrySeq: number;
    private _txnObjectCode: string;
    private _sealFlag: string;
    private _receiptNumber: string;
    private _txnPostUsage: string;
    private _createDate: Date;
    private _accountPeriodId: number;
    private _reconClearFlag: string;
    private _accountCode: number;
    private _glEntrySeq: number;
    private _txnEntryDate: Date;
    private _reversalReasonCode: string;
    private _txnObjectId: number;
    private _createDatetime: Date;
    private _txnReferenceNumber: string;
    private _txnEntryTime: Date;
    private _payeeClearFlag: string;
    private _caseloadId: string;
    private _listSeq: number;
    private _offenderId: number;
    private _bankStatementDate: Date;
    private _txnLocId: string;
    private _txnId: number;
    private _lastReconciledDate: Date;
    private _txnReversedFlagOne: string;
    private _accountCodeOne: number;
    private _offenderIdDisplay: string;
    private _accountCodeTwo: number;
    private _description: string;
    private _txnEntryDescOne: string;
    private _nextButton: string;
    private _dspTxnPostingType: string;
    private _dspAccountName: string;
    private _nbtBalance: number;
    private _nbtTxnType: string;
    private _nbtBalanceDisplay: string;
    private _checkProduceFlag: string;
    private _drAccountCode: number;
    private _crAccountCode: number;
    private _caseloadType: string;
    private _nbtOffenderId: number;
    private _nbtOffenderIdDisplay: string;
    private _txnPostUsageGrid: string;
    private _moduleName: string;
    private _cgnbtPayeeNameTextOne: number;
    private _cgnbtPayeeNameTextTwo: number;
    private _cgnbtBankStatementDate: Date;
    private _txnPostUsageCr: string;

    get txnPostUsageCr(): string { return this._txnPostUsageCr; }
    set txnPostUsageCr(ptxnPostUsageCr: string) { this._txnPostUsageCr = ptxnPostUsageCr; }

    get cgnbtBankStatementDate(): Date { return this._cgnbtBankStatementDate; }
    set cgnbtBankStatementDate(pcgnbtBankStatementDate: Date) { this._cgnbtBankStatementDate = pcgnbtBankStatementDate; }

    get txnPostUsageGrid(): string { return this._txnPostUsageGrid; }
    set txnPostUsageGrid(ptxnPostUsageGrid: string) { this._txnPostUsageGrid = ptxnPostUsageGrid; }
    get checkProduceFlag(): string { return this._checkProduceFlag; }
    set checkProduceFlag(pcheckProduceFlag: string) { this._checkProduceFlag = pcheckProduceFlag; }
    get lastReconciledDate(): Date { return this._lastReconciledDate; }
    set lastReconciledDate(plastReconciledDate: Date) { this._lastReconciledDate = plastReconciledDate; }
    get txnEntryDesc(): string { return this._txnEntryDesc; }
    set txnEntryDesc(ptxnEntryDesc: string) { this._txnEntryDesc = ptxnEntryDesc; }
    get payeePersonId(): number { return this._payeePersonId; }
    set payeePersonId(ppayeePersonId: number) { this._payeePersonId = ppayeePersonId; }
    get txnReversedFlag(): string { return this._txnReversedFlag; }
    set txnReversedFlag(ptxnReversedFlag: string) { this._txnReversedFlag = ptxnReversedFlag; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get payeeNameText(): string { return this._payeeNameText; }
    set payeeNameText(ppayeeNameText: string) { this._payeeNameText = ppayeeNameText; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get reversedTxnId(): number { return this._reversedTxnId; }
    set reversedTxnId(preversedTxnId: number) { this._reversedTxnId = preversedTxnId; }
    get infoNumber(): string { return this._infoNumber; }
    set infoNumber(pinfoNumber: string) { this._infoNumber = pinfoNumber; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get txnType(): string { return this._txnType; }
    set txnType(ptxnType: string) { this._txnType = ptxnType; }
    get txnEntryAmount(): number { return this._txnEntryAmount; }
    set txnEntryAmount(ptxnEntryAmount: number) { this._txnEntryAmount = ptxnEntryAmount; }
    get deductionId(): number { return this._deductionId; }
    set deductionId(pdeductionId: number) { this._deductionId = pdeductionId; }
    get payeeCorporateId(): number { return this._payeeCorporateId; }
    set payeeCorporateId(ppayeeCorporateId: number) { this._payeeCorporateId = ppayeeCorporateId; }
    get txnEntrySeq(): number { return this._txnEntrySeq; }
    set txnEntrySeq(ptxnEntrySeq: number) { this._txnEntrySeq = ptxnEntrySeq; }
    get reversedGlEntrySeq(): number { return this._reversedGlEntrySeq; }
    set reversedGlEntrySeq(preversedGlEntrySeq: number) { this._reversedGlEntrySeq = preversedGlEntrySeq; }
    get reversedTxnEntrySeq(): number { return this._reversedTxnEntrySeq; }
    set reversedTxnEntrySeq(preversedTxnEntrySeq: number) { this._reversedTxnEntrySeq = preversedTxnEntrySeq; }
    get txnObjectCode(): string { return this._txnObjectCode; }
    set txnObjectCode(ptxnObjectCode: string) { this._txnObjectCode = ptxnObjectCode; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get receiptNumber(): string { return this._receiptNumber; }
    set receiptNumber(preceiptNumber: string) { this._receiptNumber = preceiptNumber; }
    get txnPostUsage(): string { return this._txnPostUsage; }
    set txnPostUsage(ptxnPostUsage: string) { this._txnPostUsage = ptxnPostUsage; }
    get createDate(): Date { return this._createDate; }
    set createDate(pcreateDate: Date) { this._createDate = pcreateDate; }
    get accountPeriodId(): number { return this._accountPeriodId; }
    set accountPeriodId(paccountPeriodId: number) { this._accountPeriodId = paccountPeriodId; }
    get reconClearFlag(): string { return this._reconClearFlag; }
    set reconClearFlag(preconClearFlag: string) { this._reconClearFlag = preconClearFlag; }
    get accountCode(): number { return this._accountCode; }
    set accountCode(paccountCode: number) { this._accountCode = paccountCode; }
    get glEntrySeq(): number { return this._glEntrySeq; }
    set glEntrySeq(pglEntrySeq: number) { this._glEntrySeq = pglEntrySeq; }
    get txnEntryDate(): Date { return this._txnEntryDate; }
    set txnEntryDate(ptxnEntryDate: Date) { this._txnEntryDate = ptxnEntryDate; }
    get reversalReasonCode(): string { return this._reversalReasonCode; }
    set reversalReasonCode(preversalReasonCode: string) { this._reversalReasonCode = preversalReasonCode; }
    get txnObjectId(): number { return this._txnObjectId; }
    set txnObjectId(ptxnObjectId: number) { this._txnObjectId = ptxnObjectId; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get txnReferenceNumber(): string { return this._txnReferenceNumber; }
    set txnReferenceNumber(ptxnReferenceNumber: string) { this._txnReferenceNumber = ptxnReferenceNumber; }
    get txnEntryTime(): Date { return this._txnEntryTime; }
    set txnEntryTime(ptxnEntryTime: Date) { this._txnEntryTime = ptxnEntryTime; }
    get payeeClearFlag(): string { return this._payeeClearFlag; }
    set payeeClearFlag(ppayeeClearFlag: string) { this._payeeClearFlag = ppayeeClearFlag; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get bankStatementDate(): Date { return this._bankStatementDate; }
    set bankStatementDate(pbankStatementDate: Date) { this._bankStatementDate = pbankStatementDate; }
    get txnLocId(): string { return this._txnLocId; }
    set txnLocId(ptxnLocId: string) { this._txnLocId = ptxnLocId; }
    get txnId(): number { return this._txnId; }
    set txnId(ptxnId: number) { this._txnId = ptxnId; }
    get txnReversedFlagOne(): string { return this._txnReversedFlagOne; }
    set txnReversedFlagOne(ptxnReversedFlagOne: string) { this._txnReversedFlagOne = ptxnReversedFlagOne; }
    get accountCodeOne(): number { return this._accountCodeOne; }
    set accountCodeOne(paccountCodeOne: number) { this._accountCodeOne = paccountCodeOne; }
    get offenderIdDisplay(): string { return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }
    get accountCodeTwo(): number { return this._accountCodeTwo; }
    set accountCodeTwo(paccountCodeTwo: number) { this._accountCodeTwo = paccountCodeTwo; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get txnEntryDescOne(): string { return this._txnEntryDescOne; }
    set txnEntryDescOne(ptxnEntryDescOne: string) { this._txnEntryDescOne = ptxnEntryDescOne; }
    get nextButton(): string { return this._nextButton; }
    set nextButton(pnextButton: string) { this._nextButton = pnextButton; }
    get nbtOffenderId(): number { return this._nbtOffenderId; }
    set nbtOffenderId(pnbtOffenderId: number) { this._nbtOffenderId = pnbtOffenderId; }
    get nbtOffenderIdDisplay(): string { return this._nbtOffenderIdDisplay; }
    set nbtOffenderIdDisplay(pnbtOffenderIdDisplay: string) { this._nbtOffenderIdDisplay = pnbtOffenderIdDisplay; }
    get moduleName(): string { return this._moduleName; }
    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }
    get dspTxnPostingType(): string {
        return this._dspTxnPostingType;
    }
    get nbtTxnType(): string {
        return this._nbtTxnType;
    }

    set nbtTxnType(pnbtTxnType: string) {
        this._nbtTxnType = pnbtTxnType;
    }

    set dspTxnPostingType(pdspTxnPostingType: string) {
        this._dspTxnPostingType = pdspTxnPostingType;
    }
    get dspAccountName(): string {
        return this._dspAccountName;
    }

    set dspAccountName(pdspAccountName: string) {
        this._dspAccountName = pdspAccountName;
    }
    get nbtBalance(): number {
        return this._nbtBalance;
    }

    set nbtBalance(pnbtBalance: number) {
        this._nbtBalance = pnbtBalance;
    }
    get nbtBalanceDisplay(): string {
        return this._nbtBalanceDisplay;
    }

    set nbtBalanceDisplay(pnbtBalanceDisplay: string) {
        this._nbtBalanceDisplay = pnbtBalanceDisplay;
    }
    get drAccountCode(): number {
        return this._drAccountCode;
    }

    set drAccountCode(pdrAccountCode: number) {
        this._drAccountCode = pdrAccountCode;
    }
    get crAccountCode(): number {
        return this._crAccountCode;
    }

    set crAccountCode(pcrAccountCode: number) {
        this._crAccountCode = pcrAccountCode;
    }
    get caseloadType(): string {
        return this._caseloadType;
    }

    set caseloadType(pcaseloadType: string) {
        this._caseloadType = pcaseloadType;
    }

    get cgnbtPayeeNameTextOne(): number {
        return this._cgnbtPayeeNameTextOne;
    }

    set cgnbtPayeeNameTextOne(pcgnbtPayeeNameTextOne: number) {
        this._cgnbtPayeeNameTextOne = pcgnbtPayeeNameTextOne;
    }

    get cgnbtPayeeNameTextTwo(): number {
        return this._cgnbtPayeeNameTextTwo;
    }

    set cgnbtPayeeNameTextTwo(pcgnbtPayeeNameTextTwo: number) {
        this._cgnbtPayeeNameTextTwo = pcgnbtPayeeNameTextTwo;
    }


    toJSON(): any {
        return {
            'txnEntryDesc': this._txnEntryDesc,
            'payeePersonId': this._payeePersonId,
            'txnReversedFlag': this._txnReversedFlag,
            'createUserId': this._createUserId,
            'payeeNameText': this._payeeNameText,
            'offenderBookId': this._offenderBookId,
            'modifyDatetime': this._modifyDatetime,
            'reversedTxnId': this._reversedTxnId,
            'infoNumber': this._infoNumber,
            'modifyUserId': this._modifyUserId,
            'txnType': this._txnType,
            'txnEntryAmount': this._txnEntryAmount,
            'deductionId': this._deductionId,
            'payeeCorporateId': this._payeeCorporateId,
            'txnEntrySeq': this._txnEntrySeq,
            'reversedGlEntrySeq': this._reversedGlEntrySeq,
            'reversedTxnEntrySeq': this._reversedTxnEntrySeq,
            'txnObjectCode': this._txnObjectCode,
            'sealFlag': this._sealFlag,
            'receiptNumber': this._receiptNumber,
            'txnPostUsage': this._txnPostUsage,
            'createDate': this._createDate,
            'accountPeriodId': this._accountPeriodId,
            'reconClearFlag': this._reconClearFlag,
            'accountCode': this._accountCode,
            'glEntrySeq': this._glEntrySeq,
            'txnEntryDate': this._txnEntryDate,
            'reversalReasonCode': this._reversalReasonCode,
            'txnObjectId': this._txnObjectId,
            'createDatetime': this._createDatetime,
            'txnReferenceNumber': this._txnReferenceNumber,
            'txnEntryTime': this._txnEntryTime,
            'payeeClearFlag': this._payeeClearFlag,
            'caseloadId': this._caseloadId,
            'listSeq': this._listSeq,
            'offenderId': this._offenderId,
            'bankStatementDate': this._bankStatementDate,
            'txnLocId': this._txnLocId,
            'txnId': this._txnId,
            'lastReconciledDate': this._lastReconciledDate,
            'txnReversedFlagOne': this._txnReversedFlagOne,
            'accountCodeOne': this._accountCodeOne,
            'offenderIdDisplay': this._offenderIdDisplay,
            'accountCodeTwo': this._accountCodeTwo,
            'description': this._description,
            'txnEntryDescOne': this._txnEntryDescOne,
            'nextButton': this._nextButton,
            'dspTxnPostingType': this._dspTxnPostingType,
            'dspAccountName': this._dspAccountName,
            'nbtBalance': this._nbtBalance,
            'nbtTxnType': this._nbtTxnType,
            'nbtBalanceDisplay': this._nbtBalanceDisplay,
            'checkProduceFlag': this._checkProduceFlag,
            'drAccountCode': this._drAccountCode,
            'crAccountCode': this._crAccountCode,
            'caseloadType': this._caseloadType,
            'nbtOffenderId': this._nbtOffenderId,
            'nbtOffenderIdDisplay': this._nbtOffenderIdDisplay,
            'txnPostUsageGrid': this.txnPostUsageGrid,
            'moduleName': this._moduleName,
            'cgnbtPayeeNameTextOne': this._cgnbtPayeeNameTextOne,
            'cgnbtPayeeNameTextTwo': this._cgnbtPayeeNameTextTwo,
            'cgnbtBankStatementDate': this._cgnbtBankStatementDate,
            'txnPostUsageCr': this._txnPostUsageCr
        };
    }
}
