export class Trips {

    private _tripCode: string;
    private _routeName: string;
    private _vehicleId: number;
    private _startDate: Date;
    private _startTime: Date;
    private _endDate: Date;
    private _endTime: Date;
    private _status: string;
    private _commentText: string;
    private _vehicleUseCode: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _listSeq: number;
    private _activeFlag: string;
    private _tripType: string;
    private _description: string;
    private _expiryDate: Date;
    private _vSdate: Date;
    private _vEdate: Date;


    public get tripCode(): string { return this._tripCode; }
    public set tripCode(value: string) { this._tripCode = value; }
    public get routeName(): string { return this._routeName; }
    public set routeName(value: string) { this._routeName = value; }
    public get vehicleId(): number { return this._vehicleId; }
    public set vehicleId(value: number) { this._vehicleId = value; }
    public get startDate(): Date { return this._startDate; }
    public set startDate(value: Date) { this._startDate = value; }
    public get startTime(): Date { return this._startTime; }
    public set startTime(value: Date) { this._startTime = value; }
    public get endDate(): Date { return this._endDate; }
    public set endDate(value: Date) { this._endDate = value; }
    public get endTime(): Date { return this._endTime; }
    public set endTime(value: Date) { this._endTime = value; }
    public get status(): string { return this._status; }
    public set status(value: string) { this._status = value; }
    public get commentText(): string { return this._commentText; }
    public set commentText(value: string) { this._commentText = value; }
    public get vehicleUseCode(): string { return this._vehicleUseCode; }
    public set vehicleUseCode(value: string) { this._vehicleUseCode = value; }
    public get createDatetime(): Date { return this._createDatetime; }
    public set createDatetime(value: Date) { this._createDatetime = value; }
    public get createUserId(): string { return this._createUserId; }
    public set createUserId(value: string) { this._createUserId = value; }
    public get modifyDatetime(): Date { return this._modifyDatetime; }
    public set modifyDatetime(value: Date) { this._modifyDatetime = value; }
    public get modifyUserId(): string { return this._modifyUserId; }
    public set modifyUserId(value: string) { this._modifyUserId = value; }
    public get sealFlag(): string { return this._sealFlag; }
    public set sealFlag(value: string) { this._sealFlag = value; }
    public get listSeq(): number { return this._listSeq; }
    public set listSeq(value: number) { this._listSeq = value; }
    public get activeFlag(): string { return this._activeFlag; }
    public set activeFlag(value: string) { this._activeFlag = value; }
    public get tripType(): string { return this._tripType; }
    public set tripType(value: string) { this._tripType = value; }
    public get description(): string { return this._description; }
    public set description(value: string) { this._description = value; }
    public get expiryDate(): Date { return this._expiryDate; }
    public set expiryDate(value: Date) { this._expiryDate = value; }
    public get vSdate(): Date {
        return this._vSdate;
    }
    public set vSdate(value: Date) {
        this._vSdate = value;
    }
    public get vEdate(): Date {
        return this._vEdate;
    }
    public set vEdate(value: Date) {
        this._vEdate = value;
    }

    toJSON(): any {
        return {
            'tripCode': this._tripCode,
            'routeName': this._routeName,
            'vehicleId': this._vehicleId,
            'startDate': this._startDate,
            'startTime': this._startTime,
            'endDate': this._endDate,
            'endTime': this._endTime,
            'status': this._status,
            'commentText': this._commentText,
            'vehicleUseCode': this._vehicleUseCode,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this.sealFlag,
            'listSeq': this._listSeq,
            'activeFlag': this._activeFlag,
            'tripType': this._tripType,
            'description': this._description,
            'expiryDate': this._expiryDate,
            'vSdate': this._vSdate,
            'vEdate': this._vEdate,
        };
    }

}