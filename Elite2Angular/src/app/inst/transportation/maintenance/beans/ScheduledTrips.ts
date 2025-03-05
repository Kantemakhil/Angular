export class ScheduledTrips {
    // private _scheduledTripId:Number;
    private _cancelDate: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _estDepartureTime: Date;
    private _modifyUserId: string;
    private _actCompletionTime: Date;
    private _scheduledTripId: number;
    private _cancelFlag: string;
    private _routeName: string;
    private _createDatetime: Date;
    private _actDepartureTime: Date;
    private _tripCode: string;
    private _cancelBy: string;
    private _estCompletionTime: Date;
    private _completionDate: Date;
    private _departureDate: Date;
    private _sealFlag: string;
    private _status: string;
    private _vAction: string;
    private _vNum: number;
    private _btnStatus: string;
    private _vBkg: number;
    private _vNonAdt: number;
    private _vFlag: string;
    private _vCount: number;
    private _vMdate: Date;
    private _vMdate1: Date;
    private _optCap: number;
    private _physCap: number;

    private _vCnt: number;
    private _lNonOffCount: number;
    private _lVehicleCount: number;
    private _lStaffCount: number;
    private _weekDay: string;
    private _validateDate: Date;
    private _startDate: Date;
    private _description: string;
    private _endDate: Date;
    private _tripType: String;
    private _departureDateTemp: Date;
    private _ifOffOnTripCur: number;
    private _tripStartDate: Date;
    private _tripEndDate: Date;
    private _vCurNum: number;

    get cancelDate(): Date { return this._cancelDate; }
    set cancelDate(pcancelDate: Date) { this._cancelDate = pcancelDate; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get estDepartureTime(): Date { return this._estDepartureTime; }
    set estDepartureTime(pestDepartureTime: Date) { this._estDepartureTime = pestDepartureTime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get actCompletionTime(): Date { return this._actCompletionTime; }
    set actCompletionTime(pactCompletionTime: Date) { this._actCompletionTime = pactCompletionTime; }
    get scheduledTripId(): number { return this._scheduledTripId; }
    set scheduledTripId(pscheduledTripId: number) { this._scheduledTripId = pscheduledTripId; }
    get cancelFlag(): string { return this._cancelFlag; }
    set cancelFlag(pcancelFlag: string) { this._cancelFlag = pcancelFlag; }
    get routeName(): string { return this._routeName; }
    set routeName(prouteName: string) { this._routeName = prouteName; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get actDepartureTime(): Date { return this._actDepartureTime; }
    set actDepartureTime(pactDepartureTime: Date) { this._actDepartureTime = pactDepartureTime; }
    get tripCode(): string { return this._tripCode; }
    set tripCode(ptripCode: string) { this._tripCode = ptripCode; }
    get cancelBy(): string { return this._cancelBy; }
    set cancelBy(pcancelBy: string) { this._cancelBy = pcancelBy; }
    get estCompletionTime(): Date { return this._estCompletionTime; }
    set estCompletionTime(pestCompletionTime: Date) { this._estCompletionTime = pestCompletionTime; }
    get completionDate(): Date { return this._completionDate; }
    set completionDate(pcompletionDate: Date) { this._completionDate = pcompletionDate; }
    get departureDate(): Date { return this._departureDate; }
    set departureDate(pdepartureDate: Date) { this._departureDate = pdepartureDate; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get status(): string { return this._status; }
    set status(pstatus: string) { this._status = pstatus; }
    get vAction(): string { return this._vAction; }
    set vAction(value: string) { this._vAction = value; }
    get vNum(): number { return this._vNum; }
    set vNum(value: number) { this._vNum = value; }
    get btnStatus(): string { return this._btnStatus; }
    set btnStatus(value: string) { this._btnStatus = value; }
    get departureDateTemp(): Date { return this._departureDateTemp; }
    set departureDateTemp(pdepartureDateTemp: Date) { this._departureDateTemp = pdepartureDateTemp; }

    get vBkg(): number {
        return this._vBkg;
    }
    set vBkg(value: number) {
        this._vBkg = value;
    }
    get vNonAdt(): number {
        return this._vNonAdt;
    }
    set vNonAdt(value: number) {
        this._vNonAdt = value;
    }
    get vFlag(): string {
        return this._vFlag;
    }
    set vFlag(value: string) {
        this._vFlag = value;
    }
    get vCount(): number {
        return this._vCount;
    }
    set vCount(value: number) {
        this._vCount = value;
    }
    get vMdate(): Date {
        return this._vMdate;
    }
    set vMdate(value: Date) {
        this._vMdate = value;
    }
    get vMdate1(): Date {
        return this._vMdate1;
    }
    set vMdate1(value: Date) {
        this._vMdate1 = value;
    }
    public get optCap(): number {
        return this._optCap;
    }
    public set optCap(value: number) {
        this._optCap = value;
    }
    public get physCap(): number {
        return this._physCap;
    }
    public set physCap(value: number) {
        this._physCap = value;
    }


    get vCnt(): number { return this._vCnt; }
    set vCnt(value: number) { this._vCnt = value; }
    get lNonOffCount(): number { return this._lNonOffCount; }
    set lNonOffCount(value: number) { this._lNonOffCount = value; }
    get lVehicleCount(): number { return this._lVehicleCount; }
    set lVehicleCount(value: number) { this._lVehicleCount = value; }
    get lStaffCount(): number { return this._lStaffCount; }
    set lStaffCount(value: number) { this._lStaffCount = value; }
    get weekDay(): string { return this._weekDay; }
    set weekDay(value: string) { this._weekDay = value; }
    get validateDate(): Date { return this._validateDate; }
    set validateDate(value: Date) { this._validateDate = value; }
    get description(): string { return this._description; }
    set description(value: string) { this._description = value; }
    get startDate(): Date { return this._startDate; }
    set startDate(value: Date) { this._startDate = value; }
    get endDate(): Date { return this._endDate; }
    set endDate(value: Date) { this._endDate = value; }
    get tripType(): String { return this._tripType; }
    set tripType(value: String) { this._tripType = value; }
    get ifOffOnTripCur(): number { return this._ifOffOnTripCur; }
    set ifOffOnTripCur(value: number) { this._ifOffOnTripCur = value; }
    get tripStartDate(): Date { return this._tripStartDate; }
    set tripStartDate(value: Date) { this._tripStartDate = value; }
    get tripEndDate(): Date { return this._tripEndDate; }
    set tripEndDate(value: Date) { this._tripEndDate = value; }
    get vCurNum(): number { return this._vCurNum; }
    set vCurNum(value: number) { this._vCurNum = value; }


    toJSON(): any {
        return {
            'cancelDate': this._cancelDate,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'estDepartureTime': this._estDepartureTime,
            'modifyUserId': this._modifyUserId,
            'actCompletionTime': this._actCompletionTime,
            'scheduledTripId': this._scheduledTripId,
            'cancelFlag': this._cancelFlag,
            'routeName': this._routeName,
            'createDatetime': this._createDatetime,
            'actDepartureTime': this._actDepartureTime,
            'tripCode': this._tripCode,
            'cancelBy': this._cancelBy,
            'estCompletionTime': this._estCompletionTime,
            'completionDate': this._completionDate,
            'departureDate': this._departureDate,
            'sealFlag': this._sealFlag,
            'status': this._status,
            'vAction': this.vAction,
            'vNum': this.vNum,
            'btnStatus': this.btnStatus,
            'vBkg': this.vBkg,
            'vNonAdt': this.vNonAdt,
            'vFlag': this.vFlag,
            'vCount': this.vCount,
            'vMdate': this.vMdate,
            'vMdate1': this.vMdate1,
            'vCnt': this._vCnt,
            'lNonOffCount': this._lNonOffCount,
            'lVehicleCount': this._lVehicleCount,
            'lStaffCount': this._lStaffCount,
            'weekDay': this._weekDay,
            'validateDate': this._validateDate,
            'description': this._description,
            'startDate': this._startDate,
            'endDate': this._endDate,
            'optCap': this._optCap,
            'physCap': this._physCap,
            'tripType': this._tripType,
            'ifOffOnTripCur': this._ifOffOnTripCur,
            'tripStartDate': this._tripStartDate,
            'tripEndDate': this._tripEndDate,
            'vCurNum': this._vCurNum,
            'departureDateTemp': this._departureDateTemp,
        };
    }
}