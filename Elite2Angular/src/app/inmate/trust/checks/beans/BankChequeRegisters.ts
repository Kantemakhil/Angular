    export class BankChequeRegisters {
         private _startTxnId: number;
         private _createUserId: string;
         private _reasonText: string;
         private _modifyDatetime: number;
         private _chequeStatus: string;
         private _modifyUserId: string;
         private _endTxnId: number;
         private _rcnlClr: string;
         private _transactionDate: Date;
         private _createDatetime: Date;
         private _originType: string;
         private _serialVersionUID: number;
         private _chequePaidDate: Date;
         private _listSeq: number;
         private _sealFlag: string;
         private _createDate: Date;
         private _txnId: number;
         private _caseLoadId: string;
         private _accountCode: number;
         private _chequeNumber: number;
         private _firstCheckNumber: number;
         private _lastCheckNumber: number;
         private _nextCheckNumber: number;
         private _rowId: string;
         private _offenderId: number;


         get rowId(): string { return this._rowId; }
         set rowId(prowId: string) { this._rowId = prowId; }

         get nextCheckNumber(): number  {     return this._nextCheckNumber; }
         set nextCheckNumber(pnextCheckNumber: number)  {     this._nextCheckNumber = pnextCheckNumber; }

         get firstCheckNumber(): number  {     return this._firstCheckNumber; }
         set firstCheckNumber(pfirstCheckNumber: number)  {     this._firstCheckNumber = pfirstCheckNumber; }

         get lastCheckNumber(): number  {     return this._lastCheckNumber; }
         set lastCheckNumber(plastCheckNumber: number)  {     this._lastCheckNumber = plastCheckNumber; }

         get accountCode(): number  {     return this._accountCode; }
         set accountCode(paccountCode: number)  {     this._accountCode = paccountCode; }

         get chequeNumber(): number  {     return this._chequeNumber; }
         set chequeNumber(pchequeNumber: number)  {     this._chequeNumber = pchequeNumber; }

         get caseLoadId(): string { return this._caseLoadId; }
         set caseLoadId(pcaseLoadId: string) { this._caseLoadId = pcaseLoadId; }

         get startTxnId(): number  {     return this._startTxnId; }
         set startTxnId(pstartTxnId: number)  {     this._startTxnId = pstartTxnId; }
         get createUserId(): string  {     return this._createUserId; }
         set createUserId(pcreateUserId: string)  {     this._createUserId = pcreateUserId; }
         get reasonText(): string {   return this._reasonText; }
         set reasonText(preasonText: string) {   this._reasonText = preasonText; }
         get modifyDatetime(): number {   return this._modifyDatetime; }
         set modifyDatetime(pmodifyDatetime: number) {   this._modifyDatetime = pmodifyDatetime; }
         get chequeStatus(): string {   return this._chequeStatus; }
         set chequeStatus(pchequeStatus: string) {   this._chequeStatus = pchequeStatus; }
         get modifyUserId(): string {   return this._modifyUserId; }
         set modifyUserId(pmodifyUserId: string) {   this._modifyUserId = pmodifyUserId; }
         get endTxnId(): number {   return this._endTxnId; }
         set endTxnId(pendTxnId: number) {   this._endTxnId = pendTxnId; }
         get rcnlClr(): string {   return this._rcnlClr; }
         set rcnlClr(prcnlClr: string) {   this._rcnlClr = prcnlClr; }
         get transactionDate(): Date {   return this._transactionDate; }
         set transactionDate(ptransactionDate: Date) {   this._transactionDate = ptransactionDate; }
         get createDatetime(): Date {   return this._createDatetime; }
         set createDatetime(pcreateDatetime: Date) {   this._createDatetime = pcreateDatetime; }
         get originType(): string {   return this._originType; }
         set originType(poriginType: string) {   this._originType = poriginType; }
         get serialVersionUID(): number {   return this._serialVersionUID; }
         set serialVersionUID(pserialVersionUID: number) {   this._serialVersionUID = pserialVersionUID; }
         get chequePaidDate(): Date {   return this._chequePaidDate; }
         set chequePaidDate(pchequePaidDate: Date) {   this._chequePaidDate = pchequePaidDate; }
         get listSeq(): number {   return this._listSeq; }
         set listSeq(plistSeq: number) {   this._listSeq = plistSeq; }
         get sealFlag(): string {   return this._sealFlag; }
         set sealFlag(psealFlag: string) {   this._sealFlag = psealFlag; }
         get createDate(): Date {   return this._createDate; }
         set createDate(pcreateDate: Date) {   this._createDate = pcreateDate; }
         get txnId(): number {   return this._txnId; }
         set txnId(ptxnId: number) {   this._txnId = ptxnId; }
        get offenderId(): number {
            return this._offenderId;
        }

        set offenderId(poffenderId: number) {
            this._offenderId = poffenderId;
        }

     toJSON(): any {
         return {
            'startTxnId': this._startTxnId,
            'createUserId': this._createUserId,
            'reasonText': this._reasonText,
            'modifyDatetime': this._modifyDatetime,
            'chequeStatus': this._chequeStatus,
            'modifyUserId': this._modifyUserId,
            'endTxnId': this._endTxnId,
            'rcnlClr': this._rcnlClr,
            'transactionDate': this._transactionDate,
            'createDatetime': this._createDatetime,
            'originType': this._originType,
            'serialVersionUID': this._serialVersionUID,
            'chequePaidDate': this._chequePaidDate,
            'listSeq': this._listSeq,
            'sealFlag': this._sealFlag,
            'createDate': this._createDate,
            'txnId': this._txnId,
            'caseLoadId': this._caseLoadId,
            'accountCode': this._accountCode,
            'chequeNumber': this._chequeNumber,
            'firstCheckNumber': this._firstCheckNumber,
            'lastCheckNumber': this._lastCheckNumber,
            'nextCheckNumber': this._nextCheckNumber,
            'rowId': this._rowId,
            'offenderId': this._offenderId,
             };
         }
 }
