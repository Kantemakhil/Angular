
export class OffenderSentenceAdjustment {
	private _offenderOrderAdjustId: number;
	private _adjustCode: string;
	private _offenderBookId: number;
	private _objectId: number;
	private _objectType: string;
	private _adjustDate: Date;
	private _adjustDays: number;
	private _adjustMonths: number;
	private _adjustStatus: string;
	private _adjustFromDate: Date;
	private _adjustToDate: Date;
	private _commentText: string;
	private _sealFlag: string;
	private _createDateTime: Date;
	private _createUserId: string;
	private _modifyDateTime: Date;
	private _modifyUserId: string;
	private _recordFlag:string;
	private _postedDate: Date;
	private _toDate: Date;
	private _fromDate: Date;
	private _description: Date;
	private _remissionFlag: boolean;
	private _duration: number;
	private _orderAdjustCode: string;
	private _sentenceAdjustCode: string;
	private _debitCreditCode: string;
	private _createDatetime: Date;
	private _usageCode: string;
	private _rdYears: number;
	private _rdMonths: number;
	private _rdWeeks: number;
	private _rdDays: number;
	private _adjustCodeType: string;
	public get adjustCodeType(): string {
		return this._adjustCodeType;
	}
	public set adjustCodeType(value: string) {
		this._adjustCodeType = value;
	}
	public get rdYears(): number {
		return this._rdYears;
	}
	public set rdYears(value: number) {
		this._rdYears = value;
	}
	public get rdMonths(): number {
		return this._rdMonths;
	}
	public set rdMonths(value: number) {
		this._rdMonths = value;
	}
	public get rdWeeks(): number {
		return this._rdWeeks;
	}
	public set rdWeeks(value: number) {
		this._rdWeeks = value;
	}
	
	public get rdDays(): number {
		return this._rdDays;
	}
	public set rdDays(value: number) {
		this._rdDays = value;
	}
	public get usageCode(): string {
		return this._usageCode;
	}
	public set usageCode(value: string) {
		this._usageCode = value;
	}
	public get createDatetime(): Date {
		return this._createDatetime;
	}
	public set createDatetime(value: Date) {
		this._createDatetime = value;
	}
	public get debitCreditCode(): string {
		return this._debitCreditCode;
	}
	public set debitCreditCode(value: string) {
		this._debitCreditCode = value;
	}
	public get sentenceAdjustCode(): string {
		return this._sentenceAdjustCode;
	}
	public set sentenceAdjustCode(value: string) {
		this._sentenceAdjustCode = value;
	}
	public get orderAdjustCode(): string {
		return this._orderAdjustCode;
	}
	public set orderAdjustCode(value: string) {
		this._orderAdjustCode = value;
	}

	public get duration(): number {
		return this._duration;
	}
	public set duration(value: number) {
		this._duration = value;
	}

	public get remissionFlag(): boolean {
		return this._remissionFlag;
	}
	public set remissionFlag(value: boolean) {
		this._remissionFlag = value;
	}
	public get description(): Date {
		return this._description;
	}
	public set description(value: Date) {
		this._description = value;
	}
	public get toDate(): Date {
		return this._toDate;
	}
	public set toDate(value: Date) {
		this._toDate = value;
	}
	public get fromDate(): Date {
		return this._fromDate;
	}
	public set fromDate(value: Date) {
		this._fromDate = value;
	}
	public get postedDate(): Date {
		return this._postedDate;
	}
	public set postedDate(value: Date) {
		this._postedDate = value;
	}
	public get adjustCode(): string {
		return this._adjustCode;
	}
	public set adjustCode(value: string) {
		this._adjustCode = value;
	}

	get offenderBookId(): number { return this._offenderBookId; }

	set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }

	get offenderOrderAdjustId(): number { return this._offenderOrderAdjustId; }

	set offenderOrderAdjustId(offenderOrderAdjustId: number) { this._offenderOrderAdjustId = offenderOrderAdjustId; }


	get objectId(): number { return this._objectId; }

	set objectId(objectId: number) { this._objectId = objectId; }

	get objectType(): string { return this._objectType; }

	set objectType(objectType: string) { this._objectType = objectType; }

	get adjustDate(): Date { return this._adjustDate; }

	set adjustDate(adjustDate: Date) { this._adjustDate = adjustDate; }

	get adjustDays(): number { return this._adjustDays; }

	set adjustDays(adjustDays: number) { this._adjustDays = adjustDays; }

	get adjustMonths(): number { return this._adjustMonths; }

	set adjustMonths(adjustMonths: number) { this._adjustMonths = adjustMonths; }

	get adjustStatus(): string { return this._adjustStatus; }

	set adjustStatus(adjustStatus: string) { this._adjustStatus = adjustStatus; }

	get adjustFromDate(): Date { return this._adjustFromDate; }

	set adjustFromDate(adjustFromDate: Date) { this._adjustFromDate = adjustFromDate; }

	get adjustToDate(): Date { return this._adjustToDate; }

	set adjustToDate(adjustToDate: Date) { this._adjustToDate = adjustToDate; }

	get commentText(): string { return this._commentText; }

	set commentText(commentText: string) { this._commentText = commentText; }

	get sealFlag(): string { return this._sealFlag; }

	set sealFlag(sealFlag: string) { this._sealFlag = sealFlag; }

	get modifyDateTime(): Date { return this._modifyDateTime; }

	set modifyDateTime(modifyDateTime: Date) { this._modifyDateTime = modifyDateTime; }

	get createDateTime(): Date { return this._createDateTime; }

	set createDateTime(createDateTime: Date) { this._createDateTime = createDateTime; }

	get modifyUserId(): string { return this._modifyUserId; }

	set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }

	get createUserId(): string { return this._createUserId; }

	set createUserId(createUserId: string) { this._createUserId = createUserId; }
		
	get recordFlag(): string { return this._recordFlag; }

	set recordFlag(recordFlag: string) { this._recordFlag = recordFlag; }
	

toJSON(): any {
    return {
        'offenderBookId': this._offenderBookId,
        'offenderOrderAdjustId': this._offenderOrderAdjustId,
        'adjustCode': this._adjustCode,
        'objectId': this._objectId,
        'objectType': this._objectType,
        'adjustDate': this._adjustDate,
        'adjustDays':this._adjustDays,
        'adjustMonths':this._adjustMonths,
        'adjustStatus':this._adjustStatus,
        'adjustFromDate':this._adjustFromDate,
        'adjustToDate':this._adjustToDate,
        'commentText':this._commentText,
        'createUserId': this._createUserId,
        'createDateTime': this._createDateTime,
        'modifyDateTime': this._modifyDateTime,
        'modifyUserId': this._modifyUserId,
		'postedDate':this._postedDate,
		'fromDate':this._fromDate,
		'toDate':this._toDate,
		'description':this._description,
		'remissionFlag':this._remissionFlag,
		'duration':this._duration,
		'sentenceAdjustCode':this._sentenceAdjustCode,
		'createDatetime':this._createDatetime,
		'usageCode':this._usageCode,
		'rdYears':this._rdYears,
		'rdMonths':this._rdMonths,
		'rdWeeks':this._rdWeeks,
		'rdDays':this._rdDays,
		'adjustCodeType': this._adjustCodeType
    }
}


}  