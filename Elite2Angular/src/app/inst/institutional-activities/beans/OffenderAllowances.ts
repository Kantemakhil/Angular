export class OffenderAllowances {
    private _allowanceType: string;
    
    private _unit: string;

    private _maxUnit: number;

    private _rate: number;
    private _versionNo: number;

    private _allowanceModifiedDate: Date;
    
    private _createDatetime: Date;
    
    private _createUserId: string;
   
    private _modifyDatetime: Date;
   
    private _modifyUserId: string;

    private _startDate: Date;

    private _endDate: Date;

    private _offenderBookId: number;

    private _offAllowanceId: number;

    private _returnedOutput: number;

    private _commentText: string;

    private _paidFlag: number;

    private _lastPaidDate: Date;
    

    public get allowanceType(): string {
        return this._allowanceType;
    }
    public set allowanceType(value: string) {
        this._allowanceType = value;
    }

    public get unit(): string {
        return this._unit;
    }
    public set unit(value: string) {
        this._unit = value;
    }
    
    public get maxUnit(): number {
        return this._maxUnit;
    }
    public set maxUnit(value: number) {
        this._maxUnit = value;
    }
   
    public get rate(): number {
        return this._rate;
    }
    public set rate(value: number) {
        this._rate = value;
    }
    
    public get versionNo(): number {
        return this._versionNo;
    }
    public set versionNo(value: number) {
        this._versionNo = value;
    }
    public get allowanceModifiedDate(): Date {
        return this._allowanceModifiedDate;
    }
    public set allowanceModifiedDate(value: Date) {
        this._allowanceModifiedDate = value;
    }
    public get createDatetime(): Date {
        return this._createDatetime;
    }
    public set createDatetime(value: Date) {
        this._createDatetime = value;
    }
    public get createUserId(): string {
        return this._createUserId;
    }
    public set createUserId(value: string) {
        this._createUserId = value;
    }
    public get modifyDatetime(): Date {
        return this._modifyDatetime;
    }
    public set modifyDatetime(value: Date) {
        this._modifyDatetime = value;
    }
    public get modifyUserId(): string {
        return this._modifyUserId;
    }
    public set modifyUserId(value: string) {
        this._modifyUserId = value;
    }

    public get startDate(): Date {
        return this._startDate;
    }
    public set startDate(value: Date) {
        this._startDate = value;
    }

    public get endDate(): Date {
        return this._endDate;
    }
    public set endDate(value: Date) {
        this._endDate = value;
    }

    public get offenderBookId(): number {
        return this._offenderBookId;
    }
    public set offenderBookId(value: number) {
        this._offenderBookId = value;
    }
    public get offAllowanceId(): number {
        return this._offAllowanceId;
    }
    public set offAllowanceId(value: number) {
        this._offAllowanceId = value;
    }

    public get returnedOutput(): number {
        return this._returnedOutput;
    }
    public set returnedOutput(value: number) {
        this._returnedOutput = value;
    }

    public get commentText(): string {
        return this._commentText;
    }
    public set commentText(value: string) {
        this._commentText = value;
    }
    public get paidFlag(): number {
        return this._paidFlag;
    }
    public set paidFlag(value: number) {
        this._paidFlag = value;
    }
    public get lastPaidDate(): Date {
        return this._lastPaidDate;
    }
    public set lastPaidDate(value: Date) {
        this._lastPaidDate = value;
    }
    
    toJSON(): any {
        return {
        'allowanceType': this._allowanceType,
        'unit': this._unit,
        'maxUnit': this._maxUnit,
        'rate': this._rate,
        'versionNo': this._versionNo,
        'allowanceModifiedDate': this._allowanceModifiedDate,
        'createDatetime': this._createDatetime,
        'createUserId': this._createUserId,
        'modifyDatetime': this._modifyDatetime,
        'modifyUserId': this._modifyUserId,
        'startDate': this._startDate,
        'endDate': this._endDate,
        'offenderBookId': this._offenderBookId,
        'offAllowanceId': this._offAllowanceId,
        'returnedOutput': this._returnedOutput,
        'commentText': this._commentText,
        'paidFlag': this._paidFlag,
        'lastPaidDate': this._lastPaidDate
         };
    }
}