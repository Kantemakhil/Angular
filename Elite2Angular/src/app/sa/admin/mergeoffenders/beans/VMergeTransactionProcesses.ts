export class VMergeTransactionProcesses {
    private _timeframeFlag: string;
    private _transferFlag: string;
    private _defaultOnFlag: string;
    private _endDate: Date;
    private _transactionType: string;
    private _beginDate: Date;
    private _serialVersionUID: number;
    private _mergeTransactionId: number;
    private _processId: number;
    private _processName: string;
    private _processDescription: string;
    private _beginTime: Date;
    private _endTime: Date;
    private _mandatoryOnFlag: string;
    private _bookingStartdate: Date;
    private _bookingEndDate: Date;
    private _isProcessTimeRequired: string;
    private _prevBkgEndDate: Date;
    private _nextBkgStartDate: Date;
    private _checkFlag: Boolean;


    get checkFlag(): Boolean { return this._checkFlag; }
    set checkFlag(pcheckFlag: Boolean) { this._checkFlag = pcheckFlag ; }

    get prevBkgEndDate(): Date { return this._prevBkgEndDate; }
    set prevBkgEndDate(pprevBkgEndDate: Date) { this._prevBkgEndDate = pprevBkgEndDate ; }

    get nextBkgStartDate(): Date { return this._nextBkgStartDate; }
    set nextBkgStartDate(pnextBkgStartDate: Date) { this._nextBkgStartDate = pnextBkgStartDate; }

    get bookingStartdate(): Date { return this._bookingStartdate; }
    set bookingStartdate(pbookingStartdate: Date) { this._bookingStartdate = pbookingStartdate ; }

    get bookingEndDate(): Date { return this._bookingEndDate; }
    set bookingEndDate(pbookingEndDate: Date) { this._bookingEndDate = pbookingEndDate ;}

    get isProcessTimeRequired(): string { return this._isProcessTimeRequired; }
    set isProcessTimeRequired(pisProcessTimeRequired: string) { this._isProcessTimeRequired = pisProcessTimeRequired ;}

    get timeframeFlag(): string { return this._timeframeFlag; }
    set timeframeFlag(ptimeframeFlag: string) { this._timeframeFlag = ptimeframeFlag ;}
    get transferFlag(): string { return this._transferFlag; }
    set transferFlag(ptransferFlag: string) { this._transferFlag = ptransferFlag ;}
    get defaultOnFlag(): string { return this._defaultOnFlag; }
    set defaultOnFlag(pdefaultOnFlag: string) { this._defaultOnFlag = pdefaultOnFlag ; }
    get endDate(): Date { return this._endDate; }
    set endDate(pendDate: Date) { this._endDate = pendDate ; }
    get transactionType(): string { return this._transactionType; }
    set transactionType(ptransactionType: string) { this._transactionType = ptransactionType ; }
    get beginDate(): Date { return this._beginDate; }
    set beginDate(pbeginDate: Date) { this._beginDate = pbeginDate ; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID ; }
    get mergeTransactionId(): number { return this._mergeTransactionId; }
    set mergeTransactionId(pmergeTransactionId: number) { this._mergeTransactionId = pmergeTransactionId ; }
    get processId(): number { return this._processId; }
    set processId(pprocessId: number) { this._processId = pprocessId ; }
    get processName(): string { return this._processName; }
    set processName(pprocessName: string) { this._processName = pprocessName ; }
    get processDescription(): string { return this._processDescription; }
    set processDescription(pprocessDescription: string) { this._processDescription = pprocessDescription ; }
    get beginTime(): Date { return this._beginTime; }
    set beginTime(pbeginTime: Date) { this._beginTime = pbeginTime ; }
    get endTime(): Date { return this._endTime; }
    set endTime(pendTime: Date) { this._endTime = pendTime ; }
    get mandatoryOnFlag(): string { return this._mandatoryOnFlag; }
    set mandatoryOnFlag(pmandatoryOnFlag: string) { this._mandatoryOnFlag = pmandatoryOnFlag ; }

toJSON(): any {
    return {
       'timeframeFlag': this._timeframeFlag,
       'transferFlag': this._transferFlag,
       'defaultOnFlag': this._defaultOnFlag,
       'endDate': this._endDate,
       'transactionType': this._transactionType,
       'beginDate': this._beginDate,
       'serialVersionUID': this._serialVersionUID,
       'mergeTransactionId': this._mergeTransactionId,
       'processId': this._processId,
       'processName': this._processName,
       'processDescription': this._processDescription,
       'beginTime': this._beginTime,
       'endTime': this._endTime,
       'mandatoryOnFlag': this._mandatoryOnFlag,
       'bookingStartdate': this._bookingStartdate,
       'bookingEndDate': this._bookingEndDate,
       'isProcessTimeRequired': this._isProcessTimeRequired,
       'prevBkgEndDate': this._prevBkgEndDate,
       'nextBkgStartDate': this._nextBkgStartDate,
       'checkFlag': this._checkFlag
        };
    }
}
