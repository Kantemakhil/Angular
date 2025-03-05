export class ScheduledTripAssignments {

    private _scheduledTripId: number;
    private _assignmentType: String;
    private _assignedId: number;
    private _createUserId: String;
    private _createDatetime: Date;
    private _sealFlag: String;
    private _modifyDatetime: Date;
    private _modifyUserId: String;
    private _assignedIdTemp: number;
    private _type: String;
    private _make: String;
    private _modelNo: String;
    private _description: String;
    private _optimumCapacity: number;
    private _physicalCapacity: number;
    private _completionDate: Date;
    private _departureDate: Date;

    get completionDate(): Date { return this._completionDate; }
    set completionDate(pcompletionDate: Date) { this._completionDate = pcompletionDate; }
    get departureDate(): Date { return this._departureDate; }
    set departureDate(pdepartureDate: Date) { this._departureDate = pdepartureDate; }
    public get scheduledTripId(): number { return this._scheduledTripId; }
    public set scheduledTripId(value: number) { this._scheduledTripId = value; }
    public get assignmentType(): String { return this._assignmentType; }
    public set assignmentType(value: String) { this._assignmentType = value; }
    public get assignedId(): number { return this._assignedId; }
    public set assignedId(value: number) { this._assignedId = value; }
    public get createUserId(): String { return this._createUserId; }
    public set createUserId(value: String) { this._createUserId = value; }
    public get createDatetime(): Date { return this._createDatetime; }
    public set createDatetime(value: Date) { this._createDatetime = value; }
    public get sealFlag(): String { return this._sealFlag; }
    public set sealFlag(value: String) { this._sealFlag = value; }
    public get modifyDatetime(): Date { return this._modifyDatetime; }
    public set modifyDatetime(value: Date) { this._modifyDatetime = value; }
    public get modifyUserId(): String { return this._modifyUserId; }
    public set modifyUserId(value: String) { this._modifyUserId = value; }
    public get assignedIdTemp(): number { return this._assignedIdTemp; }
    public set assignedIdTemp(value: number) { this._assignedIdTemp = value; }
    public get type(): String {
        return this._type;
    }
    public set type(value: String) {
        this._type = value;
    }
    public get make(): String {
        return this._make;
    }
    public set make(value: String) {
        this._make = value;
    }
    public get modelNo(): String {
        return this._modelNo;
    }
    public set modelNo(value: String) {
        this._modelNo = value;
    } public get description(): String {
        return this._description;
    }
    public set description(value: String) {
        this._description = value;
    }
    public get optimumCapacity(): number {
        return this._optimumCapacity;
    }
    public set optimumCapacity(value: number) {
        this._optimumCapacity = value;
    }
    public get physicalCapacity(): number {
        return this._physicalCapacity;
    }
    public set physicalCapacity(value: number) {
        this._physicalCapacity = value;
    }

    toJSON(): any {
        return {
            'scheduledTripId': this._scheduledTripId,
            'assignmentType': this._assignmentType,
            'assignedId': this._assignedId,
            'createUserId': this._createUserId,
            'createDatetime': this._createDatetime,
            'sealFlag': this._sealFlag,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'assignedIdTemp': this._assignedIdTemp,
            'type': this._type,
            'make': this._make,
            'modelNo': this._modelNo,
            'description': this._description,
            'optimumCapacity': this._optimumCapacity,
            'physicalCapacity': this._physicalCapacity,
            'completionDate': this._completionDate,
            'departureDate': this._departureDate,
        };
    }
}