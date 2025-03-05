export class CourseScheduleRules {
    private _crsActyId: number;
    private _courseScheduleRuleId: number;
	private _capacity: number;
	private _createDatetime: Date;
	private _createUserId: string;
	private _endTime: Date;
	private _fridayFlag: string;
	private _modifyDatetime: Date;
	private _modifyUserId: string;
	private _mondayFlag: string;
	private _saturdayFlag: string;
	private _sealFlag: string;
	private _startTime: Date;
	private _sundayFlag: string;
	private _thursdayFlag: string;
	private _tuesdayFlag: string;
	private _wednesdayFlag: string;
    private _weekNo: number;
    private _sunday : boolean;
    private _monday : boolean;
    private _tuesday : boolean;
    private _wednesday : boolean;
    private _thursday : boolean;
    private _friday : boolean;
    private _saturday : boolean;
    private _noOfDays : number;
    private _noBuilt : number;
    private _lastDate : Date;
    private _holidayFlag : string;
    private _holiday : boolean;
    
    
    get crsActyId(): number { return this._crsActyId; }
    set crsActyId(pcrsActyId: number) { this._crsActyId = pcrsActyId ; }
    get courseScheduleRuleId(): number { return this._courseScheduleRuleId; }
    set courseScheduleRuleId(pcourseScheduleRuleId: number) { this._courseScheduleRuleId = pcourseScheduleRuleId ; }
    get capacity(): number { return this._capacity; }
    set capacity(pcapacity: number) { this._capacity = pcapacity ; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime ; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId ; }
    get endTime(): Date { return this._endTime; }
    set endTime(pendTime: Date) { this._endTime = pendTime ; }
    get fridayFlag(): string { return this._fridayFlag; }
    set fridayFlag(pfridayFlag: string) { this._fridayFlag = pfridayFlag ; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime ; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId ; }
    get mondayFlag(): string { return this._mondayFlag; }
    set mondayFlag(pmondayFlag: string) { this._mondayFlag = pmondayFlag ; }
    get saturdayFlag(): string { return this._saturdayFlag; }
    set saturdayFlag(psaturdayFlag: string) { this._saturdayFlag = psaturdayFlag ; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag ; }
    get startTime(): Date { return this._startTime; }
    set startTime(pstartTime: Date) { this._startTime = pstartTime ; }
    get sundayFlag(): string { return this._sundayFlag; }
    set sundayFlag(psundayFlag: string) { this._sundayFlag = psundayFlag ; }
    get thursdayFlag(): string { return this._thursdayFlag; }
    set thursdayFlag(pthursdayFlag: string) { this._thursdayFlag = pthursdayFlag ; }
    get tuesdayFlag(): string { return this._tuesdayFlag; }
    set tuesdayFlag(ptuesdayFlag: string) { this._tuesdayFlag = ptuesdayFlag ; }
    get wednesdayFlag(): string { return this._wednesdayFlag; }
    set wednesdayFlag(pwednesdayFlag: string) { this._wednesdayFlag = pwednesdayFlag ; }
    get weekNo(): number { return this._weekNo; }
    set weekNo(pweekNo: number) { this._weekNo = pweekNo ; }
    get sunday(): boolean { return this._sunday; }
    set sunday(psunday: boolean) { this._sunday = psunday; }
    get monday(): boolean { return this._monday; }
    set monday(pmonday: boolean) { this._monday = pmonday ; }
    get tuesday(): boolean { return this._tuesday; }
    set tuesday(ptuesday: boolean) { this._tuesday = ptuesday ; }
    get wednesday(): boolean { return this._wednesday; }
    set wednesday(pwednesday: boolean) { this._wednesday = pwednesday ; }
    get thursday(): boolean { return this._thursday; }
    set thursday(pthursday: boolean) { this._thursday = pthursday ; }
    get friday(): boolean { return this._friday; }
    set friday(pfriday: boolean) { this._friday = pfriday ; }
    get saturday(): boolean { return this._saturday; }
    set saturday(psaturday: boolean) { this._saturday = psaturday ; }
    get noOfDays(): number { return this._noOfDays; }
    set noOfDays(pnoOfDays: number) { this._noOfDays = pnoOfDays ; }
    get noBuilt(): number { return this._noBuilt; }
    set noBuilt(pnoBuilt: number) { this._noBuilt = pnoBuilt ; }
    get lastDate(): Date { return this._lastDate; }
    set lastDate(plastDate: Date) { this._lastDate = plastDate ; }
    get holidayFlag(): string { return this._holidayFlag; }
    set holidayFlag(pholidayFlag: string) { this._holidayFlag = pholidayFlag ; }
    get holiday(): boolean { return this._holiday; }
    set holiday(pholiday: boolean) { this._holiday = pholiday ; }

    toJSON(): any {
        return {
        'crsActyId': this._crsActyId,
        'courseScheduleRuleId': this._courseScheduleRuleId,
        'capacity': this._capacity,
        'createDatetime': this._createDatetime,
        'modifyDatetime': this._modifyDatetime,
        'createUserId': this._createUserId,
        'modifyUserId': this._modifyUserId,
        'endTime': this._endTime,
        'fridayFlag': this._fridayFlag,
        'mondayFlag': this._mondayFlag,
        'saturdayFlag': this._saturdayFlag,
        'sealFlag': this._sealFlag,
        'startTime': this._startTime,
        'sundayFlag': this._sundayFlag,
        'thursdayFlag': this._thursdayFlag,
        'tuesdayFlag': this._tuesdayFlag,
        'wednesdayFlag': this._wednesdayFlag,
        'weekNo': this._weekNo,
        'sunday': this._sunday,
        'monday': this._monday,
        'tuesday': this._tuesday,
        'wednesday': this._wednesday,
        'thursday': this._thursday,
        'friday': this._friday,
        'saturday': this._saturday,
        'noOfDays' : this._noOfDays,
        'noBuilt' : this._noBuilt,
        'lastDate' : this._lastDate,
        };
    }

}