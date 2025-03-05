    export class BeneficiaryTransactions {
         private _txnEntryDesc: string;
         private _createUserId: string;
         private _benEntrySeq: number;
         private _modifyUserId: string;
         private _txnType: string;
         private _txnEntryAmount: number;
         private _revTxnId: number;
         private _corporateId: number;
         private _serialVersionUID: number;
         private _txnEntrySeq: number;
         private _beneficiaryClearedFlag: string;
         private _sealFlag: string;
         private _txnPostUsage: string;
         private _offenderDeductionId: number;
         private _accountCode: number;
         private _unknownBenId: number;
         private _modifyDate: Date;
         private _glEntrySeq: number;
         private _revBenEntrySeq: number;
         private _revTxnFlag: string;
         private _receiptTxnType: string;
         private _createDateTime: Date;
         private _txnEntryDate: Date;
         private _revTxnEntrySeq: number;
         private _checkClearedDate: Date;
         private _revGlEntrySeq: number;
         private _modifyDateTime: Date;
         private _txnEntryTime: Date;
         private _caseloadId: string;
         private _personId: number;
         private _beneficiaryId: number;
         private _txnId: number;
         private _offenderIdDisplay: string;
         private _rootOffenderId: number;
         private _lastFirstName: string;
         private _offTxnId: string;

        get lastFirstName(): string { return this._lastFirstName; }

        set lastFirstName(plastFirstName: string) { this._lastFirstName = plastFirstName; }

        get rootOffenderId(): number { return this._rootOffenderId; }

        set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }

        get offenderIdDisplay(): string { return this._offenderIdDisplay; }

        set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

         get txnEntryDesc(): string { return  this._txnEntryDesc; }

         set txnEntryDesc(ptxnEntryDesc: string) { this._txnEntryDesc = ptxnEntryDesc; }

         get createUserId(): string { return  this._createUserId; }

         set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

         get benEntrySeq(): number { return  this._benEntrySeq; }

         set benEntrySeq(pbenEntrySeq: number) { this._benEntrySeq = pbenEntrySeq; }

         get modifyUserId(): string { return  this._modifyUserId; }

         set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

         get txnType(): string { return  this._txnType; }

         set txnType(ptxnType: string) { this._txnType = ptxnType; }

         get txnEntryAmount(): number { return  this._txnEntryAmount; }

         set txnEntryAmount(ptxnEntryAmount: number) { this._txnEntryAmount = ptxnEntryAmount; }

         get revTxnId(): number { return  this._revTxnId; }

         set revTxnId(prevTxnId: number) { this._revTxnId = prevTxnId; }

         get corporateId(): number { return  this._corporateId; }

         set corporateId(pcorporateId: number) { this._corporateId = pcorporateId; }

         get serialVersionUID(): number { return  this._serialVersionUID; }

         set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

         get txnEntrySeq(): number { return  this._txnEntrySeq; }

         set txnEntrySeq(ptxnEntrySeq: number) { this._txnEntrySeq = ptxnEntrySeq; }

         get beneficiaryClearedFlag(): string { return  this._beneficiaryClearedFlag; }

         set beneficiaryClearedFlag(pbeneficiaryClearedFlag: string) { this._beneficiaryClearedFlag = pbeneficiaryClearedFlag; }

         get sealFlag(): string { return  this._sealFlag; }

         set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

         get txnPostUsage(): string { return  this._txnPostUsage; }

         set txnPostUsage(ptxnPostUsage: string) { this._txnPostUsage = ptxnPostUsage; }

         get offenderDeductionId(): number { return  this._offenderDeductionId; }

         set offenderDeductionId(poffenderDeductionId: number) { this._offenderDeductionId = poffenderDeductionId; }

         get accountCode(): number { return  this._accountCode; }

         set accountCode(paccountCode: number) { this._accountCode = paccountCode; }

         get unknownBenId(): number { return  this._unknownBenId; }

         set unknownBenId(punknownBenId: number) { this._unknownBenId = punknownBenId; }

         get modifyDate(): Date { return  this._modifyDate; }

         set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }

         get glEntrySeq(): number { return  this._glEntrySeq; }

         set glEntrySeq(pglEntrySeq: number) { this._glEntrySeq = pglEntrySeq; }

         get revBenEntrySeq(): number { return  this._revBenEntrySeq; }

         set revBenEntrySeq(prevBenEntrySeq: number) { this._revBenEntrySeq = prevBenEntrySeq; }

         get revTxnFlag(): string { return  this._revTxnFlag; }

         set revTxnFlag(prevTxnFlag: string) { this._revTxnFlag = prevTxnFlag; }

         get receiptTxnType(): string { return  this._receiptTxnType; }

         set receiptTxnType(preceiptTxnType: string) { this._receiptTxnType = preceiptTxnType; }

         get createDateTime(): Date { return  this._createDateTime; }

         set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }

         get txnEntryDate(): Date { return  this._txnEntryDate; }

         set txnEntryDate(ptxnEntryDate: Date) { this._txnEntryDate = ptxnEntryDate; }

         get revTxnEntrySeq(): number { return  this._revTxnEntrySeq; }

         set revTxnEntrySeq(prevTxnEntrySeq: number) { this._revTxnEntrySeq = prevTxnEntrySeq; }

         get checkClearedDate(): Date { return  this._checkClearedDate; }

         set checkClearedDate(pcheckClearedDate: Date) { this._checkClearedDate = pcheckClearedDate; }

         get revGlEntrySeq(): number { return  this._revGlEntrySeq; }

         set revGlEntrySeq(prevGlEntrySeq: number) { this._revGlEntrySeq = prevGlEntrySeq; }

         get modifyDateTime(): Date { return  this._modifyDateTime; }

         set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

         get txnEntryTime(): Date { return  this._txnEntryTime; }

         set txnEntryTime(ptxnEntryTime: Date) { this._txnEntryTime = ptxnEntryTime; }

         get caseloadId(): string { return  this._caseloadId; }

         set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

         get personId(): number { return  this._personId; }

         set personId(ppersonId: number) { this._personId = ppersonId; }

         get beneficiaryId(): number { return  this._beneficiaryId; }

         set beneficiaryId(pbeneficiaryId: number) { this._beneficiaryId = pbeneficiaryId; }

         get txnId(): number { return  this._txnId; }

         set txnId(ptxnId: number) { this._txnId = ptxnId; }

         get offTxnId(): string { return  this._offTxnId; }

         set offTxnId(poffTxnId: string) { this._offTxnId = poffTxnId; }

     toJSON(): any {
         return {
            'txnEntryDesc': this._txnEntryDesc,
            'createUserId': this._createUserId,
            'benEntrySeq': this._benEntrySeq,
            'modifyUserId': this._modifyUserId,
            'txnType': this._txnType,
            'txnEntryAmount': this._txnEntryAmount,
            'revTxnId': this._revTxnId,
            'corporateId': this._corporateId,
            'serialVersionUID': this._serialVersionUID,
            'txnEntrySeq': this._txnEntrySeq,
            'beneficiaryClearedFlag': this._beneficiaryClearedFlag,
            'sealFlag': this._sealFlag,
            'txnPostUsage': this._txnPostUsage,
            'offenderDeductionId': this._offenderDeductionId,
            'accountCode': this._accountCode,
            'unknownBenId': this._unknownBenId,
            'modifyDate': this._modifyDate,
            'glEntrySeq': this._glEntrySeq,
            'revBenEntrySeq': this._revBenEntrySeq,
            'revTxnFlag': this._revTxnFlag,
            'receiptTxnType': this._receiptTxnType,
            'createDateTime': this._createDateTime,
            'txnEntryDate': this._txnEntryDate,
            'revTxnEntrySeq': this._revTxnEntrySeq,
            'checkClearedDate': this._checkClearedDate,
            'revGlEntrySeq': this._revGlEntrySeq,
            'modifyDateTime': this._modifyDateTime,
            'txnEntryTime': this._txnEntryTime,
            'caseloadId': this._caseloadId,
            'personId': this._personId,
            'beneficiaryId': this._beneficiaryId,
            'txnId': this._txnId,
            'offenderIdDisplay': this._offenderIdDisplay,
            'rootOffenderId': this._rootOffenderId,
            'lastFirstName': this._lastFirstName,
            'offTxnId': this._offTxnId
             };
         }
 }
