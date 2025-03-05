export class OmsRequests {
    private _createUserId: string  ;
    private _modifyDatetime: Date;
    private _displayFlag: string  ;
    private _moduleName: string  ;
    private _modifyUserId: string  ;
    private _requestUserId: string  ;
    private _numberOfCopy: number;
    private _createDatetime: Date;
    private _requestId: number;
    private _requestDate: Date;
    private _prnumbererId: string  ;
    private _sealFlag: string  ;
    private _requestStatus: string  ;
    otrindis: string;
   private _nbtUserId: string;
    private _nbtDateFrom: Date;
    private _nbtDateTo: Date;
    private _caseLoadId: string;
   private _printAllFlag: boolean;
   private _sessionId: number;
   private _receiptNumber: string;
    private _txnId: number;
    private _offenderId: number;

   get sessionId(): number { return this._sessionId; }
   set sessionId(psessionId: number) { this._sessionId = psessionId; }
   get printAllFlag(): boolean   { return this._printAllFlag; }
   set printAllFlag(pprintAllFlag: boolean  ) { this._printAllFlag = pprintAllFlag; }
    get createUserId(): string   { return this._createUserId; }
    set createUserId(pcreateUserId: string  ) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get displayFlag(): string   { return this._displayFlag; }
    set displayFlag(pdisplayFlag: string  ) { this._displayFlag = pdisplayFlag; }
    get moduleName(): string   { return this._moduleName; }
    set moduleName(pmoduleName: string  ) { this._moduleName = pmoduleName; }
    get modifyUserId(): string     { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string  ) { this._modifyUserId = pmodifyUserId; }
    get requestUserId(): string   { return this._requestUserId; }
    set requestUserId(prequestUserId: string  ) { this._requestUserId = prequestUserId; }
    get numberOfCopy(): number { return this._numberOfCopy; }
    set numberOfCopy(pnumberOfCopy: number) { this._numberOfCopy = pnumberOfCopy; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get requestId(): number { return this._requestId; }
    set requestId(prequestId: number) { this._requestId = prequestId; }
    get requestDate(): Date { return this._requestDate; }
    set requestDate(prequestDate: Date) { this._requestDate = prequestDate; }
    get prnumbererId(): string   { return this._prnumbererId; }
    set prnumbererId(pprnumbererId: string  ) { this._prnumbererId = pprnumbererId; }
    get sealFlag(): string   { return this._sealFlag; }
    set sealFlag(psealFlag: string  ) { this._sealFlag = psealFlag; }
    get requestStatus(): string   { return this._requestStatus; }
    set requestStatus(prequestStatus: string  ) { this._requestStatus = prequestStatus; }

    get nbtUserId(): string   { return this._nbtUserId; }
    set nbtUserId(pnbtUserId: string  ) { this._nbtUserId = pnbtUserId; }

    get nbtDateFrom(): Date   { return this._nbtDateFrom; }
    set nbtDateFrom(pnbtDateFrom: Date  ) { this._nbtDateFrom = pnbtDateFrom; }

    get nbtDateTo(): Date   { return this._nbtDateTo; }
    set nbtDateTo(nbtDateTo: Date  ) { this._nbtDateTo = nbtDateTo; }

    get caseLoadId(): string { return this._caseLoadId; }
    set caseLoadId(caseLoadId: string  ) { this._caseLoadId = caseLoadId; }
	
	get receiptNumber(): string { return this._receiptNumber; }

    set receiptNumber(preceiptNumber: string) { this._receiptNumber = preceiptNumber; }

    get txnId(): number { return this._txnId; }

    set txnId(ptxnId: number) { this._txnId = ptxnId; }

    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }


    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'displayFlag': this._displayFlag,
            'moduleName': this._moduleName,
            'modifyUserId': this._modifyUserId,
            'requestUserId': this._requestUserId,
            'numberOfCopy': this._numberOfCopy,
            'createDatetime': this._createDatetime,
            'requestId': this._requestId,
            'requestDate': this._requestDate,
            'prnumbererId': this._prnumbererId,
            'sealFlag': this._sealFlag,
            'requestStatus': this._requestStatus,
            'nbtUserId': this._nbtUserId,
            'nbtDateFrom': this._nbtDateFrom,
            'nbtDateTo': this._nbtDateTo,
            'caseLoadId': this._caseLoadId,
            'printAllFlag': this._printAllFlag,
            'sessionId': this._sessionId,
			'receiptNumber': this._receiptNumber,
            'txnId': this._txnId,
            'offenderId': this._offenderId
        };
    }
}