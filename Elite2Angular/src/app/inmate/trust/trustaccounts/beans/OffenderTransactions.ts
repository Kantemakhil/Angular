
import { OffFeeBillTransactions } from '@cf/deductions/beans/OffFeeBillTransactions';
export class OffenderTransactions {
    private _payeeNameText: string;
    private _offenderBookId: number;
    private _deductionType: string;
    private _cgnbtTxnEntryDate: string;
    private _modifyUserId: string;
    private _txnType: string;
    private _txnEntryAmount: number;
    private _txnEntrySeq: number;
    private _adjustTxnId: number;
    private _receiptPendingPrintFlag: string;
    private _sealFlag: string;
    private _txnPostingType: string;
    private _adjustOffenderId: number;
    private _modifyDate: Date;
    private _subAccountType: string;
    private _createUserId: string;
    private _preWithholdAmount: number;
    private _remitterName: string;
    private _grossAmount: number;
    private _closingChequeNumber: string;
    private _orgTxnType: string;
    private _modifyDateTime: number;
    private _caseloadId: string;
    private _adjustTxnEntryId: number;
    private _offenderId: number;
    private _applySpendingLimitAmount: number;
    private _txnId: number;
    private _txnEntryDesc: string;
    private _txnAdjustedFlag: string;
    private _holdClearFlag: string;
    private _deductionFlag: string;
    private _holdNumber: number;
    private _adjustAccountCode: number;
    private _infoNumber: string;
    private _payeeCode: string;
    private _receiptPrintedFlag: string;
    private _payeeCorporateId: number;
    private _serialVersionUID: number;
    private _inserted: number;
    private _transferCaseloadId: string;
    private _holdUntilDate: Date;
    private _grossNetFlag: string;
    private _slipPrintedFlag: string;
    private _receiptNumber: string;
    private _errorMessage: string;
    private _txnEntryDate: Date;
    private _createDateTime: Date;
    private _remitterId: number;
    private _txnReferenceNumber: string;
    private _nbtExistingHoldAmount: number;
    private _nbtTxnEntryAmount2: number;
    private _description: string;
    private _payeePersonId: number;
    private _payRollId: number;
    private _bookingNo: string;
    private _payeeId: number;
    private _payeeName: string;
    private _currentBalance: number;
    private _payeeCorporateName: string;
    private _holdBalance: number;
    private _totalPaid: number;
    private _totalOwed: number;
    private _txnUsage: String;
    private _nbtTxnType: string;
    private _chequePayeeType: string;
    private _chequeProductionFlag: string;
    private _receiptProductionFlag: string;
    private _totTxnFee: number;
    private _checkInd: string;
    private _currentCaseLoad: string;
    private _lastName: string;
    private _offenderIdDisplay: string;
    private _txnIdDisplay: string;
    private _fmSubAccountType: string;
    private _toSubAccountType: string;
    private _moduleName: string;
    private _caseloadType: string;
    private _txnHoldEntryAmount: number;
    private _button: string;
    private _butHoldClearFlag: string;
    private _fromCaseloadId: string;
    private _toCaseloadId: string;
    private _nbtModifyUserId: string;
    private _firstName: string;
    private _middleName: string;
    private _accountClosedFlag: string;
    private _txnEntryAmountOne: number;
    private _rootOffenderId: number;
    private _sessionId: number;
    private _nbtReceiptPrintFlag: string;
    private _nbtOverpaymentAmount: number;
    private _comment: string;
    private _feeCode: string;
    private _amount:number;
    private _flag : Boolean;
    private _eventUpdateList: OffFeeBillTransactions[] = [];
    private _offFeeBillList: OffFeeBillTransactions[] = [];
    private _crAccountCode: number;
    private _count: number;

    get count(): number {return this._count;}
    set count(value: number) {this._count = value;}
    
    get offFeeBillList(): OffFeeBillTransactions[] { return this._offFeeBillList; }
    set offFeeBillList(value: OffFeeBillTransactions[]) { this._offFeeBillList = value; }
    get crAccountCode(): number { return this._crAccountCode; }
    set crAccountCode(value: number) { this._crAccountCode = value; }

    get nbtReceiptPrintFlag(): string { return this._nbtReceiptPrintFlag; }
    
    set nbtReceiptPrintFlag(pnbtReceiptPrintFlag: string) { this._nbtReceiptPrintFlag = pnbtReceiptPrintFlag; }

    get rootOffenderId(): number { return this._rootOffenderId; }

    set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }

    get fromCaseloadId(): string { return this._fromCaseloadId; }

    set fromCaseloadId(pfromCaseloadId: string) { this._fromCaseloadId = pfromCaseloadId; }

    get cgnbtTxnEntryDate(): string { return this._cgnbtTxnEntryDate; }

    set cgnbtTxnEntryDate(pcgnbtTxnEntryDate: string) { this._cgnbtTxnEntryDate = pcgnbtTxnEntryDate; }

    get toCaseloadId(): string { return this._toCaseloadId; }

    set toCaseloadId(ptoCaseloadId: string) { this._toCaseloadId = ptoCaseloadId; }

    get butHoldClearFlag(): string { return this._butHoldClearFlag; }

    set butHoldClearFlag(pbutHoldClearFlag: string) { this._butHoldClearFlag = pbutHoldClearFlag; }

    get button(): string { return this._button; }

    set button(pbutton: string) { this._button = pbutton; }

    get txnHoldEntryAmount(): number { return this._txnHoldEntryAmount; }

    set txnHoldEntryAmount(ptxnHoldEntryAmount: number) { this._txnHoldEntryAmount = ptxnHoldEntryAmount; }

    get caseloadType(): string { return this._caseloadType; }

    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }

    get moduleName(): string { return this._moduleName; }

    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }
    get fmSubAccountType(): string { return this._fmSubAccountType; }

    set fmSubAccountType(pfmSubAccountType: string) { this._fmSubAccountType = pfmSubAccountType; }

    get toSubAccountType(): string { return this._toSubAccountType; }

    set toSubAccountType(ptoSubAccountType: string) { this._toSubAccountType = ptoSubAccountType; }
    get txnIdDisplay(): string { return this._txnIdDisplay; }

    set txnIdDisplay(ptxnIdDisplay: string) { this._txnIdDisplay = ptxnIdDisplay; }
    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }
    get lastName(): string { return this._lastName; }

    set lastName(plastName: string) { this._lastName = plastName; }
    get currentCaseLoad(): string { return this._currentCaseLoad; }

    set currentCaseLoad(pcurrentCaseLoad: string) { this._currentCaseLoad = pcurrentCaseLoad; }

    get totalPaid(): number { return this._totalPaid; }

    set totalPaid(ptotalPaid: number) { this._totalPaid = ptotalPaid; }

    get totalOwed(): number { return this._totalOwed; }

    set totalOwed(ptotalOwed: number) { this._totalOwed = ptotalOwed; }

    get holdBalance(): number { return this._holdBalance; }

    set holdBalance(pholdBalance: number) { this._holdBalance = pholdBalance; }

    get payeeCorporateName(): string { return this._payeeCorporateName; }

    set payeeCorporateName(ppayeeCorporateName: string) { this._payeeCorporateName = ppayeeCorporateName; }

    get currentBalance(): number { return this._currentBalance; }

    set currentBalance(pcurrentBalance: number) { this._currentBalance = pcurrentBalance; }

    get payeeName(): string { return this._payeeName; }

    set payeeName(ppayeeName: string) { this._payeeName = ppayeeName; }

    get payeeId(): number { return this._payeeId; }

    set payeeId(ppayeeId: number) { this._payeeId = ppayeeId; }

    get bookingNo(): string { return this._bookingNo; }

    set bookingNo(pbookingNo: string) { this._bookingNo = pbookingNo; }

    get payRollId(): number { return this._payRollId; }

    set payRollId(ppayRollId: number) { this._payRollId = ppayRollId; }

    get payeePersonId(): number { return this._payeePersonId; }

    set payeePersonId( ppayeePersonId: number ) { this._payeePersonId = ppayeePersonId ; }

    get description(): string { return this._description; }

    set description( pdescription: string ) { this._description = pdescription; }

    get payeeNameText(): string { return this._payeeNameText; }

    set payeeNameText( ppayeeNameText: string ) { this._payeeNameText = ppayeeNameText; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }

    get deductionType(): string { return this._deductionType; }

    set deductionType( pdeductionType: string ) { this._deductionType = pdeductionType; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get txnType(): string { return this._txnType; }

    set txnType( ptxnType: string ) { this._txnType = ptxnType; }

    get txnEntryAmount(): number { return this._txnEntryAmount; }

    set txnEntryAmount( ptxnEntryAmount: number ) { this._txnEntryAmount = ptxnEntryAmount; }

    get txnEntrySeq(): number { return this._txnEntrySeq; }

    set txnEntrySeq( ptxnEntrySeq: number ) { this._txnEntrySeq = ptxnEntrySeq; }

    get adjustTxnId(): number { return this._adjustTxnId ; }

    set adjustTxnId( padjustTxnId: number ) { this._adjustTxnId = padjustTxnId ; }

    get receiptPendingPrintFlag(): string { return this._receiptPendingPrintFlag;  }

    set receiptPendingPrintFlag( preceiptPendingPrintFlag: string ) { this._receiptPendingPrintFlag = preceiptPendingPrintFlag; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get txnPostingType(): string { return this._txnPostingType; }

    set txnPostingType( ptxnPostingType: string ) { this._txnPostingType = ptxnPostingType; }

    get adjustOffenderId(): number { return this._adjustOffenderId; }

    set adjustOffenderId( padjustOffenderId: number ) { this._adjustOffenderId = padjustOffenderId; }

    get modifyDate(): Date { return this._modifyDate; }

    set modifyDate( pmodifyDate: Date ) { this._modifyDate = pmodifyDate; }

    get subAccountType(): string { return this._subAccountType; }

    set subAccountType( psubAccountType: string ) { this._subAccountType = psubAccountType; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId ; }

    get preWithholdAmount(): number { return this._preWithholdAmount; }

    set preWithholdAmount( ppreWithholdAmount: number ) { this._preWithholdAmount = ppreWithholdAmount; }

    get remitterName(): string { return this._remitterName; }

    set remitterName( premitterName: string ) { this._remitterName = premitterName ; }

    get grossAmount(): number { return this._grossAmount; }

    set grossAmount( pgrossAmount: number ) { this._grossAmount = pgrossAmount; }

    get closingChequeNumber(): string { return this._closingChequeNumber; }

    set closingChequeNumber( pclosingChequeNumber: string ) { this._closingChequeNumber = pclosingChequeNumber; }

    get orgTxnType(): string { return this._orgTxnType; }

    set orgTxnType( porgTxnType: string ) { this._orgTxnType = porgTxnType; }

    get modifyDateTime(): number { return this._modifyDateTime; }

    set modifyDateTime( pmodifyDateTime: number ) { this._modifyDateTime = pmodifyDateTime; }

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId( pcaseloadId: string ) { this._caseloadId = pcaseloadId; }

    get adjustTxnEntryId(): number { return this._adjustTxnEntryId ; }

    set adjustTxnEntryId( padjustTxnEntryId: number ) { this._adjustTxnEntryId = padjustTxnEntryId ; }

    get offenderId(): number { return this._offenderId ; }

    set offenderId( poffenderId: number ) { this._offenderId = poffenderId; }

    get applySpendingLimitAmount(): number { return this._applySpendingLimitAmount; }

    set applySpendingLimitAmount( papplySpendingLimitAmount: number ) { this._applySpendingLimitAmount = papplySpendingLimitAmount ; }

    get txnId(): number { return this._txnId; }

    set txnId( ptxnId: number ) { this._txnId = ptxnId ; }

    get txnEntryDesc(): string { return this._txnEntryDesc ; }

    set txnEntryDesc( ptxnEntryDesc: string ) { this._txnEntryDesc = ptxnEntryDesc ; }

    get txnAdjustedFlag(): string { return this._txnAdjustedFlag ; }

    set txnAdjustedFlag( ptxnAdjustedFlag: string ) { this._txnAdjustedFlag = ptxnAdjustedFlag ; }

    get holdClearFlag(): string { return this._holdClearFlag  ; }

    set holdClearFlag( pholdClearFlag: string ) { this._holdClearFlag = pholdClearFlag  ; }

    get deductionFlag(): string { return this._deductionFlag; }

    set deductionFlag( pdeductionFlag: string ) { this._deductionFlag = pdeductionFlag ; }

    get holdNumber(): number { return this._holdNumber; }

    set holdNumber( pholdNumber: number ) { this._holdNumber = pholdNumber; }

    get adjustAccountCode(): number { return this._adjustAccountCode; }

    set adjustAccountCode( padjustAccountCode: number ) { this._adjustAccountCode = padjustAccountCode; }

    get infoNumber(): string { return this._infoNumber; }

    set infoNumber( pinfoNumber: string ) { this._infoNumber = pinfoNumber; }

    get payeeCode(): string { return this._payeeCode; }

    set payeeCode( ppayeeCode: string ) { this._payeeCode = ppayeeCode; }

    get receiptPrintedFlag(): string { return this._receiptPrintedFlag; }

    set receiptPrintedFlag( preceiptPrintedFlag: string ) { this._receiptPrintedFlag = preceiptPrintedFlag; }

    get payeeCorporateId(): number { return this._payeeCorporateId; }

    set payeeCorporateId( ppayeeCorporateId: number ) { this._payeeCorporateId = ppayeeCorporateId; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID( pserialVersionUID: number ) { this._serialVersionUID = pserialVersionUID; }

    get inserted(): number { return this._inserted; }

    set inserted( pinserted: number ) { this._inserted = pinserted; }

    get transferCaseloadId(): string { return this._transferCaseloadId ; }

    set transferCaseloadId( ptransferCaseloadId: string ) { this._transferCaseloadId = ptransferCaseloadId; }

    get holdUntilDate(): Date { return this._holdUntilDate; }

    set holdUntilDate( pholdUntilDate: Date ) { this._holdUntilDate = pholdUntilDate; }

    get grossNetFlag(): string { return this._grossNetFlag; }

    set grossNetFlag( pgrossNetFlag: string ) { this._grossNetFlag = pgrossNetFlag ; }

    get slipPrintedFlag(): string { return this._slipPrintedFlag;  }

    set slipPrintedFlag( pslipPrintedFlag: string ) { this._slipPrintedFlag = pslipPrintedFlag; }

    get receiptNumber(): string { return this._receiptNumber; }

    set receiptNumber( preceiptNumber: string ) { this._receiptNumber = preceiptNumber; }

    get errorMessage(): string { return this._errorMessage; }

    set errorMessage( perrorMessage: string ) { this._errorMessage = perrorMessage; }

    get txnEntryDate(): Date { return this._txnEntryDate; }

    set txnEntryDate( ptxnEntryDate: Date ) { this._txnEntryDate = ptxnEntryDate; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime( pcreateDateTime: Date ) { this._createDateTime = pcreateDateTime; }

    get remitterId(): number { return this._remitterId; }

    set remitterId( premitterId: number ) { this._remitterId = premitterId; }

    get txnReferenceNumber(): string { return this._txnReferenceNumber; }

    set txnReferenceNumber( ptxnReferenceNumber: string ) { this._txnReferenceNumber = ptxnReferenceNumber; }

    get nbtExistingHoldAmount(): number { return this._nbtExistingHoldAmount; }

    set nbtExistingHoldAmount( pnbtExistingHoldAmount: number ) { this._nbtExistingHoldAmount = pnbtExistingHoldAmount; }

    get nbtTxnEntryAmount2(): number { return this._nbtTxnEntryAmount2; }

    set nbtTxnEntryAmount2( pnbtTxnEntryAmount2: number ) { this._nbtTxnEntryAmount2 = pnbtTxnEntryAmount2; }

    get nbtModifyUserId(): string { return this._nbtModifyUserId; }

    set nbtModifyUserId( pnbtModifyUserId: string ) { this._nbtModifyUserId = pnbtModifyUserId; }

    get firstName(): string { return this._firstName; }

    set firstName(pfirstName: string) { this._firstName = pfirstName; }

    get middleName(): string { return this._middleName; }

    set middleName(pmiddleName: string) { this._middleName = pmiddleName; }

    get txnUsage(): string {
        return this._txnType;
    }

    set txnUsage(ptxnUsage: string) {
        this._txnUsage = ptxnUsage;
    }

    get nbtTxnType(): string {
        return this._nbtTxnType;
    }

    set nbtTxnType(pnbtTxnType: string) {
        this._nbtTxnType = pnbtTxnType;
    }

    get chequePayeeType(): string {
        return this._chequePayeeType;
    }

    set chequePayeeType(pchequePayeeType: string) {
        this._chequePayeeType = pchequePayeeType;
    }

    get chequeProductionFlag(): string {
        return this._chequeProductionFlag;
    }

    set chequeProductionFlag(pchequeProductionFlag: string) {
        this._chequeProductionFlag = pchequeProductionFlag;
    }

    get receiptProductionFlag(): string {
        return this.receiptProductionFlag;
    }

    set receiptProductionFlag(receiptProductionFlag: string) {
        this._receiptProductionFlag = receiptProductionFlag;
    }

    get totTxnFee(): number {
        return this._totTxnFee;
    }

    set totTxnFee(ptotTxnFee: number) {
        this._totTxnFee = ptotTxnFee;
    }

    get checkInd(): string {
        return this.receiptProductionFlag;
    }

    set checkInd(pcheckInd: string) {
        this._checkInd = pcheckInd;
    }
    get accountClosedFlag(): string {
        return this._accountClosedFlag;
    }

    set accountClosedFlag(paccountClosedFlag: string) {
        this._accountClosedFlag = paccountClosedFlag;
    }

    get txnEntryAmountOne(): number { return this._txnEntryAmountOne; }

    set txnEntryAmountOne( ptxnEntryAmountOne: number ) { this._txnEntryAmountOne = ptxnEntryAmountOne; }
	
	get sessionId(): number { return this._sessionId; }

    set sessionId(psessionId: number) { this._sessionId = psessionId; }

    get nbtOverpaymentAmount(): number { return this._nbtOverpaymentAmount; }

    set nbtOverpaymentAmount(pnbtOverpaymentAmount: number) { this._nbtOverpaymentAmount = pnbtOverpaymentAmount; }

    get comment(): string {
        return this._comment;
    }

    set comment(comment: string) {
        this._comment = comment;
    }
    get feeCode(): string { return this._feeCode; }

    set feeCode(pfeeCode: string) { this._feeCode = pfeeCode; }

    set amount(pamount: number) { this._amount = pamount; }

    get amount(): number { return this._amount; }

    get flag(): Boolean { return this._flag; }

    set flag(pflag: Boolean) { this._flag = pflag; }

    get eventUpdateList(): OffFeeBillTransactions[] {
        return this._eventUpdateList;
    }
    set eventUpdateList(value: OffFeeBillTransactions[]) {
        this._eventUpdateList = value;
    }

    toJSON(): any {
        return {
            'payeeNameText': this._payeeNameText,
            'cgnbtTxnEntryDate': this._cgnbtTxnEntryDate,
            'offenderBookId': this._offenderBookId,
            'deductionType': this._deductionType,
            'modifyUserId': this._modifyUserId,
            'txnType': this._txnType,
            'txnEntryAmount': this._txnEntryAmount,
            'txnEntrySeq': this._txnEntrySeq,
            'adjustTxnId': this._adjustTxnId,
            'receiptPendingPrintFlag': this._receiptPendingPrintFlag,
            'sealFlag': this._sealFlag,
            'txnPostingType': this._txnPostingType,
            'adjustOffenderId': this._adjustOffenderId,
            'modifyDate': this._modifyDate,
            'subAccountType': this._subAccountType,
            'createUserId': this._createUserId,
            'preWithholdAmount': this._preWithholdAmount,
            'remitterName': this._remitterName,
            'grossAmount': this._grossAmount,
            'closingChequeNumber': this._closingChequeNumber,
            'orgTxnType': this._orgTxnType,
            'modifyDateTime': this._modifyDateTime,
            'caseloadId': this._caseloadId,
            'adjustTxnEntryId': this._adjustTxnEntryId,
            'offenderId': this._offenderId,
            'applySpendingLimitAmount': this._applySpendingLimitAmount,
            'txnId': this._txnId,
            'txnEntryDesc': this._txnEntryDesc,
            'txnAdjustedFlag': this._txnAdjustedFlag,
            'holdClearFlag': this._holdClearFlag,
            'deductionFlag': this._deductionFlag,
            'holdNumber': this._holdNumber,
            'adjustAccountCode': this._adjustAccountCode,
            'infoNumber': this._infoNumber,
            'payeeCode': this._payeeCode,
            'receiptPrintedFlag': this._receiptPrintedFlag,
            'payeeCorporateId': this._payeeCorporateId,
            'serialVersionUID': this._serialVersionUID,
            'inserted': this._inserted,
            'transferCaseloadId': this._transferCaseloadId,
            'holdUntilDate': this._holdUntilDate,
            'grossNetFlag': this._grossNetFlag,
            'slipPrintedFlag': this._slipPrintedFlag,
            'receiptNumber': this._receiptNumber,
            'errorMessage': this._errorMessage,
            'txnEntryDate': this._txnEntryDate,
            'createDateTime': this._createDateTime,
            'remitterId': this._remitterId,
            'txnReferenceNumber': this._txnReferenceNumber,
            'nbtExistingHoldAmount': this._nbtExistingHoldAmount,
            'nbtTxnEntryAmount2': this._nbtTxnEntryAmount2,
            'description': this._description,
            'payeePersonId': this._payeePersonId,
            'payRollId': this._payRollId,
            'bookingNo': this._bookingNo,
            'payeeId': this.payeeId,
            'currentBalance': this.currentBalance,
            'payeeCorporateName': this._payeeCorporateName,
            'payeeName': this._payeeName,
            'holdBalance': this._holdBalance,
            'txnUsage': this._txnUsage,
            'nbtTxnType': this._nbtTxnType,
            'currentCaseLoad': this._currentCaseLoad,
            'chequeProductionFlag': this._chequeProductionFlag,
            'lastName': this._lastName,
            'offenderIdDisplay': this._offenderIdDisplay,
            'txnIdDisplay': this._txnIdDisplay,
            'fmSubAccountType': this.fmSubAccountType,
            'toSubAccountType': this._toSubAccountType,
            'moduleName': this._moduleName,
            'caseloadType': this._caseloadType,
            'txnHoldEntryAmount': this._txnHoldEntryAmount,
            'button': this._button,
            'butHoldClearFlag': this._butHoldClearFlag,
            'fromCaseloadId': this._fromCaseloadId,
            'toCaseloadId': this._toCaseloadId,
            'nbtModifyUserId': this._nbtModifyUserId,
            'firstName': this._firstName,
            'middleName': this._middleName,
            'accountClosedFlag': this._accountClosedFlag,
            'txnEntryAmountOne': this._txnEntryAmountOne,
            'rootOffenderId': this.rootOffenderId,
            'sessionId': this._sessionId,
            'nbtReceiptPrintFlag': this._nbtReceiptPrintFlag,
            'nbtOverpaymentAmount': this._nbtOverpaymentAmount,
            'comment':this._comment,
            'feeCode':this._feeCode,
            'amount':this._amount,
            'flag':this._flag,
            'eventUpdateList': this._eventUpdateList,
            'crAccountCode': this._crAccountCode,
            'count': this._count,
            
        };
    }
 }
